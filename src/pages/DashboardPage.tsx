import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { formatLastUpdated } from "@/lib/formatDate";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProductTable } from "@/features/products/components/ProductTable";
import { ProductFormModal } from "@/features/products/components/ProductFormModal";
import { DeleteProductModal } from "@/features/products/components/DeleteProductModal";
import { BarcodeScanner } from "@/features/products/components/BarcodeScanner";
import { Pagination } from "@/components/ui/Pagination";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/features/products/hooks";
import { useRealtimeProducts } from "@/features/products/useRealtimeProducts";
import { useBarcodeHandler } from "@/features/products/useBarcodeHandler";
import type { Product } from "@/types";
import type { ProductFormValues } from "@/features/products/validations";

const ITEMS_PER_PAGE = 10;

const showToast = {
  success: (title: string, description?: string) =>
    toast.success(title, { description }),
  info: (title: string, description?: string) =>
    toast.info(title, { description }),
};

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [prefillBarcode, setPrefillBarcode] = useState<string | null>(null);

  const { data: products = [], isLoading } = useProducts();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  useRealtimeProducts();

  const { handleBarcode } = useBarcodeHandler({
    onProductFound: (product) => {
      setScannerOpen(false);
      setSelectedProduct(product);
      setFormOpen(true);
      showToast.success("Produk ditemukan", product.name);
    },
    onProductNotFound: (barcode) => {
      setScannerOpen(false);
      setSelectedProduct(null);
      setPrefillBarcode(barcode);
      setFormOpen(true);
      showToast.info(
        "Produk belum terdaftar",
        "Silakan lengkapi data produk baru"
      );
    },
  });

  // Filter berdasarkan search
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;

    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.barcode?.toLowerCase().includes(q)
    );
  }, [products, search]);

  // Hitung total halaman
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  // Potong data sesuai halaman aktif
  const paginatedProducts = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, safeCurrentPage]);

  // Waktu update terakhir
  const lastUpdated = useMemo(() => {
    if (!products.length) return null;

    return products.reduce((latest, product) => {
      if (!latest) return product.updated_at;
      return new Date(product.updated_at) > new Date(latest)
        ? product.updated_at
        : latest;
    }, products[0].updated_at as string);
  }, [products]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setPrefillBarcode(null);
    setFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setPrefillBarcode(null);
    setFormOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (values: ProductFormValues) => {
    const payload = {
      name: values.name,
      barcode: values.barcode || null,
      price: values.price,
      stock: values.stock,
    };

    if (selectedProduct) {
      await updateMutation.mutateAsync({
        id: selectedProduct.id,
        payload,
      });
    } else {
      await createMutation.mutateAsync(payload);
    }

    setFormOpen(false);
    setSelectedProduct(null);
    setPrefillBarcode(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;

    await deleteMutation.mutateAsync(selectedProduct.id);
    setDeleteOpen(false);
    setSelectedProduct(null);
  };

  return (
    <DashboardLayout
      title="Home Dashboard"
      onAddProduct={handleAdd}
      onSearch={setSearch}
      onScanBarcode={() => setScannerOpen(true)}
    >
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        {/* Header list */}
        <div className="border-b border-neutral-200 px-4 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            Daftar Produk
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Terakhir diperbaharui : {formatLastUpdated(lastUpdated)}
          </p>
        </div>

        {/* Table / Card list */}
        <ProductTable
          products={paginatedProducts}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          loading={isLoading}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modal Tambah / Ubah */}
      <ProductFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedProduct(null);
          setPrefillBarcode(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={selectedProduct}
        prefillBarcode={prefillBarcode}
        loading={createMutation.isPending || updateMutation.isPending}
      />

      {/* Modal Hapus */}
      <DeleteProductModal
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDeleteConfirm}
        product={selectedProduct}
        loading={deleteMutation.isPending}
      />

      {/* Scanner */}
      <BarcodeScanner
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanSuccess={handleBarcode}
        onManualSearch={() => setScannerOpen(false)}
      />
    </DashboardLayout>
  );
}