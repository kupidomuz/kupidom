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
      priceTo,
    });

    const params = new URLSearchParams();

    if (dealType) {
      params.set("dealType", dealType);
    }

    if (type) {
      params.set("type", type);
    }

    if (district) {
      params.set("district", district);
    }

    if (rooms) {
      params.set("rooms", rooms);
    }

    if (priceFrom) {
      params.set("priceFrom", priceFrom);
    }

    if (priceTo) {
      params.set("priceTo", priceTo);
    }

    router.push(`/properties?${params.toString()}`);
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-6xl rounded-2xl bg-white p-3 shadow-2xl sm:mt-8 sm:p-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-6">

        {/* Сделка */}
        <select
          value={dealType}
          onChange={(e) => setDealType(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 sm:p-4 sm:text-base"
        >
          <option value="">
            Все сделки
          </option>

          <option value="sale">
            Продажа
          </option>

          <option value="rent">
            Аренда
          </option>
        </select>

        {/* Тип недвижимости */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 sm:p-4 sm:text-base"
        >
          <option value="">
            Тип недвижимости
          </option>

          {propertyTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Район */}
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 sm:p-4 sm:text-base"
        >
          <option value="">
            Все районы
          </option>

          {districts.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Комнаты */}
        <select
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 sm:p-4 sm:text-base"
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

        {/* Цена от */}
        <input
          type="number"
          value={priceFrom}
          placeholder="Цена от"
          onChange={(e) => setPriceFrom(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 placeholder-gray-500 sm:p-4 sm:text-base"
        />

        {/* Цена до */}
        <input
          type="number"
          value={priceTo}
          placeholder="Цена до"
          onChange={(e) => setPriceTo(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 placeholder-gray-500 sm:p-4 sm:text-base"
        />

        {/* Кнопка */}
        <button
          type="button"
          onClick={search}
          className="col-span-2 w-full rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700 sm:py-4 md:col-span-6"
        >
          🔍 Найти
        </button>
      </div>
    </div>
  );
}