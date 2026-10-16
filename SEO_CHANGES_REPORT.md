# SEO Changes Report — seo-fixes-2026-10

**Site:** https://digitalstudiolf.online · **Branch:** `seo-fixes-2026-10` · **Date:** 2026-10-16
**Based on:** Search Console export 14 Jul – 13 Oct 2026 (6 clicks, 1,053 impressions, avg. position ~33)

> **Read first.** This folder was a downloaded copy, not a git clone. A local repository was created with the
> untouched site as the `main` baseline commit, and each phase is one commit on `seo-fixes-2026-10`. To ship,
> move the commits to the real repository (for example `git format-patch main..seo-fixes-2026-10`, then
> `git am` in the real clone), deploy, and run the checks in §5 against production.

---

## 1. Stack summary

| | |
|---|---|
| Framework | Next.js 16.2 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| Hosting | Self-hosted Next.js behind Cloudflare |
| Content | Static pages in `src/app/**` and `src/config/*.ts`; **blog posts, portfolio and homepage copy come from the CRM** at `crm.digitalstudiolf.online` (public read API, `src/lib/crm-content.ts`) |
| Metadata | Per page via `metadata` / `generateMetadata` in each `page.tsx`; sitewide defaults in `src/app/layout.tsx` |
| JSON-LD | Sitewide business + website graph in `src/lib/schema.ts` (rendered by the root layout); page nodes per page |
| Sitemap | `src/app/sitemap.ts` (static list + CRM content, ISR 5 min) |
| robots.txt | `public/robots.txt` |
| Redirects | `next.config.ts` → `redirects()`; blog slug redirects are generated from `src/config/blog-slugs.ts`. www → apex is in `src/proxy.ts` **and** in Cloudflare (see §6) |
| Blog slugs | Generated and stored by the CRM. Not editable from this repo, so clean public slugs are mapped in `src/config/blog-slugs.ts` |

Permanent redirects in Next.js answer **308**, not 301. Google treats both the same; the existing site already
used 308 everywhere, so this was kept consistent.

---

## 2. Changes by phase

### Phase 1 — Technical audit and brand fix (`1acd0af`)
Audit of the live site found most of the checklist already in place: all known URLs answer 200 or one redirect,
every page has a self-referencing absolute canonical, no accidental `noindex`, one H1 per page, unknown URLs
return a real 404, robots.txt points to the sitemap, and the only hreflang pair was reciprocal.

| File | Change |
|---|---|
| `src/app/page.tsx`, `src/app/layout.tsx` | Homepage title pinned in code: `Digital Studio LF \| Web Design Agency in Marrakech, Morocco` (the CRM title led with "Web Design Morocco") |
| `src/components/HeroSection.tsx` | H1 second line now reads "Digital Studio LF — Web Design Agency in Marrakech, Morocco" |
| `src/proxy.ts` | `X-Robots-Tag: noindex, nofollow` on preview/staging hosts (`*.vercel.app`, `*.netlify.app`, `*.pages.dev`, `staging.`/`preview.`/`dev.` subdomains) or when `SITE_NOINDEX=1` |
| `src/app/sitemap.ts` | `/shop` listed only while it has products (it is `noindex` when empty) |
| `scripts/check-urls.mjs` | New URL safety check (§5) |

Not found in the code: any staging or third-party domain (the "smartblinds… staging-siteglide" query does not
come from this site). `og:site_name` and the `WebSite` JSON-LD already existed. The logo is inline SVG with the
visible text "Digital Studio LF", so it needs no `alt`.

### Phase 2 — Broken blog slugs (`2b345d3`)
| File | Change |
|---|---|
| `src/config/blog-slugs.ts` (new) | CRM slug → clean public slug map; generates the redirects |
| `next.config.ts` | Slug redirects inserted above the generic `/news/:slug` rule, so `/news/<old>` reaches the clean URL in one hop |
| `src/app/blog/[slug]/page.tsx` | Serves the clean slug (fetches the CRM post under its stored slug, with a fallback if the CRM is renamed later); canonical, og:url, JSON-LD use the clean URL; article-body links to renamed/retired posts rewritten to the final URL |
| `src/app/blog/page.tsx`, `src/components/RelatedArticles.tsx`, `src/app/sitemap.ts`, `src/app/api/revalidate/route.ts`, `src/config/content-links.ts`, `public/llms.txt` | All use the public slug |

