import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-3 sm:px-6">
      <p className="text-sm text-neutral-500">
        Halaman <span className="font-medium">{currentPage}</span> dari{" "}
        <span className="font-medium">{totalPages}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-300 text-neutral-600 transition",
            currentPage === 1
              ? "cursor-not-allowed opacity-40"
              : "hover:bg-neutral-100"
          )}
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition",
              page === currentPage
                ? "bg-primary text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            )}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-300 text-neutral-600 transition",
            currentPage === totalPages
              ? "cursor-not-allowed opacity-40"
              : "hover:bg-neutral-100"
          )}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}