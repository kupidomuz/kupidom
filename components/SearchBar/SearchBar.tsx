"use client";

import { propertyTypes } from "@/data/propertyTypes";
import { districts } from "@/data/districts";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function SearchBar() {


  const router = useRouter();


  const [dealType, setDealType] = useState("");
  const [type, setType] = useState("");
  const [district, setDistrict] = useState("");
  const [rooms, setRooms] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");



  function search() {

console.log({
  dealType,
  type,
  district,
  rooms,
  priceFrom,
  priceTo
});
    const params = new URLSearchParams();



    if (dealType) {
      params.set(
        "dealType",
        dealType
      );
    }



    if (type) {
      params.set(
        "type",
        type
      );
    }



    if (district) {
      params.set(
        "district",
        district
      );
    }



    if (rooms) {
      params.set(
        "rooms",
        rooms
      );
    }



    if (priceFrom) {
      params.set(
        "priceFrom",
        priceFrom
      );
    }



    if (priceTo) {
      params.set(
        "priceTo",
        priceTo
      );
    }



    router.push(
      `/properties?${params.toString()}`
    );


  }





  return (


    <div className="mx-auto mt-10 max-w-6xl rounded-2xl bg-white p-4 shadow-2xl">


      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">



        {/* Сделка */}

        <select
  onChange={(e)=>setDealType(e.target.value)}
  className="rounded-xl border border-gray-300 p-4"
>

  <option value="">
    Все сделки
  </option>

  <option value="rent">
    Аренда
  </option>

  <option value="sale">
    Продажа
  </option>

</select>




        {/* Тип недвижимости */}

        <select
          onChange={(e)=>setType(e.target.value)}
          className="rounded-xl border border-gray-300 p-4"
        >

          <option value="">
            Тип недвижимости
          </option>


          {propertyTypes.map((item)=>(

            <option
              key={item}
              value={item}
            >
              {item}
            </option>

          ))}


        </select>





        {/* Район */}

        <select
          onChange={(e)=>setDistrict(e.target.value)}
          className="rounded-xl border border-gray-300 p-4"
        >

          <option value="">
            Все районы
          </option>


          {districts.map((item)=>(

            <option
              key={item}
              value={item}
            >
              {item}
            </option>

          ))}


        </select>





        {/* Комнаты */}

        <select
          onChange={(e)=>setRooms(e.target.value)}
          className="rounded-xl border border-gray-300 p-4"
        >

          <option value="">
            Комнаты
          </option>


          <option value="1">
            1
          </option>


          <option value="2">
            2
          </option>


          <option value="3">
            3
          </option>


          <option value="4">
            4+
          </option>


        </select>





        <input
          type="number"
          placeholder="Цена от"
          onChange={(e)=>setPriceFrom(e.target.value)}
          className="rounded-xl border border-gray-300 p-4"
        />




        <input
          type="number"
          placeholder="Цена до"
          onChange={(e)=>setPriceTo(e.target.value)}
          className="rounded-xl border border-gray-300 p-4"
        />




        <button
  type="button"
  onClick={() => search()}
  className="rounded-xl bg-red-600 px-6 py-4 font-bold text-white hover:bg-red-700"
>
  🔍 Найти
</button>



      </div>


    </div>


  );

}