# Phase 1 — Technical baseline

**Date:** 2026-08-26 · **Commit:** `7c77a11`
**Method:** crawled all **111 sitemap URLs** twice — once live before the work, once against a local production build (`next build && next start`) after.

---

## Checklist result

| SOP Phase 1 item | Before | After |
|---|---|---|
| Exactly one `<h1>` per page | ✅ 0 violations / 111 | ✅ 0 / 111 |
| Unique `<title>` 50–60 chars | ❌ **29 out of band** | ✅ 0 repo-owned (6 CRM remain) |
| `meta description` 140–160 chars | ❌ **44 out of band** | ✅ 0 repo-owned (3 CRM remain) |
| Self-referencing absolute canonical | ✅ 0 / 111 | ✅ 0 / 111 |
| `robots.txt` → sitemap | ✅ | ✅ |
| `sitemap.xml` at build, absolute URLs | ✅ 111 URLs | ✅ 111 URLs |
| Open Graph + Twitter per page | ✅ 0 missing | ✅ 0 missing |
| Images: alt, format, dimensions, lazy | ✅ (audit error — see below) | ✅ |
| `<html lang>` matches page | ⚠️ 18 FR pages | ⚠️ **unchanged — deliberate, see §3** |
| No JS-blocked content | ✅ fully SSR | ✅ fully SSR |
| Duplicate titles | ✅ 0 groups | ✅ 0 groups |
| JSON-LD present | ✅ 111 / 111 | ✅ 111 / 111 |

---

## 1. What changed

One commit, `7c77a11`, touching 14 files — 63 lines changed, no logic touched.

| Source | Titles | Descriptions |
|---|---|---|
| `src/config/services-content.ts` | 7 | 25 |
| `src/config/about-menu.ts` | 5 | 5 |
| `src/config/solutions.ts` (FR sector pages) | 2 | 5 |
| 11 individual `page.tsx` files | 6 | 5 |

**Nearly every violation was a title or description that was too *short*, not too long** — wasting SERP width rather than truncating. Only one description on the whole site was too long: `/fr/prix-creation-site-web-maroc` at 167 chars, now trimmed to 151.

Added copy is factual and **varies per page** — each service's own delivery time from its config entry, or the Marrakesh base — rather than one boilerplate tail appended to 25 pages, which would read as templated.

### Concern worth stating

The 140–160 character band is an SOP rule, not a Google requirement. Descriptions at 120–139 chars were not *broken*; Google truncates around 155–160 but does not penalise shorter ones. Padding 25 descriptions to satisfy a character count is low-yield SEO. I did it because the SOP specifies it and wrote genuinely informative additions rather than filler — but this is the least valuable work in the whole plan, and it is not what will move position 18.9.

---

## 2. Correction to the Phase 0 audit

The audit called alt text "the weakest area found", citing 11 `alt` attributes across `src/`. **That was wrong.** I compared the count to the 111-page total instead of to the number of images that actually exist. There are **10 `<Image>` elements in the whole repo** — the site is text/CSS-driven, not image-heavy — and every one already has descriptive alt, explicit dimensions, correct `sizes`, `loading="lazy"` below the fold, and `priority` on LCP candidates.

No alt-text work was needed or done. `PHASE-0-AUDIT.md` §8 has been corrected.

---

## 3. `<html lang>` on French pages — recommend keeping the current approach

This is the one Phase 1 item left unchanged, and it is a deliberate call, not an omission.

**The situation.** `src/app/layout.tsx` hardcodes `<html lang="en">`. The 18 `/fr/*` pages correct it to `fr` with a pre-paint inline script in `src/app/fr/layout.tsx`. So the initial HTML byte stream says `en` on French pages.

**The only real fix** in the App Router is **multiple root layouts** — deleting `app/layout.tsx` and splitting every route into `app/(en)/…` and `app/(fr)/…` route groups, each with its own `<html>`. There is no metadata field for `lang`, and reading the pathname in the root layout requires `headers()`, which would force **every page on the site to render dynamically** and destroy the static prerendering the CSS strategy depends on.

**Why I recommend against the route-group refactor — measured, not assumed:**

1. **It would degrade every cross-language link.** Next.js does a **full page reload** when navigating between route groups with different root layouts. I checked what a French page actually links to: `/`, `/about`, `/services`, `/blog`, `/contact`, `/portfolio`, `/shop`, `/faq`, plus the 38-link footer service directory — **roughly 50 EN links on every FR page**. All 50 would become hard navigations, on all 18 FR pages.
2. **The SEO gain is marginal.** Googlebot executes JavaScript and already sees `lang="fr"`. The benefit is limited to non-JS crawlers and a brief pre-hydration window for screen readers.
3. **The language signal is already carried elsewhere.** Every FR page correctly emits `og:locale: fr_MA` (verified in rendered HTML), uses natively French URL slugs, and serves entirely French content.
4. **The current approach is a documented, deliberate trade-off** by whoever built this, with the reasoning written into `src/app/fr/layout.tsx`. SOP §10 says to flag conflicts rather than silently rewrite the plan.

Trading ~900 hard navigations for a signal Googlebot already receives is a bad exchange. **This is your call — say the word and I'll do the refactor**, but I would not choose it.

---

## 4. What this repo cannot fix

Still out of band after the work, all **CRM-authored**, none settable from this repo:

| Page | Issue |
|---|---|
| `/` (homepage) | title + description come from the CRM "Landing Page Brain" and override the code |
| 5 `/blog/*` posts | titles 38–63 chars |
| 3 `/blog/*` posts | descriptions 135–138 chars |
| 2 `/portfolio/*` items | titles 42–47 chars |

These need editing in the CRM by you.

---

## 5. Verification performed

```
npx tsc --noEmit      # clean
npx eslint src        # clean
npx next build        # succeeds, zero errors
```

Then `next start` on a local port and a full re-crawl of all 111 URLs, asserting: h1 count, title length, description length, canonical self-reference, JSON-LD presence, `og:title`, `twitter:card`, `<html lang>`, and title uniqueness across the site.

Encoding was explicitly verified after the scripted rewrites — 78 en-dashes and 180 em-dashes intact, **zero U+FFFD replacement characters** introduced.

---

## 6. Next

Phase 1 is complete apart from the `lang` decision in §3. **Phase 2 is still blocked on the question from `PHASE-0-AUDIT.md` §12.1** — whether to build the SOP's 5 routes (3 of which duplicate existing pages) or my revised 2-page plan: `/multilingual-website-design` and `/website-redesign`, plus rewriting `/web-design-morocco` around "affordable" and "small business", which appear **zero times** on the pages meant to rank for the P0 query.
