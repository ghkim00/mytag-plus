# 마이태그 플러스 (MyTag Plus)

> **결제 전후 데이터를 기반으로 최적 혜택과 소비관리 액션을 추천하는 개인화 결제 플랫폼**
> BC카드 페이북·마이태그 고도화 제안형 MVP · 비씨카드 신입 사업기획/마케팅 직무 포트폴리오용

🌐 **Live Demo**: https://mytag-plus.vercel.app
📦 **Source**: https://github.com/ghkim00/mytag-plus

---

## 프로젝트 개요

**마이태그 플러스**는 비씨카드 페이북에 들어갈 수 있는 형태로 기획된 **서비스 고도화 제안형 MVP**입니다.

기존 마이태그가 결제 후 할인 적용 중심이었다면, 마이태그 플러스는
**결제 전 최적 혜택 추천 → 마이태그 → 결제 → 소비 리포트 → 다음 액션 추천**까지
한 흐름으로 연결한 결제·금융·플랫폼 서비스 기획안입니다.

| 대상 | 제공 가치 |
| --- | --- |
| **고객** | 결제 전 최적 카드/혜택 자동 추천, 결제 후 소비 리포트와 다음 액션 |
| **가맹점** | 페이북 내 캠페인 빌더로 타겟·예산·혜택 입력 → 예상 ROI 시뮬레이션 |
| **비씨카드** | MAU·태그율·전환율 KPI 모니터링, 광고/캠페인 매출 모델 확장 가능성 |

---

## 실행 방법

### 요구 환경
- Node.js 20+ (LTS 권장, 24도 OK)
- npm 또는 pnpm/yarn

### 설치 & 개발 서버
```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 프로덕션 빌드
```bash
npm run build
npm run start
```

### 포트폴리오용 화면 캡처
```bash
# 1) dev 서버 띄운 채로
npm run dev

# 2) 다른 터미널에서
npm run screenshot
```

Playwright + headless Chromium으로 6개 화면을 자동 캡처해 `screenshots/` 폴더에 저장합니다.

| 파일 | 화면 | 뷰포트 |
| --- | --- | --- |
| `home.png` | 고객 홈 | 390 × 844 (mobile) |
| `payment-coach.png` | 결제 코치 (카페·8,000원 기본값 + 추천 결과 노출) | 390 × 844 |
| `mytag-recommend.png` | 마이태그 추천 (결과 카드 노출) | 390 × 844 |
| `spending-report.png` | 소비 리포트 (차트 결과) | 390 × 844 |
| `merchant-campaign.png` | 가맹점 캠페인 (예산 500K · 할인 2K · 예상 ROI) | 1440 × 900 (desktop) |
| `operation-dashboard.png` | 운영 대시보드 (KPI + 퍼널 + ROI 차트) | 1440 × 900 |

- 모바일 4개는 fullPage 대신 첫 화면(viewport-only) 기준 → 핵심 지표·추천 카드가 상단에 보이도록 구성
- 데스크톱 2개는 KPI/차트가 한 화면에 들어오도록 레이아웃 정렬
- 캡처 전 자동으로: ① Recharts SVG 렌더 완료 대기 ② 스크롤 위치 0으로 리셋 ③ `data-screenshot="hide"` 마킹된 디버그 요소 숨김
- `deviceScaleFactor: 2`로 레티나급 해상도 (포트폴리오 PDF/노션 그대로 활용 가능)

다른 base URL로 캡처하려면 `SCREENSHOT_BASE=https://my-deploy.vercel.app npm run screenshot`.

---

## 화면 구성

