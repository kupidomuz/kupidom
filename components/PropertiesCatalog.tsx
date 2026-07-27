"use client";

import { useState } from "react";
import Link from "next/link";
import PropertyFilters from "./PropertyFilters";


export default function PropertiesCatalog({
  properties,
}: {
  properties: any[];
}) {


  const [filtered, setFiltered] = useState(properties);



  return (

    <>

      <PropertyFilters
        properties={properties}
        onFilter={setFiltered}
      />



      {filtered.length === 0 ? (

        <p className="text-gray-500">
          Объекты не найдены
        </p>


      ) : (


        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">


          {filtered.map((property: any) => (


            <div
              key={property.id}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm"
            >


              {property.images?.length > 0 ? (

                <img
                  src={property.images[0]}
                  alt={property.title || "Объект"}
                  className="h-64 w-full object-cover"
                />

              ) : (

                <div className="flex h-64 items-center justify-center bg-gray-100 text-gray-400">
                  Нет фото
                </div>

              )}






              <div className="p-6">



                <div className="flex flex-wrap items-center gap-2">


                  <div className="font-bold text-red-600">
                    {property.property_code}
                  </div>



                  {property.deal_type === "rent" ? (

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      🏠 Аренда
                    </span>

                  ) : (

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      🏷 Продажа
                    </span>

                  )}





                  {property.category === "newbuilding" && (

                    <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">
                      🏗 Новостройка
                    </span>

                  )}





                  {property.category === "commercial" && (

                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                      🏢 Коммерция
                    </span>

                  )}





                </div>





                <h2 className="mt-2 text-xl font-bold">
                  {property.title}
                </h2>





                <p className="mt-2 text-gray-500">
                  📍 {property.district}
                </p>





                <p className="mt-4 text-2xl font-bold text-red-600">
                  {Number(property.price).toLocaleString()} {property.currency || "$"}
                </p>





                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">



                  <div className="rounded-lg bg-gray-100 p-3">
                    🛏 {property.rooms} комн.
                  </div>




                  <div className="rounded-lg bg-gray-100 p-3">
                    📐 {property.area} м²
                  </div>




                  <div className="rounded-lg bg-gray-100 p-3">
                    🏢 {property.floor}/{property.total_floors}
                  </div>




                  <div className="rounded-lg bg-gray-100 p-3">
                    🏠 {property.property_type}
                  </div>




                </div>





                <Link
                  href={`/property/${property.id}`}
                  className="mt-5 block rounded-xl bg-blue-600 px-5 py-3 text-center text-white"
                >
                  Подробнее
                </Link>




              </div>



            </div>



          ))}



        </div>


      )}



    </>

  );

}