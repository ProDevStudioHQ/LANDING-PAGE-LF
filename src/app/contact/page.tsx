import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const SITE_URL = "https://digitalstudiolf.online";
const EMAIL = "digitalstudiolf@gmail.com";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Digital%20Studio%20LF%2C%20I%27d%20like%20to%20discuss%20a%20project`
  : "";

export const metadata: Metadata = {
  title: { absolute: "Contact | Digital Studio LF" },
  description:
    "Contact Digital Studio LF for a free 30-minute consultation. Based in Marrakesh, working worldwide. Reach us by WhatsApp, email, or the contact form — usually replies within 2 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Digital Studio LF",
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
  email: EMAIL,
  areaServed: [
    { "@type": "Country", name: "Morocco" },
    { "@type": "AdministrativeArea", name: "Worldwide" },
  ],
  address: { "@type": "PostalAddress", addressLocality: "Marrakesh", addressCountry: "MA" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: EMAIL,
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
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-4 glass rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-colors group"
                >
                  <span className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/15 text-primary text-lg" aria-hidden="true">✉</span>
                  <span>
                    <span className="block font-semibold">Email</span>
                    <span className="block text-white/50 text-sm">{EMAIL}</span>
                  </span>
                </a>
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
      </main>
      <Footer />
    </>
  );
}
