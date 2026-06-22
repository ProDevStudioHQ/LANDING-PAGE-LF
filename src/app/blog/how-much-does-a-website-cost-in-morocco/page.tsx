import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "How Much Does a Website Cost in Morocco? (2026 Pricing Guide)",
  description:
    "Complete 2026 pricing guide for websites in Morocco: landing pages from $250, business websites from $700, dashboards from $1,200, CRM systems from $2,500. Fixed prices, no hidden fees.",
  alternates: { canonical: "/blog/how-much-does-a-website-cost-in-morocco" },
  openGraph: {
    title: "How Much Does a Website Cost in Morocco? | Digital Studio LF",
    description: "2026 pricing guide: landing pages from $250, business websites from $700, dashboards from $1,200, CRM from $2,500.",
    url: "https://digitalstudiolf.online/blog/how-much-does-a-website-cost-in-morocco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Much Does a Website Cost in Morocco? (2026 Pricing Guide)",
  datePublished: "2026-01-15",
  author: { "@type": "Organization", name: "Digital Studio LF" },
  publisher: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
  mainEntityOfPage: "https://digitalstudiolf.online/blog/how-much-does-a-website-cost-in-morocco",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does a landing page cost in Morocco?", acceptedAnswer: { "@type": "Answer", text: "Landing pages from Digital Studio LF start at $250 and are delivered in 7 days. This includes custom design, mobile responsiveness, lead capture form, SEO basics, and 30 days of post-launch support." } },
    { "@type": "Question", name: "How much does a business website cost in Morocco?", acceptedAnswer: { "@type": "Answer", text: "Full business websites (5–7 pages) start at $700 and are delivered in 14 days. This includes custom design, SEO optimisation, contact forms, and 30 days of support." } },
    { "@type": "Question", name: "How much does a CRM system cost in Morocco?", acceptedAnswer: { "@type": "Answer", text: "Custom CRM development starts at $2,500 and is delivered in 14 days. Enterprise CRM systems with advanced features, multiple roles, and custom modules are quoted individually." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://digitalstudiolf.online/blog" },
    { "@type": "ListItem", position: 3, name: "How Much Does a Website Cost in Morocco?", item: "https://digitalstudiolf.online/blog/how-much-does-a-website-cost-in-morocco" },
  ],
};

export default function WebsiteCostMoroccoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        <article className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <nav className="text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Website Cost Morocco</span>
          </nav>

          <p className="text-white/40 text-sm mb-4">Published January 15, 2026</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
            How Much Does a Website Cost in Morocco?
            <span className="block text-primary text-2xl sm:text-3xl mt-2">(2026 Pricing Guide)</span>
          </h1>

          <p className="text-white/60 text-lg leading-relaxed mb-8">
            One of the most common questions we get from Moroccan businesses is: &quot;How much does a website cost?&quot;
            The answer depends on what you need — a landing page, a full business website, or a complex custom system.
            Here&apos;s a complete breakdown of our 2026 pricing, in USD and MAD context.
          </p>

          <div className="space-y-10 text-white/60 leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-white mb-4">1. Login Pages — From $150 (≈1,500 MAD)</h2>
              <p className="mb-4">A branded authentication page — login, signup, forgot password — is the entry-level product we offer. These are ideal for SaaS products, client portals, and admin panels that already exist but have a generic or unattractive login screen.</p>
              <p>Delivery: 7 days. Includes responsive design, forgot password flow, signup page, clean animations, and 30 days of free support.</p>
              <p className="mt-3"><Link href="/services/login-pages" className="text-primary hover:underline">→ See Login Page service details</Link></p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">2. Landing Pages — From $250 (≈2,500 MAD)</h2>
              <p className="mb-4">A high-converting single page designed to capture leads, drive sales, or promote a specific offer. Landing pages are the most cost-effective digital tool for product launches, marketing campaigns, and lead generation.</p>
              <p className="mb-4">What&apos;s included at $250: custom responsive design, CTA-focused layout, lead capture form connected to your inbox or CRM, SEO basics (title, meta, Open Graph, schema), Google Analytics, and 30 days of support.</p>
              <p>Delivered in 7 days. Rush delivery (3–5 days) available for an additional fee.</p>
              <p className="mt-3"><Link href="/services/landing-pages" className="text-primary hover:underline">→ See Landing Page service details</Link></p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">3. Business Websites — From $700 (≈7,000 MAD)</h2>
              <p className="mb-4">A full 5–7 page professional website: Home, About, Services, Portfolio, Blog, Contact. This is what most Moroccan businesses need to establish a credible digital presence and attract both local and international clients.</p>
              <p className="mb-4">What&apos;s included at $700: custom design, all pages, contact & enquiry forms, mobile-first responsive build, SEO optimisation (keyword-targeted titles, meta, schema, sitemap), Google Analytics, and 30 days of support.</p>
              <p>Delivered in 14 days. We build in English, French, or Arabic — or all three for multilingual sites.</p>
              <p className="mt-3"><Link href="/services/business-websites" className="text-primary hover:underline">→ See Business Website service details</Link></p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">4. Admin Dashboards — From $1,200 (≈12,000 MAD)</h2>
              <p className="mb-4">A custom internal dashboard with charts, KPI cards, data tables, role-based access, and export functionality. Ideal for businesses that need visibility into their operations — booking platforms, SaaS tools, internal management systems.</p>
              <p>What&apos;s included: sidebar navigation, stats cards, interactive charts, role-based access control, data tables with search/filter/export, activity logs, dark/light mode, and 30 days of support. Delivered in 14 days.</p>
              <p className="mt-3"><Link href="/services/admin-dashboards" className="text-primary hover:underline">→ See Admin Dashboard service details</Link></p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">5. CRM Systems — From $2,500 (≈25,000 MAD)</h2>
              <p className="mb-4">A fully custom CRM platform built around your specific workflow: lead management, sales pipeline, client profiles, automated follow-ups, and reporting. This is for businesses that are outgrowing spreadsheets and generic tools.</p>
              <p className="mb-4">We specialise in CRM systems for travel agencies, service businesses, agencies, and sales teams — including Moroccan tour operators and riads. See our <Link href="/services/crm-for-travel-agencies" className="text-primary hover:underline">CRM for travel agencies</Link> page for a detailed breakdown.</p>
              <p>Delivered in 14 days. Enterprise CRM (multi-branch, supplier management, itinerary builder) is quoted individually.</p>
              <p className="mt-3"><Link href="/services/crm-systems" className="text-primary hover:underline">→ See CRM service details</Link></p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">6. Enterprise Solutions — Custom Quote</h2>
              <p>Advanced systems that go beyond the Growth tier: multi-role platforms, complex workflow automation, API integrations with third-party systems, large data sets, and premium ongoing support. We scope each enterprise project individually and deliver a fixed-price proposal within 24 hours.</p>
              <p className="mt-3"><Link href="/services/enterprise-solutions" className="text-primary hover:underline">→ See Enterprise service details</Link></p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">What&apos;s Always Included</h2>
              <ul className="space-y-2">
                {["30 days of free post-launch support on every package", "Clean, documented code — you own it", "Mobile-first responsive design", "SEO basics (title, meta, structured data, sitemap)", "Fixed prices — no hidden fees", "2–3 revision rounds during the build"].map((item) => (
                  <li key={item} className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> {item}</li>
                ))}
              </ul>
            </section>

            <section className="glass rounded-xl p-6 border border-primary/20">
              <h2 className="text-xl font-black text-white mb-3">Get a Free Custom Quote</h2>
              <p className="mb-4">Not sure which package fits? Tell us what you need and we&apos;ll send a custom proposal within 24 hours — no commitment required.</p>
              <a href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full hover:scale-[1.02] transition-transform text-sm">
                Get a free quote
              </a>
            </section>
          </div>
          <ShareButtons />
        </article>

        <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-white/5 pt-12">
          <p className="text-white/40 text-sm mb-4">Related articles</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog/landing-page-vs-website-difference" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Landing page vs website</Link>
            <Link href="/blog/how-long-does-it-take-to-build-a-website" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">How long does a website take?</Link>
            <Link href="/web-design-morocco" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Web design Morocco</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
