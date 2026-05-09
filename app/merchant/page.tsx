"use client";
import { useMemo, useState } from "react";
import { DesktopShell } from "@/components/layout/DesktopShell";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { campaigns } from "@/lib/data/campaigns";
import { computeROI } from "@/lib/recommend";
import { cx, formatKRW, formatPercent } from "@/lib/utils";

const GOALS = ["신규 고객 유입", "재방문 유도", "객단가 상승", "특정 시간대 매출 개선"];
const INDUSTRIES = ["카페", "음식점", "편의점", "쇼핑", "병원", "생활서비스"];
const REGIONS = ["서울 강남", "서울 마포", "서울 영등포", "성남 분당", "수원 영통"];
const SEGMENTS = [
  "20대",
  "30대",
  "직장인",
  "최근 30일 유사 업종 결제 고객",
  "주중 점심시간 결제 고객",
];

export default function MerchantPage() {
  const [goal, setGoal] = useState(GOALS[3]);
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [region, setRegion] = useState(REGIONS[0]);
  const [segments, setSegments] = useState<string[]>([SEGMENTS[1], SEGMENTS[2]]);
  const [budget, setBudget] = useState(500000);
  const [discount, setDiscount] = useState(2000);
  const [minAmount, setMinAmount] = useState(10000);
  const [avgTicket, setAvgTicket] = useState(15000);

  const result = useMemo(() => {
    const segmentBoost = 1 + segments.length * 0.05;
    const estReach = Math.round(((budget / 150) * segmentBoost) | 0);
    const tagRate = 0.18 + Math.min(0.08, discount / minAmount);
    const payRate = 0.28 - Math.min(0.1, minAmount / 200000);
    return computeROI({
      budget,
      discountAmount: discount,
      estReach,
      tagRate: Math.min(0.4, Math.max(0.08, tagRate)),
      payRate: Math.min(0.45, Math.max(0.15, payRate)),
      avgTicket,
    });
  }, [budget, discount, minAmount, avgTicket, segments]);

  const aiCopy =
    industry === "카페" && goal.includes("시간대")
      ? "평일 오후 2~5시 매출이 낮은 카페라면, 인근 직장인 고객을 대상으로 1만 원 이상 결제 시 2,000원 할인 캠페인을 추천합니다."
      : `${region} ${industry}에 적합한 ${goal} 캠페인입니다. 타겟 세그먼트와 혜택 조건이 매칭될 때 ROI ${result.roi}%가 예상돼요.`;

  return (
    <DesktopShell
      title="가맹점 캠페인"
      subtitle="우리 매장에 맞는 고객에게 혜택을 제안하세요"
      rightSlot={
        <Button onClick={() => showToast("캠페인을 저장했어요. 운영 검토 후 24시간 이내 배포됩니다.")}>
          캠페인 저장
        </Button>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 입력 영역 */}
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <CardTitle hint="우리 매장이 어떤 결과를 만들고 싶은지 선택하세요">
              캠페인 목표
            </CardTitle>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {GOALS.map((g) => (
                <Pill key={g} active={goal === g} onClick={() => setGoal(g)}>
                  {g}
                </Pill>
              ))}
            </div>
          </Card>

          <Card>
            <CardTitle>업종과 지역</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>업종</Label>
                <div className="grid grid-cols-3 gap-2">
                  {INDUSTRIES.map((i) => (
                    <Pill key={i} active={industry === i} onClick={() => setIndustry(i)}>
                      {i}
                    </Pill>
                  ))}
                </div>
              </div>
              <div>
                <Label>지역</Label>
                <div className="grid grid-cols-2 gap-2">
                  {REGIONS.map((r) => (
                    <Pill key={r} active={region === r} onClick={() => setRegion(r)}>
                      {r}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardTitle hint="여러 개를 함께 선택할 수 있어요">타겟 고객 설정</CardTitle>
            <div className="flex flex-wrap gap-2">
              {SEGMENTS.map((s) => {
                const active = segments.includes(s);
                return (
                  <Pill
                    key={s}
                    active={active}
                    onClick={() =>
                      setSegments((cur) =>
                        active ? cur.filter((x) => x !== s) : [...cur, s],
                      )
                    }
                  >
                    {s}
                  </Pill>
                );
              })}
            </div>
          </Card>

          <Card>
            <CardTitle>혜택 조건과 예산</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <NumberField
                label="할인금액"
                suffix="원"
                value={discount}
                step={500}
                onChange={setDiscount}
              />
              <NumberField
                label="최소 결제금액"
                suffix="원"
                value={minAmount}
                step={1000}
                onChange={setMinAmount}
              />
              <NumberField
                label="캠페인 예산"
                suffix="원"
                value={budget}
                step={50000}
                onChange={setBudget}
              />
              <NumberField
                label="예상 객단가"
                suffix="원"
                value={avgTicket}
                step={1000}
                onChange={setAvgTicket}
              />
            </div>
            <div className="mt-4 rounded-xl bg-ink-100/60 p-3 text-[13px] text-ink-600">
              혜택 조건: <b className="text-ink-900">{minAmount.toLocaleString()}원 이상 결제 시 {discount.toLocaleString()}원 할인</b>
            </div>
          </Card>
        </div>

        {/* 결과 영역 */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="!bg-bc-600 text-white border-0">
            <div className="flex items-center justify-between">
              <Badge tone="blue" className="bg-white/20 text-white">예상 성과</Badge>
              <div className="num text-[10px] text-white/80">
                {industry} · {region}
              </div>
            </div>
            <div className="mt-3 text-[11px] text-white/80">예상 ROI</div>
            <div className="num text-[36px] font-extrabold mt-1 leading-none">
              {result.roi}%
            </div>
            <div className="num text-[12px] text-white/80 mt-1">
              {formatPercent(result.roi - 300, 0)} 업종 평균 대비
            </div>

            <div className="mt-5 space-y-2 text-[13px]">
              <Row label="예상 노출 고객" value={`${result.expectedReach.toLocaleString()}명`} />
              <Row label="예상 태그 고객" value={`${result.expectedTagged.toLocaleString()}명`} />
              <Row label="예상 결제 고객" value={`${result.expectedPaid.toLocaleString()}명`} />
              <Row label="예상 추가 매출" value={formatKRW(result.expectedRevenue)} />
              <Row label="캠페인 예산" value={formatKRW(budget)} />
            </div>
          </Card>

          <Card>
            <CardTitle hint="가맹점주에게 보여줄 추천 멘트">AI 캠페인 제안</CardTitle>
            <p className="text-[14px] text-ink-700 leading-relaxed">{aiCopy}</p>
          </Card>

          <Card>
            <CardTitle>최근 캠페인</CardTitle>
            <ul className="space-y-2.5">
              {campaigns.map((c) => (
                <li key={c.id} className="rounded-xl border border-ink-200 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[14px] font-semibold text-ink-900">
                        {c.merchantName}
                      </div>
                      <div className="text-[11px] text-ink-500 num mt-0.5">
                        {c.region} · {c.industry} · {c.createdAt}
                      </div>
                    </div>
                    <Badge tone={c.status === "진행중" ? "green" : c.status === "예약" ? "blue" : "gray"}>
                      {c.status}
                    </Badge>
                  </div>
                  <div className="num text-[12px] text-ink-600 mt-1">
                    ROI <b className="text-bc-700">{c.expectedROI}%</b> · 예상 매출 {formatKRW(c.expectedRevenue)}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </DesktopShell>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[12px] text-ink-500 mb-2 font-medium">{children}</div>;
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "h-10 px-3 rounded-xl border text-sm font-medium transition",
        active
          ? "bg-bc-50 border-bc-500 text-bc-700"
          : "bg-white border-ink-200 text-ink-700 hover:border-ink-300",
      )}
    >
      {children}
    </button>
  );
}

function NumberField({
  label,
  value,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex items-center bg-ink-100/60 rounded-xl h-12 px-4">
        <input
          type="number"
          value={value}
          step={step}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="flex-1 bg-transparent num text-base font-bold text-ink-900 outline-none"
        />
        <span className="text-ink-500 text-sm">{suffix}</span>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/85">{label}</span>
      <span className="num font-semibold">{value}</span>
    </div>
  );
}
