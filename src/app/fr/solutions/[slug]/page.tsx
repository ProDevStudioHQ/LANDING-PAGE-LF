import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionPage from "@/components/solutions/SolutionPage";
import { solutions, getSolution, solutionHref } from "@/config/solutions";

const SITE = "https://digitalstudiolf.online";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  const url = `${SITE}${solutionHref(s.slug)}`;
  return {
    // absolute: the root layout appends "| Digital Studio LF", and the SOP caps
    // the title at 60 characters — the suffix would push every one of these over.
    title: { absolute: s.seoTitle },
    description: s.seoDescription,
    alternates: {
      // No hreflang yet. The English twins (/en/solutions/*) are weeks 6–8 of
      // the SOP's build order and do not exist; declaring an alternate that
      // 404s is worse than declaring none. Add both sides together, never one.
      canonical: solutionHref(s.slug),
    },
    openGraph: {
      type: "website",
      title: s.seoTitle,
      description: s.seoDescription,
      url,
      locale: "fr_MA",
      images: ["https://digitalstudiolf.online/images/og-home.jpg"],
    },
  };
}

// Service + FAQPage + BreadcrumbList, as one connected @graph.
//
// areaServed is set per the SOP: Marrakech for the city-targeted sectors,
// Morocco for the ones whose keyword is national. The Service node points at
// the sitewide business entity by @id rather than restating it — the root
// layout already emits that node on every page.
function graphFor(slug: string) {
  const s = getSolution(slug)!;
  const url = `${SITE}${solutionHref(s.slug)}`;
  const national = s.slug.endsWith("-maroc");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: s.h1,
        serviceType: s.eyebrow,
        description: s.seoDescription,
        url,
        provider: { "@id": `${SITE}/#business` },
        areaServed: national
          ? [{ "@type": "Country", name: "Maroc" }]
          : [
              { "@type": "City", name: "Marrakech" },
              { "@type": "AdministrativeArea", name: "Marrakech-Safi" },
            ],
        availableLanguage: ["Français", "Anglais", "Arabe"],
        offers: {
          "@type": "Offer",
          price: s.packages[0].priceMad.replace(/[^\d]/g, ""),
          priceCurrency: "MAD",
          description: `${s.packages[0].name} — à partir de ${s.packages[0].priceMad}`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: s.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
          { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE}/fr/solutions` },
          { "@type": "ListItem", position: 3, name: s.breadcrumbLabel, item: url },
        ],
      },
    ],
  };
}

export default async function SolutionSlugPage({ params }: Params) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphFor(slug)) }}
      />
      <SolutionPage solution={s} />
    </>
  );
}
