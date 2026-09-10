import { useState } from "react";
import { ProductService } from "./api";
import type { Product } from "@/types";

interface UseBarcodeHandlerOptions {
  onProductFound: (product: Product) => void;
  onProductNotFound: (barcode: string) => void;
}

export function useBarcodeHandler({
  onProductFound,
  onProductNotFound,
}: UseBarcodeHandlerOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBarcode = async (barcode: string) => {
    setLoading(true);
    setError(null);

    try {
      const product = await ProductService.getByBarcode(barcode);

      if (product) {
        onProductFound(product);
      } else {
        onProductNotFound(barcode);
      }
    } catch (err: any) {
      setError(err.message || "Gagal mencari produk");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleBarcode,
    loading,
    error,
  };
}