import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  experimental: {
    // Tree-shake large icon/animation packages so only used exports are bundled
    optimizePackageImports: ["framer-motion", "react-icons"],
    // Inline critical above-the-fold CSS into the HTML <head> and load the rest
    // of the stylesheet asynchronously (via beasties). Removes the render-blocking
    // ~19 KiB CSS chunk from the critical request chain → faster FCP/LCP.
    optimizeCss: true,
  },

  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: false,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "getshared.com", pathname: "/**" },
      // CRM-hosted media (portfolio/blog/product images are absolute URLs under /i/**)
      { protocol: "https", hostname: "crm.digitalstudiolf.online", pathname: "/i/**" },
      // Common external host that may appear inside CRM content
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },

  async redirects() {
    return [
      // News section renamed to Blog — preserve old indexed URLs.
      { source: "/news", destination: "/blog", permanent: true },
      { source: "/news/:slug", destination: "/blog/:slug", permanent: true },

      // Consolidate duplicate niche services to their canonical (richer) root pages.
      {
        source: "/services/booking-websites-for-hotels",
        destination: "/booking-websites-for-hotels",
        permanent: true,
      },
      {
        source: "/services/web-developer-for-startups",
        destination: "/web-developer-for-startups",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            // Force HTTPS for 2 years, include subdomains, and allow preload-list inclusion.
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/(.*)",
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
