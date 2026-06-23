import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerAd = ({ BannerAds }:{BannerAds:any}) => {
  return (
     <Link href={BannerAds.AdLink} target="_blank" className="">
       
             <Image
            src={BannerAds.AdPoster}
            alt="Ad"
            width={1000}
            height={1000}
            className=" w-full h-full object-cover "
          />
       
        </Link>
  )
}

export default BannerAd