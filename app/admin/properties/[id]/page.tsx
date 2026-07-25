export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/auth";
import PropertyGallery from "@/components/PropertyGallery";
import { getPropertyById } from "@/lib/propertyService";
import Link from "next/link";
import PropertyStatus from "@/components/admin/PropertyStatus";
import ContactInfo from "@/components/admin/ContactInfo";


export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;

  const property = await getPropertyById(id);
const currentUser = await getCurrentUser();


  if (!property) {

    return (
      <div className="p-10 text-center text-xl">
        Объект не найден
      </div>
    );

  }



  return (

    <div className="space-y-8">


      <div className="flex items-center justify-between">


        <div>

          <div className="mb-2 text-lg font-bold text-red-600">
            {property.property_code || "Без ID"}
          </div>


          <h1 className="text-4xl font-bold">
            {property.title}
          </h1>

        </div>



        <div className="flex gap-3">


          {(
  currentUser?.role === "admin" ||
  property.agent_id === currentUser?.id
) && (

  <Link
    href={`/admin/properties/${property.id}/edit`}
    className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
  >
    ✏️ Редактировать
  </Link>

)}


          <Link
            href="/admin/properties"
            className="rounded-xl bg-gray-200 px-5 py-3"
          >
            ← Назад
          </Link>


        </div>


      </div>




      <PropertyStatus
        id={property.id}
        currentStatus={property.status || "active"}
        currentExclusive={property.exclusive || false}
      />




<PropertyGallery
  images={property.images || []}
/>





      <div className="rounded-2xl border bg-white p-8 shadow">


        <h2 className="mb-6 text-2xl font-bold">
          📋 Информация
        </h2>



        <div className="grid gap-4 md:grid-cols-2">


          <p><b>ID:</b> {property.property_code}</p>

          <p><b>Район:</b> {property.district}</p>

          <p>
  <b>Цена:</b> {property.price} {property.currency || "$"}
</p>

          <p><b>Тип:</b> {property.property_type}</p>

          <p><b>Сделка:</b> {property.deal_type}</p>

          <p><b>ЖК:</b> {property.residential_complex || "-"}</p>

          <p><b>Адрес:</b> {property.address}</p>

          <p><b>Ориентир:</b> {property.landmark}</p>

          <p><b>Комнат:</b> {property.rooms}</p>

          <p><b>Площадь:</b> {property.area} м²</p>

          <p><b>Этаж:</b> {property.floor}/{property.total_floors}</p>

          <p><b>Ремонт:</b> {property.renovation}</p>


        </div>


      </div>





      <div className="rounded-2xl border bg-white p-8 shadow">


        <h2 className="mb-4 text-2xl font-bold">
          📝 Описание
        </h2>


        <p className="text-gray-700">
          {property.description || "Нет описания"}
        </p>


      </div>





      <div className="rounded-2xl border bg-white p-8 shadow">


        <h2 className="mb-4 text-2xl font-bold">
          👤 Собственник
        </h2>



        <ContactInfo
          property={property}
        />



        <div className="mt-5 border-t pt-5">


          <p>
            📌 Источник: {property.source || "Не указан"}
          </p>


          <p>
            👨‍💼 Агент: {property.agent?.name || "Не указан"}
          </p>
          <p>
  📧 Email: {property.agent?.email || ""}
</p>

        </div>


      </div>


    </div>

  );

}