"use client";
import Link from "next/link";
import { MobileShell } from "@/components/layout/MobileShell";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { currentUser } from "@/lib/data/users";
import { monthlyByCategory, lastMonthByCategory } from "@/lib/data/transactions";
import { rankedBenefits } from "@/lib/recommend";
import { formatKRW, formatPercent } from "@/lib/utils";

export default function HomePage() {
  const user = currentUser;
  const total = Object.values(monthlyByCategory).reduce((a, b) => a + b, 0);
  const lastTotal = Object.values(lastMonthByCategory).reduce((a, b) => a + b, 0);
  const delta = ((total - lastTotal) / lastTotal) * 100;

  const top3 = Object.entries(monthlyByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const recommended = rankedBenefits().filter((b) => !b.isTagged).slice(0, 1)[0];
  const possibleSaving = rankedBenefits()
    .filter((b) => !b.isTagged)
    .reduce((s, b) => s + b.expectedSaving, 0);

  return (
    <MobileShell title="마이태그 플러스" subtitle={`${user.name}님, 안녕하세요`}>
      {/* 인사 + 이번달 요약 */}
      <Card className="bg-gradient-to-br from-bc-700 to-bc-500 text-white border-0">
        <div className="text-xs text-white/80">이번 달 결제 흐름</div>
        <div className="num text-[28px] font-extrabold mt-1.5 tracking-tight">
          {formatKRW(total)}
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-white/85">
          <span className="num">{formatPercent(delta)}</span>
          <span>지난달 대비</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-[11px] text-white/75">다음 카드값 예상</div>
            <div className="num text-base font-bold mt-1">
              {formatKRW(user.expectedCardBill)}
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-[11px] text-white/75">예상 절약 가능</div>
            <div className="num text-base font-bold mt-1">{formatKRW(possibleSaving)}</div>
          </div>
        </div>
      </Card>

      {/* 카테고리 TOP 3 */}
      <Card>
        <CardTitle hint="이번 달 가장 많이 쓴 카테고리">많이 쓴 카테고리 TOP 3</CardTitle>
        <ul className="space-y-3">
          {top3.map(([cat, amount], i) => {
            const last = (lastMonthByCategory as any)[cat] ?? 0;
            const d = last ? ((amount - last) / last) * 100 : 0;
            return (
              <li key={cat} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-bc-50 grid place-items-center text-bc-700 font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-ink-900">{cat}</div>
                  <div className="num text-xs text-ink-500">
                    {formatKRW(amount)} ·{" "}
                    <span className={d >= 0 ? "text-danger" : "text-positive"}>
                      {formatPercent(d)}
                    </span>
                  </div>
                </div>
                <div className="w-24 h-1.5 rounded-full bg-ink-100 overflow-hidden">
                  <div
                    className="h-full bg-bc-500"
                    style={{
                      width: `${Math.min(100, (amount / top3[0][1]) * 100)}%`,
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* 소비 리스크 알림 */}
      <Card className="!bg-warning/5 border-warning/20">
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-lg bg-warning/15 grid place-items-center text-warning shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="17" r="1" fill="currentColor" />
              <path d="M10.3 3.6L2.7 17a2 2 0 001.7 3h15.2a2 2 0 001.7-3L13.7 3.6a2 2 0 00-3.4 0z" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-ink-900">소비 리스크 알림</div>
            <p className="text-[13px] text-ink-600 leading-relaxed mt-0.5">
              이번 달 카페·외식 소비가 지난달보다 28% 증가했어요. 남은 기간에는 생활·교통 혜택을 우선 추천드려요.
            </p>
          </div>
        </div>
      </Card>

      {/* 오늘의 추천 마이태그 */}
      {recommended && (
        <Card>
          <CardTitle
            hint="오늘 가장 유리한 혜택"
            action={<Badge tone="blue">개인화 추천</Badge>}
          >
            오늘의 추천 마이태그
          </CardTitle>
          <div className="rounded-xl border border-bc-100 bg-bc-50/40 p-4">
            <div className="text-[15px] font-semibold text-ink-900">{recommended.title}</div>
            <div className="num text-xs text-ink-500 mt-0.5">{recommended.condition}</div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-[11px] text-ink-500">예상 절약액</div>
                <div className="num text-xl font-bold text-bc-700">
                  {formatKRW(recommended.expectedSaving)}
                </div>
              </div>
              <Link href="/tags">
                <Button size="sm">태그하러 가기</Button>
              </Link>
            </div>
            <div className="mt-3 text-xs text-ink-500">추천 이유 · {recommended.reason}</div>
          </div>
        </Card>
      )}

      {/* CTA */}
      <Card padded={false} className="overflow-hidden">
        <div className="grid grid-cols-3 divide-x divide-ink-100">
          <CTA href="/coach" label="결제 코치" desc="결제 전 추천" />
          <CTA href="/tags" label="혜택 태그" desc="개인화 추천" />
          <CTA href="/report" label="소비 리포트" desc="이번 달 분석" />
        </div>
      </Card>

    </MobileShell>
  );
}

function CTA({ href, label, desc }: { href: string; label: string; desc: string }) {
  return (
    <Link href={href} className="block py-4 text-center hover:bg-ink-50">
      <div className="text-sm font-semibold text-ink-900">{label}</div>
      <div className="text-[11px] text-ink-500 mt-0.5">{desc}</div>
    </Link>
  );
}
