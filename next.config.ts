import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false, // optional, hides the dev overlay too

  allowedDevOrigins: ["192.168.56.1"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "example.com" },
      // Allow any hostname for local/LAN development
      { protocol: "http", hostname: "**" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
