import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { serviceGroups } from "@/config/services";
import { SITE_URL, getServiceContent, getAccent, priceLabel } from "@/config/services-content";

export const metadata: Metadata = {
  title: { absolute: "Services — Websites, Dashboards & CRMs | Digital Studio LF" },
  description:
    "Every Digital Studio LF service: websites, e-commerce, dashboards, CRMs, booking systems, AI automation & auth. Built in Marrakesh, delivered worldwide.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "All Services | Digital Studio LF",
    description:
      "Websites, e-commerce, dashboards, CRMs, booking systems, AI automation, and more. Based in Marrakesh, serving businesses worldwide.",
    url: `${SITE_URL}/services`,
    images: [{ url: `${SITE_URL}/images/idea-digital.png`, width: 1200, height: 630, alt: "Digital Studio LF — Services" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/images/idea-digital.png`],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Digital Studio LF Services",
  itemListElement: serviceGroups.flatMap((g) =>
    g.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      url: `${SITE_URL}${item.href}`,
    }))
  ),
};

export default function ServicesIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-white/40 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Services</span>
          </nav>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            All Services — Websites, Dashboards,<br />
            <span className="text-primary">CRMs &amp; More</span>
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Based in Marrakesh, we build premium digital products for businesses across Morocco and
            worldwide — delivered in 7–21 days with clean code, elegant design, and full SEO.
          </p>
        </section>

        {/* Grouped services */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
          {serviceGroups.map((group) => {
            const accent = getAccent(group.title);
            return (
              <div key={group.title}>
                <h2 className="text-2xl sm:text-3xl font-black mb-6 flex items-center gap-3">
                  <span className={`inline-block w-2 h-7 rounded-full bg-gradient-to-b ${accent.gradient}`} aria-hidden="true" />
                  {group.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map((item) => {
                    const content = getServiceContent(item.href.split("/").pop() ?? "");
                    const desc = content?.subheadline ?? "";
                    const price = content ? priceLabel(content) : "Contact us";
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group relative glass rounded-2xl p-6 border border-white/10 ${accent.hoverBorder} transition-all duration-300`}
                      >
                        <p className={`text-xs font-bold tracking-widest uppercase mb-2 ${accent.text}`}>{price}</p>
                        <h3 className="text-lg font-bold mb-2">{item.label}</h3>
                        {desc && <p className="text-white/50 text-sm leading-relaxed mb-4">{desc}</p>}
                        <span className={`text-sm font-semibold ${accent.text}`}>Learn more →</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
