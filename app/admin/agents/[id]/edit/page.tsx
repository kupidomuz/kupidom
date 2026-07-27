"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";


export default function EditAgentPage() {


  const params = useParams();
  const router = useRouter();

  const id = params.id as string;



  const [form, setForm] = useState({

    name: "",
    email: "",
    phone: "",
    telegram: "",
    password: "",

  });



  const [loading, setLoading] = useState(true);



  useEffect(() => {

    loadAgent();

  }, []);



  async function loadAgent() {


    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();



    if (data) {

      setForm({

        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        telegram: data.telegram || "",
        password: "",

      });

    }


    setLoading(false);

  }





  function change(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  }





  async function save() {


    setLoading(true);



    const updateData:any = {

      name: form.name,
      email: form.email,
      phone: form.phone,
      telegram: form.telegram,

    };



    if (form.password) {

      updateData.password = form.password;

    }



    const { error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", id);



    if (error) {

      alert(error.message);

      setLoading(false);

      return;

    }



    router.push("/admin/agents");

    router.refresh();


  }





  if (loading) {

    return (

      <div className="p-10">
        Загрузка...
      </div>

    );

  }





  return (

    <main className="mx-auto max-w-xl px-6 py-10">


      <h1 className="mb-8 text-4xl font-bold">
        ✏️ Редактирование агента
      </h1>




      <div className="space-y-5 rounded-2xl border bg-white p-8 shadow">



        <input
          name="name"
          value={form.name}
          onChange={change}
          placeholder="Имя"
          className="w-full rounded-xl border p-3"
        />



        <input
          name="email"
          value={form.email}
          onChange={change}
          placeholder="Email"
          className="w-full rounded-xl border p-3"
        />



        <input
          name="phone"
          value={form.phone}
          onChange={change}
          placeholder="Телефон"
          className="w-full rounded-xl border p-3"
        />



        <input
          name="telegram"
          value={form.telegram}
          onChange={change}
          placeholder="Telegram"
          className="w-full rounded-xl border p-3"
        />



        <input
          name="password"
          value={form.password}
          onChange={change}
          placeholder="Новый пароль (не обязательно)"
          className="w-full rounded-xl border p-3"
        />




        <button
          onClick={save}
          className="w-full rounded-xl bg-blue-600 py-3 text-white"
        >
          💾 Сохранить изменения
        </button>



      </div>



    </main>

  );

}