import { cx } from "@/lib/utils";
import React from "react";

export function Card({
  className,
  children,
  padded = true,
}: {
  className?: string;
  children: React.ReactNode;
  padded?: boolean;
}) {
  return (
    <div
      className={cx(
        "bg-white rounded-2xl shadow-card border border-ink-100/80",
        padded && "p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  hint,
  action,
  className,
}: {
  children: React.ReactNode;
  hint?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex items-start justify-between gap-3 mb-3", className)}>
      <div>
        <h3 className="text-[15px] font-semibold text-ink-900">{children}</h3>
        {hint && <p className="text-xs text-ink-500 mt-0.5">{hint}</p>}
      </div>
      {action}
    </div>
  );
}
