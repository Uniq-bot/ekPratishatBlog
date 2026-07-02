import React from "react";

const bars = [
  "w-4/5",
  "w-2/3",
  "w-11/12",
  "w-3/4",
  "w-1/2",
];

export default function PageLoader({
  title = "Loading",
  subtitle = "Preparing the next view...",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-screen items-center justify-center bg-[#fbf7ef] px-4 py-8 sm:px-6 lg:px-10">
      <div className="flex h-full w-full max-w-7xl flex-col gap-8 border border-black/10 bg-white/80 p-5 shadow-xl backdrop-blur-sm sm:p-8 lg:min-h-[85vh]">
        <div className="space-y-3">
          <div className="h-4 w-24 animate-pulse bg-black/10" />
          <div className="h-10 w-1/2 animate-pulse bg-black/10" />
          <p className="text-sm text-black/60">
            {title} · {subtitle}
          </p>
        </div>

        <div className="grid flex-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="h-[42vh] min-h-64 animate-pulse bg-linear-to-br from-black/10 to-black/5" />
            <div className="grid gap-3 sm:grid-cols-2">
              {bars.map((bar) => (
                <div key={bar} className={`h-28 animate-pulse bg-black/8 ${bar}`} />
              ))}
            </div>
          </div>

          <div className="space-y-4 border border-black/10 bg-[#faf6ee] p-4">
            <div className="h-5 w-1/2 animate-pulse bg-black/10" />
            <div className="space-y-3">
              <div className="h-3 w-full animate-pulse bg-black/10" />
              <div className="h-3 w-5/6 animate-pulse bg-black/10" />
              <div className="h-3 w-2/3 animate-pulse bg-black/10" />
            </div>
            <div className="h-10 w-full animate-pulse bg-black/10" />
            <div className="h-10 w-32 animate-pulse bg-black/10" />
          </div>
        </div>
      </div>
    </div>
  );
}