"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function PhotoUploader({
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


    const selected = Array.from(
      e.target.files
    ).slice(0, 10);


    setFiles(selected);

  }




  function removePhoto(index:number) {

    setImages(
      images.filter(
        (_, i) => i !== index
      )
    );

  }





  function compressImage(
    file: File
  ): Promise<File> {


    return new Promise((resolve) => {


      const img = new Image();

      const canvas = document.createElement(
        "canvas"
      );

      const reader = new FileReader();



      reader.onload = () => {

        img.src = String(
          reader.result
        );

      };



      img.onload = () => {


        const maxWidth = 2400;


        let width = img.width;
        let height = img.height;



        if (width > maxWidth) {

          height =
            height *
            (maxWidth / width);

          width = maxWidth;

        }



        canvas.width = width;
        canvas.height = height;



        const ctx =
          canvas.getContext(
            "2d"
          );



        ctx?.drawImage(
          img,
          0,
          0,
          width,
          height
        );



        canvas.toBlob(
          (blob) => {


            if (!blob) {

              resolve(file);

              return;

            }



            const newFile =
              new File(
                [blob],
                file.name.replace(
                  /\.[^/.]+$/,
                  ".jpg"
                ),
                {
                  type:"image/jpeg",
                }
              );


            resolve(
              newFile
            );


          },
          "image/jpeg",
          0.9
        );


      };



      reader.readAsDataURL(
        file
      );


    });

  }







  async function uploadPhotos() {


    setUploading(true);


    const uploaded:string[] = [];



    for (const file of files) {


      const optimized =
        await compressImage(
          file
        );



      const fileName =
        `${crypto.randomUUID()}.jpg`;



      const { error } =
        await supabase.storage
          .from("properties")
          .upload(
            fileName,
            optimized,
            {
              contentType:
                "image/jpeg",
            }
          );



      if (error) {

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



    setImages([
      ...images,
      ...uploaded
    ]);


    setFiles([]);


    setUploading(false);

  }







  return (

    <div className="space-y-5">


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



      <p className="text-sm text-gray-500">
        Максимум 10 фото. Фото будут автоматически оптимизированы.
      </p>





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
          ? "Оптимизация и загрузка..."
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