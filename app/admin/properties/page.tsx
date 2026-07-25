import { getProperties } from "@/lib/propertyService";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import PropertiesTable from "@/components/admin/PropertiesTable";


export default async function AdminPropertiesPage() {


  const properties = await getProperties();

  const user = await getCurrentUser();



  return (

    <main className="mx-auto max-w-7xl px-6 py-10">


      <div className="mb-8 flex items-center justify-between">


        <h1 className="text-4xl font-bold">
          Все объекты
        </h1>



        <Link
          href="/admin/add"
          className="rounded-xl bg-red-600 px-5 py-3 text-white"
        >
          + Добавить объект
        </Link>


      </div>



      <PropertiesTable
        properties={properties}
        user={user}
      />


    </main>

  );

}