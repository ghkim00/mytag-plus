"use client";
import { useState } from "react";
import { MobileShell } from "@/components/layout/MobileShell";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { rankedBenefits } from "@/lib/recommend";
import { cx, formatKRW } from "@/lib/utils";

export default function TagsPage() {
  const initial = rankedBenefits();
  const [tagged, setTagged] = useState<Record<string, boolean>>(
    Object.fromEntries(initial.map((b) => [b.id, b.isTagged])),
  );

  const totalSaving = initial.reduce((s, b) => s + b.expectedSaving, 0);

  return (
    <MobileShell title="마이태그 추천" subtitle="내 소비패턴에 맞는 혜택을 추천드려요" back>
      <Card className="bg-gradient-to-br from-bc-700 to-bc-500 text-white border-0">
        <div className="text-xs text-white/80">이번 달 추천 혜택 합산</div>
        <div className="num text-[26px] font-extrabold mt-1.5">{formatKRW(totalSaving)}</div>
        <div className="text-[12px] text-white/80 mt-1">
          모두 태그하면 최대 절약 가능한 예상 금액이에요.
        </div>
      </Card>

      <div className="flex items-center justify-between px-1">
        <div className="text-[12px] text-ink-500">추천 우선순위 순</div>
        <div className="text-[11px] text-ink-400">소비비중·빈도·매력도 기반</div>
      </div>

      <ul className="space-y-3">
        {initial.map((b, idx) => {
          const isOn = tagged[b.id];
          return (
            <Card key={b.id} className="!p-0 overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-bc-50 grid place-items-center text-bc-700 font-bold text-[11px]">
                        {idx + 1}
                      </div>
                      <Badge tone="blue">{b.category}</Badge>
                      {b.tagRequired && !isOn && <Badge tone="amber">태그 필요</Badge>}
                      {isOn && <Badge tone="green">태그됨</Badge>}
                    </div>
                    <div className="text-[15px] font-semibold text-ink-900 mt-2">{b.title}</div>
                    <div className="num text-[12px] text-ink-500 mt-0.5">{b.condition}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-ink-500">예상 절약</div>
                    <div className="num text-[16px] font-bold text-bc-700">
                      {formatKRW(b.expectedSaving)}
                    </div>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-ink-100/60 px-3 py-2 text-[12px] text-ink-600">
                  추천 이유 · {b.reason}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-ink-100 overflow-hidden">
                    <div
                      className="h-full bg-bc-500"
                      style={{ width: `${Math.round(b.score * 100)}%` }}
                    />
                  </div>
                  <span className="num text-[11px] text-ink-500 w-12 text-right">
                    추천도 {Math.round(b.score * 100)}
                  </span>
                </div>
              </div>

              <div className="border-t border-ink-100 px-5 py-3 flex items-center justify-end">
                <Button
                  size="sm"
                  variant={isOn ? "secondary" : "primary"}
                  onClick={() => {
                    setTagged((t) => ({ ...t, [b.id]: !t[b.id] }));
                    showToast(
                      !isOn
                        ? `${b.title}을(를) 마이태그에 추가했어요`
                        : `${b.title} 태그를 해제했어요`,
                    );
                  }}
                  className={cx(isOn && "")}
                >
                  {isOn ? "태그 해제" : "태그하기"}
                </Button>
              </div>
            </Card>
          );
        })}
      </ul>

    </MobileShell>
  );
}