All 27 CRM slugs were scanned; only the five in the SOP had the repeated-title bug.

### Phase 3 — Keyword cannibalization (`0f2bad0`)
| Group | What was done |
|---|---|
| A — Price | The SOP's proposed main page (`/news/how-much-does-a-website-cost-in-morocco`) was **already a redirect** to the "what-affects…" post. That post is now published at **`/blog/website-cost-morocco`**, and all three old URLs go straight there. Reciprocal hreflang with `/fr/prix-creation-site-web-maroc`. `affordable-web-design-small-business-cost` kept (targets small business). |
| B — Marrakech | `/blog/agence-web-marrakech-top-selection-et-services` → 308 to `/fr/agence-web-marrakech`, which now carries the post's useful sections (services, how to choose, local SEO, price factors) and a FAQ shared by page and schema. **New `/web-design-marrakech`** (EN) with small-business packages, sectors, portfolio, process, FAQ; hreflang-paired with the FR page. |
| C — Riad cost | `/blog/cost-to-build-a-riad-website-…` → 308 to `/blog/riad-website-cost-marrakesh` |
| D — Services | `/web-design-morocco` refocused on "web design Morocco" (title, H1, local-business section, price table, process, portfolio, FAQ, `Service` schema; ~1,250 words). Removed a stale "$150 login page" price (that service was retired). `/services/business-websites` links to it with the anchor "web design in Morocco". |

Merged posts are dropped from the sitemap and blog index (`src/config/retired-content.ts`).
**Article text for A and C lives in the CRM** — see §6.

### Phase 4 — Titles, descriptions, H1s (`1e47b26`)
- Rewrote titles/descriptions for the pages listed in the SOP (table in §4).
- Homepage description pinned in code as well, for the same reason as the title.
- `src/config/blog-seo.ts` (new): overrides for CRM blog titles and H1s cut mid-word by the CRM's old 60-character
  cap ("…Boost Marrakesh Reser"), CTR rewrites, and the "meilleure agence web design" post retargeted to
  "Comment choisir une agence web".
- French posts stored as `language: "en"` in the CRM now render `lang="fr"` and `inLanguage: "fr"`.
- `/blog/website-cost-morocco` shows the site's published prices above the article (the CRM article quotes none).
- `scripts/check-meta.mjs` (new): fails on duplicate or missing titles/descriptions, H1 count ≠ 1, or missing OG tags.

### Phase 5 — Structured data (`79bc04b`)
Already present before this work: one `LocalBusiness` + `ProfessionalService` business node sitewide (a subtype
of `Organization`, with address, geo, hours, areaServed, priceRange), `WebSite`, `Service` on every service
page, `BlogPosting` on posts, `FAQPage` where FAQs are visible, no `AggregateRating`/`Review`.

Added: `src/components/Breadcrumbs.tsx`; visible breadcrumb + `BreadcrumbList` on `/privacy`, `/terms`, `/cookies`,
`/gdpr`, `/sitemap`; visible breadcrumb on `/about`. Every page below the homepage now has both.
`TODO(owner)` markers added in `src/lib/schema.ts` for the street address and real social profiles.

### Phase 6 — Internal linking (`e91f47f`)
- `scripts/crawl-links.mjs` (new): crawls from `/`, reports broken links, links into redirects, and orphans.
- Every blog post links to the money pages with descriptive anchors in its own language.
- Footer: new **Local** column (Morocco, Marrakech EN/FR, price guides EN/FR, riad, real estate, dentist, travel
  agency pages) and a link to `/sitemap` (was an orphan).
