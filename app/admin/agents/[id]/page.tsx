import Link from "next/link";
import { supabase } from "@/lib/supabase";


export default async function AgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;



  const { data: agent } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();



  if (!agent) {

    return (

      <main className="p-10 text-center">

        <h1 className="text-3xl font-bold">
          Агент не найден
        </h1>

      </main>

    );

  }



  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .eq("agent_id", id)
    .order("created_at", {
      ascending: false,
    });



  const activeCount =
    properties?.filter(
      (item) => item.status === "active"
    ).length || 0;



  const soldCount =
    properties?.filter(
      (item) => item.status === "sold"
    ).length || 0;



  return (

    <main className="mx-auto max-w-6xl px-6 py-10">


      <div className="mb-8 flex items-center justify-between">


        <h1 className="text-4xl font-bold">
          👤 {agent.name}
        </h1>


        <Link
          href="/admin/agents"
          className="rounded-xl bg-gray-200 px-5 py-3"
        >
          ← Назад
        </Link>


      </div>




      <div className="grid gap-6 md:grid-cols-3">


        <div className="rounded-2xl border bg-white p-6 shadow">

          <p className="text-gray-500">
            Телефон
          </p>

          <p className="mt-2 text-xl font-bold">
            {agent.phone || "-"}
          </p>

        </div>



        <div className="rounded-2xl border bg-white p-6 shadow">

          <p className="text-gray-500">
            Telegram
          </p>

          <p className="mt-2 text-xl font-bold">
            {agent.telegram || "-"}
          </p>

        </div>



        <div className="rounded-2xl border bg-white p-6 shadow">

          <p className="text-gray-500">
            Всего объектов
          </p>

          <p className="mt-2 text-xl font-bold text-red-600">
            {properties?.length || 0}
          </p>

        </div>


      </div>





      <div className="mt-8 grid gap-6 md:grid-cols-2">


        <div className="rounded-2xl bg-green-100 p-6">

          <h2 className="text-xl font-bold">
            🟢 Активные
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {activeCount}
          </p>

        </div>



        <div className="rounded-2xl bg-gray-100 p-6">

          <h2 className="text-xl font-bold">
            ✅ Проданные
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {soldCount}
          </p>

        </div>


      </div>





      <div className="mt-8 rounded-2xl border bg-white p-6 shadow">


        <h2 className="mb-5 text-2xl font-bold">
          🏠 Объекты агента
        </h2>



        {properties?.length === 0 ? (

          <p className="text-gray-500">
            Объектов нет
          </p>

        ) : (


          <div className="space-y-4">


            {properties?.map((property) => (

              <Link
                key={property.id}
                href={`/property/${property.id}`}
                className="block rounded-xl border p-4 hover:bg-gray-50"
              >


                <div className="flex justify-between">


                  <div>

                    <p className="font-bold text-red-600">
                      {property.property_code}
                    </p>


                    <p>
                      {property.title}
                    </p>


                  </div>


                  <div className="font-bold">
                    {Number(property.price).toLocaleString()} {property.currency}
                  </div>


                </div>


              </Link>


            ))}


          </div>


        )}


      </div>



    </main>

  );

}