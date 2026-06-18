import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AsideAd = ({ AsideAds }:{AsideAds:any}) => {
  return (
    <Link href={AsideAds.AdLink} target="_blank" className="absolute text-3xl z-50 w-120 h-120 flex flex-col group hover:-translate-y-4 transition-all shadow-lg rounded-lg overflow-hidden right-5 top-10 bg-white transform   text-black ">
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
                  <h2 className="text-xl font-bold">{AsideAds.AdTitle}</h2>
                  <p className="text-sm">{AsideAds.AdDescription}</p>
                </div>
                <div className="w-full h-20 bg-[#ebbb1c] translate-y-15 group-hover:translate-y-0 transition-all flex items-center justify-center text-white "> 
                    <p>
                        Learn more
                    </p>
                </div>
            </Link>
  )
}

export default AsideAd