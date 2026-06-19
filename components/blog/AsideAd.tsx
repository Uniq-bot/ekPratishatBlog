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
    <div
      className={` ${hide ? "opacity-0 pointer-events-none" : ""} fixed right-5 top-20    md:absolute w-[70%]   md:pb-5 md:text-2xl z-50 md:w-100 md:h-120 md:flex flex-col  transition-all shadow-lg rounded-lg overflow-hidden md:top-10 bg-white transform   text-black `}
    >
      <span
        onClick={() => handleHideAd()}
        className="absolute md:hidden bg-black left-2 top-2 text-white p-1 rounded-full "
      >
        <X />
      </span>
      <Link
        href={AsideAds.AdLink}
        target="_blank"
        title="Advertisment"
        className="w-full"
      >
        <div className="w-full h-[65%]">
          <Image
            src={AsideAds.AdPoster}
            alt="Ad"
            width={600}
            height={600}
            className="  w-full h-full"
          />
        </div>
        <div className="w-full h-[35%] p-5 ">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{
              opacity: [1, 0, 1, 0.2, 1, 0.4, 1],
              // scale: [0.95, 1.02, 0.98, 1],
            }}
            transition={{
              duration: 1,
              ease: "easeIn",
            }}
            className="md:text-xl text-sm font-bold"
          >
            {AsideAds.AdTitle}
          </motion.h2>
          <p className="text-sm">{AsideAds.AdDescription}</p>
        </div>
        <div className="w-1/2 hidden m-auto h-20 bg-[#ebbb1c] rounded-full  transition-all md:flex items-center justify-center text-white ">
          <p>Learn more</p>
        </div>
      </Link>
    </div>
  );
};

export default AsideAd;
