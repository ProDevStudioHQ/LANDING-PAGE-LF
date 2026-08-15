import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Site Web Riad Marrakech",
  description:
    "Création de site web pour riad et hôtel à Marrakech : réservation directe sans commission, site multilingue FR/EN/AR/ES, paiement en ligne. Devis gratuit.",
  alternates: {
    // Single-language (French) page. The English intent for this niche is
    // served by /booking-websites-for-hotels and /services/hotel-riad-websites,
    // neither of which is a translation of this page — they target a different
    // market (international hoteliers) with different copy. A page without a
    // true translated counterpart must not declare alternates, so: no hreflang.
    canonical: "/fr/site-web-riad-hotel",
  },
  openGraph: {
    type: "website",
    images: ["https://digitalstudiolf.online/images/og-home.png"],
    title: "Site Web pour Riad à Marrakech | Réservation Directe — Digital Studio LF",
    description:
      "Sites web pour riads et maisons d'hôtes à Marrakech. Réservation directe, multilingue, paiement en ligne. Réduisez vos commissions OTA.",
    url: "https://digitalstudiolf.online/fr/site-web-riad-hotel",
    locale: "fr_MA",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Digital Studio LF — Sites Web pour Riads et Hôtels",
  image: "https://digitalstudiolf.online/images/idea-digital.png",
  url: "https://digitalstudiolf.online",
  description:
    "Agence web à Marrakech spécialisée dans la création de sites web pour riads, maisons d'hôtes et hôtels : réservation directe, multilingue, paiement en ligne.",
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
    {
      "@type": "ListItem",
      position: 2,
      name: "Site Web Riad Marrakech",
      item: "https://digitalstudiolf.online/fr/site-web-riad-hotel",
    },
  ],
};

const faqs = [
  {
    q: "Combien coûte un site web pour un riad à Marrakech ?",
    a: "Un site vitrine pour riad démarre à 2 500 MAD. Un site complet avec moteur de réservation directe et paiement en ligne démarre à 7 000 MAD. Une plateforme sur mesure (multi-établissements, tarification dynamique, canal manager) démarre à 12 000 MAD. Le prix est fixé par écrit avant le début du projet — pas de frais cachés.",
  },
  {
    q: "Est-ce que je peux vraiment réduire mes commissions Booking.com ?",
    a: "Vous ne remplacerez pas les OTA du jour au lendemain, et ce n'est pas l'objectif. L'objectif est de récupérer les réservations que vous payez aujourd'hui en commission alors que le client vous connaissait déjà : celui qui a vu votre riad sur Booking, a cherché votre nom sur Google, et n'a trouvé aucun moyen simple de réserver en direct. Chaque réservation directe est une commission que vous ne versez pas.",
  },
  {
    q: "En combien de langues le site sera-t-il disponible ?",
    a: "Français et anglais au minimum, car ce sont les langues de vos deux plus gros marchés. Nous ajoutons l'arabe et l'espagnol selon votre clientèle. Chaque langue a ses propres URLs et balises hreflang, ce qui permet à Google de proposer la bonne version à chaque voyageur.",
  },
  {
    q: "Quels moyens de paiement en ligne sont possibles au Maroc ?",
    a: "Nous intégrons les passerelles marocaines (CMI, Payzone) pour les paiements par carte en dirhams, et les solutions internationales (PayPal, virement) pour vos clients étrangers. Nous pouvons aussi mettre en place un système d'acompte à la réservation avec solde réglé sur place — le modèle le plus courant chez les riads.",
  },
  {
    q: "Mes photos sont lourdes. Le site sera-t-il lent ?",
    a: "Non. Les photos sont converties en formats modernes (WebP/AVIF), redimensionnées automatiquement selon l'écran, et chargées progressivement. Vos galeries restent nettes tout en s'affichant rapidement, y compris sur un mobile en 4G — ce qui compte, car la majorité de vos visiteurs réservent depuis leur téléphone.",
  },
  {
    q: "Combien de temps pour livrer le site ?",
    a: "Un site vitrine est livré en 7 à 14 jours. Un site avec moteur de réservation et paiement en ligne demande 14 à 21 jours. Le délai est convenu à l'avance et tenu.",
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
    icon: "🌍",
    label: "Site multilingue FR / EN / AR / ES",
    desc: "Vos clients viennent de France, d'Espagne, du Royaume-Uni et du Golfe. Chaque langue a ses propres URLs et balises hreflang, pour que Google serve la bonne version à chaque voyageur.",
  },
  {
    icon: "📅",
    label: "Moteur de réservation directe",
    desc: "Calendrier de disponibilités, sélection des chambres, confirmation automatique par email. Le voyageur réserve chez vous, pas chez un intermédiaire.",
  },
  {
    icon: "💳",
    label: "Paiement en ligne adapté au Maroc",
    desc: "Passerelles marocaines (CMI, Payzone) pour les cartes en dirhams, solutions internationales pour vos clients étrangers, ou acompte à la réservation avec solde sur place.",
  },
  {
    icon: "🖼️",
    label: "Galeries photo rapides",
    desc: "Un riad se vend par l'image. Formats modernes, redimensionnement automatique et chargement progressif : vos photos restent superbes sans ralentir la page.",
  },
  {
    icon: "📍",
    label: "Google Maps & avis intégrés",
    desc: "Votre emplacement dans la médina, vos avis Google et TripAdvisor affichés sur la page — la preuve sociale au moment exact où le voyageur hésite.",
  },
  {
    icon: "📱",
    label: "Pensé mobile d'abord",
    desc: "La majorité des réservations se décident sur téléphone, souvent en déplacement. Le site est conçu pour ce cas d'usage en priorité, pas adapté après coup.",
  },
];

