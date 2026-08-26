# Phase 0 — SEO Audit Report

**Repo:** `LANDING-PAGE-LF` · **Site:** https://digitalstudiolf.online
**Date:** 2026-08-26 · **Status:** audit only — no files changed

---

## 0. Read this before Phase 1

Three things in the SOP conflict with what is actually in this repo. Per working rule §10 ("if a phase instruction conflicts with the actual codebase, ask me"), I have stopped rather than guessed.

**A. The core premise is not accurate.** The SOP says the site is "relying on a single homepage" and "a single homepage cannot rank for nine different queries." This site is **not** a single homepage. It ships **111 URLs**, including 39 service pages, a 7-page About section, a 5-page French section, a French sector-solutions section, a blog, and a shop. Phase 2 as written would add pages to a site that already has a deep architecture.

**B. Three of the five proposed Phase 2 routes already exist** in near-identical form. Building them as new URLs would create self-cannibalising duplicates — the opposite of the goal. Details in §10.

**C. The homepage `<title>` and `<meta description>` are not in this repo.** They are served from the CRM ("Landing Page Brain") at runtime and override the code defaults. Phase 1's "unique title per route" cannot be completed in code for `/`. Details in §3.

The genuine gaps I did find are real and worth building — they are just **narrower than Phase 2 describes**. See §10.

---

## 1. Stack

