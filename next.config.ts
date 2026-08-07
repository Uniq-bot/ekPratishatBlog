import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
    serverActions: {
      bodySizeLimit: "10mb", // adjust to whatever max upload size you want to allow
    },
  },
  cacheComponents: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "picsum.photos" },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
       {
      protocol: "http",
      hostname: "localhost",
      port: "",
      pathname: "/images/**",
    },
    ],
  },
};

export default nextConfig;
