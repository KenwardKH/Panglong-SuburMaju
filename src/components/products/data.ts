export interface Product {
    id: string,
    name: string,
    price: number,
    unit: string,
    image: string,
    category: string,
    status: string
}

export interface CsvRow {
    Id: string,
    "Nama Produk": string,
    "Harga Jual": string,
    Satuan: string,
    Gambar: string,
    Kategori: string,
    Status: string,
}