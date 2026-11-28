import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
