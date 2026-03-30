import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',           // Static export for free hosting — REMOVE THIS when adding SSR/auth
  images: {
    unoptimized: true,        // Required for static export (no image optimization server)
  },
  trailingSlash: true,        // Generates /stories/index.html instead of /stories.html
};

export default nextConfig;
