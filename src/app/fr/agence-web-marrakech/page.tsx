import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Agence Web Marrakech | Développeur Web — Digital Studio LF",
  description:
    "Votre agence web à Marrakech pour créer un site professionnel. Spécialistes riads, hôtels, restaurants et PME à Marrakech. Résultats rapides, prix compétitifs. Devis gratuit.",
  alternates: {
    canonical: "/fr/agence-web-marrakech",
    languages: {
      // Standalone French page (no EN twin) — self-referencing only so the
      // EN↔FR cluster on /web-design-morocco ↔ /fr/creation-site-web-maroc
      // stays reciprocal. Claiming /web-design-morocco here broke reciprocity.
      fr: "/fr/agence-web-marrakech",
      "x-default": "/fr/agence-web-marrakech",
    },
  },
  keywords: [
    "agence web Marrakech",
    "développeur web Marrakech",
    "création site web Marrakech",
    "agence digitale Marrakech",
    "site web riad Marrakech",
    "développeur web Maroc",
    "site web hôtel Marrakech",
  ],
  openGraph: {
    title: "Agence Web Marrakech | Digital Studio LF",
    description:
      "Création de sites web à Marrakech pour riads, hôtels, restaurants et entreprises. Devis gratuit sous 24 heures.",
    url: "https://digitalstudiolf.online/fr/agence-web-marrakech",
    locale: "fr_MA",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Digital Studio LF — Agence Web Marrakech",
  image: "https://digitalstudiolf.online/images/idea-digital.png",
  url: "https://digitalstudiolf.online",
  description:
    "Agence web basée à Marrakech spécialisée en création de sites web pour les riads, hôtels, restaurants, agences de voyage et PME de la région Marrakech-Safi.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marrakech",
    addressRegion: "Marrakech-Safi",
    addressCountry: "MA",
  },
  geo: { "@type": "GeoCoordinates", latitude: 31.6295, longitude: -7.9811 },
  areaServed: [
    { "@type": "City", name: "Marrakech" },
    { "@type": "AdministrativeArea", name: "Marrakech-Safi" },
    { "@type": "Country", name: "Maroc" },
  ],
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-18:00",
  availableLanguage: ["Français", "Anglais", "Arabe"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Agence Web Marrakech", item: "https://digitalstudiolf.online/fr/agence-web-marrakech" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Vous êtes vraiment basés à Marrakech ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, Digital Studio LF est une agence web basée à Marrakech. Nous travaillons principalement avec des entreprises de la région Marrakech-Safi, mais aussi avec des clients dans tout le Maroc et à l'international.",
      },
    },
    {
      "@type": "Question",
      name: "Quels types de sites web créez-vous à Marrakech ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous créons des sites vitrines, des sites de réservation pour riads et hôtels, des landing pages, des boutiques en ligne, des dashboards d'administration, et des systèmes CRM sur mesure. Chaque projet est développé selon les besoins spécifiques du client.",
      },
    },
    {
      "@type": "Question",
      name: "Combien coûte un site web pour un riad à Marrakech ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un site web professionnel pour un riad à Marrakech coûte généralement entre 3 000 et 15 000 MAD selon les fonctionnalités. Un site vitrine simple avec formulaire de contact est à l'entrée de gamme. Un système de réservation en ligne avec paiement et calendrier de disponibilité se situe en milieu de gamme.",
      },
    },
    {
      "@type": "Question",
      name: "Travaillez-vous avec des clients touristiques (riads, hôtels, guides) ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "C'est l'une de nos spécialités. Nous comprenons les besoins du secteur touristique à Marrakech — sites multilingues (français, anglais, arabe), systèmes de réservation directe, galeries photo optimisées, et intégration avec les calendriers de disponibilité.",
      },
    },
  ],
};

const clientTypes = [
  { icon: "🏨", label: "Riads & Hôtels Boutique", desc: "Sites de réservation directe, galeries photo, disponibilités en temps réel." },
  { icon: "✈️", label: "Agences de Voyage", desc: "Sites vitrines professionnels, systèmes de gestion de circuits et de clients." },
  { icon: "🍽️", label: "Restaurants & Cafés", desc: "Menus en ligne, réservations de table, présence Google optimisée." },
  { icon: "🏢", label: "PME & Commerces", desc: "Sites vitrines, landing pages commerciales, systèmes de gestion internes." },
  { icon: "🛍️", label: "Artisanat & E-commerce", desc: "Boutiques en ligne pour vendre vos produits locaux à l'international." },
  { icon: "🏠", label: "Immobilier", desc: "Sites d'annonces, portails de contact, systèmes de gestion de biens." },
];

