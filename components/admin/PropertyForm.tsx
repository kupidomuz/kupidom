import { addProperty } from "@/lib/actions";
import PhotoUploader from "./PhotoUploader";
import { getAgents } from "@/lib/userService";

export default async function PropertyForm() {

  const agents = await getAgents();

  return (
    <form action={addProperty} className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Добавить объект
        </h1>

        <p className="mt-2 text-gray-500">
          Заполните карточку недвижимости
        </p>
      </div>


      <div className="rounded-2xl border bg-white p-8 shadow-sm">

        <h2 className="mb-8 text-2xl font-bold">
          🏠 Основная информация
        </h2>


        <div className="grid gap-6 md:grid-cols-2">


          <input
            name="title"
            placeholder="Название объекта"
            className="rounded-xl border p-3"
          />


          <select
            name="dealType"
            className="rounded-xl border p-3"
          >
            <option value="sale">
              Продажа
            </option>

            <option value="rent">
              Аренда
            </option>

          </select>



          <select
            name="propertyType"
            className="rounded-xl border p-3"
          >
            <option>
              Квартира
            </option>

            <option>
              Дом
            </option>

            <option>
              Коммерция
            </option>

            <option>
              Участок
            </option>

          </select>



          <input
            name="district"
            placeholder="Район"
            className="rounded-xl border p-3"
          />



          <input
            name="price"
            type="number"
            placeholder="Цена"
            className="rounded-xl border p-3"
          />



          <select
            name="currency"
            className="rounded-xl border p-3"
          >
            <option>
              USD
            </option>

            <option>
              UZS
            </option>

          </select>


        </div>


      </div>




      {/* Статус объекта */}

      <div className="rounded-2xl border bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">
          ⭐ Статус объекта
        </h2>


        <div className="grid gap-6 md:grid-cols-2">


          <select
            name="status"
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
              className="h-5 w-5"
            />

            ⭐ Эксклюзивный объект

          </label>


        </div>


      </div>





      <div className="rounded-2xl border bg-white p-8 shadow-sm">


        <h2 className="mb-8 text-2xl font-bold">
          📝 Описание объекта
        </h2>


        <textarea
          name="description"
          rows={5}
          placeholder="Описание объекта"
          className="w-full rounded-xl border p-3"
        />


      </div>





      <div className="rounded-2xl border bg-white p-8 shadow-sm">


        <h2 className="mb-8 text-2xl font-bold">
          📍 Характеристики объекта
        </h2>


        <div className="grid gap-6 md:grid-cols-2">


          <input
            name="address"
            placeholder="Адрес"
            className="rounded-xl border p-3"
          />


          <input
            name="landmark"
            placeholder="Ориентир"
            className="rounded-xl border p-3"
          />


          <input
            name="residential_complex"
            placeholder="ЖК / Комплекс"
            className="rounded-xl border p-3"
          />


          <input
            name="rooms"
            type="number"
            placeholder="Количество комнат"
            className="rounded-xl border p-3"
          />


          <input
            name="area"
            type="number"
            placeholder="Площадь м²"
            className="rounded-xl border p-3"
          />


          <input
            name="floor"
            type="number"
            placeholder="Этаж"
            className="rounded-xl border p-3"
          />


          <input
            name="total_floors"
            type="number"
            placeholder="Этажность"
            className="rounded-xl border p-3"
          />


          <select
            name="renovation"
            className="rounded-xl border p-3"
          >

            <option>
              Ремонт не указан
            </option>

            <option>
              Евроремонт
            </option>

            <option>
              Хороший ремонт
            </option>

            <option>
              Без ремонта
            </option>


          </select>



          <select
            name="building_type"
            className="rounded-xl border p-3"
          >

            <option>
              Тип дома не указан
            </option>

            <option>
              Новостройка
            </option>

            <option>
              Вторичный рынок
            </option>


          </select>


        </div>


      </div>





      <div className="rounded-2xl border bg-white p-8 shadow-sm">


        <h2 className="mb-8 text-2xl font-bold">
          📷 Фотографии
        </h2>


        
        <PhotoUploader existingImages={[]} />


      </div>






      <div className="rounded-2xl border bg-white p-8 shadow-sm">


        <h2 className="mb-8 text-2xl font-bold">
          👤 Собственник
        </h2>


        <div className="grid gap-6 md:grid-cols-2">


  <input
    name="owner_name"
    placeholder="Имя собственника"
    className="rounded-xl border p-3"
  />


  <input
    name="owner_phone"
    placeholder="Телефон"
    className="rounded-xl border p-3"
  />


  <input
    name="telegram"
    placeholder="Telegram (@username)"
    className="rounded-xl border p-3"
  />


  <input
    name="source"
    placeholder="Источник объекта"
    className="rounded-xl border p-3"
  />


  <select
    name="agent_id"
    className="rounded-xl border p-3"
  >

    <option value="">
      Без агента
    </option>

    {agents.map((agent:any) => (

      <option
        key={agent.id}
        value={agent.id}
      >
        {agent.name}
      </option>

    ))}

  </select>


</div>


      </div>




      <button
        type="submit"
        className="rounded-xl bg-red-600 px-10 py-4 text-lg font-semibold text-white hover:bg-red-700"
      >
        💾 Сохранить объект
      </button>


    </form>
  );
}