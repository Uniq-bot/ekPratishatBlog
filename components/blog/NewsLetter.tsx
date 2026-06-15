"use client";
import { motion } from "framer-motion";
import React from "react";

const NewsLetter = () => {
  return (
    <div
      className="w-1/3 h-fit text-black absolute -right-10 -top-30  md:flex flex-col items-start  border-l-5 border-[#EBC044]  gap-5 p-5 "
    >
      <h2 className="text-xl font-bold">
        Stay Updated with Real Estate Trends
      </h2>
      <p className="italic">
        "Get weekly property insights, <br /> market updates, and investment{" "}
        <br /> opportunities delivered to your inbox."
      </p>
      <input
        type="email"
        placeholder="Enter your email"
        className="bg-white outline-none text-black border border-gray-300 w-[70%] h-10 px-3"
      />
      <button className="bg-[#d0aa3a] cursor-pointer transition-all hover:bg-[#EBC044] text-black/60 px-5 py-2 ">
        Subscribe
      </button>
    </div>
  );
};

export default NewsLetter;
