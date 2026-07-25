"use client";

import {
  approveContactRequest,
  rejectContactRequest,
} from "@/lib/actions";

import { useState } from "react";


export default function ContactRequestActions({
  id,
  status,
}: {
  id: string;
  status: string;
}) {


  const [loading, setLoading] = useState(false);



  async function approve() {

    setLoading(true);

    await approveContactRequest(id);

    window.location.reload();

  }



  async function reject() {

    setLoading(true);

    await rejectContactRequest(id);

    window.location.reload();

  }



  if (status === "approved") {

    return (

      <div className="mt-5 rounded-xl bg-green-100 px-5 py-3 text-green-700">

        ✅ Контакт открыт

      </div>

    );

  }



  if (status === "rejected") {

    return (

      <div className="mt-5 rounded-xl bg-red-100 px-5 py-3 text-red-700">

        ❌ Запрос отклонён

      </div>

    );

  }



  return (

    <div className="mt-5 flex gap-3">


      <button
        onClick={approve}
        disabled={loading}
        className="rounded-xl bg-green-600 px-5 py-2 text-white disabled:opacity-50"
      >

        ✅ Разрешить

      </button>



      <button
        onClick={reject}
        disabled={loading}
        className="rounded-xl bg-red-600 px-5 py-2 text-white disabled:opacity-50"
      >

        ❌ Отклонить

      </button>


    </div>

  );

}