import { Benefit, benefits } from "./data/benefits";
import { Card, cards } from "./data/cards";

// 혜택 추천 점수 = 0.35*최근소비비중 + 0.25*결제빈도 + 0.20*혜택매력도 + 0.15*사용가능성 + 0.05*미태그 보정
export function scoreBenefit(b: Benefit): number {
  const taggedAdjustment = b.isTagged ? 0 : 1;
  const score =
    b.recencyScore * 0.35 +
    b.frequencyScore * 0.25 +
    b.attractiveScore * 0.2 +
    b.feasibilityScore * 0.15 +
    taggedAdjustment * 0.05;
  return Math.round(score * 100) / 100;
}

export function rankedBenefits(): (Benefit & { score: number })[] {
  return benefits
    .map((b) => ({ ...b, score: scoreBenefit(b) }))
    .sort((a, b) => b.score - a.score);
}

export interface CardOption {
  card: Card;
  matchedBenefit?: Benefit;
  saving: number; // 예상 할인+적립 금액
  label: "추천" | "보통" | "비추천";
  rationale: string;
}

// 결제 코치: 카테고리 + 금액 입력 시 카드별 예상 혜택 비교
export function recommendForPayment(category: string, amount: number): CardOption[] {
  const eligibleBenefits = benefits.filter((b) => b.category === category);

  const options: CardOption[] = cards.map((card) => {
    const matched = eligibleBenefits.find((b) => b.applicableCards.includes(card.id));
    let saving = 0;
    let rationale = "";

    if (matched && amount >= matched.minAmount) {
      if (matched.discountType === "청구할인" || matched.discountType === "즉시할인") {
        if (matched.discountRate) {
          saving = Math.floor((amount * matched.discountRate) / 100);
          rationale = `${matched.title} 적용 (${matched.discountRate}% 할인)`;
        } else {
          saving = matched.discountAmount;
          rationale = `${matched.title} 적용`;
        }
      } else if (matched.discountType === "적립") {
        if (matched.discountRate) {
          saving = Math.floor((amount * matched.discountRate) / 100);
          rationale = `${matched.title} (${matched.discountRate}% 적립)`;
        } else {
          saving = matched.discountAmount;
          rationale = matched.title;
        }
      }
    } else {
      saving = Math.floor(amount * (card.cashbackRate / 100));
      rationale =
        eligibleBenefits.length === 0
          ? `기본 적립 ${card.cashbackRate}%`
          : matched
            ? `최소 결제금액 미충족 (${matched.minAmount.toLocaleString()}원 이상)`
            : `해당 카테고리 혜택 없음 · 기본 적립 ${card.cashbackRate}%`;
    }

    return { card, matchedBenefit: matched, saving, rationale, label: "보통" };
  });

  // 라벨링
  const sorted = [...options].sort((a, b) => b.saving - a.saving);
  if (sorted[0]) sorted[0].label = sorted[0].saving > 0 ? "추천" : "보통";
  if (sorted[sorted.length - 1] && sorted[sorted.length - 1].saving === 0) {
    sorted[sorted.length - 1].label = "비추천";
  }

  // 원래 카드 순서 유지
  return options;
}

// 가맹점 ROI 계산
export interface ROIInputs {
  budget: number;
  discountAmount: number;
  estReach: number; // 예상 노출 고객 수
  tagRate: number; // 태그 전환율 (0~1)
  payRate: number; // 결제 전환율 (0~1)
  avgTicket: number; // 예상 객단가
}

export function computeROI(input: ROIInputs) {
  const expectedTagged = Math.round(input.estReach * input.tagRate);
  const expectedPaid = Math.round(expectedTagged * input.payRate);
  const expectedRevenue = expectedPaid * input.avgTicket;
  const totalCost = input.budget;
  const roi = totalCost > 0 ? Math.round(((expectedRevenue - totalCost) / totalCost) * 100) : 0;

  return {
    expectedReach: input.estReach,
    expectedTagged,
    expectedPaid,
    expectedRevenue,
    roi,
  };
}
