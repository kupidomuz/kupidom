"use client";

import { useState } from "react";
import { updatePropertyStatus } from "@/lib/actions";


export default function PropertyStatus({
  id,
  currentStatus,
  currentExclusive,
}: {
  id: string;
  currentStatus: string;
  currentExclusive: boolean;
}) {


  const [status, setStatus] = useState(
    currentStatus
  );

  const [exclusive, setExclusive] = useState(
    currentExclusive
  );


  async function saveStatus(
    newStatus: string,
    newExclusive: boolean
  ) {

    setStatus(newStatus);

    setExclusive(newExclusive);


    await updatePropertyStatus(
      id,
      newStatus,
      newExclusive
    );

  }



  return (

    <div className="flex flex-wrap gap-3">


      <select

        value={status}

        onChange={(e)=>
          saveStatus(
            e.target.value,
            exclusive
          )
        }

        className="rounded-full border px-4 py-2"

      >

        <option value="active">
          🟢 Активный
        </option>


        <option value="sold">
          ✅ Продан
        </option>


        <option value="hidden">
          ❌ Скрыт
        </option>


      </select>





      <button

        onClick={() =>
          saveStatus(
            status,
            !exclusive
          )
        }

        className={
          exclusive

          ? "rounded-full bg-red-100 px-4 py-2 text-red-700"

          : "rounded-full bg-gray-100 px-4 py-2 text-gray-700"
        }

      >

        {exclusive
          ? "⭐ Эксклюзив"
          : "☆ Сделать эксклюзив"}

      </button>



    </div>

  );

}