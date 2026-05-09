"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/utils";

const groups = [
  {
    label: "고객 경험 (모바일)",
    items: [
      { href: "/home", label: "고객 홈" },
      { href: "/coach", label: "결제 코치" },
      { href: "/tags", label: "마이태그 추천" },
      { href: "/report", label: "소비 리포트" },
    ],
  },
  {
    label: "비즈니스 (웹)",
    items: [
      { href: "/merchant", label: "가맹점 캠페인" },
      { href: "/dashboard", label: "운영 대시보드" },
    ],
  },
  {
    label: "프로젝트",
    items: [
      { href: "/about", label: "기획 의도" },
      { href: "/", label: "전체 화면 인덱스" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-[260px] shrink-0 bg-white border-r border-ink-100 hidden lg:flex flex-col">
      <Link href="/" className="px-5 py-5 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bc-700 to-bc-500 grid place-items-center text-white font-extrabold text-xs">
          BC
        </div>
        <div>
          <div className="text-[15px] font-bold text-ink-900 leading-tight">마이태그 플러스</div>
          <div className="text-[10px] text-ink-500 leading-tight">페이북 고도화 MVP</div>
        </div>
      </Link>
      <nav className="px-3 pb-6 flex-1 overflow-y-auto">
        {groups.map((g) => (
          <div key={g.label} className="mb-4">
            <div className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
              {g.label}
            </div>
            <ul className="space-y-0.5">
              {g.items.map((it) => {
                const active = pathname === it.href;
                return (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className={cx(
                        "flex items-center px-3 h-10 rounded-lg text-sm font-medium",
                        active
                          ? "bg-bc-50 text-bc-700"
                          : "text-ink-700 hover:bg-ink-100",
                      )}
                    >
                      {it.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="px-5 py-4 border-t border-ink-100 text-[11px] text-ink-500">
        BC카드 · Paybooc 기반 고도화 제안
      </div>
    </aside>
  );
}
