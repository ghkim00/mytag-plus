import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import { ToastHost } from "@/components/ui/Toast";

export function MobileShell({
  title,
  subtitle,
  back,
  children,
  hideBottom,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  hideBottom?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex justify-center bg-ink-100/80 py-0 sm:py-8">
      <div className="relative w-full sm:max-w-[440px] flex flex-col bg-ink-50 sm:rounded-[36px] sm:shadow-cardHover overflow-hidden sm:my-0">
        <TopBar title={title} subtitle={subtitle} back={back} />
        <main className="flex-1 px-5 py-5 space-y-4">{children}</main>
        {!hideBottom && <BottomNav />}
        <ToastHost />
      </div>
    </div>
  );
}
