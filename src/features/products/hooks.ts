import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "./api";
import { showToast } from "@/lib/toast";
import type { ProductInsert, ProductUpdate } from "@/types";

export const productKeys = {
  all: ["products"] as const,
  list: () => [...productKeys.all, "list"] as const,
};

export function useProducts() {
  return useQuery({
    queryKey: productKeys.list(),
    queryFn: () => ProductService.getAll(),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProductInsert) => ProductService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.list() });
      showToast.success("Produk berhasil ditambahkan");
    },
    onError: (error: Error) => {
      showToast.error("Gagal menambah produk", error.message);
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ProductUpdate }) =>
      ProductService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.list() });
      showToast.success("Produk berhasil diperbarui");
    },
    onError: (error: Error) => {
      showToast.error("Gagal memperbarui produk", error.message);
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProductService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.list() });
      showToast.success("Produk berhasil dihapus");
    },
    onError: (error: Error) => {
      showToast.error("Gagal menghapus produk", error.message);
    },
  });
}