- Homepage pricing section links to `/web-design-morocco`, `/web-design-marrakech` and the price guide.
- `/free-audit` links inside CRM articles rewritten to `/contact`; merged posts removed from "Keep reading".
- `src/config/hreflang-pairs.ts` (new): reciprocal hreflang `/services/real-estate-websites` ↔
  `/fr/solutions/site-web-agence-immobiliere-maroc` and `/services/hotel-riad-websites` ↔
  `/fr/solutions/site-web-riad-marrakech`.

**7.3 thin pages:** the six listed service pages have 575–841 words each (well above the 300-word bar), so
nothing was merged.

### Phase 7 — Performance, mobile, accessibility (final commit)
- `/contact`: the phone number is now a `tel:` link (it was plain text — the only place it appears).
- Already in place: self-hosted Inter with `font-display: swap` and a single preload, all images through
  `next/image` (WebP, sized, lazy by default, `priority` on the LCP image), analytics loaded `lazyOnload`,
  WhatsApp (`wa.me`) and `mailto:` links. No change needed.
- Lighthouse results in §5.

---

## 3. Redirect table

All redirects are permanent (308) and single-hop. Each slug redirect exists for both `/blog/<old>` and `/news/<old>`.

| Old URL | New URL | Why |
|---|---|---|
| `/blog/secure-client-portal-for-riads-marrakesh-secure-client-porta` | `/blog/secure-client-portal-riads-marrakesh` | Broken slug |
| `/blog/direct-booking-landing-page-for-riads-direct-booking-landing` | `/blog/direct-booking-landing-page-riads` | Broken slug |
| `/blog/bilingual-booking-portal-for-riads-marrakesh-bilingual-booki` | `/blog/bilingual-booking-portal-riads-marrakesh` | Broken slug |
| `/blog/what-affects-website-pricing-in-morocco-what-affects-website` | `/blog/website-cost-morocco` | Broken slug + price main page |
| `/news/how-much-does-a-website-cost-in-morocco` | `/blog/website-cost-morocco` | Destination updated (was the broken slug) |
| `/blog/how-much-does-a-website-cost-in-morocco` | `/blog/website-cost-morocco` | Destination updated |
| `/blog/agence-web-marrakech-top-selection-et-services` | `/fr/agence-web-marrakech` | Merged (Group B) |
| `/blog/cost-to-build-a-riad-website-cost-build-riad-website-options` | `/blog/riad-website-cost-marrakesh` | Merged (Group C) |

Pre-existing redirects in `next.config.ts` were left as they were.

---

## 4. Titles and meta descriptions

Only pages whose title or description changed. Lengths are checked by `scripts/check-meta.mjs`.

