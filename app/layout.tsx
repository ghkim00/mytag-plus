import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "마이태그 플러스 · BC카드 페이북 고도화 MVP",
  description:
    "결제 전후 데이터를 기반으로 최적 혜택과 소비관리 액션을 추천하는 개인화 결제 플랫폼",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-ink-50">{children}</body>
    </html>
  );
}
