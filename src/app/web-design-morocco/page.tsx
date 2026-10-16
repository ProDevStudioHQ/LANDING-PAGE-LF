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

// Main page for "web design morocco" (keyword cannibalization fix, Group D).
//
// It used to be retargeted at "affordable website design for small business
// marrakech", so it carried a city H1 and title while collecting impressions
// for the country query at position 55. The Marrakech intent now lives on
// /web-design-marrakech (paired with /fr/agence-web-marrakech), and this page
// targets Morocco as a whole: services, process, prices, work, FAQ.
const PATH = "/web-design-morocco";

const TITLE = "Web Design in Morocco from $250 | Digital Studio LF";
const DESCRIPTION =
  "Web design agency in Morocco: custom websites, e-commerce and booking systems in English, French & Arabic. From $250, fixed price, free quote in 24h.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      en: PATH,
      fr: "/fr/creation-site-web-maroc",
      "x-default": PATH,
    },
  },
  openGraph: {
    type: "website",
    images: ["https://digitalstudiolf.online/images/og-home.jpg"],
    title: TITLE,
    description:
      "Custom websites for Moroccan businesses in English, French & Arabic. Fixed price from $250, free quote in 24h.",
    url: `https://digitalstudiolf.online${PATH}`,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Custom websites for Moroccan businesses in English, French & Arabic. Fixed price from $250, free quote in 24h.",
    images: ["https://digitalstudiolf.online/images/og-home.jpg"],
  },
};

// No page-level LocalBusiness node here: the sitewide #business node (root
// layout) is the single business entity, spelled "Marrakech" like the Google
// Business Profile. A second node with "Marrakesh" used to sit here and split
// the entity in two.

// Published package prices (PricingPlansSection, FR price guide).
const pricing = [
  { type: "Landing page", price: "from $250", mad: "≈ 2 500 MAD", time: "about 7 days", href: "/services/landing-pages" },
  { type: "Business website (5–7 pages)", price: "from $700", mad: "≈ 7 000 MAD", time: "10–14 days", href: "/services/business-websites" },
  { type: "Online store", price: "from $700", mad: "≈ 7 000 MAD", time: "2–4 weeks", href: "/services/online-stores" },
  { type: "Admin dashboard", price: "from $1,200", mad: "≈ 12 000 MAD", time: "3–5 weeks", href: "/services/admin-dashboards" },
  { type: "Custom CRM", price: "from $2,500", mad: "≈ 25 000 MAD", time: "4–8 weeks", href: "/services/crm-systems" },
];

const faqs = [
  {
    question: "How much does a website cost in Morocco?",
    answer:
      "Our packages start from $250 (about 2 500 MAD) for a landing page, $700 for a full 5–7 page business website, $1,200 for an admin dashboard and $2,500 for a custom CRM. We quote in MAD, EUR or USD. Every price is fixed before work starts, with no hidden fees.",
  },
  {
    question: "Do you build websites in French and Arabic for Moroccan clients?",
    answer:
      "Yes. We work in English, French and Arabic and build multilingual websites for Moroccan businesses with local and international customers, with each language on its own indexable pages and Arabic built right-to-left.",
  },
  {
    question: "Do you only work with businesses in Marrakech?",
    answer:
      "No. The studio is in Marrakech, but we build websites for businesses across Morocco (Casablanca, Rabat, Agadir, Fès, Tangier) and abroad. Everything from the first call to the launch can be done remotely.",
  },
  {
    question: "Do you build websites for riads and hotels?",
    answer:
      "Yes. We build showcase sites, direct-booking landing pages and reservation systems for riads, hotels and guesthouses across Morocco, with multilingual content and local SEO.",
  },
  {
    question: "Should I hire a web designer or a web development agency?",
    answer:
      "It depends on scope. If you need a few pages designed and nothing else, a freelance web designer is often cheaper. If the site has to do something — take bookings, feed a CRM, handle payments, run in three languages — you want design and development from the same place. We do both, so the person designing the page is the person building it.",
  },
  {
    question: "Can you help with local SEO in Morocco?",
    answer:
      "Yes. Every website includes on-page SEO: keyword-targeted titles and descriptions, structured data, mobile performance and sitemap submission. We also help set up your Google Business Profile, which matters most for local searches.",
  },
];

const graph = pageGraphJson(
  webPageNode({
    path: PATH,
    name: "Web Design Morocco",
    description: DESCRIPTION,
    breadcrumb: true,
    mainEntity: faqId(PATH),
  }),
  breadcrumbNode([
    { name: "Home", path: "" },
    { name: "Web Design Morocco", path: PATH },
  ]),
  serviceNode({
    name: "Web Design in Morocco",
    serviceType: "Web design",
    description:
      "Custom website design and development for Moroccan businesses: business websites, online stores, booking systems and dashboards in English, French and Arabic.",
    path: PATH,
    price: "250",
    keywords: ["web design Morocco", "website design Morocco", "web design agency Morocco"],
  }),
  faqNode(faqs, PATH),
);

