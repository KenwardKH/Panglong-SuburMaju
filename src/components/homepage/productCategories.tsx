import { Link } from "react-router-dom";
import pasir from "../../assets/products/pasir.jpg";
import cat from "../../assets/products/cat.jpg";
import semen from "../../assets/products/semen.jpg";
import triplek from "../../assets/products/triplek.jpg";
import pipa from "../../assets/products/pipa.jpeg";
import alat from "../../assets/products/alat.jpg";
import { t } from "i18next";

export default function ProductCategories() {
  const categoryList = [
    {
      id: "basic",
      img: pasir,
      slug: "basic-materials",
    },
    {
      id: "paint",
      img: cat,
      slug: "paint-tools",
    },
    {
      id: "structure",
      img: semen,
      slug: "semen-beton",
    },
    {
      id: "wood",
      img: triplek,
      slug: "wood-material",
    },
    {
      id: "plumbing",
      img: pipa,
      slug: "plumbing",
    },
    {
      id: "tools",
      img: alat,
      slug: "tools",
    }
  ];
  return (
    <section className="py-16 container mx-auto px-6 ">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">{t("categories.title")}</h1>
        <h2 className="text-2xl font-semibold">
          {t("categories.subtitle")}
        </h2>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap justify-center gap-3 md:gap-8 max-w-7xl">
          {categoryList.map((item) => (
            <Link
              to="#"
              className="group block border rounded-lg overflow-hidden shadow-md transition-all hover:shadow-xl hover:scale-105 duration-300"
            >
              <div className="w-64 h-40 md:w-72 md:h-64 overflow-hidden relative">
                <img
                  src={item.img}
                  alt={item.id}
                  className="w-full h-full object-cover group-hover:scale-105 transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transform duration-500"></div>
              </div>
              <div className="text-center">
                <p className="px-4 py-2 font-semibold group-hover:text-yellow-600 duration-400">
                  {t(`categories.${item.id}`)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
