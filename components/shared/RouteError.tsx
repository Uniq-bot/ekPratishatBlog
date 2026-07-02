"use client";

import { AlertTriangle } from "lucide-react";

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#fbf7ef] px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-red-200 bg-white p-8 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-red-100 p-3 text-red-700">
            <AlertTriangle size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-black">Something went wrong</h2>
            <p className="mt-2 text-sm leading-6 text-black/70">
              The page could not be loaded. Please try again. If the issue persists, refresh the page or return to the dashboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={reset}
                className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-black/85"
              >
                Try again
              </button>
            </div>
            <p className="mt-4 text-xs text-black/45">Reference: {error.digest ?? "unavailable"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}