| | |
|---|---|
| Framework | **Next.js 16.2.1**, App Router |
| React | 19.2.4 |
| Language | TypeScript 5 (strict; `tsc --noEmit` clean) |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` |
| Animation | framer-motion 12 (tree-shaken via `optimizePackageImports`) |
| Icons | react-icons 5 |
| Content source | **Hybrid** — static TS config files + a headless CRM at `crm.digitalstudiolf.online` |
| Rendering | SSG/ISR. Service pages prerender via `generateStaticParams`; CRM-backed routes use `revalidate = 300` |

**Where pages live:** `src/app/**/page.tsx` (App Router file convention).
**Where content lives:** `src/config/*.ts` (services, solutions, about) and `src/lib/crm-content.ts` (blog, portfolio, shop, homepage copy + SEO).

Notably **no CSS-in-JS, no client-only SPA shell, and no `getServerSideProps`-style blocking**. This is a well-built modern stack.

---

## 2. Existing routes

**38 route files**, expanding to **111 URLs** in the sitemap. Full list:

**Core:** `/` · `/about` · `/contact` · `/faq` · `/sitemap` (HTML hub) · `/portfolio` · `/blog` · `/shop`

**About (7):** `/about/global-clients` · `/about/how-we-work` · `/about/our-approach` · `/about/our-expertise` · `/about/our-technologies` · `/about/why-choose-us`

**Services (39):** `/services` hub, plus 6 hand-built pages (`admin-dashboards`, `business-websites`, `crm-for-travel-agencies`, `crm-systems`, `enterprise-solutions`, `landing-pages`) and 32 template-driven pages under `/services/[slug]` (`dynamicParams = false`, so no arbitrary slugs resolve).

**Local / niche (3):** `/web-design-morocco` · `/booking-websites-for-hotels` · `/web-developer-for-startups`

**French (5 + sector pages):** `/fr/creation-site-web-maroc` · `/fr/agence-web-marrakech` · `/fr/prix-creation-site-web-maroc` · `/fr/creation-site-ecommerce-maroc` · `/fr/contact` · `/fr/solutions` + `/fr/solutions/[slug]`

**Dynamic (CRM):** `/blog/[slug]` · `/portfolio/[slug]` · `/shop/[slug]`

**Legal (4):** `/privacy` · `/terms` · `/cookies` · `/gdpr`

There is also a substantial **redirect table** in `next.config.ts` (~15 rules) preserving old `/news/*` URLs and consolidating duplicate service URLs. This is already well maintained.

---

## 3. Head management

**Mechanism:** the native Next.js **Metadata API** — not hardcoded tags. There are two reusable layers:

1. **`src/app/layout.tsx`** — defines `metadataBase`, a title `template` (`"%s | Digital Studio LF"`), default description, OG defaults, Twitter defaults, `robots` with `max-image-preview: large`, and Google verification.
2. **Per-route `export const metadata`** or **`generateMetadata()`** — every route sets its own title, description, canonical, and OG block.

**This requirement of Phase 1 is already met.** A reusable mechanism exists and is used consistently. I verified all 39 service URLs return unique titles, self-referencing absolute canonicals, and `index, follow`.

> ### ⚠️ Exception — the homepage
> `/` calls `generateMetadata()` which fetches `getLandingSeo("home")` from the CRM. **Whatever the CRM returns overrides the code.** The static values in `src/app/page.tsx` (`DEFAULT_HOME_TITLE`, `DEFAULT_HOME_DESCRIPTION`) are only a fallback for when the CRM has no record.
>
> This means homepage title/description changes must be made **in the CRM, by you** — I cannot do them from this repo. Same applies to blog post titles.

---

## 4. Current homepage title and description — exact

Pulled live via `curl`. These come from the **CRM**, not the repo:

**Title** (55 chars — within the 50–60 target):
```
Web Design Morocco | Digital Studio LF Custom Solutions
```

**Meta description** (146 chars — within the 140–160 target):
```
Web Design Morocco experts. Get landing pages, secure portals, dashboards, and CRM systems. Fast, fixed-scope delivery for clients worldwide.
```

**Canonical:** `https://digitalstudiolf.online` (absolute, self-referencing) ✅

**Assessment:** both are already correctly sized. But note what is **missing** relative to the P0 query — neither contains "affordable", "small business", or "Marrakech". The title says "Morocco", the query says "marrakech". See §9.

---

## 5. Homepage heading structure

Extracted from the **raw HTML response** (no JS execution):

```
H1  Websites & custom systems that convert
H2  Custom Websites, Dashboards & CRM Systems That Drive Growth
    H3  Landing Pages / Business Websites / Admin Dashboards / CRM Systems
H2  Built Different. Built Better.
    H3  Built for Speed / Conversion Focused / Secure by Default /
        Fully Responsive / Easy to Manage / Scalable Architecture
H2  We speak your language.
H2  Built for Businesses of Every Size
    H3  Small Businesses / Startups / Agencies / Travel Agencies /
        Freelancers & Consultants / SaaS Founders / E-commerce Brands /
        Companies Needing Better Workflow
    H3  Everything You Need, In One Place        ← out of order (see below)
H2  Everything You Need, Nothing You Don't
    H3  Websites / Dashboards / CRM Platforms
H2  Tools We Integrate With
H2  How It Works
    H3  Discovery & Strategy / Design & Prototype /
        Development & Testing / Launch & Support
H2  Talk straight to the founder.
    H3  Working direct with us / Traditional agencies
H2  Simple Pricing for Every Digital Project
    H3  Flexible & Tailored
H2  Got Questions?
H2  Let's build it
H2  Stay in the loop
```

**Exactly one `<h1>`** ✅ — Phase 1's h1 requirement is already met.

**Two observations:**

1. **The H1 contains no keyword.** "Websites & custom systems that convert" has no location, no service noun a person would search, nothing from the query list. It is a brand slogan. This is the single clearest on-page gap on the homepage.
2. **Minor hierarchy skip** — an `H3` ("Everything You Need, In One Place") appears immediately *before* the `H2` it should sit under. Cosmetic, low priority, but it is a real structural irregularity.

---

## 6. i18n

**There is a French section, but no formal i18n framework.** No `next-intl`, no `i18n` config block, no locale middleware.

| Aspect | Implementation |
|---|---|
| URL structure | Path prefix — `/fr/<french-slug>` |
| Slugs | Natively French (`creation-site-web-maroc`), not translated English slugs |
| `<html lang>` | Root layout is **hardcoded `lang="en"`**. `/fr/*` corrects it to `fr` via an inline pre-paint script in `src/app/fr/layout.tsx` |
| hreflang | **Deliberately minimal** — only `/fr/creation-site-web-maroc` declares a `languages` pair |
| Arabic | **None.** No `/ar` routes, no RTL support anywhere |

The `lang` approach is a considered trade-off, documented in the code: keeping `headers()`/`cookies()` out of the root layout lets every page statically prerender. A JS-executing crawler (Googlebot does execute JS) sees `lang="fr"`; a non-JS crawler sees `lang="en"` on French pages.

**Phase 1 flags this**: "`lang` attribute on `<html>` matching the actual page language." Strictly, French pages fail this in the initial HTML byte stream. The team made this trade knowingly. **I would not change it without your decision** — fixing it properly means either per-segment layouts that break static prerendering, or middleware.

> **Relevant to the query list:** two P1 queries are *"arabic french website design agency"* and *"multilingual website design morocco"*. The site claims Arabic capability in copy (16 mentions on `/web-design-morocco`) but **has no Arabic page and no Arabic schema `inLanguage`**. That is a credibility gap for exactly those queries.

---

## 7. Existing SEO files

| Item | Status |
|---|---|
| `robots.txt` | ✅ `public/robots.txt` — allows crawl, blocks `/api/` + `/admin/`, splits AI-search bots (allowed) from training bots (blocked), points to sitemap |
| `sitemap.xml` | ✅ Generated at build time by `src/app/sitemap.ts`, `revalidate = 300`. **111 absolute URLs.** Deliberately omits `<priority>`/`<changefreq>` (Google ignores both) |
| `llms.txt` | ✅ Present at `public/llms.txt` |
| JSON-LD | ✅ **Extensive** — see below |
| Google verification | ✅ Meta tag in layout **and** 3 HTML files in `public/` |
| Alt convention | ⚠️ **Weak** — see §8 |

**JSON-LD** (`src/lib/schema.ts`) is genuinely comprehensive and already satisfies most of Phase 4:

- `businessNode` — `["LocalBusiness","ProfessionalService"]` with `PostalAddress` (Marrakech / MA), `GeoCoordinates` (31.6295, -7.9811), `telephone`, `OpeningHoursSpecification`, `areaServed` (Marrakech + Morocco), two `ContactPoint`s each with `availableLanguage: ["English","French","Arabic"]`, and a 5-item `OfferCatalog`
- `websiteNode` — `WebSite`
- Helpers: `breadcrumbNode()`, `faqNode()`, `serviceNode()` (with `provider` → `BUSINESS_ID`), `webPageNode()`
- Stable `@id` anchors (`#business`, `#website`) so nodes cross-reference into one connected graph
- A guard (`isRealPersonName`) preventing a fake `Person` author being emitted

**Phase 4 is ~90% already done.** The one real weakness: `sameAs` contains **only a WhatsApp link**. Google uses `sameAs` for entity disambiguation, and one link is thin. That needs real social profiles from you — I cannot invent them.

---

## 8. Images

| Aspect | Finding |
|---|---|
| Location | `public/images/` — **532 KB total**, very lean |
| Formats | Mixed: 1 `.webp`, 1 `.jpg`, 1 `.png`. `next.config.ts` sets `formats: ["image/webp"]` so `next/image` serves WebP on the fly |
| Sizing | `deviceSizes` and `imageSizes` both tuned |
| Caching | `Cache-Control: public, max-age=31536000, immutable` on `/images/*` and `/fonts/*` |
| Remote images | Whitelisted via `remotePatterns` (CRM host, Unsplash, Cloudinary) |
| SVG | `dangerouslyAllowSVG: false` ✅ |
| Hero preload | **Deliberately absent** — documented in `layout.tsx`: a previous preload pointed at the raw file while `next/image` requested a different optimized URL, so it downloaded 61 KB twice |
| **Alt text** | ✅ **Passes** — see correction below |

> **Correction (made during Phase 1).** This section originally called alt text
> "the weakest area found in this audit", on the basis that only 11 `alt`
> attributes exist across `src/`. That inference was wrong: I compared the count
> against the 111-page total instead of against the number of images actually in
> the codebase. There are only **10 `<Image>` elements in the entire repo** — the
> site is text- and CSS-driven, not image-heavy — and **every one of them already
> has descriptive alt text**, explicit dimensions (`fill` or `width`/`height`),
> and a correct `sizes` attribute, with `loading="lazy"` below the fold and
> `priority` on LCP candidates. There is no alt-text gap. Phase 1's image
> requirement was already satisfied before any work started.

Fonts are self-hosted (`@fontsource-variable/inter`, `public/fonts/inter-latin.woff2`) and preloaded via React's `preload()` — Phase 5's font requirement is already met.

---

## 9. JS-blocked content — the biggest risk item, and it PASSES

Phase 1 calls this "the single biggest ranking risk." **Verified clean.**

Every heading in §5 was extracted from a raw `curl` response with **no JavaScript executed**. Term counts in the raw homepage HTML:

| Term | Occurrences in raw HTML |
|---|---|
| `CRM` | 67 |
| `Marrakech` | 20 |
| `riad` | 11 |
| `French` | 8 |
| `Marrakesh` | 3 |

The `dynamic()` imports in `src/app/page.tsx` are **server-side** dynamic imports (no `ssr: false`), so they still render into the initial HTML. Only the floating WhatsApp button is genuinely client-only.

**This is not an SPA. Content is fully server-rendered. No blocker.**

---

## 10. Query-to-page gap analysis

This is the part that matters most, and it is where the SOP's Phase 2 needs revising.

| Query | Priority | Page that already targets it | Verdict |
|---|---|---|---|
| digital studio lf | P0 brand | `/` | ✅ Covered |
| **affordable website design for small business marrakech** | **P0** | `/web-design-morocco` — but see below | ⚠️ **Real gap** |
| web design riad marrakech english | P1 | `/booking-websites-for-hotels`, `/services/hotel-riad-websites`, `/fr/solutions/site-web-riad-marrakech` | ✅ Covered 3× |
| arabic french website design agency | P1 | *nothing dedicated* | ❌ **Gap** |
| multilingual website design morocco | P1 | *nothing dedicated* | ❌ **Gap** |
| website redesign for small business morocco | P1 | *nothing* | ❌ **Gap** |
| custom website design for local business morocco | P2 | `/web-design-morocco` | ⚠️ Partial |
| affordable web design | P2 | — | Too broad, agreed |
| web design small business financial benchmarks | P3 | — | Ignore, agreed |

### The P0 finding

I measured term frequency on the two pages that should own the P0 query:

| Term | `/web-design-morocco` | `/` (homepage) |
|---|---|---|
| **"affordable"** | **0** | **0** |
| **"small business"** | **0** | 1 |
| "redesign" | 0 | 0 |
| "multilingual" | 12 | 0 |
| "Arabic" | 16 | 8 |
| "riad" | 31 | 11 |

Repo-wide, **"affordable" appears in only 3 source files** and **"redesign" in exactly 1** — both buried in service config, neither on a page built for the intent.

**So: the site's best-opportunity query has 10 impressions and 0 clicks because no page uses the words "affordable" or "small business" at all.** That is a fixable, high-confidence problem — and it does not require a new URL.

### Proposed Phase 2 structure — revised

I am **not** proposing the SOP's five new routes, because three would duplicate existing pages. Instead:

| SOP proposed | My recommendation | Why |
|---|---|---|
| `/web-design-marrakech` (build first) | ❌ **Don't build.** Strengthen `/web-design-morocco` instead — add "affordable" + "small business" framing, retitle toward Marrakech | A near-duplicate local page would cannibalise a 1,286-word page that already ranks. `/fr/agence-web-marrakech` also exists |
| `/riad-website-design` | ❌ **Don't build.** Already covered 3× | `/booking-websites-for-hotels` + `/services/hotel-riad-websites` + the FR riad page. A fourth would be index bloat |
| `/multilingual-website-design` | ✅ **Build.** Covers 2 P1 queries | Genuine gap. Content exists across the site but no page owns the intent |
| `/website-redesign` | ✅ **Build.** Covers 1 P1 query | Genuine gap. "redesign" appears in 1 source file sitewide |
| `/contact` | ✅ Exists, no work needed | Title already localised to Marrakesh |

**Net: 2 new pages, not 5, plus a rewrite of `/web-design-morocco`.** This respects the SOP's own rule — *"Do not create a page unless there is a real query for it"* — while also honouring the inverse: don't create a page when one already exists.

---

## 11. Phase-by-phase status against the SOP

| Phase 1 item | Status |
|---|---|
| One `<h1>` per page | ✅ Verified on `/` and service pages |
| Unique title 50–60 / desc 140–160 | ✅ Mechanism exists, all 39 service URLs unique. ⚠️ Homepage is CRM-controlled |
| Self-referencing absolute canonical | ✅ Verified on all 39 service URLs + `/` |
| `robots.txt` → sitemap | ✅ Done |
| `sitemap.xml` at build, absolute | ✅ 111 URLs, all absolute |
| OG + Twitter per page | ✅ Done via Metadata API |
| Images: alt, WebP, dimensions, lazy | ✅ All 10 images have alt, dimensions and `sizes` (see §8 correction) |
| `<html lang>` matches page | ⚠️ FR pages are `en` in initial HTML, corrected by JS — **see PHASE-1-REPORT.md; recommendation is to keep as-is** |
| No JS-blocked content | ✅ **Passes** — fully SSR |

**Phase 4 (schema):** ~90% complete already. Outstanding: `sameAs` needs real social profiles (TODO for you).
**Phase 5 (performance):** fonts self-hosted/subset/preloaded ✅; CSS deliberately not inlined with measured justification ✅. Lighthouse not yet run — see §12.

---

## 12. Questions before I start Phase 1

1. **Phase 2 scope** — do you accept the revised 2-new-pages plan in §10, or do you want the SOP's 5 routes as written despite the duplication? *(This is the main blocker.)*
2. **Homepage title/H1** — the H1 "Websites & custom systems that convert" carries no keyword. Changing the H1 is a repo change I can make; changing the title/description must be done by you in the CRM. Do you want the H1 rewritten?
3. **`<html lang>` on French pages** — leave the current JS-correction trade-off, or fix it properly at the cost of static prerendering?
4. **Arabic** — the site claims Arabic capability but has no Arabic page. Is Arabic delivery real and current? If yes, that is a strong differentiator for two P1 queries. If not, the claims should be softened.
5. **Lighthouse on "every page"** — Phase 6 asks for Performance ≥90 / SEO 100 / A11y ≥95 on every route. That is 111 URLs. Propose scoping to a representative 8: `/`, `/web-design-morocco`, `/services`, one templated service, `/contact`, `/blog`, one blog post, `/fr/creation-site-web-maroc`. Confirm?
6. **Facts I will need from you** (§6 guardrails forbid inventing these):
   - Real social profiles for `sameAs`
   - Whether any price/range may be published on the new pages
   - Years in business / project count — **only if true and you supply them**

---

## 13. Caveat on the ground-truth data

The GSC figures in SOP §2 are a **28-day window with 3 clicks and 175 impressions**. That is a very small sample — "average position 18.9" across 175 impressions carries wide error bars, and a single query moving a few positions would shift it noticeably.

More importantly: **175 impressions across 111 indexed-eligible URLs means the vast majority of pages are getting effectively zero search exposure.** That pattern is more consistent with a young/under-crawled site than with an on-page optimisation problem. On-page work (Phases 1–4) is still worth doing and I recommend proceeding — but the Search Console **Pages** report ("Discovered – currently not indexed" vs "Crawled – currently not indexed") would tell us whether these pages are even in the index yet. That single report should inform how much of the effort goes to content versus crawl/authority.

I flagged this in prior work on this repo: nothing in the codebase was blocking indexation, and a sitewide footer service directory was added to raise crawl priority for the 32 under-linked service pages.

---

**Phase 0 complete. No files changed. Awaiting approval on §12 before starting Phase 1.**
