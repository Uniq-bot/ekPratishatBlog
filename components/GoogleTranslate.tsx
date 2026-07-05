"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}
 export function changeLanguage(lang: string) {
    document.cookie = `googtrans=/en/${lang};path=/`;
    window.location.reload();
  }
export default function GoogleTranslate() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) {
        console.error("Google Translate not ready");
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "ne",
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element",
      );
    };
  }, []);
 

  return (
    <>
      <div id="google_translate_element" />

      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      
    </>
  );
}
