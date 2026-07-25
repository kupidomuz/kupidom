"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function EditPhotoUploader({
  existingImages = [],
}: {
  existingImages: string[];
}) {


  const [images, setImages] = useState<string[]>(
    existingImages
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

    setImages(
      images.filter(
        (_,i)=>i!==index
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



      const {data} =
        supabase.storage
          .from("properties")
          .getPublicUrl(
            fileName
          );


      uploaded.push(
        data.publicUrl
      );


    }



    setImages([
      ...images,
      ...uploaded
    ]);


    setFiles([]);


    setUploading(false);


  }




  return (

    <div className="space-y-5">


      <h2 className="text-2xl font-bold">
        📷 Фотографии
      </h2>



      <div className="grid gap-4 md:grid-cols-5">


        {images.map(
          (image,index)=>(

            <div
              key={index}
              className="relative"
            >

              <img
                src={image}
                className="h-32 w-full rounded-xl object-cover"
              />


              <button
                type="button"
                onClick={() =>
                  removePhoto(index)
                }
                className="absolute right-1 top-1 rounded-full bg-red-600 px-2 text-white"
              >
                🗑️
              </button>


            </div>

          )
        )}


      </div>




      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        className="rounded-xl border p-3"
      />




      <button
        type="button"
        onClick={uploadPhotos}
        disabled={
          uploading ||
          files.length===0
        }
        className="rounded-xl bg-red-600 px-6 py-3 text-white disabled:opacity-50"
      >

        {uploading
          ? "Загрузка..."
          : "➕ Добавить фото"}

      </button>




      <input
        type="hidden"
        name="images"
        value={
          JSON.stringify(images)
        }
      />


    </div>

  );

}