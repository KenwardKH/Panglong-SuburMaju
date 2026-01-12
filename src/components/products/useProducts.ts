import Papa from "papaparse";
import { useEffect, useState } from "react";
import { type Product, type CsvRow } from "./data";

const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMIJR_a2PhQNqVMJBfLx67eet3DhoJKsXFk5XLNvobeetGvut52-Fk6Byrm64t6NPVHSYbx6AP-wVX/pub?gid=0&single=true&output=csv";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    Papa.parse(GOOGLE_SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rawData = results.data as CsvRow[];

        const mappedData: Product[] = rawData
          .filter((row) => row["Nama Produk"])
          .map((row) => {
            const cleanPrice = row["Harga Jual"]
              ? parseInt(row["Harga Jual"].replace(/\./g, "").replace(/,/g, ""))
              : 0;

            return {
              id: row["Id"],
              name: row["Nama Produk"],
              price: cleanPrice,
              unit: row["Satuan"] || "",
              image: row["Gambar"],
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
  }, []);
  return { products, loading };
};
