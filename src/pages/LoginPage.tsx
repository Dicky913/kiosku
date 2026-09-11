import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { showToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

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
  const [showPassword, setShowPassword] = useState(false);

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

          {/* Password dengan toggle mata */}
          <div className="w-full space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className={cn(
                  "flex h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 pr-10 text-sm text-neutral-900 placeholder:text-neutral-500",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  errors.password && "border-danger focus:ring-danger"
                )}
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-danger">{errors.password.message}</p>
            )}
          </div>

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