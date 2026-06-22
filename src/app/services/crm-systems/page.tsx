import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Custom CRM Development for Growing Businesses",
  description:
    "Custom CRM development tailored to your workflow: lead management, sales pipelines, automated follow-ups, and client portals. From $2,500, delivered in 14 days. Morocco & worldwide.",
  alternates: { canonical: "/services/crm-systems" },
  openGraph: {
    title: "Custom CRM Development | Digital Studio LF",
    description:
      "CRM systems built around how your business works — lead management, pipelines, automation, and reporting. From $2,500, 14-day delivery.",
    url: "https://digitalstudiolf.online/services/crm-systems",
    images: [{ url: "https://digitalstudiolf.online/images/idea-digital.png", width: 1200, height: 630, alt: "Digital Studio LF" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom CRM Development",
  description: "Custom CRM platforms with lead management, sales pipelines, automated follow-ups, client portals, and reporting. Built for service businesses and agencies.",
  provider: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
  areaServed: [{ "@type": "Country", name: "Morocco" }, { "@type": "AdministrativeArea", name: "Worldwide" }],
  serviceType: "Custom CRM Development",
  offers: { "@type": "Offer", price: "2500", priceCurrency: "USD", description: "Growth CRM system — 14-day delivery" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://digitalstudiolf.online/services" },
    { "@type": "ListItem", position: 3, name: "CRM Systems", item: "https://digitalstudiolf.online/services/crm-systems" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does a custom CRM cost?", acceptedAnswer: { "@type": "Answer", text: "Custom CRM development starts at $2,500 for a Growth CRM delivered in 14 days. This includes lead management, pipeline, client profiles, dashboard, notes & tracking, team access, and 30 days of support." } },
    { "@type": "Question", name: "Can you build a CRM for travel agencies?", acceptedAnswer: { "@type": "Answer", text: "Yes — and it's one of our specialities. We build CRM systems tailored for travel agencies and tour operators: booking tracking, client follow-up sequences, lead pipelines, itinerary management, and Booking.com channel visibility. See our dedicated CRM for travel agencies page for details." } },
    { "@type": "Question", name: "What integrations can the CRM connect to?", acceptedAnswer: { "@type": "Answer", text: "We integrate CRMs with Gmail, Outlook, Stripe, PayPal, Mailchimp, WhatsApp, Zapier, Slack, Google Calendar, Calendly, and many other tools via API. Custom integrations are available for any service with an API." } },
  ],
};

export default function CRMSystemsPage() {
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
            <span className="text-white/70">CRM Systems</span>
          </nav>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-5">
              Custom CRM Development
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Custom CRM Development<br />
              <span className="text-emerald-400">for Growing Businesses</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl">
              Generic CRMs force you to adapt your workflow to their system. We build the other way around —
              a CRM that fits exactly how your business operates, delivered in 14 days from $2,500.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-semibold rounded-full shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.03] transition-all duration-300">
                Start my CRM — $2,500
              </a>
              <Link href="/services/crm-for-travel-agencies" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-emerald-500/20 text-emerald-400/80 font-semibold hover:border-emerald-500/40 hover:text-emerald-400 transition-all duration-300">
                CRM for travel agencies →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">What&apos;s Included</h2>
          <p className="text-white/50 text-lg mb-12 max-w-2xl">
            Every CRM is built around your specific sales process, client lifecycle, and team structure —
            with the exact features you need and nothing you don&apos;t.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Contact & Lead Management", desc: "Centralised contact database with lead scoring, tags, custom fields, activity history, and notes — every interaction tracked in one place." },
              { title: "Sales Pipeline", desc: "Drag-and-drop pipeline with custom stages that match your sales process. See every deal at a glance and know exactly where each lead stands." },
              { title: "Automated Follow-ups", desc: "Email sequences, WhatsApp follow-up reminders, and task automation triggered by pipeline stage changes — so no lead slips through the cracks." },
              { title: "Task & Team Management", desc: "Assign tasks and leads to team members, set deadlines, track completion, and see workload distribution across your team." },
              { title: "Client Portals", desc: "Secure client-facing portals where clients can view project status, invoices, documents, and communicate with your team — branded to your business." },
              { title: "Revenue Reporting", desc: "Pipeline value, conversion rates, revenue forecasts, team performance, and custom reports exportable to PDF or Excel." },
              { title: "Email & Calendar Integration", desc: "Two-way Gmail/Outlook sync, Google Calendar integration, and Calendly booking directly from the CRM — no context switching." },
              { title: "Custom Modules", desc: "Need a booking tracker? An itinerary builder? A quote generator? We build custom modules specific to your industry on top of the CRM core." },
              { title: "30-Day Free Support", desc: "Free post-launch support for 30 days covering bug fixes, workflow adjustments, and team onboarding questions." },
            ].map((item) => (
              <div key={item.title} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-emerald-400 font-bold mb-2">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">The Build Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "We map your full client lifecycle, team structure, pipeline stages, and integrations needed. We define every module before a line is written." },
              { step: "02", title: "Proposal", desc: "A detailed scope document with every feature, screen, user role, and integration — plus a fixed price and timeline. Free." },
              { step: "03", title: "Build", desc: "Development on a private staging environment with 2–3 review rounds. Your team can test with real data before launch." },
              { step: "04", title: "Launch & Train", desc: "We deploy, migrate any existing data, and run a team training session so everyone is productive from day one." },
            ].map((s) => (
              <div key={s.step} className="glass rounded-xl p-6 border border-white/10">
                <span className="text-4xl font-black text-emerald-500/20 mb-3 block">{s.step}</span>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-center">CRM Pricing</h2>
          <p className="text-white/50 text-center mb-12">Fixed price, no hidden fees, delivered in 14 days.</p>
          <div className="max-w-sm mx-auto glass rounded-2xl p-8 border border-emerald-500/30">
            <p className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2">Growth</p>
            <p className="text-5xl font-black mb-1">$2,500</p>
            <p className="text-white/40 text-sm mb-6 line-through">was $5,000</p>
            <ul className="space-y-3 mb-8">
              {["Lead management", "Client profiles", "Dashboard overview", "Sales pipeline / workflow", "Notes & activity tracking", "Team access & roles", "Custom structure", "Email integration", "30 days free support", "Delivered in 14 days"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="text-emerald-400 mt-0.5">✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="/#contact" className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-semibold hover:scale-[1.02] transition-transform">
              Get started
            </a>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How much does a custom CRM cost?", a: "Custom CRM development starts at $2,500 for a Growth CRM delivered in 14 days. This includes lead management, pipeline, client profiles, dashboard, notes & tracking, team access, and 30 days of support." },
              { q: "Can you build a CRM for travel agencies?", a: "Yes — and it's one of our specialities. We build CRM systems tailored for travel agencies and tour operators: booking tracking, client follow-up sequences, lead pipelines, itinerary management, and revenue reporting. See our CRM for travel agencies page for details." },
              { q: "What integrations can the CRM connect to?", a: "We integrate CRMs with Gmail, Outlook, Stripe, PayPal, Mailchimp, WhatsApp, Zapier, Slack, Google Calendar, Calendly, and many other tools via API. Custom integrations are available for any service with an API." },
              { q: "Can I replace my current CRM with your custom one?", a: "Yes. We can migrate your existing contacts, deals, and history from HubSpot, Salesforce, Pipedrive, Notion, or spreadsheets into your new system so you lose nothing." },
              { q: "Is the CRM hosted on my own infrastructure?", a: "Yes. You own the code and we deploy to your infrastructure — whether that's a VPS, AWS, Vercel, or any cloud provider. No vendor lock-in." },
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
            <Link href="/services/crm-for-travel-agencies" className="px-4 py-2 rounded-full border border-emerald-500/20 text-emerald-400 text-sm hover:bg-emerald-500/10 transition-colors">CRM for Travel Agencies</Link>
            <Link href="/services/admin-dashboards" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-blue-500/30 hover:text-blue-400 transition-colors">Admin Dashboards</Link>
            <Link href="/services/business-websites" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Business Websites</Link>
            <Link href="/services/enterprise-solutions" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-amber-500/30 hover:text-amber-400 transition-colors">Enterprise Solutions</Link>
            <Link href="/#contact" className="px-4 py-2 rounded-full border border-emerald-500/30 text-emerald-400 text-sm hover:bg-emerald-500/10 transition-colors">Free Consultation</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
