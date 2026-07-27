"use client";

import { useState } from "react";


export default function PropertyFilters({
  properties,
  onFilter,
}: {
  properties: any[];
  onFilter: (data: any[]) => void;
}) {


  const [category, setCategory] = useState("all");
  const [deal, setDeal] = useState("all");
  const [district, setDistrict] = useState("all");
  const [rooms, setRooms] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");



  function applyFilters() {


    let result = [...properties];



    if (category !== "all") {

      result = result.filter(
        (item) =>
          item.category === category
      );

    }



    if (deal !== "all") {

      result = result.filter(
        (item) =>
          item.deal_type === deal
      );

    }



    if (district !== "all") {

      result = result.filter(
        (item) =>
          item.district === district
      );

    }




    if (rooms !== "all") {

      result = result.filter(
        (item) =>
          rooms === "4+"
            ? item.rooms >= 4
            : item.rooms === Number(rooms)
      );

    }




    if (minPrice) {

      result = result.filter(
        (item) =>
          Number(item.price) >= Number(minPrice)
      );

    }





    if (maxPrice) {

      result = result.filter(
        (item) =>
          Number(item.price) <= Number(maxPrice)
      );

    }



    onFilter(result);

  }





  const districts = [
    ...new Set(
      properties.map(
        (item)=>item.district
      )
    )
  ];




  return (

    <div className="mb-8 rounded-2xl border bg-white p-5 shadow">


      <div className="grid gap-4 md:grid-cols-6">



        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className="rounded-xl border p-3"
        >

          <option value="all">
            Все категории
          </option>

          <option value="sale">
            🏠 Купить
          </option>

          <option value="rent">
            🔑 Аренда
          </option>

          <option value="newbuilding">
            🏗 Новостройки
          </option>

          <option value="commercial">
            🏢 Коммерция
          </option>

        </select>





        <select
          value={deal}
          onChange={(e)=>setDeal(e.target.value)}
          className="rounded-xl border p-3"
        >

          <option value="all">
            Все сделки
          </option>

          <option value="sale">
            Продажа
          </option>

          <option value="rent">
            Аренда
          </option>

        </select>





        <select
          value={district}
          onChange={(e)=>setDistrict(e.target.value)}
          className="rounded-xl border p-3"
        >

          <option value="all">
            Все районы
          </option>


          {districts.map(
            (item:any)=>(

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            )
          )}


        </select>





        <select
          value={rooms}
          onChange={(e)=>setRooms(e.target.value)}
          className="rounded-xl border p-3"
        >

          <option value="all">
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

          <option value="4+">
            4+
          </option>


        </select>





        <input
          type="number"
          placeholder="Цена от"
          value={minPrice}
          onChange={(e)=>setMinPrice(e.target.value)}
          className="rounded-xl border p-3"
        />





        <input
          type="number"
          placeholder="Цена до"
          value={maxPrice}
          onChange={(e)=>setMaxPrice(e.target.value)}
          className="rounded-xl border p-3"
        />



      </div>




      <button

        onClick={applyFilters}

        className="mt-5 rounded-xl bg-red-600 px-6 py-3 text-white"

      >

        🔎 Найти

      </button>



    </div>

  );

}