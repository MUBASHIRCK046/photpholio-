import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ["127.0.0.1", "127.0.0.1:3001", "localhost", "localhost:3001", "*.preview.app"],
};

export default nextConfig;
