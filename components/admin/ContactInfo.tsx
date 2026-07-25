"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { requestContact } from "@/lib/actions";


export default function ContactInfo({
  property,
}: {
  property: any;
}) {


  const [user, setUser] = useState<any>(null);

  const [approved, setApproved] = useState(false);

  const [requested, setRequested] = useState(false);



  useEffect(() => {

    const saved = localStorage.getItem("user");


    if (saved) {

      const currentUser = JSON.parse(saved);

      setUser(currentUser);

      checkAccess(currentUser);

    }

  }, []);




  async function checkAccess(currentUser:any) {


    if (!currentUser) return;



    if (currentUser.role === "admin") {

      setApproved(true);

      return;

    }



    


    const { data } = await supabase
      .from("contact_requests")
      .select("id")
      .eq("property_id", property.id)
      .eq("agent_id", currentUser.id)
      .eq("status", "approved")
      .single();



    if (data) {

      setApproved(true);

    }


    const { data: pending } = await supabase
      .from("contact_requests")
      .select("id")
      .eq("property_id", property.id)
      .eq("agent_id", currentUser.id)
      .eq("status", "pending")
      .single();



    if (pending) {

      setRequested(true);

    }


  }





  async function handleRequest() {


    if (!user) return;


    await requestContact({

      property_id: property.id,

      agent_id: user.id,

    });


    setRequested(true);


  }





  if (!user) {

    return (

      <div className="rounded-xl bg-gray-100 p-5 text-gray-500">

        Проверка доступа...

      </div>

    );

  }





  if (!approved) {


    return (

      <div className="rounded-xl bg-yellow-50 p-5">


        🔒 Контакты собственника скрыты



        {requested ? (

          <p className="mt-3 text-gray-600">

            ⏳ Запрос отправлен. Ожидайте подтверждения.

          </p>

        ) : (

          <button

            onClick={handleRequest}

            className="mt-3 rounded-xl bg-blue-600 px-4 py-2 text-white"

          >

            Запросить контакт

          </button>

        )}


      </div>

    );

  }





  return (

    <div className="space-y-2">


      <p>
        👤 {property.owner_name || "Не указан"}
      </p>



      <p>
        📞 {property.owner_phone || "Телефон не указан"}
      </p>



      <p>
        ✈️ {property.telegram || "Telegram не указан"}
      </p>


    </div>

  );

}