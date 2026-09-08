import { useAuth } from "@/features/auth/context/AuthContext";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Home Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-600">{user?.email}</span>
            <Button variant="secondary" onClick={() => signOut()}>
              Keluar
            </Button>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-neutral-600">
            Selamat datang! Authentication sudah berjalan.
          </p>
        </div>
      </div>
    </div>
  );
}