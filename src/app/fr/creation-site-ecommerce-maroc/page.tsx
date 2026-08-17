import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Création Site E-commerce Maroc",
  description:
    "Création de site e-commerce au Maroc : boutique en ligne sur mesure, paiement CMI et à la livraison, livraison Amana. Prix en MAD. Devis gratuit sous 24h.",
  alternates: {
    // Single-language (French) page — no English counterpart. The EN
    // e-commerce intent is served by /services/online-stores, which is not a
    // translation of this page: it targets an international audience and says
    // nothing about CMI, cash-on-delivery or Moroccan logistics. No hreflang.
    canonical: "/fr/creation-site-ecommerce-maroc",
  },
  openGraph: {
    type: "website",
    images: ["https://digitalstudiolf.online/images/og-home.jpg"],
    title: "Création Site E-commerce Maroc | Boutique en Ligne — Digital Studio LF",
    description:
      "Boutiques en ligne sur mesure pour les commerçants marocains. Paiement CMI, paiement à la livraison, livraison nationale. Devis gratuit.",
    url: "https://digitalstudiolf.online/fr/creation-site-ecommerce-maroc",
    locale: "fr_MA",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://digitalstudiolf.online" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Création Site E-commerce Maroc",
      item: "https://digitalstudiolf.online/fr/creation-site-ecommerce-maroc",
    },
  ],
};

