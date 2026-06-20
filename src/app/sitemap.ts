import type { MetadataRoute } from "next";

const SITE_URL = "https://digitalstudiolf.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    // Core pages
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // Service pages
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services/landing-pages`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services/business-websites`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services/admin-dashboards`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services/crm-systems`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services/login-pages`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/enterprise-solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/crm-for-travel-agencies`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // Local SEO & portfolio
    { url: `${SITE_URL}/web-design-morocco`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },

    // News / blog index + articles
    { url: `${SITE_URL}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/news/how-much-does-a-website-cost-in-morocco`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/news/websites-for-riads-and-hotels-marrakesh`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/news/websites-in-french-for-moroccan-clients`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/news/landing-page-vs-website-difference`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/news/how-long-does-it-take-to-build-a-website`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/news/can-you-build-a-custom-crm-for-my-business`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Legal
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/gdpr`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
