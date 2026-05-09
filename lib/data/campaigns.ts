export interface Campaign {
  id: string;
  merchantName: string;
  industry: string;
  region: string;
  goal: string;
  targetSegment: string;
  benefitDescription: string;
  budget: number;
  expectedReach: number;
  expectedTagged: number;
  expectedPaid: number;
  expectedRevenue: number;
  expectedROI: number;
  status: "진행중" | "예약" | "종료";
  createdAt: string;
}

export const campaigns: Campaign[] = [
  {
    id: "CMP001",
    merchantName: "메가커피 강남대로점",
    industry: "카페",
    region: "서울 강남",
    goal: "평일 오후 매출 개선",
    targetSegment: "30대 직장인",
    benefitDescription: "10,000원 이상 결제 시 2,000원 할인",
    budget: 500000,
    expectedReach: 3666,
    expectedTagged: 953,
    expectedPaid: 219,
    expectedRevenue: 3285000,
    expectedROI: 557,
    status: "진행중",
    createdAt: "2026-04-22",
  },
  {
    id: "CMP002",
    merchantName: "한솥도시락 역삼점",
    industry: "외식",
    region: "서울 강남",
    goal: "신규 고객 유입",
    targetSegment: "20대 직장인",
    benefitDescription: "8,000원 이상 결제 시 1,500원 할인",
    budget: 300000,
    expectedReach: 2240,
    expectedTagged: 414,
    expectedPaid: 124,
    expectedRevenue: 1488000,
    expectedROI: 396,
    status: "예약",
    createdAt: "2026-04-28",
  },
  {
    id: "CMP003",
    merchantName: "GS25 강남역점",
    industry: "편의점",
    region: "서울 강남",
    goal: "재방문 유도",
    targetSegment: "최근 30일 동일업종 결제 고객",
    benefitDescription: "5,000원 이상 결제 시 10% 즉시할인",
    budget: 200000,
    expectedReach: 4180,
    expectedTagged: 952,
    expectedPaid: 318,
    expectedRevenue: 1908000,
    expectedROI: 854,
    status: "진행중",
    createdAt: "2026-04-15",
  },
];
