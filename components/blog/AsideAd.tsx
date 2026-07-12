"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const AsideAd = ({ AsideAds }: { AsideAds: any }) => {
  const pathname = usePathname();
  const [hide, setHide] = useState(false);
  const [visible, setVisible] = useState(false); // controls fade in/out

  // Reset the ad every time the route changes
  useEffect(() => {
    setHide(false);
    setVisible(false);
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  const handleClose = () => {
    setVisible(false); // start fade-out
    setTimeout(() => setHide(true), 300); // match transition duration
  };

  useEffect(() => {
    if (hide) return;

    const mql = window.matchMedia("(min-width: 1024px)"); // lg breakpoint

    const lockScroll = () => {
      if (!mql.matches) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    lockScroll();
    mql.addEventListener("change", lockScroll);

    return () => {
      document.body.style.overflow = "";
      mql.removeEventListener("change", lockScroll);
    };
  }, [hide]);

  if (hide) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-999999 lg:hidden transition-opacity duration-300 ease-in-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        title={AsideAds?.AdDescription}
        className={`
          overflow-hidden bg-white
          fixed inset-0 m-auto w-[80%] h-50 rounded-md shadow-md
          sm:w-36 sm:h-48
          md:w-100 md:h-80

          lg:static lg:m-0 lg:w-full lg:h-full lg:rounded-none lg:shadow-none
          z-30

          transition-all duration-300 ease-in-out
          ${visible ? "opacity-100 lg:scale-100 scale-100" : "opacity-0 lg:scale-100 scale-95"}
        `}
      >
        <button
          onClick={handleClose}
          aria-label="Close ad"
          className="absolute lg:hidden z-50 bg-black text-white left-1 top-1 p-1.5 text-xs font-bold rounded-full leading-none"
        >
          <X size={20} />
        </button>

        <Link
          href={AsideAds?.AdLink || "#"}
          target="_blank"
          className="w-full h-full flex flex-col gap-1 md:gap-2"
        >
          <div className="relative w-full h-2/3">
            <Image
              src={AsideAds?.AdPoster || "/Ad1.png"}
              unoptimized
              alt="Ad"
              fill
              className="object-cover"
            />
            <div className="absolute bg-black px-2 py-0.5 text-white text-[10px] md:px-5 md:py-1 md:text-sm top-1 md:top-4 right-0 z-20 cursor-pointer">
              <p>AD</p>
            </div>
          </div>

          <div className="px-2 min-[1200px]:px-5">
            <h1 className="text-black text-[11px] sm:text-sm md:text-xl lg:text-2xl font-bold ">
              {AsideAds?.AdTitle}
            </h1>
            <p className="text-gray-700 text-[10px] sm:text-md min-[1200px]:text-xl">
              {AsideAds?.AdDescription
                ? `${AsideAds.AdDescription.substring(0, 30)}...`
                : ""}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default AsideAd;