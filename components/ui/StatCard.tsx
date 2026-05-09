import { Card } from "./Card";
import { cx, formatPercent } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  hint,
  tone = "default",
  className,
}: {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  tone?: "default" | "primary";
  className?: string;
}) {
  const isPositive = (delta ?? 0) >= 0;
  return (
    <Card className={cx(tone === "primary" && "!bg-bc-600 !border-bc-600 text-white", className)}>
      <div className={cx("text-xs", tone === "primary" ? "text-white/80" : "text-ink-500")}>
        {label}
      </div>
      <div
        className={cx(
          "num text-[22px] font-bold mt-1.5",
          tone === "primary" ? "text-white" : "text-ink-900",
        )}
      >
        {value}
      </div>
      <div className="mt-1 flex items-center gap-2">
        {typeof delta === "number" && (
          <span
            className={cx(
              "num text-xs font-medium",
              tone === "primary"
                ? "text-white/90"
                : isPositive
                  ? "text-positive"
                  : "text-danger",
            )}
          >
            {formatPercent(delta)} 전월비
          </span>
        )}
        {hint && (
          <span
            className={cx(
              "text-xs",
              tone === "primary" ? "text-white/70" : "text-ink-500",
            )}
          >
            {hint}
          </span>
        )}
      </div>
    </Card>
  );
}
