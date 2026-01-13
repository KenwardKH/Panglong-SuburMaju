import { useTranslation } from "react-i18next";
import { FaMapLocationDot, FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function ContactSection() {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-yellow-500">
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <h1 className="font-bold text-3xl md:text-4xl mb-2">
            {t("contact.title")}
          </h1>
          <p className="font-semibold text-lg md:text-xl">
            {t("contact.subtitle")}
          </p>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row justify-center items-center gap-4">
          <a
            href="https://wa.me/6285761259083"
            target="_blank"
            rel="noreferrel"
          >
            <button className="px-6 py-3 font-bold border border-black bg-green-500 text-white rounded-lg flex justify-center items-center gap-1 hover:bg-green-600 hover:text-white transition duration-300 active:scale-95">
              <FaWhatsapp className="text-2xl" />
              Chat WhatsApp
            </button>
          </a>
          <Link to="/contact">
            <button className="px-6 py-3 font-bold border border-black bg-white rounded-lg flex justify-center items-center gap-1 hover:bg-gray-300 hover:text-black transition duration-300 active:scale-95">
              <FaMapLocationDot className="text-2xl" />
              {t("contact.location")}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
