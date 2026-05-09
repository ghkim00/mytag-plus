import Link from "next/link";

const customerScreens = [
  { href: "/home", title: "고객 홈", desc: "이번 달 결제 흐름·예상 카드값·추천 혜택", tag: "Mobile" },
  { href: "/coach", title: "결제 코치", desc: "결제 전 카테고리·금액 입력 시 최적 카드 추천", tag: "Mobile" },
  { href: "/tags", title: "마이태그 추천", desc: "소비패턴 기반 우선순위 혜택 추천", tag: "Mobile" },
  { href: "/report", title: "소비 리포트", desc: "결제 후 소비 흐름·놓친 혜택·다음 액션", tag: "Mobile" },
];

const businessScreens = [
  { href: "/merchant", title: "가맹점 캠페인", desc: "타겟·예산·혜택 입력 시 예상 ROI 시뮬레이션", tag: "Web" },
  { href: "/dashboard", title: "운영 대시보드", desc: "MAU·태그율·전환율 등 KPI 모니터링", tag: "Web" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-ink-50">
      {/* Hero */}
      <section className="px-6 lg:px-10 pt-12 pb-10 lg:pt-20 lg:pb-16 bg-gradient-to-br from-bc-700 via-bc-600 to-bc-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-white/15 grid place-items-center font-extrabold text-sm">
              BC
            </div>
            <div className="text-sm font-medium text-white/80">BC카드 · 페이북 고도화 MVP</div>
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            마이태그 플러스
          </h1>
          <p className="mt-3 lg:mt-4 text-base lg:text-lg text-white/85 max-w-2xl">
            결제 전후 데이터를 기반으로 최적 혜택과 소비관리 액션을 추천하는
            <br className="hidden sm:block" /> 개인화 결제 플랫폼
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/home"
              className="inline-flex items-center justify-center bg-white text-bc-700 font-semibold rounded-xl h-12 px-5 hover:bg-ink-100"
            >
              고객 모바일 시작
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center bg-white/10 text-white font-semibold rounded-xl h-12 px-5 border border-white/20 hover:bg-white/15"
            >
              운영 대시보드 보기
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center text-white/85 font-semibold rounded-xl h-12 px-3 hover:text-white"
            >
              기획 의도 →
            </Link>
          </div>
        </div>
      </section>

      {/* Screens */}
      <section className="px-6 lg:px-10 py-12 max-w-6xl mx-auto">
        <ScreenGroup title="고객 경험 (모바일)" screens={customerScreens} />
        <ScreenGroup title="비즈니스 (웹)" screens={businessScreens} className="mt-10" />
      </section>

      <section className="px-6 lg:px-10 pb-16 max-w-6xl mx-auto">
        <div className="bg-white border border-ink-100 rounded-2xl p-6 lg:p-8 shadow-card">
          <div className="text-xs font-semibold text-bc-600 mb-2">PROJECT NOTE</div>
          <h2 className="text-xl font-bold text-ink-900">
            기존 페이북 / 마이태그를 결제 전후 여정으로 확장한 고도화 제안형 MVP
          </h2>
          <p className="text-sm text-ink-600 mt-2 leading-relaxed">
            BC카드 페이북 안에 들어갈 수 있는 형태로 기획했습니다. 기존 마이태그가 결제 후 할인 적용 중심이었다면,
            마이태그 플러스는 <b>결제 전 최적 혜택 추천 → 마이태그 → 결제 → 소비 리포트 → 다음 액션 추천</b>까지 한 흐름으로 연결합니다.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["결제 전 추천", "마이태그 개인화", "소비 리포트", "가맹점 캠페인", "운영 KPI"].map((t) => (
              <span key={t} className="chip bg-bc-50 text-bc-700">{t}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ScreenGroup({
  title,
  screens,
  className,
}: {
  title: string;
  screens: { href: string; title: string; desc: string; tag: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-lg font-bold text-ink-900">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {screens.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group bg-white rounded-2xl border border-ink-100 hover:border-bc-200 hover:shadow-cardHover transition-all p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="chip bg-ink-100 text-ink-600">{s.tag}</span>
            </div>
            <div className="text-base font-semibold text-ink-900 group-hover:text-bc-700">
              {s.title}
            </div>
            <div className="text-sm text-ink-500 mt-1">{s.desc}</div>
            <div className="mt-3 text-sm text-bc-600 font-medium">화면 보기 →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
