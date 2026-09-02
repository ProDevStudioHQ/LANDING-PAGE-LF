import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  experimental: {
    // Tree-shake large icon/animation packages so only used exports are bundled
    optimizePackageImports: ["framer-motion", "react-icons"],
    // Was true, to avoid a render-blocking <link rel="stylesheet"> that
    // PageSpeed had measured at ~300 ms on the LCP critical path. The premise
    // was that the stylesheet is "~16 KiB gzip, smaller than most single
    // images". That undercounted it badly: inlineCss embeds the CSS TWICE —
    // once as the <style> tag and again, in full, inside the RSC flight payload
    // so client navigations can apply it. Measured on the homepage:
    //
    //                        raw        brotli     text/HTML
    //   inlineCss: true    720.6 KB     50.3 KB      2.1%
    //   inlineCss: false   265.2 KB     31.5 KB      5.8%
    //
    // The CSS is now an immutable content-hashed file under /_next/static, so
    // it is fetched once and cached for every later page. Even the first view is
    // cheaper (47.9 KB vs 50.3 KB, HTML + CSS together); the second is 31.5 KB
    // against 50.3 KB. Across five pages: 173.7 KB vs 251.4 KB.
    //
    // The one thing that did not survive from the old note is the extra request,
    // and it is a real cost — one RTT before first paint. It is cheap here: the
    // <link> sits in the initial SSR <head> where the preload scanner finds it
    // immediately, and it is same-origin on a warm HTTP/2 connection. Re-check
    // LCP in PageSpeed after deploying; flipping this back is a one-line revert.
    //
    // (optimizeCss/beasties was tried before either of these and never applies
    // to the App Router — prerendered HTML kept the blocking <link> regardless.)
    inlineCss: false,
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
      // Consolidated into the service page that already owned this query.
      // The post restated /services/crm-for-travel-agencies down to the FAQs,
      // so Google indexed neither confidently and left the post at "Crawled -
      // currently not indexed". Nothing is lost by folding it in: an unindexed
      // URL has no traffic to preserve, and the service page is the stronger
      // asset (feature breakdown, pricing, distinct FAQs).
      //
      // Points at a /services/ page rather than another post on purpose --
      // the redirect target must be the page that answers the same intent,
      // and here that is commercial, not editorial.
      {
        source: "/news/crm-for-travel-agencies-morocco",
        destination: "/services/crm-for-travel-agencies",
        permanent: true,
      },
      {
        source: "/blog/crm-for-travel-agencies-morocco",
        destination: "/services/crm-for-travel-agencies",
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

      // The Login Pages service was retired. The URL was live and linked from
      // llms.txt and the dashboards page, so send it to the surviving auth
      // service rather than letting an indexed URL start returning a 404.
      {
        source: "/services/login-pages",
        destination: "/services/auth-systems",
        permanent: true,
      },

      // /fr was a 404: the French section exists only as /fr/<page> routes, with
      // no index at the language root. People paste it, crawlers try it, and the
      // FR pages themselves make it look like a real directory. Sent to the FR
      // page that best serves the generic "création site web maroc" intent
      // rather than to the English home, so the French visitor stays in French.
      // Not a hreflang pair — the EN homepage still has no French twin, and this
      // redirect deliberately does not claim one.
      { source: "/fr", destination: "/fr/creation-site-web-maroc", permanent: true },

      // The riad page moved under /fr/solutions/ and took the exact target
      // keyword into its slug ("marrakech", not "hotel"). It was published the
      // same day it moved, so this redirect is almost certainly serving nobody
      // — but the old URL was in the sitemap for a few hours, which is enough
      // for a crawler to have seen it.
      {
        source: "/fr/site-web-riad-hotel",
        destination: "/fr/solutions/site-web-riad-marrakech",
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
            // Declares the destination that the CSP's `report-to` points at.
            // Without this header the report-to directive names a group that
            // does not exist and modern browsers silently drop the violation.
            key: "Reporting-Endpoints",
            value: 'csp-endpoint="https://digitalstudiolf.online/api/csp-report"',
          },
          {
            // Report-Only first. The site relies on inline JSON-LD, the inlined
            // Tailwind stylesheet (experimental.inlineCss), and Next's inline
            // bootstrap scripts, so 'unsafe-inline' is currently unavoidable
            // without nonces. Ship this, watch the violation reports for a
            // couple of weeks, then promote to an enforcing
            // Content-Security-Policy header once the allowlist is proven.
            //
            // That watching period only starts now: until the report-uri /
            // report-to directives below existed, violations went nowhere but
            // the visitor's own console, so no evidence was ever collected.
            // Reports land in src/app/api/csp-report and are logged server-side.
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
              // Both forms on purpose: report-uri is deprecated but is still
              // the only one Safari and older Firefox honor, while report-to is
              // what Chrome now prefers. Browsers that support both use report-to.
              "report-uri /api/csp-report",
              "report-to csp-endpoint",
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
      {
        // mcp.json is a machine-readable manifest linked from the <head> of
        // every page, so Googlebot crawls it — then files it under "Crawled -
        // currently not indexed", because a JSON document has nothing to index.
        // That is harmless but it buries real indexing problems in the report.
        // noindex moves it to "Excluded by noindex", where a non-page belongs.
        // Not robots.txt-disallowed: MCP clients must still be able to read it.
        source: "/.well-known/mcp.json",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
