import { supabase } from "./supabase";
import { getCurrentUser } from "./auth";




export async function getProperties() {


  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order(
      "created_at",
      {
        ascending: false
      }
    );


  if (error) {

    console.error(
      "GET PROPERTIES ERROR:",
      error
    );

    return [];

  }


  return data || [];

}






export async function getPropertyById(
  id: string
) {


  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq(
      "id",
      id
    )
    .single();



  if (error) {

    console.error(
      "GET PROPERTY ERROR:",
      error
    );

    return null;

  }



  let agent = null;



  if (data.agent_id) {


    const { data: agentData } =
      await supabase
        .from("users")
        .select(
          "id, name, email, phone, telegram"
        )
        .eq(
          "id",
          data.agent_id
        )
        .single();



    agent = agentData;

  }



  return {
    ...data,
    agent,
  };

}







export async function getContactRequests() {


  const { data, error } = await supabase
    .from("contact_requests")
    .select("*")
    .order(
      "created_at",
      {
        ascending: false
      }
    );



  if (error) {

    console.error(
      "GET REQUESTS ERROR:",
      error
    );

    return [];

  }





  const requests = await Promise.all(

    data.map(async (request) => {


      const { data: property } =
        await supabase
          .from("properties")
          .select(
            "id, property_code, title"
          )
          .eq(
            "id",
            request.property_id
          )
          .single();






      const { data: agent } =
        await supabase
          .from("users")
          .select(
            "id, name, email, phone, telegram"
          )
          .eq(
            "id",
            request.agent_id
          )
          .single();






      return {

        ...request,

        property,

        agent,

      };


    })

  );




  return requests;

}