import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceContent } from "@/config/services-content";

const svc = getServiceContent("business-websites")!;

export const metadata: Metadata = {
  title: "Business Website Development in Morocco",
  description:
    "Professional business website development in Morocco: 5–7 page custom sites, SEO-optimised & mobile-first. From $700, delivered in 14 days.",
  keywords: [svc.focusKeyword, ...(svc.secondaryKeywords ?? [])],
  alternates: { canonical: "/services/business-websites" },
  openGraph: {
    title: "Business Website Development in Morocco | Digital Studio LF",
    description:
      "Professional 5–7 page business websites delivered in 14 days from $700. Custom design, SEO-optimised, mobile-first. Based in Marrakesh, serving businesses worldwide.",
    url: "https://digitalstudiolf.online/services/business-websites",
    images: [{ url: "https://digitalstudiolf.online/images/idea-digital.png", width: 1200, height: 630, alt: "Digital Studio LF" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Business Website Development",
  description:
    "Professional 5–7 page business websites that represent your brand, establish authority, and convert visitors. Delivered in 14 days.",
  provider: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
  areaServed: [{ "@type": "Country", name: "Morocco" }, { "@type": "AdministrativeArea", name: "Worldwide" }],
  serviceType: "Business Website Development",
  offers: { "@type": "Offer", price: "700", priceCurrency: "USD", description: "Growth business website — 14-day delivery" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://digitalstudiolf.online/services" },
    { "@type": "ListItem", position: 3, name: "Business Websites", item: "https://digitalstudiolf.online/services/business-websites" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a business website cost in Morocco?",
      acceptedAnswer: { "@type": "Answer", text: "Our business website packages start at $700 for a fully custom 5–7 page site delivered in 14 days. This includes responsive design, SEO optimisation, contact form, and 30 days of post-launch support." },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a business website?",
      acceptedAnswer: { "@type": "Answer", text: "Standard business websites are delivered in 14 days. The timeline begins after we receive your brief, content, and deposit." },
    },
    {
      "@type": "Question",
      name: "Do you build multilingual websites for Moroccan businesses?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. We build websites in English, French, and Arabic — and multilingual sites that serve multiple markets simultaneously with proper hreflang tags and language switching." },
    },
  ],
};

export default function BusinessWebsitesPage() {
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
            <span className="text-white/70">Business Websites</span>
          </nav>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
              Business Website Development
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Business Website Development<br />
              <span className="text-primary">for Growing Businesses</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl">
              Professional 5–7 page websites that represent your brand, establish authority, and convert visitors into clients.
              Built in Marrakesh, deployed worldwide — in 14 days from $700.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg hover:shadow-primary/30 hover:scale-[1.03] transition-all duration-300">
                Start my website — $700
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
            Every business website is built from scratch — no page builders, no templates. Clean code, fast performance,
            and a design that makes your business look like the premium option in your market.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "5–7 Custom Pages", desc: "Home, About, Services, Portfolio, Blog, Contact, and any additional pages your business needs — all fully custom-designed." },
              { title: "Custom Brand Design", desc: "Unique visual identity implementation using your colours, fonts, and style. Consistent across every page, every breakpoint." },
              { title: "Mobile-First Responsive", desc: "Designed for smartphones first and scaled up — flawless on every screen size with no compromises on layout or usability." },
              { title: "SEO Optimised", desc: "Keyword-targeted title tags, meta descriptions, Open Graph, structured data (schema.org), semantic HTML, and sitemap.xml included." },
              { title: "Contact & Booking Forms", desc: "Lead capture forms, enquiry forms, or booking request forms connected to your inbox, CRM, or Google Calendar." },
              { title: "Fast Load Times", desc: "Optimised images (WebP), code splitting, and Next.js static generation for LCP under 2.5s and strong Core Web Vitals scores." },
              { title: "Google Analytics & Search Console", desc: "Analytics tracking and Search Console verification set up so you can monitor traffic, queries, and site health from day one." },
              { title: "Multilingual Support", desc: "English, French, Arabic, or any combination — with proper hreflang, lang attributes, and separate content for each language." },
              { title: "30-Day Free Support", desc: "Free post-launch support for 30 days covering bug fixes, content edits, and minor layout adjustments." },
            ].map((item) => (
              <div key={item.title} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-primary font-bold mb-2">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">The Build Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "You share your business, audience, goals, and content. We ask the right questions to define the sitemap and key conversions." },
              { step: "02", title: "Proposal", desc: "We deliver a detailed proposal within 24 hours — pages, layout concepts, timeline, and price. Free." },
              { step: "03", title: "Build", desc: "Design and development with 2–3 revision rounds. You review on a live staging URL before we go live." },
              { step: "04", title: "Launch", desc: "We deploy to your domain, set up analytics and Search Console, submit the sitemap, and hand over everything." },
            ].map((s) => (
              <div key={s.step} className="glass rounded-xl p-6 border border-white/10">
                <span className="text-4xl font-black text-primary/20 mb-3 block">{s.step}</span>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-center">Business Website Pricing</h2>
          <p className="text-white/50 text-center mb-12">Fixed price, no hidden fees, delivered in 14 days.</p>
          <div className="max-w-sm mx-auto glass rounded-2xl p-8 border border-primary/30">
            <p className="text-primary font-bold text-sm uppercase tracking-wider mb-2">Growth — Most Popular</p>
            <p className="text-5xl font-black mb-1">$700</p>
            <p className="text-white/40 text-sm mb-6 line-through">was $1,400</p>
            <ul className="space-y-3 mb-8">
              {["5–7 custom pages", "Responsive design", "Premium landing page", "Contact & enquiry forms", "Service sections", "Mobile optimisation", "SEO basics (meta, schema, sitemap)", "Analytics integration", "30 days free support", "Delivered in 14 days"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="text-primary mt-0.5">✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="/#contact" className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:scale-[1.02] transition-transform">
              Get started
            </a>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How much does a business website cost in Morocco?", a: "Our business website packages start at $700 for a fully custom 5–7 page site delivered in 14 days. This includes responsive design, SEO optimisation, contact form, and 30 days of post-launch support. No hidden fees." },
              { q: "How long does it take to build a business website?", a: "Standard business websites are delivered in 14 days. The timeline begins after we receive your brief, content assets, and deposit payment." },
              { q: "Do you build multilingual websites for Moroccan businesses?", a: "Yes. We build websites in English, French, and Arabic — and multilingual sites that serve multiple markets simultaneously with proper hreflang tags and language switching." },
              { q: "Do you build websites for riads, hotels, and restaurants in Marrakesh?", a: "Absolutely. We specialise in business websites for the Moroccan hospitality sector — riads, hotels, restaurants, tour operators — with multilingual content, booking request forms, and local SEO to help you rank in Marrakesh search results." },
              { q: "Can I add pages later?", a: "Yes. We build with scalability in mind. Adding new pages, blog sections, or features after launch is straightforward and billed at our hourly rate." },
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
            <Link href="/services/landing-pages" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-orange-500/30 hover:text-orange-400 transition-colors">Landing Pages</Link>
            <Link href="/services/crm-systems" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-colors">CRM Systems</Link>
            <Link href="/services/admin-dashboards" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-blue-500/30 hover:text-blue-400 transition-colors">Admin Dashboards</Link>
            <Link href="/web-design-morocco" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Web Design Morocco</Link>
            <Link href="/#contact" className="px-4 py-2 rounded-full border border-primary/30 text-primary text-sm hover:bg-primary/10 transition-colors">Free Consultation</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
