import { NavLink } from "react-router-dom";
import { LayoutDashboard, LogOut, X } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const { user, signOut } = useAuth();

  return (
    <>
      {/* Overlay mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-neutral-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header + Close (mobile) */}
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              K
            </div>
            <span className="text-lg font-semibold text-neutral-900">Kiosku</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-soft text-primary"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                )
              }
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-neutral-200 p-4">
          <div className="mb-3">
            <p className="text-sm font-medium text-neutral-900">Pemilik Kiosku</p>
            <p className="truncate text-xs text-neutral-500">{user?.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-neutral-600 hover:bg-neutral-100"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}