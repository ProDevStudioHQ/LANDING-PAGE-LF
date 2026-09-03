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
  const url = `${SITE}/about/${page.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        // Addressable, so the page node below can point at it. Without an @id
        // the crumb trail sat in the graph attached to nothing.
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "About", item: `${SITE}/about` },
          {
            "@type": "ListItem",
            position: 3,
            name: page.label,
            item: url,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.seoTitle,
        description: page.seoDescription,
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#business` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${SITE}/#business` },
        inLanguage: "en",
      },
    ],
  };
}
