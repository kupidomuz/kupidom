import { supabase } from "./supabase";


// Получить всех агентов
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




// Получить всех пользователей
export async function getUsers() {


  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order(
      "created_at",
      {
        ascending: false
      }
    );


  if (error) {

    console.error(
      "GET USERS ERROR:",
      error
    );

    return [];

  }


  return data || [];

}





// Создать нового агента
export async function createAgent({
  name,
  email,
  password,
  phone,
  telegram,
}: {
  name:string;
  email:string;
  password:string;
  phone?:string;
  telegram?:string;
}) {


  const { data, error } =
    await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password,
          phone,
          telegram,
          role:"agent",
        },
      ])
      .select()
      .single();



  if (error) {

    console.error(
      "CREATE AGENT ERROR:",
      error
    );

    throw new Error(
      error.message
    );

  }


  return data;

}






// Обновить данные пользователя
export async function updateUser(
  id:string,
  data:{
    name?:string;
    email?:string;
    phone?:string;
    telegram?:string;
    password?:string;
    role?:string;
  }
) {


  const { error } =
    await supabase
      .from("users")
      .update(data)
      .eq(
        "id",
        id
      );



  if (error) {

    console.error(
      "UPDATE USER ERROR:",
      error
    );

    throw new Error(
      error.message
    );

  }


  return true;

}






// Удалить пользователя
export async function deleteUser(
  id:string
) {


  const { error } =
    await supabase
      .from("users")
      .delete()
      .eq(
        "id",
        id
      );



  if (error) {

    console.error(
      "DELETE USER ERROR:",
      error
    );

    throw new Error(
      error.message
    );

  }


  return true;

}