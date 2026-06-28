import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import ServicesQuickNav from "@/components/ServicesQuickNav";
import { serviceGroups } from "@/config/services";
import { SITE_URL, getServiceContent, priceLabel } from "@/config/services-content";

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

// Anchor id from a category title (stable, presentation-only).
function categoryId(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Short label for the quick-nav pills + a one-line gray description per category.
// Presentation copy only — category data itself still comes from the config.
const CATEGORY_META: Record<string, { nav: string; description: string }> = {
  Websites: {
    nav: "Websites",
    description: "Landing pages, business sites, and industry-specific websites that convert.",
  },
  "E-Commerce": {
    nav: "E-Commerce",
    description: "Online stores, marketplaces, and subscription platforms built to sell.",
  },
  "Dashboards & Portals": {
    nav: "Dashboards",
    description: "Real-time admin, analytics, and self-service portals for your team and clients.",
  },
  "CRM & Business Systems": {
    nav: "CRM",
    description: "Custom CRMs and internal tools shaped around how your business actually works.",
  },
  "Booking & Reservations": {
    nav: "Booking",
    description: "Direct booking and reservation systems that fill your calendar — no OTA fees.",
  },
  "AI & Automation": {
    nav: "AI",
    description: "Chatbots, WhatsApp, and workflow automation that save hours every week.",
  },
  Authentication: {
    nav: "Auth",
    description: "Secure login, user portals, and authentication systems done right.",
  },
  "Niche / Special": {
    nav: "Niche",
    description: "Specialised solutions for travel, startups, and the Moroccan market.",
  },
  Enterprise: {
    nav: "Enterprise",
    description: "Large-scale, bespoke platforms built to your exact requirements.",
  },
};

const navItems = serviceGroups.map((g) => ({
  id: categoryId(g.title),
  label: CATEGORY_META[g.title]?.nav ?? g.title,
}));

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
              Custom-built solutions delivered in 7–21 days. Pick a service to learn more, or{" "}
              <Link href="/contact" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                get in touch
              </Link>{" "}
              for a custom project.
            </p>
          </section>
        </div>

        {/* Sticky category quick-nav */}
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
          <ServicesQuickNav items={navItems} />
        </div>

        {/* Category sections */}
        <div className="mx-auto max-w-[1240px] px-6 pb-24 lg:px-12">
          <div className="space-y-16 pt-12 sm:space-y-20">
            {serviceGroups.map((group) => {
              const id = categoryId(group.title);
              const meta = CATEGORY_META[group.title];
              return (
                <section key={group.title} id={id} className="scroll-mt-32">
                  <header className="mb-6 border-b border-white/[0.08] pb-4">
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6E6E76]">
                      {group.title}
                    </p>
                    <h2 className="sr-only">{group.title}</h2>
                    {meta?.description && (
                      <p className="max-w-2xl text-sm leading-relaxed text-[#B0B0B8] sm:text-[15px]">
                        {meta.description}
                      </p>
                    )}
                  </header>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {group.items.map((item, i) => {
                      const content = getServiceContent(item.href.split("/").pop() ?? "");
                      // Enterprise (and anything contact-only) shows a clean "Contact" chip.
                      const isEnterprise = group.title === "Enterprise" || content?.isContactOnly;
                      const price = isEnterprise ? "Contact" : content ? priceLabel(content) : "Contact us";
                      return (
                        <ServiceCard
                          key={item.href}
                          href={item.href}
                          title={item.label}
                          description={content?.subheadline}
                          price={price}
                          index={i}
                        />
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
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
