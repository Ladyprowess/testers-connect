import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // increase if you want (e.g. "10mb")
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ngsyxvjteqlxfnjgevfs.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
