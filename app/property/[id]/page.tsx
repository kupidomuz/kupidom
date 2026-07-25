import PropertyGallery from "@/components/PropertyGallery";
import { getPropertyById } from "@/lib/propertyService";
import ShareButton from "@/components/ShareButton";


export const dynamic = "force-dynamic";



export default async function PublicPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;


  const property = await getPropertyById(id);



  if (!property) {

    return (

      <main className="p-10 text-center">

        <h1 className="text-3xl font-bold">
          Объект не найден
        </h1>

      </main>

    );

  }



  return (

    <main className="mx-auto max-w-6xl px-6 py-10">


      {/* Фотографии объекта */}

<PropertyGallery
  images={property.images || []}
/>



      <div className="mb-8">


        <div className="flex flex-wrap items-center gap-3">


          <span className="text-xl font-bold text-red-600">

            {property.property_code}

          </span>

          {property.status === "sold" ? (

            <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">

              ✅ Продан

            </span>


          ) : property.status === "hidden" ? (

            <span className="rounded-full bg-gray-200 px-4 py-2 text-gray-600">

              ❌ Скрыт

            </span>


          ) : (

            <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700">

              🟢 Активный

            </span>

          )}

          <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
  {property.deal_type === "rent"
    ? "🏠 Аренда"
    : "🏷 Продажа"}
</span>

          {property.exclusive && (

            <span className="rounded-full bg-red-100 px-4 py-2 text-red-700">

              ⭐ Эксклюзив

            </span>

          )}



        </div>





        <p className="mt-4 text-3xl font-bold text-red-600">
 {Number(property.price).toLocaleString()} {property.currency || "$"}
</p>



        <p className="mt-3 text-lg text-gray-500">

          📍 {property.district}

        </p>


      </div>






      

    







      <div className="mt-8 flex flex-wrap gap-4">

{property.agent && (

  <>

    {property.agent.phone && (

  <div className="flex items-center gap-3 rounded-xl bg-green-600 px-5 py-3 text-white">

    <span>
      📞 {property.agent.phone}
    </span>

    <a
      href={`tel:${property.agent.phone}`}
      className="rounded-lg bg-white px-3 py-1 text-green-700"
    >
      Позвонить
    </a>

  </div>

)}


    {property.agent.phone && (

      <a
        href={`https://wa.me/${property.agent.phone.replace("+","")}`}
        target="_blank"
        className="rounded-xl bg-green-500 px-6 py-3 text-white"
      >
        💬 WhatsApp
      </a>

    )}



    {property.agent.telegram && (

      <a
        href={`https://t.me/${property.agent.telegram.replace("@","")}`}
        target="_blank"
        className="rounded-xl bg-blue-500 px-6 py-3 text-white"
      >
        ✈️ Telegram
      </a>

    )}

  </>

)}





        <ShareButton />

      </div>







      <div className="mt-8 rounded-2xl border bg-white p-8 shadow">


        <h2 className="mb-6 text-2xl font-bold">

          📋 Информация

        </h2>




        <div className="grid gap-5 md:grid-cols-2">


          <p>
  <b>Цена:</b> {Number(property.price).toLocaleString()} {property.currency || "$"}
</p>

          <p>
            <b>Тип:</b> {property.property_type}
          </p>


          <p>
            <b>Комнаты:</b> {property.rooms}
          </p>


          <p>
            <b>Площадь:</b> {property.area} м²
          </p>


          <p>
            <b>Этаж:</b> {property.floor}/{property.total_floors}
          </p>


          <p>
            <b>Ремонт:</b> {property.renovation}
          </p>


          <p>
            <b>ЖК:</b> {property.residential_complex || "-"}
          </p>


          <p>
            <b>Адрес:</b> {property.address}
          </p>


        </div>


      </div>







      <div className="mt-8 rounded-2xl border bg-white p-8 shadow">


        <h2 className="mb-4 text-2xl font-bold">

          📝 Описание

        </h2>


        <p>

          {property.description || "Нет описания"}

        </p>


      </div>




    </main>

  );

}