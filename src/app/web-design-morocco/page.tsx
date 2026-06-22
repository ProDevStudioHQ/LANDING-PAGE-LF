import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Web Design Agency in Morocco",
  description:
    "Web design agency in Marrakesh, Morocco. Custom multilingual websites for riads, hotels, restaurants & travel agencies. FR/AR/EN. Agence web Marrakech.",
  alternates: {
    canonical: "/web-design-morocco",
    languages: {
      en: "/web-design-morocco",
      fr: "/fr/creation-site-web-maroc",
      "x-default": "/web-design-morocco",
    },
  },
  keywords: [
    "web design Morocco",
    "web design Marrakech",
    "agence web Marrakech",
    "agence web Maroc",
    "création site web Maroc",
    "développeur web Marrakech",
    "website design Morocco",
    "riad website design",
    "hotel website Morocco",
  ],
  openGraph: {
    title: "Web Design Agency in Morocco | Agence Web Marrakech — Digital Studio LF",
    description:
      "Custom websites for Moroccan businesses — riads, hotels, travel agencies, restaurants. French & Arabic support. Based in Marrakesh.",
    url: "https://digitalstudiolf.online/web-design-morocco",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Digital Studio LF — Web Design Agency Marrakesh",
  image: "https://digitalstudiolf.online/images/idea-digital.png",
  url: "https://digitalstudiolf.online",
  description:
    "Web design and development agency in Marrakesh, Morocco. Building custom websites, landing pages, dashboards and CRM systems for Moroccan businesses and clients worldwide.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marrakesh",
    addressRegion: "Marrakech-Safi",
    addressCountry: "MA",
  },
  geo: { "@type": "GeoCoordinates", latitude: 31.6295, longitude: -7.9811 },
  areaServed: [
    { "@type": "City", name: "Marrakesh" },
    { "@type": "Country", name: "Morocco" },
    { "@type": "AdministrativeArea", name: "Worldwide" },
  ],
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-18:00",
  availableLanguage: ["English", "French", "Arabic"],
  sameAs: [
    "https://www.etsy.com/shop/DigitalStudioLF",
    "https://www.fiverr.com/theknight12?public_mode=true",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Web Design Morocco", item: "https://digitalstudiolf.online/web-design-morocco" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien coûte un site web au Maroc ? (How much does a website cost in Morocco?)",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our website packages for Moroccan businesses start from $150 for a login page, $250 for a landing page, $700 for a full business website, and $1,200 for an admin dashboard. We also provide quotes in MAD (Moroccan Dirham) on request.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build websites in French for Moroccan clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui / Yes. We work in English, French, and Arabic and regularly build multilingual websites for Moroccan businesses targeting local and international clients — including proper hreflang and lang attributes.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build websites for riads and hotels in Marrakesh?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We build booking showcase sites, direct-booking landing pages, and reservation systems for riads, hotels, and guesthouses in Marrakesh and across Morocco — with multilingual support and local SEO optimisation.",
      },
    },
  ],
};

