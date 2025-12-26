import { useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

interface Language {
  code: string;
  name: string;
  flag: string;
}

function SwitchLanguage() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Memberikan tipe pada useRef agar TypeScript tahu ini untuk elemen HTML
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = [
    { code: "en", name: "English", flag: "us" },
    { code: "id", name: "Indonesia", flag: "ID" },
  ];

  useEffect(() => {
    // Fungsi untuk menutup dropdown jika klik di luar area
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mencari bahasa aktif saat ini
  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    // relative: penting agar menu dropdown (absolute) muncul tepat di bawah tombol
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between items-center min-w-[120px] px-4 py-2
        bg-white text-gray-600 border-gray-300 rounded-md shadow-sm
        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        <span className="flex items-center gap-2">
          <ReactCountryFlag
            svg
            countryCode={currentLanguage.flag}
            className="w-5 h-3 mr-3 object-cover"
          />{" "}
          {currentLanguage.name}
        </span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        // absolute: melayang di atas konten lain
        // right-0: rata kanan sesuai tombol pembungkus
        // z-50: memastikan menu berada paling depan secara visual
        <div className="absolute right-0 mt-2 min-w-[120px] origin-top-right bg-white border-gray-200 rounded-md shadow-xl z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-4 py-2 text-sm text-left transition-colors
                        ${
                          i18n.language === lang.code
                            ? "bg-blue-50 text-blue-700 font-bold" // Gaya jika bahasa terpilih
                            : "text-gray-700 hover:bg-gray-100" // Gaya hover biasa
                        }`}
              >
                <ReactCountryFlag
                  svg
                  countryCode={lang.flag}
                  className="w-5 h-3 mr-3 object-cover"
                />
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SwitchLanguage;
