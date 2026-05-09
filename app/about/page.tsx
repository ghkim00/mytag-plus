import Link from "next/link";
import { DesktopShell } from "@/components/layout/DesktopShell";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const stakeholders = [
  {
    title: "고객",
    desc: "복잡한 혜택을 일일이 비교하지 않아도, 결제 전후로 ‘지금 가장 유리한 행동’을 알려주는 경험",
    points: ["결제 전 최적 카드/혜택 추천", "마이태그 자동 우선순위", "소비 리포트와 다음 액션"],
  },
  {
    title: "가맹점",
    desc: "직접 매체 집행 없이도 페이북 안에서 타겟·예산·혜택만 정하면 예상 성과를 시뮬레이션",
    points: [
      "타겟·지역·시간대 기반 캠페인",
      "예상 노출/태그/결제/매출/ROI 자동 계산",
      "AI 캠페인 제안 카피",
    ],
  },
  {
    title: "비씨카드",
    desc: "페이북 결제 활성화와 플랫폼 체류시간 증가, 가맹점 캠페인 매출 등 새로운 수익 자산 확보",
    points: ["MAU·태그율·전환율 KPI 모니터링", "운영 인사이트·다음 액션 제안", "광고/캠페인 매출 모델 확장"],
  },
];

const journey = [
  { step: "결제 전", label: "결제 코치 + 마이태그 추천", desc: "어떤 카드와 혜택이 유리한지 미리 안내" },
  { step: "결제 시점", label: "마이태그 자동 적용", desc: "사전 태그한 혜택이 결제 즉시 적용" },
  { step: "결제 후", label: "소비 리포트 + 다음 액션", desc: "이번 달 흐름·놓친 혜택·다음 추천 액션" },
  { step: "비즈니스", label: "캠페인 + 운영 KPI", desc: "가맹점 캠페인과 운영 대시보드로 성과 회귀" },
];

// 직무 역량 ↔ 화면/구현 매핑
const jobMapping = [
  {
    capability: "결제 서비스 기획",
    artifact: "결제 코치",
    detail: "카테고리·금액 입력 시 보유 카드별 예상 혜택을 즉시 비교, 최적 결제수단을 추천하는 UX 설계",
  },
  {
    capability: "금융·소비관리 서비스 기획",
    artifact: "소비 리포트",
    detail: "결제 후 카테고리 비중·전월비·놓친 혜택·다음 액션을 한 흐름으로 연결",
  },
  {
    capability: "혜택 개인화 / 추천 로직",
    artifact: "마이태그 추천",
    detail: "5개 변수 가중합 기반 추천 점수 공식 직접 설계 (소비비중·빈도·매력도·사용가능성·미태그 보정)",
  },
  {
    capability: "가맹점 마케팅 / B2B 기획",
    artifact: "가맹점 캠페인 빌더",
    detail: "타겟·예산·혜택 입력 시 노출/태그/결제/매출/ROI 시뮬레이션 + AI 제안 카피",
  },
  {
    capability: "운영 KPI 설계",
    artifact: "운영 대시보드",
    detail: "MAU·태그율·전환율·ROI 등 9개 KPI + 결제 전환 퍼널 + 운영 인사이트",
  },
  {
    capability: "플랫폼 양면시장 설계",
    artifact: "전체 흐름",
    detail: "고객-가맹점-카드사 3주체를 하나의 마이태그 플러스 흐름으로 연결",
  },
];

