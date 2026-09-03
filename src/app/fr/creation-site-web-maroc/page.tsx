import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageGraphJson, webPageNode, breadcrumbId, faqId } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Création Site Web Maroc — Agence Web",
  description:
    "Agence web au Maroc : création de sites vitrines, landing pages et CRM sur mesure pour entreprises marocaines. Devis gratuit sous 24h. Studio basé à Marrakech.",
  alternates: {
    canonical: "/fr/creation-site-web-maroc",
    languages: {
      en: "/web-design-morocco",
      fr: "/fr/creation-site-web-maroc",
      "x-default": "/web-design-morocco",
    },
  },
  openGraph: {
    type: "website",
    images: ["https://digitalstudiolf.online/images/og-home.jpg"],
    title: "Création Site Web Maroc | Agence Web — Digital Studio LF",
    description:
      "Création de sites web professionnels au Maroc. Riads, hôtels, agences de voyage, PME. Support en français, anglais et arabe.",
    url: "https://digitalstudiolf.online/fr/creation-site-web-maroc",
    locale: "fr_MA",
  },
};

// The page node the graph was missing: nothing typed this URL, so the
// breadcrumb and FAQ described no page. `inLanguage: "fr"` matters here —
// the default "en" would have declared these French pages to be English.
const PATH = "/fr/creation-site-web-maroc";

const webPage = webPageNode({
  path: PATH,
  name: "Création Site Web Maroc",
  description:
    "Création de sites web au Maroc : sites vitrines, landing pages et sites sur mesure, livrés en 14 jours avec un prix fixé par écrit.",
  inLanguage: "fr",
  breadcrumb: true,
  mainEntity: faqId(PATH),
});

const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  "@id": breadcrumbId(PATH),
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Création Site Web Maroc", item: "https://digitalstudiolf.online/fr/creation-site-web-maroc" },
  ],
};

const faqSchema = {
  "@type": "FAQPage",
  "@id": faqId(PATH),
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien coûte la création d'un site web au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le prix d'un site web au Maroc varie selon le type de projet. Une landing page démarre à 2 500 MAD. Un site vitrine professionnel de 5 à 8 pages démarre à 7 000 MAD. Un site e-commerce démarre à 7 000 MAD et un CRM sur mesure à 25 000 MAD. Contactez-nous pour un devis gratuit adapté à votre projet.",
      },
    },
    {
      "@type": "Question",
      name: "Faites-vous des sites web en français pour les entreprises marocaines ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui — le français est l'une de nos langues de travail principales. Nous créons des sites web entièrement en français, en anglais, en arabe, ou dans plusieurs langues simultanément selon les besoins de votre clientèle.",
      },
    },
    {
      "@type": "Question",
      name: "Êtes-vous basés à Marrakech ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, notre agence est basée à Marrakech. Nous travaillons avec des entreprises de toute la région Marrakech-Safi, mais aussi avec des clients à Casablanca, Rabat, Agadir, et à l'international. Nos projets sont réalisés entièrement à distance avec une communication fluide.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le délai pour créer un site web ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un site vitrine ou une landing page est généralement livré en 7 à 14 jours ouvrables. Un projet plus complexe (e-commerce, CRM, dashboard) prend 3 à 6 semaines. Nous vous donnons un planning précis avant de commencer.",
      },
    },
  ],
};

const services = [
  { icon: "🌐", title: "Sites Vitrines", desc: "Présentez votre entreprise avec un site professionnel qui inspire confiance et génère des contacts qualifiés." },
  { icon: "🚀", title: "Landing Pages", desc: "Pages de conversion optimisées pour générer des leads ou promouvoir une offre spécifique." },
  { icon: "🛒", title: "E-commerce", desc: "Boutiques en ligne performantes avec gestion des produits, paiements sécurisés et tableau de bord." },
  { icon: "📊", title: "CRM & Dashboards", desc: "Systèmes de gestion sur mesure pour suivre vos clients, vos leads et vos performances." },
  { icon: "📅", title: "Sites de Réservation", desc: "Prenez des réservations directes sans commission OTA — idéal pour les riads et hôtels." },
  { icon: "🔐", title: "Systèmes de Connexion", desc: "Espaces clients, espaces membres et systèmes d'authentification sécurisés." },
];

