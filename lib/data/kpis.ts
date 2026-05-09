export interface KPI {
  label: string;
  value: string;
  delta: number; // 전월 대비 % (+/-)
  hint?: string;
}

export const kpis: KPI[] = [
  { label: "월간 활성 사용자(MAU)", value: "1,284K", delta: 8.2, hint: "전월 대비 +97K" },
  { label: "추천 혜택 클릭률", value: "31.4%", delta: 4.1 },
  { label: "마이태그 태그율", value: "22.7%", delta: 6.5 },
  { label: "결제 전환율", value: "14.8%", delta: -1.2 },
  { label: "평균 절약 금액", value: "8,450원", delta: 3.4 },
  { label: "소비 리포트 조회율", value: "47.2%", delta: 9.3 },
  { label: "가맹점 캠페인 생성 수", value: "428건", delta: 12.1 },
  { label: "캠페인 평균 ROI", value: "412%", delta: -5.7 },
  { label: "페이북 평균 체류시간", value: "4분 32초", delta: 11.4 },
];

// 결제 전환 퍼널 (이번 달)
export const conversionFunnel = [
  { stage: "추천 노출", value: 1000000 },
  { stage: "혜택 클릭", value: 314000 },
  { stage: "마이태그", value: 71200 },
  { stage: "결제 완료", value: 10500 },
];

// 카테고리별 혜택 사용률
export const categoryUsage = [
  { category: "카페", usage: 38 },
  { category: "외식", usage: 29 },
  { category: "편의점", usage: 24 },
  { category: "교통", usage: 41 },
  { category: "쇼핑", usage: 18 },
  { category: "구독", usage: 22 },
];

// 캠페인 ROI 분포
export const campaignROIData = [
  { name: "신규유입", roi: 380 },
  { name: "재방문", roi: 510 },
  { name: "객단가↑", roi: 290 },
  { name: "시간대개선", roi: 440 },
];

export const operationalInsights = [
  {
    title: "이번 주 캠페인 전환율 주의",
    body: "이번 주 캠페인은 태그율은 높지만 결제 전환율이 낮습니다. 혜택 조건이 복잡하거나 최소 결제금액이 높아 실제 사용으로 이어지지 않았을 가능성이 있습니다.",
    severity: "warning" as const,
  },
  {
    title: "카페 카테고리 추천이 가장 효율적",
    body: "카페 혜택 추천 노출 → 결제 전환율이 전체 평균보다 1.8배 높습니다. 카페 혜택 슬롯을 홈 상단으로 우선 노출하는 실험을 권장합니다.",
    severity: "info" as const,
  },
];

export const nextActions = [
  "혜택 조건이 복잡한 캠페인 검토 (조건 수 3개 이상)",
  "카페 혜택 홈 상단 노출 A/B 테스트 셋업",
  "20대 신규 사용자 대상 첫 결제 코치 진입 흐름 점검",
];
