// Centralized JSON-LD graph builder.
//
// One connected @graph per page, with stable @id references so Google sees a
// single linked entity (business ↔ website ↔ webpage ↔ service/article) instead
// of orphaned duplicate nodes.

export const SITE_URL = "https://digitalstudiolf.online";
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// TODO: user supplies the real phone number, formatted EXACTLY as on the Google
// Business Profile, then set this and it will flow into the business node + NAP.
// Left null so no invalid placeholder phone ships in the schema.
export const BUSINESS_PHONE: string | null = null;

// The single business identity (most specific type). Merges what used to be
// three separate nodes: Organization + LocalBusiness + ProfessionalService.
export const businessNode = {
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": BUSINESS_ID,
  name: "Digital Studio LF",
  url: SITE_URL,
  image: `${SITE_URL}/images/idea-digital.png`,
  logo: `${SITE_URL}/icon.svg`,
  description:
    "Web design & development studio in Marrakesh building custom websites, dashboards, landing pages, and CRM systems for businesses in Morocco and worldwide.",
  ...(BUSINESS_PHONE ? { telephone: BUSINESS_PHONE } : {}),
  email: "hello@digitalstudiolf.online",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marrakesh",
    addressRegion: "Marrakech-Safi",
    addressCountry: "MA",
  },
  geo: { "@type": "GeoCoordinates", latitude: 31.6295, longitude: -7.9811 },
  areaServed: [{ "@type": "Country", name: "Morocco" }, "Worldwide"],
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-18:00",
  sameAs: [
    "https://www.etsy.com/shop/DigitalStudioLF",
    "https://www.fiverr.com/theknight12?public_mode=true",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${SITE_URL}/contact`,
    availableLanguage: ["English", "French", "Arabic"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landing Page Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Website Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Admin Dashboard Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom CRM Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Login Page & Authentication" } },
    ],
  },
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Digital Studio LF",
  publisher: { "@id": BUSINESS_ID },
};

// --- Node builders (all reference the business by @id) ---

export type FAQItem = { question: string; answer: string };

export function breadcrumbNode(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function faqNode(faqs: FAQItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function serviceNode(opts: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
  price?: string | null; // numeric string, e.g. "250"
}) {
  return {
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: [{ "@type": "Country", name: "Morocco" }, "Worldwide"],
    ...(opts.price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: opts.price,
            url: `${SITE_URL}${opts.path}`,
          },
        }
      : {}),
  };
}

// Base graph (business + website identity). Rendered ONCE site-wide from the
// root layout — every page inherits these two @id-addressable nodes.
export function baseGraphJson() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [businessNode, websiteNode],
  });
}

// Page-specific nodes only (breadcrumb, service, article, faq, webpage). These
// reference the business by @id, so the business node is never duplicated.
export function pageGraphJson(...nodes: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}
