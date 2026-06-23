# Sitemap Validation Report — digitalstudiolf.online

> **Update 2026-06-23:** Both findings resolved — removed `<priority>`/`<changefreq>` from
> `sitemap.ts` and bumped `lastmod` (`LAST_UPDATED` → 2026-06-23, `/blog` now reflects the
> redesign). Also added `BreadcrumbList` + `Blog` JSON-LD to `/blog`.


**Date:** 2026-06-23
**Source:** `src/app/sitemap.ts` (Next.js `MetadataRoute.Sitemap`, served at `/sitemap.xml`)
**Method:** Rendered the production sitemap and HTTP-checked every URL.

## Summary

| Check | Result |
|-------|--------|
| Valid XML | ✅ Pass (Next.js-generated) |
| URL count | ✅ 63 URLs (well under the 50,000 limit — single file is correct) |
| Duplicate URLs | ✅ None |
| All URLs HTTP 200 | ✅ All 63 return 200 (incl. config-driven `/services/*` via the `[slug]` route) |
| HTTPS only | ✅ All URLs HTTPS |
| Noindex URLs excluded | ✅ Only `not-found` is `noindex`, and it is not in the sitemap |
| Non-canonical URLs | ✅ None — every page's canonical is self-referential |
| Redirected URLs | ✅ None detected |
| Referenced in robots.txt | ✅ `Sitemap: https://digitalstudiolf.online/sitemap.xml` |
| `<lastmod>` accuracy | ⚠️ Mostly good — 9 blog posts use real publish dates; 53 evergreen pages share `2026-06-22` (intentional, documented in `sitemap.ts`) |
| Deprecated tags | ℹ️ `<priority>` and `<changefreq>` present on all 63 URLs — **ignored by Google** |

## Issues

| Issue | Severity | Detail | Fix |
|-------|----------|--------|-----|
| `<priority>` / `<changefreq>` on every URL | Info | Google ignores both; they add noise but cause no harm. They appear because `sitemap.ts` sets `priority` / `changeFrequency` on each entry. | Remove those fields from `sitemap.ts` (optional cleanup). |
| `<lastmod>` stale for recently-edited pages | Low | The blog index + several pages were redesigned 2026-06-23, but `LAST_UPDATED` is `2026-06-22` and `/blog` reports the newest article's date (`2026-06-01`). | Bump `LAST_UPDATED` to the real edit date; optionally give `/blog` a fresher `lastmod`. |

## Verdict

The sitemap is **valid and healthy** — no critical, high, or medium issues. Everything resolves
to 200, canonicals are clean, no noindexed/redirected URLs leak in, and it is referenced in
robots.txt. The only findings are an Info-level deprecated-tag cleanup and a Low-level `lastmod`
freshness nudge — neither blocks indexing.
