import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Marrakesh Web Development Studio",
  description:
    "Digital Studio LF is a Marrakesh-based web development studio building custom websites, dashboards, CRM systems & automation for businesses worldwide.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    images: ["https://digitalstudiolf.online/images/og-home.png"],
    title: "About — Marrakesh Web Development Studio",
    description:
      "A Marrakesh-based web development studio building custom websites, dashboards, CRM systems & automation for businesses in Morocco and worldwide.",
    url: "https://digitalstudiolf.online/about",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://digitalstudiolf.online",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://digitalstudiolf.online/about",
    },
  ],
};

// An AboutPage that points at the one business entity by @id.
//
// This used to be a standalone `Organization` node that redeclared name, url,
// foundingDate, areaServed, knowsLanguage, address and sameAs. That created a
// SECOND business entity on the page — with a shorter sameAs list and
// `addressLocality: "Marrakesh"` where the sitewide #business node says
// "Marrakech". Two spellings of the same city across two unlinked entities is
// exactly the NAP inconsistency that confuses entity resolution.
//
// The root layout already emits the full business node on every page, so the
// correct move is to reference it, never to restate it.
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://digitalstudiolf.online/about#webpage",
  url: "https://digitalstudiolf.online/about",
  name: "About Digital Studio LF",
  description:
    "Web development studio in Marrakech, Morocco, building custom websites, admin dashboards, CRM systems, and automation for businesses worldwide.",
  isPartOf: { "@id": "https://digitalstudiolf.online/#website" },
  about: { "@id": "https://digitalstudiolf.online/#business" },
  mainEntity: { "@id": "https://digitalstudiolf.online/#business" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Inline (SSR) so crawlers see the JSON-LD without executing JS —
          next/script afterInteractive injected it client-side only. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      {children}
    </>
  );
}
