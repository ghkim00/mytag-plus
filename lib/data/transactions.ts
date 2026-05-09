export interface Transaction {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  merchant: string;
  category: string;
  amount: number;
  card: string;
  benefitApplied: boolean;
  savedAmount?: number;
}

export const transactions: Transaction[] = [
  { id: "T001", userId: "U001", date: "2026-05-01", merchant: "스타벅스 강남대로점", category: "카페", amount: 6800, card: "BC 바로카드", benefitApplied: false },
  { id: "T002", userId: "U001", date: "2026-05-01", merchant: "GS25 역삼점", category: "편의점", amount: 4300, card: "BC 데일리플러스", benefitApplied: true, savedAmount: 430 },
  { id: "T003", userId: "U001", date: "2026-05-02", merchant: "투썸플레이스 강남역점", category: "카페", amount: 7800, card: "BC 바로카드", benefitApplied: false },
  { id: "T004", userId: "U001", date: "2026-05-02", merchant: "서울교통공사 지하철", category: "교통", amount: 1550, card: "BC 데일리플러스", benefitApplied: true, savedAmount: 78 },
  { id: "T005", userId: "U001", date: "2026-05-03", merchant: "한솥도시락 강남점", category: "외식", amount: 9500, card: "BC 바로카드", benefitApplied: false },
  { id: "T006", userId: "U001", date: "2026-05-03", merchant: "Netflix Premium", category: "구독", amount: 17000, card: "BC 데일리플러스", benefitApplied: true, savedAmount: 1700 },
  { id: "T007", userId: "U001", date: "2026-05-04", merchant: "메가커피 역삼점", category: "카페", amount: 4500, card: "BC 바로카드", benefitApplied: false },
  { id: "T008", userId: "U001", date: "2026-05-04", merchant: "올리브영 강남역점", category: "쇼핑", amount: 38400, card: "BC 트래블원", benefitApplied: false },
  { id: "T009", userId: "U001", date: "2026-05-05", merchant: "서브웨이 역삼점", category: "외식", amount: 11400, card: "BC 바로카드", benefitApplied: true, savedAmount: 1140 },
  { id: "T010", userId: "U001", date: "2026-05-05", merchant: "스타벅스 역삼점", category: "카페", amount: 8500, card: "BC 바로카드", benefitApplied: true, savedAmount: 1000 },
  { id: "T011", userId: "U001", date: "2026-05-06", merchant: "맥도날드 강남대로점", category: "외식", amount: 12800, card: "BC 바로카드", benefitApplied: false },
  { id: "T012", userId: "U001", date: "2026-05-06", merchant: "CU 강남점", category: "편의점", amount: 6200, card: "BC 데일리플러스", benefitApplied: false },
  { id: "T013", userId: "U001", date: "2026-05-07", merchant: "광역버스 9404", category: "교통", amount: 2800, card: "BC 데일리플러스", benefitApplied: true, savedAmount: 140 },
  { id: "T014", userId: "U001", date: "2026-05-07", merchant: "노브랜드 버거 강남점", category: "외식", amount: 8900, card: "BC 바로카드", benefitApplied: false },
  { id: "T015", userId: "U001", date: "2026-05-08", merchant: "이디야커피 강남점", category: "카페", amount: 4800, card: "BC 바로카드", benefitApplied: false },
  { id: "T016", userId: "U001", date: "2026-05-08", merchant: "쿠팡 로켓배송", category: "쇼핑", amount: 52600, card: "BC 트래블원", benefitApplied: false },
  { id: "T017", userId: "U001", date: "2026-05-09", merchant: "본죽 강남점", category: "외식", amount: 9800, card: "BC 바로카드", benefitApplied: false },
  { id: "T018", userId: "U001", date: "2026-04-25", merchant: "스타벅스 강남대로점", category: "카페", amount: 8200, card: "BC 바로카드", benefitApplied: false },
  { id: "T019", userId: "U001", date: "2026-04-26", merchant: "쿠팡 로켓배송", category: "쇼핑", amount: 45000, card: "BC 트래블원", benefitApplied: false },
];

// 카테고리별 한 달 누적 (이번 달 2026-05, 직장인 평균 수준)
export const monthlyByCategory = {
  카페: 132800,
  외식: 247500,
  편의점: 58400,
  교통: 73500,
  쇼핑: 165000,
  구독: 38000,
};
// 합계: 715,200원

export const lastMonthByCategory = {
  카페: 103500,
  외식: 193000,
  편의점: 71200,
  교통: 71000,
  쇼핑: 215000,
  구독: 38000,
};
// 합계: 691,700원 → 전월비 +3.4%
// 카페 +28.3%, 외식 +28.2%, 편의점 -18%, 교통 +3.5%, 쇼핑 -23.3%
