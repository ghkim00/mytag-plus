// 포트폴리오용 화면 캡처 스크립트
// Playwright + headless Chromium으로 로컬 dev 서버 화면을 캡처합니다.
//
// 실행 전제: `npm run dev`로 http://localhost:3000 가 떠있어야 합니다.
// 실행: `npm run screenshot`

import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const BASE = process.env.SCREENSHOT_BASE ?? "http://localhost:3000";
const OUT = path.resolve("screenshots");

// 뷰포트
const MOBILE = { width: 390, height: 844 };
const DESKTOP = { width: 1440, height: 900 };

// 캡처 타겟
const targets = [
  // 고객용 모바일 화면 (4) - 첫 화면 중심 캡처 (fullPage: false)
  { file: "home.png",            url: "/home",      viewport: MOBILE,  desc: "고객 홈" },
  { file: "payment-coach.png",   url: "/coach",     viewport: MOBILE,  desc: "결제 코치 (카페·8,000원 기본값 + 추천 결과)" },
  { file: "mytag-recommend.png", url: "/tags",      viewport: MOBILE,  desc: "마이태그 추천 (결과 노출)" },
  { file: "spending-report.png", url: "/report",    viewport: MOBILE,  desc: "소비 리포트 (차트 결과)" },
  // 비즈니스 데스크톱 화면 (2) - KPI/차트 한 화면에 들어오게 캡처
  { file: "merchant-campaign.png",   url: "/merchant",  viewport: DESKTOP, desc: "가맹점 캠페인 (예산 500K · 할인 2K · ROI)" },
  { file: "operation-dashboard.png", url: "/dashboard", viewport: DESKTOP, desc: "운영 대시보드 (KPI + 퍼널 + ROI 차트)" },
];

// Recharts SVG가 실제로 그려질 때까지 대기 (헤드리스에서 비어 보이는 문제 방지)
async function waitForCharts(page) {
  try {
    await page.waitForFunction(
      () => {
        const surfaces = document.querySelectorAll(".recharts-surface");
        if (surfaces.length === 0) return true;
        return Array.from(surfaces).every(
          (el) => el.querySelectorAll("path, rect, circle").length > 0,
        );
      },
      { timeout: 10000 },
    );
  } catch {
    // 차트 없으면 그냥 진행
  }
}

async function run() {
  // 결과 폴더 초기화 (이전 캡처 정리)
  if (existsSync(OUT)) await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  console.log(`📸 capturing → ${OUT}\n`);

  for (const t of targets) {
    const context = await browser.newContext({
      viewport: t.viewport,
      deviceScaleFactor: 2,
      colorScheme: "light",
    });
    const page = await context.newPage();
    const url = BASE + t.url;
    process.stdout.write(`  ${t.file.padEnd(28)} ${t.viewport.width}×${t.viewport.height}  ${t.desc} ... `);

    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

    // 캡처 전 정리: data-screenshot="hide" 마킹된 요소 숨김
    await page.addStyleTag({
      content: `[data-screenshot="hide"]{display:none!important}`,
    });

    await waitForCharts(page);
    // 폰트 합성 + 차트 애니메이션 안정화
    await page.waitForTimeout(900);

    // 첫 화면 중심: 스크롤 위치 0으로 보장
    await page.evaluate(() => window.scrollTo(0, 0));

    await page.screenshot({
      path: path.join(OUT, t.file),
      fullPage: false, // 첫 viewport만 (포트폴리오용)
    });
    console.log("✓");
    await context.close();
  }

  await browser.close();
  console.log(`\n✓ ${targets.length}개 캡처 완료 → ${OUT}`);
}

run().catch((e) => {
  console.error("\n✗ 캡처 실패:", e.message);
  console.error("  dev 서버가 켜져 있는지 확인해주세요: npm run dev");
  process.exit(1);
});
