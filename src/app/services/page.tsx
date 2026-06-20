import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Web Development Services in Morocco",
  description:
    "Custom web development services in Morocco: landing pages, business websites, admin dashboards, CRM systems, login pages, and enterprise solutions. Built in 7–21 days.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Web Development Services in Morocco | Digital Studio LF",
    description:
      "Custom web development services: landing pages, business websites, dashboards, CRM systems. Based in Marrakesh, serving businesses worldwide.",
    url: "https://digitalstudiolf.online/services",
  },
};

const services = [
  {
    slug: "landing-pages",
    title: "Landing Page Design",
    description:
      "High-converting landing pages that capture leads, drive sales, and showcase your offer — delivered in 7 days.",
    from: "$250",
    color: "text-orange-400",
    border: "hover:border-orange-500/30",
    glow: "bg-orange-500/10",
  },
  {
    slug: "business-websites",
    title: "Business Website Development",
    description:
      "Professional 5–7 page websites that represent your brand, establish authority, and convert visitors into clients.",
    from: "$700",
    color: "text-primary",
    border: "hover:border-primary/30",
    glow: "bg-primary/10",
  },
  {
    slug: "admin-dashboards",
    title: "Admin Dashboard Development",
    description:
      "Custom dashboards with real-time analytics, KPIs, role-based access control, charts, and clean data views.",
    from: "$1,200",
    color: "text-blue-400",
    border: "hover:border-blue-500/30",
    glow: "bg-blue-500/10",
  },
  {
    slug: "crm-systems",
    title: "Custom CRM Development",
    description:
      "CRM platforms built around how your business works — lead management, pipelines, automation, and reporting.",
    from: "$2,500",
    color: "text-emerald-400",
    border: "hover:border-emerald-500/30",
    glow: "bg-emerald-500/10",
  },
  {
    slug: "login-pages",
    title: "Secure Login Page Development",
    description:
      "Branded authentication UIs with social login, 2FA, magic links, and secure session management.",
    from: "$150",
    color: "text-purple-400",
    border: "hover:border-purple-500/30",
    glow: "bg-purple-500/10",
  },
  {
    slug: "enterprise-solutions",
    title: "Enterprise Web Development",
    description:
      "Advanced custom systems for large businesses: multi-role platforms, API integrations, scalable architecture.",
    from: "Custom quote",
    color: "text-amber-400",
    border: "hover:border-amber-500/30",
    glow: "bg-amber-500/10",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://digitalstudiolf.online/services" },
  ],
};

export default function ServicesIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <nav className="text-sm text-white/40 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Services</span>
          </nav>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Web Development Services<br />
            <span className="text-primary">in Morocco & Worldwide</span>
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Based in Marrakesh, we build premium digital products for businesses across Morocco and globally —
            delivered in 7–21 days with clean code, elegant design, and full SEO.
          </p>
        </section>

        {/* Services grid */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`group relative glass rounded-2xl p-8 border border-white/10 ${s.border} transition-all duration-300 overflow-hidden`}
              >
                <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full ${s.glow} blur-3xl opacity-30 group-hover:opacity-70 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${s.color}`}>From {s.from}</p>
                  <h2 className={`text-xl font-bold mb-3 group-hover:${s.color} transition-colors`}>{s.title}</h2>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">{s.description}</p>
                  <span className={`text-sm font-semibold ${s.color}`}>Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
