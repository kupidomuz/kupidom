import { getUsers } from "@/lib/userService";
import Link from "next/link";
import DeleteUserButton from "@/components/admin/DeleteUserButton";

export default async function UsersPage() {


  const users = await getUsers();



  return (

    <main className="mx-auto max-w-7xl px-6 py-10">


      <div className="mb-8 flex items-center justify-between">


        <h1 className="text-4xl font-bold">
          Агенты и пользователи
        </h1>



        <Link
          href="/admin/users/add"
          className="rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
        >
          + Добавить агента
        </Link>


      </div>





      <div className="overflow-hidden rounded-2xl border bg-white">


        <table className="w-full">


          <thead className="bg-gray-100">


            <tr>


              <th className="p-4 text-left">
                Имя
              </th>


              <th className="p-4 text-left">
                Email
              </th>


              <th className="p-4 text-left">
                Телефон
              </th>


              <th className="p-4 text-left">
                Telegram
              </th>


              <th className="p-4 text-left">
                Роль
              </th>
<th className="p-4 text-left">
  Действия
</th>

            </tr>


          </thead>





          <tbody>


            {users.map((user:any)=>(


              <tr
                key={user.id}
                className="border-t"
              >


                <td className="p-4">
                  {user.name}
                </td>



                <td className="p-4">
                  {user.email}
                </td>



                <td className="p-4">
                  {user.phone || "-"}
                </td>



                <td className="p-4">
                  {user.telegram || "-"}
                </td>



                <td className="p-4">

                  {user.role === "admin"
                    ? "👑 Админ"
                    : "👤 Агент"}

                </td>
<td className="p-4 flex gap-2">


  <Link
    href={`/admin/users/${user.id}/edit`}
    className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
  >
    ✏️ Изменить
  </Link>



  <DeleteUserButton
    id={user.id}
  />


</td>


              </tr>


            ))}


          </tbody>


        </table>


      </div>


    </main>

  );

}