import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8">

        {/* Логотип */}
        <Link href="/" className="text-5xl font-bold tracking-tight">
          <span className="text-white">Kupi</span>
          <span className="text-red-600">Dom</span>
        </Link>


        {/* Меню */}
        <nav className="hidden items-center gap-10 lg:flex">

          <Link
            href="/properties"
            className="font-semibold text-white hover:text-red-400"
          >
            Купить
          </Link>

          <Link
            href="/properties"
            className="font-semibold text-white hover:text-red-400"
          >
            Аренда
          </Link>

          <Link
            href="/properties"
            className="font-semibold text-white hover:text-red-400"
          >
            Новостройки
          </Link>

          <Link
            href="/properties"
            className="font-semibold text-white hover:text-red-400"
          >
            Коммерция
          </Link>

        </nav>


        {/* Кнопки */}
<div className="flex items-center gap-4">

  <Link
    href="/properties"
    className="rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black"
  >
    Каталог
  </Link>


  <Link
    href="/login"
    className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
  >
    Войти
  </Link>

</div>

      </div>
    </header>
  );
}