const faqs = [
  {
    q: "Combien coûte la création d'un site web au Maroc ?",
    a: "Le prix d'un site web au Maroc varie selon le type de projet. Une landing page démarre à 2 500 MAD. Un site vitrine professionnel de 5 à 8 pages démarre à 7 000 MAD. Un site e-commerce démarre à 7 000 MAD et un CRM sur mesure à 25 000 MAD. Contactez-nous pour un devis gratuit adapté à votre projet.",
  },
  {
    q: "Faites-vous des sites web en français pour les entreprises marocaines ?",
    a: "Oui — le français est l'une de nos langues de travail principales. Nous créons des sites web entièrement en français, en anglais, en arabe, ou dans plusieurs langues simultanément selon les besoins de votre clientèle.",
  },
  {
    q: "Êtes-vous basés à Marrakech ?",
    a: "Oui, notre agence est basée à Marrakech. Nous travaillons avec des entreprises de toute la région Marrakech-Safi, mais aussi avec des clients à Casablanca, Rabat, Agadir, et à l'international.",
  },
  {
    q: "Quel est le délai pour créer un site web ?",
    a: "Un site vitrine ou une landing page est généralement livré en 7 à 14 jours ouvrables. Un projet plus complexe (e-commerce, CRM, dashboard) prend 3 à 6 semaines. Nous vous donnons un planning précis avant de commencer.",
  },
];

