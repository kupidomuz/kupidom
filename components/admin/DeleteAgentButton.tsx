"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";


export default function DeleteAgentButton({
  id,
}: {
  id:string;
}) {


  const router = useRouter();



  async function removeAgent() {


    const confirmDelete = confirm(
      "Удалить этого агента?"
    );


    if (!confirmDelete) return;



    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id);



    if (error) {

      alert(error.message);

      return;

    }



    router.refresh();


  }





  return (

    <button
      onClick={removeAgent}
      className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
    >
      🗑
    </button>

  );

}