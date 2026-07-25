import ContactRequestActions from "@/components/admin/ContactRequestActions";
import { getContactRequests } from "@/lib/propertyService";


export default async function RequestsPage() {


  const requests = await getContactRequests();



  return (

    <div className="space-y-8">


      <h1 className="text-4xl font-bold">
        📋 Запросы контактов
      </h1>



      {requests.length === 0 ? (

        <div className="rounded-2xl border bg-white p-8 text-gray-500">

          Нет новых запросов

        </div>


      ) : (


        <div className="space-y-5">


          {requests.map((request:any) => (


            <div
              key={request.id}
              className="rounded-2xl border bg-white p-6 shadow"
            >


              <h2 className="text-2xl font-bold">

                {request.property?.property_code}

              </h2>



              <p className="mt-2">

                🏠 {request.property?.title}

              </p>



              <p>

                👤 Агент: {request.agent?.name || "Не указан"}

              </p>



              <p>

                📧 {request.agent?.email || ""}

              </p>



              <p className="mt-3">

                Статус:

                <span className="ml-2 rounded-full bg-yellow-100 px-3 py-1">

                  {request.status}

                </span>

              </p>



              <ContactRequestActions
                id={request.id}
                status={request.status}
              />


            </div>


          ))}


        </div>


      )}


    </div>

  );

}