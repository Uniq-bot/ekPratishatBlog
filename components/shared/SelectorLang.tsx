"use client";

import React, { useEffect, useState } from "react";
import { changeLanguage } from "../GoogleTranslate";

export default function LanguageSelector() {
 const [language, setLanguage] = useState<"en" | "ne">(() => {
  if (typeof window === "undefined") return "en";

  return localStorage.getItem("language") === "ne" ? "ne" : "en";
});

  const handleClick = () => {
    const nextLanguage = language === "en" ? "ne" : "en";

    setLanguage(nextLanguage);
    localStorage.setItem("language", nextLanguage);

    changeLanguage(nextLanguage);
  };
  return (
    <div className="fixed bottom-10 right-10 inline-block">
      <button onClick={() => handleClick()}>{language === "en" ? "नेपाली" : "English"}</button>

      {/* Custom Arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}


