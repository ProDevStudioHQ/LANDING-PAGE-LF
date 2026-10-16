// SERP title, meta description and on-page heading overrides for CRM blog posts,
// keyed by PUBLIC slug (src/config/blog-slugs.ts).
//
// The CRM's old 60-character save cap cut several titles mid-word ("…Boost
// Marrakesh Reser", "…for Moroccan Busi"), and on some posts the article
// heading itself was saved truncated, so the H1 ended mid-word too. Those are
// fixed here so they cannot regress on the next CRM sync, and a few titles on
// pages that already rank were rewritten for click-through (seo-fixes-2026-10).
//
// Fix the same text in the CRM as well; an entry here wins until it is removed.
export type BlogSeoOverride = {
  /** <title>, og:title, twitter:title */
  title?: string;
  /** meta description, og:description */
  description?: string;
  /** visible H1, JSON-LD headline, breadcrumb, blog index card */
  heading?: string;
};

export const BLOG_SEO: Record<string, BlogSeoOverride> = {
  "website-cost-morocco": {
    title: "Website Cost in Morocco (2026): What Affects the Price",
    description:
      "How much does a website cost in Morocco? Our published prices from 2 500 MAD, the factors that change the price, and how to get an accurate fixed quote.",
    heading: "Website Cost in Morocco: What Affects the Price",
  },
  "on-page-seo-beginner-morocco": {
    title: "On-Page SEO Guide for Businesses in Morocco",
    description:
      "A beginner's guide to on-page SEO for businesses in Morocco: titles, meta descriptions, headings, local keywords and page speed, explained step by step.",
  },
  "direct-booking-landing-page-riads": {
    title: "Direct Booking Landing Page for Riads in Marrakech",
    heading: "Direct Booking Landing Page for Riads: Boost Marrakesh Reservations",
  },
  "bilingual-booking-portal-riads-marrakesh": {
    title: "Bilingual Booking Portal for Riads in Marrakech: Guide",
    heading: "Bilingual Booking Portal for Riads in Marrakesh: Step-by-Step Guide",
  },
  "multilingual-riad-website-morocco-seo": {
    title: "Multilingual Riad Website in Morocco: SEO Best Practices",
  },
  "tour-booking-landing-page-bilingual-conversions": {
    title: "Tour Booking Landing Page: Build a Bilingual Site That Sells",
  },
  "crm-systems-cost-timeline-morocco": {
    title: "CRM Cost & Timeline in Morocco for Small Businesses",
  },
  "landing-page-mistakes-avoid-errors": {
    title: "Landing Page Mistakes Moroccan Businesses Should Avoid",
    heading: "Landing Page Mistakes: Avoid Common Errors for Moroccan Businesses",
  },
  "web-design-services-for-small-business": {
    title: "Web Design Services for Small Business | Digital Studio LF",
    heading: "Web Design Services for Small Business",
  },
  "riad-booking-website-cut-ota-commissions": {
    title: "Riad Booking Website: Cut OTA Commissions, Get Direct Sales",
  },
  "reduce-payment-failure-rate-woocommerce": {
    title: "Reduce WooCommerce Payment Failures: Recover Declined Sales",
  },
  // Retargeted from "meilleure agence web design" to the how-to-choose intent
  // (cannibalization Group B): /fr/agence-web-marrakech owns "agence web
  // marrakech" and links here with the anchor "comment choisir une agence web".
  "meilleure-agence-web-design-2026-choisir-le-bon-partenaire": {
    title: "Comment Choisir une Agence Web : Guide et Critères 2026",
    description:
      "Comment choisir une agence web : les critères à vérifier, les questions à poser, les erreurs à éviter et comment comparer les devis avant de signer.",
    heading: "Comment Choisir une Agence Web : Le Guide pour Choisir le Bon Partenaire",
  },
};

// Posts written in French but stored with language "en" in the CRM. They were
// rendered with inLanguage "en" in their JSON-LD — a French article declared
// English. Keyed by public slug.
export const FRENCH_BLOG_SLUGS = new Set<string>([
  "meilleure-agence-web-design-2026-choisir-le-bon-partenaire",
  "services-de-creation-de-sites-e-commerce-guide-complet",
  "creation-site-web-marrakech-guide-complet",
  "tendances-du-marketing-digital-en-2026",
]);

export function blogHeading(slug: string, crmTitle: string): string {
  return BLOG_SEO[slug]?.heading ?? crmTitle;
}

export function blogLanguage(slug: string, crmLanguage: string | null): "en" | "fr" {
  return FRENCH_BLOG_SLUGS.has(slug) || crmLanguage === "fr" ? "fr" : "en";
}
