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
    <div className="fixed z-99999 bg-amber-200 px-4 py-2 rounded-full text-xl font-black bottom-10 right-10 inline-block">
      <button  onClick={() => handleClick()}>{language === "en" ? "नेपाली" : "English"}</button>

    
    </div>
  );
}


