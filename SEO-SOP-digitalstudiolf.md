# SOP — SEO Build-Out for digitalstudiolf.online

> **How to use this file:** save it in the root of your project, open the project in VS Code, then tell Claude Code:
> `Read SEO-SOP-digitalstudiolf.md and start at Phase 0. Do not skip to Phase 1 until I approve your audit report.`

> **Status note (2026-08-26):** Phase 0 is complete — see [`PHASE-0-AUDIT.md`](./PHASE-0-AUDIT.md).
> The audit found that §5 (Phase 2 architecture) needs revising: three of the five proposed routes
> already exist on the site. Read §10 and §12 of the audit before starting Phase 1.

---

## 1. Mission

The site ranks at **average position 18.9** — page 2 of Google. Google already understands the business correctly (query data confirms it), but the site lacks the page architecture and on-page signals to move into the top 10.

**Goal:** move the priority queries from position ~19 to top 5, by building dedicated, well-optimized pages instead of relying on a single homepage.

**Not the goal:** more content for its own sake, keyword stuffing, or link schemes.

---

## 2. Ground truth — real Search Console data (28 days: 28/07/2026 → 24/08/2026)

| Metric | Value |
|---|---|
| Clicks | 3 |
| Impressions | 175 |
| CTR | 1.7% |
| Average position | 18.9 |

**Queries Google already shows the site for** (this is the target list — do not invent new keywords):

| Query | Impressions | Clicks | Priority |
|---|---|---|---|
| digital studio lf | 25 | 1 | P0 — brand |
| affordable website design for small business marrakech | 10 | 0 | **P0 — best opportunity** |
| web design riad marrakech english | 4 | 0 | P1 |
| arabic french website design agency | 3 | 0 | P1 |
| website redesign for small business morocco | 3 | 0 | P1 |
| affordable web design | 3 | 0 | P2 — too broad, low priority |
| custom website design for local business morocco | 2 | 0 | P2 |
| multilingual website design morocco | 2 | 0 | P1 |
| web design small business financial benchmarks | 1 | 0 | P3 — ignore |

Business context: web design studio based in **Marrakesh, Morocco**. Serves small businesses, riads/hospitality. Works in **Arabic, French, and English**.

---

## 3. Phase 0 — Audit first. Change nothing.

Before editing any file, produce a report answering:

1. **Stack** — framework, version, router type, styling, CMS or content source. Where do pages live?
2. **Existing routes** — full list of URLs currently in the repo.
3. **Head management** — how are `<title>`, meta description, canonical, and Open Graph tags set today? Is there a reusable component/helper, or is it hardcoded?
4. **Current homepage `<title>` and meta description** — quote them exactly.
5. **Heading structure of the homepage** — list every `h1`–`h3` in order. Flag if there is more than one `h1` or zero `h1`.
6. **i18n** — is there any multi-language setup? Which languages? How are locale URLs structured?
7. **Existing files** — is there a `sitemap.xml`, `robots.txt`, any JSON-LD schema, an image `alt` convention?
8. **Images** — format (WebP/AVIF vs JPG/PNG), rough file sizes, are they lazy-loaded?
9. **Deployment** — where does it build and host? Static, SSR, or SPA?

**Output:** a markdown report. Then **stop and wait for my approval.** Propose your Phase 2 URL structure at the end of the report so I can approve it before you build.

---

## 4. Phase 1 — Technical baseline

Fix these before touching content. Each item is independent — commit separately.

- [ ] Exactly **one `<h1>` per page**, containing the page's primary keyword naturally.
- [ ] Unique `<title>` (50–60 chars) and `meta description` (140–160 chars) per route. If there is no reusable mechanism, build one now.
- [ ] `<link rel="canonical">` self-referencing on every page, absolute URL.
- [ ] `robots.txt` at root, allowing crawl, pointing to the sitemap.
- [ ] `sitemap.xml` generated at build time, absolute URLs, no 404s, no redirect chains.
- [ ] Open Graph + Twitter card tags per page (title, description, image, url, type).
- [ ] All images: descriptive `alt` text, WebP or AVIF, explicit `width`/`height` to prevent layout shift, lazy-load everything below the fold.
- [ ] `lang` attribute on `<html>` matching the actual page language.
- [ ] No JS-blocked content — the main copy must be present in the initial HTML response. **Verify with `curl -s <url> | grep "<key phrase>"`.** If the site is a client-only SPA, flag this as a blocker in your report; it's the single biggest ranking risk.

---

## 5. Phase 2 — Page architecture

One page per intent. A single homepage cannot rank for nine different queries.

Proposed structure (adapt to the real routing, confirm in Phase 0 report):

| Route | Primary query | Purpose |
|---|---|---|
| `/` | digital studio lf | Brand, overview, routes to services |
| `/web-design-marrakech` | affordable website design for small business marrakech | **Build this first** |
| `/riad-website-design` | web design riad marrakech english | Hospitality/riad niche |
| `/multilingual-website-design` | arabic french website design agency, multilingual website design morocco | AR/FR/EN capability |
| `/website-redesign` | website redesign for small business morocco | Redesign intent |
| `/contact` | — | Conversion |

