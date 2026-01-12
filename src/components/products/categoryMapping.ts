const excelToTranslationKey: Record<string, string> = {
  "Material Struktur": "structure",
  "Alat Pertukangan": "tools",
  "Paku dan Pengikat": "fastener", // Perhatikan: di Excel "dan", di JSON keynya "fastener"
  "Cat dan Finishing": "paint",
  "Kayu dan Triplek": "wood",
  "Pipa dan Plumbing": "plumbing",
};

export const getTranslationKey = (excelValue: string): string => {
  // Jika ada di daftar mapping, kembalikan key-nya (misal: "tools")
  // Jika tidak ada (misal typo), kembalikan text aslinya
  return excelToTranslationKey[excelValue] || excelValue;
};
