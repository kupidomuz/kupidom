"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteProperty } from "@/lib/actions";


export default function PropertiesTable({
  properties,
  user,
}: {
  properties: any[];
  user: any;
}) {
console.log("CURRENT USER:", user);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [copied, setCopied] = useState("");



  function copyId(id:string) {

    navigator.clipboard.writeText(id);

    setCopied(id);


    setTimeout(() => {

      setCopied("");

    }, 1500);

  }





  const filteredProperties = properties.filter((property) => {


    const text =
      `${property.property_code || ""} ${property.title || ""} ${property.district || ""}`
        .toLowerCase();



    const matchesSearch =
      text.includes(
        search.toLowerCase()
      );



    const matchesStatus =
      status === "all"
        ? true
        : status === "exclusive"
        ? property.exclusive === true
        : property.status === status;



    return matchesSearch && matchesStatus;


  });





  return (

    <>

      <div className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">


        <div className="grid gap-4 md:grid-cols-2">


          <input
            placeholder="🔎 Поиск по ID, названию, району"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="rounded-xl border p-3"
          />



          <select
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
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





      <div className="overflow-hidden rounded-2xl border bg-white shadow">


        <table className="w-full">


          <thead className="bg-gray-100">


            <tr>

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Фото
              </th>

              <th className="p-4 text-left">
                Название
              </th>

              <th className="p-4 text-left">
                Район
              </th>

              <th className="p-4 text-left">
  Цена
</th>

<th className="p-4 text-left">
  Агент
</th>

              <th className="p-4 text-left">
                Статус
              </th>

              <th className="p-4 text-left">
                Действия
              </th>

            </tr>


          </thead>





          <tbody>


          {filteredProperties.map((property:any)=>(


            <tr
              key={property.id}
              className="border-t"
            >



              <td className="p-4 font-bold text-red-600">


                <div className="flex items-center gap-2">


                  <Link
                    href={`/admin/properties/${property.id}`}
                    className="hover:underline"
                  >

                    {property.property_code || "Нет ID"}

                  </Link>



                  {property.property_code && (

                    <button

                      type="button"

                      onClick={() =>
                        copyId(
                          property.property_code
                        )
                      }

                      className="rounded-lg bg-gray-100 px-2 py-1 text-sm text-gray-700"

                    >

                      {copied === property.property_code
                        ? "✅"
                        : "📋"}

                    </button>

                  )}


                </div>


              </td>





              <td className="p-4">


                {property.images?.length > 0 ? (

                  <img
                    src={property.images[0]}
                    alt=""
                    className="h-20 w-28 rounded-xl object-cover"
                  />


                ) : (


                  <div className="flex h-20 w-28 items-center justify-center rounded-xl bg-gray-100 text-xs">

                    Нет фото

                  </div>


                )}


              </td>





              <td className="p-4 font-medium">


                <Link
                  href={`/admin/properties/${property.id}`}
                  className="hover:underline"
                >

                  {property.exclusive && "⭐ "}

                  {property.title}

                </Link>


              </td>





              <td className="p-4">

                {property.district}

              </td>





              <td className="p-4 font-bold text-red-600">


                {Number(property.price).toLocaleString()} $


              </td>

<td className="p-4">

  {property.agent ? (

    <div>

      <div className="font-medium">
        👤 {property.agent.name}
      </div>

      {property.agent.phone && (
        <div className="text-sm text-gray-500">
          📞 {property.agent.phone}
        </div>
      )}

    </div>

  ) : (

    <span className="text-gray-400">
      Без агента
    </span>

  )}

</td>



              <td className="p-4">


                {property.status === "sold"

                  ? "✅ Продан"

                  : property.status === "hidden"

                  ? "❌ Скрыт"

                  : "🟢 Активный"

                }


              </td>





              <td className="p-4">


               <div className="flex gap-2">


  <Link

    href={`/property/${property.id}`}

    target="_blank"

    className="rounded-lg bg-green-600 px-3 py-2 text-white"

  >

    🌐

  </Link>





 {user?.role === "admin" && (

  <>

    <Link
      href={`/admin/properties/${property.id}/edit`}
      className="rounded-lg bg-blue-500 px-3 py-2 text-white"
    >
      ✏️
    </Link>


    <form
      action={deleteProperty.bind(null, property.id)}
    >

      <button
        className="rounded-lg bg-red-500 px-3 py-2 text-white"
      >
        🗑️
      </button>

    </form>

  </>

)}


</div>


        </td>       


              



            </tr>


          ))}


          </tbody>


        </table>


      </div>


    </>

  );

}