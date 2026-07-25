"use client";

import { requestContact } from "@/lib/actions";
import { useState } from "react";


export default function RequestContactButton({
  propertyId,
  agentId,
}: {
  propertyId: string;
  agentId: string;
}) {


  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);



  async function handleClick() {

    try {

      setLoading(true);


      await requestContact({

        property_id: propertyId,

        agent_id: agentId,

      });


      setDone(true);


    } finally {

      setLoading(false);

    }

  }



  if (done) {

    return (

      <div className="mt-3 rounded-xl bg-green-100 p-3 text-green-700">

        ✅ Запрос отправлен руководителю

      </div>

    );

  }



  return (

    <button
      onClick={handleClick}
      disabled={loading}
      className="mt-3 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >

      {loading
        ? "Отправка..."
        : "Запросить контакт"
      }

    </button>

  );

}