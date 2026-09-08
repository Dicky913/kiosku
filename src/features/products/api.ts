import { supabase } from "@/lib/supabase";
import type { Product, ProductInsert, ProductUpdate } from "@/types";

export class ProductService {
  /** Ambil semua produk */
  static async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  /** Cari berdasarkan barcode */
  static async getByBarcode(barcode: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("barcode", barcode)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /** Cari berdasarkan nama (ilike) */
  static async searchByName(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${query}%`)
      .order("name");

    if (error) throw error;
    return data ?? [];
  }

  /** Tambah produk baru */
  static async create(payload: ProductInsert): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /** Update produk */
  static async update(id: string, payload: ProductUpdate): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /** Hapus produk */
  static async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}