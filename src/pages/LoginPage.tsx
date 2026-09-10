import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { showToast } from "@/lib/toast";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // Kalau sudah login, langsung ke dashboard
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

const onSubmit = async (data: LoginFormValues) => {
  try {
    setError(null);
    await signIn(data.email, data.password);
    showToast.success("Berhasil masuk");
    navigate(from, { replace: true });
  } catch (err: any) {
    const message = err.message || "Gagal masuk. Periksa email dan password.";
    setError(message);
    showToast.error("Login gagal", message);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        {/* Logo */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft">
            <span className="text-2xl font-bold text-primary">K</span>
          </div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Masuk ke Kiosku
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Silakan masuk untuk mengelola produk dan stok toko Anda
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="nama@contoh.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Masukkan password"
            error={errors.password?.message}
            {...register("password")}
          />

          {error && (
            <div className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Memproses..." : "Masuk"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-neutral-500">
          Hanya pemilik dan staf yang dapat mengubah data
        </p>
      </div>
    </div>
  );
}