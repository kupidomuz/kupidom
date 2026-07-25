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



      <div className="p-5">


        <h2 className="text-xl font-bold">
          {property.title}
        </h2>



        <p className="mt-2 text-gray-600">
          📍 {property.district}
        </p>



        <p className="mt-2 text-lg font-semibold text-red-600">
          {property.price} {property.currency}
        </p>



        <div className="mt-3 flex gap-3 text-sm text-gray-500">

          <span>
            🛏 {property.rooms} комн.
          </span>


          <span>
            📐 {property.area} м²
          </span>


        </div>


      </div>


    </Link>

  );

}