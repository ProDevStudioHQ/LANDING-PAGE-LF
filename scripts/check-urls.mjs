#!/usr/bin/env node
// URL safety check for every URL Google is known to have indexed.
//
//   node scripts/check-urls.mjs                      # against production
//   node scripts/check-urls.mjs http://localhost:3000 # against `next start`
//
// Every URL must answer 200, or 301/308 straight to a 200 (no chains). For 200
// pages it also reports the SEO head: canonical, robots, hreflang and H1 count,
// so a broken canonical or a stray noindex shows up next to the status code.
// Exits non-zero on any failure, so it can gate a deploy.

const BASE = (process.argv[2] || "https://digitalstudiolf.online").replace(/\/$/, "");
const SITE = "https://digitalstudiolf.online";

// From the Search Console export (14 Jul – 13 Oct 2026). Do not remove entries
// when pages are merged: these are the URLs that must keep resolving.
export const KNOWN_URLS = `
/
/web-design-morocco
/blog
/contact
/about
/faq
/services
/portfolio
/terms
/privacy
/cookies
/gdpr
/multilingual-website-design
/website-redesign
/booking-websites-for-hotels
/news/how-much-does-a-website-cost-in-morocco
/about/our-expertise
/about/our-technologies
/about/how-we-work
/about/why-choose-us
/about/our-approach
/about/global-clients
/fr/agence-web-marrakech
/fr/prix-creation-site-web-maroc
/fr/creation-site-ecommerce-maroc
/fr/solutions
/fr/solutions/site-web-agence-immobiliere-maroc
/fr/solutions/site-web-dentiste-maroc
/fr/solutions/site-web-riad-marrakech
/fr/solutions/site-web-agence-voyage-maroc
/portfolio/dar-atlas-immobilier
/portfolio/dar-zahra-modern-moroccan-restaurant
/portfolio/premium-sneakers-modern-shopping-and-effortless-style-in-one-digital-experience
/services/inventory-management
/services/online-stores
/services/business-websites
/services/user-portals
/services/landing-pages
/services/portfolio-websites
/services/enterprise-solutions
/services/crm-systems
/services/hotel-riad-websites
/services/tour-reservations
/services/educational-websites
/services/analytics-dashboards
/services/project-management
/services/admin-dashboards
/services/auth-systems
/services/lead-management
/services/medical-websites
/services/law-firm-websites
/services/corporate-websites
/services/email-automation
/services/ai-chatbots
/services/subscription-websites
/services/appointment-booking
/services/hotel-booking-systems
/services/ai-crm
/services/multi-vendor-marketplaces
/services/digital-product-stores
/services/restaurant-websites
/services/crm-for-travel-agencies
/blog/affordable-web-design-small-business-cost
/blog/agence-web-marrakech-top-selection-et-services
/blog/on-page-seo-beginner-morocco
/blog/riad-website-cost-marrakesh
/blog/reduce-payment-failure-rate-woocommerce
/blog/meilleure-agence-web-design-2026-choisir-le-bon-partenaire
/blog/multilingual-riad-website-morocco-seo
/blog/7-reasons-to-choose-custom-crm-vs-excel-for-growth
/blog/what-affects-website-pricing-in-morocco-what-affects-website
/blog/crm-for-travel-agencies-morocco
/blog/local-business-website-seo-7-practical-optimization-tips
/blog/secure-client-portal-for-riads-marrakesh-secure-client-porta
/blog/creation-site-web-marrakech-guide-complet
/blog/landing-page-vs-website-morocco
/blog/crm-systems-cost-timeline-morocco
/blog/landing-page-mistakes-avoid-errors
/blog/tendances-du-marketing-digital-en-2026
/blog/custom-web-development-for-business-growth
/blog/direct-booking-landing-page-for-riads-direct-booking-landing
/blog/web-design-services-for-small-business
/blog/cost-to-build-a-riad-website-cost-build-riad-website-options
/blog/bilingual-booking-portal-for-riads-marrakesh-bilingual-booki
/blog/tour-booking-landing-page-bilingual-conversions
/blog/secure-client-portal-riads-marrakesh
/blog/direct-booking-landing-page-riads
/blog/bilingual-booking-portal-riads-marrakesh
/news/secure-client-portal-for-riads-marrakesh-secure-client-porta
`
  .trim()
  .split(/\s+/);

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1];
const tags = (html, re) => html.match(re) || [];

function inspect(html) {
  const head = html.split("</head>")[0];
  const canonical = attr(tags(head, /<link[^>]+rel="canonical"[^>]*>/gi)[0] || "", "href");
  const robots = attr(tags(head, /<meta[^>]+name="robots"[^>]*>/gi)[0] || "", "content");
  const hreflang = tags(head, /<link[^>]+hreflang="[^"]*"[^>]*>/gi).map(
    (t) => `${attr(t, "hreflang")}`
  );
  const title = head.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "";
  const h1 = tags(html, /<h1[\s>]/gi).length;
  return { canonical, robots, hreflang, title, h1 };
}

async function get(path) {
  const res = await fetch(BASE + path, { redirect: "manual", headers: { "user-agent": "dslf-url-check" } });
  return { status: res.status, location: res.headers.get("location"), res };
}

let failures = 0;
const fail = (msg) => {
  failures++;
  return `FAIL ${msg}`;
};

const results = await Promise.all(
  KNOWN_URLS.map(async (path) => {
    try {
      const first = await get(path);
      if (first.status === 200) {
        const info = inspect(await first.res.text());
        const expected = SITE + (path === "/" ? "" : path);
        const notes = [];
        if (!info.canonical) notes.push(fail("no canonical"));
        else if (info.canonical.replace(/\/$/, "") !== expected) notes.push(fail(`canonical → ${info.canonical}`));
        if (info.robots && /noindex/i.test(info.robots)) notes.push(fail(`robots: ${info.robots}`));
        if (info.h1 !== 1) notes.push(`WARN h1 count ${info.h1}`);
        return `200 ${path}  [hreflang: ${info.hreflang.join(",") || "-"}] ${notes.join(" ")}`;
      }
      if ([301, 308].includes(first.status) && first.location) {
        const target = new URL(first.location, BASE).pathname;
        const second = await get(target);
        if (second.status === 200) return `${first.status} ${path} → ${target}`;
        return fail(`${first.status} ${path} → ${target} answers ${second.status} (chain or broken)`);
      }
      return fail(`${first.status} ${path}${first.location ? ` → ${first.location}` : ""}`);
    } catch (e) {
      return fail(`ERR ${path} ${e.message}`);
    }
  })
);

console.log(results.join("\n"));

// A made-up URL must be a hard 404, not a soft one.
const bogus = await get("/this-page-should-not-exist-" + Date.now());
console.log(`\n${bogus.status === 404 ? "OK" : fail("")} unknown URL answers ${bogus.status}`);

console.log(`\n${KNOWN_URLS.length} URLs checked against ${BASE}, ${failures} failure(s).`);
process.exit(failures ? 1 : 0);
