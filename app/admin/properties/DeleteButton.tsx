"use client";

import { deleteProperty } from "@/lib/actions";


export default function DeleteButton({
  id,
}: {
  id: string;
}) {


  async function handleDelete() {

    const ok = confirm(
      "Удалить этот объект?"
    );


    if (!ok) return;


    await deleteProperty(id);

  }


  return (

    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-500 px-3 py-2 text-white"
    >
      🗑️
    </button>

  );

}