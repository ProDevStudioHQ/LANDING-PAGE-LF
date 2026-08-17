// Internal linking between the French sector pages and the English blog.
//
// Google Search Console reported "Aucune page d'origine détectée" (no referring
// page) for blog posts: the only internal link to any post came from /blog
// itself. A post reachable from one listing page accumulates almost no internal
// link equity, and the sector pages had no editorial links out to supporting
// content either — so twelve pages about riads and hotels sat beside seven blog
// posts about riads and hotels with nothing joining them.
//
// ONE map drives both directions. solutionPosts is authored; postSolutions is
// derived from it by inversion, so a link can never exist on one side only.
//
// Anchor text is written here rather than reusing post titles: descriptive
// anchors are worth more than a repeated headline, the sector pages are French
// while the posts are English, and CRM titles can change under us.

import { solutions } from "./solutions";

export type PostLink = { slug: string; label: string };

// Sector page  ->  blog posts worth reading next (French anchor text).
const solutionPosts: Record<string, PostLink[]> = {
  "site-web-riad-marrakech": [
    {
      slug: "riad-booking-website-cut-ota-commissions",
      label: "Réduire les commissions OTA grâce à la réservation directe",
    },
    {
      slug: "riad-website-cost-marrakesh",
      label: "Combien coûte réellement un site web pour un riad",
    },
    {
      slug: "multilingual-riad-website-morocco-seo",
      label: "Site de riad multilingue : les bonnes pratiques SEO",
    },
  ],
  "site-web-hotel-maroc": [
    {
      slug: "riad-booking-website-cut-ota-commissions",
      label: "Réduire les commissions OTA grâce à la réservation directe",
    },
    {
      slug: "bilingual-booking-portal-for-riads-marrakesh-bilingual-booki",
      label: "Portail de réservation bilingue, étape par étape",
    },
    {
      slug: "multilingual-riad-website-morocco-seo",
      label: "Site multilingue : les bonnes pratiques SEO",
    },
  ],
  "site-web-agence-voyage-maroc": [
    {
      slug: "tour-booking-landing-page-morocco",
      label: "Une page de réservation de circuits qui convertit",
    },
    {
      slug: "crm-for-travel-agencies-morocco",
      label: "CRM pour agences de voyage au Maroc",
    },
    {
      slug: "tour-booking-landing-page-bilingual-conversions",
      label: "Construire une page de circuits bilingue",
    },
  ],
  "site-web-restaurant-marrakech": [
    {
      slug: "local-business-website-seo-7-practical-optimization-tips",
      label: "Référencement local : 7 optimisations concrètes",
    },
    {
      slug: "landing-page-vs-website-morocco",
      label: "Landing page ou site complet : lequel choisir",
    },
  ],
  "site-web-spa-marrakech": [
    {
      slug: "local-business-website-seo-7-practical-optimization-tips",
      label: "Référencement local : 7 optimisations concrètes",
    },
    {
      slug: "landing-page-mistakes-avoid-errors",
      label: "Les erreurs de landing page à éviter",
    },
  ],
  "site-web-agence-immobiliere-maroc": [
    {
      slug: "crm-systems-cost-timeline-morocco",
      label: "CRM sur mesure : coût et délais au Maroc",
    },
    {
      slug: "on-page-seo-beginner-morocco",
      label: "SEO on-page : guide pour les entreprises marocaines",
    },
  ],
  "site-web-location-voiture-maroc": [
    {
      slug: "landing-page-vs-website-morocco",
      label: "Landing page ou site complet : lequel choisir",
    },
    {
      slug: "local-business-website-seo-7-practical-optimization-tips",
      label: "Référencement local : 7 optimisations concrètes",
    },
  ],
  "site-web-dentiste-maroc": [
    {
      slug: "local-business-website-seo-7-practical-optimization-tips",
      label: "Référencement local : 7 optimisations concrètes",
    },
    {
      slug: "on-page-seo-beginner-morocco",
      label: "SEO on-page : guide pour les entreprises marocaines",
    },
  ],
  "site-web-avocat-maroc": [
    {
      slug: "ai-document-privacy-morocco",
      label: "Confidentialité des documents et IA : où vont vraiment vos fichiers",
    },
    {
      slug: "on-page-seo-beginner-morocco",
      label: "SEO on-page : guide pour les entreprises marocaines",
    },
  ],
  "site-web-salle-de-sport-maroc": [
    {
      slug: "landing-page-mistakes-avoid-errors",
      label: "Les erreurs de landing page à éviter",
    },
    {
      slug: "local-business-website-seo-7-practical-optimization-tips",
      label: "Référencement local : 7 optimisations concrètes",
    },
  ],
  "site-web-artisan-maroc": [
    {
      slug: "reduce-payment-failure-rate-woocommerce",
      label: "Réduire les échecs de paiement sur une boutique en ligne",
    },
    {
      slug: "affordable-web-design-small-business-cost",
      label: "Le vrai coût d'un site pour une petite entreprise",
    },
  ],
  "site-web-ecole-maroc": [
    {
      slug: "what-affects-website-pricing-in-morocco",
      label: "Ce qui fait varier le prix d'un site web au Maroc",
    },
    {
      slug: "on-page-seo-beginner-morocco",
      label: "SEO on-page : guide pour les entreprises marocaines",
    },
  ],
};

export function postsForSolution(solutionSlug: string): PostLink[] {
  return solutionPosts[solutionSlug] ?? [];
}

// English anchor text for the reverse direction. The blog is in English, so a
// French sector label would read as an error on an English article.
const SOLUTION_EN_LABEL: Record<string, string> = {
  "site-web-riad-marrakech": "Websites for riads in Marrakech",
  "site-web-hotel-maroc": "Websites for hotels in Morocco",
  "site-web-restaurant-marrakech": "Websites for restaurants in Marrakech",
  "site-web-agence-voyage-maroc": "Websites for travel agencies in Morocco",
  "site-web-spa-marrakech": "Websites for spas and hammams in Marrakech",
  "site-web-agence-immobiliere-maroc": "Websites for real estate agencies in Morocco",
  "site-web-location-voiture-maroc": "Websites for car rental agencies in Morocco",
  "site-web-dentiste-maroc": "Websites for dental practices in Morocco",
  "site-web-salle-de-sport-maroc": "Websites for gyms in Morocco",
  "site-web-artisan-maroc": "Websites and online shops for artisans in Morocco",
  "site-web-avocat-maroc": "Websites for law firms in Morocco",
  "site-web-ecole-maroc": "Websites for schools in Morocco",
};

export type SolutionLink = { href: string; label: string };

// Blog post -> sector pages, derived by inverting solutionPosts so the two
// directions cannot disagree. Unknown solution slugs are dropped rather than
// rendered as a broken link.
export function solutionsForPost(postSlug: string): SolutionLink[] {
  const out: SolutionLink[] = [];
  for (const [solutionSlug, posts] of Object.entries(solutionPosts)) {
    if (!posts.some((p) => p.slug === postSlug)) continue;
    if (!solutions.some((s) => s.slug === solutionSlug)) continue;
    const label = SOLUTION_EN_LABEL[solutionSlug];
    if (!label) continue;
    out.push({ href: `/fr/solutions/${solutionSlug}`, label });
  }
  // Cap at three: past that it stops being a recommendation and becomes a
  // link dump, which dilutes rather than concentrates internal link equity.
  return out.slice(0, 3);
}
