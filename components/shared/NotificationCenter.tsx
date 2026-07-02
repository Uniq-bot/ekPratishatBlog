"use client";

import { TOAST_CHANNEL, ToastPayload, notify } from "@/libs/notify";
import { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Info, Loader2, X } from "lucide-react";
import type { ReactNode } from "react";

type ToastItem = ToastPayload & {
  id: string;
};

const iconMap: Record<ToastPayload["kind"], ReactNode> = {
  success: <CheckCircle2 size={18} />,
  error: <AlertCircle size={18} />,
  loading: <Loader2 size={18} className="animate-spin" />,
  info: <Info size={18} />,
};

const toneMap: Record<ToastPayload["kind"], string> = {
  success: "border-emerald-500 bg-emerald-50 text-emerald-950",
  error: "border-red-500 bg-red-50 text-red-950",
  loading: "border-slate-400 bg-slate-900 text-white",
  info: "border-amber-500 bg-amber-50 text-amber-950",
};

export default function NotificationCenter() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleToast = (event: Event) => {
      const detail = (event as CustomEvent<ToastPayload>).detail;
      if (!detail?.title) return;

      setItems((current) => {
        const id = detail.id ?? crypto.randomUUID();
        const next = { ...detail, id };
        const without = current.filter((item) => item.id !== id);
        return [next, ...without].slice(0, 4);
      });
    };

    const handleDismiss = (event: Event) => {
      const { id } = (event as CustomEvent<{ id: string }>).detail;
      setItems((current) => current.filter((item) => item.id !== id));
    };

    window.addEventListener(TOAST_CHANNEL, handleToast);
    window.addEventListener("ek-toast-dismiss", handleDismiss);
    return () => {
      window.removeEventListener(TOAST_CHANNEL, handleToast);
      window.removeEventListener("ek-toast-dismiss", handleDismiss);
    };
  }, []);

  useEffect(() => {
    const timers = items
      .filter((item) => item.duration && item.duration > 0)
      .map((item) =>
        window.setTimeout(() => {
          setItems((current) => current.filter((toast) => toast.id !== item.id));
        }, item.duration),
      );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [items]);

  const visibleItems = useMemo(() => items, [items]);

  return (
    <div
      className="fixed right-4 top-4 flex w-[min(100vw-2rem,24rem)] flex-col gap-3"
      style={{ zIndex: 9999 }}
    >
      {visibleItems.map((item) => (
        <div
          key={item.id}
          className={`rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur ${toneMap[item.kind]}`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0">{iconMap[item.kind]}</div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{item.title}</p>
              {item.message ? (
                <p className="mt-1 text-xs leading-5 opacity-90">{item.message}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => notify.dismiss(item.id)}
              className="rounded-full p-1 opacity-70 transition hover:opacity-100"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}