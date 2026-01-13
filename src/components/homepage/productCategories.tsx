import { Link } from "react-router-dom";
import pasir from "../../assets/products/pasir.jpg";
import cat from "../../assets/products/cat.jpg";
import paku from "../../assets/products/paku_dan_skrup.jpg";
import triplek from "../../assets/products/triplek.jpg";
import pipa from "../../assets/products/pipa.jpeg";
import alat from "../../assets/products/alat.jpg";
import { useTranslation } from "react-i18next";

export default function ProductCategories() {
  const { t } = useTranslation();
  const categoryList = [
    {
      id: "structure",
      img: pasir,
      filterValue: "Material Struktur",
    },
    {
      id: "paint",
      img: cat,
      filterValue: "Cat dan Finishing",
    },
    {
      id: "fastener",
      img: paku,
      filterValue: "Paku dan Pengikat",
    },
    {
      id: "wood",
      img: triplek,
      filterValue: "Kayu dan Triplek",
    },
    {
      id: "plumbing",
      img: pipa,
      filterValue: "Pipa dan Plumbing",
    },
    {
      id: "tools",
      img: alat,
      filterValue: "Alat Pertukangan",
    },
  ];
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">{t("categories.title")}</h1>
          <h2 className="text-2xl font-semibold">{t("categories.subtitle")}</h2>
        </div>
        <div className="w-full flex justify-center">
          <div className="flex flex-wrap justify-center gap-3 md:gap-8 max-w-7xl">
            {categoryList.map((item) => (
              <Link
                key={item.id}
                to="/products"
                state={{ category: item.filterValue }}
                className="group block border rounded-lg overflow-hidden shadow-md transition-all hover:shadow-xl hover:scale-105 duration-300"
              >
                <div className="w-72 h-40 md:w-72 md:h-64 overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.id}
                    className="w-full h-full object-cover group-hover:scale-105 transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transform duration-500"></div>
                </div>
                <div className="text-center bg-white">
                  <p className="px-3 py-2 font-semibold text-sm group-hover:text-yellow-600 duration-400">
                    {t(`categories.${item.id}`)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
