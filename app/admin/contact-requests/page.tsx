import { getContactRequests } from "@/lib/propertyService";
import {
  approveContactRequest,
  rejectContactRequest,
} from "@/lib/actions";


export const dynamic = "force-dynamic";


export default async function ContactRequestsPage() {


  const requests = await getContactRequests();



  return (

    <main className="mx-auto max-w-6xl px-6 py-10">


      <h1 className="mb-8 text-4xl font-bold">
        📋 Запросы контактов
      </h1>



      {requests.length === 0 ? (

        <p className="text-gray-500">
          Запросов пока нет
        </p>


      ) : (


        <div className="space-y-5">


          {requests.map((request:any) => (


            <div
              key={request.id}
              className="rounded-2xl border bg-white p-6 shadow"
            >


              <h2 className="text-xl font-bold">
                {request.property?.property_code}
                {" "}
                {request.property?.title}
              </h2>



              <div className="mt-4 space-y-2">


                <p>
                  👨‍💼 Агент:
                  {" "}
                  {request.agent?.name || "Без имени"}
                </p>


                <p>
                  📧 Email:
                  {" "}
                  {request.agent?.email || "-"}
                </p>


                <p>
                  📌 Статус:
                  {" "}
                  <b>{request.status}</b>
                </p>


              </div>




              <div className="mt-5 flex gap-3">


                <form
                  action={
                    approveContactRequest.bind(
                      null,
                      request.id
                    )
                  }
                >

                  <button
                    className="rounded-xl bg-green-600 px-5 py-3 text-white"
                  >
                    ✅ Одобрить
                  </button>


                </form>





                <form
                  action={
                    rejectContactRequest.bind(
                      null,
                      request.id
                    )
                  }
                >

                  <button
                    className="rounded-xl bg-red-600 px-5 py-3 text-white"
                  >
                    ❌ Отклонить
                  </button>


                </form>



              </div>



            </div>


          ))}



        </div>


      )}



    </main>

  );

}