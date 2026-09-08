import { useState } from "react";
import { Button, Input, Modal, ModalFooter } from "@/components/ui";

export default function ExamplePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="mx-auto max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Contoh UI Components
        </h1>

        <Button onClick={() => setOpen(true)}>
          Tambah Produk
        </Button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Tambah Produk Baru"
        >
          <div className="space-y-4">
            <Input
              label="Nama Produk"
              placeholder="Contoh: Indomie Goreng"
            />
            <Input
              label="Barcode"
              type="number"
              placeholder="0"
            />
            <Input
              label="Harga"
              type="number"
              placeholder="0"
            />
            <Input
              label="Stok"
              type="number"
              placeholder="0"
            />
          </div>

          <ModalFooter>
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>
            <Button onClick={() => setOpen(false)}>
              Simpan
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}