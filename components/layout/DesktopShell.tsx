import { Sidebar } from "./Sidebar";
import { ToastHost } from "@/components/ui/Toast";

export function DesktopShell({
  title,
  subtitle,
  rightSlot,
  children,
}: {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-ink-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-ink-100 px-6 lg:px-10 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-ink-900 tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-ink-500 mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">{rightSlot}</div>
        </header>
        <main className="flex-1 p-6 lg:p-10">{children}</main>
        <ToastHost />
      </div>
    </div>
  );
}
