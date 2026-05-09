import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 페이북 핑크 정제 버전 (채도 낮춰 눈 편하게)
        bc: {
          50: "#FFF4F7",
          100: "#FFE5EC",
          200: "#FFC8D6",
          300: "#FF9BB3",
          400: "#F76A8B",
          500: "#E8456E",
          600: "#D62D5C", // primary - deep rose
          700: "#B11F49",
          800: "#8B1839",
          900: "#5E0F25",
        },
        ink: {
          900: "#0F1726",
          800: "#1A2233",
          700: "#293245",
          600: "#4A5468",
          500: "#6B7280",
          400: "#9AA3B2",
          300: "#C7CCD6",
          200: "#E2E5EC",
          100: "#F1F3F7",
          50: "#F7F9FC",
        },
        positive: "#0EA371",
        warning: "#F59E0B",
        danger: "#E5484D",
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,38,0.04), 0 4px 12px rgba(15,23,38,0.04)",
        cardHover: "0 4px 8px rgba(15,23,38,0.06), 0 12px 28px rgba(15,23,38,0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
