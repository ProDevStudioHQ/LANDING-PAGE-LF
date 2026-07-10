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
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Digital%20Studio%20LF%2C%20I%27d%20like%20to%20discuss%20a%20project`
  : "";

export const metadata: Metadata = {
  // 58 chars — leads with the exact "Contact Digital Studio LF" phrase and
  // adds keyword + location so it fills the SERP without truncating (>60).
  title: { absolute: "Contact Digital Studio LF — Web Design Agency in Marrakesh" },
  description:
    "Contact Digital Studio LF for a free consultation. Reach us by WhatsApp, email, or the form — usually replies within 2 hours. Marrakesh, working worldwide.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Digital Studio LF — Web Design Agency in Marrakesh",
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

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Digital Studio LF",
  url: SITE_URL,
  email: PRIMARY_EMAIL,
  areaServed: [
    { "@type": "Country", name: "Morocco" },
    { "@type": "AdministrativeArea", name: "Worldwide" },
  ],
  address: { "@type": "PostalAddress", addressLocality: "Marrakesh", addressCountry: "MA" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: PRIMARY_EMAIL,
    availableLanguage: ["English", "French", "Arabic"],
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Contact</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: intro + contact methods */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
                Get in touch
              </span>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-5">
                Contact Digital Studio LF — Let&apos;s Build Your Project
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-3 max-w-xl">
                Free 30-minute consultation. Based in Marrakesh, working worldwide — in English,
                French, and Arabic.
              </p>
              <p className="text-primary text-sm font-medium mb-8">Usually replies within 2 hours.</p>

              <div className="space-y-3 max-w-md">
                {WHATSAPP_URL && (
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 glass rounded-xl p-4 border border-white/10 hover:border-emerald-500/30 transition-colors group"
                  >
                    <span className="flex items-center justify-center w-11 h-11 rounded-full bg-emerald-500/15 text-emerald-400 text-lg" aria-hidden="true">✆</span>
                    <span>
                      <span className="block font-semibold">WhatsApp</span>
                      <span className="block text-white/50 text-sm">Fastest reply — chat with us directly</span>
                    </span>
                  </a>
                )}
                {BUSINESS_PHONE && (
                  <a
                    href={`tel:${BUSINESS_PHONE.replace(/\s/g, "")}`}
                    className="flex items-center gap-4 glass rounded-xl p-4 border border-white/10 hover:border-emerald-500/30 transition-colors group"
                  >
                    <span className="flex items-center justify-center w-11 h-11 rounded-full bg-emerald-500/15 text-emerald-400 text-lg" aria-hidden="true">☎</span>
                    <span>
                      <span className="block font-semibold">{BUSINESS_PHONE}</span>
                      <span className="block text-white/50 text-sm">Call or WhatsApp — Marrakesh, Morocco</span>
                    </span>
                  </a>
                )}
                {EMAILS.map((e) => (
                  <a
                    key={e.address}
                    href={`mailto:${e.address}`}
                    className="flex items-center gap-4 glass rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-colors group"
                  >
                    <span className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/15 text-primary text-lg" aria-hidden="true">✉</span>
                    <span>
                      <span className="block font-semibold">{e.address}</span>
                      <span className="block text-white/50 text-sm">{e.label}</span>
                    </span>
                  </a>
                ))}
                {/* Book a call — add a Calendly/booking URL here when available */}
              </div>
            </div>

            {/* Right: form (feeds the CRM) */}
            <div className="glass rounded-2xl p-6 sm:p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-2">Tell us about your project</h2>
              <p className="text-white/50 text-sm mb-6">
                Share a few details and we&apos;ll get back to you with next steps.
              </p>
              <ContactForm />
            </div>
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