| Page | Old title | New title | Description (old → new) |
|---|---|---|---|
| `/` | Web Design Morocco \| Digital Studio LF Custom Solutions *(from CRM)* | Digital Studio LF \| Web Design Agency in Marrakech, Morocco | Web Design Morocco experts. Get landing pages, secure portals, dashboards, and CRM systems. Fast, fixed-scope delivery for clients worldwide. → Digital Studio LF is a web design agency in Marrakech, Morocco. Bilingual websites (FR/EN/AR), online stores and CRMs from $250. Free quote in 24h. |
| `/web-design-morocco` | Affordable Web Design in Marrakech for Small Business | Web Design in Morocco from $250 \| Digital Studio LF | Affordable web design for small businesses in Marrakech and across Morocco. Custom multilingual websites in English, French and Arabic, from $250. → Web design agency in Morocco: custom websites, e-commerce and booking systems in English, French & Arabic. From $250, fixed price, free quote in 24h. |
| `/web-design-marrakech` | *(new page)* | Web Design Marrakech for Small Business \| Digital Studio LF | Affordable web design in Marrakech for small businesses: custom websites in English, French & Arabic from $250, fixed price, delivered in 7–14 days. |
| `/about` | About — Marrakesh Web Development Studio | Digital Studio LF | About Digital Studio LF | Web Agency in Marrakech | Digital Studio LF is a Marrakesh-based web development studio building custom websites, dashboards, CRM systems & automation for businesses worldwide. → Meet Digital Studio LF, a web design and development agency in Marrakech building custom websites, dashboards and CRMs for clients in Morocco and abroad. |
| `/contact` | Contact Digital Studio LF | Web Design Agency Marrakesh | Contact a Web Designer in Marrakech | Digital Studio LF | Contact Digital Studio LF for a free consultation. Reach us by WhatsApp, email, or the form — usually replies within 2 hours. Marrakesh, working worldwide. → Contact Digital Studio LF, a web designer in Marrakech, by WhatsApp, email or form. We usually reply within 2 hours. Free quote for your website in 24h. |
| `/faq` | FAQ — Web Design & Development Questions | Digital Studio LF | Web Design FAQ Morocco | Digital Studio LF | Answers to common questions about our web design and development services: pricing, timelines, technology, support, and building multilingual sites for Morocco. → Web design in Morocco, answered: website prices, timelines, languages, hosting, SEO and support. Read the FAQ before you ask Digital Studio LF for a quote. |
| `/services` | Web Design, Dashboards & CRM Services | Digital Studio LF | Web Design Services in Morocco | Digital Studio LF | Custom-built websites, e-commerce, dashboards, CRMs, booking systems, AI automation & auth — delivered in 7–21 days. Built in Marrakesh, delivered worldwide. → Web design and development services in Morocco: websites, online stores, booking systems, dashboards and CRMs. Fixed prices from $250, free quote in 24h. |
| `/services/real-estate-websites` | Real Estate Website Development | Digital Studio LF | Real Estate Website Design Morocco | Digital Studio LF | Real estate website development with property listings, search filters, lead capture, and CRM integration for agents and developers. Delivered in 14–21 days. → Real estate website design in Morocco: property listings, search filters, maps and lead capture for agencies and developers. Delivered in 14–21 days. |
| `/services/online-stores` | Custom Online Store Development | Digital Studio LF | E-commerce Website Development Morocco | Digital Studio LF | Custom online store development with product pages, cart, secure checkout, and inventory. Fast, conversion-focused e-commerce that sells. Built in Marrakesh. → E-commerce website development in Morocco: product pages, cart, secure checkout and stock management. Fast, mobile-first online stores built in Marrakech. |
| `/services/inventory-management` | Custom Inventory Management System | Digital Studio LF | Inventory Management System Morocco | Digital Studio LF | Inventory management system development with stock tracking, low-stock alerts, orders, and supplier management. End stock surprises. Delivered in 28–45 days. → Custom inventory management system for Moroccan businesses: stock tracking, low-stock alerts, orders and supplier management in one place. 28–45 days. |
| `/services/tour-reservations` | Tour Reservation System Development | Digital Studio LF | Tour Reservation System for Agencies | Digital Studio LF | Tour reservation system development with tour catalog, availability, online booking, payment, and client management for travel businesses. Built in Marrakesh. → Online tour reservation system for travel agencies and tour operators in Morocco: tour catalog, availability, booking, payments and client management. |
| `/services/user-portals` | Custom User Portal Development | Digital Studio LF | Client Portal Development | Digital Studio LF | Custom user portal development with accounts, dashboards, history, file access, and notifications. A personalised, branded experience. Delivered in 21–35 days. → Client portal development: secure logins, dashboards, documents, history and notifications for your customers, branded to your business. Delivered in 21–35 days. |
| `/portfolio` | Web Design Portfolio — Websites & CRM | Digital Studio LF | Web Design Portfolio Morocco | Digital Studio LF | Explore our web design portfolio: custom websites, admin dashboards, CRM systems, and landing pages built for businesses in Morocco and worldwide. → Web design portfolio from Morocco: real estate, restaurant, e-commerce and CRM projects built by Digital Studio LF in Marrakech. See the work, then get a quote. |
| `/fr/solutions/site-web-agence-voyage-maroc` | Création Site Web Agence de Voyage Maroc | Digital Studio | Création Site Web Agence Voyage Maroc | Digital Studio LF | (unchanged) |
| `/fr/solutions/site-web-agence-immobiliere-maroc` | Création Site Web Agence Immobilière Maroc | Digital Studio | Création Site Web Immobilier Maroc | Digital Studio LF | (unchanged) |
| `/multilingual-website-design` | Multilingual Website Design Morocco — Arabic & French | Multilingual Website Design Morocco | Digital Studio LF | Arabic, French and English website design from a Marrakesh studio. One site, three languages, correct hreflang and RTL. Delivered in 14–28 days. → Multilingual website design in Morocco: Arabic (RTL), French and English on one site, each language indexed by Google. Built in Marrakech in 14–28 days. |
| `/website-redesign` | Website Redesign for Small Business in Morocco — Fixed Price | Website Redesign in Morocco | Digital Studio LF | (unchanged) |
| `/blog/web-design-services-for-small-business` | web design services for small business | Web Design Services for Small Business | Digital Studio LF | (unchanged) |
| `/blog/meilleure-agence-web-design-2026-choisir-le-bon-partenaire` | Meilleure Agence Web Design 2026: Choisir le Bon Partenaire | Comment Choisir une Agence Web : Guide et Critères 2026 | Découvrez comment choisir une agence web design adaptée à votre projet, votre budget et vos objectifs pour créer un site performant et rentable. → Comment choisir une agence web : les critères à vérifier, les questions à poser, les erreurs à éviter et comment comparer les devis avant de signer. |
| `/blog/reduce-payment-failure-rate-woocommerce` | Reduce Payment Failure Rate WooCommerce: Recover Declined sales | Reduce WooCommerce Payment Failures: Recover Declined Sales | (unchanged) |
| `/blog/bilingual-booking-portal-riads-marrakesh` | Bilingual Booking Portal for Riads Marrakesh: Step-by-Step G | Bilingual Booking Portal for Riads in Marrakech: Guide | (unchanged) |
| `/blog/multilingual-riad-website-morocco-seo` | Multilingual Riad Website Morocco: SEO Best Practices for 20 | Multilingual Riad Website in Morocco: SEO Best Practices | (unchanged) |
| `/blog/riad-booking-website-cut-ota-commissions` | Riad Booking Website: Cut OTA Commissions & Boost Direct sales | Riad Booking Website: Cut OTA Commissions, Get Direct Sales | (unchanged) |
| `/blog/tour-booking-landing-page-bilingual-conversions` | Tour Booking Landing Page: Build High-Converting Bilingual S | Tour Booking Landing Page: Build a Bilingual Site That Sells | (unchanged) |
| `/blog/direct-booking-landing-page-riads` | Direct Booking Landing Page for Riads: Boost Marrakesh Reser | Direct Booking Landing Page for Riads in Marrakech | (unchanged) |
| `/blog/on-page-seo-beginner-morocco` | On-Page SEO: Beginner Guide for Morocco Businesses | On-Page SEO Guide for Moroccan Businesses | Digital Studio LF | On-page SEO helps Moroccan businesses boost Google rankings and attract customers. Learn key steps, then contact Digital Studio LF for a free quote. → A beginner's guide to on-page SEO for businesses in Morocco: titles, meta descriptions, headings, local keywords and page speed, explained step by step. |
| `/blog/crm-systems-cost-timeline-morocco` | CRM Systems Cost & Timeline: What Small Businesses Need to K | CRM Cost & Timeline in Morocco for Small Businesses | (unchanged) |
| `/blog/website-cost-morocco` | What Affects Website Pricing in Morocco: Key Factors Explain | Website Cost in Morocco (2026): What Affects the Price | What affects website pricing in Morocco? Discover the main cost factors and get transparent, fixed-scope quotes. Contact Digital Studio LF for a free consultati → How much does a website cost in Morocco? Our published prices from 2 500 MAD, the factors that change the price, and how to get an accurate fixed quote. |
| `/blog/landing-page-mistakes-avoid-errors` | Landing Page Mistakes: Avoid Common Errors for Moroccan Busi | Landing Page Mistakes Moroccan Businesses Should Avoid | (unchanged) |

