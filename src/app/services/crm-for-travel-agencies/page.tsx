import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CRM for Travel Agencies — Custom System Built for Your Workflow",
  description:
    "Custom CRM systems built specifically for travel agencies and tour operators: booking tracking, client follow-ups, lead pipelines, itinerary management, and revenue reporting. Morocco & worldwide.",
  alternates: { canonical: "/services/crm-for-travel-agencies" },
  openGraph: {
    title: "CRM for Travel Agencies | Digital Studio LF",
    description:
      "Custom CRM for travel agencies: booking tracking, client follow-ups, lead pipelines, and itinerary management. Built around how travel businesses actually work.",
    url: "https://digitalstudiolf.online/services/crm-for-travel-agencies",
    images: [{ url: "https://digitalstudiolf.online/images/idea-digital.png", width: 1200, height: 630, alt: "Digital Studio LF" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CRM for Travel Agencies",
  description:
    "Custom CRM systems built specifically for travel agencies and tour operators. Includes booking tracking, client follow-up automation, lead pipeline management, itinerary builders, and revenue reporting.",
  provider: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
  areaServed: [{ "@type": "Country", name: "Morocco" }, { "@type": "AdministrativeArea", name: "Worldwide" }],
  serviceType: "CRM for Travel Agencies",
  offers: { "@type": "Offer", price: "2500", priceCurrency: "USD", description: "Custom CRM for travel agency — 14-day delivery" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://digitalstudiolf.online/services" },
    { "@type": "ListItem", position: 3, name: "CRM for Travel Agencies", item: "https://digitalstudiolf.online/services/crm-for-travel-agencies" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes a travel agency CRM different from a generic CRM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generic CRMs (HubSpot, Salesforce) are built around abstract 'deals' and 'contacts'. A travel agency CRM is built around your actual workflow: enquiry → itinerary proposal → deposit → final payment → departure → post-trip review. It tracks booking status, tour dates, destination details, supplier payments, and client preferences — not just a pipeline stage.",
      },
    },
    {
      "@type": "Question",
      name: "Can the CRM reduce our dependency on Booking.com?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The CRM paired with a direct-booking website helps you capture and nurture direct enquiries. You can track where leads come from, follow up automatically, and convert more direct bookings — reducing the commission you pay to OTAs like Booking.com or Expedia.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a custom travel agency CRM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard travel agency CRMs are delivered in 14 days. More complex systems (multi-branch, supplier management, custom itinerary builder) take 21–30 days. We scope exactly in the discovery call.",
      },
    },
  ],
};

