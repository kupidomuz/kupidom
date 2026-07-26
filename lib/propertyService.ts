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



  const properties = await Promise.all(

    data.map(async (property) => {


      if (!property.agent_id) {

        return {
          ...property,
          agent: null,
        };

      }



      const { data: agent } =
        await supabase
          .from("users")
          .select(
            "id, name, phone, telegram"
          )
          .eq(
            "id",
            property.agent_id
          )
          .single();



      return {

        ...property,

        agent,

      };


    })

  );



  return properties;

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
    .maybeSingle();



  if (error) {

    console.error(
      "GET PROPERTY ERROR:",
      error
    );

    return null;

  }



  if (!data) {

    console.error(
      "PROPERTY NOT FOUND:",
      id
    );

    return null;

  }



  let agent = null;



  if (data.agent_id) {


    const { data: agentData } =
      await supabase
        .from("users")
        .select(
          "id,name,email,phone,telegram"
        )
        .eq(
          "id",
          data.agent_id
        )
        .maybeSingle();



    agent = agentData || null;

  }



  return {
    ...data,
    agent,
  };

}export async function getSimilarProperties(
  propertyId: string,
  district: string,
  dealType: string
) {


  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq(
      "district",
      district
    )
    .eq(
      "deal_type",
      dealType
    )
    .neq(
      "id",
      propertyId
    )
    .eq(
      "status",
      "active"
    )
    .limit(4);



  if(error){

    console.error(
      "SIMILAR PROPERTIES ERROR:",
      error
    );

    return [];

  }



  return data || [];

}export async function getPublicProperties() {


  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq(
      "status",
      "active"
    )
    .order(
      "created_at",
      {
        ascending: false
      }
    );


  if (error) {

    console.error(
      "GET PUBLIC PROPERTIES ERROR:",
      error
    );

    return [];

  }


  return data || [];

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
export async function getCompanySettings() {


  const { data, error } = await supabase
    .from("company_settings")
    .select("*")
    .limit(1)
    .single();



  if (error) {

    console.error(
      "GET COMPANY SETTINGS ERROR:",
      error
    );

    return null;

  }



  return data;

}