"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";


export async function toggleAgentStatus(
  id: string,
  currentStatus: string
) {


  const newStatus =
    currentStatus === "active"
      ? "blocked"
      : "active";


  const { error } = await supabase
    .from("users")
    .update({
      status: newStatus,
    })
    .eq("id", id);



  if (error) {

    throw new Error(error.message);

  }



  revalidatePath("/admin/agents");

}