import { getCompanySettings } from "@/lib/propertyService";

export default async function ContactSection() {
  const company = await getCompanySettings();

  if (!company) {
    return null;
  }

  const phone = company.phone || "";
  const whatsapp = company.whatsapp || "";
  const telegram = company.telegram || "";

  const whatsappLink = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}`
    : "#";

  const telegramUsername = telegram.replace("@", "").trim();
  const telegramLink = telegramUsername
    ? `https://t.me/${telegramUsername}`
    : "#";

  return (
    <section
  id="contacts"
  className="bg-slate-900 py-20 text-white"
>
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <h2 className="text-4xl font-bold">
            Связаться с агентством
          </h2>

          <p className="mt-4 text-lg text-slate-300">
            Хотите купить, продать, снять или сдать недвижимость?
            Свяжитесь с нами — мы поможем решить ваш вопрос.
          </p>

        </div>


        <div className="mt-10 grid gap-5 md:grid-cols-3">

          <a
            href={`tel:${phone}`}
            className="rounded-2xl bg-white p-6 text-center text-slate-900 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">
              📞
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Позвонить
            </h3>

            <p className="mt-2 text-gray-500">
              {phone}
            </p>
          </a>


          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-white p-6 text-center text-slate-900 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">
              💬
            </div>

            <h3 className="mt-4 text-xl font-bold">
              WhatsApp
            </h3>

            <p className="mt-2 text-gray-500">
              Написать нам
            </p>
          </a>


          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-white p-6 text-center text-slate-900 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">
              ✈️
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Telegram
            </h3>

            <p className="mt-2 text-gray-500">
              {company.telegram}
            </p>
          </a>

        </div>


        <div className="mt-8 text-center text-slate-400">
          📍 {company.address}
        </div>

      </div>
    </section>
  );
}