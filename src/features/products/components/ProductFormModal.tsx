import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, ModalFooter } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { productSchema, type ProductFormValues } from "../validations";
import type { Product } from "@/types";

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  initialData?: Product | null;
  loading?: boolean;
  prefillBarcode?: string | null;
}

export function ProductFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
  loading = false,
  prefillBarcode,
}: ProductFormModalProps) {
  const isEdit = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      barcode: "",
      price: 0,
      stock: 0,
    },
  });

useEffect(() => {
  if (open) {
    if (initialData) {
      reset({
        name: initialData.name,
        barcode: initialData.barcode || "",
        price: initialData.price,
        stock: initialData.stock,
      });
    } else {
      reset({
        name: "",
        barcode: prefillBarcode || "",
        price: 0,
        stock: 0,
      });
    }
  }
}, [open, initialData, prefillBarcode, reset]);

  const handleFormSubmit = async (values: ProductFormValues) => {
    await onSubmit({
      ...values,
      barcode: values.barcode || null,
    } as ProductFormValues);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Ubah Produk" : "Tambah Produk Baru"}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Nama Produk"
          placeholder="Contoh: Indomie Goreng"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Barcode"
          placeholder="Opsional"
          helperText="Biarkan kosong jika tidak memiliki barcode"
          error={errors.barcode?.message}
          {...register("barcode")}
        />

        <Input
          label="Harga"
          type="number"
          placeholder="0"
          error={errors.price?.message}
          {...register("price", { valueAsNumber: true })}
        />

        <Input
          label="Untuk berapa produk"
          type="number"
          placeholder="0"
          error={errors.stock?.message}
          {...register("stock", { valueAsNumber: true })}
        />

        <ModalFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Simpan"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}