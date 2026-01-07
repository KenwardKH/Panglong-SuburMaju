import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./switchLanguage";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();

  const navLinkClass = ({ isActive }) =>
    `transition duration-300 ${
      isActive
        ? "text-yellow-500 font-bold"
        : "font-semibold text-gray-700 hover:text-yellow-800"
    }`;

  return (
    <header className="sticky left-0 top-0 z-10">
      <nav className="bg-white shadow-md w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between h-16 items-center">
            <h1
              className="text-xl font-bold uppercase tracking-wide"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Link to="/">Suburmaju</Link>
            </h1>

            <div className="hidden md:flex space-x-3 lg:space-x-6 text-lg">
              <NavLink to="/" className={navLinkClass}>
                {t("nav.home")}
              </NavLink>
              <NavLink to="about" className={navLinkClass}>
                {t("nav.about")}
              </NavLink>
              <NavLink to="products" className={navLinkClass}>
                {t("nav.products")}
              </NavLink>
              <NavLink to="contact" className={navLinkClass}>
                {t("nav.contact")}
              </NavLink>
            </div>
            <div className="hidden md:flex">
              <LanguageSwitcher />
            </div>

            <div className="md:hidden flex space-x-4">
              <LanguageSwitcher />
              <button className="text-4xl" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX /> : <IoMdMenu />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`flex md:hidden absolute w-full bg-white flex-col shadow-md border-t transition duration-300 ease-in-out origin-top ${
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        }`}
      >
        <ul className="border-b">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 py-2 text-lg ${
                  isActive
                    ? "bg-yellow-100 font-bold text-yellow-600 border-l-4 border-yellow-600"
                    : "text-gray-800 font-semibold hover:text-yellow-800 hover:bg-gray-100"
                }`
              }
            >
              {t("nav.home")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block px-4 py-2 text-lg ${
                  isActive
                    ? "bg-yellow-100 font-bold text-yellow-600 border-l-4 border-yellow-600"
                    : "text-gray-800 font-semibold hover:text-yellow-800 hover:bg-gray-100"
                }`
              }
            >
              {t("nav.about")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `block px-4 py-2 text-lg ${
                  isActive
                    ? "bg-yellow-100 font-bold text-yellow-600 border-l-4 border-yellow-600"
                    : "text-gray-800 font-semibold hover:text-yellow-800 hover:bg-gray-100"
                }`
              }
            >
              {t("nav.products")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block px-4 py-2 text-lg ${
                  isActive
                    ? "bg-yellow-100 font-bold text-yellow-600 border-l-4 border-yellow-600"
                    : "text-gray-800 font-semibold hover:text-yellow-800 hover:bg-gray-100"
                }`
              }
            >
              {t("nav.contact")}
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
