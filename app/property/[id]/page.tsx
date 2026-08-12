import PropertyGallery from "@/components/PropertyGallery";
import {
  getPropertyById,
  getCompanySettings,
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
      <main className="px-4 py-10 text-center sm:px-6">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Объект не найден
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">

      {/* Назад */}
      <div className="mb-5">
        <Link
          href="/properties"
          className="inline-flex items-center rounded-xl bg-gray-200 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-300 sm:px-5 sm:py-3 sm:text-base"
        >
          ← Назад к объектам
        </Link>
      </div>

      {/* Фотографии */}
      <PropertyGallery images={property.images || []} />

      {/* Основная информация */}
      <div className="mb-6 mt-6 sm:mb-8 sm:mt-8">

        <h1 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
          {property.rooms
            ? `${property.rooms}-комнатная `
            : ""}
          {property.property_type || "Недвижимость"}
        </h1>

        <p className="mt-3 text-2xl font-bold text-red-600 sm:text-3xl">
          {Number(property.price).toLocaleString()}{" "}
          {property.currency || "$"}
        </p>

        {/* Статусы и отметки */}
<div className="mt-4 flex flex-wrap gap-2">

  <span className="rounded-full bg-green-100 px-3 py-1.5 text-sm text-green-700 sm:px-4 sm:py-2">
    {property.deal_type === "rent"
      ? "🏠 Аренда"
      : "🏷 Продажа"}
  </span>

  {property.exclusive && (
    <span className="rounded-full bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 sm:px-4 sm:py-2">
      ⭐ Эксклюзив
    </span>
  )}

  {property.urgent && (
    <span className="rounded-full bg-orange-100 px-3 py-1.5 text-sm font-medium text-orange-700 sm:px-4 sm:py-2">
      🔥 Срочно
    </span>
  )}

  {property.low_price && (
    <span className="rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 sm:px-4 sm:py-2">
      💰 Низкая цена
    </span>
  )}

  {property.status === "sold" && (
    <span className="rounded-full bg-gray-200 px-3 py-1.5 text-sm text-gray-700 sm:px-4 sm:py-2">
      ✅ Продан
    </span>
  )}

</div>

      </div>

      {/* Характеристики */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

        {property.rooms && (
          <div className="rounded-xl bg-gray-100 p-3 text-sm sm:p-4 sm:text-base">
            🛏 {property.rooms} комнат
          </div>
        )}

        {property.area && (
          <div className="rounded-xl bg-gray-100 p-3 text-sm sm:p-4 sm:text-base">
            📐 {property.area} м²
          </div>
        )}

        {property.floor && property.total_floors && (
          <div className="rounded-xl bg-gray-100 p-3 text-sm sm:p-4 sm:text-base">
            🏢 {property.floor}/{property.total_floors} этаж
          </div>
        )}

        {property.property_type && (
          <div className="rounded-xl bg-gray-100 p-3 text-sm sm:p-4 sm:text-base">
            🏠 {property.property_type}
          </div>
        )}

      </div>

      {/* ID */}
      <div className="mt-4 text-sm text-gray-500">
        ID: {property.property_code}
      </div>

      {/* Контакты */}
      <div className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-2">

        {/* Компания */}
        {company && (
          <div className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6">

            <h3 className="mb-2 text-lg font-bold sm:text-xl">
              🏢 {company.company_name}
            </h3>

            <p className="mb-4 text-sm text-gray-500 sm:mb-5 sm:text-base">
              Агентство недвижимости
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">

              {company.phone && (
                <a
                  href={`tel:${company.phone}`}
                  className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 sm:px-5 sm:py-3 sm:text-base"
                >
                  📞 Позвонить
                </a>
              )}

              {company.whatsapp && (
                <a
                  href={`https://wa.me/${company.whatsapp.replace("+", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-green-500 px-4 py-2.5 text-sm font-medium text-white sm:px-5 sm:py-3 sm:text-base"
                >
                  💬 WhatsApp
                </a>
              )}

              {company.telegram && (
                <a
                  href={`https://t.me/${company.telegram.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-medium text-white sm:px-5 sm:py-3 sm:text-base"
                >
                  ✈ Telegram
                </a>
              )}

            </div>

          </div>
        )}

        {/* Агент */}
        {property.agent && (
          <div className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6">

            <h3 className="mb-2 text-lg font-bold sm:text-xl">
              👤 {property.agent.name}
            </h3>

            <p className="mb-4 text-sm text-gray-500 sm:mb-5 sm:text-base">
              Ваш специалист по объекту
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">

              {property.agent.phone && (
                <a
                  href={`tel:${property.agent.phone}`}
                  className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white sm:px-5 sm:py-3 sm:text-base"
                >
                  📞 Позвонить
                </a>
              )}

              {property.agent.phone && (
                <a
                  href={`https://wa.me/${property.agent.phone.replace("+", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-green-500 px-4 py-2.5 text-sm font-medium text-white sm:px-5 sm:py-3 sm:text-base"
                >
                  💬 WhatsApp
                </a>
              )}

              {property.agent.telegram && (
                <a
                  href={`https://t.me/${property.agent.telegram.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-medium text-white sm:px-5 sm:py-3 sm:text-base"
                >
                  ✈ Telegram
                </a>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Подробные характеристики */}
      <div className="mt-6 rounded-2xl border bg-white p-5 shadow sm:mt-8 sm:p-8">

        <h2 className="mb-5 text-xl font-bold sm:mb-6 sm:text-2xl">
          📋 Характеристики
        </h2>

        <div className="space-y-3 text-sm sm:text-base">

          {property.price && (
            <p>
              <b>Цена:</b>{" "}
              {Number(property.price).toLocaleString()}{" "}
              {property.currency || "$"}
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

      {/* Описание */}
      <div className="mt-6 rounded-2xl border bg-white p-5 shadow sm:mt-8 sm:p-8">

        <h2 className="mb-4 text-xl font-bold sm:text-2xl">
          📝 Описание
        </h2>

        <p className="whitespace-pre-line text-sm leading-7 sm:text-base">
          {property.description || "Нет описания"}
        </p>

      </div>

    </main>
  );
}