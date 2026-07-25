"use client";

import Link from "next/link";
import {
  Home,
  Building2,
  PlusCircle,
  LayoutDashboard,
  LogOut,
  ClipboardList,
} from "lucide-react";

import UserInfo from "./UserInfo";
import { useEffect, useState } from "react";


export default function AdminMenu() {

  const [user, setUser] = useState<any>(null);


  useEffect(() => {

    const saved = localStorage.getItem("user");

    if (saved) {
      setUser(JSON.parse(saved));
    }

  }, []);



  function logout() {

    localStorage.removeItem("user");

    document.cookie =
      "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    window.location.href = "/login";

  }



  if (!user) return null;



  const isAdmin = user.role === "admin";



  return (

    <aside className="sticky top-6 h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">


      <div className="mb-8">

        <h1 className="text-3xl font-bold text-red-600">
          KupiDom
        </h1>

        <p className="text-sm text-gray-500">
          Панель управления
        </p>

      </div>



      <div className="mb-6">
        <UserInfo />
      </div>



      <nav className="space-y-2">


        {isAdmin && (

          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-red-50 hover:text-red-600"
          >
            <LayoutDashboard size={22} />
            Панель
          </Link>

        )}



        <Link
          href="/admin/properties"
          className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-red-50 hover:text-red-600"
        >
          <Building2 size={22} />
          Объекты
        </Link>




        {isAdmin && (

          <Link
            href="/admin/requests"
            className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-red-50 hover:text-red-600"
          >
            <ClipboardList size={22} />
            Запросы контактов
          </Link>

        )}




        <Link
          href="/admin/add"
          className="flex items-center gap-3 rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-700"
        >
          <PlusCircle size={22} />
          Добавить объект
        </Link>




        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-red-50 hover:text-red-600"
        >
          <Home size={22} />
          На сайт
        </Link>




        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={22} />
          Выйти
        </button>



      </nav>


    </aside>

  );

}