import { createAgent } from "@/lib/userService";
import { redirect } from "next/navigation";


async function addAgent(formData: FormData) {

  "use server";


  await createAgent({

    name: String(
      formData.get("name") || ""
    ),

    email: String(
      formData.get("email") || ""
    ),

    password: String(
      formData.get("password") || ""
    ),

    phone: String(
      formData.get("phone") || ""
    ),

    telegram: String(
      formData.get("telegram") || ""
    ),

  });



  redirect("/admin/users");

}





export default function AddAgentPage() {


  return (

    <main className="mx-auto max-w-3xl px-6 py-10">


      <h1 className="mb-8 text-4xl font-bold">
        Добавить агента
      </h1>




      <form
        action={addAgent}
        className="space-y-6 rounded-2xl border bg-white p-8 shadow"
      >


        <input
          name="name"
          placeholder="Имя агента"
          className="w-full rounded-xl border p-3"
          required
        />



        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border p-3"
          required
        />



        <input
          name="password"
          placeholder="Пароль"
          className="w-full rounded-xl border p-3"
          required
        />



        <input
          name="phone"
          placeholder="Телефон"
          className="w-full rounded-xl border p-3"
        />



        <input
          name="telegram"
          placeholder="Telegram (@username)"
          className="w-full rounded-xl border p-3"
        />




        <button
          type="submit"
          className="rounded-xl bg-red-600 px-8 py-3 text-white hover:bg-red-700"
        >
          💾 Создать агента
        </button>



      </form>


    </main>

  );

}