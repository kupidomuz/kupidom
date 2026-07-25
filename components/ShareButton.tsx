"use client";

export default function ShareButton() {


  function copyLink() {

    navigator.clipboard.writeText(
      window.location.href
    );

    alert("Ссылка скопирована");

  }



  return (

    <button
      onClick={copyLink}
      className="rounded-xl bg-gray-200 px-6 py-3"
    >

      📋 Скопировать ссылку

    </button>

  );

}