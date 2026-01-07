import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./switchLanguage";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();
  return (
    <header className="sticky left-0 top-0 z-10">
      <nav className="shadow-md w-full bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold uppercase tracking-wide">
              <Link to="/">Subur maju</Link>
            </h1>

            <div className="hidden md:flex space-x-6 text-lg">
              <NavLink to="/" className="hover:text-blue-500 font-semibold transition duration-300">
                {t("nav.home")}
              </NavLink>
              <NavLink to="about" className="hover:text-blue-500 font-semibold transition duration-300">
                {t("nav.about")}
              </NavLink>
              <NavLink to="" className="hover:text-blue-500 font-semibold transition duration-300">
                {t("nav.products")}
              </NavLink>
              <NavLink to="#" className="hover:text-blue-500 font-semibold transition duration-300">
                {t("nav.contact")}
              </NavLink>
            </div>
            <div className="hidden md:flex">
              <LanguageSwitcher />
            </div>

            <div className="md:hidden flex text-4xl">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX /> : <IoMdMenu />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="flex md:hidden flex-col bg-white shadow-md border-t">
          <ul className="border-b">
            <li className="px-4 py-2">
              <a href="#" className="hover:text-blue-500">
                {t("nav.about")}
              </a>
            </li>
            <li className="px-4 py-2">
              <a href="#" className="hover:text-blue-500">
                {t("nav.products")}
              </a>
            </li>
            <li className="px-4 py-2">
              <a href="#" className="hover:text-blue-500">
                {t("nav.contact")}
              </a>
            </li>
          </ul>
          <div className="px-4 py-2">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
