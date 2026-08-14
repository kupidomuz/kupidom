export default function ServicesSection() {
  const services = [
    {
      icon: "🏠",
      title: "Купить недвижимость",
      description:
        "Поможем подобрать подходящий объект с учётом ваших требований и бюджета.",
    },
    {
      icon: "💰",
      title: "Продать недвижимость",
      description:
        "Поможем организовать продажу объекта и полностью сопроводим сделку.",
    },
    {
      icon: "🔑",
      title: "Снять недвижимость",
      description:
        "Подберём подходящий вариант для аренды под ваши требования.",
    },
    {
      icon: "🏡",
      title: "Сдать недвижимость",
      description:
        "Поможем найти арендатора и организовать процесс сдачи объекта.",
    },
    {
      icon: "🛡️",
      title: "Управление недвижимостью",
      description:
        "Будем заниматься вашим объектом во время вашего отсутствия.",
    },
    {
      icon: "💬",
      title: "Консультация",
      description:
        "Ответим на вопросы и поможем разобраться в ситуации с недвижимостью.",
    },
    {
      icon: "📋",
      title: "Полное сопровождение",
      description:
        "Сопровождаем клиента на всех этапах работы с недвижимостью.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10">
          <h2 className="text-4xl font-bold text-slate-900">
            Наши услуги
          </h2>

          <p className="mt-3 max-w-2xl text-lg text-gray-500">
            Помогаем решать вопросы с недвижимостью — от консультации
            до полного сопровождения.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 text-5xl">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-3 leading-6 text-gray-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}