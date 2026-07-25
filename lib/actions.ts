"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";



export async function addProperty(
  formData: FormData
) {

  const cookieStore = await cookies();

  const userCookie = cookieStore.get("user")?.value;

  const currentUser = userCookie
    ? JSON.parse(userCookie)
    : null;



  const { data: lastProperty } = await supabase
    .from("properties")
    .select("property_code")
    .not("property_code", "is", null)
    .order("created_at", {
      ascending: false
    })
    .limit(1)
    .single();



  let nextNumber = 1;


  if (lastProperty?.property_code) {

    nextNumber =
      Number(
        lastProperty.property_code.replace(
          "KD-",
          ""
        )
      ) + 1;

  }



  const propertyCode =
    "KD-" +
    String(nextNumber).padStart(
      5,
      "0"
    );



  const files =
    formData.getAll("images") as File[];



  const imageUrls: string[] = [];



  for (const file of files) {


    if (!file || file.size === 0) {
      continue;
    }



    const fileName =
      `${Date.now()}-${file.name}`;



    const { error: uploadError } =
      await supabase.storage
        .from("properties")
        .upload(
          fileName,
          file
        );



    if (uploadError) {

      console.error(
        "UPLOAD ERROR:",
        uploadError
      );

      continue;

    }



    const { data: publicUrl } =
      supabase.storage
        .from("properties")
        .getPublicUrl(fileName);



    imageUrls.push(
      publicUrl.publicUrl
    );


  }





  const propertyType = String(
    formData.get("propertyType") || ""
  );




  const data = {


    property_code: propertyCode,


    title: String(
      formData.get("title") || ""
    ),
deal_type: String(
  formData.get("dealType") || ""
),


property_type: String(
  formData.get("propertyType") || ""
),


currency: String(
  formData.get("currency") || "USD"
),

    description: String(
      formData.get("description") || ""
    ),


    images: imageUrls,



    type: propertyType,


    


    district: String(
      formData.get("district") || ""
    ),


    price: Number(
      formData.get("price") || 0
    ),


    


    address: String(
      formData.get("address") || ""
    ),


    landmark: String(
      formData.get("landmark") || ""
    ),


    residential_complex: String(
      formData.get("residential_complex") || ""
    ),


    rooms: Number(
      formData.get("rooms") || 0
    ),


    area: Number(
      formData.get("area") || 0
    ),


    floor: Number(
      formData.get("floor") || 0
    ),


    total_floors: Number(
      formData.get("total_floors") || 0
    ),


    renovation: String(
      formData.get("renovation") || ""
    ),


    building_type: String(
      formData.get("building_type") || ""
    ),


    owner_name: String(
      formData.get("owner_name") || ""
    ),


    owner_phone: String(
      formData.get("owner_phone") || ""
    ),


    telegram: String(
      formData.get("telegram") || ""
    ),


    status: "active",


    exclusive: false,


    agent_id:
      currentUser?.role === "agent"
        ? currentUser.id
        : (
            formData.get("agent_id")
              ? String(formData.get("agent_id"))
              : null
          ),


  };




  const { error } = await supabase
    .from("properties")
    .insert([
      data
    ]);



  if (error) {

    console.error(error);

    throw new Error(
      error.message
    );

  }



  revalidatePath(
    "/admin/properties"
  );


  redirect(
    "/admin/properties"
  );

}




export async function updateProperty(
  id: string,
  formData: FormData
) {


  let images: string[] = [];


  const imagesData = formData.get("images");


  if (imagesData) {

    images = JSON.parse(
      String(imagesData)
    );

  }

console.log(
  "CURRENCY VALUE:",
  formData.get("currency")
);

  const data = {


    title: String(
      formData.get("title") || ""
    ),
deal_type: String(
  formData.get("dealType") || ""
),


property_type: String(
  formData.get("propertyType") || ""
),


currency: String(
  formData.get("currency") || "USD"
),

    district: String(
      formData.get("district") || ""
    ),


    price: Number(
      formData.get("price") || 0
    ),


    address: String(
      formData.get("address") || ""
    ),


    landmark: String(
      formData.get("landmark") || ""
    ),


    residential_complex: String(
      formData.get("residential_complex") || ""
    ),


    rooms: Number(
      formData.get("rooms") || 0
    ),


    area: Number(
      formData.get("area") || 0
    ),


    floor: Number(
      formData.get("floor") || 0
    ),


    total_floors: Number(
      formData.get("total_floors") || 0
    ),


    renovation: String(
      formData.get("renovation") || ""
    ),


    building_type: String(
      formData.get("building_type") || ""
    ),


    owner_name: String(
      formData.get("owner_name") || ""
    ),


    owner_phone: String(
      formData.get("owner_phone") || ""
    ),
    telegram: String(
  formData.get("telegram") || ""
),


    description: String(
      formData.get("description") || ""
    ),

   images,

   


    status: String(
      formData.get("status") || "active"
    ),


    exclusive:
      formData.get("exclusive") === "true",


  };



  const { error } = await supabase
    .from("properties")
    .update(data)
    .eq(
      "id",
      id
    );



  if (error) {

    console.error(error);

    throw new Error(
      error.message
    );

  }



  revalidatePath(
    "/admin/properties"
  );


  revalidatePath(
    `/admin/properties/${id}`
  );



  redirect(
    `/admin/properties/${id}`
  );

}





export async function updatePropertyStatus(
  id: string,
  status: string,
  exclusive: boolean
) {


  const { error } = await supabase
    .from("properties")
    .update({
      status,
      exclusive,
    })
    .eq(
      "id",
      id
    );



  if (error) {

    console.error(error);

    throw new Error(
      error.message
    );

  }



  revalidatePath(
    "/admin/properties"
  );


  revalidatePath(
    `/admin/properties/${id}`
  );

}





export async function deleteProperty(
  id: string
) {


  const { error } = await supabase
    .from("properties")
    .delete()
    .eq(
      "id",
      id
    );



  if (error) {

    console.error(error);

    throw new Error(
      error.message
    );

  }



  revalidatePath(
    "/admin/properties"
  );


  redirect(
    "/admin/properties"
  );

}
export async function requestContact({
  property_id,
  agent_id,
}: {
  property_id: string;
  agent_id: string;
}) {


  const { error } = await supabase
    .from("contact_requests")
    .insert([
      {
        property_id,
        agent_id,
        status: "pending",
      },
    ]);



  if (error) {

    console.error(error);

    throw new Error(error.message);

  }


  return true;

}


export async function approveContactRequest(
  id: string
) {

  const { error } = await supabase
    .from("contact_requests")
    .update({
      status: "approved",
    })
    .eq(
      "id",
      id
    );


  if (error) {

    console.error(error);

    throw new Error(
      error.message
    );

  }

}




export async function rejectContactRequest(
  id: string
) {

  const { error } = await supabase
    .from("contact_requests")
    .update({
      status: "rejected",
    })
    .eq(
      "id",
      id
    );


  if (error) {

    console.error(error);

    throw new Error(
      error.message
    );

  }

}