import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}

        <input
          id={inputId}
          className={cn(
            "flex h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-danger focus:ring-danger",
            className
          )}
          ref={ref}
          {...props}
        />

        {error && <p className="text-sm text-danger">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-neutral-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";