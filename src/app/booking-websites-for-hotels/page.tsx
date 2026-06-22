import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Booking Websites for Hotels & Riads | Direct Booking System",
  description:
    "Custom direct booking websites for hotels, riads, and boutique properties. Stop paying OTA commissions — own your reservations. Built for properties in Morocco and worldwide.",
  alternates: { canonical: "/booking-websites-for-hotels" },
  keywords: [
    "booking website for hotels",
    "direct booking website",
    "riad booking website",
    "hotel booking website design",
    "booking website without booking.com",
    "boutique hotel website",
    "direct reservation system",
    "hotel website Morocco",
  ],
  openGraph: {
    title: "Booking Websites for Hotels & Riads | Digital Studio LF",
    description:
      "Custom direct booking websites for hotels and riads. Stop paying 15–25% OTA commissions. Own your reservations.",
    url: "https://digitalstudiolf.online/booking-websites-for-hotels",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Booking Website for Hotels & Riads",
  provider: {
    "@type": "LocalBusiness",
    name: "Digital Studio LF",
    url: "https://digitalstudiolf.online",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marrakesh",
      addressCountry: "MA",
    },
  },
  description:
    "Custom direct booking websites for independent hotels, riads, and boutique properties. Includes availability calendar, secure payment integration, multi-language support, and reservation management dashboard.",
  areaServed: [
    { "@type": "Country", name: "Morocco" },
    { "@type": "AdministrativeArea", name: "Worldwide" },
  ],
  serviceType: "Web Development",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    description: "Custom booking website — contact for pricing",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Booking Websites for Hotels", item: "https://digitalstudiolf.online/booking-websites-for-hotels" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a hotel booking website cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A custom hotel booking website typically costs between $1,200 and $4,500 depending on features. Basic sites with an availability calendar and contact form start lower; full systems with online payment, multi-room management, and a reservation dashboard are on the higher end. Contact us for a quote tailored to your property.",
      },
    },
    {
      "@type": "Question",
      name: "Can I take direct bookings without Booking.com or Airbnb?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A direct booking website lets guests reserve and pay without going through any OTA. You keep 100% of the revenue instead of paying 15–25% commission per reservation. The site integrates a secure payment gateway (Stripe, PayPal, or local options) and sends automated confirmation emails.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build booking websites for riads in Marrakech?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — we specialize in booking websites for riads and boutique hotels in Marrakech and across Morocco. We understand the local market: multi-language support (French, English, Arabic), seasonal pricing, and integration with local payment methods.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a hotel booking website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A complete hotel booking website typically takes 2–4 weeks from design approval to launch. We start with a brief, design the look, code the booking system, connect payment, and test thoroughly before going live.",
      },
    },
  ],
};

const features = [
  {
    title: "Availability Calendar",
    desc: "Real-time calendar synced to your reservations. Guests see open dates instantly — no back-and-forth emails.",
    icon: "📅",
  },
  {
    title: "Secure Online Payment",
    desc: "Stripe, PayPal, or local gateways. Guests pay at booking with a secure, branded checkout flow.",
    icon: "💳",
  },
  {
    title: "Reservation Dashboard",
    desc: "Manage all bookings from a clean admin panel. See arrivals, departures, occupancy, and guest details.",
    icon: "📊",
  },
  {
    title: "Multi-language Support",
    desc: "Reach French, English, Arabic, and Spanish-speaking guests with a fully translated booking experience.",
    icon: "🌍",
  },
  {
    title: "Automated Emails",
    desc: "Confirmation, reminder, and thank-you emails go out automatically — no manual follow-up needed.",
    icon: "📧",
  },
  {
    title: "Mobile-first Design",
    desc: "Over 65% of hotel searches happen on mobile. Your site loads fast and books beautifully on any screen.",
    icon: "📱",
  },
];

