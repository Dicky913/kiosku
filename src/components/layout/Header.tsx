import { Search, ScanBarcode } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  title?: string;
  onAddProduct?: () => void;
  onSearch?: (value: string) => void;
}

export function Header({
  title = "Home Dashboard",
  onAddProduct,
  onSearch,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white">
      <div className="flex h-16 items-center justify-between gap-4 px-6">
        <h1 className="text-xl font-semibold text-neutral-900">{title}</h1>

        <div className="flex flex-1 items-center justify-end gap-3">
          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              placeholder="Cari Produk..."
              onChange={(e) => onSearch?.(e.target.value)}
              className="h-10 w-full rounded-lg border border-neutral-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Barcode button (placeholder) */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 text-neutral-600 transition hover:bg-neutral-100"
            title="Scan Barcode"
          >
            <ScanBarcode size={20} />
          </button>

          {/* Add Product */}
          <Button onClick={onAddProduct}>
            + Tambah Produk
          </Button>
        </div>
      </div>
    </header>
  );
}