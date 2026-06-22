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

## Services nav dropdown

The "Services" navbar item is a dropdown (desktop) / accordion (mobile). Its contents are
data-driven from [`src/config/services.ts`](src/config/services.ts) — the navbar renders
straight from that config, so adding/removing services never requires touching
[`Navbar.tsx`](src/components/Navbar.tsx).

**Add a new service page:** in `src/config/services.ts`, set the item's `live: true` and point
`href` at the real route. Any item with `live: false` falls back to the `/services` index so
links never 404 while a page is still being built.

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