export default function WebDesignMoroccoPage() {
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
            <span className="text-white/70">Web Design Morocco</span>
          </nav>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
              Web Design Agency · Morocco
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Web design in <span className="text-primary">Morocco</span> for businesses that want customers, not just a website
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-4 max-w-2xl">
              Digital Studio LF is a web design and development agency based in Marrakech. We build
              custom websites, online stores, booking systems and dashboards for businesses across
              Morocco — in English, French and Arabic, from $250, at a fixed price agreed before we start.
            </p>
            <p className="text-white/40 text-base leading-relaxed mb-8 max-w-2xl italic">
              Version française :{" "}
              <Link href="/fr/creation-site-web-maroc" className="text-primary not-italic hover:underline">
                création de site web au Maroc
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

        {/* Custom website design for local businesses */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-6">
            Custom website design for local businesses in Morocco
          </h2>
          <div className="space-y-5 text-white/60 text-[17px] leading-[1.8]">
            <p>
              Most Moroccan businesses do not need a bigger website. They need one that answers the
              questions their customers actually ask, in the language they ask them, and makes the
              next step obvious: book, call, order or send a WhatsApp message.
            </p>
            <p>
              That is why we design every site from scratch around one job instead of filling a
              template. A riad needs direct bookings. A clinic needs appointment requests. A shop
              needs a checkout that works with how Moroccans pay. A B2B company needs leads that land
              in a CRM instead of an inbox.
            </p>
            <p>
              For most small businesses the honest starting point is a{" "}
              <Link href="/services/landing-pages" className="text-primary hover:underline">
                single landing page
              </Link>{" "}
              that does one job well. If you already have a site that underperforms, a{" "}
              <Link href="/website-redesign" className="text-primary hover:underline">
                website redesign
              </Link>{" "}
              is usually cheaper than starting over. And if your customers do not all read the same
              language, build it{" "}
              <Link href="/multilingual-website-design" className="text-primary hover:underline">
                multilingual from the start
              </Link>
              . Based in Marrakech? See our{" "}
              <Link href="/web-design-marrakech" className="text-primary hover:underline">
                affordable web design in Marrakech
              </Link>{" "}
              packages for small businesses.
            </p>
          </div>
        </section>

        {/* Services / sectors */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Websites for every kind of Moroccan business
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-3xl leading-relaxed">
            Morocco&apos;s digital market is growing fast, but most businesses still lack a website
            that represents their quality, reaches international clients and ranks on Google.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Riads & guesthouses", href: "/services/hotel-riad-websites", desc: "Direct-booking websites that reduce Booking.com dependency. Rooms, gardens and experiences, in English, French and Arabic for international guests." },
              { title: "Hotels & resorts", href: "/booking-websites-for-hotels", desc: "Room showcases, amenity pages, local guides and booking forms, optimised for 'hotel + city' searches." },
              { title: "Travel agencies & tour operators", href: "/services/tour-reservations", desc: "Tour and itinerary pages, booking requests and a CRM to follow up every lead." },
              { title: "Restaurants & cafés", href: "/services/restaurant-websites", desc: "Menus, reservations, event pages and a Google Business Profile that matches the site." },
              { title: "Real estate agencies", href: "/services/real-estate-websites", desc: "Property listings with search, filters, maps and lead capture for buyers in Morocco and abroad." },
              { title: "Online stores", href: "/services/online-stores", desc: "E-commerce for Moroccan brands and artisans, with payment and delivery options that fit the local market." },
            ].map((item) => (
              <Link key={item.title} href={item.href} className="glass rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300">
                <h3 className="text-primary font-bold mb-2">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Website prices in Morocco</h2>
          <p className="text-white/50 text-lg mb-10 max-w-3xl leading-relaxed">
            Fixed prices, agreed in writing before any work starts. Quotes in MAD, EUR or USD.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-white/40 uppercase text-xs tracking-wider border-b border-white/10">
                  <th className="py-3 pr-4 font-medium">Project</th>
                  <th className="py-3 pr-4 font-medium">Price</th>
                  <th className="py-3 font-medium">Timeline</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((row) => (
                  <tr key={row.type} className="border-b border-white/5">
                    <td className="py-4 pr-4">
                      <Link href={row.href} className="text-white hover:text-primary transition-colors">{row.type}</Link>
                    </td>
                    <td className="py-4 pr-4 text-white/70">
                      {row.price} <span className="text-white/40">({row.mad})</span>
                    </td>
                    <td className="py-4 text-white/70">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/50 text-sm mt-6">
            What changes the price, and what to watch for in a quote:{" "}
            <Link href="/blog/website-cost-morocco" className="text-primary hover:underline">
              website cost in Morocco
            </Link>{" "}
            ·{" "}
            <Link href="/fr/prix-creation-site-web-maroc" className="text-primary hover:underline">
              prix création site web Maroc
            </Link>
          </p>
        </section>

        {/* Process */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-8">Our web design process</h2>
          <ol className="space-y-4">
            {[
              { t: "Discovery", d: "A free call or WhatsApp chat about what the site must achieve. You get a fixed quote and timeline within 24 hours." },
              { t: "Structure & SEO plan", d: "Pages, languages and the keywords your customers search for in Morocco, decided before any design." },
              { t: "Design & development", d: "Custom design built mobile-first in Next.js, with 2–3 review rounds on a private preview link." },
              { t: "Launch & handover", d: "Launch, sitemap submitted to Google, Google Business Profile guidance, and every login handed over to you." },
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

        {/* Portfolio */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-12">Recent websites we built in Morocco</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/portfolio/dar-atlas-immobilier" className="glass rounded-2xl p-7 border border-white/10 hover:border-primary/30 transition-all duration-300">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Real estate · built in 14 days</p>
              <h3 className="text-xl font-bold mb-2">Dar Atlas Immobilier</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                A real estate website for finding property in Morocco: clear listings, simple search and
                a direct path to contacting the agency.
              </p>
            </Link>
            <Link href="/portfolio/dar-zahra-modern-moroccan-restaurant" className="glass rounded-2xl p-7 border border-white/10 hover:border-primary/30 transition-all duration-300">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Restaurant · built in 10 days</p>
              <h3 className="text-xl font-bold mb-2">Dar Zahra — modern Moroccan restaurant</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                A restaurant website that brings the story, cuisine and atmosphere online and leads
                guests to a table reservation.
              </p>
            </Link>
          </div>
          <p className="text-white/50 text-sm mt-8">
            <Link href="/portfolio" className="text-primary hover:underline">See our full web design portfolio →</Link>
          </p>
        </section>

        {/* Why local */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">
                Why choose a Moroccan web design agency?
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  We understand the Moroccan market from the inside: the mix of local and international
                  clients, the importance of French alongside Arabic and English, and the needs of the
                  tourism businesses that drive much of the economy.
                </p>
                <p>
                  At the same time, we build to international standards — Next.js, Tailwind CSS,
                  PostgreSQL, custom code rather than a page builder, and full technical SEO. Your
                  clients in France, the UK or the UAE get the same experience as your local clients.
                </p>
                <p>
                  Before anything is designed we ask what the site is for. A booking engine, a lead
                  form, a catalogue that ranks on Google — the business goal decides the build, and we
                  measure the result in enquiries rather than in how the site looks in a portfolio.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Languages", value: "EN · FR · AR" },
                { label: "Delivery", value: "7–21 days" },
                { label: "Studio", value: "Marrakech, MA" },
                { label: "Clients", value: "Morocco & worldwide" },
                { label: "Starting from", value: "$250 / 2 500 MAD" },
                { label: "Response", value: "Within 24h" },
              ].map(({ label, value }) => (
                <div key={label} className="glass rounded-xl p-5 border border-white/10 text-center">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-white font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* French section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5" lang="fr">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
              En français
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-4">
              Création de site web au Maroc
            </h2>
            <p className="text-white/50 leading-relaxed mb-4">
              Digital Studio LF est une agence web basée à Marrakech, spécialisée dans la création de
              sites web sur mesure pour les entreprises marocaines et internationales : sites vitrines,
              landing pages, boutiques en ligne, dashboards et CRM, livrés en 7 à 21 jours.
            </p>
            <p className="text-white/50 leading-relaxed">
              <strong className="text-white/70">Prix :</strong> à partir de 250 $ (2 500 MAD) pour une
              landing page, 700 $ (7 000 MAD) pour un site vitrine complet et 1 200 $ (12 000 MAD) pour
              un dashboard. Devis personnalisé en 24h.{" "}
              <Link href="/fr/creation-site-web-maroc" className="text-primary hover:underline">
                Lire la page en français →
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">Web design in Morocco: FAQ</h2>
          <div className="space-y-6">
            {faqs.map(({ question, answer }) => (
              <div key={question} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-bold mb-2">{question}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA + internal links */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5 text-center">
          <h2 className="text-3xl font-black mb-4">Get a fixed quote for your website</h2>
          <p className="text-white/55 mb-8">Tell us what you need. You get a clear price and timeline within 24 hours.</p>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-300">
            Request a free quote
          </Link>
          <div className="flex flex-wrap gap-3 justify-center mt-12">
            <Link href="/services/business-websites" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Business Websites</Link>
            <Link href="/services/landing-pages" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Landing Pages</Link>
            <Link href="/services/crm-systems" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">CRM Systems</Link>
            <Link href="/services/crm-for-travel-agencies" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">CRM for Travel Agencies</Link>
            <Link href="/web-design-marrakech" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Web Design Marrakech</Link>
            <Link href="/portfolio" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Our Portfolio</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
