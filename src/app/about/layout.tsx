import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About Digital Studio LF — Web Development Studio in Marrakesh",
  description:
    "Digital Studio LF is a web development studio in Marrakesh, Morocco, building custom websites, admin dashboards, CRM systems & automation for businesses in Morocco and worldwide. Direct, fast, honest.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Digital Studio LF — Web Development Studio in Marrakesh",
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
      <Script
        id="ld-breadcrumb-about"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      {children}
    </>
  );
}
