import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesBrowser from "@/components/ServicesBrowser";
import { serviceGroups } from "@/config/services";
import { SITE_URL } from "@/config/services-content";

export const metadata: Metadata = {
  title: { absolute: "Our Services | Digital Studio LF" },
  description:
    "Custom-built websites, e-commerce, dashboards, CRMs, booking systems, AI automation & auth — delivered in 7–21 days. Built in Marrakesh, delivered worldwide.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services | Digital Studio LF",
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
  itemListElement: serviceGroups
    .flatMap((g) => g.items)
    .map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      url: `${SITE_URL}${item.href}`,
    })),
};

export default function ServicesIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Navbar />
      <main className="relative min-h-screen bg-[#0A0A0B] text-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
          {/* Hero */}
          <section className="pt-36 pb-12 sm:pt-40 sm:pb-16">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#6E6E76]">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[#9CA3AF]">Services</span>
            </nav>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Services</p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-[#F5F5F5] sm:text-5xl">
              Our Services — Websites, Dashboards, CRMs &amp; More
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#B0B0B8]">
              Custom-built solutions delivered in 7–21 days. Pick a category to filter, choose a service to
              learn more, or{" "}
              <Link href="/contact" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                get in touch
              </Link>{" "}
              for a custom project.
            </p>
          </section>
        </div>

        {/* Filterable, category-grouped card grid */}
        <div className="mx-auto max-w-[1240px] px-6 pb-24 lg:px-12">
          <ServicesBrowser />
        </div>

        {/* Bottom CTA band */}
        <section className="relative overflow-hidden border-t border-white/[0.08] bg-[#0A0A0B]">
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          </div>
          <div className="relative mx-auto max-w-[1240px] px-6 py-20 text-center lg:px-12">
            <h2 className="text-2xl font-black text-[#F5F5F5] sm:text-3xl">Not sure which service you need?</h2>
            <p className="mx-auto mt-3 max-w-xl text-[#B0B0B8]">
              Book a free 30-minute consultation and we&apos;ll help you scope the right solution — no commitment.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-dark px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Book a free consultation
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
