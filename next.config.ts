import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@prisma/adapter-pg", "pg"],

  // to disable Turbopack and use standard Webpack compilation for production builds!
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
