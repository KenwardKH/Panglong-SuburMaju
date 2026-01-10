import { useTranslation } from "react-i18next";
import { FaClock, FaMapLocationDot, FaPhone, FaWhatsapp } from "react-icons/fa6";

export default function Contact() {
    const {t} = useTranslation()
  return (
    <section className="py-16 container mx-auto px-6">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-2">{t("contact_page.title")}</h1>
        <p className="text-xl font-semibold">
          {t("contact_page.subtitle")}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 px-4 gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4 px-6 py-4 border rounded-xl shadow-lg">
            <div className="mt-1 px-2 py-2 rounded-full bg-yellow-100">
              <FaPhone className="text-xl text-yellow-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-2">{t("contact_page.phone")}</h1>
              <p className="text-lg mb-1">
                +62 812-6325-1128
              </p>
              <a
                href="https://wa.me/6285761259083"
                target="_blank"
                rel="noreferrel"
                className="font-medium text-white bg-green-500 flex px-4 py-2 w-fit items-center gap-1 rounded-xl transition duration-300 hover:bg-green-600"
              >
                <FaWhatsapp className="text-xl" /> Chat Whatsapp
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4 px-6 py-4 border rounded-xl shadow-xl">
            <div className="mt-1 px-2 py-2 rounded-full bg-yellow-100">
              <FaMapLocationDot className="text-xl text-yellow-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-2">{t("contact_page.address")}</h1>
              <p className="text-lg mb-1">
                {t("hero.address")}
              </p>
              <a
                href="https://maps.app.goo.gl/fJLh1jHwuNvCLxEk7"
                className="font-medium w-fit text-yellow-600 flex items-center gap-1 transition duration-300 hover:text-yellow-700 hover:underline"
              >
                {t("contact_page.map")} &rarr;
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4 px-6 py-4 border rounded-xl shadow-xl">
            <div className="mt-1 px-2 py-2 rounded-full bg-yellow-100">
              <FaClock className="text-xl text-yellow-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-2">{t("contact_page.hours")}</h1>
              <p className="text-lg mb-1">{t("contact_page.hours_detail")}</p>
              <p className="text-lg font-medium text-red-600">
                {t("contact_page.sunday")}
              </p>
            </div>
          </div>
        </div>
        <div className="h-[50vh] lg:h-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.248477457031!2d98.62007799999999!3d3.5299877000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312577698b9739%3A0x9ffe4b379d3011b1!2sPanglong%20subur%20maju!5e0!3m2!1sid!2sid!4v1768051979389!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "1rem" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
