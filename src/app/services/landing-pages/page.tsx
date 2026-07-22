import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceContent } from "@/config/services-content";

const svc = getServiceContent("landing-pages")!;

export const metadata: Metadata = {
  title: "Landing Page Design Service in Morocco",
  description:
    "Professional landing page design service in Morocco. High-converting, SEO-ready landing pages delivered in 7 days from $250. Serving Marrakesh and worldwide.",
  keywords: [svc.focusKeyword, ...(svc.secondaryKeywords ?? [])],
  alternates: { canonical: "/services/landing-pages" },
  openGraph: {
    title: "Landing Page Design Service in Morocco | Digital Studio LF",
    description:
      "High-converting landing pages designed to capture leads and drive sales. Delivered in 7 days from $250. Based in Marrakesh, Morocco.",
    url: "https://digitalstudiolf.online/services/landing-pages",
    images: [{ url: "https://digitalstudiolf.online/images/idea-digital.png", width: 1200, height: 630, alt: "Digital Studio LF" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Landing Page Design Service",
  description:
    "Custom high-converting landing pages designed to capture leads, drive sales, and showcase your offer. Delivered in 7 days.",
  provider: {
    "@type": "Organization",
    name: "Digital Studio LF",
    url: "https://digitalstudiolf.online",
  },
  areaServed: [{ "@type": "Country", name: "Morocco" }, { "@type": "AdministrativeArea", name: "Worldwide" }],
  serviceType: "Landing Page Design",
  offers: {
    "@type": "Offer",
    price: "250",
    priceCurrency: "USD",
    description: "Starter landing page — delivered in 7 days",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://digitalstudiolf.online/services" },
    { "@type": "ListItem", position: 3, name: "Landing Pages", item: "https://digitalstudiolf.online/services/landing-pages" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a landing page cost in Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our landing page packages start at $250 for a fully custom, high-converting design delivered in 7 days. The price includes responsive design, SEO basics, lead capture form, and 30 days of post-launch support.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a landing page?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard landing pages are delivered in 7 days. Rush delivery (3–5 days) is available for an additional fee.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build landing pages in French for Moroccan clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We build landing pages in English, French, and Arabic — or multilingual versions targeting multiple audiences.",
      },
    },
  ],
};

export default function LandingPagesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <nav className="text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Landing Pages</span>
          </nav>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium mb-5">
              Landing Page Design Service
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Landing Page Design Service<br />
              <span className="text-orange-400">That Converts Visitors</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl">
              High-converting, SEO-ready landing pages built from scratch in 7 days.
              Based in Marrakesh — serving product launches, lead generation campaigns, and marketing funnels worldwide.
              Launching a new product? See how we work as a{" "}
              <Link href="/web-developer-for-startups" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors">
                remote web developer for startups
              </Link>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg hover:shadow-orange-500/30 hover:scale-[1.03] transition-all duration-300"
              >
                Start my landing page — $250
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all duration-300"
              >
                See all services
              </Link>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">What&apos;s Included</h2>
          <p className="text-white/50 text-lg mb-12 max-w-2xl">
            Every landing page we build is a conversion-focused, fully responsive, SEO-optimised single page
            that works hard for your business from day one.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Custom Design", desc: "Unique layout matched to your brand — no templates, no recycled designs. Every element is crafted to guide visitors toward your CTA." },
              { title: "CTA Optimisation", desc: "Strategically placed calls-to-action above the fold, mid-page, and at the bottom, using contrast, copy, and hierarchy proven to increase click-through." },
              { title: "Mobile-First Responsive", desc: "Built mobile-first so it looks and performs perfectly on every device — smartphones, tablets, and desktops." },
              { title: "Speed Optimised", desc: "Lightweight code, compressed assets, lazy-loaded images, and Next.js static generation for sub-2s load times and strong Core Web Vitals." },
              { title: "SEO Basics", desc: "Keyword-rich title tag, meta description, Open Graph, structured data, semantic HTML, and sitemap entry so the page is indexable from day one." },
              { title: "Lead Capture Form", desc: "Integrated contact or email capture form connected to your CRM, email provider, or Google Sheets — so leads land directly in your inbox." },
              { title: "Analytics Ready", desc: "Google Analytics 4 and Meta Pixel integration so you can track conversions, measure performance, and optimise campaigns." },
              { title: "30-Day Support", desc: "Free post-launch support for 30 days covering bug fixes, copy edits, and minor layout adjustments — so you launch with confidence." },
              { title: "French & Arabic Available", desc: "Need a multilingual landing page for Moroccan clients? We build in English, French, and Arabic with proper lang attributes and hreflang." },
            ].map((item) => (
              <div key={item.title} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-orange-400 font-bold mb-2">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "You share your goal, audience, offer, and brand. We ask the right questions to understand what success looks like." },
              { step: "02", title: "Proposal", desc: "We send a proposal with layout concept, copy direction, and timeline within 24 hours — free." },
              { step: "03", title: "Build", desc: "We design and develop your landing page with 2–3 rounds of revisions until you're 100% happy." },
              { step: "04", title: "Launch", desc: "We deploy to your domain, configure analytics, and hand over the code — ready to drive conversions." },
            ].map((s) => (
              <div key={s.step} className="glass rounded-xl p-6 border border-white/10">
                <span className="text-4xl font-black text-orange-500/30 mb-3 block">{s.step}</span>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-center">Landing Page Pricing</h2>
          <p className="text-white/50 text-center mb-12">Fixed price, no hidden fees, delivered in 7 days.</p>
          <div className="max-w-sm mx-auto glass rounded-2xl p-8 border border-orange-500/20">
            <p className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-2">Starter</p>
            <p className="text-5xl font-black mb-1">$250</p>
            <p className="text-white/40 text-sm mb-6 line-through">was $500</p>
            <ul className="space-y-3 mb-8">
              {[
                "Custom responsive design",
                "CTA-focused layout",
                "Lead capture form",
                "SEO basics (meta, OG, schema)",
                "Speed optimised",
                "Google Analytics integration",
                "30 days free support",
                "Delivered in 7 days",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="text-orange-400 mt-0.5">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="/#contact"
              className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:scale-[1.02] transition-transform"
            >
              Get started
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "How much does a landing page cost in Morocco?",
                a: "Our landing page packages start at $250 — a fully custom, high-converting design delivered in 7 days. The price includes responsive design, SEO basics, lead capture form, and 30 days of post-launch support. No hidden fees.",
              },
              {
                q: "How long does it take to build a landing page?",
                a: "Standard landing pages are delivered in 7 days from the moment we receive your brief and deposit. Rush delivery (3–5 days) is available for an additional fee.",
              },
              {
                q: "Do you build landing pages in French for Moroccan clients?",
                a: "Yes. We build landing pages in English, French, and Arabic — or multilingual versions that target multiple audiences with proper hreflang tags.",
              },
              {
                q: "Can I request changes after the landing page is delivered?",
                a: "Yes. The package includes 2–3 revision rounds during the build and 30 days of free adjustments post-launch. Larger scope changes are billed hourly.",
              },
              {
                q: "Do you build landing pages for riads and hospitality businesses in Morocco?",
                a: "Absolutely. We have experience building high-converting pages for riads, hotels, tour operators, and travel agencies in Marrakesh and across Morocco — including multilingual pages in English, French, and Arabic.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-bold mb-2">{q}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <p className="text-white/40 text-sm text-center mb-6">Explore related services</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/services/business-websites" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Business Websites</Link>
            <Link href="/services/crm-systems" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-colors">CRM Systems</Link>
            <Link href="/services/admin-dashboards" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-blue-500/30 hover:text-blue-400 transition-colors">Admin Dashboards</Link>
            <Link href="/web-developer-for-startups" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Web Developer for Startups</Link>
            <Link href="/web-design-morocco" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Web Design Morocco</Link>
            <Link href="/#contact" className="px-4 py-2 rounded-full border border-primary/30 text-primary text-sm hover:bg-primary/10 transition-colors">Free Consultation</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
