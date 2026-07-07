"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "warning" | "info";
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmText = "Continue",
  cancelText = "Cancel",
  variant = "warning",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-[#1f1f1f]/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[24px] border border-[#d4c36b] bg-[#f8f3dc] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c7b24d] ${
              variant === "warning" ? "bg-[#1f1f1f] text-[#f7e9a8]" : "bg-[#2d2d2d] text-[#f7e9a8]"
            }`}
          >
            <AlertTriangle size={18} />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-[#1f1f1f]">{title}</h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#4b4b4b]">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[#c7b24d] bg-white px-3 py-2 text-sm font-medium text-[#1f1f1f] transition hover:bg-[#f3edcb]"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-lg px-3 py-2 text-sm font-semibold text-white transition ${
              variant === "warning"
                ? "bg-[#1f1f1f] hover:bg-[#2d2d2d]"
                : "bg-[#2f6f4f] hover:bg-[#285b3f]"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
