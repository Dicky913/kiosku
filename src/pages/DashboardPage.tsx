import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function DashboardPage() {
  const [search, setSearch] = useState("");

  const handleAddProduct = () => {
    // Nanti dibuka modal Tambah Produk
    console.log("Open Add Product Modal");
  };

  return (
    <DashboardLayout
      title="Home Dashboard"
      onAddProduct={handleAddProduct}
      onSearch={setSearch}
    >
      <div className="rounded-xl border border-neutral-200 bg-white">
        {/* Header Table */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Daftar Produk
            </h2>
            <p className="text-sm text-neutral-500">
              Kelola harga dan stok produk toko Anda
            </p>
          </div>
        </div>

        {/* Content sementara */}
        <div className="p-6">
          <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
            <p className="text-neutral-500">
              {search
                ? `Hasil pencarian untuk “${search}” akan muncul di sini`
                : "Belum ada data produk. Klik “+ Tambah Produk” untuk mulai."}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}