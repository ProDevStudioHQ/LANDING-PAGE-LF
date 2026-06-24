import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPortfolioList } from "@/lib/crm-content";

// ISR — refresh from the CRM every 5 minutes (matches the CRM cache TTL).
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Our Portfolio — Web & CRM Projects",
  description:
    "Browse Digital Studio LF's portfolio of custom websites, admin dashboards, CRM systems, and landing pages built for businesses in Morocco and worldwide.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio | Digital Studio LF",
    description:
      "Custom websites, dashboards, CRM systems, and landing pages built for businesses in Morocco and worldwide.",
    url: "https://digitalstudiolf.online/portfolio",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://digitalstudiolf.online/portfolio" },
  ],
};

export default async function PortfolioPage() {
  // Read live projects from the CRM (one source of truth). If unreachable/empty,
  // the grid shows a graceful empty state below.
  const { items: crmItems } = await getPortfolioList("limit=50");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <nav className="text-sm text-white/40 mb-8 flex justify-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Portfolio</span>
          </nav>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            Our Work
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Projects We&apos;ve Built
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed mb-4">
            Custom websites, dashboards, CRM systems, and landing pages for businesses in Morocco and worldwide.
          </p>
          <p className="text-white/35 text-sm max-w-xl mx-auto">
            Browse our latest projects below.
          </p>
        </section>

        {/* Projects */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {crmItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crmItems.map((p) => {
                const img = p.thumbnail_url || p.hero_image_url;
                return (
                  <Link
                    key={p.slug}
                    href={`/portfolio/${p.slug}`}
                    className="group glass rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-300 flex flex-col"
                  >
                    {img && (
                      <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                        <Image
                          src={img}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      {p.category && (
                        <span className="inline-block self-start px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium mb-3">
                          {p.category}
                        </span>
                      )}
                      <h2 className="text-lg font-bold mb-2 text-white group-hover:text-primary transition-colors">{p.title}</h2>
                      {(p.short_description || p.subtitle) && (
                        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3">
                          {p.short_description || p.subtitle}
                        </p>
                      )}
                      {p.tech_stack?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {p.tech_stack.slice(0, 4).map((t) => (
                            <span key={t} className="px-2.5 py-1 rounded-full bg-zinc-800 text-xs text-zinc-400">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-white/40 text-center py-20">New projects are coming soon.</p>
          )}
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Ready to Build Yours?</h2>
          <p className="text-white/50 text-lg mb-8">
            Get a free consultation and custom proposal within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#contact" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full hover:scale-[1.03] transition-transform">
              Start your project
            </a>
            <Link href="/services" className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all">
              See pricing & services
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
