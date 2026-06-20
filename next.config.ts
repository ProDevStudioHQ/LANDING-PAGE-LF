import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  experimental: {
    // Tree-shake large icon/animation packages so only used exports are bundled
    optimizePackageImports: ["framer-motion", "react-icons"],
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
    ],
  },

  async headers() {
    // Hosts the site actually contacts at runtime
    const connectSrc = [
      "'self'",
      "https://www.google-analytics.com",
      "https://analytics.google.com",
      "https://www.googletagmanager.com",
      "https://ipapi.co",
      "https://crm.digitalstudiolf.online",
    ].join(" ");

    const csp = [
      "default-src 'self'",
      // 'unsafe-inline' is required for Next.js JSON-LD dangerouslySetInnerHTML
      // and the GTM inline snippet. Nonce-based CSP would remove this need but
      // requires Edge Middleware — acceptable trade-off for now.
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com",
      "font-src 'self'",
      `connect-src ${connectSrc}`,
      "frame-src 'none'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      // Trusted Types — Next.js registers its own policy; allow-duplicates handles HMR
      "require-trusted-types-for 'script'",
      "trusted-types nextjs nextjs#bundler 'allow-duplicates'",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          // ── Security ────────────────────────────────────────────────
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // frame-ancestors in CSP above supersedes XFO, but keep XFO for
          // older browsers that don't support CSP frame-ancestors
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
