import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  pageGraphJson,
  webPageNode,
  breadcrumbNode,
  faqNode,
  faqId,
  serviceNode,
  WHATSAPP_NUMBER,
} from "@/lib/schema";

// The English twin of /fr/agence-web-marrakech (seo-fixes-2026-10).
//
// The city intent — "web design marrakech", "affordable website design for
// small business marrakech" — used to ride on /web-design-morocco, which also
// had to carry the country intent ("web design morocco") and ranked for
// neither (position 55). Marrakech now has its own page in each language, and
// /web-design-morocco is free to target Morocco as a whole.
const PATH = "/web-design-marrakech";

const TITLE = "Web Design Marrakech for Small Business | Digital Studio LF";
const DESCRIPTION =
  "Affordable web design in Marrakech for small businesses: custom websites in English, French & Arabic from $250, fixed price, delivered in 7–14 days.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      en: PATH,
      fr: "/fr/agence-web-marrakech",
      "x-default": PATH,
    },
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description:
      "Custom websites for Marrakech businesses in English, French & Arabic. From $250, fixed price, free quote in 24h.",
    url: `https://digitalstudiolf.online${PATH}`,
    images: ["https://digitalstudiolf.online/images/og-home.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Custom websites for Marrakech businesses in English, French & Arabic. From $250, fixed price, free quote in 24h.",
    images: ["https://digitalstudiolf.online/images/og-home.jpg"],
  },
};

// Prices are the site's published packages (PricingPlansSection and the FR
// price guide) — not new numbers.
const packages = [
  {
    name: "Landing page",
    price: "$250",
    mad: "≈ 2 500 MAD",
    time: "About 7 days",
    desc: "One focused page for one offer: a riad, a menu and reservations, a service or a campaign. WhatsApp button and contact form included.",
    href: "/services/landing-pages",
  },
  {
    name: "Business website",
    price: "$700",
    mad: "≈ 7 000 MAD",
    time: "10–14 days",
    desc: "A full 5–7 page site for a small business: services, about, gallery, contact, local SEO and Google Business Profile guidance.",
    href: "/services/business-websites",
  },
  {
    name: "Dashboard or booking system",
    price: "from $1,200",
    mad: "≈ 12 000 MAD",
    time: "3–5 weeks",
    desc: "When the site has to do work: direct bookings, an admin dashboard, a client area or a link to your CRM.",
    href: "/services/admin-dashboards",
  },
];

const sectors = [
  { title: "Riads & guesthouses", desc: "Direct-booking sites that cut OTA commissions, in the languages your guests speak.", href: "/services/hotel-riad-websites" },
  { title: "Restaurants & cafés", desc: "Menu, story, table reservations and a Google Maps listing that matches the site.", href: "/services/restaurant-websites" },
  { title: "Tour operators & travel agencies", desc: "Tour pages and booking requests that turn Instagram followers into customers.", href: "/services/tour-reservations" },
  { title: "Real estate agencies", desc: "Property listings with search and lead capture for local and foreign buyers.", href: "/fr/solutions/site-web-agence-immobiliere-maroc" },
  { title: "Clinics & practices", desc: "Clear services, opening hours and appointment requests for patients in Marrakech.", href: "/services/medical-websites" },
  { title: "Shops & artisans", desc: "Online stores that sell Moroccan products in Morocco and abroad.", href: "/services/online-stores" },
];

const faqs = [
  {
    question: "How much does a website cost in Marrakech?",
    answer:
      "Our packages start at $250 (about 2 500 MAD) for a landing page, $700 (about 7 000 MAD) for a full small-business website and $1,200 (about 12 000 MAD) for a dashboard or booking system. The price is fixed in writing before work starts.",
  },
  {
    question: "Are you really based in Marrakech?",
    answer:
      "Yes. Digital Studio LF is a web design studio in Marrakech. We work with businesses across Marrakech-Safi, the rest of Morocco and abroad, in English, French and Arabic.",
  },
  {
    question: "How long does it take to build a small-business website?",
    answer:
      "A landing page takes about 7 days and a full business website 10–14 days. Booking systems, dashboards and CRMs take 3–8 weeks depending on scope.",
  },
  {
    question: "Can my website be in English, French and Arabic?",
    answer:
      "Yes. Each language gets its own pages, titles and descriptions so it can rank on its own, and Arabic is built right-to-left. Planning languages from the start costs much less than adding them later.",
  },
  {
    question: "Do I own the website and the domain?",
    answer:
      "Yes. The domain, the hosting account and the code are yours. You get every login when the site is delivered, with no mandatory subscription.",
  },
];

const graph = pageGraphJson(
  webPageNode({
    path: PATH,
    name: "Web Design Marrakech",
    description: DESCRIPTION,
    breadcrumb: true,
    mainEntity: faqId(PATH),
  }),
  breadcrumbNode([
    { name: "Home", path: "" },
    { name: "Web Design Morocco", path: "/web-design-morocco" },
    { name: "Web Design Marrakech", path: PATH },
  ]),
  serviceNode({
    name: "Web Design in Marrakech",
    serviceType: "Web design",
    description:
      "Custom website design and development for small businesses in Marrakech, in English, French and Arabic.",
    path: PATH,
    price: "250",
    keywords: ["web design Marrakech", "website design Marrakech", "small business website Marrakech"],
  }),
  faqNode(faqs, PATH),
);

