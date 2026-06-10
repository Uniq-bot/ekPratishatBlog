"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ slug }: { slug: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="flex items-center justify-start gap-1 sm:gap-2 group text-xs sm:text-sm pl-1 sm:pl-2 transition-all"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:-translate-x-1 transition-all shrink-0 sm:w-6 sm:h-6"
      >
        <path d="M6 8L2 12L6 16" />
        <path d="M2 12H22" />
      </svg>
      <div className="group-hover:underline flex items-center leading-none gap-0.5 sm:gap-1 min-w-0">
        <p className="text-gray-200 hidden sm:block">Blogs</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 shrink-0 hidden sm:block sm:w-5 sm:h-5"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        <p className="truncate text-[#EBC044]">{slug}</p>
      </div>
    </button>
  );
}