---

## 5. Test results

Run on a clean production build (`next build && next start`):

| Check | Result |
|---|---|
| `tsc --noEmit` | OK |
| `npm run build` | OK (87 routes) |
| `npm run lint` | OK, 0 problems (2 pre-existing warnings removed with the `/web-design-morocco` rewrite) |
| `node scripts/check-urls.mjs <base>` | **92 URLs, 0 failures** — every SOP URL answers 200 or one redirect to a 200; unknown URLs answer 404 |
| `node scripts/check-meta.mjs <base>` | **113 pages, 0 errors** — no duplicate titles/descriptions, one H1 everywhere, OG tags everywhere |
| `node scripts/crawl-links.mjs <base>` | **114 pages crawled, 0 broken links, 0 links into redirects, 0 orphans** |
| JSON-LD | Parses on every page; `BreadcrumbList` on every page below `/` |

Run all three scripts again against `https://digitalstudiolf.online` after deploying.

### Lighthouse (mobile, simulated throttling)
**Like-for-like run** — the baseline commit and this branch, each built and served alone on the same laptop
(`next start`), pages warmed first, one Lighthouse 12.6 run each:

| Page | | Perf | A11y | Best pr. | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| `/` | before | 57 | 100 | 96 | 92 | 3.9 s | 0.000 | 1296 ms |
|  | after | 72 | 100 | 96 | 92 | 5.1 s | 0.000 | 285 ms |
| `/web-design-morocco` | before | 80 | 96 | 96 | 92 | 4.7 s | 0.000 | 213 ms |
|  | after | 78 | 96 | 100 | 92 | 4.8 s | 0.000 | 233 ms |
| `/blog/on-page-seo-beginner-morocco` | before | 72 | 96 | 96 | 92 | 5.4 s | 0.000 | 287 ms |
|  | after | 71 | 96 | 100 | 92 | 5.3 s | 0.000 | 380 ms |
| `/fr/agence-web-marrakech` | before | 77 | 96 | 100 | 92 | 4.5 s | 0.000 | 315 ms |
|  | after | 65 | 96 | 96 | 92 | 5.2 s | 0.000 | 539 ms |

