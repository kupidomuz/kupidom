"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function EditPhotos({
  images = [],
}: {
  images: string[];
}) {


  const [photos, setPhotos] = useState<string[]>(
    images
  );


  const [files, setFiles] = useState<File[]>([]);


  const [uploading, setUploading] = useState(false);




  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    if (!e.target.files) return;


    setFiles(
      Array.from(e.target.files).slice(0,10)
    );

  }





  function removePhoto(index:number) {

    setPhotos(
      photos.filter(
        (_,i)=>i !== index
      )
    );

  }







  async function uploadPhotos() {


    setUploading(true);


    const uploaded:string[] = [];



    for (const file of files) {


      const fileName =
        `${crypto.randomUUID()}-${file.name}`;



      const { error } =
        await supabase.storage
          .from("properties")
          .upload(
            fileName,
            file
          );



      if(error){

        console.error(error);

        continue;

      }



      const { data } =
        supabase.storage
          .from("properties")
          .getPublicUrl(
            fileName
          );



      uploaded.push(
        data.publicUrl
      );


    }



    setPhotos([
      ...photos,
      ...uploaded
    ]);



    setFiles([]);


    setUploading(false);


  }






  return (

    <div className="rounded-2xl border bg-white p-8 shadow">


      <h2 className="mb-6 text-2xl font-bold">
        📷 Фотографии
      </h2>





      <div className="grid gap-4 md:grid-cols-5">


        {photos.map(
          (photo,index)=>(

            <div
              key={index}
              className="relative"
            >

              <img
                src={photo}
                alt=""
                className="h-32 w-full rounded-xl object-cover"
              />


              <button
                type="button"
                onClick={() =>
                  removePhoto(index)
                }
                className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-white"
              >
                🗑️
              </button>


            </div>

          )

        )}


      </div>






      <div className="mt-6 space-y-4">


        <input

          type="file"

          multiple

          accept="image/*"

          onChange={handleChange}

          className="rounded-xl border p-3"

        />





        {files.length > 0 && (

          <div className="grid gap-4 md:grid-cols-5">

            {files.map(
              (file,index)=>(

                <img
                  key={index}
                  src={
                    URL.createObjectURL(file)
                  }
                  alt=""
                  className="h-32 w-full rounded-xl object-cover"
                />

              )
            )}

          </div>

        )}






        <button

          type="button"

          onClick={uploadPhotos}

          disabled={
            uploading ||
            files.length === 0
          }

          className="rounded-xl bg-red-600 px-6 py-3 text-white disabled:opacity-50"

        >

          {uploading
            ? "Загрузка..."
            : "➕ Загрузить фото"}

        </button>



      </div>





      <input

        type="hidden"

        name="images"

        value={
          JSON.stringify(photos)
        }

      />



    </div>

  );

}