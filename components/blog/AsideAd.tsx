"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, X } from "lucide-react";
const AsideAd = ({ AsideAds }: { AsideAds: any }) => {
  const [hide, setHide] = useState(false);

  const handleHideAd = () => {
    setHide(true);
  };
  return (
  <div className={hide ? "hidden" : `min-[768px]:w-[35%] max-[700px]:absolute right-0 max-[700px]:z-100 min-[768px]:block max-[700px]:h-60  h-full relative overflow-hidden rounded-lg bg-white `}>
      <span onClick={handleHideAd} className="absolute min-[700px]:hidden z-101 bg-black text-white left-2 top-2 p-2 text-xs font-bold rounded-full">
              <X />
            </span>
      <div className="absolute bg-black px-5 text-white  top-4 right-0 z-10 cursor-pointer" >
        <p>
          AD
        </p>
      </div>
       <Link href={AsideAds?.AdLink || "#"} target="_blank" className="w-full h-full flex flex-col gap-2">
        <Image src={AsideAds?.AdPoster || "/Ad1.png"} alt="Ad" width={1000} height={1000} className="w-full h-2/3 " />
        <div className=" px-2 min-[1200px]:p-5">
          <h1 className="text-black text-sm md:text-md min-[1200px]:text-2xl font-bold ">{AsideAds?.AdTitle}</h1>
          <p className="text-gray-700 text-xs min-[1200px]:text-xl ">{AsideAds?.AdDescription.substring(0, 30)}...</p>

        </div>
       </Link>
    </div>
  );
};

export default AsideAd;
