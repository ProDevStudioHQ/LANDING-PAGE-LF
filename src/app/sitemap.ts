import type { MetadataRoute } from "next";
import { serviceGroups } from "@/config/services";

const SITE_URL = "https://digitalstudiolf.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    // Core pages
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // Services hub + every individual service page (from config)
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...serviceUrls,

    // Local SEO & portfolio
    { url: `${SITE_URL}/web-design-morocco`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },

    // French local pages (Morocco)
    { url: `${SITE_URL}/fr/creation-site-web-maroc`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/fr/agence-web-marrakech`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // Niche pages (USA/Europe)
    { url: `${SITE_URL}/booking-websites-for-hotels`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/web-developer-for-startups`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // News / blog index + articles
    { url: `${SITE_URL}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/news/how-much-does-a-website-cost-in-morocco`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/news/websites-for-riads-and-hotels-marrakesh`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/news/websites-in-french-for-moroccan-clients`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/news/landing-page-vs-website-difference`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/news/how-long-does-it-take-to-build-a-website`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/news/can-you-build-a-custom-crm-for-my-business`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/news/how-much-does-a-custom-crm-cost`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/news/wix-vs-custom-website`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/news/direct-booking-website-without-booking-com`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // Legal
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/gdpr`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
