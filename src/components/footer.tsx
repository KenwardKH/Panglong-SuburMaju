import { useTranslation } from "react-i18next";
import {
  FaLocationDot,
  FaWhatsapp,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
    const {t} = useTranslation();

    const currentYear = new Date().getFullYear()
  return (
    <footer className="py-10 bg-gray-900 text-white">
      <div className="mx-auto px-6 container">
        <div className="flex flex-col gap-4">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-12 py-8 border-b border-gray-400 mb-4">
            <div className="">
              <h1 className="text-2xl uppercase font-bold text-yellow-500 mb-4">
                {t("hero.shop_name")}
              </h1>
              <h2 className="text-gray-400">{t("footer.tagline")}</h2>
            </div>
            <div>
              <h1 className="text-xl font-bold border-l-4 border-l-yellow-500 px-3 mb-4">
                {t("footer.links_title")}
              </h1>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link
                    to="/"
                    className="hover:text-yellow-500 transition duration-300"
                  >
                    {t("nav.home")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-yellow-500 transition duration-300"
                  >
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="hover:text-yellow-500 transition duration-300"
                  >
                    {t("nav.products")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-yellow-500 transition duration-300"
                  >
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h1 className="text-xl font-bold border-l-4 border-l-yellow-500 px-3 mb-4">
                {t("footer.contact_title")}
              </h1>
              <div className="flex flex-col gap-3">
                <p className="text-gray-400 flex items-center gap-3">
                  <FaWhatsapp className="text-yellow-500 text-xl" />
                  +62 8123456789
                </p>
                <p className="text-gray-400 flex items-start gap-4">
                  <FaLocationDot className="text-yellow-500 mt-1 text-lg" />
                  <span>
                    Jl. Setia Budi, Simpang Selayang,
                    <br />
                    Medan, Sumatera Utara
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-400">
            &copy; {currentYear} Toko Subur Maju. All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
