import { supabase } from "./supabase";


export async function getAgents() {


  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq(
      "role",
      "agent"
    )
    .order(
      "name",
      {
        ascending: true
      }
    );


  if (error) {

    console.error(
      "GET AGENTS ERROR:",
      error
    );

    return [];

  }


  return data || [];

}