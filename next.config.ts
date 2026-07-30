import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Next 16 tightened several `next/image` defaults. They are restated here so
  // the intent is visible in review rather than inherited silently.
  images: {
    formats: ["image/avif", "image/webp"],
    // Trimmed to the widths this layout can actually request.
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    qualities: [70, 75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    // Allow-list remote hosts here before referencing them in /data.
    remotePatterns: [],
  },

  // Ship a smaller client bundle: only the icons actually imported get bundled.
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  poweredByHeader: false,
};

export default nextConfig;
