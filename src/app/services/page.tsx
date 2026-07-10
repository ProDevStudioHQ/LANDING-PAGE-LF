import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesBrowser from "@/components/ServicesBrowser";
import { serviceGroups } from "@/config/services";
import { SITE_URL } from "@/config/services-content";
import { pageGraphJson, breadcrumbNode, BUSINESS_ID, WEBSITE_ID } from "@/lib/schema";

export const metadata: Metadata = {
  // 45–60 chars for SERPs (the previous 32-char title wasted keyword space).
  title: { absolute: "Web Design, Dashboards & CRM Services | Digital Studio LF" },
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

const SERVICES_URL = `${SITE_URL}/services`;
const BREADCRUMB_ID = `${SERVICES_URL}#breadcrumb`;

// One connected @graph: CollectionPage (listing-page rich result) whose
// mainEntity ItemList carries full Service nodes — each typed by its category
// and tied to the business identity via provider @id — plus a linked breadcrumb.
const jsonLd = pageGraphJson(
  {
    "@type": "CollectionPage",
    "@id": `${SERVICES_URL}#webpage`,
    name: "Web Design, Dashboards & CRM Services",
    description:
      "Custom-built websites, e-commerce, dashboards, CRMs, booking systems, AI automation and authentication — delivered in 7–21 days by Digital Studio LF.",
    url: SERVICES_URL,
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    mainEntity: {
      "@type": "ItemList",
      name: "Digital Studio LF Services",
      numberOfItems: serviceGroups.reduce((n, g) => n + g.items.length, 0),
      itemListElement: serviceGroups
        .flatMap((g) => g.items.map((item) => ({ item, group: g.title })))
        .map(({ item, group }, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            "@id": `${SITE_URL}${item.href}`,
            name: item.label,
            serviceType: group,
            url: `${SITE_URL}${item.href}`,
            provider: { "@id": BUSINESS_ID },
          },
        })),
    },
  },
  {
    ...breadcrumbNode([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
    "@id": BREADCRUMB_ID,
  }
);

export default function ServicesIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
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

        {/* Editorial: what we build & why custom — substantive crawlable copy
            that supports the hub's target keywords (visible content, SSR). */}
        <section className="border-t border-white/[0.08]">
          <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-12">
            <h2 className="max-w-2xl text-2xl font-black text-[#F5F5F5] sm:text-3xl">
              Custom web development, from a single landing page to a full business system
            </h2>
            <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-5 text-[17px] leading-relaxed text-[#B0B0B8]">
                <p>
                  Every service above is built custom — designed around your business,
                  your customers, and your goals, not adapted from a purchased template.
                  We work with modern, production-grade technology (Next.js, React,
                  Node.js, PostgreSQL) so your website or system is fast, secure, and
                  ready to grow with you.
                </p>
                <p>
                  <strong className="font-semibold text-white/80">Websites & e-commerce:</strong>{" "}
                  from high-converting landing pages and full business websites to online
                  stores, marketplaces, and subscription platforms. Every build ships with
                  on-page SEO, mobile-first responsive design, and sub-second load times.
                </p>
                <p>
                  <strong className="font-semibold text-white/80">Dashboards, portals & CRM:</strong>{" "}
                  admin dashboards, analytics interfaces, customer and employee portals,
                  and custom CRM systems shaped around how your team actually works —
                  including our speciality, CRM for travel agencies and tour operators.
                </p>
                <p>
                  <strong className="font-semibold text-white/80">Booking, AI & automation:</strong>{" "}
                  reservation systems for riads, hotels, and restaurants; AI chatbots;
                  and workflow automation that connects the tools you already use so
                  routine work runs itself.
                </p>
              </div>
              <div className="space-y-5 text-[17px] leading-relaxed text-[#B0B0B8]">
                <p>
                  <strong className="font-semibold text-white/80">Fixed prices, real timelines.</strong>{" "}
                  Every project gets a written proposal with a fixed price and a fixed
                  delivery window of 7–21 days depending on scope. Starter projects ship
                  in about a week; larger systems in about three. You always know what
                  you&apos;re paying and when you&apos;re launching.
                </p>
                <p>
                  <strong className="font-semibold text-white/80">Built in Marrakesh, delivered worldwide.</strong>{" "}
                  We serve businesses across Morocco — riads, hotels, restaurants, travel
                  agencies, real estate — and startups and agencies in Europe and North
                  America. Full project delivery in English, French, or Arabic, with
                  multilingual builds a standard part of our work.
                </p>
                <p>
                  <strong className="font-semibold text-white/80">Direct with the builder.</strong>{" "}
                  No account managers or ticket queues: you talk to the founder building
                  your project, with replies usually under two hours during working
                  hours, and 30 days of free post-launch support on every package.
                </p>
                <p>
                  Not sure which category fits? Most clients come to us with a goal —
                  more bookings, more leads, less manual admin — and we scope the right
                  solution together on a{" "}
                  <Link href="/contact" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                    free 30-minute consultation
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

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
