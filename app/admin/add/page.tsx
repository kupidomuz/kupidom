"use client";

import { propertyTypes } from "@/data/propertyTypes";
import { districts } from "@/data/districts";
import { addProperty } from "@/lib/actions";
import { useRef, useState } from "react";

function PhotoUploader({ 
  existingImages,
  setHasPhoto
}: { 
  existingImages: string[];
  setHasPhoto: (value:boolean)=>void;
}) {
  return (
    <div className="space-y-4">
      <input
        type="file"
        name="images"
        multiple
        accept="image/*"
        onChange={(e) =>
          setHasPhoto(
            !!e.target.files &&
            e.target.files.length > 0
          )
        }
        className="rounded-xl border p-3"
      />

      {existingImages.length > 0 && (
        <div className="grid gap-2 sm:grid-cols-3">
          {existingImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Фото ${index + 1}`}
              className="h-32 w-full rounded-xl object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PropertyForm() {

const [hasPhoto, setHasPhoto] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const submittingRef = useRef(false);
const [propertyType, setPropertyType] = useState("");
  return (
    <form
  action={addProperty}
  onSubmit={(e) => {
    if (!hasPhoto) {
      e.preventDefault();
      alert("Добавьте хотя бы одно фото объекта");
      return;
    }

    if (submittingRef.current) {
      e.preventDefault();
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
  }}
  className="space-y-8"
>

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
  value={propertyType}
  onChange={(e) => setPropertyType(e.target.value)}
  className="rounded-xl border p-3"
  required
>
  <option value="">
    Выберите тип недвижимости
  </option>

  <option value="Квартира">
    🏠 Квартира
  </option>

  <option value="Дом">
    🏡 Дом
  </option>

  <option value="Участок">
    🌳 Участок
  </option>

  <option value="Коммерция">
    🏢 Коммерция
  </option>
</select>


<select
  name="district"
  className="rounded-xl border p-3"
  required
>
  <option value="">
    Выберите район
  </option>

  {districts.map((district) => (
    <option
      key={district}
      value={district}
    >
      {district}
    </option>
  ))}

</select>



          <input
  name="price"
  type="number"
  placeholder="Цена"
  min="1"
  required
  className="rounded-xl border p-3"
/>
<input
  name="owner_price"
  type="number"
  min="0"
  placeholder="Цена на руки"
  className="rounded-xl border p-3"
/>

<input
  name="commission_percent"
  type="number"
  min="0"
  max="100"
  step="0.1"
  placeholder="Комиссия агентства (%)"
  className="rounded-xl border p-3"
/>


          <select
            name="currency"
            className="rounded-xl border p-3"
            required
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




      {/* Отметки объекта */}

<div className="rounded-2xl border bg-white p-8 shadow-sm">

  <h2 className="mb-6 text-2xl font-bold">
    🏷️ Отметки объекта
  </h2>

  <div className="grid gap-4 md:grid-cols-3">

    <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
      <input
        type="checkbox"
        name="exclusive"
        value="true"
        className="h-5 w-5"
      />

      <span>⭐ Эксклюзивный объект</span>
    </label>

    <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
      <input
        type="checkbox"
        name="urgent"
        value="true"
        className="h-5 w-5"
      />

      <span>🔥 Срочно</span>
    </label>

    <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
      <input
        type="checkbox"
        name="low_price"
        value="true"
        className="h-5 w-5"
      />

      <span>💰 Низкая цена</span>
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

    {/* Адрес */}
    <input
      name="address"
      placeholder="Адрес"
      className="rounded-xl border p-3"
    />

    {/* Ориентир */}
    <input
      name="landmark"
      placeholder="Ориентир"
      className="rounded-xl border p-3"
    />

    {/* ЖК — только квартира */}
    {propertyType === "Квартира" && (
      <input
        name="residential_complex"
        placeholder="ЖК / Комплекс"
        className="rounded-xl border p-3"
      />
    )}

    {/* Количество комнат — квартира и дом */}
    {(propertyType === "Квартира" || propertyType === "Дом") && (
      <input
        name="rooms"
        type="number"
        min="1"
        placeholder="Количество комнат"
        className="rounded-xl border p-3"
      />
    )}

    {/* Площадь */}
    <input
      name="area"
      type="number"
      min="1"
      placeholder={
        propertyType === "Участок"
          ? "Площадь участка, соток"
          : propertyType === "Дом"
            ? "Площадь дома, м²"
            : "Площадь, м²"
      }
      className="rounded-xl border p-3"
      required
    />

    {/* Площадь участка — только дом */}
    {propertyType === "Дом" && (
      <input
        name="land_area"
        type="number"
        min="0.1"
        step="0.1"
        placeholder="Площадь участка, соток"
        className="rounded-xl border p-3"
      />
    )}

    {/* Этаж — квартира и коммерция */}
    {(propertyType === "Квартира" ||
      propertyType === "Коммерция") && (
      <input
        name="floor"
        type="number"
        min="1"
        placeholder="Этаж"
        className="rounded-xl border p-3"
      />
    )}

    {/* Этажность — квартира, дом, коммерция */}
    {(propertyType === "Квартира" ||
      propertyType === "Дом" ||
      propertyType === "Коммерция") && (
      <input
        name="total_floors"
        type="number"
        min="1"
        placeholder="Этажность"
        className="rounded-xl border p-3"
      />
    )}

    {/* Ремонт — квартира, дом, коммерция */}
    {(propertyType === "Квартира" ||
      propertyType === "Дом" ||
      propertyType === "Коммерция") && (
      <select
        name="renovation"
        className="rounded-xl border p-3"
      >
        <option value="">
          Ремонт не указан
        </option>

        <option value="Евроремонт">
          Евроремонт
        </option>

        <option value="Хороший ремонт">
          Хороший ремонт
        </option>

        <option value="Без ремонта">
          Без ремонта
        </option>
      </select>
    )}

    {/* Тип дома — квартира и дом */}
    {(propertyType === "Квартира" ||
      propertyType === "Дом") && (
      <select
        name="building_type"
        className="rounded-xl border p-3"
      >
        <option value="">
          Тип дома не указан
        </option>

        <option value="Новостройка">
          Новостройка
        </option>

        <option value="Вторичный рынок">
          Вторичный рынок
        </option>
      </select>
    )}

  </div>

</div>





      <div className="rounded-2xl border bg-white p-8 shadow-sm">


        <h2 className="mb-8 text-2xl font-bold">
          📷 Фотографии
        </h2>


        
       <PhotoUploader
  existingImages={[]}
  setHasPhoto={setHasPhoto}
/>


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


  <input
    name="agent_name"
    placeholder="Ответственный агент"
    className="rounded-xl border p-3"
  />


</div>


      </div>




     <button
  type="submit"
  disabled={isSubmitting}
  className="rounded-xl bg-red-600 px-10 py-4 text-lg font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
>
  {isSubmitting ? "⏳ Сохранение..." : "💾 Сохранить объект"}
</button>


    </form>
  );
}