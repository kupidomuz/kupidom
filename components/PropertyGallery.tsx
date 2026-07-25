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


      <div className="relative">


        <img
          src={activeImage}
          alt="Фото объекта"
          className="h-[500px] w-full rounded-2xl object-cover"
        />



        {images.length > 1 && (

          <>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 rounded-full bg-black/50 px-4 py-2 text-2xl text-white"
            >
              ←
            </button>


            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 rounded-full bg-black/50 px-4 py-2 text-2xl text-white"
            >
              →
            </button>


          </>

        )}


      </div>





      <div className="mt-5 grid grid-cols-4 gap-4">


        {images.map(
          (image,index)=>(

            <img
  key={index}
  src={image}
  alt={`Фото ${index + 1}`}
  onClick={() => {
    alert("клик по фото " + index);
    setActiveImage(image);
  }}


              className={`h-28 w-full cursor-pointer rounded-xl object-cover ${
                activeImage === image
                ? "ring-4 ring-red-500"
                : ""
              }`}

            />

          )
        )}


      </div>



    </div>

  );

}