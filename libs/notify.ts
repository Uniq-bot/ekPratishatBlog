"use client";

export type ToastKind = "success" | "error" | "loading" | "info";

export type ToastPayload = {
  id?: string;
  kind: ToastKind;
  title: string;
  message?: string;
  duration?: number;
};

const TOAST_EVENT = "ek-toast";

const emit = (payload: ToastPayload) => {
  if (typeof window === "undefined") return payload.id ?? crypto.randomUUID();

  const id = payload.id ?? crypto.randomUUID();
  window.dispatchEvent(
    new CustomEvent(TOAST_EVENT, {
      detail: { ...payload, id },
    }),
  );
  return id;
};

export const notify = {
  loading: (title: string, message?: string, id?: string) =>
    emit({ kind: "loading", title, message, id, duration: 0 }),
  success: (title: string, message?: string, id?: string) =>
    emit({ kind: "success", title, message, id, duration: 3500 }),
  error: (title: string, message?: string, id?: string) =>
    emit({ kind: "error", title, message, id, duration: 5000 }),
  info: (title: string, message?: string, id?: string) =>
    emit({ kind: "info", title, message, id, duration: 3000 }),
  dismiss: (id: string) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("ek-toast-dismiss", { detail: { id } }));
  },
};

export const TOAST_CHANNEL = TOAST_EVENT;