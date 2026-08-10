"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Логотип */}
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          onClick={() => setMenuOpen(false)}
        >
          <span className="text-white">Kupi</span>
          <span className="text-red-600">Dom</span>
        </Link>

        {/* Меню на компьютере */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-10">

          <Link
            href="/properties"
            className="font-semibold text-white transition hover:text-red-400"
          >
            Купить
          </Link>

          <Link
            href="/properties"
            className="font-semibold text-white transition hover:text-red-400"
          >
            Аренда
          </Link>

          <Link
            href="/properties"
            className="font-semibold text-white transition hover:text-red-400"
          >
            Новостройки
          </Link>

          <Link
            href="/properties"
            className="font-semibold text-white transition hover:text-red-400"
          >
            Коммерция
          </Link>

        </nav>

        {/* Правая часть */}
        <div className="flex items-center gap-2">

          {/* Каталог на компьютере */}
          <Link
            href="/properties"
            className="hidden rounded-xl bg-white px-4 py-2 font-semibold text-gray-900 transition hover:bg-gray-100 sm:inline-flex lg:px-5 lg:py-3"
          >
            Каталог
          </Link>

          {/* Вход на компьютере */}
          <Link
            href="/login"
            className="hidden rounded-xl border border-white/70 px-4 py-2 font-semibold text-white transition hover:bg-white hover:text-gray-900 sm:inline-flex lg:px-5 lg:py-3"
          >
            Войти
          </Link>

          {/* Кнопка мобильного меню */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-2xl text-gray-900 sm:hidden"
            aria-label="Открыть меню"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="absolute left-4 right-4 top-full mt-2 rounded-2xl bg-white p-4 shadow-2xl sm:hidden">

          <nav className="flex flex-col">

            <Link
              href="/properties"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100"
            >
              🏠 Купить
            </Link>

            <Link
              href="/properties"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100"
            >
              🏠 Аренда
            </Link>

            <Link
              href="/properties"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100"
            >
              🏢 Новостройки
            </Link>

            <Link
              href="/properties"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100"
            >
              🏬 Коммерция
            </Link>

            <div className="my-2 border-t" />

            <Link
              href="/properties"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl bg-gray-100 px-4 py-3 text-center font-semibold text-gray-900"
            >
              Каталог
            </Link>

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-xl bg-red-600 px-4 py-3 text-center font-semibold text-white"
            >
              Войти
            </Link>

          </nav>

        </div>
      )}

    </header>
  );
}