// Centralized JSON-LD graph builder.
//
// One connected @graph per page, with stable @id references so Google sees a
// single linked entity (business ↔ website ↔ webpage ↔ service/article) instead
// of orphaned duplicate nodes.

export const SITE_URL = "https://digitalstudiolf.online";
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// Business phone, formatted EXACTLY as on the Google Business Profile (E.164).
// Flows into the business node + NAP. Same number is used for WhatsApp.
export const BUSINESS_PHONE: string | null = "+212660762172";

// WhatsApp number in wa.me format (country code + number, no plus/spaces).
export const WHATSAPP_NUMBER = "212660762172";

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
    "Web design & development studio in Marrakech building custom websites, dashboards, landing pages, and CRM systems for businesses in Morocco and worldwide.",
  slogan: "Custom websites, dashboards & CRM systems — built to perform.",
  foundingDate: "2025",
  // Trilingual delivery — a strong local-relevance signal for the Moroccan market.
  knowsLanguage: ["en", "fr", "ar"],
  ...(BUSINESS_PHONE ? { telephone: BUSINESS_PHONE } : {}),
  email: "hello@digitalstudiolf.online",
  address: {
    "@type": "PostalAddress",
    // "Marrakech" (not "Marrakesh") everywhere in structured data: it matches
    // the official region name and the FR keyword set the site targets.
    addressLocality: "Marrakech",
    addressRegion: "Marrakech-Safi",
    addressCountry: "MA",
  },
  geo: { "@type": "GeoCoordinates", latitude: 31.6295, longitude: -7.9811 },
  // Explicit Google Maps link reinforces the Place/local entity.
  hasMap: "https://www.google.com/maps/search/?api=1&query=31.6295,-7.9811",
  areaServed: [
    { "@type": "City", name: "Marrakech" },
    { "@type": "Country", name: "Morocco" },
    "Worldwide",
  ],
  priceRange: "$$",
  currenciesAccepted: "USD, MAD, EUR",
  paymentAccepted: "Bank transfer, Credit Card, PayPal",
  // Kept the legacy string for compatibility; the spec form is what Google
  // parses for the "hours" local signal.
  openingHours: "Mo-Fr 09:00-18:00",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  // The Etsy and Fiverr profiles were removed from sameAs along with the
  // on-site links. sameAs is an identity claim Google reads: leaving the
  // marketplace profiles here would keep tying the business entity to gig-
  // seller listings after the visible links were taken down for that reason.
  sameAs: [`https://wa.me/${WHATSAPP_NUMBER}`],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      ...(BUSINESS_PHONE ? { telephone: BUSINESS_PHONE } : {}),
      url: `${SITE_URL}/contact`,
      availableLanguage: ["English", "French", "Arabic"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      ...(BUSINESS_PHONE ? { telephone: BUSINESS_PHONE } : {}),
      url: `https://wa.me/${WHATSAPP_NUMBER}`,
      availableLanguage: ["English", "French", "Arabic"],
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landing Page Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Website Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Admin Dashboard Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom CRM Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Authentication System Development" } },
    ],
  },
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Digital Studio LF",
  alternateName: "Digital Studio LF — Web Design Agency Marrakech",
  description:
    "Web design & development studio in Marrakech: custom websites, landing pages, dashboards, and CRM systems for businesses in Morocco and worldwide.",
  inLanguage: ["en", "fr", "ar"],
  publisher: { "@id": BUSINESS_ID },
};

// --- Node builders (all reference the business by @id) ---

export type FAQItem = { question: string; answer: string };

// Stable fragment ids. Every page-scoped node gets one so the page node can
// point at it by reference instead of nesting a second copy, and so two pages
// describing the same thing agree on what "the same thing" is.
export const webPageId = (path: string) => `${SITE_URL}${path}#webpage`;
export const breadcrumbId = (path: string) => `${SITE_URL}${path}#breadcrumb`;
export const faqId = (path: string) => `${SITE_URL}${path}#faq`;
export const serviceId = (path: string) => `${SITE_URL}${path}#service`;

// The last crumb is always the page emitting the list, so the owning page's
// `#breadcrumb` id is derivable — no caller has to pass it separately.
export function breadcrumbNode(items: { name: string; path: string }[]) {
  const ownerPath = items.length ? items[items.length - 1].path : "";
  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId(ownerPath),
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

// `path` is optional only for backwards compatibility; pass it so the FAQ block
// is addressable and the page node can reference it.
export function faqNode(faqs: FAQItem[], path?: string) {
  return {
    "@type": "FAQPage",
    ...(path === undefined ? {} : { "@id": faqId(path) }),
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

// The page itself as an addressable node. Without this the graph jumps straight
// from the WebSite to whatever the page is about, leaving no entity for the URL
// being crawled — so `isPartOf` (page → site) and `about` (page → business) had
// nothing to hang off. Emit one per page; `path` is "" for the homepage.
//
// `type` picks the most specific page class Google understands (AboutPage,
// ContactPage, CollectionPage, ItemPage…). `breadcrumb`/`mainEntity` wire the
// page to the other nodes in the same graph by @id — set `breadcrumb` only when
// the page actually emits a BreadcrumbList, or the reference dangles.
export type PageType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage"
  | "ItemPage"
  | "ProfilePage";

export function webPageNode(opts: {
  path: string;
  name: string;
  description: string;
  type?: PageType;
  inLanguage?: string;
  breadcrumb?: boolean;
  mainEntity?: string;
  about?: string | false;
}) {
  const url = `${SITE_URL}${opts.path}`;
  const about = opts.about === undefined ? BUSINESS_ID : opts.about;
  return {
    "@type": opts.type ?? "WebPage",
    "@id": webPageId(opts.path),
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    ...(about ? { about: { "@id": about } } : {}),
    ...(opts.breadcrumb ? { breadcrumb: { "@id": breadcrumbId(opts.path) } } : {}),
    ...(opts.mainEntity ? { mainEntity: { "@id": opts.mainEntity } } : {}),
    inLanguage: opts.inLanguage ?? "en",
  };
}

export function serviceNode(opts: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
  price?: string | null; // numeric string, e.g. "250"
  keywords?: string[];
}) {
  return {
    "@type": "Service",
    "@id": serviceId(opts.path),
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    ...(opts.keywords?.length ? { keywords: opts.keywords.join(", ") } : {}),
    url: `${SITE_URL}${opts.path}`,
    mainEntityOfPage: { "@id": webPageId(opts.path) },
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

// True only when a byline names an actual human rather than the studio itself.
//
// Content coming out of the CRM defaults `author_display_name` to the brand, and
// emitting that as {"@type":"Person","name":"Digital Studio LF"} declares a
// company to be a person — a type/value mismatch that gives Google no author
// entity to attach experience or expertise signals to. Callers should fall back
// to a `{ "@id": BUSINESS_ID }` reference when this returns false.
const BUSINESS_ALIASES = new Set([
  "digital studio lf",
  "digitalstudiolf",
  "digital studio",
  "studio lf",
  "admin",
  "team",
]);

export function isRealPersonName(name?: string | null): name is string {
  if (!name) return false;
  const normalized = name.trim().toLowerCase().replace(/\s+/g, " ");
  if (!normalized) return false;
  return !BUSINESS_ALIASES.has(normalized);
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