const faqs = [
  {
    q: "Vous êtes vraiment basés à Marrakech ?",
    a: "Oui, Digital Studio LF est une agence web basée à Marrakech. Nous travaillons principalement avec des entreprises de la région Marrakech-Safi, mais aussi avec des clients dans tout le Maroc et à l'international.",
  },
  {
    q: "Quels types de sites web créez-vous à Marrakech ?",
    a: "Nous créons des sites vitrines, des sites de réservation pour riads et hôtels, des landing pages, des boutiques en ligne, des dashboards d'administration, et des systèmes CRM sur mesure.",
  },
  {
    q: "Combien coûte un site web pour un riad à Marrakech ?",
    a: "Un site web professionnel pour un riad à Marrakech coûte généralement entre 3 000 et 15 000 MAD selon les fonctionnalités. Un site vitrine simple commence à l'entrée de gamme ; un système de réservation avec paiement en ligne se situe en milieu de gamme.",
  },
  {
    q: "Travaillez-vous avec des clients touristiques (riads, hôtels, guides) ?",
    a: "C'est l'une de nos spécialités. Nous comprenons les besoins du secteur touristique à Marrakech — sites multilingues (français, anglais, arabe), systèmes de réservation directe, et galeries photo optimisées.",
  },
];

export default function AgenceWebMarrakechPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white/70">Agence Web Marrakech</span>
          </nav>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            Développeur Web — Marrakech
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Agence Web{" "}
            <span className="gradient-text">Marrakech</span>
          </h1>
          <p className="text-white/55 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Création de sites web professionnels à Marrakech. Riads, hôtels, restaurants, agences de voyage — nous construisons des sites qui attirent des clients et génèrent des réservations.
          </p>
          <p className="text-white/40 text-base max-w-xl mx-auto mb-10">
            Basés à Marrakech. Support en français, anglais et arabe. Devis gratuit sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-primary/25"
            >
              Demander un Devis
            </Link>
            <Link
              href="/fr/creation-site-web-maroc"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] text-white/90 font-semibold text-base transition-all duration-300"
            >
              Création Site Web Maroc →
            </Link>
          </div>
        </section>

        {/* Intro text */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 sm:p-10 border border-white/10">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">
              L&apos;Agence Web de Référence à Marrakech
            </h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Marrakech est une ville où le numérique compte énormément. Les touristes cherchent des riads sur Google, les restaurants sur TripAdvisor, les guides sur Instagram. Les entreprises locales qui n&apos;ont pas de présence en ligne solide laissent des clients — et des revenus — sur la table.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              Digital Studio LF est une agence web basée à Marrakech. Nous créons des sites web rapides, beaux, et optimisés pour le référencement local. Nos clients apparaissent dans les résultats de recherche Google pour les requêtes en français, anglais, et arabe — et convertissent leurs visiteurs en réservations et en clients.
            </p>
            <p className="text-white/60 leading-relaxed">
              Chaque projet est développé sur mesure. Pas de templates. Pas de plateformes limitantes. Vous obtenez un site que vous possédez entièrement, hébergeable où vous voulez, modifiable sans dépendance.
            </p>
          </div>
        </section>

        {/* Client types */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            Nous Travaillons avec Tous les Secteurs de Marrakech
          </h2>
          <p className="text-white/50 text-center max-w-xl mx-auto mb-12">
            De l&apos;artisanat au tourisme, de l&apos;immobilier à la restauration — votre secteur d&apos;activité détermine notre approche.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientTypes.map((c) => (
              <div key={c.label} className="glass rounded-xl p-6 border border-white/10 hover:border-primary/20 transition-all duration-300">
                <div className="text-3xl mb-4">{c.icon}</div>
                <h3 className="text-lg font-bold mb-2">{c.label}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Differentiators */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">Ce qui Nous Distingue</h2>
          <div className="space-y-4">
            {[
              { title: "Connaissance du marché local", desc: "Nous sommes à Marrakech. Nous connaissons les habitudes de recherche de vos clients — en français, en anglais, et en arabe. Votre site sera référencé pour les vraies requêtes de votre marché." },
              { title: "Livraison rapide", desc: "Un site vitrine ou une landing page livré en 7 à 14 jours. Pas de mois d'attente. Vous avez une visibilité en ligne rapidement." },
              { title: "Code sur mesure, vous en êtes propriétaire", desc: "Pas de Wix, pas de WordPress sur-pluginé. Votre site est développé proprement avec les technologies modernes. Vous en êtes propriétaire — pas verrouillé dans un abonnement." },
              { title: "Multilingue natif", desc: "Français, anglais, arabe — ou les trois en même temps. Pour Marrakech, le multilinguisme n'est pas une option, c'est une nécessité." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start glass rounded-xl p-6 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex-shrink-0 mt-1 flex items-center justify-center">
                  <span className="text-primary text-xs">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">{item.title}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
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

        {/* Related links */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-black mb-6">Pages Connexes</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { href: "/fr/creation-site-web-maroc", label: "Création Site Web Maroc" },
              { href: "/web-design-morocco", label: "Web Design Morocco (English)" },
              { href: "/news/websites-for-riads-and-hotels-marrakesh", label: "Websites for Riads and Hotels" },
              { href: "/booking-websites-for-hotels", label: "Sites de Réservation pour Hôtels" },
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
