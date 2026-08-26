import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/solutions.html", destination: "/solutions", permanent: true },
      { source: "/portfolio.html", destination: "/portfolio", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      // Legacy Images path → brand assets
      {
        source: "/Images/nomadlabz-logo-v4.png",
        destination: "/brand/nomadlabz-logo.png",
        permanent: true,
      },
      {
        source: "/Images/nomadlabz-mark-v4.png",
        destination: "/brand/nomadlabz-mark.png",
        permanent: true,
      },
      {
        source: "/Images/nomadlabz-mark-v4.svg",
        destination: "/brand/nomadlabz-mark.svg",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: Object.entries(securityHeaders).map(([key, value]) => ({
          key,
          value,
        })),
      },
      {
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
