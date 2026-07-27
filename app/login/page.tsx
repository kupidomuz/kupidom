"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";


export default function LoginPage() {


  const router = useRouter();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  async function login() {


  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();



  if (error || !data) {

    alert("Неверный логин или пароль");

    return;

  }



  // Проверка статуса пользователя
  if (data.status === "blocked") {

    alert("Доступ запрещён. Обратитесь к администратору.");

    return;

  }



  localStorage.setItem(
    "user",
    JSON.stringify(data)
  );


  document.cookie =
    `user=${encodeURIComponent(JSON.stringify(data))}; path=/`;



  router.push("/admin/properties");


}





  return (

    <main className="flex min-h-screen items-center justify-center bg-gray-100">


      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">


        <h1 className="mb-6 text-3xl font-bold">
          Вход KupiDom
        </h1>




        <input

          placeholder="Email"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

          className="mb-4 w-full rounded-xl border p-3"

        />





        <input

          type="password"

          placeholder="Пароль"

          value={password}

          onChange={(e)=>setPassword(e.target.value)}

          className="mb-6 w-full rounded-xl border p-3"

        />





        <button

          onClick={login}

          className="w-full rounded-xl bg-red-600 px-5 py-3 text-white"

        >

          Войти

        </button>



      </div>


    </main>

  );

}