import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  experimental: {
    // Tree-shake large icon/animation packages so only used exports are bundled
    optimizePackageImports: ["framer-motion", "react-icons"],
    // Inline the (small, ~16 KiB gzip) Tailwind stylesheet directly into the
    // HTML <head> instead of a render-blocking <link rel="stylesheet"> request.
    // PageSpeed measured that request at ~300 ms on the LCP critical path.
    // Trade-off: CSS isn't cached across pages — acceptable since the whole
    // stylesheet is smaller than most single images on the site.
    // (optimizeCss/beasties was tried first but never applies to the App
    // Router — prerendered HTML kept the blocking <link> even under Webpack.)
    inlineCss: true,
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
      // Four posts were re-slugged or retired during the /news → /blog rename,
      // so the generic /news/:slug rule below sent them to a 404. These must
      // stay ABOVE that rule — Next matches redirects in order.
      // /news/how-much-does-a-website-cost-in-morocco was live in Google's index
      // at position 9 while pointing at a dead page.
      {
        source: "/news/how-much-does-a-website-cost-in-morocco",
        destination: "/blog/what-affects-website-pricing-in-morocco-what-affects-website",
        permanent: true,
      },
      {
        source: "/blog/how-much-does-a-website-cost-in-morocco",
        destination: "/blog/what-affects-website-pricing-in-morocco-what-affects-website",
        permanent: true,
      },
      {
        source: "/news/how-much-does-a-custom-crm-cost",
        destination: "/blog/crm-systems-cost-timeline-morocco",
        permanent: true,
      },
      {
        source: "/blog/how-much-does-a-custom-crm-cost",
        destination: "/blog/crm-systems-cost-timeline-morocco",
        permanent: true,
      },
      {
        source: "/news/wix-vs-custom-website",
        destination: "/blog/landing-page-vs-website-morocco",
        permanent: true,
      },
      {
        source: "/blog/wix-vs-custom-website",
        destination: "/blog/landing-page-vs-website-morocco",
        permanent: true,
      },
      {
        source: "/news/direct-booking-website-without-booking-com",
        destination: "/blog/riad-booking-website-cut-ota-commissions",
        permanent: true,
      },
      {
        source: "/blog/direct-booking-website-without-booking-com",
        destination: "/blog/riad-booking-website-cut-ota-commissions",
        permanent: true,
      },

      // Two published blog posts link to /free-audit, which was never built on
      // this domain (it only exists in the CRM app's robots allowlist). The
      // posts are CRM-authored, so the links can't be edited from this repo —
      // redirect instead of serving a 404 to readers and crawlers.
      { source: "/free-audit", destination: "/contact", permanent: false },

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
          {
            // Report-Only first. The site relies on inline JSON-LD, the inlined
            // Tailwind stylesheet (experimental.inlineCss), and Next's inline
            // bootstrap scripts, so 'unsafe-inline' is currently unavoidable
            // without nonces. Ship this, watch the violation reports for a
            // couple of weeks, then promote to an enforcing
            // Content-Security-Policy header once the allowlist is proven.
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://analytics.ahrefs.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://crm.digitalstudiolf.online https://images.unsplash.com https://res.cloudinary.com https://getshared.com",
              "font-src 'self'",
              "connect-src 'self' https://crm.digitalstudiolf.online https://analytics.ahrefs.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
            ].join("; "),
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
