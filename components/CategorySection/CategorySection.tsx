export default function CategorySection() {
  const categories = [
    {
      title: "Купить",
      icon: "🏠",
      description: "Квартиры, дома и участки",
    },
    {
      title: "Аренда",
      icon: "🔑",
      description: "Долгосрочная и посуточная",
    },
    {
      title: "Новостройки",
      icon: "🏗️",
      description: "ЖК от застройщиков",
    },
    {
      title: "Коммерция",
      icon: "🏢",
      description: "Офисы, магазины и склады",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-4xl font-bold text-slate-900">
          Выберите направление
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.title}
              className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 text-5xl">{category.icon}</div>

              <h3 className="text-2xl font-bold text-slate-900">
                {category.title}
              </h3>

              <p className="mt-3 text-gray-500">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}