export interface Card {
  id: string;
  name: string;
  shortName: string;
  brand: string;
  color: string;
  recommendedFor: string[]; // 카테고리
  cashbackRate: number; // 적립률 %
  description: string;
}

export const cards: Card[] = [
  {
    id: "C001",
    name: "BC 바로카드",
    shortName: "바로카드",
    brand: "BC카드",
    color: "from-bc-700 to-bc-500",
    recommendedFor: ["카페", "외식", "편의점"],
    cashbackRate: 1.0,
    description: "일상 결제에 최적화된 BC 메인 카드",
  },
  {
    id: "C002",
    name: "BC 데일리플러스",
    shortName: "데일리+",
    brand: "BC카드",
    color: "from-bc-600 to-bc-400",
    recommendedFor: ["편의점", "교통", "구독"],
    cashbackRate: 0.7,
    description: "편의점·교통·구독 정기결제 특화",
  },
  {
    id: "C003",
    name: "BC 트래블원",
    shortName: "트래블원",
    brand: "BC카드",
    color: "from-bc-800 to-bc-600",
    recommendedFor: ["쇼핑", "외식"],
    cashbackRate: 0.5,
    description: "여행·쇼핑 시즌 혜택 카드",
  },
];
