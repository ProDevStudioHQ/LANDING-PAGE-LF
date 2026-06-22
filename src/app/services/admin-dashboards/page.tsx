import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Admin Dashboard Development Service",
  description:
    "Custom admin dashboard development: real-time analytics, role-based access, charts, KPIs, and clean data views. Delivered in 14 days from $1,200. Based in Morocco.",
  alternates: { canonical: "/services/admin-dashboards" },
  openGraph: {
    title: "Admin Dashboard Development | Digital Studio LF",
    description:
      "Custom admin dashboards with real-time analytics, KPIs, role-based access, and clean data views. From $1,200, delivered in 14 days.",
    url: "https://digitalstudiolf.online/services/admin-dashboards",
    images: [{ url: "https://digitalstudiolf.online/images/idea-digital.png", width: 1200, height: 630, alt: "Digital Studio LF" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Admin Dashboard Development",
  description: "Custom admin dashboards with analytics, KPIs, role-based access control, charts, and data exports. Delivered in 14 days.",
  provider: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
  areaServed: [{ "@type": "Country", name: "Morocco" }, { "@type": "AdministrativeArea", name: "Worldwide" }],
  serviceType: "Admin Dashboard Development",
  offers: { "@type": "Offer", price: "1200", priceCurrency: "USD", description: "Growth dashboard — 14-day delivery" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://digitalstudiolf.online/services" },
    { "@type": "ListItem", position: 3, name: "Admin Dashboards", item: "https://digitalstudiolf.online/services/admin-dashboards" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does a custom admin dashboard cost?", acceptedAnswer: { "@type": "Answer", text: "Our admin dashboard packages start at $1,200 and are delivered in 14 days. The price includes custom UI, interactive charts, role-based access, data tables, export functionality, and 30 days of free support." } },
    { "@type": "Question", name: "What data sources can the dashboard connect to?", acceptedAnswer: { "@type": "Answer", text: "We can connect your dashboard to PostgreSQL, MySQL, MongoDB, REST APIs, Google Sheets, Airtable, and most third-party services via API. We discuss your specific data sources during the discovery phase." } },
    { "@type": "Question", name: "Can the dashboard have different access levels for different users?", acceptedAnswer: { "@type": "Answer", text: "Yes. Role-based access control (RBAC) is a standard feature — you define who sees what. Common roles include admin, manager, editor, and viewer, each with customisable permissions." } },
  ],
};

export default function AdminDashboardsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <nav className="text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Admin Dashboards</span>
          </nav>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-5">
              Admin Dashboard Development
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Custom Admin Dashboard<br />
              <span className="text-blue-400">Development for Any Business</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl">
              Real-time analytics, KPI cards, interactive charts, role-based access control, and clean data views —
              built to your exact specifications in 14 days from $1,200.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-blue-500/30 hover:scale-[1.03] transition-all duration-300">
                Start my dashboard — $1,200
              </a>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all duration-300">
                See all services
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">What&apos;s Included</h2>
          <p className="text-white/50 text-lg mb-12 max-w-2xl">
            Every dashboard is built with real data in mind — not demo charts. We connect to your actual data sources
            and build views that answer the specific questions your team needs to act on.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Interactive Charts & Graphs", desc: "Line charts, bar charts, pie charts, heatmaps, and more — powered by real data and filterable by date range, category, and user segment." },
              { title: "KPI Stats Cards", desc: "At-a-glance metrics at the top of the dashboard showing your most important numbers with trends, percentage changes, and comparison periods." },
              { title: "Role-Based Access Control", desc: "Admin, manager, editor, viewer — define who can see and edit what. Every route and API endpoint is protected at the server level." },
              { title: "Filterable Data Tables", desc: "Sortable, searchable, paginated data tables with column controls, bulk actions, and export to CSV, Excel, or PDF." },
              { title: "Sidebar Navigation", desc: "Clean, collapsible sidebar with section grouping, active states, notifications badge, and mobile hamburger menu." },
              { title: "Dark & Light Mode", desc: "Full dark and light theme support with system preference detection and a manual toggle — accessible and polished." },
              { title: "Activity Logs & Audit Trails", desc: "Track every action in the system — who changed what, when. Essential for compliance and team accountability." },
              { title: "Export & Reports", desc: "One-click export of any table, chart, or report to PDF, Excel, or CSV. Scheduled email reports available as an add-on." },
              { title: "30-Day Free Support", desc: "Free post-launch support for 30 days covering bug fixes and minor feature adjustments so your team can hit the ground running." },
            ].map((item) => (
              <div key={item.title} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-blue-400 font-bold mb-2">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">The Build Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "We map your data sources, KPIs, user roles, and key workflows. We define what questions the dashboard needs to answer." },
              { step: "02", title: "Proposal", desc: "Detailed scope: pages, components, data connections, user roles, and timeline — delivered within 24 hours. Free." },
              { step: "03", title: "Build", desc: "We develop on a private staging environment with 2–3 review rounds so you can test with real data before launch." },
              { step: "04", title: "Launch", desc: "We deploy to your infrastructure or cloud provider, configure authentication, and hand over all source code." },
            ].map((s) => (
              <div key={s.step} className="glass rounded-xl p-6 border border-white/10">
                <span className="text-4xl font-black text-blue-500/20 mb-3 block">{s.step}</span>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-center">Dashboard Pricing</h2>
          <p className="text-white/50 text-center mb-12">Fixed price, no hidden fees, delivered in 14 days.</p>
          <div className="max-w-sm mx-auto glass rounded-2xl p-8 border border-blue-500/30">
            <p className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">Growth</p>
            <p className="text-5xl font-black mb-1">$1,200</p>
            <p className="text-white/40 text-sm mb-6 line-through">was $2,400</p>
            <ul className="space-y-3 mb-8">
              {["Admin dashboard UI", "Sidebar navigation", "Stats & KPI cards", "Charts & data tables", "Role-based access control", "Responsive design", "Export to CSV/PDF", "Activity logs", "30 days free support", "Delivered in 14 days"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="text-blue-400 mt-0.5">✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="/#contact" className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:scale-[1.02] transition-transform">
              Get started
            </a>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How much does a custom admin dashboard cost?", a: "Our admin dashboard packages start at $1,200 and are delivered in 14 days. The price includes custom UI, interactive charts, role-based access, data tables, export functionality, and 30 days of free support." },
              { q: "What data sources can the dashboard connect to?", a: "We connect dashboards to PostgreSQL, MySQL, MongoDB, REST APIs, Google Sheets, Airtable, and most third-party services via API. We discuss your specific data sources during the discovery phase." },
              { q: "Can the dashboard have different access levels for different users?", a: "Yes. Role-based access control (RBAC) is a standard feature — you define who sees what. Common roles include admin, manager, editor, and viewer, each with customisable permissions." },
              { q: "Can I add more sections or features after launch?", a: "Yes. We build dashboards in a modular way so adding new sections, charts, or pages after launch is clean and cost-effective. Post-launch work is billed at our hourly rate." },
              { q: "Do you build booking management dashboards for hotels and riads in Morocco?", a: "Yes. We've built booking management dashboards for hospitality businesses in Marrakesh — showing reservations, availability calendars, guest profiles, revenue charts, and channel breakdowns." },
            ].map(({ q, a }) => (
              <div key={q} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-bold mb-2">{q}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <p className="text-white/40 text-sm text-center mb-6">Explore related services</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/services/crm-systems" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-colors">CRM Systems</Link>
            <Link href="/services/business-websites" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Business Websites</Link>
            <Link href="/services/enterprise-solutions" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-amber-500/30 hover:text-amber-400 transition-colors">Enterprise Solutions</Link>
            <Link href="/#contact" className="px-4 py-2 rounded-full border border-blue-500/30 text-blue-400 text-sm hover:bg-blue-500/10 transition-colors">Free Consultation</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
