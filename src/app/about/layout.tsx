import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About — Web Developer in Marrakesh, Morocco",
  description:
    "Anouar is a self-taught full-stack developer in Marrakesh building custom websites, dashboards & CRM systems for businesses in Morocco and worldwide. Direct. Fast. Honest.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Web Developer in Marrakesh | Digital Studio LF",
    description:
      "Self-taught full-stack developer in Marrakesh building custom websites, dashboards & CRM systems for businesses in Morocco and worldwide.",
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

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anouar",
  jobTitle: "Full-Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Digital Studio LF",
    url: "https://digitalstudiolf.online",
  },
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
        id="person-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {children}
    </>
  );
}
