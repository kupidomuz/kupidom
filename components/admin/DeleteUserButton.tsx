"use client";

import { deleteUser } from "@/lib/userService";
import { useRouter } from "next/navigation";


export default function DeleteUserButton({
  id,
}: {
  id:string;
}) {


  const router = useRouter();



  async function remove() {


    const confirmDelete =
      confirm(
        "Удалить этого пользователя?"
      );


    if (!confirmDelete) {
      return;
    }



    await deleteUser(id);


    router.refresh();

  }



  return (

    <button
      onClick={remove}
      className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
    >
      🗑 Удалить
    </button>

  );

}