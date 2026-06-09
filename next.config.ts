import type { NextConfig } from "next";

const nextConfig: NextConfig = {
experimental: {
    turbopackFileSystemCacheForDev:true
},
 async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
        ],
      },
    ];
  },
  allowedDevOrigins: ["192.168.56.1", "192.168.1.70"],

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
