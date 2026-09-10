import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Masih mengecek session → tampilkan loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Belum login → tendang ke login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Sudah login → izinkan masuk
  return <>{children}</>;
}