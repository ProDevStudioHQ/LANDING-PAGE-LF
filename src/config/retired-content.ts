// Blog slugs that next.config.ts now 308s somewhere else.
//
// The CRM is the source of truth for the blog and it keeps returning these
// posts, so anything that renders the CRM list has to filter them out. Without
// that, the site both advertises a URL (sitemap, blog index) and redirects it
// the moment anything follows the link — telling a crawler to go somewhere in
// one breath and to go elsewhere in the next, and spending real crawl budget on
// the round trip.
//
// Keeping the list here rather than in either consumer means the sitemap and
// the blog index cannot drift apart.
//
// Keep in sync with the consolidation redirects in next.config.ts.
export const RETIRED_BLOG_SLUGS = new Set<string>([
  // Restated /services/crm-for-travel-agencies down to the FAQs; Google left it
  // at "Crawled - currently not indexed" and it now redirects there.
  "crm-for-travel-agencies-morocco",
]);

export function isRetiredBlogSlug(slug: string): boolean {
  return RETIRED_BLOG_SLUGS.has(slug);
}
