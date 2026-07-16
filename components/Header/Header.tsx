export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-3xl font-bold">
          Kupi<span className="text-red-600">Dom</span>
        </div>

        <nav className="hidden gap-8 md:flex">
          <a href="#">Купить</a>
          <a href="#">Аренда</a>
          <a href="#">Новостройки</a>
          <a href="#">Коммерция</a>
        </nav>

        <button className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700">
          Войти
        </button>
      </div>
    </header>
  );
}