export default function WebDesignMarrakechPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <nav className="text-sm text-white/60 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/web-design-morocco" className="hover:text-white transition-colors">Web Design Morocco</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Web Design Marrakech</span>
          </nav>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
              Web Design Agency · Marrakech
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Web design in <span className="text-primary">Marrakech</span> for small businesses
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-4 max-w-2xl">
              Digital Studio LF is a web design studio in Marrakech. We build custom websites for
              small businesses — riads, restaurants, tour operators, clinics and shops — in English,
              French and Arabic, from $250 at a fixed price agreed before we start.
            </p>
            <p className="text-white/40 text-base leading-relaxed mb-8 max-w-2xl italic">
              Vous préférez le français ?{" "}
              <Link href="/fr/agence-web-marrakech" className="text-primary not-italic hover:underline">
                Agence web à Marrakech
              </Link>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg hover:shadow-primary/30 hover:scale-[1.03] transition-all duration-300">
                Get a free quote in 24h
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all duration-300"
              >
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Small business packages */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Small business website packages</h2>
          <p className="text-white/50 text-lg mb-12 max-w-3xl leading-relaxed">
            Affordable does not mean a template everyone else in Marrakech is using. It means a custom
            site at a price a small business can sign off, with the number fixed in writing. Most
            businesses start with a landing page and grow from there.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((p) => (
              <div key={p.name} className="glass rounded-2xl p-7 border border-white/10 flex flex-col">
                <h3 className="text-xl font-bold mb-1">{p.name}</h3>
                <p className="text-3xl font-black text-primary">{p.price}</p>
                <p className="text-white/40 text-sm mb-4">{p.mad} · {p.time}</p>
                <p className="text-white/55 text-sm leading-relaxed mb-6">{p.desc}</p>
                <Link href={p.href} className="mt-auto text-sm text-primary hover:underline">
                  What&apos;s included →
                </Link>
              </div>
            ))}
          </div>
          <p className="text-white/50 text-sm mt-8">
            Full price breakdown, with what changes the price:{" "}
            <Link href="/blog/website-cost-morocco" className="text-primary hover:underline">
              website cost in Morocco
            </Link>
            .
          </p>
        </section>

        {/* Sectors */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Websites for Marrakech businesses</h2>
          <p className="text-white/50 text-lg mb-12 max-w-3xl leading-relaxed">
            Marrakech customers are a mix of locals, Moroccans from other cities and visitors from
            abroad. Each sector needs something different from its website.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((s) => (
              <Link key={s.title} href={s.href} className="glass rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300">
                <h3 className="text-primary font-bold mb-2">{s.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-12">Recent work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/portfolio/dar-atlas-immobilier" className="glass rounded-2xl p-7 border border-white/10 hover:border-primary/30 transition-all duration-300">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Real estate · 14 days</p>
              <h3 className="text-xl font-bold mb-2">Dar Atlas Immobilier</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                A real estate website built to present properties clearly and make it simple for buyers
                and renters to find a match and contact the agency.
              </p>
            </Link>
            <Link href="/portfolio/dar-zahra-modern-moroccan-restaurant" className="glass rounded-2xl p-7 border border-white/10 hover:border-primary/30 transition-all duration-300">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Restaurant · 10 days</p>
              <h3 className="text-xl font-bold mb-2">Dar Zahra — Moroccan restaurant</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                A restaurant website that tells the kitchen&apos;s story, presents the menu and leads
                guests to a table reservation.
              </p>
            </Link>
          </div>
          <p className="text-white/50 text-sm mt-8">
            <Link href="/portfolio" className="text-primary hover:underline">See the full web design portfolio →</Link>
          </p>
        </section>

        {/* Process */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-8">How we work</h2>
          <ol className="space-y-4">
            {[
              { t: "Free call or WhatsApp chat", d: "You tell us what the site has to achieve. We reply with a fixed quote within 24 hours." },
              { t: "Structure and content", d: "We plan the pages, the languages and the keywords your Marrakech customers actually search for." },
              { t: "Design and build", d: "Custom design, built mobile-first, with review rounds on a private preview link." },
              { t: "Launch and handover", d: "We launch, submit the sitemap to Google, help with your Google Business Profile and hand over every login." },
            ].map((step, i) => (
              <li key={step.t} className="glass rounded-xl p-6 border border-white/10 flex gap-4">
                <span className="text-primary font-black text-xl">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-bold mb-1">{step.t}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{step.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map(({ question, answer }) => (
              <div key={question} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-bold mb-2">{question}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA + related */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5 text-center">
          <h2 className="text-3xl font-black mb-4">Get a fixed quote for your Marrakech website</h2>
          <p className="text-white/55 mb-8">Tell us what you need. You get a clear price and timeline within 24 hours.</p>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-300">
            Request a free quote
          </Link>
          <div className="flex flex-wrap gap-3 justify-center mt-12">
            <Link href="/web-design-morocco" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Web design in Morocco</Link>
            <Link href="/multilingual-website-design" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Multilingual websites</Link>
            <Link href="/website-redesign" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Website redesign</Link>
            <Link href="/services/hotel-riad-websites" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Riad websites</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
