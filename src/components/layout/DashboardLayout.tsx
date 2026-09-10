import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  onAddProduct?: () => void;
  onSearch?: (value: string) => void;
}

export function DashboardLayout({
  children,
  title,
  onAddProduct,
  onSearch,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title={title}
          onAddProduct={onAddProduct}
          onSearch={onSearch}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
 dual</div>
    </div>
  );
}