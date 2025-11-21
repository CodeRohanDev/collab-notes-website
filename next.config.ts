import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed 'output: export' to support dynamic routes and server features
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
