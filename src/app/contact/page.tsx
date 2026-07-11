import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { WHATSAPP_NUMBER as DEFAULT_WHATSAPP_NUMBER, BUSINESS_PHONE } from "@/lib/schema";

const SITE_URL = "https://digitalstudiolf.online";
const EMAILS = [
  { label: "General enquiries", address: "hello@digitalstudiolf.online" },
  { label: "Contact", address: "contact@digitalstudiolf.online" },
  { label: "Help", address: "help@digitalstudiolf.online" },
  { label: "Team", address: "team@digitalstudiolf.online" },
  { label: "Support", address: "support@digitalstudiolf.online" },
];
const PRIMARY_EMAIL = EMAILS[0].address;
const SUPPORT_EMAIL = "support@digitalstudiolf.online";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Digital%20Studio%20LF%2C%20I%27d%20like%20to%20discuss%20a%20project`
  : "";

export const metadata: Metadata = {
  // 56 chars — leads with the focus keyword "Contact Digital Studio LF" (matches
  // the H1), then the service/location qualifier. Uses a pipe, not an em-dash:
  // some SEO crawlers split titles on " — " and only measure the first segment.
  title: { absolute: "Contact Digital Studio LF | Web Design Agency Marrakesh" },
  description:
    "Contact Digital Studio LF for a free consultation. Reach us by WhatsApp, email, or the form — usually replies within 2 hours. Marrakesh, working worldwide.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Digital Studio LF | Web Design Agency Marrakesh",
    description:
      "Free 30-min consultation. Based in Marrakesh, working worldwide. WhatsApp, email, or the form — usually replies within 2 hours.",
    url: `${SITE_URL}/contact`,
    images: [{ url: `${SITE_URL}/images/idea-digital.png`, width: 1200, height: 630, alt: "Contact Digital Studio LF" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/images/idea-digital.png`],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
  ],
};

