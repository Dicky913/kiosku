import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "@/types";

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
      <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 py-14 text-center">
        <p className="text-sm text-neutral-500">
          Belum ada data produk. Klik “+ Tambah Produk” untuk mulai.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ===== Desktop Table ===== */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr>
              <th className="px-6 py-3 font-medium text-neutral-600">Nama Produk</th>
              <th className="px-6 py-3 font-medium text-neutral-600">Harga</th>
              <th className="px-6 py-3 font-medium text-neutral-600">Barcode</th>
              <th className="px-6 py-3 font-medium text-neutral-600">Stok</th>
              <th className="px-6 py-3 text-right font-medium text-neutral-600">
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
                <td className="px-6 py-4 font-medium">
                  Rp {product.price.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4 text-neutral-500">
                  {product.barcode || "—"}
                </td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(product)}
                      className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      className="rounded-lg p-2 text-neutral-500 hover:bg-danger-soft hover:text-danger"
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

      {/* ===== Mobile Card List ===== */}
      <div className="space-y-3 p-4 md:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-neutral-900">
                  {product.name}
                </p>
                <p className="mt-1 text-lg font-semibold text-neutral-900">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500">
                  <span>Stok: {product.stock}</span>
                  {product.barcode && <span>{product.barcode}</span>}
                </div>
              </div>

              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => onEdit(product)}
                  className="rounded-lg p-2.5 text-neutral-500 hover:bg-neutral-100"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(product)}
                  className="rounded-lg p-2.5 text-neutral-500 hover:bg-danger-soft hover:text-danger"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}