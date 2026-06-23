import type { MetadataRoute } from "next";
import { serviceGroups } from "@/config/services";
import { getPortfolioList, getNewsList, getProductsList } from "@/lib/crm-content";

const SITE_URL = "https://digitalstudiolf.online";

// Refresh the sitemap on the same ISR cadence as the content.
export const revalidate = 300;

// Stable last-modified date for non-dated pages. Bump this only when the site's
// pages actually change — NOT on every build. Using new Date() here would make
// every URL's <lastmod> regenerate on each deploy, which is a misleading signal.
const LAST_UPDATED = "2026-06-23";

// Real publish/updated dates per blog post (keep in sync with the post data).
const BLOG_DATES: Record<string, string> = {
  "how-much-does-a-website-cost-in-morocco": "2026-01-15",
  "websites-for-riads-and-hotels-marrakesh": "2026-02-01",
  "websites-in-french-for-moroccan-clients": "2026-02-15",
  "landing-page-vs-website-difference": "2026-03-01",
  "how-long-does-it-take-to-build-a-website": "2026-03-15",
  "can-you-build-a-custom-crm-for-my-business": "2026-04-01",
  "how-much-does-a-custom-crm-cost": "2026-05-01",
  "wix-vs-custom-website": "2026-05-15",
  "direct-booking-website-without-booking-com": "2026-06-01",
};

// Note: <priority> and <changefreq> are intentionally omitted — Google ignores
// both, so they add noise without value.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Every service from the nav config (deduped). /web-design-morocco is listed
  // separately below, so skip it here to avoid duplicates.
  const serviceUrls: MetadataRoute.Sitemap = Array.from(
    new Set(
      serviceGroups
        .flatMap((g) => g.items.map((i) => i.href))
        .filter((href) => href.startsWith("/services/"))
    )
  ).map((href) => ({
    url: `${SITE_URL}${href}`,
    lastModified: LAST_UPDATED,
  }));

  const blogUrls: MetadataRoute.Sitemap = Object.entries(BLOG_DATES).map(
    ([slug, date]) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: date,
    })
  );

  // Dynamic CRM content. Each fetch is independently guarded (the client never
  // throws), so a CRM hiccup just omits that content type — the sitemap still builds.
  const [portfolio, news, products] = await Promise.all([
    getPortfolioList("limit=50"),
    getNewsList("limit=100"),
    getProductsList("limit=60"),
  ]);

  const crmPortfolio: MetadataRoute.Sitemap = portfolio.items.map((p) => ({
    url: `${SITE_URL}/portfolio/${p.slug}`,
    lastModified: p.published_at || LAST_UPDATED,
  }));
  const crmNews: MetadataRoute.Sitemap = news.items.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updated_at || p.published_at || LAST_UPDATED,
  }));
  const crmProducts: MetadataRoute.Sitemap = products.items.map((p) => ({
    url: `${SITE_URL}/shop/${p.slug}`,
    lastModified: p.published_at || LAST_UPDATED,
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    // Core pages
    { url: `${SITE_URL}/`, lastModified: LAST_UPDATED },
    { url: `${SITE_URL}/about`, lastModified: LAST_UPDATED },
    { url: `${SITE_URL}/contact`, lastModified: LAST_UPDATED },

    // Services hub + every individual service page (from config)
    { url: `${SITE_URL}/services`, lastModified: LAST_UPDATED },
    ...serviceUrls,

    // Local SEO & portfolio
    { url: `${SITE_URL}/web-design-morocco`, lastModified: LAST_UPDATED },
    { url: `${SITE_URL}/portfolio`, lastModified: LAST_UPDATED },

    // French local pages (Morocco)
    { url: `${SITE_URL}/fr/creation-site-web-maroc`, lastModified: LAST_UPDATED },
    { url: `${SITE_URL}/fr/agence-web-marrakech`, lastModified: LAST_UPDATED },

    // Niche pages (USA/Europe)
    { url: `${SITE_URL}/booking-websites-for-hotels`, lastModified: LAST_UPDATED },
    { url: `${SITE_URL}/web-developer-for-startups`, lastModified: LAST_UPDATED },

    // Blog index + static articles (real publish dates) + Shop index
    { url: `${SITE_URL}/blog`, lastModified: LAST_UPDATED },
    ...blogUrls,
    { url: `${SITE_URL}/shop`, lastModified: LAST_UPDATED },

    // Legal
    { url: `${SITE_URL}/privacy`, lastModified: LAST_UPDATED },
    { url: `${SITE_URL}/terms`, lastModified: LAST_UPDATED },
    { url: `${SITE_URL}/cookies`, lastModified: LAST_UPDATED },
    { url: `${SITE_URL}/gdpr`, lastModified: LAST_UPDATED },
  ];

  // Merge, de-duplicating by URL (CRM slugs may overlap static blog slugs during
  // migration). First occurrence wins (static dates are intentional).
  const seen = new Set<string>();
  return [...staticEntries, ...crmPortfolio, ...crmNews, ...crmProducts].filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}
