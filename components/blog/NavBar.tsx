"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const navItems = [{
    name: "Home",
    href: "https://ekpratishat.com/"
  }, {
    name: "Blogs",
    href: "/"
  }, {
    name: "About",
    href: "https://ekpratishat.com/about"
  }];

    const pathname=usePathname();

  return (
    <div className="  w-full  flex items-center justify-between gap-5 py-4 shadow-[0_2px_0_0_rgba(0,0,0,0.15)]  border-b pb- px-10">
      <div>
        <Image
          src="/logo.png"
          alt="Blog Logo"
          width={150}
          height={50}
          className="w-auto h-15"
        />
      </div>
      <div className="flex items-center gap-5 flex-wrap">
        {["Home", "Blogs", "About"].map((item) => (
          <Link
            key={item}
            href={navItems.find((i) => i.name === item)?.href || "#"}
            className={`px-3 py-1 text-xl ${
              pathname === navItems.find((i) => i.name === item)?.href
                ? "border-b-2 outline-none border-[#C9981A] text-black"
                : "text-black"
            }`}
          >
            {item}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Link href="https://www.instagram.com/ek_pratishat/" target="_blank" >
        <Image
          src="/insta.png"
          alt="Profile"
          width={40}
          height={40}
          className="w-15 h-15 rounded-full object-cover"
        />
        </Link>
       <Link href="https://www.instagram.com/ek_pratishat/" target="_blank" >
        <Image
          src="/facebook.png"
          alt="Profile"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        </Link>
       <Link href="https://www.instagram.com/ek_pratishat/" target="_blank" >
        <Image
          src="/tiktok.png"
          alt="Profile"
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
