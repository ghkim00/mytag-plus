"use client";
import { useEffect, useState } from "react";

let listener: ((msg: string) => void) | null = null;

export function showToast(msg: string) {
  listener?.(msg);
}

export function ToastHost() {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    listener = (m: string) => {
      setMsg(m);
      setTimeout(() => setMsg(null), 2400);
    };
    return () => {
      listener = null;
    };
  }, []);

  if (!msg) return null;
  return (
    <div className="fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 pointer-events-none">
      <div className="bg-ink-900/95 text-white text-sm rounded-2xl px-4 py-3 shadow-cardHover max-w-[440px] w-full text-center">
        {msg}
      </div>
    </div>
  );
}