const packages = [
  {
    name: "Site Vitrine Riad",
    price: "2 500 MAD",
    usd: "$250",
    delay: "7–14 jours",
    items: [
      "Présentation du riad et des chambres",
      "Galerie photo optimisée",
      "Formulaire de demande de réservation",
      "Google Maps et avis",
      "Français + anglais",
      "Référencement local de base",
    ],
    featured: false,
  },
  {
    name: "Réservation Directe",
    price: "7 000 MAD",
    usd: "$700",
    delay: "14–21 jours",
    items: [
      "Tout le site vitrine, plus :",
      "Moteur de réservation avec calendrier",
      "Paiement en ligne ou acompte",
      "Confirmations automatiques par email",
      "4 langues (FR / EN / AR / ES)",
      "Tableau de bord des réservations",
    ],
    featured: true,
  },
  {
    name: "Plateforme Sur Mesure",
    price: "12 000 MAD",
    usd: "$1 200",
    delay: "21–35 jours",
    items: [
      "Tout la réservation directe, plus :",
      "Plusieurs établissements",
      "Tarification par saison",
      "Synchronisation des calendriers",
      "Rapports et statistiques",
      "Intégrations sur demande",
    ],
    featured: false,
  },
];

export default function SiteWebRiadHotelPage() {
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
            <span className="text-white/70">Site Web Riad Marrakech</span>
          </nav>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            Spécialistes Riads &amp; Maisons d&apos;Hôtes
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Site Web pour{" "}
            <span className="gradient-text">Riad à Marrakech</span>
          </h1>
          <p className="text-white/55 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Un site multilingue avec réservation directe, pour que vos clients réservent
            chez vous plutôt que chez un intermédiaire qui vous facture une commission
            sur chaque nuitée.
          </p>
          <p className="text-white/40 text-base max-w-xl mx-auto mb-10">
            Basés à Marrakech. Livraison en 7 à 21 jours. Devis gratuit sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
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

        {/* The commission argument — the strongest one this niche has */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 sm:p-10 border border-white/10">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">
              Chaque Réservation Directe est une Commission que Vous Ne Payez Pas
            </h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Les plateformes de réservation vous apportent de la visibilité, et pour un
              riad qui démarre, c&apos;est précieux. Le problème arrive ensuite : une part
              importante de votre chiffre d&apos;affaires part en commission, y compris sur
              des clients qui vous auraient trouvés de toute façon.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              Le schéma est toujours le même. Le voyageur découvre votre riad sur une
              plateforme, puis cherche votre nom sur Google pour se rassurer — voir plus
              de photos, lire vos avis, comprendre où vous êtes exactement. S&apos;il ne
              trouve rien, ou une page qui ne permet pas de réserver, il retourne sur la
              plateforme et vous payez la commission sur une réservation que vous aviez
              déjà gagnée.
            </p>
            <p className="text-white/60 leading-relaxed">
              Un site avec réservation directe intercepte exactement ce moment. Il ne
              remplace pas les plateformes — il récupère les clients qui vous cherchaient
              déjà. C&apos;est l&apos;argument le plus rentable de tout ce que nous
              construisons, et le plus simple à mesurer : comptez les réservations qui
              arrivent par votre site.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            Ce Dont un Riad a Réellement Besoin
          </h2>
          <p className="text-white/50 text-center max-w-xl mx-auto mb-12">
            Pas une brochure en ligne. Un outil qui remplit vos chambres.
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

        {/* Pricing in MAD */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            Tarifs pour Riads et Maisons d&apos;Hôtes
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
            Vous hésitez sur le budget ?{" "}
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
              Parlons de Votre Riad
            </h2>
            <p className="text-white/55 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Consultation gratuite de 30 minutes, sans engagement. Nous regardons votre
              situation actuelle et vous dites ce qui est réaliste — en français, anglais
              ou arabe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold transition-all duration-300 shadow-lg shadow-primary/25"
              >
                Demander un Devis Gratuit
              </Link>
              <Link
                href="/fr/agence-web-marrakech"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] text-white/90 font-semibold transition-all duration-300"
              >
                Notre Agence à Marrakech →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
