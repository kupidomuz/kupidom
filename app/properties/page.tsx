import { getProperties } from "@/lib/propertyService";
import PropertiesCatalog from "@/components/PropertiesCatalog";


export const dynamic = "force-dynamic";


export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{
  dealType?: string;
  type?: string;
  district?: string;
  rooms?: string;
  priceFrom?: string;
  priceTo?: string;
}>;
}) {


  const params = await searchParams;


  const properties = await getProperties();



  const activeProperties = properties.filter(
    (property: any) => {


      if (property.status !== "active") {
        return false;
      }

if (
  params.type &&
  property.property_type !== params.type
) {
  return false;
}

      if (
  params.type &&
  property.deal_type !== params.type
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


      <h1 className="mb-8 text-4xl font-bold">
        Каталог недвижимости
      </h1>



      <PropertiesCatalog
        properties={activeProperties}
      />


    </main>

  );

}