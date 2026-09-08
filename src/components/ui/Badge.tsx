import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "danger" | "warning";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        {
          "bg-neutral-100 text-neutral-700": variant === "default",
          "bg-primary-soft text-primary": variant === "success",
          "bg-danger-soft text-danger": variant === "danger",
          "bg-amber-100 text-amber-800": variant === "warning",
        },
        className
      )}
    >
      {children}
    </span>
  );
}