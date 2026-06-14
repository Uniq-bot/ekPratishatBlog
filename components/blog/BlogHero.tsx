"use client";
import BlogHeroPng from '@/public/BlogHero.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
const BlogHero = () => {
  return (
    <div
     className="w-[75%]  overflow-hidden top-0 left-0 right-0 absolute z-5  lg:h-130 h-50 border-b-5 border-[#EBC044] md:relative">
            <div className="w-full h-full absolute bg-black/60 z-6" />
            <div className="w-full h-full absolute z-5 ">
                <Image src={BlogHeroPng} alt="Blog Hero" className="w-full h-full" />
            </div>
            <div className="absolute  z-10 lg:bottom-5  md:transform md:-translate-y-1/2 lg:-translate-y-0 text-white p-5 ">
                <h1 className="lg:text-5xl  text-3xl   lg:pr-50 lg:leading-15">
                    Insights, Guides,<br /> and Trends in Real Estate
                </h1>
                <p className="lg:text-lg text-xs italic lg:pr-50 leading-none">
                    Stay informed with practical insights that help you make smarter property decisions.
                </p>
            </div>
    </div>
  )
}

export default BlogHero