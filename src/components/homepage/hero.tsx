import { Trans, useTranslation } from "react-i18next";
import hero from "../../assets/hero.jpg";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="h-[100vh] relative w-full z-0">
      <div className="absolute inset-0">
        <img src={hero} alt="hero.jpg" className="w-full h-full object-cover" />
        <div className="bg-black/60 absolute inset-0"></div>
      </div>

      <div className="h-full relative z-10 flex flex-col justify-center container mx-auto px-6">
        <span className="text-yellow-400 font-bold tracking-wider uppercase">
          {t("hero.shop_name")}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight m-0">
          <Trans
            i18nKey="hero.headline"
            components={{
              1: <span className="text-yellow-500 block mt-1"></span>,
            }}
          />
        </h1>
        <p className="text-white flex text-xl items-center space-x-2 mt-4">
          <FaLocationDot />
          <span className="text-base md:text-xl font-medium">
            {t("hero.address")}
          </span>
        </p>
        <div className="flex space-x-6 mt-6">
          <Link to="about">
            <button className="flex px-6 py-3 text-yellow-500 border-[2px] border-yellow-400 w-auto rounded-md hover:bg-yellow-500 hover:text-black transform duration-100 active:bg-yellow-600 font-bold">
              {t("hero.about_button")}
            </button>
          </Link>
          <Link to="products">
            <button className="flex px-6 py-3 text-white border-[2px] border-white w-auto rounded-md hover:bg-white hover:text-black transform duration-100 active:bg-white/90 font-bold">
              {t("hero.product_button")}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
