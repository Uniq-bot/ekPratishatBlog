"use client";

import { useLanguage } from "@/context/ClientLanguageContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { Languages } from "lucide-react";
import { Languages, Menu, X } from "lucide-react";
const NavBar = () => {
  const pathname = usePathname();
  const { handleLanguageChange, currentLanguage, idx } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    {
      name: "Home",
      nameNp: "गृहपृष्ठ",
      href: "https://ekpratishat.com/",
    },
    {
      name: "Blogs",
      nameNp: "ब्लगहरू",
      href: "/",
    },
    {
      name: "About",
      nameNp: "हाम्रोबारे",
      href: "https://ekpratishat.com/about",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
const [menuOpen, setMenuOpen] = useState(false);
  return (
  <div
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    isScrolled || menuOpen
      ? "bg-black/70 backdrop-blur-md shadow-lg"
      : "bg-transparent"
  }`}
>
  <div className="flex items-center justify-between px-4 lg:px-10 py-4">
    {/* Logo */}
    <Link href="/">
      <Image
        src="/logo.png"
        alt="Logo"
        width={45}
        height={45}
        className="w-10 h-10 lg:w-12 lg:h-12"
      />
    </Link>

    {/* Desktop Nav */}
    <div
      className={`hidden lg:flex items-center gap-5 rounded-full px-6 py-2 ${
        !isScrolled &&
        "lg:bg-black/70 backdrop-blur-md border border-white/10"
      }`}
    >
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`transition ${
            currentLanguage === "en" ? "text-lg" : "text-xl"
          } ${
            pathname === item.href
              ? "border-b-2 border-[#C9981A] text-white"
              : "text-white"
          }`}
        >
          {currentLanguage === "en" ? item.name : item.nameNp}
        </Link>
      ))}
    </div>

    {/* Right Side */}
    <div className="flex items-center gap-2">
      {/* Language */}
      <button
        onClick={handleLanguageChange}
        className="flex items-center gap-2 rounded-full border border-white/20 bg-black/70 backdrop-blur-md px-3 py-2 text-white hover:border-[#C9981A]"
      >
        <Languages size={16} />
        <span className="hidden sm:inline">
          {currentLanguage === "en" ? "नेपाली" : "English"}
        </span>
      </button>

      {/* Mobile Menu Button */}
<button
  className={`lg:hidden ${
    !isScrolled && !menuOpen ? "text-black/70" : "text-white"
  }`}
  onClick={() => setMenuOpen(!menuOpen)}
>
  {menuOpen ? <X size={28} /> : <Menu size={28} />}
</button>
    </div>
  </div>

  {/* Mobile Menu */}
<div
  className={`lg:hidden overflow-hidden transition-all duration-300 ${
    menuOpen ? "max-h-96" : "max-h-0"
  }`}
>
  <div className="px-6 pb-6 flex flex-col items-center gap-5">
    {navItems.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        onClick={() => setMenuOpen(false)}
        className={`text-lg py-2 ${
          pathname === item.href ? "text-[#C9981A]" : "text-white"
        }`}
      >
        {currentLanguage === "en" ? item.name : item.nameNp}
      </Link>
    ))}
  </div>
</div>
</div>
  );
};

export default NavBar;