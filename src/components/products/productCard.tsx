import { FaWhatsapp } from "react-icons/fa6";
import type { Product } from "./data";
import { useTranslation } from "react-i18next";
import { getTranslationKey } from "./categoryMapping";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();

  // Konversi Kategori & Status Excel ke Bahasa yang sedang aktif
  // Logic: t("categories." + "tools") -> akan muncul "Tools" (Inggris) atau "Alat Pertukangan" (Indo)
  const displayCategory = t(`categories.${getTranslationKey(product.category)}`)

  const formatRupiah = (price: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  return (
    <div className="bg-white rounded-xl shadow-md transition duration-300 hover:shadow-xl overflow-hidden group border border-gray-100 flex flex-col">
      <div className="h-52 overflow-hidden relative bg-gray-100">
        <img
          src={
            product.image && product.image !== "nan"
              ? product.image
              : "https://placehold.co/400x400?text=No+Image"
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/400x400?text=No+Image";
          }}
        />
        <span className="absolute left-0 top-0 bg-black/60 text-white text-sm px-2 py-1 rounded-md">
          {displayCategory}
        </span>
      </div>
      <div className="px-4 py-6 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-500">/ {product.unit}</p>
          <p className="text-lg font-bold text-yellow-600">
            {formatRupiah(product.price)}
          </p>
        </div>
        <div className="flex-grow"></div>
        <a
          href={`https://wa.me/6285761259083?text=Halo%20Toko%20Subur%20Maju,%20saya%20mau%20pesan:%20${encodeURIComponent(
            product.name
          )}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-green-500 text-white px-2 py-4 rounded-lg font-bold hover:bg-green-600 transition duration-300 shadow-lg hover:translate-y-1"
        >
          <FaWhatsapp className="text-xl" />
          {t("products.order")}
        </a>
      </div>
    </div>
  );
}
