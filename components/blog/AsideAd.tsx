"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { X } from "lucide-react";

const AsideAd = ({ AsideAds }: { AsideAds: any }) => {
  const [hide, setHide] = useState(false);

  if (hide) return null;

  return (
    <div
      title={AsideAds?.AdDescription}
      className="
         overflow-hidden bg-white
        absolute top-3 right-3 w-60 h-40 rounded-md shadow-md
        sm:w-36 sm:h-48
        md:static md:top-auto md:right-auto md:w-full md:h-full md:rounded-none md:shadow-none
        z-30
      "
    >
      <button
        onClick={() => setHide(true)}
        aria-label="Close ad"
        className="absolute md:hidden z-50 bg-black text-white left-1 top-1 p-1.5 text-xs font-bold rounded-full leading-none"
      >
        <X size={12} />
      </button>

      <Link
        href={AsideAds?.AdLink || "#"}
        target="_blank"
        className="w-full h-full flex flex-col gap-1 md:gap-2"
      >
        {/* Fixed-ratio image box using `fill` instead of forcing w-full on a
            box whose width was undefined — this was the source of the blowup */}
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
  );
};

export default AsideAd;
