import { type ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  onAddProduct?: () => void;
  onSearch?: (value: string) => void;
  onScanBarcode?: () => void;
}

export function DashboardLayout({
  children,
  title,
  onAddProduct,
  onSearch,
  onScanBarcode,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
          onAddProduct={onAddProduct}
          onSearch={onSearch}
          onScanBarcode={onScanBarcode}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}