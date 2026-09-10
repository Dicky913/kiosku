import { Menu, ScanBarcode, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
  onAddProduct?: () => void;
  onSearch?: (value: string) => void;
  onScanBarcode?: () => void;
}

export function Header({
  title = "Home Dashboard",
  onMenuClick,
  onAddProduct,
  onSearch,
  onScanBarcode,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white">
      <div className="flex h-14 items-center gap-3 px-4 sm:h-16 sm:px-6">
        {/* Hamburger (mobile only) */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <h1 className="truncate text-lg font-semibold text-neutral-900 sm:text-xl">
          {title}
        </h1>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Search - hidden di mobile sangat kecil, bisa diganti icon */}
          <div className="relative hidden min-w-[180px] max-w-xs flex-1 md:block lg:max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              placeholder="Cari Produk..."
              onChange={(e) => onSearch?.(e.target.value)}
              className="h-10 w-full rounded-lg border border-neutral-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            type="button"
            onClick={onScanBarcode}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-100"
            title="Scan Barcode"
          >
            <ScanBarcode size={20} />
          </button>

          <Button onClick={onAddProduct} className="hidden sm:inline-flex">
            + Tambah Produk
          </Button>

          {/* Versi icon-only di mobile sangat sempit */}
          <Button
            onClick={onAddProduct}
            size="sm"
            className="inline-flex sm:hidden"
          >
            +
          </Button>
        </div>
      </div>

      {/* Search bar full width di mobile */}
      <div className="border-t border-neutral-100 px-4 py-2 md:hidden">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            placeholder="Cari Produk..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="h-10 w-full rounded-lg border border-neutral-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </header>
  );
}