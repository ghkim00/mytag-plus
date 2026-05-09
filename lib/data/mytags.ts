// 마이태그 = 페이북에서 결제 전에 미리 활성화하는 혜택
// 추천 화면용 부가 메타데이터
export interface MyTagMeta {
  benefitId: string;
  priority: number; // 추천 정렬 우선순위 (점수)
}

export const mytagMeta: MyTagMeta[] = [
  { benefitId: "B004", priority: 0.78 }, // 외식
  { benefitId: "B001", priority: 0.74 }, // 카페
  { benefitId: "B002", priority: 0.69 }, // 편의점
  { benefitId: "B006", priority: 0.55 }, // 쇼핑
  { benefitId: "B003", priority: 0.52 }, // 교통 (이미 태그됨)
  { benefitId: "B005", priority: 0.48 }, // 구독 (이미 태그됨)
];