// The business identity is rendered once sitewide (root layout, #business node).
// This page only declares itself as the ContactPage ABOUT that entity — a second
// standalone Organization here would conflict with the canonical NAP data.
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#webpage`,
  name: "Contact Digital Studio LF",
  url: `${SITE_URL}/contact`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#business` },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        {/* Hero — centered, enterprise-style */}
        <section className="pt-40 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[130px]" aria-hidden="true" />
          <nav aria-label="Breadcrumb" className="relative text-sm text-white/40 mb-10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Contact</span>
          </nav>
          <div className="relative text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              Contact us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Contact <span className="gradient-text">Digital Studio LF</span>
            </h1>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
              Talk to the team behind 120+ delivered projects. Free 30-minute consultation —
              based in Marrakesh, working worldwide in English, French, and Arabic.
            </p>
            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/50">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Replies within 2 hours
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                Trusted by 50+ businesses
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/40" aria-hidden="true" />
                EN · FR · AR
              </span>
            </div>
          </div>
        </section>

        {/* Channel cards — segmented by intent, like enterprise contact hubs */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHATSAPP_URL && (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass rounded-2xl p-7 border border-white/10 hover:border-emerald-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 text-xl mb-5" aria-hidden="true">✆</span>
                <h2 className="text-lg font-bold mb-1.5 group-hover:text-emerald-400 transition-colors">Talk to sales</h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Start a project, get a quote, or book your free consultation. WhatsApp is our fastest channel.
                </p>
                <span className="text-emerald-400 text-sm font-semibold inline-flex items-center gap-1.5">
                  Chat on WhatsApp <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                </span>
              </a>
            )}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="group glass rounded-2xl p-7 border border-white/10 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/15 text-primary text-xl mb-5" aria-hidden="true">🛟</span>
              <h2 className="text-lg font-bold mb-1.5 group-hover:text-primary transition-colors">Get support</h2>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                Existing client? Reach the team that built your project for fixes, updates, and maintenance.
              </p>
              <span className="text-primary text-sm font-semibold inline-flex items-center gap-1.5">
                {SUPPORT_EMAIL} <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
              </span>
            </a>
            <a
              href={`mailto:${PRIMARY_EMAIL}`}
              className="group glass rounded-2xl p-7 border border-white/10 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300 sm:col-span-2 lg:col-span-1"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-white/80 text-xl mb-5" aria-hidden="true">✉</span>
              <h2 className="text-lg font-bold mb-1.5 group-hover:text-white transition-colors">General enquiries</h2>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                Partnerships, press, careers, or anything else — we read and answer every message.
              </p>
              <span className="text-white/70 text-sm font-semibold inline-flex items-center gap-1.5">
                {PRIMARY_EMAIL} <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
              </span>
            </a>
          </div>
        </section>

        {/* Form + office panel */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* Form (feeds the CRM) */}
            <div className="glass rounded-2xl p-6 sm:p-10 border border-white/10">
              <h2 className="text-2xl sm:text-3xl font-black mb-2">Tell us about your project</h2>
              <p className="text-white/50 text-sm mb-8">
                Share a few details and we&apos;ll come back with next steps — usually within 2 hours.
              </p>
              <ContactForm />
            </div>

            {/* Office / company panel */}
            <aside className="space-y-5 lg:sticky lg:top-28">
              <div className="glass rounded-2xl p-7 border border-white/10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40 mb-5">
                  Headquarters
                </p>
                <dl className="space-y-4">
                  {[
                    { label: "Office", value: "Marrakesh, Marrakech-Safi, Morocco" },
                    { label: "Hours", value: "Monday – Friday · 09:00 – 18:00 (GMT+1)" },
                    { label: "Languages", value: "English · Français · العربية" },
                    ...(BUSINESS_PHONE ? [{ label: "Phone / WhatsApp", value: BUSINESS_PHONE }] : []),
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <dt className="text-[11px] uppercase tracking-wider text-white/35 font-medium mb-0.5">{label}</dt>
                      <dd className="text-[15px] text-white/85 font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=31.6295,-7.9811"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-primary text-sm font-semibold hover:underline"
                >
                  View on Google Maps <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="glass rounded-2xl p-7 border border-white/10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40 mb-5">
                  Direct lines
                </p>
                <ul className="space-y-3">
                  {EMAILS.map((e) => (
                    <li key={e.address} className="flex items-baseline justify-between gap-3">
                      <span className="text-white/40 text-xs whitespace-nowrap">{e.label}</span>
                      <a href={`mailto:${e.address}`} className="text-white/75 text-sm font-medium hover:text-primary transition-colors truncate">
                        {e.address}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-2xl p-7 border border-primary/20 bg-primary/[0.04]">
                <p className="text-white/85 text-sm leading-relaxed">
                  <span className="text-primary font-bold">No middlemen.</span> Your message goes
                  straight to the founder building your project — not a call centre or ticket queue.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* What happens after you reach out */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">What Happens After You Get in Touch</h2>
          <p className="text-white/50 text-lg mb-12 max-w-3xl leading-relaxed">
            Contacting a web design agency shouldn&apos;t feel like shouting into a void. When you
            message Digital Studio LF — by WhatsApp, email, or the form above — you talk directly to
            the people who will actually build your project. No call centres, no account managers,
            no being passed between departments. Here&apos;s exactly what to expect.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "We reply within 2 hours",
                desc: "During working hours (Mo–Fr, 9:00–18:00 GMT+1) you'll usually hear back within two hours. Outside those hours, the next morning at the latest.",
              },
              {
                step: "02",
                title: "Free 30-minute consultation",
                desc: "We book a short call — in English, French, or Arabic — to understand your business, goals, and what you actually need. No sales pitch, no pressure.",
              },
              {
                step: "03",
                title: "Clear proposal & fixed quote",
                desc: "Within 24 hours of the call you receive a written proposal with a fixed price, a fixed timeline, and a clear scope. Quotes available in USD or MAD.",
              },
              {
                step: "04",
                title: "We start building",
                desc: "Once you approve, we begin. Most projects ship in 7–21 days, with direct WhatsApp and email access to the team the whole way through.",
              },
            ].map((s) => (
              <div key={s.step} className="glass rounded-xl p-6 border border-white/10">
                <span className="text-primary text-2xl font-black">{s.step}</span>
                <h3 className="text-white font-bold mt-3 mb-2">{s.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to include + who we help */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-5">What to Include in Your Message</h2>
              <p className="text-white/55 leading-relaxed mb-5">
                The more we know up front, the faster and more accurate your quote. You don&apos;t need
                a full brief — just a few lines covering these points helps us give you a realistic
                price and timeline on the first reply:
              </p>
              <ul className="space-y-3 text-white/60 text-[15px] leading-relaxed">
                {[
                  "What you need — a landing page, business website, admin dashboard, custom CRM, or something else.",
                  "A little about your business and who your customers are.",
                  "Any websites you like the look of, or an existing site you want to replace or improve.",
                  "Which languages the site needs — English, French, Arabic, or a mix.",
                  "Your rough budget and ideal launch date, if you have one.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white/45 text-sm leading-relaxed mt-5">
                Don&apos;t have all the answers yet? That&apos;s fine — reach out anyway and we&apos;ll
                figure it out together on the consultation call.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-5">Who We Work With</h2>
              <p className="text-white/55 leading-relaxed mb-5">
                We&apos;re a Marrakesh-based web design and development studio serving clients both
                locally in Morocco and internationally across Europe and North America. Whether
                you&apos;re a local business making your first move online or a startup scaling fast,
                we&apos;ve likely built something similar:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Riads, hotels & guesthouses",
                  "Restaurants & cafés",
                  "Travel agencies & tour operators",
                  "Startups & SaaS founders",
                  "Real estate agencies",
                  "Agencies & freelancers",
                  "E-commerce & retail",
                  "Professional services",
                ].map((who) => (
                  <div key={who} className="glass rounded-lg px-4 py-3 border border-white/10 text-white/65 text-sm">
                    {who}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bilingual note */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="glass rounded-2xl p-8 border border-white/10 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">Prefer French or Arabic? Aucun problème.</h2>
            <p className="text-white/55 leading-relaxed mb-3">
              Our team works fluently in English, French, and Arabic — including Moroccan Darija — so
              you can brief your project, ask questions, and review everything in the language
              you&apos;re most comfortable with. Nothing gets lost in translation between you and the
              people building your site.
            </p>
            <p className="text-white/45 leading-relaxed text-[15px]">
              <span className="text-white/70 font-medium">En français :</span> écrivez-nous
              directement en français par WhatsApp, e-mail ou le formulaire ci-dessus. Nous répondons
              généralement en moins de deux heures et proposons une consultation gratuite de 30 minutes,
              sans engagement.
            </p>
          </div>
        </section>

        {/* Contact-specific FAQ — visible content only, no FAQPage schema (that
            lives on /faq) to avoid competing for the same rich result. */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-10">Contacting Us — Common Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "How quickly will you reply?",
                a: "During working hours (Monday to Friday, 9:00–18:00 Morocco time) we usually reply within two hours. Messages sent evenings or weekends are answered the next working morning. WhatsApp is the fastest way to reach us.",
              },
              {
                q: "Is the consultation really free?",
                a: "Yes. The first 30-minute consultation is completely free with no obligation. We use it to understand your project and advise you honestly — even if that means telling you a smaller scope is all you need.",
              },
              {
                q: "Do I need to know exactly what I want first?",
                a: "Not at all. Many clients come to us with just a goal — 'more bookings', 'look more professional', 'stop losing leads'. We help you translate that into the right website, dashboard, or CRM on the call.",
              },
              {
                q: "Which is the best way to reach you?",
                a: "WhatsApp gets the fastest response for quick questions. For detailed project briefs, the form above or email works best because you can lay everything out. All three reach the same team.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-bold mb-2">{q}</h3>
                <p className="text-white/55 text-[15px] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