**How to read this:** single runs on a laptop are noisy — the homepage "before" TBT of 1,296 ms against 285 ms
"after" is run-to-run variance, not an improvement, and the FR page moved the other way by a similar margin.
No page moves consistently. That matches the change set: content, metadata, JSON-LD and links, with no new
client-side JavaScript beyond a few `<Link>` elements in components that already shipped.

- **Accessibility 96–100, CLS 0.000 and Best Practices 96–100** on every page, before and after.
- **SEO 92 everywhere, before and after,** for one reason only: Lighthouse flags the `Content-Signal` line in
  `robots.txt` as invalid. It is deliberate (Cloudflare's "index me, don't train on me" signal) and documented
  in the file itself and in `PHASE-5-REPORT.md`; crawlers ignore unknown lines. Every other SEO audit passes.
- **LCP misses the 2.5 s target before and after** (lab, simulated slow 4G). This predates this work and is
  analysed in `PHASE-5-REPORT.md`. Check real-user LCP in Search Console → Core Web Vitals, which is what ranking uses.

Earlier single runs, live site vs. this branch on localhost (different network and machine, shown for reference only):

| Page | | Perf | A11y | Best pr. | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| `/` | live site | 82 | 100 | 96 | 92 | 3.7 s | 0.000 | 245 ms |
|  | branch, local | 75 | 100 | 100 | 92 | 3.5 s | 0.000 | 509 ms |
| `/web-design-morocco` | live site | 77 | 96 | 96 | 92 | 4.5 s | 0.000 | 250 ms |
|  | branch, local | 74 | 96 | 100 | 92 | 3.5 s | 0.000 | 665 ms |
| `/blog/on-page-seo-beginner-morocco` | live site | 85 | 96 | 96 | 92 | 3.2 s | 0.002 | 308 ms |
|  | branch, local | 62 | 96 | 96 | 92 | 4.0 s | 0.002 | 1059 ms |
| `/fr/agence-web-marrakech` | live site | 85 | 96 | 96 | 92 | 3.3 s | 0.000 | 274 ms |
|  | branch, local | 78 | 96 | 100 | 92 | 3.2 s | 0.000 | 602 ms |

---

## 6. TODO(owner) — information and actions the code cannot supply

1. **Cloudflare www redirect drops the path.** `https://www.digitalstudiolf.online/services` goes to the homepage,
   not `/services`. Change the Cloudflare redirect rule to keep the path and query
   (target: `https://digitalstudiolf.online${http.request.uri.path}`, preserve query string).
2. **Street address and postal code** exactly as on Google Business Profile → `src/lib/schema.ts` (`address`).
3. **Social profile and GBP URLs** (LinkedIn, Facebook, Instagram, Behance/Dribbble, GBP) → `sameAs` in `src/lib/schema.ts`.
4. **Prices:** the site's published prices were reused everywhere ($250 / $700 / $1,200 / $2,500 and the MAD
   equivalents). Confirm they are current; they appear in `PricingPlansSection.tsx`,
   `src/app/fr/prix-creation-site-web-maroc/page.tsx`, `src/app/web-design-morocco/page.tsx`,
   `src/app/web-design-marrakech/page.tsx`, `src/app/fr/agence-web-marrakech/page.tsx` and
   `src/components/WebsitePriceSummary.tsx`.
