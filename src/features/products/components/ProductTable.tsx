import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "@/types";
import { Button } from "@/components/ui/Button";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  loading?: boolean;
}

export function ProductTable({
  products,
  onEdit,
  onDelete,
  loading,
}: ProductTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
        <p className="text-neutral-500">
          Belum ada data produk. Klik “+ Tambah Produk” untuk mulai.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-neutral-200 bg-neutral-50">
          <tr>
            <th className="px-6 py-3 font-medium text-neutral-600">Nama Produk</th>
            <th className="px-6 py-3 font-medium text-neutral-600">Harga</th>
            <th className="px-6 py-3 font-medium text-neutral-600">Barcode</th>
            <th className="px-6 py-3 font-medium text-neutral-600">Stok</th>
            <th className="px-6 py-3 font-medium text-neutral-600 text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-neutral-50">
              <td className="px-6 py-4 font-medium text-neutral-900">
                {product.name}
              </td>
              <td className="px-6 py-4 font-medium text-neutral-900">
                Rp {product.price.toLocaleString("id-ID")}
              </td>
              <td className="px-6 py-4 text-neutral-500">
                {product.barcode || "—"}
              </td>
              <td className="px-6 py-4 text-neutral-700">{product.stock}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700"
                    title="Ubah"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="rounded-lg p-2 text-neutral-500 transition hover:bg-danger-soft hover:text-danger"
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}