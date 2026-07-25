import { getPropertyById } from "@/lib/propertyService";
import { updateProperty } from "@/lib/actions";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import EditPhotos from "@/components/admin/EditPhotos";


export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;

  const property = await getPropertyById(id);

const currentUser = await getCurrentUser();

if (!currentUser || currentUser.role !== "admin") {
  redirect("/admin/properties");
}

  if (!property) {

    return (
      <div className="p-10 text-center text-xl">
        Объект не найден
      </div>
    );

  }



  return (

    <main className="mx-auto max-w-5xl px-6 py-10">


      <div className="mb-8 flex items-center justify-between">


        <h1 className="text-4xl font-bold">
          Редактирование объекта
        </h1>


        <Link
          href={`/admin/properties/${id}`}
          className="rounded-xl bg-gray-200 px-5 py-3"
        >
          ← Назад
        </Link>


      </div>





      <form
        action={updateProperty.bind(null, id)}
        className="space-y-8"
      >



        <EditPhotos
          images={property.images || []}
        />





        <div className="rounded-2xl border bg-white p-8 shadow">


          <div className="grid gap-6 md:grid-cols-2">


            <input
              name="title"
              defaultValue={property.title}
              placeholder="Название"
              className="rounded-xl border p-3"
            />
<select
  name="dealType"
  defaultValue={property.deal_type}
  className="rounded-xl border p-3"
>

  <option value="rent">
    Аренда
  </option>

  <option value="sale">
    Продажа
  </option>

</select>


<select
  name="propertyType"
  defaultValue={property.property_type}
  className="rounded-xl border p-3"
>

  <option value="Квартира">
    Квартира
  </option>

  <option value="Дом">
    Дом
  </option>

  <option value="Участок">
    Участок
  </option>

  <option value="Коммерция">
    Коммерция
  </option>

</select>


<select
  name="currency"
  defaultValue={property.currency || "USD"}
  className="rounded-xl border p-3"
>

  <option value="USD">
    USD $
  </option>

  <option value="UZS">
    UZS сум
  </option>

</select>

            <input
              name="district"
              defaultValue={property.district}
              placeholder="Район"
              className="rounded-xl border p-3"
            />


            <input
              name="price"
              type="number"
              defaultValue={property.price}
              placeholder="Цена"
              className="rounded-xl border p-3"
            />


            <input
              name="address"
              defaultValue={property.address}
              placeholder="Адрес"
              className="rounded-xl border p-3"
            />


            <input
              name="landmark"
              defaultValue={property.landmark}
              placeholder="Ориентир"
              className="rounded-xl border p-3"
            />


            <input
              name="residential_complex"
              defaultValue={property.residential_complex}
              placeholder="ЖК"
              className="rounded-xl border p-3"
            />


            <input
              name="rooms"
              type="number"
              defaultValue={property.rooms}
              placeholder="Комнаты"
              className="rounded-xl border p-3"
            />


            <input
              name="area"
              type="number"
              defaultValue={property.area}
              placeholder="Площадь"
              className="rounded-xl border p-3"
            />


            <input
              name="floor"
              type="number"
              defaultValue={property.floor}
              placeholder="Этаж"
              className="rounded-xl border p-3"
            />


            <input
              name="total_floors"
              type="number"
              defaultValue={property.total_floors}
              placeholder="Этажность"
              className="rounded-xl border p-3"
            />


            <input
              name="renovation"
              defaultValue={property.renovation}
              placeholder="Ремонт"
              className="rounded-xl border p-3"
            />


            <input
              name="building_type"
              defaultValue={property.building_type}
              placeholder="Тип дома"
              className="rounded-xl border p-3"
            />


            <input
              name="owner_name"
              defaultValue={property.owner_name}
              placeholder="Собственник"
              className="rounded-xl border p-3"
            />


            <input
              name="owner_phone"
              defaultValue={property.owner_phone}
              placeholder="Телефон"
              className="rounded-xl border p-3"
            />
            <input
  name="telegram"
  defaultValue={property.telegram}
  placeholder="Telegram (@username)"
  className="rounded-xl border p-3"
/>


<input
  name="source"
  defaultValue={property.source}
  placeholder="Источник объекта"
  className="rounded-xl border p-3"
/>


<input
  name="agent_name"
  defaultValue={property.agent_name}
  placeholder="Ответственный агент"
  className="rounded-xl border p-3"
/>
            
            <input
  name="telegram"
  defaultValue={property.telegram}
  placeholder="Telegram (@username)"
  className="rounded-xl border p-3"
/>


          </div>





          <textarea
            name="description"
            defaultValue={property.description}
            placeholder="Описание"
            rows={6}
            className="mt-6 w-full rounded-xl border p-3"
          />





          <div className="mt-6 grid gap-6 md:grid-cols-2">


            <select
              name="status"
              defaultValue={property.status}
              className="rounded-xl border p-3"
            >

              <option value="active">
                🟢 Активный
              </option>


              <option value="sold">
                ✅ Продан
              </option>


              <option value="hidden">
                ❌ Скрыт
              </option>


            </select>




            <label className="flex items-center gap-3 rounded-xl border p-3">


              <input
                type="checkbox"
                name="exclusive"
                value="true"
                defaultChecked={property.exclusive}
                className="h-5 w-5"
              />


              ⭐ Эксклюзивный объект


            </label>


          </div>





          <button
            type="submit"
            className="mt-8 rounded-xl bg-blue-600 px-8 py-3 text-white"
          >
            💾 Сохранить изменения
          </button>



        </div>


      </form>


    </main>

  );

}