import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Marrakesh Web Development Studio",
  description:
    "Digital Studio LF is a Marrakesh-based web development studio building custom websites, dashboards, CRM systems & automation for businesses worldwide.",
  alternates: { canonical: "/about" },
  openGraph: {
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

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Digital Studio LF",
  description:
    "Web development studio in Marrakesh, Morocco, building custom websites, admin dashboards, CRM systems, and automation for businesses worldwide.",
  url: "https://digitalstudiolf.online",
  foundingDate: "2025",
  areaServed: [
    { "@type": "Country", name: "Morocco" },
    { "@type": "AdministrativeArea", name: "Worldwide" },
  ],
  knowsLanguage: ["en", "fr", "ar"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marrakesh",
    addressCountry: "MA",
  },
  sameAs: [
    "https://www.fiverr.com/theknight12",
    "https://www.etsy.com/shop/DigitalStudioLF",
  ],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Inline (SSR) so crawlers see the JSON-LD without executing JS —
          next/script afterInteractive injected it client-side only. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      {children}
    </>
  );
}
