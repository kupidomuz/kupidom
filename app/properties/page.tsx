import { getPublicProperties } from "@/lib/propertyService";
import PropertiesCatalog from "@/components/PropertiesCatalog";
import Link from "next/link";

export const dynamic = "force-dynamic";


export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    dealType?: string;
    type?: string;
    district?: string;
    rooms?: string;
    priceFrom?: string;
    priceTo?: string;
  }>;
}) {


  const params = await searchParams;


  const properties = await getPublicProperties();



  const filteredProperties = properties.filter(
    (property: any) => {


      if (params.category) {
  if (
    params.category === "rent" &&
    property.category !== "rent" &&
    property.deal_type !== "rent"
  ) {
    return false;
  }

  if (
    params.category !== "rent" &&
    property.category !== params.category
  ) {
    return false;
  }
}


      if (
        params.dealType &&
        property.deal_type !== params.dealType
      ) {
        return false;
      }



      if (
        params.type &&
        property.property_type !== params.type
      ) {
        return false;
      }



      if (
        params.district &&
        !property.district
          ?.toLowerCase()
          .includes(
            params.district.toLowerCase()
          )
      ) {
        return false;
      }



      if (
        params.rooms &&
        String(property.rooms) !== params.rooms
      ) {
        return false;
      }



      if (
        params.priceFrom &&
        Number(property.price) < Number(params.priceFrom)
      ) {
        return false;
      }



      if (
        params.priceTo &&
        Number(property.price) > Number(params.priceTo)
      ) {
        return false;
      }



      return true;

    }
  );



  return (

    <main className="mx-auto max-w-7xl px-6 py-10">


      <div className="mb-6">

        <Link
          href="/"
          className="inline-flex items-center rounded-xl bg-gray-200 px-5 py-3 text-gray-700 hover:bg-gray-300"
        >
          ← На главную
        </Link>

      </div>



      <h1 className="mb-8 text-4xl font-bold">
        Каталог недвижимости
      </h1>




      <PropertiesCatalog
        properties={filteredProperties}
      />



    </main>

  );

}