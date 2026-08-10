import Header from "@/components/Header/Header";
import SearchBar from "@/components/SearchBar/SearchBar";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[900px] overflow-hidden sm:min-h-[850px] lg:min-h-[800px]">

      {/* Фоновое изображение */}
      <Image
        src="/images/hero/hero.png"
        alt="KupiDom"
        fill
        priority
        className="object-cover"
      />

      {/* Затемнение */}
      <div className="absolute inset-0 bg-slate-950/75" />

      {/* Шапка */}
      <Header />

      {/* Контент */}
      <div className="relative z-10 mx-auto flex min-h-[800px] max-w-7xl flex-col justify-center px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:min-h-[800px] lg:px-8">

        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Найдите недвижимость своей мечты
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-200 sm:mt-6 sm:text-xl">
          Продажа и аренда недвижимости по всему Узбекистану
        </p>

        <div className="mt-8 w-full sm:mt-10">
          <SearchBar />
        </div>

      </div>

    </section>
  );
}