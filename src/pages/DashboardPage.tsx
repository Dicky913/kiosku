import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProductTable } from "@/features/products/components/ProductTable";
import { ProductFormModal } from "@/features/products/components/ProductFormModal";
import { DeleteProductModal } from "@/features/products/components/DeleteProductModal";
import { BarcodeScanner } from "@/features/products/components/BarcodeScanner";
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

export default function DashboardPage() {
  const [search, setSearch] = useState("");
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
      setFormOpen(true); // langsung buka form edit
    },
    onProductNotFound: (barcode) => {
      setScannerOpen(false);
      setSelectedProduct(null);
      setPrefillBarcode(barcode);
      setFormOpen(true); // buka form tambah dengan barcode terisi
    },
  });

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.barcode?.toLowerCase().includes(q)
    );
  }, [products, search]);

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
      onScanBarcode={() => setScannerOpen(true)}  // pastikan Header support prop ini
    >
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-neutral-900">
            Daftar Produk
          </h2>
          <p className="text-sm text-neutral-500">
            {filteredProducts.length} produk ditemukan
          </p>
        </div>

        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          loading={isLoading}
        />
      </div>

      {/* Form Modal */}
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

      {/* Delete Modal */}
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

      {/* Barcode Scanner */}
      <BarcodeScanner
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanSuccess={handleBarcode}
        onManualSearch={() => {
          setScannerOpen(false);
        }}
      />
    </DashboardLayout>
  );
}