const faqs = [
  {
    q: "How much does a hotel booking website cost?",
    a: "A custom hotel booking website typically costs between $1,200 and $4,500 depending on features. Basic sites with an availability calendar and contact form start lower; full systems with online payment, multi-room management, and a reservation dashboard are on the higher end. Contact us for a quote tailored to your property.",
  },
  {
    q: "Can I take direct bookings without Booking.com or Airbnb?",
    a: "Yes. A direct booking website lets guests reserve and pay without going through any OTA. You keep 100% of the revenue instead of paying 15–25% commission per reservation. The site integrates a secure payment gateway (Stripe, PayPal, or local options) and sends automated confirmation emails.",
  },
  {
    q: "Do you build booking websites for riads in Marrakech?",
    a: "Yes — we specialize in booking websites for riads and boutique hotels in Marrakech and across Morocco. We understand the local market: multi-language support (French, English, Arabic), seasonal pricing, and integration with local payment methods.",
  },
  {
    q: "How long does it take to build a hotel booking website?",
    a: "A complete hotel booking website typically takes 2–4 weeks from design approval to launch. We start with a brief, design the look, code the booking system, connect payment, and test thoroughly before going live.",
  },
];

export default function BookingWebsitesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <nav className="text-sm text-white/40 mb-8 flex justify-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Booking Websites for Hotels</span>
          </nav>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            Hospitality Web Design
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Booking Websites for{" "}
            <span className="gradient-text">Hotels & Riads</span>
          </h1>
          <p className="text-white/55 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop giving 15–25% of every reservation to Booking.com or Airbnb. A custom direct booking website puts you in control — more revenue, more guest relationships, zero commission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-primary/25"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/blog/direct-booking-website-without-booking-com"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] text-white/90 font-semibold text-base transition-all duration-300"
            >
              Why Direct Bookings Matter →
            </Link>
          </div>
        </section>

        {/* OTA commission problem */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 sm:p-10 border border-white/10">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">The OTA Commission Problem</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Booking.com charges 15–25% per reservation. Airbnb takes 3–5% from hosts plus 14% from guests. For a riad or boutique hotel doing $5,000/month in bookings, that&apos;s $750–$1,250 leaving your business every single month — money that belongs to you.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              OTAs also own the guest relationship. They control the review system, the messaging, and the data. When a guest books through an OTA, you receive a booking — not a loyal customer. You don&apos;t have their email, you can&apos;t market to them again, and they&apos;ll book through the OTA next time too.
            </p>
            <p className="text-white/60 leading-relaxed">
              A direct booking website changes all of this. Guests find you, visit your site, and book directly. You keep the revenue, you own the relationship, and you build a guest list you can market to for free.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            Everything Your Property Needs
          </h2>
          <p className="text-white/50 text-center max-w-xl mx-auto mb-12">
            A complete booking system built for independent properties — from single-room riads to boutique hotels.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass rounded-xl p-6 border border-white/10 hover:border-primary/20 transition-all duration-300">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why choose us */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 sm:p-10 border border-white/10">
            <h2 className="text-2xl sm:text-3xl font-black mb-6">Why Riads & Hotels Choose Us</h2>
            <div className="space-y-4">
              {[
                { title: "Morocco market expertise", desc: "We've built booking systems for riads and hotels in Marrakech. We know the French-speaking guest market, the local payment landscape, and what converts in the hospitality sector." },
                { title: "Owned and customisable", desc: "Unlike template platforms that lock you into monthly fees and limited design, you own the code. No recurring platform fee — just hosting costs." },
                { title: "Fast delivery", desc: "Most booking websites go live within 2–4 weeks. You don't wait months to start capturing direct reservations." },
                { title: "Ongoing support", desc: "We stay available after launch for updates, seasonal content changes, and technical fixes. You're not on your own." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex-shrink-0 mt-1 flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-3">{item.q}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-black mb-6">Related Articles & Services</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { href: "/blog/direct-booking-website-without-booking-com", label: "How to Get Direct Bookings Without Booking.com" },
              { href: "/blog/websites-for-riads-and-hotels-marrakesh", label: "Websites for Riads and Hotels in Marrakesh" },
              { href: "/services/business-websites", label: "Business Websites" },
              { href: "/web-design-morocco", label: "Web Design Agency in Morocco" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="glass rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-all duration-300 text-sm text-white/70 hover:text-primary">
                {l.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
