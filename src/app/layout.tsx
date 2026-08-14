import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Tracker } from "@/components/Tracker";
import Script from "next/script";
import { Analytics } from "@/components/Analytics";
import MobileMotionGate from "@/components/MobileMotionGate";
import ChatWidget from "@/components/ChatWidget";
import { preload } from "react-dom";
import { baseGraphJson } from "@/lib/schema";

const SITE_URL = "https://digitalstudiolf.online";
// Dedicated 1.91:1 (1200x630) share image with CTA text baked in.
const OG_IMAGE = `${SITE_URL}/images/og-home.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Digital Studio LF | Custom Websites, Landing Pages & CRM Systems",
    template: "%s | Digital Studio LF",
  },
  description:
    "Premium web design & CRM development agency in Marrakesh, Morocco. Custom landing pages, business websites & dashboards built in 7–21 days. Free consultation.",
  applicationName: "Digital Studio LF",
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
    title: "Digital Studio LF | Custom Websites, Landing Pages & CRM Systems",
    // Kept under ~125 chars — social previews truncate longer descriptions on mobile.
    description:
      "Premium web design & CRM development in Marrakesh, Morocco. Websites & dashboards in 7–21 days. Free consultation.",
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
    title: "Digital Studio LF | Custom Websites, Landing Pages & CRM Systems",
    description:
      "Premium web design & CRM development in Marrakesh, Morocco. Websites & dashboards in 7–21 days. Free consultation.",
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
  // Google Search Console ownership verified via HTML meta tag (Settings →
  // Ownership verification → HTML tag). An HTML file (public/google98a33159cebcaa1b.html)
  // is also present as a fallback verification method.
  verification: {
    google: "y1RRor7mIb96z_AgdHERdxaf3NdEe_s3b32dKkW1u_g",
  },
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
  // Inter variable font — woff2 is small and needed for first paint. Declared
  // through React's resource API rather than a <link> in <head>; see the note
  // where that tag used to live.
  preload("/fonts/inter-latin.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

  // <html lang> defaults to English. French routes (/fr/*) override it to "fr"
  // via a pre-paint inline script in src/app/fr/layout.tsx. Keeping this layout
  // free of headers()/cookies() lets every page statically prerender (ISR), so
  // beasties can inline critical CSS and the stylesheet is no longer render-blocking.
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* The hero mockup deliberately has NO preload.
            There used to be a <link rel="preload" as="image"
            href="/images/idea-digital.webp" media="(min-width: 768px)"> here. It
            never served the image it was meant to: next/image requests the
            optimized variant (/_next/image?url=%2Fimages%2Fidea-digital.webp&w=…&q=80),
            which is a different URL, so the browser downloaded the raw 61 KB file
            on every desktop load and then threw it away — measurably worse than
            no preload at all. A correct preload isn't expressible here either,
            because the `w=` the browser picks depends on viewport and DPR.
            The <Image> is `hidden md:block` and lazy by default; adding `priority`
            would reintroduce an unconditional preload that fires on mobile too. */}

        {/* Inter is preloaded via ReactDOM.preload() above, not a <link> here.
            React 19 hoists <link rel="preload"> into <head> on its own, so
            writing the tag inside an explicit <head> emitted it TWICE in the
            shipped HTML (verified: one source line, two tags). The imperative
            API is hoisted and deduped. */}


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
          strategy="lazyOnload"
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
