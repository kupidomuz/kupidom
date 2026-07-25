import Header from "@/components/Header/Header";
import SearchBar from "@/components/SearchBar/SearchBar";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[620px] overflow-hidden">
      {/* Фоновое изображение */}
      <Image
        src="/images/hero/hero.png"
        alt="KupiDom Hero"
        fill
        priority
        className="object-cover"
      />

      {/* Затемнение */}
      <div className="absolute inset-0 bg-slate-950/75" />

      {/* Шапка */}
      <Header />

      {/* Контент */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pt-16">
        <h1 className="max-w-3xl text-6xl font-bold leading-tight text-white">
          Найдите недвижимость своей мечты
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-slate-200">
          Продажа и аренда недвижимости по всему Узбекистану
        </p>

        <SearchBar />
      </div>
    </section>
  );
}