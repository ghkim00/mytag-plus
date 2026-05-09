"use client";
import { MobileShell } from "@/components/layout/MobileShell";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { showToast } from "@/components/ui/Toast";
import { currentUser } from "@/lib/data/users";
import { monthlyByCategory, lastMonthByCategory } from "@/lib/data/transactions";
import { rankedBenefits } from "@/lib/recommend";
import { formatKRW, formatPercent } from "@/lib/utils";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const COLORS = ["#D62D5C", "#E8456E", "#F76A8B", "#FF9BB3", "#FFC8D6", "#FFE5EC"];

export default function ReportPage() {
  const total = Object.values(monthlyByCategory).reduce((a, b) => a + b, 0);
  const lastTotal = Object.values(lastMonthByCategory).reduce((a, b) => a + b, 0);
  const delta = ((total - lastTotal) / lastTotal) * 100;

  const pieData = Object.entries(monthlyByCategory).map(([k, v]) => ({ name: k, value: v }));
  const compareData = Object.keys(monthlyByCategory).map((k) => ({
    category: k,
    이번달: (monthlyByCategory as any)[k],
    지난달: (lastMonthByCategory as any)[k],
  }));

  const cumulativeSaving = 12320;
  const missedSaving = rankedBenefits()
    .filter((b) => !b.isTagged)
    .reduce((s, b) => s + b.expectedSaving, 0);

  const cafePct = Math.round((monthlyByCategory.카페 / total) * 100);
  const eatPct = Math.round((monthlyByCategory.외식 / total) * 100);

  return (
    <MobileShell title="소비 리포트" subtitle="이번 달 소비 흐름과 다음 액션" back>
      {/* 월간 합계 + 카드값 */}
      <Card>
        <CardTitle hint={`${currentUser.name}님의 2026년 5월 리포트`}>
          이번 달 소비 리포트
        </CardTitle>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-bc-50/40 p-3">
            <div className="text-[11px] text-ink-500">총 소비금액</div>
            <div className="num text-[18px] font-bold text-ink-900 mt-1">{formatKRW(total)}</div>
            <div className="num text-[11px] text-ink-500 mt-0.5">
              <span className={delta >= 0 ? "text-danger" : "text-positive"}>
                {formatPercent(delta)}
              </span>{" "}
              전월비
            </div>
          </div>
          <div className="rounded-xl bg-bc-600 text-white p-3">
            <div className="text-[11px] text-white/80">다음 카드값 예상</div>
            <div className="num text-[18px] font-bold mt-1">
              {formatKRW(currentUser.expectedCardBill)}
            </div>
            <div className="text-[11px] text-white/85 mt-0.5">납부일 D-12</div>
          </div>
        </div>
      </Card>

      {/* 카테고리 비중 차트 */}
      <Card>
        <CardTitle hint="이번 달 소비를 카테고리별로 나눴어요">
          카테고리별 소비 비중
        </CardTitle>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={48}
                outerRadius={80}
                paddingAngle={2}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number) => formatKRW(v)}
                contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E2E5EC" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="grid grid-cols-2 gap-y-1.5 mt-2">
          {pieData.map((d, i) => (
            <li key={d.name} className="flex items-center gap-2 text-[12px]">
              <span
                className="w-2.5 h-2.5 rounded-sm"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              <span className="text-ink-700">{d.name}</span>
              <span className="num text-ink-500 ml-auto">
                {Math.round((d.value / total) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 전월 비교 */}
      <Card>
        <CardTitle hint="지난달과 비교한 카테고리별 소비">전월 대비 소비</CardTitle>
        <div className="h-[180px] -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={compareData} barCategoryGap="20%">
              <XAxis dataKey="category" stroke="#9AA3B2" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v: number) => formatKRW(v)}
                contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E2E5EC" }}
              />
              <Bar dataKey="지난달" fill="#FFC8D6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="이번달" fill="#D62D5C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 누적 절약 / 놓친 혜택 */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <div className="text-[11px] text-ink-500">누적 절약 금액</div>
          <div className="num text-[18px] font-bold text-positive mt-1">
            {formatKRW(cumulativeSaving)}
          </div>
          <div className="text-[11px] text-ink-500 mt-0.5">올해 누적</div>
        </Card>
        <Card>
          <div className="text-[11px] text-ink-500">놓친 혜택 금액</div>
          <div className="num text-[18px] font-bold text-danger mt-1">
            {formatKRW(missedSaving)}
          </div>
          <div className="text-[11px] text-ink-500 mt-0.5">미태그 혜택 합산</div>
        </Card>
      </div>

      {/* AI 요약 */}
      <Card className="!bg-bc-50/30 border-bc-100">
        <div className="flex items-center gap-2 mb-2">
          <Badge tone="blue">AI 소비 요약</Badge>
        </div>
        <p className="text-[14px] text-ink-800 leading-relaxed">
          이번 달은 <b>외식과 카페 소비가 전체의 {cafePct + eatPct}%</b>를 차지하고 있어요.
          지난달보다 외식비가 {Math.round(((monthlyByCategory.외식 - lastMonthByCategory.외식) / lastMonthByCategory.외식) * 100)}% 증가했기 때문에,
          남은 기간에는 <b>생활·교통 혜택</b>을 우선 추천드려요.
        </p>
      </Card>

      {/* 다음 액션 */}
      <Card>
        <CardTitle hint="고객님께 가장 도움이 될 다음 행동">다음 추천 액션</CardTitle>
        <ul className="space-y-2">
          {[
            "카페 1,000원 청구할인 태그하기",
            "다음 달 식비 예산 설정하기",
            "고정비 결제 카드 점검하기",
          ].map((label, i) => (
            <li
              key={label}
              className="flex items-center justify-between gap-3 rounded-xl border border-ink-200 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-bc-50 grid place-items-center text-bc-700 font-bold text-sm">
                  {i + 1}
                </div>
                <div className="text-sm font-semibold text-ink-900">{label}</div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => showToast(`"${label}" 액션을 시작합니다`)}
              >
                실행
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </MobileShell>
  );
}
