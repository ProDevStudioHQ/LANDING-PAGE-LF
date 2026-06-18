import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About | Digital Studio LF",
  description:
    "Solo full-stack developer in Marrakesh building modern websites, dashboards, and CRM systems for businesses worldwide. Direct. Fast. Honest.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Anouar — Digital Studio LF",
    description:
      "Solo full-stack developer in Marrakesh building modern websites, dashboards, and CRM systems for businesses worldwide.",
    url: "https://digitalstudiolf.online/about",
  },
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
        id="person-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {children}
    </>
  );
}
