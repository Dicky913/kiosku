import { Modal, ModalFooter } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types";

interface DeleteProductModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  product: Product | null;
  loading?: boolean;
}

export function DeleteProductModal({
  open,
  onClose,
  onConfirm,
  product,
  loading = false,
}: DeleteProductModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Hapus Produk?">
      <p className="text-sm text-neutral-600">
        Apakah kamu yakin ingin menghapus produk{" "}
        <span className="font-medium text-neutral-900">
          {product?.name}
        </span>
        ? Tindakan ini tidak dapat dibatalkan.
      </p>

      <ModalFooter>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Batal
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? "Menghapus..." : "Hapus"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}