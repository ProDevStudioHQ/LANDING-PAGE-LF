# Digital Studio LF — Website (digitalstudiolf.online)

Marketing site for **Digital Studio LF**, a web design & custom software studio based in
Marrakesh, Morocco, serving Morocco locally plus English- and French-speaking clients
worldwide. Built with **Next.js 16 (App Router)**, React 19, and Tailwind 4. Every public
page is server-rendered (SSR/SSG) so Googlebot receives full HTML.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

Node `>=20.9.0` is required (see `engines` in `package.json`).

---

## Off-page SEO playbook

Off-page SEO (authority signals from *other* sites) can't be coded — it's earned. The site
supports it with: complete `Organization` `sameAs` entity links + `LocalBusiness` schema,
OG/Twitter cards on every page (good link previews), and share buttons on every article
([`ShareButtons`](src/components/ShareButtons.tsx)). The work below is manual, ordered by ROI:

1. **Google Business Profile (do first, free):** the #1 local lever. Verify the Marrakesh
   listing, add categories (Web Designer / Software Company), photos, services, and collect
   reviews. Feeds the Map Pack and local rankings.
2. **Citations / directories (consistent NAP):** list the business on Moroccan + niche
   directories with identical Name/Address/Phone — e.g. local MA business directories, Clutch,
   DesignRush, GoodFirms, Google/Bing Places. Consistency is what counts.
3. **Profile backlinks (already partly done):** Fiverr, Etsy — add LinkedIn (company page),
   Instagram, Facebook, Behance/Dribbble, GitHub. Then add each URL to `sameAs` in
   [`layout.tsx`](src/app/layout.tsx) and the footer so the entity is consolidated.
4. **Content outreach for the niche clusters:** pitch guest posts / get listed on riad,
   hospitality, and travel-tech sites (links to the riad/hotel + travel-agency clusters carry
   the most topical weight — see the cluster map below).
5. **Reviews & testimonials:** Google, Fiverr, and Trustpilot reviews are off-page trust
   signals; embed them on-site too.
6. **Social shares:** the article share buttons make it one tap to post to X/LinkedIn/
   Facebook/WhatsApp — promote each new article through your own channels.

> To wire up new social profiles: add the URL to both `sameAs` arrays in `layout.tsx` and a
> link in `Footer.tsx`. Keep them identical to the live profiles (no placeholders).

## Low-competition keyword strategy

A new site with no backlinks can't beat established agencies on head terms ("web design",
"CRM"). It **can** win on long-tail / local / niche / question keywords — lower volume, but
lower competition, higher intent, and faster ranking. We target **volume × winnability**.

### Keyword map (page ← target keyword)

**A — Local (Morocco, fastest wins):** `web design Marrakech`, `création site web Marrakech`,
`agence web Marrakech`, `développeur web Maroc`, `création site web riad`,
`site web restaurant Marrakech`, `site web agence de voyage Maroc`, `création site e-commerce Maroc`
→ [`/web-design-morocco`](src/app/web-design-morocco) + [`/fr/*`](src/app/fr) French pages.

**B — Niche industry + service (our expertise):** `direct booking website for riads`,
`booking website for boutique hotels`, `CRM for travel agencies`, `booking system for tour
operators`, `website for Moroccan riads`
→ `/services/booking-websites-for-hotels`, `/services/crm-for-travel-agencies`,
`/services/hotel-riad-websites`, `/services/tour-reservations`.

**C — Question / informational (warm leads):** `how much does a website cost in Morocco`,
`how much does a custom CRM cost`, `Wix vs custom website`, `landing page vs website`,
`how long to build a website`, `how to reduce Booking.com commission`
→ [`/news/*`](src/app/news) articles (Article + FAQPage schema).

**D — Long-tail service:** `custom admin dashboard development`, `secure login page
development`, `appointment booking system for clinics`, `inventory management system for
small business`, `WhatsApp automation for business Morocco`
→ the individual `/services/[slug]` pages (each already targets its long-tail in
title/H1/meta/slug — see [`config/services-content.ts`](src/config/services-content.ts)).

### Topic clusters (interlinked so they reinforce each other)

- **Riad/hotel:** `hotel-riad-websites` (pillar) ← `booking-websites-for-hotels` ←
  `hotel-booking-systems` ← news: `direct-booking-website-without-booking-com`.
- **Travel agency:** `crm-for-travel-agencies` (pillar) ← `tour-reservations` ← travel news.
- **Local Morocco:** `web-design-morocco` (pillar) ← `/fr/*` ← local service variations.

Service-to-service links live in each entry's `relatedServices` in
`config/services-content.ts`; update there to reshape a cluster.

