import type { AboutPage } from "@/config/about-menu";

const SITE = "https://digitalstudiolf.online";

// Breadcrumb + WebPage graph for an /about/<slug> page.
//
// Each sub-page gets its own @id derived from its URL. The /about layout used
// to emit a single AboutPage node with a hard-coded `/about#webpage` @id; left
// as a layout-level script that node would have been repeated verbatim on every
// sub-page, giving six URLs the same entity id. The business itself is still
// referenced by @id rather than restated — the root layout already emits it.
export function aboutSubPageSchema(page: AboutPage) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "About", item: `${SITE}/about` },
          {
            "@type": "ListItem",
            position: 3,
            name: page.label,
            item: `${SITE}/about/${page.slug}`,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE}/about/${page.slug}#webpage`,
        url: `${SITE}/about/${page.slug}`,
        name: page.seoTitle,
        description: page.seoDescription,
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#business` },
      },
    ],
  };
}
