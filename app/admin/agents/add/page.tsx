"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";


export default function AddAgentPage() {


  const router = useRouter();


  const [form, setForm] = useState({

    name: "",
    email: "",
    password: "",
    phone: "",
    telegram: "",

  });



  const [loading, setLoading] = useState(false);



  function change(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  }




  async function saveAgent() {


    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {

      alert("Заполните имя, email и пароль");

      return;

    }



    setLoading(true);



    const { error } = await supabase
      .from("users")
      .insert({

        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        telegram: form.telegram,
        role: "agent",

      });



    if (error) {

      alert(error.message);

      setLoading(false);

      return;

    }



    router.push("/admin/agents");

    router.refresh();


  }





  return (

    <main className="mx-auto max-w-xl px-6 py-10">


      <h1 className="mb-8 text-4xl font-bold">
        👤 Добавить агента
      </h1>




      <div className="space-y-5 rounded-2xl border bg-white p-8 shadow">


        <input
          name="name"
          placeholder="Имя агента"
          value={form.name}
          onChange={change}
          className="w-full rounded-xl border p-3"
        />



        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={change}
          className="w-full rounded-xl border p-3"
        />



        <input
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={change}
          className="w-full rounded-xl border p-3"
        />



        <input
          name="phone"
          placeholder="Телефон"
          value={form.phone}
          onChange={change}
          className="w-full rounded-xl border p-3"
        />



        <input
          name="telegram"
          placeholder="Telegram"
          value={form.telegram}
          onChange={change}
          className="w-full rounded-xl border p-3"
        />





        <button
          onClick={saveAgent}
          disabled={loading}
          className="w-full rounded-xl bg-red-600 py-3 text-white hover:bg-red-700"
        >

          {loading
            ? "Сохранение..."
            : "Создать агента"}

        </button>




      </div>



    </main>

  );

}