# Phase 5 — Performance & accessibility

**Date:** 2026-08-26 · **Commit:** `3437105`
**Method:** Lighthouse 12, mobile form factor, simulated throttling, run against a local production build (`next build && next start`). Chrome stable, headless.

---

## Headline

| SOP Phase 6 gate | Result |
|---|---|
| Accessibility ≥ 95 | ✅ **Met on every page** (96–100, was 90–96) |
| CLS < 0.1 | ✅ **0.000 on every page** — already perfect before this phase |
| SEO = 100 | ❌ **92 sitewide — blocked by a deliberate decision, see §4** |
| Performance ≥ 90 | ❌ **67–86 — not achieved, see §3** |
| LCP < 2.5s | ❌ 2.4–5.2s |

Two of five gates met. The two that failed are explained below, and neither is fixable by the kind of change this phase covers.

---

## 1. Accessibility — real, verified improvement

This is the part of Phase 5 that genuinely moved, and it was caused by my changes rather than measurement noise.

| Page | Before | After |
|---|---|---|
| `/` | 96 | **100** |
| `/services` | 96 | **100** |
| `/blog` | 90 ⚠️ *(below target)* | **96** |
| `/contact` | 96 | 96 |
| `/web-design-morocco` | 96 | 96 |
| `/services/ai-chatbots` | 96 | 96 |
| `/fr/creation-site-web-maroc` | 96 | 96 |
| `/website-redesign` | — | 96 |
| `/multilingual-website-design` | — | 96 |

Three distinct defects fixed:

**Contrast.** Breadcrumb navs and the footer service directory used `text-white/40`, `text-white/45` and `#6E6E76` against the `#0A0A0B` page — measuring **3.15:1 to 4.48:1** against the 4.5:1 AA floor. Raised to `white/60`, `white/55` and `#8A8A93` (5.3:1–7.3:1) across 28 files.

> The footer directory headings were **my own regression**, introduced two commits earlier with the sitewide service directory. It shipped failing on all 113 pages.

**Label in Name (WCAG 2.5.3).** The pricing CTAs displayed "Choose Plan" but announced "Choose the *X* plan". Because the accessible name did not contain the visible label, a voice-control user saying "Choose Plan" could not activate them. Both the button and the `ctaHref` fallback now lead with the visible text.

**Button name.** A CRM post with a blank category rendered a filter button with no text at all — a control with no accessible name. This is what held `/blog` at 90, under the SOP floor. Blank categories are now filtered out.

`label-content-name-mismatch` and `button-name` are now **absent from every page tested**.

---

## 2. What I did not change, and why

The remaining `color-contrast` findings are **pre-existing muted-text tokens** used broadly across the site: `text-white/35` (3.15:1), `text-white/40` (3.78:1), `text-white/45` (4.42–4.49:1). There are 66 instances of `white/40` alone.

Lightening them sitewide would satisfy the audit, but it changes the visual hierarchy of every muted caption, label and helper line on the site. That is a **design decision, not a mechanical fix**, and the SOP's accessibility target is already met at 96–100. Left for you to call.

---

## 3. Performance — not achieved, and honestly reported

**I made no performance changes in this phase, and the scores did not meaningfully improve.**

| Page | Before | After | LCP after |
|---|---|---|---|
| `/` | 60 | 71 | 5.0s |
| `/web-design-morocco` | 76 | 79 | ~4.8s |
| `/services` | 63 | 67 | 5.2s |
| `/services/ai-chatbots` | 72 | 86 | 3.9s |
| `/contact` | 77 | 75 | ~5.1s |
| `/fr/creation-site-web-maroc` | 71 | 86 | 2.5s |
| `/blog` | — | 73 | 5.0s |
| `/website-redesign` | — | 77 | — |

**Do not read those deltas as improvement.** My only edits were CSS colour values and `aria-label` strings — neither affects load performance. Repeated runs of the *same build* varied by up to 15 points (`/` measured 60, 54 and 71 across three runs). **This local setup has a run-to-run variance of roughly ±15, which is larger than any effect shown in the table.** Treat these as a noisy baseline, not a before/after.

### Where the time actually goes

Profiling the homepage:

| Metric | Value |
|---|---|
| LCP breakdown | TTFB 471ms · Load delay 0ms · Load time 0ms · **Render delay 4,428ms** |
| Main-thread work | Script evaluation 1,715ms · **Style & layout 1,235ms** · Other 833ms · Parse/compile 284ms |
| Script bootup | 1,689ms on the document itself (inline RSC payload) + 1,256ms on the largest chunk |
| Total transfer | 627 KB |
| DOM size | 1,808 elements (Lighthouse warns above ~1,400) |

