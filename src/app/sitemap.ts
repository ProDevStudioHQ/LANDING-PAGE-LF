import type { MetadataRoute } from "next";
import { serviceGroups } from "@/config/services";
import { aboutPages } from "@/config/about-menu";
import { solutions, solutionHref } from "@/config/solutions";
import { getPortfolioList, getNewsList, getProductsList } from "@/lib/crm-content";

const SITE_URL = "https://digitalstudiolf.online";

// Walk every page of a CRM list so the sitemap never silently truncates content
// once a type grows past a single page. Stops at the reported `total`, on an empty
// page, or at `hardCap` (a runaway guard well under the 50k sitemap URL limit).
async function collectAll<T>(
  fetchPage: (params: string) => Promise<{ items: T[]; total: number }>,
  pageSize = 100,
  hardCap = 5000
): Promise<T[]> {
  const first = await fetchPage(`limit=${pageSize}&page=1`);
  const all = [...first.items];
  const total = Math.min(first.total || all.length, hardCap);
  for (let page = 2; all.length < total; page++) {
    const next = await fetchPage(`limit=${pageSize}&page=${page}`);
    if (!next.items.length) break;
    all.push(...next.items);
  }
  return all.slice(0, hardCap);
}

// Refresh the sitemap on the same ISR cadence as the content.
export const revalidate = 300;

// Stable last-modified date for non-dated pages. Bump this only when the site's
// pages actually change — NOT on every build. Using new Date() here would make
// every URL's <lastmod> regenerate on each deploy, which is a misleading signal.
const LAST_UPDATED = "2026-06-23";

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

  // Dynamic CRM content. Each fetch is independently guarded (the client never
  // throws), so a CRM hiccup just omits that content type — the sitemap still builds.
  const [portfolio, news, products] = await Promise.all([
    collectAll(getPortfolioList),
    collectAll(getNewsList),
    collectAll(getProductsList),
  ]);

  const crmPortfolio: MetadataRoute.Sitemap = portfolio.map((p) => ({
    url: `${SITE_URL}/portfolio/${p.slug}`,
    lastModified: p.published_at || LAST_UPDATED,
  }));
  const crmNews: MetadataRoute.Sitemap = news.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updated_at || p.published_at || LAST_UPDATED,
  }));
  const crmProducts: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/shop/${p.slug}`,
    lastModified: p.published_at || LAST_UPDATED,
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    // Core pages. No trailing slash on the homepage: `trailingSlash` is off, so
    // the rendered canonical and og:url are both the bare origin. Listing
    // "…online/" here stated a different string for the same page in two
    // artifacts crawlers read side by side.
    { url: SITE_URL, lastModified: LAST_UPDATED },
    { url: `${SITE_URL}/about`, lastModified: LAST_UPDATED },
    // About hub + one page per topic (from config)
    ...aboutPages.map((p) => ({
      url: `${SITE_URL}/about/${p.slug}`,
      lastModified: LAST_UPDATED,
    })),
    { url: `${SITE_URL}/contact`, lastModified: LAST_UPDATED },
    { url: `${SITE_URL}/faq`, lastModified: LAST_UPDATED },
    // The human-readable sitemap page. It builds and is linked from the footer,
    // but was missing from the XML — it is a legitimate indexable hub page.
    { url: `${SITE_URL}/sitemap`, lastModified: LAST_UPDATED },

    // Services hub + every individual service page (from config)
    { url: `${SITE_URL}/services`, lastModified: LAST_UPDATED },
    ...serviceUrls,

    // Local SEO & portfolio
    { url: `${SITE_URL}/web-design-morocco`, lastModified: LAST_UPDATED },
    { url: `${SITE_URL}/portfolio`, lastModified: LAST_UPDATED },

    // French local pages (Morocco)
    { url: `${SITE_URL}/fr/creation-site-web-maroc`, lastModified: LAST_UPDATED },
    { url: `${SITE_URL}/fr/agence-web-marrakech`, lastModified: LAST_UPDATED },
    { url: `${SITE_URL}/fr/prix-creation-site-web-maroc`, lastModified: "2026-07-11" },
    { url: `${SITE_URL}/fr/creation-site-ecommerce-maroc`, lastModified: LAST_UPDATED },
    { url: `${SITE_URL}/fr/contact`, lastModified: LAST_UPDATED },

    // Sector solution pages (from config)
    { url: `${SITE_URL}/fr/solutions`, lastModified: LAST_UPDATED },
    ...solutions.map((s) => ({
      url: `${SITE_URL}${solutionHref(s.slug)}`,
      lastModified: LAST_UPDATED,
    })),

    // Niche pages (USA/Europe)
    { url: `${SITE_URL}/booking-websites-for-hotels`, lastModified: LAST_UPDATED },
    { url: `${SITE_URL}/web-developer-for-startups`, lastModified: LAST_UPDATED },

    // Blog index + Shop index (article/product URLs come from the CRM below)
    { url: `${SITE_URL}/blog`, lastModified: LAST_UPDATED },
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
