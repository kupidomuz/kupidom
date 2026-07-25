export default function AdminPage() {
  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">
        Панель управления
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow">
          <div className="text-4xl">🏠</div>
          <h2 className="mt-4 text-2xl font-semibold">
            Объекты
          </h2>
          <p className="mt-2 text-gray-500">
            Управление недвижимостью
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow">
          <div className="text-4xl">👥</div>
          <h2 className="mt-4 text-2xl font-semibold">
            Клиенты
          </h2>
          <p className="mt-2 text-gray-500">
            База клиентов
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow">
          <div className="text-4xl">📊</div>
          <h2 className="mt-4 text-2xl font-semibold">
            Статистика
          </h2>
          <p className="mt-2 text-gray-500">
            Аналитика агентства
          </p>
        </div>
      </div>
    </>
  );
}