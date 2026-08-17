import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm, { CONTACT_FORM_FR } from "@/components/ContactForm";
import { WHATSAPP_NUMBER as DEFAULT_WHATSAPP_NUMBER } from "@/lib/schema";

const SITE = "https://digitalstudiolf.online";
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;

export const metadata: Metadata = {
  title: { absolute: "Contact — Agence Web à Marrakech | Digital Studio LF" },
  description:
    "Contactez Digital Studio LF à Marrakech : devis gratuit sous 24h pour votre site web. Français, anglais et arabe. Réponse en moins de 2 heures.",
  alternates: {
    // No hreflang pair: /contact is not a translation of this page — it carries
    // different copy for a different market. Declaring them as alternates would
    // tell Google two distinct pages are the same page.
    canonical: "/fr/contact",
  },
  openGraph: {
    type: "website",
    title: "Contact — Agence Web à Marrakech | Digital Studio LF",
    description:
      "Devis gratuit sous 24h. Parlons de votre projet en français, anglais ou arabe.",
    url: `${SITE}/fr/contact`,
    locale: "fr_MA",
    images: [`${SITE}/images/og-home.png`],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE}/fr/contact` },
  ],
};

const channels = [
  {
    icon: "📧",
    label: "E-mail",
    value: "hello@digitalstudiolf.online",
    href: "mailto:hello@digitalstudiolf.online",
    note: "Réponse sous 24 heures, souvent moins de 2.",
  },
  {
    icon: "💬",
    label: "WhatsApp",
    value: "Écrire sur WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Bonjour, je souhaite un devis pour un site web."
    )}`,
    note: "Le plus rapide pendant les heures ouvrables.",
  },
  {
    icon: "📍",
    label: "Bureau",
    value: "Marrakech, Marrakech-Safi, Maroc",
    href: null,
    note: "Projets réalisés à distance, partout au Maroc et à l'international.",
  },
];

export default function ContactFrPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        <section className="pt-40 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <nav aria-label="Fil d'Ariane" className="text-sm text-white/40 mb-8 flex justify-center gap-2">
            <Link href="/fr/solutions" className="hover:text-white transition-colors">
              Solutions
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/70">Contact</span>
          </nav>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            Devis gratuit — sans engagement
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Parlons de <span className="gradient-text">votre projet</span>
          </h1>
          <p className="text-white/55 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Consultation gratuite de 30 minutes. Dites-nous votre activité et ce que
            vous voulez obtenir — nous vous dirons ce qui est réaliste, à quel prix et
            dans quel délai. En français, anglais ou arabe.
          </p>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-5">
            {channels.map((c) => {
              const inner = (
                <>
                  <div className="text-2xl mb-3" aria-hidden="true">{c.icon}</div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40 mb-1.5">
                    {c.label}
                  </p>
                  <p className="text-white font-semibold mb-2 break-words">{c.value}</p>
                  <p className="text-white/45 text-sm leading-relaxed">{c.note}</p>
                </>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="glass rounded-2xl p-6 border border-white/10 hover:border-primary/25 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  {inner}
                </a>
              ) : (
                <div key={c.label} className="glass rounded-2xl p-6 border border-white/10">
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        <ContactForm copy={CONTACT_FORM_FR} />

        <section className="pb-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <p className="text-white/40 text-sm">
            Vous cherchez un site pour un métier précis ?{" "}
            <Link href="/fr/solutions" className="text-primary hover:underline">
              Voir les solutions par secteur
            </Link>{" "}
            ou{" "}
            <Link href="/fr/prix-creation-site-web-maroc" className="text-primary hover:underline">
              consulter les prix
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