**LCP is ~80% render delay** — the hero paragraph is painted late because the main thread is busy, not because a resource is slow. Two things follow:

- The remaining audit-level opportunities are trivial: unused JS ~45 KB, offscreen images 6 KB, legacy JS 1 KB, and one third-party cache-TTL warning on `analytics.ahrefs.com` that we do not control. Fixing every one of them would not move Performance to 90.
- Reaching ≥90 means **less client JavaScript and a smaller DOM on first load** — an architectural change to how the homepage composes its sections, not a config tweak. That is a bigger, riskier piece of work than Phase 5 describes, and it should be scoped deliberately rather than bolted on here.

### Already-optimised things worth noting

Several Phase 5 checklist items were done before I arrived, and I verified rather than changed them:

- **CLS is 0.000 everywhere.** Every image carries explicit dimensions or `fill`.
- **Fonts** are self-hosted, subsetted (`inter-latin.woff2`, 48 KB), and preloaded via React's `preload()`.
- **Aurora background animations** are already disabled under `max-width: 768px`, so they cost nothing on mobile.
- **`hero-fade-in` animates `transform` only**, never `opacity` — so it does not hide the LCP text. I checked this specifically because a delayed-opacity hero is the classic cause of exactly this LCP profile; it is not the cause here.
- **Images** are WebP via `next/image`, cached `immutable` for a year.
- **CSS is deliberately not inlined**, with measured justification in `next.config.ts`.

### One cost worth naming

The sitewide footer service directory (added for crawl priority) contributes roughly 90 DOM elements and their RSC payload to **all 113 pages**. Against a 1,808-element DOM that is about 5%. The SEO benefit is real — 38 service pages went from one inbound link to a sitewide one — but it is not free, and if the homepage is ever put on a DOM budget this is a known line item.

---

## 4. SEO stuck at 92 — a decision, not a defect

Every page scores exactly 92, failing one audit: **`robots.txt is not valid`**.

```
Line 9:  Content-Signal: search=yes,ai-train=no    →  "Unknown directive"
```

This is the Cloudflare Content Signals Policy line. It is **already a settled decision in this repo** — commit `a82fb64` is literally *"docs(robots): record why Content-Signal stays despite the audit error"*, and `public/robots.txt` carries an explicit instruction not to remove it, noting that RFC 9309 §2.2 requires crawlers to ignore unrecognised lines so it cannot break a crawl rule.

Lighthouse's validator is stricter than the RFC. So:

- **SEO = 100 is unreachable while that line stays.**
- The line does not harm crawling or indexing. The 8-point deduction is cosmetic.
- I did not remove it, and I do not recommend removing it to chase a score.

If you want the 100, deleting one line gets it — at the cost of the only machine-readable "index me, do not train on me" signal the site has. Your call, and you have already made it twice.

---

## 5. Verification

```
npx tsc --noEmit      # clean
npx eslint src        # clean
npx next build        # succeeds, zero errors
```

Lighthouse mobile run against a local production build across 9 pages, chosen to cover each distinct template: homepage, local landing, services hub, templated service page, both new intent pages, contact, blog index, and a French page.

**Caveat on method:** these are local, simulated-throttling numbers, not field data. They are useful for finding *what* is slow and for the accessibility audits, which are deterministic. They are not a substitute for CrUX. Real-user Core Web Vitals for this domain should come from Search Console or PageSpeed Insights against the deployed site — and given the site's low traffic, CrUX may not have enough samples to report at all yet.

---

## 6. Where this leaves the SOP

| Phase | Status |
|---|---|
| 0 — Audit | ✅ Complete (`PHASE-0-AUDIT.md`) |
| 1 — Technical baseline | ✅ Complete except the `<html lang>` decision (`PHASE-1-REPORT.md` §3) |
| 2 — Page architecture | ✅ Complete — 2 new pages, revised from the SOP's 5 |
| 3 — On-page content | ✅ Satisfied for the new pages; built to the Phase 3 rules |
| 4 — Structured data | ✅ ~90% pre-existing; new pages carry the full graph. `sameAs` still needs real social profiles from you |
| 5 — Performance | ⚠️ Accessibility done; **performance target not met** — needs scoped architectural work |
| 6 — Verification | ⚠️ 2 of 5 gates met; 2 blocked as described above |

### Open decisions for you

1. **`<html lang>` on 18 FR pages** — recommend keeping the current JS approach.
2. **Muted-text contrast tokens** — sitewide lightening is a design call.
3. **`Content-Signal` vs SEO 100** — recommend keeping the line.
4. **Homepage JS/DOM reduction** — the only route to Performance ≥90. Worth scoping as its own piece of work.
5. **`sameAs` social profiles** and the two pricing `TODO`s in the new pages.
