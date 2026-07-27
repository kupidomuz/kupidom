import { supabase } from "@/lib/supabase";


export default async function AnalyticsPage() {


  const { count: totalProperties } = await supabase
    .from("properties")
    .select("*", {
      count: "exact",
      head: true,
    });



  const { count: rentCount } = await supabase
    .from("properties")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("deal_type", "rent");



  const { count: saleCount } = await supabase
    .from("properties")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("deal_type", "sale");



  const { count: activeCount } = await supabase
    .from("properties")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("status", "active");



  const { data: agents } = await supabase
    .from("users")
    .select("*")
    .eq("role", "agent");



  const agentsStats = await Promise.all(

    (agents || []).map(async (agent)=>{


      const { count } = await supabase
        .from("properties")
        .select("*",{
          count:"exact",
          head:true,
        })
        .eq("agent_id",agent.id);



      return {
        name: agent.name,
        count: count || 0,
      };


    })

  );





  return (

    <main>


      <h1 className="mb-8 text-4xl font-bold">
        📊 Аналитика
      </h1>





      <div className="grid gap-6 md:grid-cols-4">



        <div className="rounded-2xl border bg-white p-6 shadow">

          <div className="text-3xl">
            🏠
          </div>

          <p className="mt-3 text-3xl font-bold">
            {totalProperties || 0}
          </p>

          <p className="text-gray-500">
            Всего объектов
          </p>

        </div>




        <div className="rounded-2xl border bg-white p-6 shadow">

          <div className="text-3xl">
            🏡
          </div>

          <p className="mt-3 text-3xl font-bold">
            {rentCount || 0}
          </p>

          <p className="text-gray-500">
            Аренда
          </p>

        </div>




        <div className="rounded-2xl border bg-white p-6 shadow">

          <div className="text-3xl">
            🏷
          </div>

          <p className="mt-3 text-3xl font-bold">
            {saleCount || 0}
          </p>

          <p className="text-gray-500">
            Продажа
          </p>

        </div>




        <div className="rounded-2xl border bg-white p-6 shadow">

          <div className="text-3xl">
            🟢
          </div>

          <p className="mt-3 text-3xl font-bold">
            {activeCount || 0}
          </p>

          <p className="text-gray-500">
            Активные
          </p>

        </div>



      </div>






      <div className="mt-10 rounded-2xl border bg-white p-6 shadow">


        <h2 className="mb-5 text-2xl font-bold">
          👥 Активность агентов
        </h2>




        <table className="w-full">


          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Агент
              </th>

              <th className="p-4 text-left">
                Объекты
              </th>

            </tr>

          </thead>



          <tbody>


            {agentsStats.map((agent)=>(
              
              <tr
                key={agent.name}
                className="border-t"
              >

                <td className="p-4 font-semibold">
                  {agent.name}
                </td>

                <td className="p-4">
                  {agent.count}
                </td>

              </tr>

            ))}



          </tbody>


        </table>


      </div>



    </main>

  );

}