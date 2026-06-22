import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const projects = [
  {
    title: "Travel Agency CRM — Morocco",
    category: "CRM System",
    description:
      "Full CRM system for a Marrakesh-based travel agency: lead pipeline, booking tracker, client profiles, automated email follow-ups, and revenue reporting dashboard.",
    tags: ["CRM", "Next.js", "PostgreSQL", "Morocco"],
    color: "emerald",
  },
  {
    title: "Riad Booking Website — Marrakesh",
    category: "Business Website",
    description:
      "Trilingual (English, French, Arabic) showcase and booking-request site for a luxury riad in Marrakesh. Includes room pages, gallery, local guide section, and WhatsApp integration.",
    tags: ["Website", "Multilingual", "Hospitality", "Morocco"],
    color: "primary",
  },
  {
    title: "SaaS Admin Dashboard",
    category: "Admin Dashboard",
    description:
      "Multi-role admin dashboard for a B2B SaaS platform: user management, subscription analytics, revenue charts, activity logs, and CSV/PDF exports.",
    tags: ["Dashboard", "SaaS", "Role-based Access", "Analytics"],
    color: "blue",
  },
  {
    title: "Tour Operator Landing Page",
    category: "Landing Page",
    description:
      "High-converting bilingual landing page for a Moroccan desert tour operator: tour showcase, trust badges, testimonials, booking form, and Google Analytics conversion tracking.",
    tags: ["Landing Page", "Tourism", "Morocco", "Conversion"],
    color: "orange",
  },
  {
    title: "Real Estate Agency Website — Marrakesh",
    category: "Business Website",
    description:
      "Property listing website for a Marrakesh real estate agency targeting French and UK buyers. Includes property search, filtering, enquiry forms, and local SEO.",
    tags: ["Website", "Real Estate", "French", "Morocco"],
    color: "primary",
  },
  {
    title: "Restaurant Website — Marrakech Medina",
    category: "Business Website",
    description:
      "Bilingual (French/English) restaurant website for a traditional Moroccan restaurant in the medina: menu showcase, reservation form, events page, and Google Maps integration.",
    tags: ["Website", "Restaurant", "Bilingual", "Morocco"],
    color: "orange",
  },
];

const colorMap: Record<string, string> = {
  emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
  primary: "text-primary border-primary/20 bg-primary/10",
  blue: "text-blue-400 border-blue-500/20 bg-blue-500/10",
  orange: "text-orange-400 border-orange-500/20 bg-orange-500/10",
};

export default function PortfolioPage() {
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
            Full interactive portfolio available at{" "}
            <a
              href="https://crm.digitalstudiolf.online/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              crm.digitalstudiolf.online/portfolio
            </a>
          </p>
        </section>

        {/* Projects */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => {
              const cls = colorMap[p.color] ?? colorMap["primary"];
              return (
                <div key={p.title} className="glass rounded-2xl p-7 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <span className={`inline-block px-3 py-1 rounded-full border text-xs font-medium mb-4 ${cls}`}>
                    {p.category}
                  </span>
                  <h2 className="text-lg font-bold mb-3 text-white">{p.title}</h2>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-zinc-800 text-xs text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA to full portfolio */}
          <div className="mt-16 text-center">
            <p className="text-white/40 text-sm mb-4">See the full interactive portfolio with live previews</p>
            <a
              href="https://crm.digitalstudiolf.online/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-all duration-300"
            >
              View full portfolio →
            </a>
          </div>
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
