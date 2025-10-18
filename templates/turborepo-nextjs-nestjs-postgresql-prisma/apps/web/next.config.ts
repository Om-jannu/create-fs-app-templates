import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['{{PROJECT_NAME}}-shared'],
};

export default nextConfig;