5. **Client reviews:** none are marked up. Add `Review`/`AggregateRating` only once real reviews are shown on the page.
6. **CRM edits** (the code overrides these today, but fix them at the source):
   - Rename the slugs listed in §3 (then delete the entries in `src/config/blog-slugs.ts`; keep the redirects).
   - Fix the truncated titles/headings listed in `src/config/blog-seo.ts`.
   - Set `language: "fr"` on the four French posts listed in `FRENCH_BLOG_SLUGS`.
   - Move the best content from "Cost to Build a Riad Website" into "Riad Website Cost: What Marrakesh Hotels
     Should Expect", and add real price ranges in MAD to the price guide post. Then unpublish the merged posts
     (optional; the redirects already handle them).
   - Fix the five articles that link to `/free-audit` (they are rewritten to `/contact` on render).
7. **Decision still open:** French pages get `lang="fr"` from a pre-paint script; the server HTML says
   `lang="en"`. Google relies on hreflang and content, not `lang`, so this is low priority. A full fix means
   two root layouts (moving every route) and the experimental `global-not-found`.

## 7. Manual steps in Google Search Console (after deploying)

1. **Sitemaps** → resubmit `https://digitalstudiolf.online/sitemap.xml`.
2. **URL Inspection → Request indexing** for: `/`, `/web-design-morocco`, `/web-design-marrakech`,
   `/fr/agence-web-marrakech`, `/blog/website-cost-morocco`, `/fr/prix-creation-site-web-maroc`,
   `/blog/riad-website-cost-marrakesh`, and the three renamed riad posts.
3. **Pages** report: check "Duplicate, Google chose different canonical", "Crawled – currently not indexed" and
   "Soft 404", and inspect any URL listed there.
4. Compare **Performance** for the 28 days after deploy against the 28 days before (clicks, CTR, and the
   position of "digital studio lf", "web design morocco", "agence web marrakech", "prix création site web maroc").

## 8. Off-site actions (decide whether "web design morocco" ranks)

1. **Google Business Profile** — category "Website designer", Marrakech address, photos, services, weekly posts,
   and ask every client for a review. The #1 local action.
2. **NAP consistency** — identical name, address and phone on the site, GBP, directories and social profiles.
3. **Backlinks** — Moroccan directories (Kerix, Telecontact, Maroc Annuaire), "Website by Digital Studio LF"
   footer credits on client sites, guest posts, Marrakech partner networks.
4. **Social profiles** linking back to the site (then add them to `sameAs`).
5. **Content** — 2–4 strong articles a month on French and English local long-tail queries, each linking to a
   money page.
6. **Patience** — expect movement 2–4 months after deploying.