const faqs = [
  {
    q: "Combien coûte la création d'un site e-commerce au Maroc ?",
    a: "Une boutique en ligne simple démarre à 7 000 MAD. Une boutique complète avec paiement en ligne, gestion de stock et tableau de bord démarre à 12 000 MAD. Une plateforme sur mesure (multi-vendeurs, abonnements, logistique intégrée) démarre à 25 000 MAD. Le prix est fixé par écrit avant de commencer.",
  },
  {
    q: "Le paiement à la livraison est-il possible ?",
    a: "Oui, et c'est souvent indispensable au Maroc : une grande partie des acheteurs préfèrent encore payer en espèces à réception. Nous mettons en place le paiement à la livraison en parallèle du paiement par carte, avec confirmation de commande par téléphone ou WhatsApp pour limiter les commandes non honorées.",
  },
  {
    q: "Comment accepter les paiements par carte au Maroc ?",
    a: "Par une passerelle marocaine comme CMI ou Payzone, qui permet d'encaisser en dirhams sur un compte bancaire marocain. L'ouverture d'un contrat monétique se fait auprès de votre banque ; nous nous occupons de l'intégration technique une fois le contrat obtenu.",
  },
  {
    q: "Shopify, WooCommerce ou sur mesure ?",
    a: "Cela dépend de votre catalogue et de vos marges. Shopify est rapide à lancer mais prélève un abonnement mensuel en devises et s'intègre mal aux passerelles marocaines. WooCommerce est plus souple et moins cher à long terme. Le sur mesure se justifie quand votre logistique ou votre tarification sort du standard. Nous vous disons franchement lequel convient — y compris quand ce n'est pas le plus cher.",
  },
  {
    q: "Gérez-vous la livraison ?",
    a: "Nous intégrons les transporteurs que vous utilisez déjà (Amana, Sarabet, CTM, coursiers locaux) pour générer les bordereaux et suivre les colis depuis votre tableau de bord. Le choix du transporteur reste le vôtre.",
  },
  {
    q: "Puis-je vendre à l'étranger ?",
    a: "Oui. Nous configurons plusieurs devises, les langues (français, anglais, arabe, espagnol) et les frais de port par zone. C'est particulièrement pertinent pour l'artisanat marocain, dont une part importante de la demande vient d'Europe et d'Amérique du Nord.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const features = [
  {
    icon: "💵",
    label: "Paiement à la livraison",
    desc: "Le moyen de paiement encore préféré d'une grande partie des acheteurs marocains. Mis en place avec confirmation téléphonique ou WhatsApp pour réduire les commandes non honorées.",
  },
  {
    icon: "💳",
    label: "Paiement par carte en dirhams",
    desc: "Intégration des passerelles marocaines (CMI, Payzone) pour encaisser en MAD sur votre compte, plus les solutions internationales si vous vendez à l'étranger.",
  },
  {
    icon: "📦",
    label: "Livraison et suivi",
    desc: "Connexion aux transporteurs que vous utilisez déjà — Amana, CTM, Sarabet, coursiers locaux — pour éditer les bordereaux et suivre les colis sans quitter votre tableau de bord.",
  },
  {
    icon: "📊",
    label: "Gestion de stock",
    desc: "Stock à jour en temps réel, alertes de rupture, variantes (taille, couleur, matière) et prix par quantité. Vous ne vendez jamais un produit que vous n'avez plus.",
  },
  {
    icon: "🌍",
    label: "Multilingue et multi-devises",
    desc: "Français, anglais, arabe, espagnol. Prix en MAD, EUR ou USD selon le visiteur — indispensable si votre artisanat vise l'Europe.",
  },
  {
    icon: "📱",
    label: "Optimisé mobile et 4G",
    desc: "La majorité de vos clients achètent depuis un téléphone, souvent sur un réseau moyen. Le site est construit pour rester rapide dans ces conditions, pas seulement en fibre.",
  },
];

const packages = [
  {
    name: "Boutique Essentielle",
    price: "7 000 MAD",
    usd: "$700",
    delay: "14–21 jours",
    items: [
      "Jusqu'à 50 produits",
      "Paiement à la livraison",
      "Panier et tunnel de commande",
      "Gestion de stock simple",
      "Français + anglais",
      "Référencement de base",
    ],
    featured: false,
  },
  {
    name: "Boutique Complète",
    price: "12 000 MAD",
    usd: "$1 200",
    delay: "21–30 jours",
    items: [
      "Tout l'essentiel, plus :",
      "Paiement par carte (CMI / Payzone)",
      "Catalogue illimité et variantes",
      "Intégration transporteurs",
      "Tableau de bord et statistiques",
      "Codes promo et campagnes email",
    ],
    featured: true,
  },
  {
    name: "Plateforme Sur Mesure",
    price: "25 000 MAD",
    usd: "$2 500",
    delay: "35–60 jours",
    items: [
      "Tout la boutique complète, plus :",
      "Multi-vendeurs ou multi-boutiques",
      "Abonnements et paiements récurrents",
      "Tarification par client ou par volume",
      "Intégrations ERP / comptabilité",
      "Développements spécifiques",
    ],
    featured: false,
  },
];

export default function CreationSiteEcommerceMarocPage() {
  return (
    <>
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
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white/70">Création Site E-commerce Maroc</span>
          </nav>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            Boutiques en Ligne — Maroc
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Création Site{" "}
            <span className="gradient-text">E-commerce Maroc</span>
          </h1>
          <p className="text-white/55 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Une boutique en ligne conçue pour le marché marocain : paiement à la
            livraison, encaissement par carte en dirhams, et livraison avec les
            transporteurs que vous utilisez déjà.
          </p>
          <p className="text-white/40 text-base max-w-xl mx-auto mb-10">
            Basés à Marrakech. Prix fixes en MAD. Devis gratuit sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fr/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-primary/25"
            >
              Demander un Devis Gratuit
            </Link>
            <Link
              href="/fr/prix-creation-site-web-maroc"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] text-white/90 font-semibold text-base transition-all duration-300"
            >
              Voir les Prix →
            </Link>
          </div>
        </section>

        {/* The local-reality argument */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 sm:p-10 border border-white/10">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">
              Vendre en Ligne au Maroc N&apos;est Pas Vendre en Ligne en France
            </h2>
            <p className="text-white/60 leading-relaxed mb-4">
              La plupart des solutions e-commerce sont pensées pour des marchés où tout
              le monde paie par carte et où la livraison est standardisée. Au Maroc, la
              réalité est différente : une part importante des acheteurs veut payer en
              espèces à la réception, l&apos;encaissement par carte passe par un contrat
              monétique auprès de votre banque, et la livraison dépend souvent de
              transporteurs locaux.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              Une boutique qui ignore ces contraintes perd des ventes de façon invisible.
              Le client remplit son panier, arrive au paiement, ne trouve pas l&apos;option
              qu&apos;il attend, et part. Vous ne voyez qu&apos;un panier abandonné de plus.
            </p>
            <p className="text-white/60 leading-relaxed">
              Nous construisons des boutiques qui partent de ces contraintes plutôt que de
              les contourner — et nous vous disons franchement quand une solution
              existante suffit, y compris quand elle nous rapporte moins.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            Conçu pour le Commerce Marocain
          </h2>
          <p className="text-white/50 text-center max-w-xl mx-auto mb-12">
            Les fonctionnalités qui décident réellement d&apos;une vente ici.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.label}
                className="glass rounded-xl p-6 border border-white/10 hover:border-primary/20 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.label}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            Tarifs E-commerce
          </h2>
          <p className="text-white/50 text-center max-w-xl mx-auto mb-12">
            Prix fixes, convenus par écrit avant de commencer. Pas de frais cachés.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((p) => (
              <div
                key={p.name}
                className={`glass rounded-2xl p-7 border transition-all duration-300 ${
                  p.featured
                    ? "border-primary/40 bg-primary/[0.04]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {p.featured && (
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-[11px] font-bold uppercase tracking-wider mb-4">
                    Le plus demandé
                  </span>
                )}
                <h3 className="text-xl font-bold mb-1">{p.name}</h3>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-3xl font-black">{p.price}</span>
                  <span className="text-white/35 text-sm mb-1">/ {p.usd}</span>
                </div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-5">
                  À partir de · {p.delay}
                </p>
                <ul className="space-y-2.5">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-white/60 text-sm leading-relaxed">
                      <span className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-white/40 text-sm mt-8">
            Pour le détail des prix par type de projet :{" "}
            <Link href="/fr/prix-creation-site-web-maroc" className="text-primary hover:underline">
              Combien coûte un site web au Maroc ?
            </Link>
          </p>
        </section>

        {/* FAQ */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">
            Questions Fréquentes
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="glass rounded-xl border border-white/10 p-6 group"
              >
                <summary className="font-bold text-lg cursor-pointer list-none flex items-start justify-between gap-4">
                  {f.q}
                  <span className="text-primary flex-shrink-0 transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="text-white/55 leading-relaxed mt-4">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="pb-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <div className="glass rounded-2xl p-10 border border-primary/20 bg-primary/[0.03]">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Parlons de Votre Boutique
            </h2>
            <p className="text-white/55 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Consultation gratuite de 30 minutes, sans engagement. Dites-nous ce que vous
              vendez et à qui — nous vous dirons ce qui est réaliste, et à quel prix.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/fr/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold transition-all duration-300 shadow-lg shadow-primary/25"
              >
                Demander un Devis Gratuit
              </Link>
              <Link
                href="/fr/creation-site-web-maroc"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] text-white/90 font-semibold transition-all duration-300"
              >
                Création Site Web Maroc →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