Rules:
- URLs lowercase, hyphen-separated, no dates, no IDs, no trailing slash inconsistency.
- Every new page must be linked from the main navigation or homepage body. **An orphan page will not rank.**
- Do not create a page unless there is a real query for it in the table in section 2.

---

## 6. Phase 3 — On-page content

For **each** page, in this order:

1. **`<h1>`** — natural sentence containing the primary keyword. Not a keyword dump.
2. **Opening paragraph** — must contain the primary keyword within the first 100 words, written for a human.
3. **`<h2>` sections** — minimum 4, covering: what the service is, who it's for, how the process works, pricing approach, FAQ.
4. **Body length** — 600–900 words minimum. Below that, a page rarely competes on page 1.
5. **Semantic terms** — include naturally where true: Marrakesh, Morocco, small business, riad, Arabic, French, English, responsive, mobile, SEO.
6. **Internal links** — 2–4 per page pointing to other service pages, with descriptive anchor text. Never "click here."
7. **One clear CTA** above the fold and one at the end.

### Guardrails — read carefully

- **Do not invent facts.** No fake testimonials, no fabricated client names, no made-up "200+ projects delivered," no invented awards, no fake years-in-business. If you need a factual claim, insert `<!-- TODO: confirm with owner -->` and leave it for me.
- **Do not invent prices.** Use ranges only if I supply them; otherwise write "starting from" language with a placeholder TODO.
- **Do not copy competitor text.** Every sentence original.
- No hidden text, no white-on-white keywords, no doorway pages, no keyword stuffing. These get sites penalized.

---

## 7. Phase 4 — Structured data (JSON-LD)

Add to the appropriate pages:

- **`LocalBusiness`** (or `ProfessionalService`) on the homepage: name, description, `url`, `logo`, `address` with `addressLocality: "Marrakesh"` and `addressCountry: "MA"`, `geo`, `telephone`, `email`, `openingHours`, `sameAs` array of real social profiles, `areaServed`, `availableLanguage: ["ar","fr","en"]`.
- **`Service`** on each service page, with `provider` referencing the LocalBusiness.
- **`FAQPage`** on any page with a real FAQ section — the questions must actually appear in the visible HTML.
- **`BreadcrumbList`** on all non-homepage routes.

Use real data only. Leave a TODO for anything you don't have. Validate every block against Google's Rich Results Test before marking this phase done.

---

## 8. Phase 5 — Performance

Core Web Vitals are a ranking factor and this site is competing from page 2.

- [ ] LCP under 2.5s — the hero image is usually the culprit. Preload it, serve it modern-format, size it correctly.
- [ ] CLS under 0.1 — dimensions on every image and embed, `font-display: swap` with a matched fallback.
- [ ] Defer non-critical JS. Remove unused dependencies.
- [ ] Self-host fonts, subset them, load only the weights actually used.
- [ ] Run Lighthouse mobile on every page and report the before/after scores.

---

## 9. Phase 6 — Verification

Do not report the work complete until all of these pass:

```bash
npm run build          # must succeed with zero errors
```

- [ ] Every route returns HTTP 200.
- [ ] `curl -s <url> | grep -i "<title>"` returns a unique title for each route.
- [ ] Main body copy visible in raw HTML via `curl` (not injected by JS).
- [ ] `sitemap.xml` lists every route, all absolute, all live.
- [ ] Zero broken internal links.
- [ ] Every JSON-LD block validates.
- [ ] Lighthouse mobile: Performance ≥ 90, SEO = 100, Accessibility ≥ 95.
- [ ] Site renders correctly at 375px width.

**Final deliverable:** a summary listing every file changed, every new route, all remaining `TODO` markers I need to fill in, and the Lighthouse before/after table.

---

## 10. Working rules

- Work **one phase at a time.** Stop and report at the end of each phase.
- **One logical change per commit**, with a clear message. Never one giant commit.
- If a phase instruction conflicts with the actual codebase, **ask me** — do not guess and do not silently change the plan.
- Never delete existing content without flagging it first.
- Never modify `.env`, secrets, deployment credentials, or CI config.
- If you're uncertain whether something is factually true about the business, it's a TODO — not a guess.

---

## 11. What I do (not Claude Code)

These are outside the repo and matter more than anything above for local Marrakesh queries:

- [ ] **Google Business Profile** — create, verify by postcard, complete 100%: category, hours, service area, 10+ real photos, AR/FR/EN description.
- [ ] Collect the first 5 genuine client reviews.
- [ ] Submit the sitemap in Search Console once Phase 6 passes.
- [ ] Use URL Inspection → "Request indexing" on each new page.
- [ ] Consistent Name/Address/Phone on any local directory listing.
- [ ] Re-check Search Console in 4 weeks. Expect impressions to move first, then position, then clicks. Real movement takes 6–12 weeks.
