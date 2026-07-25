"use client";

import { useState } from "react";


export default function PropertyFilters() {


  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");



  return (

    <div className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">


      <div className="grid gap-4 md:grid-cols-2">



        <input

          placeholder="🔎 Поиск по названию, району или ID"

          value={search}

          onChange={(e) => setSearch(e.target.value)}

          className="rounded-xl border p-3"

        />





        <select

          value={status}

          onChange={(e) => setStatus(e.target.value)}

          className="rounded-xl border p-3"

        >

          <option value="all">
            Все объекты
          </option>


          <option value="active">
            🟢 Активные
          </option>


          <option value="sold">
            ✅ Проданные
          </option>


          <option value="hidden">
            ❌ Скрытые
          </option>


          <option value="exclusive">
            ⭐ Эксклюзивные
          </option>


        </select>



      </div>


    </div>

  );

}