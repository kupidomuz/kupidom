import Header from "@/components/Header/Header";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <h1 className="text-5xl font-bold">KupiDom</h1>

            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              Продажа и аренда недвижимости в Узбекистане
            </p>

            <div className="mt-10 grid gap-4 rounded-2xl bg-white p-6 text-black shadow-xl md:grid-cols-4">
              <select className="rounded-lg border p-3">
                <option>Тип недвижимости</option>
              </select>

              <select className="rounded-lg border p-3">
                <option>Район</option>
              </select>

              <select className="rounded-lg border p-3">
                <option>Цена</option>
              </select>

              <button className="rounded-lg bg-red-600 p-3 font-semibold text-white hover:bg-red-700">
                Найти
              </button>
            </div>
          </div>
        </section>

        {/* Новые объекты */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-8 text-3xl font-bold">Новые объекты</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border shadow-sm transition hover:shadow-lg"
              >
                <div className="h-56 bg-gray-200" />

                <div className="p-5">
                  <h3 className="text-xl font-semibold">
                    3-комнатная квартира
                  </h3>

                  <p className="mt-2 text-gray-500">
                    Юнусабадский район
                  </p>

                  <p className="mt-4 text-2xl font-bold text-red-600">
                    145 000 $
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}