import { supabase } from "@/lib/supabase";
import Link from "next/link";
import AgentStatusButton from "@/components/admin/AgentStatusButton";

export default async function AgentsPage() {


  const { data: agents } = await supabase
    .from("users")
    .select("*")
    .eq("role", "agent")
    .order("created_at", {
      ascending: false,
    });



  const agentsWithStats = await Promise.all(

    (agents || []).map(async (agent) => {


      const { count } = await supabase
        .from("properties")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("agent_id", agent.id);



      return {
        ...agent,
        objectsCount: count || 0,
      };


    })

  );



  return (

    <main className="mx-auto max-w-7xl px-6 py-10">


      <div className="mb-8 flex items-center justify-between">


        <h1 className="text-4xl font-bold">
          👥 Агенты
        </h1>


        <Link
          href="/admin/agents/add"
          className="rounded-xl bg-red-600 px-5 py-3 text-white"
        >
          + Добавить агента
        </Link>


      </div>





      <div className="overflow-hidden rounded-2xl border bg-white shadow">


        <table className="w-full">


          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Имя
              </th>


              <th className="p-4 text-left">
                Телефон
              </th>


              <th className="p-4 text-left">
                Telegram
              </th>


              <th className="p-4 text-left">
                Объекты
              </th>


              <th className="p-4 text-left">
                Дата регистрации
              </th>


              <th className="p-4 text-left">
                Действия
              </th>
<th className="p-4 text-left">
  Статус
</th>

            </tr>

          </thead>





          <tbody>


            {agentsWithStats.map((agent) => (


              <tr
                key={agent.id}
                className="border-t"
              >



                <td className="p-4 font-semibold">

                  <Link
                    href={`/admin/agents/${agent.id}`}
                    className="text-red-600 hover:underline"
                  >
                    {agent.name}
                  </Link>

                </td>




                <td className="p-4">
                  {agent.phone || "-"}
                </td>




                <td className="p-4">
                  {agent.telegram || "-"}
                </td>




                <td className="p-4">

                  <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                    {agent.objectsCount}
                  </span>

                </td>




                <td className="p-4 text-gray-500">

                  {new Date(agent.created_at)
                    .toLocaleDateString("ru-RU")}

                </td>




                <td className="p-4">

                  <div className="flex gap-2">


                    <Link
                      href={`/admin/agents/${agent.id}`}
                      className="rounded-lg bg-gray-200 px-3 py-2 text-sm"
                    >
                      👁
                    </Link>


                    <Link
                      href={`/admin/agents/${agent.id}/edit`}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
                    >
                      ✏️
                    </Link>


                  </div>


                </td>
<td className="p-4">

  <div className="mb-2">

    {agent.status === "active" ? (

      <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
        🟢 Активен
      </span>

    ) : (

      <span className="rounded-full bg-red-100 px-3 py-1 text-red-700">
        🔴 Заблокирован
      </span>

    )}

  </div>


  <AgentStatusButton
    id={agent.id}
    status={agent.status}
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