import { useState } from "react";
import ProductCard from "./productCard";
import { useProducts } from "./useProducts";
import { FaFilter, FaSearch } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { products, loading } = useProducts();
  const location = useLocation();
  
  const {t} = useTranslation();
  
  const [selectedCategory, setSelectedCategory] = useState<string>(location.state?.category || "all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // id: Value persis di Excel (untuk filtering logic)
  // key: Kunci untuk translation.json (untuk label tampilan)
  const categories = [
    {
      id: "all",
      key: "all",
    },
    {
      id: "Material Struktur",
      key: "structure",
    },
    {
      id: "Alat Pertukangan",
      key: "tools",
    },
    {
      id: "Paku dan Pengikat",
      key: "fastener",
    },
    {
      id: "Cat dan Finishing",
      key: "paint",
    },
    {
      id: "Kayu dan Triplek",
      key: "wood",
    },
    {
      id: "Pipa dan Plumbing",
      key: "plumbing",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "all" || product.category === selectedCategory;
    const searchMatch = product.name
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-2">{t("products.title")}</h1>
          <p className="text-xl font-semibold">
            {t("products.subtitle")}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-sm rounded-full font-semibold transition duration-300 ${
                  selectedCategory === cat.id
                    ? "bg-yellow-500 text-black shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {t(`products.categories.${cat.key}`)}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
            />
            <FaSearch className="absolute left-3 top-4 text-gray-400" />
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-4xl text-yellow-500" />
            <span className="ml-3 text-gray-600 font-medium">
              {t("products.loading")}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="text-6xl flex justify-center text-gray-500 mb-2">
                  <FaFilter />
                </div>
                <p className="text-xl text-gray-500 font-medium">
                  {t("products.empty")}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="text-yellow-600 font-bold mt-4 hover:underline"
                >
                  {t("products.reset")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
