"use client";
import { useMemo, useState } from "react";
import { MobileShell } from "@/components/layout/MobileShell";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { recommendForPayment } from "@/lib/recommend";
import { cx, formatKRW } from "@/lib/utils";

const CATEGORIES = [
  { key: "카페", emoji: "☕" },
  { key: "편의점", emoji: "🏪" },
  { key: "외식", emoji: "🍽️" },
  { key: "교통", emoji: "🚌" },
  { key: "쇼핑", emoji: "🛍️" },
  { key: "구독", emoji: "📺" },
];

const QUICK_AMOUNTS = [5000, 8000, 12000, 30000];

export default function CoachPage() {
  const [category, setCategory] = useState("카페");
  const [amount, setAmount] = useState(8000);

  const options = useMemo(() => recommendForPayment(category, amount), [category, amount]);
  const sorted = useMemo(() => [...options].sort((a, b) => b.saving - a.saving), [options]);
  const top = sorted[0];
  const untagged = top?.matchedBenefit && !top.matchedBenefit.isTagged;

  return (
    <MobileShell title="결제 코치" subtitle="결제 전 가장 유리한 혜택을 추천드려요" back>
      {/* 입력 영역 */}
      <Card>
        <CardTitle hint="결제하려는 카테고리와 예상 금액을 알려주세요">
          지금 결제, 어떤 혜택이 가장 유리할까요?
        </CardTitle>

        <div className="text-[12px] text-ink-500 mb-2">결제 카테고리</div>
        <div className="grid grid-cols-3 gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={cx(
                "h-16 rounded-xl border text-sm font-semibold flex flex-col items-center justify-center gap-0.5 transition",
                category === c.key
                  ? "bg-bc-50 border-bc-500 text-bc-700"
                  : "bg-white border-ink-200 text-ink-700 hover:border-ink-300",
              )}
            >
              <div className="text-xl leading-none">{c.emoji}</div>
              <div>{c.key}</div>
            </button>
          ))}
        </div>

        <div className="text-[12px] text-ink-500 mb-2 mt-5">결제 예상 금액</div>
        <div className="flex items-center gap-2 bg-ink-100/60 rounded-xl px-4 h-14">
          <input
            type="number"
            value={amount}
            min={0}
            step={1000}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="flex-1 bg-transparent num text-xl font-bold text-ink-900 outline-none placeholder:text-ink-400"
          />
          <span className="text-ink-500 text-sm">원</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {QUICK_AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className={cx(
                "chip",
                amount === a ? "bg-bc-600 text-white" : "bg-ink-100 text-ink-600",
              )}
            >
              {a.toLocaleString()}원
            </button>
          ))}
        </div>
      </Card>

      {/* 추천 결과 헤더 */}
      <Card className="!bg-bc-600 text-white border-0">
        <div className="text-xs text-white/80">최적 결제 추천</div>
        <div className="text-base font-semibold mt-1 leading-snug">
          {category} {formatKRW(amount)} 결제 기준,{" "}
          <span className="font-bold">{top?.card.shortName}</span>로 결제하면{" "}
          <span className="num font-bold">{formatKRW(top?.saving ?? 0)}</span>
          {top?.matchedBenefit?.discountType === "적립" ? "을 적립" : "을 절약"}할 수 있어요.
        </div>
        {untagged && (
          <div className="mt-3 bg-white/15 rounded-xl px-3.5 py-2.5 text-[13px]">
            아직 태그하지 않은 혜택이 있어요. 지금 태그하고 결제하면 바로 적용 가능해요.
          </div>
        )}
      </Card>

      {/* 카드별 비교 */}
      <Card>
        <CardTitle hint="보유 카드별 예상 혜택">보유 카드 비교</CardTitle>
        <ul className="space-y-2.5">
          {options.map((opt) => (
            <li
              key={opt.card.id}
              className={cx(
                "rounded-xl border p-4 flex items-start gap-3",
                opt.label === "추천"
                  ? "border-bc-500 bg-bc-50/50"
                  : "border-ink-200 bg-white",
              )}
            >
              <div
                className={cx(
                  "w-12 h-9 rounded-md bg-gradient-to-br grid place-items-center text-[11px] font-bold text-white shrink-0",
                  opt.card.color,
                )}
              >
                BC
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-[14px] font-semibold text-ink-900">{opt.card.name}</div>
                  {opt.label === "추천" && <Badge tone="blue">추천</Badge>}
                  {opt.label === "비추천" && <Badge tone="gray">비추천</Badge>}
                </div>
                <div className="text-[12px] text-ink-500 mt-0.5">{opt.rationale}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] text-ink-500">예상 혜택</div>
                <div
                  className={cx(
                    "num text-[15px] font-bold",
                    opt.saving > 0 ? "text-bc-700" : "text-ink-400",
                  )}
                >
                  {opt.saving > 0 ? formatKRW(opt.saving) : "-"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* CTA */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="lg"
          onClick={() => showToast("이 혜택을 마이태그에 추가했어요. 결제 시 자동 적용됩니다.")}
        >
          이 혜택 태그하기
        </Button>
        <Button
          size="lg"
          onClick={() =>
            showToast(`${top?.card.shortName}로 결제 요청을 보냈어요. (데모: 실제 결제는 일어나지 않아요)`)
          }
        >
          추천 카드로 결제하기
        </Button>
      </div>

    </MobileShell>
  );
}
