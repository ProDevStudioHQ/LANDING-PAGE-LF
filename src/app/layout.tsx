import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Tracker } from "@/components/Tracker";
import Script from "next/script";
import { Analytics } from "@/components/Analytics";
import MobileMotionGate from "@/components/MobileMotionGate";
import ChatWidget from "@/components/ChatWidget";
import { baseGraphJson } from "@/lib/schema";

const SITE_URL = "https://digitalstudiolf.online";
const OG_IMAGE = `${SITE_URL}/images/idea-digital.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Web Design Agency Morocco | Websites & CRM Systems",
    template: "%s | Digital Studio LF",
  },
  description:
    "Web design & CRM development agency in Marrakesh, Morocco. Landing pages, business websites & dashboards built in 7–21 days for clients worldwide. Free consultation.",
  applicationName: "Digital Studio LF",
  keywords: [
    "web design Morocco",
    "website development Morocco",
    "web design Marrakesh",
    "landing page design",
    "CRM development",
    "dashboard development",
    "agence web Marrakech",
    "création site web Maroc",
    "custom website Morocco",
    "Digital Studio LF",
  ],
  authors: [{ name: "Digital Studio LF", url: SITE_URL }],
  creator: "Digital Studio LF",
  publisher: "Digital Studio LF",
  alternates: { canonical: "/" },
  icons: {
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Digital Studio LF",
    title: "Web Design Agency Morocco | Websites & CRM Systems",
    description:
      "Web design & CRM development agency in Marrakesh. Landing pages, websites & dashboards built in 7–21 days. Free consultation.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Digital Studio LF — Web Design Agency in Morocco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Agency Morocco | Websites & CRM Systems",
    description:
      "Web design & CRM development agency in Marrakesh. Landing pages, websites & dashboards built in 7–21 days. Free consultation.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  // Google Search Console ownership is verified via DNS TXT record (preferred),
  // so no google-site-verification meta tag is emitted here. If DNS verification
  // is ever unavailable, add `verification: { google: "<real-token>" }` with the
  // token from Search Console → Settings → Ownership verification → HTML tag.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // <html lang> defaults to English. French routes (/fr/*) override it to "fr"
  // via a pre-paint inline script in src/app/fr/layout.tsx. Keeping this layout
  // free of headers()/cookies() lets every page statically prerender (ISR), so
  // beasties can inline critical CSS and the stylesheet is no longer render-blocking.
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Preload the hero mockup image — but ONLY on ≥768px, where it's actually
            rendered (the <Image> is `hidden md:block`). On mobile the image is never
            shown, so preloading it just wasted 62 KB of high-priority bandwidth and
            delayed the real mobile LCP (the headline text). The media query matches
            Tailwind's `md` breakpoint so desktop keeps its fast hero paint. */}
        <link
          rel="preload"
          href="/images/idea-digital.webp"
          as="image"
          type="image/webp"
          media="(min-width: 768px)"
        />

        {/* Preload Inter variable font — woff2 is small and needed for first paint */}
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Preconnect to third-party origins contacted early */}
        <link rel="preconnect" href="https://crm.digitalstudiolf.online" crossOrigin="anonymous" />

        {/* WebMCP manifest — helps AI agents discover tools and form endpoints */}
        <link rel="mcp" type="application/json" href="/.well-known/mcp.json" />

        {/* Inline JSON-LD base graph (business + website identity) — one connected
            @graph site-wide. Page-specific nodes are emitted per page and link to
            these via @id. Must be in SSR HTML so Googlebot reads it without JS. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: baseGraphJson() }} />

        {/* Ahrefs Web Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="zH5yLEYCHHy5Gj94bKUl0A"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white font-sans">
        <Analytics />
        <Tracker />
        <MobileMotionGate>{children}</MobileMotionGate>
        <ChatWidget />
      </body>
    </html>
  );
}
