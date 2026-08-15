import Link from "next/link";
import { getProperties } from "@/lib/propertyService";

export default async function PropertiesCatalog({
  properties,
}: {
  properties?: any[];
}) {
  const allProperties = properties ?? (await getProperties());

  const items = allProperties
    .filter((property: any) => property.status === "active")
    .slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">

      {/* Заголовок */}
      <div className="mb-6 flex items-center justify-between gap-3 sm:mb-10">

        <h2 className="text-3xl font-bold sm:text-4xl">
          Новые объекты
        </h2>

        <Link
          href="/properties"
          className="shrink-0 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white sm:px-6 sm:py-3 sm:text-base"
        >
          Все объекты
        </Link>

      </div>

      {/* Карточки */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8">

        {items.map((property: any) => (
          <Link
            key={property.id}
            href={`/property/${property.id}`}
            className="overflow-hidden rounded-2xl border bg-white shadow transition hover:shadow-lg"
          >

            {/* Фото */}
            {property.images?.length > 0 ? (
              <img
                src={property.images[0]}
                alt={property.title}
                className="h-52 w-full object-cover sm:h-60 md:h-64"
              />
            ) : (
              <div className="flex h-52 items-center justify-center bg-gray-100 text-gray-400 sm:h-60 md:h-64">
                Нет фото
              </div>
            )}

            {/* Информация */}
            <div className="p-4 sm:p-5">

              {/* Тип сделки */}
              <div className="mb-3 flex flex-wrap gap-2">

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700 sm:text-sm">
                  {property.deal_type === "rent"
                    ? "🏠 Аренда"
                    : "🏷 Продажа"}
                </span>

                {property.exclusive && (
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">
                    ⭐ Эксклюзив
                  </span>
                )}

              </div>

              {/* Название */}
<h3 className="mb-2 line-clamp-2 text-lg font-bold sm:text-xl">
  {property.title ||
    (property.property_type === "Квартира" && property.rooms
      ? `${property.rooms}-комнатная квартира`
      : property.property_type === "Дом"
      ? "Дом"
      : property.property_type === "Участок"
      ? "Участок"
      : property.property_type === "Коммерция"
      ? "Коммерческая недвижимость"
      : "Объект недвижимости")}
</h3>

{/* Цена */}
<p className="mb-4 text-xl font-bold text-red-600">
  {Number(property.price).toLocaleString("ru-RU")} {property.currency || "USD"}
</p>

              {/* Характеристики */}
              <div className="grid grid-cols-2 gap-2 text-sm">

                <div className="rounded-lg bg-gray-100 p-2">
                  🛏 {property.rooms} комн.
                </div>

                <div className="rounded-lg bg-gray-100 p-2">
                  📐 {property.area} м²
                </div>

                <div className="rounded-lg bg-gray-100 p-2">
                  🏢 {property.floor}/{property.total_floors}
                </div>

                <div className="rounded-lg bg-gray-100 p-2">
                  🏠 {property.property_type}
                </div>

              </div>

            </div>

          </Link>
        ))}

      </div>

    </section>
  );
}