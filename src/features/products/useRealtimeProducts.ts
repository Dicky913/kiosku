import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { productKeys } from "./hooks";
import type { Product } from "@/types";

/**
 * Subscribe ke perubahan table products secara realtime.
 * Otomatis meng-update cache React Query.
 */
export function useRealtimeProducts() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("products-realtime")
      .on(
        "postgres_changes",
        {
          event: "*", // INSERT | UPDATE | DELETE
          schema: "public",
          table: "products",
        },
        (payload) => {
          // Invalidate agar data selalu segar
          queryClient.invalidateQueries({ queryKey: productKeys.list() });

          // Opsional: update cache secara manual (lebih cepat)
          if (payload.eventType === "INSERT") {
            const newProduct = payload.new as Product;
            queryClient.setQueryData<Product[]>(productKeys.list(), (old = []) => {
              // Hindari duplikat
              if (old.some((p) => p.id === newProduct.id)) return old;
              return [newProduct, ...old];
            });
          }

          if (payload.eventType === "UPDATE") {
            const updated = payload.new as Product;
            queryClient.setQueryData<Product[]>(productKeys.list(), (old = []) =>
              old.map((p) => (p.id === updated.id ? updated : p))
            );
          }

          if (payload.eventType === "DELETE") {
            const deleted = payload.old as Product;
            queryClient.setQueryData<Product[]>(productKeys.list(), (old = []) =>
              old.filter((p) => p.id !== deleted.id)
            );
          }
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("[Realtime] Connected to products channel");
        }
        if (status === "CHANNEL_ERROR") {
          console.error("[Realtime] Channel error");
        }
      });

    // Cleanup saat unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}