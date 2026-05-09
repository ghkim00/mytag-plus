import { cx } from "@/lib/utils";
import React from "react";

type Tone = "blue" | "green" | "amber" | "red" | "gray";

export function Badge({
  tone = "blue",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  const tones: Record<Tone, string> = {
    blue: "bg-bc-50 text-bc-700",
    green: "bg-positive/10 text-positive",
    amber: "bg-warning/10 text-warning",
    red: "bg-danger/10 text-danger",
    gray: "bg-ink-100 text-ink-600",
  };
  return (
    <span className={cx("chip", tones[tone], className)}>
      {children}
    </span>
  );
}