export default function AboutPage() {
  return (
    <DesktopShell title="기획 의도" subtitle="이 프로젝트가 BC카드 직무와 어떻게 연결되는가">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Author profile */}
        <Card className="xl:col-span-3">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bc-700 to-bc-500 grid place-items-center text-white font-extrabold text-2xl shrink-0">
              김
            </div>
            <div className="flex-1">
              <Badge tone="blue">PORTFOLIO BY</Badge>
              <h3 className="text-2xl font-bold text-ink-900 mt-2">김기현</h3>
              <p className="text-sm text-ink-600 mt-1">
                BC카드 Biz(일반) · 사업기획 / 마케팅 직무 지원자
              </p>
            </div>
            <div className="md:text-right">
              <div className="text-[11px] text-ink-500">지원 직무 키워드</div>
              <div className="mt-1 flex flex-wrap md:justify-end gap-1.5">
                {["결제", "금융", "플랫폼", "사업기획", "마케팅"].map((t) => (
                  <span key={t} className="chip bg-bc-50 text-bc-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProfileTile
              label="이 프로젝트를 만든 이유"
              body="BC카드의 핵심 자산인 페이북·마이태그를 직접 분석하고, 결제 전후 여정으로 확장한 고도화 제안을 설계·구현해 사업기획·마케팅 직무에 필요한 역량을 보여드리고자 했습니다."
            />
            <ProfileTile
              label="강조하고 싶은 점"
              body="단일 화면 기획이 아닌 고객-가맹점-카드사를 연결하는 플랫폼 기획. 추천 점수 공식·ROI 시뮬레이션 등 정량 로직까지 직접 설계해 ‘기획의 실행 가능성’을 보여드리고자 했습니다."
            />
            <ProfileTile
              label="구현 범위"
              body="기획 → 디자인 → 구현 → 캡처까지 본인이 직접 수행. Next.js + TypeScript + Tailwind + Recharts 기반 7개 화면, 더미 데이터·추천 로직 포함."
            />
          </div>
        </Card>

        {/* Project intent */}
        <Card className="xl:col-span-3 !bg-bc-700 text-white border-0">
          <Badge tone="blue" className="bg-white/20 text-white">
            PROJECT INTENT
          </Badge>
          <h2 className="text-2xl xl:text-3xl font-extrabold mt-4 leading-tight">
            기존 페이북·마이태그를 결제 전후 여정으로 확장한 고도화 MVP
          </h2>
          <p className="text-[15px] text-white/85 leading-relaxed mt-3 max-w-3xl">
            마이태그 플러스는 비씨카드의 페이북·마이태그를 기반으로 한 <b>서비스 고도화 제안형 MVP</b>입니다.
            기존 마이태그가 결제 후 할인 적용에 집중되어 있다면, 마이태그 플러스는
            <b> 결제 전 최적 혜택 추천 → 마이태그 → 결제 → 소비 리포트 → 다음 액션</b>까지 한 흐름으로 연결합니다.
          </p>
        </Card>

        {/* Stakeholders */}
        <Card className="xl:col-span-3">
          <CardTitle hint="고객 · 가맹점 · 카드사를 연결하는 플랫폼 가치">
            누구에게 어떤 가치를 주는가
          </CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stakeholders.map((s) => (
              <div key={s.title} className="rounded-xl border border-ink-100 p-5">
                <div className="text-sm font-semibold text-bc-700">{s.title}</div>
                <p className="text-[13px] text-ink-700 mt-2 leading-relaxed">{s.desc}</p>
                <ul className="mt-3 space-y-1.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2 text-[13px] text-ink-600">
                      <span className="text-bc-500">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        {/* Journey */}
        <Card className="xl:col-span-2">
          <CardTitle hint="결제 전후 여정 전체를 하나의 흐름으로 설계">
            결제 전후 여정 (User Journey)
          </CardTitle>
          <ol className="relative border-l-2 border-bc-100 ml-3 space-y-5">
            {journey.map((j) => (
              <li key={j.step} className="pl-5">
                <div className="absolute -left-[7px] mt-1 w-3 h-3 rounded-full bg-bc-600 ring-4 ring-bc-50" />
                <div className="text-[11px] font-semibold text-bc-600 uppercase tracking-wider">
                  {j.step}
                </div>
                <div className="text-base font-semibold text-ink-900 mt-0.5">{j.label}</div>
                <div className="text-[13px] text-ink-600 mt-0.5">{j.desc}</div>
              </li>
            ))}
          </ol>
        </Card>

        {/* 한 줄 직무 요약 */}
        <Card>
          <CardTitle hint="결제·금융·플랫폼 서비스 기획 역량">한 줄 요약</CardTitle>
          <p className="text-[14px] text-ink-700 leading-relaxed">
            결제 전후 여정을 기준으로 <b>최적 결제수단 추천, 마이태그 혜택, 소비 리포트, 가맹점 캠페인,
            운영 KPI</b>를 연결해 <b>결제·금융·플랫폼 서비스 기획 역량</b>을 보여드리고자 했습니다.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "결제 서비스 기획",
              "금융/소비관리 UX",
              "혜택 개인화",
              "가맹점 마케팅",
              "운영 KPI 설계",
              "플랫폼 양면시장",
            ].map((t) => (
              <Badge key={t} tone="blue">
                {t}
              </Badge>
            ))}
          </div>
        </Card>

        {/* 직무 역량 ↔ 화면 매핑 */}
        <Card className="xl:col-span-3">
          <CardTitle hint="지원 직무에서 요구하는 역량을 어떤 화면·기능으로 증명했는가">
            직무 역량 ↔ 구현 매핑
          </CardTitle>
          <div className="overflow-x-auto -mx-2">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                  <th className="px-3 py-2 w-1/4">필요 역량</th>
                  <th className="px-3 py-2 w-1/5">구현 화면</th>
                  <th className="px-3 py-2">증명 포인트</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {jobMapping.map((row) => (
                  <tr key={row.capability} className="text-[13px]">
                    <td className="px-3 py-3 align-top">
                      <span className="font-semibold text-ink-900">{row.capability}</span>
                    </td>
                    <td className="px-3 py-3 align-top">
                      <Badge tone="blue">{row.artifact}</Badge>
                    </td>
                    <td className="px-3 py-3 align-top text-ink-700 leading-relaxed">
                      {row.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Implementation notes + CTA */}
        <Card className="xl:col-span-3">
          <CardTitle>구현 노트</CardTitle>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2.5 gap-x-6">
            {[
              "Next.js + TypeScript + Tailwind + Recharts 기반",
              "더미 JSON 데이터로 작동 (실제 결제 연동 없음)",
              "혜택 추천 점수: 소비비중·빈도·매력도·사용가능성·미태그 보정 가중합",
              "결제 코치: 카테고리·금액 입력 시 카드별 예상 혜택 즉시 비교",
              "가맹점 ROI: 예산·할인·세그먼트로 노출/태그/결제/매출/ROI 시뮬레이션",
              "운영 대시보드: MAU·전환율·태그율·캠페인 ROI 등 KPI 추적",
            ].map((t) => (
              <li key={t} className="flex gap-2 text-[13px] text-ink-700">
                <span className="text-bc-500">✓</span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/home"
              className="inline-flex items-center justify-center bg-bc-600 hover:bg-bc-700 text-white font-semibold rounded-xl h-11 px-4"
            >
              고객 화면 둘러보기
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center bg-bc-50 hover:bg-bc-100 text-bc-700 font-semibold rounded-xl h-11 px-4"
            >
              운영 대시보드 보기
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center text-ink-700 font-semibold rounded-xl h-11 px-4 hover:bg-ink-100"
            >
              화면 인덱스 →
            </Link>
          </div>
        </Card>
      </div>
    </DesktopShell>
  );
}

function ProfileTile({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-xl bg-ink-100/50 border border-ink-100 p-4">
      <div className="text-[11px] font-semibold text-bc-700 uppercase tracking-wider">{label}</div>
      <p className="text-[13px] text-ink-700 leading-relaxed mt-1.5">{body}</p>
    </div>
  );
}
