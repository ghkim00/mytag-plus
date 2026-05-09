export function formatKRW(value: number, opts?: { suffix?: string }) {
  return value.toLocaleString("ko-KR") + (opts?.suffix ?? "원");
}

export function formatPercent(value: number, digits = 1) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function pickTopN<T extends { value: number } | { amount: number }>(
  arr: T[],
  n: number,
  key: "value" | "amount" = "amount" as any,
): T[] {
  return [...arr].sort((a: any, b: any) => b[key] - a[key]).slice(0, n);
}
