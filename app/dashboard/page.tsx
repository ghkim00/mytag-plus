"use client";
import { DesktopShell } from "@/components/layout/DesktopShell";
import { Card, CardTitle } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import {
  kpis,
  conversionFunnel,
  categoryUsage,
  campaignROIData,
  operationalInsights,
  nextActions,
} from "@/lib/data/kpis";
import { cx } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function DashboardPage() {
  const maxFunnel = conversionFunnel[0].value;

  return (
    <DesktopShell
      title="마이태그 플러스 성과 대시보드"
      subtitle="비씨카드 사업기획·마케팅 담당자용 KPI 모니터링"
      rightSlot={
        <>
          <select className="h-10 px-3 rounded-lg border border-ink-200 bg-white text-sm font-medium text-ink-700">
            <option>이번 달</option>
            <option>지난 30일</option>
            <option>지난 7일</option>
          </select>
          <Badge tone="green">실시간</Badge>
        </>
      }
    >
      {/* KPI 그리드 */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
          <StatCard
            label={kpis[0].label}
            value={kpis[0].value}
            delta={kpis[0].delta}
            hint={kpis[0].hint}
            tone="primary"
          />
          {kpis.slice(1).map((k) => (
            <StatCard key={k.label} label={k.label} value={k.value} delta={k.delta} />
          ))}
        </div>
      </section>

      {/* 결제 전환 퍼널 + ROI */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <Card className="xl:col-span-2">
          <CardTitle hint="추천 노출 → 혜택 클릭 → 마이태그 → 결제">
            결제 전환 퍼널
          </CardTitle>
          <ul className="space-y-3">
            {conversionFunnel.map((s, i) => {
              const pct = (s.value / maxFunnel) * 100;
              const fromPrev =
                i === 0 ? null : Math.round((s.value / conversionFunnel[i - 1].value) * 100);
              return (
                <li key={s.stage}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={cx(
                          "w-6 h-6 rounded-md grid place-items-center font-bold text-[11px]",
                          i === 0 ? "bg-bc-600 text-white" : "bg-bc-50 text-bc-700",
                        )}
                      >
                        {i + 1}
                      </div>
                      <span className="text-sm font-semibold text-ink-900">{s.stage}</span>
                      {fromPrev !== null && (
                        <Badge tone="gray">전 단계 → {fromPrev}%</Badge>
                      )}
                    </div>
                    <span className="num text-sm font-bold text-ink-900">
                      {s.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-ink-100 overflow-hidden">
                    <div
                      className={cx(
                        "h-full rounded-full",
                        i === 0
                          ? "bg-gradient-to-r from-bc-700 to-bc-500"
                          : "bg-bc-500",
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <CardTitle hint="목표 유형별 평균 ROI">캠페인 ROI</CardTitle>
          <div className="h-[220px] -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignROIData}>
                <CartesianGrid stroke="#F1F3F7" vertical={false} />
                <XAxis dataKey="name" stroke="#9AA3B2" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#9AA3B2" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E2E5EC" }}
                  formatter={(v: number) => `${v}%`}
                />
                <Bar dataKey="roi" fill="#D62D5C" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* 카테고리별 혜택 사용률 */}
      <section className="mt-6">
        <Card>
          <CardTitle hint="카테고리별 혜택 노출 대비 사용률">
            카테고리별 혜택 사용률
          </CardTitle>
          <div className="h-[260px] -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryUsage}>
                <CartesianGrid stroke="#F1F3F7" vertical={false} />
                <XAxis dataKey="category" stroke="#9AA3B2" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9AA3B2" fontSize={11} tickLine={false} axisLine={false} unit="%" />
                <Tooltip
                  contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E2E5EC" }}
                  formatter={(v: number) => `${v}%`}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="usage" name="사용률" fill="#E8456E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* AI 운영 인사이트 + 다음 액션 */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardTitle hint="이번 주 데이터에서 추출한 운영 시사점">AI 운영 인사이트</CardTitle>
          <ul className="space-y-3">
            {operationalInsights.map((ins) => (
              <li
                key={ins.title}
                className={cx(
                  "rounded-xl p-4 border",
                  ins.severity === "warning"
                    ? "bg-warning/5 border-warning/30"
                    : "bg-bc-50/40 border-bc-100",
                )}
              >
                <div className="flex items-center gap-2">
                  <Badge tone={ins.severity === "warning" ? "amber" : "blue"}>
                    {ins.severity === "warning" ? "주의" : "기회"}
                  </Badge>
                  <div className="text-sm font-semibold text-ink-900">{ins.title}</div>
                </div>
                <p className="text-[13px] text-ink-600 mt-2 leading-relaxed">{ins.body}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle hint="이번 주 우선적으로 검토할 액션">다음 개선 액션</CardTitle>
          <ul className="space-y-2.5">
            {nextActions.map((a, i) => (
              <li
                key={a}
                className="flex items-start gap-3 rounded-xl border border-ink-200 px-4 py-3"
              >
                <div className="w-7 h-7 rounded-lg bg-bc-50 grid place-items-center text-bc-700 font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="text-sm text-ink-800 leading-relaxed">{a}</div>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </DesktopShell>
  );
}
