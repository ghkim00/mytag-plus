"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/utils";

const items = [
  { href: "/home", label: "홈", icon: HomeIcon },
  { href: "/coach", label: "결제 코치", icon: CoachIcon },
  { href: "/tags", label: "마이태그", icon: TagIcon },
  { href: "/report", label: "리포트", icon: ReportIcon },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 z-30 mt-auto bg-white border-t border-ink-100">
      <ul className="grid grid-cols-4">
        {items.map((it) => {
          const active = pathname === it.href;
          const Icon = it.icon;
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={cx(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium",
                  active ? "text-bc-600" : "text-ink-500",
                )}
              >
                <Icon active={active} />
                <span>{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 11.5L12 4l9 7.5"
        stroke={active ? "#D62D5C" : "#6B7280"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9"
        stroke={active ? "#D62D5C" : "#6B7280"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CoachIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke={active ? "#D62D5C" : "#6B7280"} strokeWidth="1.8" />
      <path d="M3 10h18" stroke={active ? "#D62D5C" : "#6B7280"} strokeWidth="1.8" />
      <path d="M7 14.5h4" stroke={active ? "#D62D5C" : "#6B7280"} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function TagIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M20.59 13.41l-7.18 7.18a2 2 0 01-2.83 0L3 13V4h9l8.59 8.59a2 2 0 010 2.82z"
        stroke={active ? "#D62D5C" : "#6B7280"}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="7.5" r="1.5" fill={active ? "#D62D5C" : "#6B7280"} />
    </svg>
  );
}
function ReportIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M5 20V10" stroke={active ? "#D62D5C" : "#6B7280"} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 20V4" stroke={active ? "#D62D5C" : "#6B7280"} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 20v-7" stroke={active ? "#D62D5C" : "#6B7280"} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