export default function WebDesignMoroccoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <nav className="text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Web Design Morocco</span>
          </nav>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
              Agence Web Marrakech · Web Design Agency Morocco
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Web Design Agency<br />
              <span className="text-primary">in Morocco</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-4 max-w-2xl">
              Based in Marrakesh, we build custom websites, landing pages, dashboards and CRM systems
              for businesses across Morocco and worldwide — in English, French, and Arabic.
            </p>
            <p className="text-white/40 text-base leading-relaxed mb-8 max-w-2xl italic">
              Basée à Marrakech, nous créons des sites web sur mesure pour les entreprises marocaines
              et internationales — en anglais, français et arabe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg hover:shadow-primary/30 hover:scale-[1.03] transition-all duration-300">
                Get a free quote
              </a>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all duration-300">
                See all services
              </Link>
            </div>
          </div>
        </section>

        {/* Local market focus */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Built for Moroccan Businesses
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-3xl leading-relaxed">
            Morocco&apos;s digital market is growing fast — but most Moroccan businesses still lack a website
            that truly represents their quality, attracts international clients, and ranks on Google.
            We fix that, starting from Marrakesh and reaching worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Riads & Guesthouses",
                desc: "Direct-booking websites that reduce Booking.com dependency. Showcase rooms, gardens, and experiences. Multilingual (English, French, Arabic) for international guests.",
              },
              {
                title: "Hotels & Resorts",
                desc: "Professional hotel websites with room showcases, amenity pages, local activity guides, and booking request forms. SEO-optimised for 'hotel Marrakech' searches.",
              },
              {
                title: "Travel Agencies & Tour Operators",
                desc: "Tour showcases, itinerary pages, booking request forms, and custom CRM systems to manage leads and follow-ups. We understand the Morocco tourism market.",
              },
              {
                title: "Restaurants & Cafés",
                desc: "Menu showcases, reservation forms, event pages, and Google Business integration. Bilingual (French/English) for local and tourist audiences.",
              },
              {
                title: "Real Estate Agencies",
                desc: "Property listing sites with search, filtering, map integration, and lead capture. Targeted at buyers from France, UK, and Gulf countries — in their language.",
              },
              {
                title: "Any Moroccan Business",
                desc: "E-commerce, service businesses, professional practices, NGOs — if you need a premium digital presence in Morocco, we build it. Custom quote within 24 hours.",
              },
            ].map((item) => (
              <div key={item.title} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-primary font-bold mb-2">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why local */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">
                Why Choose a Marrakesh-Based Web Agency?
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  We understand the Moroccan market from the inside — the mix of local and international clients,
                  the importance of French alongside Arabic and English, and the specific needs of tourism-related
                  businesses that drive a large part of Marrakesh&apos;s economy.
                </p>
                <p>
                  We&apos;ve built CRM systems for travel agencies, booking websites for riads, and business dashboards
                  for service companies across Morocco. We know what works here.
                </p>
                <p>
                  At the same time, we build to international standards — Next.js, Tailwind CSS, PostgreSQL, clean code,
                  full SEO, and Lighthouse scores above 90. Your clients in France, the UK, or the UAE get the same
                  premium experience as your local clients.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Languages", value: "EN · FR · AR" },
                { label: "Delivery", value: "7–21 days" },
                { label: "Location", value: "Marrakesh, MA" },
                { label: "Clients", value: "Morocco & worldwide" },
                { label: "Starting from", value: "$150" },
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
              En français
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-4">
              Création de Site Web au Maroc — Agence Web Marrakech
            </h2>
            <p className="text-white/50 leading-relaxed mb-4">
              Digital Studio LF est une agence web basée à Marrakech spécialisée dans la création de sites web
              sur mesure pour les entreprises marocaines et internationales. Nous construisons des sites web
              professionnels, des landing pages, des tableaux de bord administratifs et des systèmes CRM
              livrés en 7 à 21 jours.
            </p>
            <p className="text-white/50 leading-relaxed mb-4">
              Nous travaillons avec les riads, les hôtels, les agences de voyages, les restaurants, et toutes
              les entreprises qui souhaitent une présence digitale premium au Maroc et à l&apos;international.
              Nos sites sont disponibles en anglais, français et arabe.
            </p>
            <p className="text-white/50 leading-relaxed">
              <strong className="text-white/70">Prix :</strong> à partir de 150$ pour une page de connexion,
              250$ pour une landing page, 700$ pour un site web complet, et 1 200$ pour un tableau de bord.
              Devis personnalisé disponible en 24h.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Combien coûte un site web au Maroc? (How much does a website cost in Morocco?)",
                a: "Our website packages start from $150 for a login page, $250 for a landing page, $700 for a full 5–7 page business website, and $1,200 for a custom admin dashboard. We also provide quotes in MAD (Moroccan Dirham) on request. All prices are fixed — no hidden fees.",
              },
              {
                q: "Do you build websites in French for Moroccan clients?",
                a: "Oui / Yes. We work in English, French, and Arabic and regularly build multilingual websites for Moroccan businesses targeting local and international clients — including proper hreflang tags, lang attributes, and separate content blocks for each language.",
              },
              {
                q: "Do you build websites for riads and hotels in Marrakesh?",
                a: "Yes. We build booking showcase sites, direct-booking landing pages, and reservation systems for riads, hotels, and guesthouses in Marrakesh and across Morocco — with multilingual content and local SEO to help you rank for 'riad Marrakech' and related searches.",
              },
              {
                q: "Can you help with local SEO in Morocco?",
                a: "Yes. Every website we build includes on-page SEO basics: keyword-targeted titles, meta descriptions, structured data (LocalBusiness schema with Marrakesh address and geo coordinates), mobile responsiveness, and sitemap submission. We also advise on Google Business Profile setup and local directory listings.",
              },
              {
                q: "Do you build CRM systems for travel agencies in Morocco?",
                a: "Yes — and it's one of our specialities. We've built custom CRM systems for Moroccan travel agencies and tour operators: booking tracking, client follow-up automation, lead pipeline management, and itinerary builders. See our dedicated page: CRM for travel agencies.",
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
          <p className="text-white/40 text-sm text-center mb-6">Explore our services</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/services/landing-pages" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-orange-500/30 hover:text-orange-400 transition-colors">Landing Pages</Link>
            <Link href="/services/business-websites" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Business Websites</Link>
            <Link href="/services/crm-systems" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-colors">CRM Systems</Link>
            <Link href="/services/crm-for-travel-agencies" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-colors">CRM for Travel Agencies</Link>
            <Link href="/portfolio" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Our Portfolio</Link>
            <Link href="/#contact" className="px-4 py-2 rounded-full border border-primary/30 text-primary text-sm hover:bg-primary/10 transition-colors">Free Quote</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
