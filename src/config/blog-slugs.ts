// Public blog slugs that differ from the slug the CRM stores.
//
// The CRM's slug generator appended a second, truncated copy of the title to
// some slugs ("secure-client-portal-for-riads-marrakesh-secure-client-porta").
// Those URLs were indexed as-is. The CRM is the source of truth for the posts
// and its slugs cannot be edited from this repo, so the clean slug is applied
// here instead:
//
//   - the site links, lists and canonicalises the post at /blog/<clean>
//   - /blog/<clean> fetches the post from the CRM under its stored slug
//   - /blog/<crm-slug> and /news/<crm-slug> 301 to /blog/<clean> (next.config.ts)
//
// If the CRM slug is later renamed to the clean one, nothing breaks: the blog
// page falls back to fetching the public slug directly, and the entry here can
// then be deleted (keep the redirect).
//
// No imports: next.config.ts reads this file too.
export const BLOG_SLUG_RENAMES: Record<string, string> = {
  "secure-client-portal-for-riads-marrakesh-secure-client-porta":
    "secure-client-portal-riads-marrakesh",
  "direct-booking-landing-page-for-riads-direct-booking-landing":
    "direct-booking-landing-page-riads",
  "bilingual-booking-portal-for-riads-marrakesh-bilingual-booki":
    "bilingual-booking-portal-riads-marrakesh",
  // The English price guide (keyword cannibalization, Group A). Also the
  // destination of the old /news|/blog/how-much-does-a-website-cost-in-morocco
  // URLs in next.config.ts.
  "what-affects-website-pricing-in-morocco-what-affects-website":
    "website-cost-morocco",
};

// Posts merged into another page (keyword cannibalization fix): CRM slug ->
// the page that now owns the topic. They are 301'd there, dropped from the
// sitemap and the blog index (src/config/retired-content.ts), and links to
// them inside other articles are rewritten to the destination.
//
// Unpublishing them in the CRM is optional once the redirect is live.
export const BLOG_MERGED: Record<string, string> = {
  // Same intent as the French Marrakech agency page, which now carries the
  // post's useful sections (services, how to choose, local SEO, price factors).
  "agence-web-marrakech-top-selection-et-services": "/fr/agence-web-marrakech",
  // Duplicate of the stronger riad cost post (position 14.5 vs this one).
  "cost-to-build-a-riad-website-cost-build-riad-website-options":
    "/blog/riad-website-cost-marrakesh",
};

const CRM_SLUG_BY_PUBLIC = Object.fromEntries(
  Object.entries(BLOG_SLUG_RENAMES).map(([crm, pub]) => [pub, crm])
);

/** The slug a post is published under on this site. */
export function publicBlogSlug(crmSlug: string): string {
  return BLOG_SLUG_RENAMES[crmSlug] ?? crmSlug;
}

/** The slug to request from the CRM for a public /blog/<slug> URL. */
export function crmBlogSlug(publicSlug: string): string {
  return CRM_SLUG_BY_PUBLIC[publicSlug] ?? publicSlug;
}

// Old blog slugs that next.config.ts sends to another page, mapped to that
// final destination. CRM-authored article bodies still link to some of them,
// and an internal link into a redirect costs a round trip and passes less than
// a direct one, so the blog page rewrites those hrefs on render.
//
// Keep in sync with the redirects in next.config.ts.
export const BLOG_LINK_TARGETS: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(BLOG_SLUG_RENAMES).map(([crm, pub]) => [crm, `/blog/${pub}`])
  ),
  ...BLOG_MERGED,
  "crm-for-travel-agencies-morocco": "/services/crm-for-travel-agencies",
};

/** 301s for every renamed or merged slug, under both /blog and legacy /news. */
export const blogSlugRedirects = [
  ...Object.entries(BLOG_SLUG_RENAMES).map(([crm, pub]) => [crm, `/blog/${pub}`]),
  ...Object.entries(BLOG_MERGED),
].flatMap(([crm, destination]) => [
  { source: `/blog/${crm}`, destination, permanent: true },
  { source: `/news/${crm}`, destination, permanent: true },
]);

// English blog posts with a French translation of the same topic. Emitted as
// reciprocal hreflang by the blog page and by the French page.
export const BLOG_HREFLANG_FR: Record<string, string> = {
  "website-cost-morocco": "/fr/prix-creation-site-web-maroc",
};
