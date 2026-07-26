"use client";

import { useState } from "react";


export default function PropertyGallery({
  images,
}: {
  images: string[];
}) {


  const [activeImage, setActiveImage] = useState(
    images[0]
  );


  if (!images || images.length === 0) {
    return null;
  }



  function nextImage() {

    const currentIndex =
      images.indexOf(activeImage);


    const nextIndex =
      currentIndex === images.length - 1
        ? 0
        : currentIndex + 1;


    setActiveImage(
      images[nextIndex]
    );

  }



  function prevImage() {

    const currentIndex =
      images.indexOf(activeImage);


    const prevIndex =
      currentIndex === 0
        ? images.length - 1
        : currentIndex - 1;


    setActiveImage(
      images[prevIndex]
    );

  }



  return (

    <div className="mb-10 rounded-3xl border bg-white p-6 shadow-sm">


      <div className="relative flex h-[600px] items-center justify-center overflow-hidden rounded-2xl bg-gray-200">


        <img
          src={activeImage}
          alt="Фото объекта"
          className="h-full w-full object-contain"
        />



        {images.length > 1 && (

          <>

            <button
              onClick={prevImage}
              className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-2 text-2xl text-white hover:bg-black/70"
            >
              ←
            </button>


            <button
              onClick={nextImage}
              className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-2 text-2xl text-white hover:bg-black/70"
            >
              →
            </button>


          </>

        )}


      </div>





      <div className="mt-5 grid grid-cols-4 gap-4">


        {images.map(
          (image,index)=>(

            <button
              key={index}
              onClick={() =>
                setActiveImage(image)
              }
              className={`overflow-hidden rounded-xl ${
                activeImage === image
                  ? "ring-4 ring-red-500"
                  : ""
              }`}
            >

              <img
                src={image}
                alt={`Фото ${index + 1}`}
                className="h-28 w-full object-cover"
              />

            </button>

          )
        )}


      </div>



    </div>

  );

}