import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Enterprise Web Development — Custom Quote",
  description:
    "Enterprise web development for large businesses: multi-role platforms, advanced workflows, API integrations, scalable architecture, and premium support. Custom quote.",
  alternates: { canonical: "/services/enterprise-solutions" },
  openGraph: {
    title: "Enterprise Web Development | Digital Studio LF",
    description: "Advanced custom systems for large businesses: multi-role platforms, API integrations, scalable architecture. Custom quote, 21-day delivery.",
    url: "https://digitalstudiolf.online/services/enterprise-solutions",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Enterprise Web Development",
  description: "Advanced custom web systems for large businesses: multi-role platforms, large workflows, API integrations, advanced analytics, and scalable architecture.",
  provider: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
  areaServed: [{ "@type": "Country", name: "Morocco" }, { "@type": "AdministrativeArea", name: "Worldwide" }],
  serviceType: "Enterprise Web Development",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://digitalstudiolf.online/services" },
    { "@type": "ListItem", position: 3, name: "Enterprise Solutions", item: "https://digitalstudiolf.online/services/enterprise-solutions" },
  ],
};

export default function EnterpriseSolutionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <nav className="text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Enterprise Solutions</span>
          </nav>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium mb-5">
              Enterprise Web Development
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Enterprise Web Development<br />
              <span className="text-amber-400">for Complex, Large-Scale Systems</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl">
              When Growth packages aren&apos;t enough — multi-role platforms, advanced workflows, multiple API integrations,
              large data sets, and premium support. Custom quote, 21-day base timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:digitalstudiolf@gmail.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full shadow-lg hover:shadow-amber-500/30 hover:scale-[1.03] transition-all duration-300">
                Book a strategy call
              </a>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all duration-300">
                See all services
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Enterprise Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Advanced Custom Systems", desc: "Fully bespoke applications designed around your internal processes — not adapted from generic templates or off-the-shelf platforms." },
              { title: "Multiple User Roles", desc: "Granular role & permission systems for large teams: admins, managers, editors, clients, partners — each with controlled access to features and data." },
              { title: "Large Workflow Automation", desc: "Multi-step approval workflows, conditional logic, scheduled automation, webhook triggers, and cross-system data synchronisation at scale." },
              { title: "API Integrations", desc: "Deep integrations with ERPs, payment gateways, shipping APIs, third-party platforms, and internal systems — all documented and maintainable." },
              { title: "Advanced Analytics", desc: "Custom analytics engines, data warehousing connections, scheduled reports, and executive dashboards built to your KPI framework." },
              { title: "Scalable Architecture", desc: "Designed for growth — microservices, CDN edge deployment, database sharding, caching layers, and load balancing considered from the start." },
              { title: "Custom Modules", desc: "Any functionality your business requires: inventory systems, booking engines, pricing calculators, document generators, compliance trackers." },
              { title: "Premium Support", desc: "Dedicated support with SLA, priority response, quarterly reviews, and a direct line to the developer who built your system." },
            ].map((item) => (
              <div key={item.title} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-amber-400 font-bold mb-2">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Custom Quote</h2>
          <p className="text-white/55 text-lg mb-8 max-w-2xl mx-auto">
            Enterprise projects are scoped individually. Send us a brief and we&apos;ll respond with a detailed proposal —
            scope, timeline, and fixed price — within 24 hours. No commitment required.
          </p>
          <a href="mailto:digitalstudiolf@gmail.com" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-amber-500/30 hover:scale-[1.03] transition-all duration-300">
            Book a strategy call
          </a>
          <p className="text-white/30 text-sm mt-4">Response within 24 hours</p>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <p className="text-white/40 text-sm text-center mb-6">Explore related services</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/services/crm-systems" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-colors">CRM Systems</Link>
            <Link href="/services/admin-dashboards" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-blue-500/30 hover:text-blue-400 transition-colors">Admin Dashboards</Link>
            <Link href="/services/crm-for-travel-agencies" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-colors">CRM for Travel Agencies</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