export default function CreationSiteWebMarocPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: pageGraphJson(webPage, breadcrumbSchema, faqSchema) }}
      />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <nav className="text-sm text-white/60 mb-8 flex justify-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white/70">Création Site Web Maroc</span>
          </nav>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            Agence Web — Marrakech, Maroc
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Création Site Web{" "}
            <span className="gradient-text">Maroc</span>
          </h1>
          <p className="text-white/55 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Votre agence web à Marrakech pour la création de sites professionnels au Maroc. Sites vitrines, landing pages, e-commerce, CRM sur mesure — livrés en 7 à 21 jours.
          </p>
          <p className="text-white/40 text-base max-w-xl mx-auto mb-10">
            Support en français, anglais et arabe. Devis gratuit sous 24 heures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fr/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-primary/25"
            >
              Demander un Devis Gratuit
            </Link>
            <Link
              href="/web-design-morocco"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] text-white/90 font-semibold text-base transition-all duration-300"
            >
              Version Anglaise →
            </Link>
          </div>
        </section>

        {/* Why us */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 sm:p-10 border border-white/10">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">
              Pourquoi Choisir Digital Studio LF pour Votre Site Web au Maroc ?
            </h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Nous sommes basés à Marrakech et nous travaillons avec des entreprises marocaines de toutes tailles — des riads familiaux aux PME en passant par les agences de voyage et les restaurants. Nous comprenons le marché local, les attentes des clients francophones, et les spécificités du référencement au Maroc.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              Contrairement aux agences qui sous-traitent à l&apos;international, nous gérons chaque projet de A à Z, en interne. Vous travaillez directement avec le développeur qui crée votre site — pas avec un chef de projet qui transmet vos messages.
            </p>
            <p className="text-white/60 leading-relaxed">
              Nos sites sont rapides, optimisés pour le référencement (SEO), adaptés à tous les appareils, et conçus pour convertir les visiteurs en clients. Nous ne livrons pas de templates — chaque projet est sur mesure.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            Nos Services de Création Web
          </h2>
          <p className="text-white/50 text-center max-w-xl mx-auto mb-12">
            De la simple landing page au système CRM complet — tout ce dont votre entreprise marocaine a besoin pour réussir en ligne.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="glass rounded-xl p-6 border border-white/10 hover:border-primary/20 transition-all duration-300">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our process */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">
            Notre Processus de Travail
          </h2>
          <div className="space-y-4">
            {[
              { step: "01", title: "Brief et Devis", desc: "Vous nous décrivez votre projet — secteur, objectifs, budget, délai. Nous répondons avec un devis détaillé sous 24 heures. Pas de frais cachés." },
              { step: "02", title: "Design et Validation", desc: "Nous créons une maquette de votre site et attendons votre validation avant de coder. Modifications illimitées à cette étape." },
              { step: "03", title: "Développement", desc: "Nous développons votre site avec les dernières technologies (Next.js, Tailwind CSS). Code propre, performant, et maintenable." },
              { step: "04", title: "Tests et Mise en Ligne", desc: "Tests complets sur tous les appareils et navigateurs. Mise en ligne sur votre hébergement avec configuration complète." },
              { step: "05", title: "Support Continu", desc: "Nous restons disponibles après la livraison pour les modifications, les mises à jour de contenu, et le support technique." },
            ].map((item) => (
              <div key={item.step} className="glass rounded-xl p-6 border border-white/10 flex gap-5">
                <div className="text-primary/40 font-black text-2xl flex-shrink-0 w-10">{item.step}</div>
                <div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sectors */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-8">Secteurs que Nous Servons au Maroc</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              "Riads & Hôtels",
              "Agences de Voyage",
              "Restaurants & Cafés",
              "Cabinets Médicaux",
              "Avocats & Notaires",
              "Boutiques & E-commerce",
              "Immobilier",
              "Coaching & Formation",
              "Artisanat & Création",
            ].map((sector) => (
              <div key={sector} className="glass rounded-xl p-4 border border-white/10 text-center text-sm text-white/70">
                {sector}
              </div>
            ))}
          </div>
        </section>

        {/* Pricing guide + e-commerce links.
            /fr/creation-site-ecommerce-maroc had exactly one inbound internal
            link site-wide (from the pricing guide), which for a commercial page
            is both a weak importance signal and a slow re-crawl. This hub is its
            natural parent: the paragraph above already sells "e-commerce" as one
            of the things we build, so it should be a link. */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 border border-primary/20 bg-primary/[0.03] text-center">
            <h2 className="text-2xl font-black mb-3">Combien Coûte un Site Web au Maroc ?</h2>
            <p className="text-white/55 mb-6 max-w-xl mx-auto">
              Landing page, site vitrine, e-commerce, CRM — consultez notre guide complet des tarifs 2026
              avec les fourchettes de prix réelles du marché marocain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/fr/prix-creation-site-web-maroc"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold transition-all duration-300 shadow-lg shadow-primary/25"
              >
                Voir le Guide des Prix 2026 →
              </Link>
              <Link
                href="/fr/creation-site-ecommerce-maroc"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/15 text-white/75 font-semibold hover:border-white/30 hover:text-white transition-all duration-300"
              >
                Création de site e-commerce →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">Questions Fréquentes</h2>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-3">{item.q}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <div className="glass rounded-2xl p-10 border border-primary/20 bg-primary/[0.03]">
            <h2 className="text-3xl font-black mb-4">Prêt à Lancer Votre Projet ?</h2>
            <p className="text-white/55 mb-8 max-w-lg mx-auto">
              Contactez-nous aujourd&apos;hui pour discuter de votre site web. Devis gratuit, réponse sous 24 heures, sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/fr/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold transition-all duration-300 shadow-lg shadow-primary/25"
              >
                Obtenir un Devis Gratuit
              </Link>
              <Link
                href="/fr/agence-web-marrakech"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] text-white/90 font-semibold transition-all duration-300"
              >
                Agence Web Marrakech →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
