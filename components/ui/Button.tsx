"use client";
import React from "react";
import { cx } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variants: Record<Variant, string> = {
    primary: "bg-bc-600 hover:bg-bc-700 text-white shadow-card",
    secondary: "bg-bc-50 hover:bg-bc-100 text-bc-700",
    outline: "border border-bc-200 text-bc-700 hover:bg-bc-50",
    ghost: "text-ink-700 hover:bg-ink-100",
  };
  const sizes: Record<Size, string> = {
    sm: "h-9 px-3 text-sm rounded-lg",
    md: "h-11 px-4 text-[15px] rounded-xl",
    lg: "h-14 px-5 text-base rounded-2xl",
  };
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
