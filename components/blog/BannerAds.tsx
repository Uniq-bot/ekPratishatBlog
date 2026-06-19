import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerAd = ({ BannerAds }:{BannerAds:any}) => {
  return (
     <Link href={BannerAds.AdLink} target="_blank" className="md:w-1/2 w-full px-2   rounded-lg overflow-hidden md:left-1/2 transform md:-translate-x-1/2 h-32  absolute bottom-0 flex items-center justify-center text-white  font-bold">
       
             <Image
            src={BannerAds.AdPoster}
            alt="Ad"
            width={1000}
            height={1000}
            className=" w-full h-full object-fill rounded-2xl"
          />
       
        </Link>
  )
}

export default BannerAd