import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerAd = ({ BannerAds }:{BannerAds:any}) => {
  return (
     <Link title={BannerAds.AdDescription} href={BannerAds.AdLink} target="_blank" className=" h-fit">
       
             <Image
            src={BannerAds.AdPoster}
            alt="Ad"
            width={1000}
            height={1000}
            className=" w-full h-full object-cover object-center  "
          />
       
        </Link>
  )
}

export default BannerAd