### Free research workflow (repeatable)

1. **Search Console → Performance → Queries:** find keywords you already get impressions for
   at **position 8–30** — you're close; small on-page tweaks push them to page 1. **Do these first.**
2. **Google autocomplete + "People also ask" + "Related searches":** type service + city, harvest long-tail phrases.
3. **Free tools:** Google Keyword Planner, AnswerThePublic, Google Trends, Ubersuggest (free tier) — filter for low difficulty.
4. **Competitor gap:** search the term; if page 1 is forums/directories/no real service pages, it's winnable. If it's all big agencies with deep content, skip.
5. **Validate intent:** prefer "hire" (commercial) or "researching a purchase" intent over pure curiosity.

### Priority order (winnability × value)

1. Search Console **position 8–30** near-wins (easiest).
2. Local Morocco + **French** niche keywords (Bucket A).
3. Riad / hotel / travel niche keywords (Bucket B — our expertise).
4. Question / cost keywords (Bucket C — warm leads).
5. Long-tail service keywords (Bucket D — steady).

> Per-page on-page rule: focus keyword in title (near front), H1, first paragraph, ≥1 H2,
> slug, meta, and one image alt — naturally, no stuffing (0.5–2.5% density). 600+ words for
> service pages, 800+ for articles. Match intent, internal-link the cluster, end with a CTA.

## Contact in the navbar

"Contact" is the single accent CTA in the navbar (desktop button + full-width mobile button),
linking to the SSR [`/contact`](src/app/contact) page (form feeds the CRM via
[`/api/contact`](src/app/api/contact/route.ts), plus WhatsApp + email). It shows an active
ring on `/contact`. It replaced the old "Get Started" → `/#contact` button.

## Services nav dropdown

The "Services" navbar item is a dropdown (desktop) / accordion (mobile). Its contents are
data-driven from [`src/config/services.ts`](src/config/services.ts) — the navbar renders
straight from that config, so adding/removing services never requires touching
[`Navbar.tsx`](src/components/Navbar.tsx).

**Add a new service page:** in `src/config/services.ts`, set the item's `live: true` and point
`href` at the real route. Any item with `live: false` falls back to the `/services` index so
links never 404 while a page is still being built.

## Service pages (data-driven)

Every service has its own SEO page. Content lives in
[`src/config/services-content.ts`](src/config/services-content.ts); the dynamic route
[`src/app/services/[slug]/page.tsx`](src/app/services/[slug]/page.tsx) renders it through the
shared [`ServicePageTemplate`](src/components/ServicePageTemplate.tsx) with per-page
`<title>`, meta, canonical, OG/Twitter, and Service + BreadcrumbList + FAQPage JSON-LD.

- **Add a new service page:** add one entry to `services-content.ts` and set `live: true`
  in [`config/services.ts`](src/config/services.ts). No new file needed.
- **7 services keep hand-built pages** (under `src/app/services/<slug>/`): they're marked
  `hasCustomPage: true` so the `[slug]` template skips them (the static folder wins).
- The `/services` hub, `sitemap.ts`, and the navbar dropdown all read from the config.
- Enterprise (`isContactOnly: true`) never shows a price.

## Blog — clean/minimal reading-first redesign

The blog index and article pages use a clean, minimal Medium/Ghost reading-first treatment:

- **Typography system** ([`globals.css`](src/app/globals.css)) — `.article-prose` reading column
  (~44rem / 65–75ch measure, 19–20px body, 1.75 line-height, brighter `#E4E4E7` text, scaled
  H2/H3, accent links, blockquote/code/list/hr styling). Calm `.blog-surface` (`#0B0B0C`) dark
  reading background, scoped to blog pages only.
- **Article components** — [`ReadingProgress`](src/components/ReadingProgress.tsx) (subtle top
  bar), [`ArticleTOC`](src/components/ArticleTOC.tsx) (quiet sticky contents on wide desktop),
  [`AuthorCard`](src/components/AuthorCard.tsx) (E-E-A-T byline), [`ArticleCTA`](src/components/ArticleCTA.tsx)
  (tasteful conversion band), reusing the existing [`ShareButtons`](src/components/ShareButtons.tsx).
- **Index** — [`BlogList`](src/components/BlogList.tsx): clean divider list (not boxed cards),
  minimal client-side category filter, featured post, reading-time + `<time>` meta.
- **SEO preserved & improved** — single H1 per article, semantic HTML (`<article>`/`<main>`/
  `<nav>`/`<time>`), all per-article meta + JSON-LD (Article/Breadcrumb/FAQ) intact, internal
  links retained; the readable layout improves dwell-time signals. Presentation only — no data,
  admin, or dependency changes.

