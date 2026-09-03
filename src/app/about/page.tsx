import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsStrip from "@/components/StatsStrip";
import AboutHero from "@/components/about/AboutHero";
import { FadeSection, Eyebrow, AboutCta } from "@/components/about/shared";
import { aboutPages } from "@/config/about-menu";

const SITE = "https://digitalstudiolf.online";

// Breadcrumb + AboutPage graph for the hub.
//
// This used to live in about/layout.tsx, which wraps every /about/* route —
// once the sub-pages existed, that layout would have stamped this same
// `/about#webpage` @id onto all seven URLs. Page-specific schema belongs on
// the page. The business entity is referenced by @id, never restated: the root
// layout already emits the full node on every page.
const aboutHubSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE}/about#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "About", item: `${SITE}/about` },
      ],
    },
    {
      "@type": "AboutPage",
      "@id": `${SITE}/about#webpage`,
      url: `${SITE}/about`,
      name: "About Digital Studio LF",
      description:
        "Web development studio in Marrakech, Morocco, building custom websites, admin dashboards, CRM systems, and automation for businesses worldwide.",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#business` },
      breadcrumb: { "@id": `${SITE}/about#breadcrumb` },
      mainEntity: { "@id": `${SITE}/#business` },
      inLanguage: "en",
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      {/* Inline (SSR) so crawlers see the JSON-LD without executing JS. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutHubSchema) }}
      />
      <Navbar />

      <main className="bg-black text-white overflow-x-hidden">
        <AboutHero />

        <StatsStrip />

        {/* Hub index — each card is the entry point to a full page. The sections
            these replace now live at /about/<slug>, one topic per URL. */}
        <section className="py-20 lg:py-28 border-t border-white/5">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <FadeSection className="mb-12">
              <Eyebrow>Explore</Eyebrow>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                Get to know the studio
              </h2>
              <p className="text-[#9CA3AF] text-lg max-w-[56ch]">
                How we work, what we build, and why clients stay. Each one is a
                short read.
              </p>
            </FadeSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aboutPages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/about/${p.slug}`}
                  className="group flex flex-col bg-[#141417] border border-white/8 rounded-[14px] p-6 hover:bg-[#1C1C20] hover:border-white/15 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="text-2xl mb-4 leading-none" aria-hidden="true">
                    {p.emoji}
                  </span>
                  <h3 className="text-[17px] font-bold text-white mb-2">{p.label}</h3>
                  <p className="text-[#9CA3AF] text-[14px] leading-relaxed flex-1">
                    {p.intro}
                  </p>
                  <span className="mt-4 text-[13px] font-semibold text-[#EF4444] inline-flex items-center gap-1.5">
                    Read more
                    <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <AboutCta />
      </main>

      <Footer />
    </>
  );
}
