import type { PortfolioItem } from "@/lib/crm-content";

// Sector rules for the cold-email landing page. A campaign's utm_term (e.g.
// "tourism", "restaurant", "gym") puts the matching case studies first, and
// the same rules give each card an industry label, since the CRM's
// client_industry field is empty on every project today.
type Rule = { test: RegExp; slugs: string[]; label: { en: string; fr: string } };

const RULES: Rule[] = [
  {
    test: /touris|travel|tour|trek|hik|voyage|excursion|riad|hotel|hôtel|guest ?house|maison d.?h[oô]te|adventure|atlas-mountains/,
    slugs: ["atlas-mountains-adventures"],
    label: { en: "Tourism", fr: "Tourisme" },
  },
  {
    test: /restau|food|caf[eé]|dining|traiteur|snack|delivery|livraison|dabba/,
    slugs: ["dar-zahra-modern-moroccan-restaurant", "dabba-food-delivery-platform"],
    label: { en: "Restaurants & food", fr: "Restauration" },
  },
  {
    test: /gym|fitness|sport|coach|crossfit|yoga|nutrition|supplement|powerfuel/,
    slugs: ["gym-landing-page-morocco", "powerfuel-nutrition-morocco"],
    label: { en: "Fitness", fr: "Sport & fitness" },
  },
  {
    test: /immo|real ?estate|property|propert|promoteur/,
    slugs: ["dar-atlas-immobilier"],
    label: { en: "Real estate", fr: "Immobilier" },
  },
  {
    test: /\bcars?\b|car ?rental|rent|location de voiture|voiture|auto|aurum/,
    slugs: ["aurum-luxury-exotic-car-rental-website"],
    label: { en: "Car rental", fr: "Location de voitures" },
  },
  {
    test: /optic|optique|optician|lunett|eyewear|lunetier/,
    slugs: ["lunetier-luxury-optician-morocco"],
    label: { en: "Optician", fr: "Opticien" },
  },
  {
    test: /shop|store|e ?commerce|boutique|retail|fashion|\bmode\b|sneaker|cloth|v[eê]tement/,
    slugs: [
      "premium-sneakers-modern-shopping-and-effortless-style-in-one-digital-experience",
      "powerfuel-nutrition-morocco",
      "lunetier-luxury-optician-morocco",
    ],
    label: { en: "E-commerce", fr: "E-commerce" },
  },
];

function norm(s: string | null | undefined): string {
  return (s || "").toLowerCase().replace(/[_+-]+/g, " ").trim();
}

/** Projects ordered for this campaign: matches for utm_term first, then the rest. */
export function orderForTerm(items: PortfolioItem[], utmTerm: string | null | undefined): PortfolioItem[] {
  const term = norm(utmTerm);
  if (!term) return items;
  const wanted: string[] = [];
  for (const r of RULES) if (r.test.test(term)) wanted.push(...r.slugs);
  if (!wanted.length) return items;
  const rank = (slug: string) => {
    const i = wanted.indexOf(slug);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  // Stable: unmatched projects keep their CRM order.
  return items
    .map((item, i) => ({ item, i }))
    .sort((a, b) => rank(a.item.slug) - rank(b.item.slug) || a.i - b.i)
    .map((x) => x.item);
}

/** Industry for a card: the CRM's value when set, else inferred from slug/title. */
export function industryLabel(item: PortfolioItem, locale: "en" | "fr" = "en"): string | null {
  if (item.client_industry?.trim()) return item.client_industry.trim();
  const hay = `${norm(item.slug)} ${norm(item.title)}`;
  for (const r of RULES) if (r.slugs.includes(item.slug) || r.test.test(hay)) return r.label[locale];
  return null;
}
