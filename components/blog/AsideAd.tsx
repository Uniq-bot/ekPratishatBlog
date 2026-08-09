"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { normalizeImageUrl } from "@/libs/image-url";

const AsideAd = ({ AsideAds }: { AsideAds: any }) => {
  return (
    <div
      title={AsideAds?.AdDescription}
      className="overflow-hidden bg-white w-full h-full rounded-md"
    >
      <Link
        href={AsideAds?.AdLink || "#"}
        target="_blank"
        className="flex w-full h-full flex-col gap-1 md:gap-2"
      >
        <div className="relative w-full aspect-video">
          <Image
            src={normalizeImageUrl(AsideAds?.AdPoster)}
            unoptimized
            alt="Ad"
            fill
            className="object-cover"
          />
          <div className="absolute right-2 top-2 z-20 bg-black px-2 py-0.5 text-[10px] text-white md:px-3 md:py-1 md:text-xs">
            <p>AD</p>
          </div>
        </div>

        <div className="px-3 pb-3 md:px-5">
          <h1 className="text-sm font-bold text-black sm:text-base md:text-xl">
            {AsideAds?.AdTitle}
          </h1>
          <p className="text-xs text-gray-700 sm:text-sm md:text-base">
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