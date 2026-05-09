export interface Benefit {
  id: string;
  title: string;
  category: string;
  applicableCards: string[]; // card ids
  condition: string;
  minAmount: number;
  discountType: "청구할인" | "적립" | "즉시할인";
  discountAmount: number;
  discountRate?: number; // 정률 할인일 때
  tagRequired: boolean;
  isTagged: boolean;
  expectedSaving: number;
  reason: string;
  recencyScore: number; // 최근 소비 비중 (0~1)
  frequencyScore: number; // 결제 빈도 (0~1)
  attractiveScore: number; // 혜택 금액 매력도 (0~1)
  feasibilityScore: number; // 사용 가능성 (0~1)
}

export const benefits: Benefit[] = [
  {
    id: "B001",
    title: "카페 1,000원 청구할인",
    category: "카페",
    applicableCards: ["C001"],
    condition: "8,000원 이상 결제 시",
    minAmount: 8000,
    discountType: "청구할인",
    discountAmount: 1000,
    tagRequired: true,
    isTagged: false,
    expectedSaving: 4000,
    reason: "최근 30일 카페 결제 7회",
    recencyScore: 0.85,
    frequencyScore: 0.78,
    attractiveScore: 0.55,
    feasibilityScore: 0.9,
  },
  {
    id: "B002",
    title: "편의점 10% 즉시할인",
    category: "편의점",
    applicableCards: ["C002"],
    condition: "5,000원 이상 결제 시",
    minAmount: 5000,
    discountType: "즉시할인",
    discountAmount: 0,
    discountRate: 10,
    tagRequired: true,
    isTagged: false,
    expectedSaving: 3200,
    reason: "야간 편의점 결제 빈도 증가",
    recencyScore: 0.62,
    frequencyScore: 0.7,
    attractiveScore: 0.65,
    feasibilityScore: 0.85,
  },
  {
    id: "B003",
    title: "대중교통 5% 청구할인",
    category: "교통",
    applicableCards: ["C002"],
    condition: "월 30,000원 이상 이용 시",
    minAmount: 30000,
    discountType: "청구할인",
    discountAmount: 0,
    discountRate: 5,
    tagRequired: true,
    isTagged: true,
    expectedSaving: 2500,
    reason: "매일 반복되는 고정 교통비",
    recencyScore: 0.4,
    frequencyScore: 0.95,
    attractiveScore: 0.4,
    feasibilityScore: 0.95,
  },
  {
    id: "B004",
    title: "외식 가맹점 2,000원 할인",
    category: "외식",
    applicableCards: ["C001"],
    condition: "10,000원 이상 결제 시",
    minAmount: 10000,
    discountType: "즉시할인",
    discountAmount: 2000,
    tagRequired: true,
    isTagged: false,
    expectedSaving: 6000,
    reason: "이번 달 외식비 28% 증가",
    recencyScore: 0.9,
    frequencyScore: 0.6,
    attractiveScore: 0.75,
    feasibilityScore: 0.7,
  },
  {
    id: "B005",
    title: "구독 서비스 10% 적립",
    category: "구독",
    applicableCards: ["C002"],
    condition: "정기결제 등록 시",
    minAmount: 0,
    discountType: "적립",
    discountAmount: 0,
    discountRate: 10,
    tagRequired: false,
    isTagged: true,
    expectedSaving: 1700,
    reason: "넷플릭스 등 정기결제 사용 중",
    recencyScore: 0.5,
    frequencyScore: 0.5,
    attractiveScore: 0.5,
    feasibilityScore: 0.9,
  },
  {
    id: "B006",
    title: "쇼핑몰 5,000원 청구할인",
    category: "쇼핑",
    applicableCards: ["C003"],
    condition: "30,000원 이상 결제 시",
    minAmount: 30000,
    discountType: "청구할인",
    discountAmount: 5000,
    tagRequired: true,
    isTagged: false,
    expectedSaving: 5000,
    reason: "이번 달 쇼핑 카테고리 165,000원 사용",
    recencyScore: 0.55,
    frequencyScore: 0.3,
    attractiveScore: 0.85,
    feasibilityScore: 0.6,
  },
];
