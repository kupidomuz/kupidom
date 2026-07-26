import { supabase } from "@/lib/supabase";
import { updateUser } from "@/lib/userService";
import { redirect } from "next/navigation";


async function editUser(
  formData: FormData
) {

  "use server";


  const id = String(
    formData.get("id")
  );


  await updateUser(
    id,
    {

      name: String(
        formData.get("name") || ""
      ),

      email: String(
        formData.get("email") || ""
      ),

      phone: String(
        formData.get("phone") || ""
      ),

      telegram: String(
        formData.get("telegram") || ""
      ),

      password: String(
        formData.get("password") || ""
      ),

      role: String(
        formData.get("role") || "agent"
      ),

    }
  );


  redirect("/admin/users");

}





export default async function EditUserPage({
  params,
}: {
  params: Promise<{
    id:string;
  }>;
}) {


  const { id } = await params;



  const { data:user } =
    await supabase
      .from("users")
      .select("*")
      .eq(
        "id",
        id
      )
      .single();




  if (!user) {

    return (

      <main className="p-10">
        Пользователь не найден
      </main>

    );

  }




  return (

    <main className="mx-auto max-w-3xl px-6 py-10">


      <h1 className="mb-8 text-4xl font-bold">
        Редактировать агента
      </h1>



      <form
        action={editUser}
        className="space-y-5 rounded-2xl border bg-white p-8 shadow"
      >


        <input
          type="hidden"
          name="id"
          value={user.id}
        />



        <input
          name="name"
          defaultValue={user.name}
          placeholder="Имя"
          className="w-full rounded-xl border p-3"
        />



        <input
          name="email"
          defaultValue={user.email}
          placeholder="Email"
          className="w-full rounded-xl border p-3"
        />



        <input
          name="phone"
          defaultValue={user.phone || ""}
          placeholder="Телефон"
          className="w-full rounded-xl border p-3"
        />



        <input
          name="telegram"
          defaultValue={user.telegram || ""}
          placeholder="Telegram"
          className="w-full rounded-xl border p-3"
        />



        <input
          name="password"
          defaultValue={user.password}
          placeholder="Пароль"
          className="w-full rounded-xl border p-3"
        />



        <select
          name="role"
          defaultValue={user.role}
          className="w-full rounded-xl border p-3"
        >

          <option value="agent">
            👤 Агент
          </option>

          <option value="admin">
            👑 Админ
          </option>

        </select>




        <button
          type="submit"
          className="rounded-xl bg-red-600 px-8 py-3 text-white"
        >
          💾 Сохранить
        </button>



      </form>


    </main>

  );

}