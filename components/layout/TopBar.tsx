import Link from "next/link";

export function TopBar({
  title,
  subtitle,
  back,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/85 glass border-b border-ink-100/80">
      <div className="px-5 py-3 flex items-center gap-3">
        {back ? (
          <Link href="/home" className="text-ink-700 -ml-1 p-1 rounded-lg hover:bg-ink-100">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ) : (
          <BcLogo />
        )}
        <div className="flex-1">
          <div className="text-[15px] font-semibold text-ink-900 leading-tight">{title}</div>
          {subtitle && <div className="text-[11px] text-ink-500 leading-tight mt-0.5">{subtitle}</div>}
        </div>
        <button aria-label="알림" className="text-ink-700 p-1 rounded-lg hover:bg-ink-100">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M6 8a6 6 0 1112 0v3l1.5 3H4.5L6 11V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M10 18a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}

function BcLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bc-700 to-bc-500 grid place-items-center text-white font-extrabold text-xs tracking-tight">
        BC
      </div>
    </div>
  );
}
