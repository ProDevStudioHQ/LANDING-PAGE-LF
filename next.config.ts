import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  experimental: {
    // Tree-shake large icon/animation packages so only used exports are bundled
    optimizePackageImports: ["framer-motion", "react-icons"],
    // NOTE: optimizeCss (beasties critical-CSS inlining) is a Webpack-only
    // feature and is a no-op under Turbopack, which Next 16 uses for builds by
    // default. Kept enabled so it takes effect if the build ever runs on Webpack
    // (`next build --webpack`); under Turbopack it does nothing. The single
    // Tailwind stylesheet (~16 KiB gzip) therefore still loads via React's
    // <link rel="stylesheet">. FCP/LCP is instead protected by statically
    // prerendering every page (no headers()/cookies() in the root layout), which
    // serves cache-ready HTML and removes server render delay from the critical path.
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
      // CRM-hosted media. Blog/portfolio/product uploads are served at
      // /api/portfolio/media/** (with a /uploads/portfolio/** rewrite alias);
      // the DB-backed image host serves at /i/**. All must be whitelisted or
      // next/image rejects them and covers/cards render blank.
      { protocol: "https", hostname: "crm.digitalstudiolf.online", pathname: "/i/**" },
      { protocol: "https", hostname: "crm.digitalstudiolf.online", pathname: "/api/portfolio/media/**" },
      { protocol: "https", hostname: "crm.digitalstudiolf.online", pathname: "/uploads/portfolio/**" },
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
