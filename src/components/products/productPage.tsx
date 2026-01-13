import { useMemo, useState } from "react";
import ProductCard from "./productCard";
import { useProducts } from "./useProducts";
import { FaFilter, FaSearch } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getTranslationKey } from "./categoryMapping";

export default function Products() {
  const { products, loading } = useProducts();
  const location = useLocation();

  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    location.state?.category || "all"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    // Ambil semua kategori dari produk
    const allCategories = products.map((p) => p.category);

    const uniqueCategories = [...new Set(allCategories)];

    uniqueCategories.sort((a, b) => {
      const lowerA = a.toLowerCase();
      const lowerB = b.toLowerCase();

      const isALainnya = lowerA === "lainnya";
      const isBLainnya = lowerB === "lainnya";

      if (isALainnya && !isBLainnya) return 1; // A pindah ke kanan (belakang)
      if (!isALainnya && isBLainnya) return -1; // B pindah ke kanan (belakang)

      // Jika bukan "lainnya", urutkan Abjad (A-Z)
      return a.localeCompare(b);
    });

    return ["all", ...uniqueCategories];
  }, [products]);

  const renderCategoryLabel = (cat: string, t: any) => {
    if (cat === "all") return t("products.categories.all");

    const mappedKey = getTranslationKey(cat);

    // LOGIKA PENTING:
    // Jika hasil mapping SAMA dengan input aslinya (misal: "Elektronik" === "Elektronik")
    // Berarti kategori ini Kategori Baru yang belum didaftarkan di codingan.
    // Maka: Jangan diterjemahkan pakai t(), langsung tampilkan aslinya.
    if (mappedKey === cat) {
      return cat;
    }

    // Jika ada mappingnya (misal: "structure"), baru diterjemahkan.
    // Argumen kedua 'cat' adalah cadangan jika terjemahan json hilang/error.
    return t(`products.categories.${mappedKey}`, cat);
  };

  const filteredProducts = products
    .filter((product) => {
      const categoryMatch =
        selectedCategory === "all" || product.category === selectedCategory;
      const searchMatch = product.name
        .toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase());
      return categoryMatch && searchMatch;
    })
    .sort((a, b) => {
      const isCatALainnya = a.category.toLowerCase() === "lainnya";
      const isCatBLainnya = b.category.toLowerCase() === "lainnya";

      if (isCatALainnya && !isCatBLainnya) return 1; // Produk A (Lainnya) pindah ke bawah
      if (!isCatALainnya && isCatBLainnya) return -1; // Produk B (Lainnya) pindah ke bawah

      const categoryComparison = a.category.localeCompare(b.category);
      if (categoryComparison !== 0) {
        return categoryComparison;
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-2">{t("products.title")}</h1>
          <p className="text-xl font-semibold">{t("products.subtitle")}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm rounded-full font-semibold transition duration-300 ${
                  selectedCategory === cat
                    ? "bg-yellow-500 text-black shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {/* LOGIKA LABEL TOMBOL:
                   1. Jika 'all', ambil terjemahan 'categories.all'
                   2. Jika kategori lain, coba cari mapping key-nya (misal 'tools') lalu translate.
                   3. Jika admin bikin kategori baru yang belum ada di translation.json, 
                      dia akan tetap muncul sesuai tulisan di Excel (Fallback).
                */}
                {renderCategoryLabel(cat, t)}
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
