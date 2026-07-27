import { supabase } from "@/lib/supabase";


export default async function AdminPage() {


  const { count: totalProperties } = await supabase
    .from("properties")
    .select("*", {
      count: "exact",
      head: true,
    });



  const { count: activeProperties } = await supabase
    .from("properties")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("status", "active");



  const { count: agentsCount } = await supabase
    .from("users")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("role", "agent");



  const { count: requestsCount } = await supabase
    .from("contact_requests")
    .select("*", {
      count: "exact",
      head: true,
    });



  const { count: exclusiveCount } = await supabase
    .from("properties")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("exclusive", true);





  const { data: latestProperties } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(5);





  return (

    <main>


      <h1 className="mb-8 text-4xl font-bold">
        📊 Панель управления
      </h1>





      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">



        <div className="rounded-2xl border bg-white p-6 shadow">

          <div className="text-4xl">
            🏠
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            {totalProperties || 0}
          </h2>

          <p className="text-gray-500">
            Всего объектов
          </p>

        </div>





        <div className="rounded-2xl border bg-white p-6 shadow">

          <div className="text-4xl">
            🟢
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            {activeProperties || 0}
          </h2>

          <p className="text-gray-500">
            Активные
          </p>

        </div>





        <div className="rounded-2xl border bg-white p-6 shadow">

          <div className="text-4xl">
            👥
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            {agentsCount || 0}
          </h2>

          <p className="text-gray-500">
            Агенты
          </p>

        </div>





        <div className="rounded-2xl border bg-white p-6 shadow">

          <div className="text-4xl">
            📩
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            {requestsCount || 0}
          </h2>

          <p className="text-gray-500">
            Запросы
          </p>

        </div>





        <div className="rounded-2xl border bg-white p-6 shadow">

          <div className="text-4xl">
            ⭐
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            {exclusiveCount || 0}
          </h2>

          <p className="text-gray-500">
            Эксклюзив
          </p>

        </div>



      </div>





      <div className="mt-10 rounded-2xl border bg-white p-6 shadow">


        <h2 className="mb-5 text-2xl font-bold">
          🏡 Последние добавленные объекты
        </h2>




        <div className="space-y-3">


          {(latestProperties || []).map((property:any)=>(


            <div
              key={property.id}
              className="flex justify-between rounded-xl bg-gray-50 p-4"
            >

              <div>

                <p className="font-bold text-red-600">
                  {property.property_code}
                </p>

                <p>
                  {property.title}
                </p>

              </div>


              <div className="font-semibold">
                {Number(property.price).toLocaleString()} {property.currency || "$"}
              </div>


            </div>


          ))}


        </div>


      </div>



    </main>

  );

}