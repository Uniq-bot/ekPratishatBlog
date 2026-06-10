import React from "react";

const NewsLetter = () => {
  return (
    <div className="w-1/3 h-fit text-white flex flex-col items-start border border-gray-500  gap-5 p-5 ">
      <h2 className="text-xl font-bold">Stay Updated with Real Estate Trends</h2>
      <p className="italic">
        "Get weekly property insights, <br /> market updates,
and investment <br /> opportunities delivered to your inbox."
      </p>
      <input 
        type="email"
        placeholder="Enter your email"
        className="bg-white outline-none text-black border border-gray-300 w-[70%] h-10 px-3"
      />
      <button className="bg-[#d69406] cursor-pointer transition-all hover:bg-[#c28505] text-black px-5 py-2 ">
        Subscribe
      </button>
    </div>
  );
};

export default NewsLetter;
