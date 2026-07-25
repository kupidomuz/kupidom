import Link from "next/link";
import { getProperties } from "@/lib/propertyService";


export default async function PropertiesCatalog() {

  const properties = await getProperties();


const items = properties
  .filter(
    (property:any) =>
      property.status === "active"
  )
  .slice(0, 6);


  return (

    <section className="mx-auto max-w-7xl px-8 py-16">


      <div className="mb-10 flex items-center justify-between">

        <h2 className="text-4xl font-bold">
          Новые объекты
        </h2>


        <Link
          href="/properties"
          className="rounded-xl bg-red-600 px-6 py-3 text-white"
        >
          Все объекты
        </Link>

      </div>



      <div className="grid gap-8 md:grid-cols-3">


        {items.map((property:any)=>(


          <Link
            key={property.id}
            href={`/property/${property.id}`}
            className="overflow-hidden rounded-2xl border bg-white shadow hover:shadow-lg"
          >


            {property.images?.length > 0 ? (

              <img
                src={property.images[0]}
                alt={property.title}
                className="h-64 w-full object-cover"
              />

            ) : (

              <div className="flex h-64 items-center justify-center bg-gray-100 text-gray-400">
                Нет фото
              </div>

            )}



            <div className="p-5">


  <div className="flex items-center justify-between">

    <span className="text-sm font-bold text-red-600">
      {property.property_code}
    </span>


    {property.exclusive && (
      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">
        ⭐ Эксклюзив
      </span>
    )}

  </div>



  <h3 className="mt-3 text-xl font-bold">
    {property.title}
  </h3>



  <p className="mt-2 text-gray-500">
    📍 {property.district}
  </p>



  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">


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


<p className="mt-4 text-xl font-bold text-red-600">
  {Number(property.price).toLocaleString()} {property.currency || "$"}
</p>


</div>


          </Link>


        ))}


      </div>


    </section>

  );

}