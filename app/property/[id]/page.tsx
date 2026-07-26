import PropertyGallery from "@/components/PropertyGallery";
import {
  getPropertyById,
  getCompanySettings
} from "@/lib/propertyService";
import ShareButton from "@/components/ShareButton";
import Link from "next/link";

export const dynamic = "force-dynamic";



export default async function PublicPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;


  const property = await getPropertyById(id);

const company = await getCompanySettings();

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

      <div className="mb-6">
        <Link
          href="/properties"
          className="inline-flex items-center rounded-xl bg-gray-200 px-5 py-3 text-gray-700 hover:bg-gray-300"
        >
          ← Назад к объектам
        </Link>
      </div>


      {/* Фотографии объекта */}
<PropertyGallery
  images={property.images || []}
/>



    <div className="mb-8">


  <h1 className="text-4xl font-bold">

    {property.rooms
      ? `${property.rooms}-комнатная `
      : ""
    }

    {property.property_type || "Недвижимость"}

  </h1>



  <p className="mt-3 text-lg text-gray-500">
    📍 {property.district}
  </p>



  <p className="mt-5 text-4xl font-bold text-red-600">

    {Number(property.price).toLocaleString()} {property.currency || "$"}

  </p>




  <div className="mt-5 flex flex-wrap gap-3">


    <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">

      {property.deal_type === "rent"
        ? "🏠 Аренда"
        : "🏷 Продажа"}

    </span>



    {property.status === "sold" && (

      <span className="rounded-full bg-gray-200 px-4 py-2 text-gray-700">
        ✅ Продан
      </span>

    )}



    {property.exclusive && (

      <span className="rounded-full bg-red-100 px-4 py-2 text-red-700">
        ⭐ Эксклюзив
      </span>

    )}


  </div>





  <div className="mt-6 grid gap-4 md:grid-cols-4">


    {property.rooms && (

      <div className="rounded-xl bg-gray-100 p-4">

        🛏 {property.rooms} комнат

      </div>

    )}



    {property.area && (

      <div className="rounded-xl bg-gray-100 p-4">

        📐 {property.area} м²

      </div>

    )}




    {property.floor && property.total_floors && (

      <div className="rounded-xl bg-gray-100 p-4">

        🏢 {property.floor}/{property.total_floors} этаж

      </div>

    )}




    {property.property_type && (

      <div className="rounded-xl bg-gray-100 p-4">

        🏠 {property.property_type}

      </div>

    )}



  </div>





  <p className="mt-5 text-sm text-gray-400">

    ID: {property.property_code}

  </p>


</div>






      

    







      <div className="mt-8 grid gap-5 md:grid-cols-2">


  {/* Компания */}

  {company && (

    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h3 className="mb-2 text-xl font-bold">
        🏢 {company.company_name}
      </h3>

      <p className="mb-5 text-gray-500">
        Агентство недвижимости
      </p>


      <div className="flex flex-wrap gap-3">


        {company.phone && (

          <a
            href={`tel:${company.phone}`}
            className="rounded-xl bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
          >
            📞 Позвонить
          </a>

        )}



        {company.whatsapp && (

          <a
            href={`https://wa.me/${company.whatsapp.replace("+","")}`}
            target="_blank"
            className="rounded-xl bg-green-500 px-5 py-3 font-medium text-white"
          >
            💬 WhatsApp
          </a>

        )}



        {company.telegram && (

          <a
            href={`https://t.me/${company.telegram.replace("@","")}`}
            target="_blank"
            className="rounded-xl bg-blue-500 px-5 py-3 font-medium text-white"
          >
            ✈ Telegram
          </a>

        )}


      </div>


    </div>

  )}




  {/* Агент */}

  {property.agent && (

    <div className="rounded-2xl border bg-white p-6 shadow-sm">


      <h3 className="mb-2 text-xl font-bold">
        👤 {property.agent.name}
      </h3>


      <p className="mb-5 text-gray-500">
        Ваш специалист по объекту
      </p>



      <div className="flex flex-wrap gap-3">


        {property.agent.phone && (

          <a
            href={`tel:${property.agent.phone}`}
            className="rounded-xl bg-gray-900 px-5 py-3 font-medium text-white"
          >
            📞 Позвонить
          </a>

        )}



        {property.agent.phone && (

          <a
            href={`https://wa.me/${property.agent.phone.replace("+","")}`}
            target="_blank"
            className="rounded-xl bg-green-500 px-5 py-3 font-medium text-white"
          >
            💬 WhatsApp
          </a>

        )}



        {property.agent.telegram && (

          <a
            href={`https://t.me/${property.agent.telegram.replace("@","")}`}
            target="_blank"
            className="rounded-xl bg-blue-500 px-5 py-3 font-medium text-white"
          >
            ✈ Telegram
          </a>

        )}


      </div>


    </div>

  )}


</div>



<div className="mt-5">
  <ShareButton />
</div>






      <div className="mt-8 rounded-2xl border bg-white p-8 shadow">


  <h2 className="mb-6 text-2xl font-bold">
    📋 Информация
  </h2>



  <div className="grid gap-5 md:grid-cols-2">


    {property.price && (

      <p>
        <b>Цена:</b>{" "}
        {Number(property.price).toLocaleString()} {property.currency || "$"}
      </p>

    )}



    {property.property_type && (

      <p>
        <b>Тип:</b> {property.property_type}
      </p>

    )}



    {property.rooms && (

      <p>
        <b>Комнаты:</b> {property.rooms}
      </p>

    )}



    {property.area && (

      <p>
        <b>Площадь:</b> {property.area} м²
      </p>

    )}



    {property.floor && property.total_floors && (

      <p>
        <b>Этаж:</b> {property.floor}/{property.total_floors}
      </p>

    )}



    {property.renovation && 
     property.renovation !== "Ремонт не указан" && (

      <p>
        <b>Ремонт:</b> {property.renovation}
      </p>

    )}



    {property.residential_complex && (

      <p>
        <b>ЖК:</b> {property.residential_complex}
      </p>

    )}



    {property.address && (

      <p>
        <b>Адрес:</b> {property.address}
      </p>

    )}



    {property.building_type && (

      <p>
        <b>Тип дома:</b> {property.building_type}
      </p>

    )}



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