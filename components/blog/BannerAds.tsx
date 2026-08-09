import Link from "next/link";
import React from "react";
import { normalizeImageUrl } from "@/libs/image-url";

const BannerAd = ({ BannerAds }:{BannerAds:any}) => {
  return (
    <Link
      title={BannerAds.AdDescription}
      href={BannerAds.AdLink}
      target="_blank"
      className="h-fit"
    >
      <img
        src={normalizeImageUrl(BannerAds?.AdPoster)}
        alt={BannerAds?.AdDescription || "Advertisement"}
        width={1000}
        height={1000}
        className="w-full h-full object-cover object-center"
      />
    </Link>
  );
};

export default BannerAd