## SEO architecture (how the site is built to rank)

Three markets, **one domain**, differentiated by **service + niche + language** — not by thin
geo-duplicate homepages.

| Market | How it's targeted |
|--------|-------------------|
| **Morocco (priority)** | Geo H1 on home, [`/web-design-morocco`](src/app/web-design-morocco), French pages under [`/fr`](src/app/fr), `LocalBusiness` schema (Marrakesh address + geo) |
| **USA / Europe** | Niche + long-tail pages (CRM for travel agencies, booking sites for hotels, dev for startups) + blog posts — global intent, low competition |
| **French (FR/BE/CH + MA)** | Native French pages under `/fr` with `hreflang="fr"` |

**Key files**

- Global metadata + JSON-LD (Organization, LocalBusiness, WebSite, Service catalog, FAQPage):
  [`src/app/layout.tsx`](src/app/layout.tsx)
- Sitemap (all pages + language variants): [`src/app/sitemap.ts`](src/app/sitemap.ts)
- Robots (allows public, blocks `/api` + `/admin`): [`src/app/robots.ts`](src/app/robots.ts)
- Per-page `metadata` exports set unique title/description/canonical/hreflang.

**hreflang clusters** (must stay reciprocal — Google flags one-way references):

- `/web-design-morocco` (en) ⇄ `/fr/creation-site-web-maroc` (fr), `x-default` = the en page.
- `/fr/agence-web-marrakech` is a **standalone** French page (no English twin) — it only
  references itself. Do **not** point its `en`/`x-default` at `/web-design-morocco`, or the
  Morocco cluster's reciprocity breaks.

**Structured data:** validate any schema changes in the
[Google Rich Results Test](https://search.google.com/test/rich-results).

---

## ⚠️ Manual action items — these decide rankings, and code cannot do them

The build handles on-page + technical SEO. **Rankings in competitive markets are decided by
the items below**, which the site owner must do manually. Do them in order.

### 1. Google Business Profile — the #1 local lever (free, do first)
- Create / claim **"Digital Studio LF"** at <https://business.google.com>.
- Primary category **Web Designer**; add Web Developer, Software Company as secondary.
- Service area: Marrakesh + Morocco (set as a service-area business if no walk-in address).
- Add services, real photos, a description (EN + FR), and post updates regularly.
- This alone can place the studio in the Marrakesh local map pack.

### 2. Google Search Console — submit + monitor
- Verify the property (HTML verification files already in [`public/`](public/):
  `google8148c2aaaa7cbb88.html`, `googlef93b4f5634ac6dc9.html`).
- Submit the sitemap: `https://digitalstudiolf.online/sitemap.xml`.
- Use **URL Inspection → Request indexing** for the homepage, `/web-design-morocco`, the `/fr`
  pages, and each new service/niche page.
- **Monitor by country** (Performance → Add filter → Country): track Morocco, US, France, UK
  impressions/clicks separately. Double down on whichever market + queries gain traction
  first (expected: Morocco + niche long-tail win earliest).

### 3. Backlinks & directories — what lets a small studio outrank big agencies
**Global / agency directories** (US/EU clients search these):
- [Clutch](https://clutch.co), [DesignRush](https://www.designrush.com),
  [GoodFirms](https://www.goodfirms.co), [The Manifest](https://themanifest.com)
- Portfolio: [Behance](https://www.behance.net), [Dribbble](https://dribbble.com)

**Morocco / local citations** (local backlinks = local ranking):
- Moroccan business directories, local chambers, and listings (NAP — Name, Address, Phone —
  must be **identical** to the Google Business Profile everywhere).

**Relationships & niche presence:**
- Get clients to link to the portfolio.
- Be active in travel-tech / riad / hospitality communities (the studio runs
  pm-travelagency — that niche credibility is the unfair advantage).
- Guest posts / contributions in web-dev and travel-tech communities.

### 4. Measurement
- GA4: organic traffic by country.
- Feed Search Console + GA4 findings back into the content plan — publish more of whatever
  market/keyword is converting.

---

## Before/after baseline (record these per the SEO SOP)

Capture **before** launch and re-check at 30 / 60 / 90 days, per market:

- Indexed pages (Search Console → Pages).
- Impressions & clicks by country (Morocco / US / France / UK).
- Top queries gaining traction.

---

## Deployment

Deployed via the hosting platform of choice (Vercel-compatible). Canonical host is
`https://digitalstudiolf.online`. Ensure 301s consolidate any www / non-www and http / https
variants to that single canonical host.
