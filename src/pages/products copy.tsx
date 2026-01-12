import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useTranslation } from "react-i18next";
// import Navbar from "../components/Navbar";
import { FaSearch, FaWhatsapp, FaFilter, FaSpinner } from "react-icons/fa";

// 1. Definisikan Tipe Data Produk (Sesuai kolom CSV Anda)
interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  status: string;
}

// 2. Interface untuk baris mentah dari CSV (Header Bahasa Indonesia)
interface CsvRow {
  Id: string;
  "Nama Produk": string;
  "Harga Jual": string;
  Satuan: string;
  Gambar: string;
  Kategori: string;
  Status: string;
}

export default function ProductsPage() {
  const { t } = useTranslation();

  // State Management
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("string"); // Typo fix: inisial kosong ""

  // --- GANTI LINK INI DENGAN LINK CSV ANDA ---
  // Caranya: File > Share > Publish to Web > Pilih CSV > Copy Link
  const GOOGLE_SHEET_CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMIJR_a2PhQNqVMJBfLx67eet3DhoJKsXFk5XLNvobeetGvut52-Fk6Byrm64t6NPVHSYbx6AP-wVX/pub?gid=0&single=true&output=csv";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    Papa.parse(GOOGLE_SHEET_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rawData = results.data as CsvRow[];

        // Mapping Data: Ubah Header Indo -> Variabel Kodingan
        const mappedData: Product[] = rawData
          .filter((row) => row["Nama Produk"]) // Hapus baris kosong
          .map((row) => {
            // Bersihkan format harga (misal "50.000" -> 50000)
            const cleanPrice = row["Harga Jual"]
              ? parseInt(row["Harga Jual"].replace(/\./g, "").replace(/,/g, ""))
              : 0;

            return {
              id: row["Id"],
              name: row["Nama Produk"],
              price: cleanPrice,
              unit: row["Satuan"] || "",
              image: row["Gambar"],
              // Gunakan placeholder jika gambar kosong
              category: row["Kategori"],
              status: row["Status"],
            };
          });

        setProducts(mappedData);
        setLoading(false);
      },
      error: (error) => {
        console.error("Error fetching CSV:", error);
        setLoading(false);
      },
    });
  };

  // Logic Format Rupiah
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Logic Filter & Search
  const filteredProducts = products.filter((product) => {
    // 1. Filter Kategori (Mencocokkan string kategori dari Excel)
    // Note: Pastikan value di tombol kategori sama dengan tulisan di Excel
    const categoryMatch =
      selectedCategory === "all" || product.category === selectedCategory;

    // 2. Filter Search (Nama Produk)
    const searchMatch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // Daftar Kategori (Sesuaikan dengan data di Excel Anda)
  const categories = [
    { id: "all", label: "Semua" },
    { id: "Material Struktur", label: "Material Struktur" }, // Harus sama persis dengan Excel
    { id: "Alat Pertukangan", label: "Alat Tukang" },
    { id: "Paku dan Pengikat", label: "Paku & Pengikat" },
    { id: "Cat dan Finishing", label: "Cat & Finishing" },
    { id: "Kayu dan Triplek", label: "Kayu" },
    { id: "Pipa dan Plumbing", label: "Pipa" },
  ];

  return (
    <>
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Katalog Produk
            </h1>
            <p className="text-gray-600">
              Stok dan harga terupdate langsung dari toko.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? "bg-yellow-500 text-black shadow-md"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Cari nama barang..."
                value={searchQuery === "string" ? "" : searchQuery} // Fix initial state
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* LOADING STATE */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <FaSpinner className="animate-spin text-4xl text-yellow-500" />
              <span className="ml-3 text-gray-600 font-medium">
                Memuat Data Produk...
              </span>
            </div>
          ) : (
            /* PRODUCT GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col"
                  >
                    {/* Gambar Produk */}
                    <div className="h-48 overflow-hidden relative bg-gray-100">
                      <img
                        src={
                          product.image && product.image !== "nan"
                            ? product.image
                            : "https://placehold.co/400x400?text=No+Image"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback jika gambar error
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/400x400?text=No+Image";
                        }}
                      />
                      {/* Badge Kategori */}
                      <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>

                    {/* Info Produk */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-500">
                          / {product.unit}
                        </p>
                        <p className="text-xl font-bold text-yellow-600">
                          {formatRupiah(product.price)}
                        </p>
                      </div>

                      {/* Spacer agar tombol selalu di bawah */}
                      <div className="flex-grow"></div>

                      {/* Tombol Beli WA */}
                      <a
                        href={`https://wa.me/6285761259083?text=Halo%20Toko%20Subur%20Maju,%20saya%20mau%20pesan:%20${encodeURIComponent(
                          product.name
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition-colors shadow-lg hover:-translate-y-1"
                      >
                        <FaWhatsapp className="text-xl" />
                        Pesan Sekarang
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                /* Kosong State */
                <div className="col-span-full text-center py-20">
                  <div className="text-6xl text-gray-300 mb-4 flex justify-center">
                    <FaFilter />
                  </div>
                  <p className="text-xl text-gray-500 font-medium">
                    Produk tidak ditemukan.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="mt-4 text-yellow-600 font-bold hover:underline"
                  >
                    Reset Pencarian
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