export default function CRMForTravelAgenciesPage() {
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
            <span className="text-white/70">CRM for Travel Agencies</span>
          </nav>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-5">
              CRM for Travel Agencies & Tour Operators
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              CRM Built for<br />
              <span className="text-emerald-400">Travel Agencies</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl">
              Generic CRMs don&apos;t understand bookings, itineraries, or the travel sales cycle.
              We build custom CRM systems designed around how travel agencies actually work —
              from first enquiry to post-trip review, and everything in between.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-semibold rounded-full shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.03] transition-all duration-300">
                Book a free discovery call
              </a>
              <Link href="/services/crm-systems" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all duration-300">
                General CRM service →
              </Link>
            </div>
          </div>
        </section>

        {/* Pain points */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">The Problems Travel Agencies Face</h2>
          <p className="text-white/50 text-lg mb-12 max-w-2xl">
            These are the real pain points we hear from travel agencies every time — and what we solve.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                problem: "Enquiries fall through the cracks",
                solution: "Every enquiry captured, tagged, and auto-assigned. Follow-up reminders fire automatically if no response in 24h.",
              },
              {
                problem: "Too dependent on Booking.com / OTAs",
                solution: "Direct booking website + CRM that tracks and nurtures direct leads. Measure direct vs OTA bookings in one dashboard.",
              },
              {
                problem: "Client history scattered across WhatsApp, email, and spreadsheets",
                solution: "One client profile with full history: past tours, preferences, spend, correspondence, and documents.",
              },
              {
                problem: "No visibility into revenue and pipeline",
                solution: "Live dashboard: confirmed bookings, pending deposits, upcoming departures, monthly revenue, and team performance.",
              },
              {
                problem: "Itinerary proposals done manually in Word/PDF",
                solution: "Itinerary builder inside the CRM: select destinations, accommodations, activities — export a branded PDF in one click.",
              },
              {
                problem: "Team doesn&apos;t know who is following up on what",
                solution: "Lead assignments, task deadlines, team activity feed, and notification system so nothing is missed.",
              },
            ].map(({ problem, solution }) => (
              <div key={problem} className="glass rounded-xl p-6 border border-white/10">
                <p className="text-white/40 text-sm mb-2">❌ {problem}</p>
                <p className="text-emerald-400 text-sm font-medium">✓ {solution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">What&apos;s in the Travel Agency CRM</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Enquiry Pipeline", desc: "Visual drag-and-drop pipeline: New Enquiry → Proposal Sent → Deposit Paid → Confirmed → Departed → Reviewed. Custom stages for your process." },
              { title: "Client Profiles", desc: "Full client history: past trips, travel preferences, spending, passport/visa info, documents, and all past correspondence in one view." },
              { title: "Booking Tracker", desc: "Track every booking with tour dates, destinations, group size, accommodation, guides, transport, and supplier payment status." },
              { title: "Itinerary Builder", desc: "Day-by-day itinerary builder with activities, accommodation, transfers, and meals. Export a branded PDF proposal in one click." },
              { title: "Automated Follow-ups", desc: "Email and WhatsApp follow-up sequences triggered by pipeline stage — enquiry acknowledged within 1h, proposal follow-up on day 3, deposit reminder on day 7." },
              { title: "Revenue Dashboard", desc: "Live metrics: monthly revenue, bookings by destination, conversion rate, average booking value, and team performance breakdown." },
              { title: "Post-Trip Reviews", desc: "Automated review request sent after departure. Responses logged in the client profile. Identify your top-rated experiences." },
              { title: "Supplier Management", desc: "Track hotels, guides, transport providers, and activity operators. Log costs, payment status, contact details, and performance ratings." },
              { title: "WhatsApp Integration", desc: "Log WhatsApp conversations directly in the client profile. Set follow-up reminders. Never lose a conversation thread." },
            ].map((item) => (
              <div key={item.title} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-emerald-400 font-bold mb-2">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Case study placeholder */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Built for the Morocco Tourism Market</h2>
          <div className="glass rounded-2xl p-8 border border-emerald-500/20 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
              Case Study — Marrakesh Travel Agency
            </span>
            <p className="text-white/60 leading-relaxed mb-4">
              We built a full CRM for a Marrakesh-based travel agency specialising in desert tours, riad experiences,
              and custom Morocco itineraries. The system handles enquiries from 4 channels (website, Booking.com,
              WhatsApp, and email), automatically assigns follow-ups, generates branded PDF itineraries,
              and tracks revenue by tour type and booking channel.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              Before: leads managed across 3 WhatsApp groups, an Excel sheet, and a Gmail inbox.
              After: one system, zero missed leads, 40% faster proposal turnaround.
            </p>
            <Link href="/#contact" className="text-emerald-400 text-sm font-semibold hover:underline">
              Want the same for your agency? Let&apos;s talk →
            </Link>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-center">Travel Agency CRM Pricing</h2>
          <p className="text-white/50 text-center mb-12">Fixed price, scoped to your needs, delivered in 14 days.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-8 border border-emerald-500/30">
              <p className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2">Growth CRM</p>
              <p className="text-4xl font-black mb-1">$2,500</p>
              <p className="text-white/40 text-sm mb-6">Delivered in 14 days</p>
              <ul className="space-y-2.5 mb-6">
                {["Lead & enquiry pipeline", "Client profiles", "Booking tracker", "Revenue dashboard", "Team access & roles", "Email integration", "30 days free support"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-emerald-400 mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="/#contact" className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-semibold hover:scale-[1.02] transition-transform">
                Get started
              </a>
            </div>
            <div className="glass rounded-2xl p-8 border border-white/10">
              <p className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-2">Enterprise CRM</p>
              <p className="text-4xl font-black mb-1">Custom</p>
              <p className="text-white/40 text-sm mb-6">Timeline: 21–30 days</p>
              <ul className="space-y-2.5 mb-6">
                {["Everything in Growth", "Itinerary builder + PDF export", "Automated WhatsApp follow-ups", "Supplier management", "Post-trip review automation", "Multi-branch support", "API integrations", "Custom modules"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-amber-400 mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="mailto:digitalstudiolf@gmail.com" className="block w-full text-center py-3 rounded-full border border-amber-500/30 text-amber-400 font-semibold hover:bg-amber-500/10 transition-colors">
                Book a strategy call
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "What makes a travel agency CRM different from a generic CRM?", a: "Generic CRMs are built around abstract 'deals' and 'contacts'. A travel agency CRM is built around your actual workflow: enquiry → itinerary proposal → deposit → final payment → departure → post-trip review. It tracks booking status, tour dates, destination details, supplier payments, and client preferences — not just a pipeline stage." },
              { q: "Can the CRM reduce our dependency on Booking.com?", a: "Yes. The CRM paired with a direct-booking website helps you capture and nurture direct enquiries. You can track where leads come from, follow up automatically, and convert more direct bookings — reducing the commission you pay to OTAs like Booking.com or Expedia." },
              { q: "How long does it take to build a custom travel agency CRM?", a: "Standard travel agency CRMs are delivered in 14 days. More complex systems (multi-branch, supplier management, custom itinerary builder) take 21–30 days. We scope exactly in the discovery call." },
              { q: "Can you migrate our existing data from spreadsheets or another CRM?", a: "Yes. We migrate contacts, booking history, and client data from Excel, Google Sheets, HubSpot, Pipedrive, or any other system so you lose nothing when you switch." },
              { q: "Do you also build the direct booking website?", a: "Yes. We offer combined CRM + website packages: a direct-booking landing page or full website that feeds enquiries directly into your CRM, with automated acknowledgement emails and follow-up sequences." },
            ].map(({ q, a }) => (
              <div key={q} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-bold mb-2">{q}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <p className="text-white/40 text-sm text-center mb-6">Related services</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/services/crm-systems" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-colors">General CRM Development</Link>
            <Link href="/services/business-websites" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Business Websites</Link>
            <Link href="/web-design-morocco" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Web Design Morocco</Link>
            <Link href="/#contact" className="px-4 py-2 rounded-full border border-emerald-500/30 text-emerald-400 text-sm hover:bg-emerald-500/10 transition-colors">Free Discovery Call</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