진입점은 [http://localhost:3000](http://localhost:3000) 에서 모든 화면을 카드형 인덱스로 보여줍니다.

| URL | 화면 | 설명 | 레이아웃 |
| --- | --- | --- | --- |
| `/` | 랜딩 / 화면 인덱스 | 고객·비즈니스 화면을 한 번에 진입 | Web |
| `/home` | 고객 홈 | 이번 달 결제 흐름·예상 카드값·추천 혜택·소비 리스크 | Mobile |
| `/coach` | 결제 코치 | 카테고리·금액 입력 시 카드별 예상 혜택 비교 | Mobile |
| `/tags` | 마이태그 추천 | 소비패턴 기반 우선순위 혜택 추천(점수·이유 포함) | Mobile |
| `/report` | 소비 리포트 | 카테고리 비중·전월 비교 차트·AI 요약·다음 액션 | Mobile |
| `/merchant` | 가맹점 캠페인 | 타겟·예산·혜택 입력 시 예상 ROI 시뮬레이션 + AI 제안 | Web |
| `/dashboard` | 운영 대시보드 | KPI 카드, 결제 전환 퍼널, 카테고리 사용률, ROI 차트 | Web |
| `/about` | 기획 의도 | 프로젝트 의도·이해관계자 가치·결제 전후 여정·직무 연결 | Web |

---

## 주요 기능

### 1. 고객 홈 (`/home`)
- 이번 달 총 결제금액 / 다음 카드값 예상 / 지난달 대비 증감률
- 많이 쓴 카테고리 TOP 3 (전월 대비 변화율 포함)
- 소비 리스크 알림 (예: “카페·외식 28% 증가”)
- 오늘의 추천 마이태그 + 예상 절약액 + 태그 CTA

### 2. 결제 코치 (`/coach`)
- 6개 카테고리 + 금액 입력
- 보유 카드 3종에 대해 예상 할인/적립 즉시 비교
- 가장 유리한 카드 자동 ‘추천’ 라벨링
- 미태그 혜택일 경우 태그 유도 문구 표시
- 토스트 기반 결제 시뮬레이션 (실 결제 X)

### 3. 마이태그 추천 (`/tags`)
- 추천 점수 = `0.35·소비비중 + 0.25·빈도 + 0.20·매력도 + 0.15·사용가능성 + 0.05·미태그 보정`
- 우선순위 순으로 카드 리스트
- 추천 이유, 예상 절약액, 추천도 게이지 노출
- 태그 토글 (toast 확인)

### 4. 소비 리포트 (`/report`)
- 카테고리별 소비 비중 (Pie)
- 전월 대비 카테고리 비교 (Bar)
- 누적 절약 / 놓친 혜택 금액
- AI 스타일 소비 요약 + 다음 추천 액션 3가지

### 5. 가맹점 캠페인 (`/merchant`)
- 캠페인 목표 / 업종 / 지역 / 타겟 세그먼트 (멀티셀렉트)
- 할인금액·최소결제·예산·예상객단가 입력
- 예상 노출/태그/결제/매출/ROI 자동 계산 (`computeROI`)
- 업종·목표 조합에 따라 AI 제안 카피 노출
- 최근 캠페인 리스트 미리보기

### 6. 운영 대시보드 (`/dashboard`)
- 9개 KPI 카드 (MAU, 클릭률, 태그율, 전환율, 절약 금액 등)
- 결제 전환 퍼널 (추천 노출 → 클릭 → 태그 → 결제, 단계 전환율 포함)
- 카테고리별 혜택 사용률 / 캠페인 ROI Bar 차트
- AI 운영 인사이트 + 다음 개선 액션 카드

### 7. 기획 의도 (`/about`)
- 이해관계자(고객·가맹점·카드사) 별 제공 가치
- 결제 전후 여정 타임라인
- 직무 연결 문구 + 구현 노트

---

## 기술 스택

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** (BC 페이북 톤앤매너 기반 블루 팔레트)
- **Recharts** (차트)
- **더미 JSON 데이터** (`lib/data/*.ts`)
- **Pretendard** 웹폰트

---

## 폴더 구조

```
project_b_BC/
├── app/
│   ├── layout.tsx          # 글로벌 레이아웃
│   ├── globals.css
│   ├── page.tsx            # 랜딩 / 화면 인덱스
│   ├── home/page.tsx       # 1. 고객 홈
│   ├── coach/page.tsx      # 2. 결제 코치
│   ├── tags/page.tsx       # 3. 마이태그 추천
│   ├── report/page.tsx     # 4. 소비 리포트
│   ├── merchant/page.tsx   # 5. 가맹점 캠페인
│   ├── dashboard/page.tsx  # 6. 운영 대시보드
│   └── about/page.tsx      # 7. 기획 의도
├── components/
│   ├── layout/
│   │   ├── MobileShell.tsx, BottomNav.tsx, TopBar.tsx
│   │   └── DesktopShell.tsx, Sidebar.tsx
│   └── ui/
│       ├── Card.tsx, Button.tsx, Badge.tsx, StatCard.tsx, Toast.tsx
├── lib/
│   ├── data/
│   │   ├── users.ts, transactions.ts, cards.ts
│   │   ├── benefits.ts, mytags.ts, campaigns.ts, kpis.ts
│   ├── recommend.ts        # 추천 / ROI 계산 로직
│   └── utils.ts
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── README.md
```

---

## 디자인 가이드

- **컬러**: 페이북 핑크 정제 버전 (#D62D5C, 딥 로즈) 중심 + 화이트/연 블루그레이 배경
- **CTA**: `bg-bc-600` 블루 버튼 일관 사용
- **타이포**: Pretendard, 숫자는 `tabular-nums` (`.num`) 처리
- **레이아웃**:
  - 고객 화면 → `MobileShell` (모바일 앱 셸 + 하단 4탭)
  - 비즈니스 화면 → `DesktopShell` (좌측 사이드바)
- 카드형 UI 중심, 여백 충분히 → 포트폴리오 캡처 친화적

---

## 포트폴리오 설명 (직무 연결)

> 결제 전후 여정을 기준으로 **최적 결제수단 추천, 마이태그 혜택, 소비 리포트, 가맹점 캠페인,
> 운영 KPI**를 연결해 **결제·금융·플랫폼 서비스 기획 역량**을 보여주고자 했습니다.

이 프로젝트는 비씨카드의 기존 자산(페이북·마이태그)을 이해한 위에서,

1. 고객에게는 ‘쉬운 혜택 활용 + 소비관리 경험’을 제공하고
2. 가맹점에게는 ‘데이터 기반 타겟 마케팅 기회’를 제공하며
3. 카드사에는 ‘페이북 결제 활성화 + 플랫폼 체류시간 + 캠페인 매출’을 만들어주는

**삼면 플랫폼(고객-가맹점-카드사) 기획안**으로 구성되어 있습니다.

> 실제 결제 연동은 없으며, 모든 데이터는 `lib/data/` 의 더미 JSON에 의해 작동합니다.
> 추천 점수와 ROI 계산도 머신러닝 없이 단순 가중합 공식으로 구현해 기획 흐름을 검증하는 데 초점을 맞추었습니다.
