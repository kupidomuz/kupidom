import Link from "next/link";


export default function PropertyCard({
  property,
}: {
  property: any;
}) {


  return (

    <Link
      href={`/property/${property.id}`}
      className="block overflow-hidden rounded-2xl border bg-white shadow hover:shadow-lg transition"
    >


      <div className="relative">

  <img
    src={
      property.images?.[0] ||
      "/images/no-image.jpg"
    }
    alt={
      property.title || "Объект"
    }
    className="h-56 w-full object-cover"
  />

  <div className="absolute left-3 top-3 flex flex-wrap gap-2">

    {property.exclusive && (
      <span className="rounded-full bg-yellow-400 px-3 py-1 text-sm font-semibold text-black shadow">
        ⭐ Эксклюзив
      </span>
    )}

    {property.urgent && (
      <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow">
        🔥 Срочно
      </span>
    )}

    {property.low_price && (
      <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white shadow">
        💰 Низкая цена
      </span>
    )}

  </div>

</div>


      <div className="p-5">


        <div className="mb-3 flex flex-wrap items-center gap-2">

          <span className="font-bold text-red-600">
            {property.property_code}
          </span>


          <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
            {property.deal_type === "rent"
              ? "🏠 Аренда"
              : "🏷 Продажа"}
          </span>

        </div>



        <h2 className="text-xl font-bold">
          {property.title}
        </h2>



        <p className="mt-2 text-gray-600">
          📍 {property.district}
        </p>



        <p className="mt-2 text-lg font-semibold text-red-600">
          {Number(property.price).toLocaleString()} {property.currency}
        </p>



        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">


          <span>
            🛏 {property.rooms} комн.
          </span>


          <span>
            📐 {property.area} м²
          </span>


          <span>
            🏢 {property.floor}/{property.total_floors}
          </span>


          <span>
            🏠 {property.property_type}
          </span>


        </div>


      </div>


    </Link>

  );

}