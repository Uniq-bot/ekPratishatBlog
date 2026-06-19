"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const NavBar = () => {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    {
      name: "Home",
      href: "https://ekpratishat.com/",
    },
    {
      name: "Blogs",
      href: "/",
    },
    {
      name: "About",
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

  return (
    <div
      className={`
        w-full fixed   top-0 left-0 right-0 z-100
      flex  items-center justify-between gap-5
        py-4 px-10 transition-all duration-500
        ${
          isScrolled
            ? "bg-black/70 backdrop-blur-md shadow-lg "
            : "bg-transparent"
        }
      `}
    >
      {/* Logo */}
     
          <div className="flex items-center gap-3 w-20 md:w-50">
        {
        isScrolled && ( <Image
          src="/logo.png"
          alt="Blog Logo"
          width={50}
          height={50}
          className=""
        />
         )
      }
      </div>
       

      {/* Nav Links */}
      <div className={`flex items-center text-sm   justify-center p-2 px-  ${
        isScrolled?"":" rounded-full bg-black/70 backdrop-blur-md shadow-lg   border-b border-white/10"
      } gap-2 md:gap-5 `}>
        {["Home", "Blogs", "About"].map((item) => (
          <Link
            key={item}
            href={navItems.find((i) => i.name === item)?.href || "#"}
            className={`px-3 py-1 md:text-xl transition-all duration-300 ${
              pathname === navItems.find((i) => i.name === item)?.href
                ? "border-b-2 border-[#C9981A] text-white"
                : "text-white"
            }`}
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Social Icons */}
      <div
        className={`
          flex items-center gap-3
          transition-all duration-500
          ${
            isScrolled
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }
        `}
      >
        <Link
          href="https://www.instagram.com/ek_pratishat/"
          target="_blank"
        >
          <Image
            src="/insta.png"
            alt="Instagram"
            width={40}
            height={40}
            className="w-12 h-12 rounded-full object-cover"
          />
        </Link>

        <Link
          href="https://www.instagram.com/ek_pratishat/"
          target="_blank"
        >
          <Image
            src="/facebook.png"
            alt="Facebook"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>

        <Link
          href="https://www.instagram.com/ek_pratishat/"
          target="_blank"
        >
          <Image
            src="/tiktok.png"
            alt="TikTok"
            width={40}
            height={40}
            className="w-12 h-12 rounded-full object-cover"
          />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;