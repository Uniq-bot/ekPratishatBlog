"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
const AsideAd = ({ AsideAds }: { AsideAds: any }) => {
  return (
    
      <Link
        href={AsideAds.AdLink}
        target="_blank"
        title="Advertisment"
        className="absolute pb-5 text-2xl z-50 w-120 h-120 flex flex-col  transition-all shadow-lg rounded-lg overflow-hidden right-5 top-10 bg-white transform   text-black "
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
            className="text-xl font-bold"
          >
            {AsideAds.AdTitle}
          </motion.h2>
          <p className="text-sm">{AsideAds.AdDescription}</p>
        </div>
        <div className="w-1/2 m-auto h-20 bg-[#ebbb1c] rounded-full  transition-all flex items-center justify-center text-white ">
          <p>Learn more</p>
        </div>
      </Link>
   
  );
};

export default AsideAd;
