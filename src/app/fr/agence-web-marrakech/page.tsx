import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageGraphJson, webPageNode, breadcrumbId, faqId, faqNode } from "@/lib/schema";
import RelatedArticles from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "Agence Web à Marrakech — Sites & CRM",
  description:
    "Agence web à Marrakech : création de sites professionnels pour riads, hôtels, restaurants et PME. Résultats rapides, prix compétitifs. Devis gratuit.",
  alternates: {
    // Paired with /web-design-marrakech (seo-fixes-2026-10). The city intent
    // ("agence web marrakech" / "web design marrakech") now has its own page in
    // each language; /web-design-morocco ↔ /fr/creation-site-web-maroc keeps
    // the country intent, so the two pairs no longer compete.
    canonical: "/fr/agence-web-marrakech",
    languages: {
      en: "/web-design-marrakech",
      fr: "/fr/agence-web-marrakech",
      "x-default": "/web-design-marrakech",
    },
  },
  openGraph: {
    type: "website",
    images: ["https://digitalstudiolf.online/images/og-home.jpg"],
    title: "Agence Web Marrakech | Digital Studio LF",
    description:
      "Création de sites web à Marrakech pour riads, hôtels, restaurants et entreprises. Devis gratuit sous 24 heures.",
    url: "https://digitalstudiolf.online/fr/agence-web-marrakech",
    locale: "fr_MA",
  },
};

// The page node the graph was missing: nothing typed this URL, so the
// breadcrumb and FAQ described no page. `inLanguage: "fr"` matters here —
// the default "en" would have declared these French pages to be English.
const PATH = "/fr/agence-web-marrakech";

const webPage = webPageNode({
  path: PATH,
  name: "Agence Web Marrakech",
  description:
    "Agence web à Marrakech : création de sites internet, landing pages et boutiques en ligne sur mesure pour les entreprises marocaines.",
  inLanguage: "fr",
  breadcrumb: true,
  mainEntity: faqId(PATH),
});

const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  "@id": breadcrumbId(PATH),
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Agence Web Marrakech", item: "https://digitalstudiolf.online/fr/agence-web-marrakech" },
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

// One list feeds both the visible FAQ and the FAQPage schema, so the two can
// never say different things (Google requires the markup to match the page).
const faqs = [
  {
    q: "Vous êtes vraiment basés à Marrakech ?",
    a: "Oui, Digital Studio LF est une agence web basée à Marrakech. Nous travaillons principalement avec des entreprises de la région Marrakech-Safi, mais aussi avec des clients dans tout le Maroc et à l'international.",
  },
  {
    q: "Quels types de sites web créez-vous à Marrakech ?",
    a: "Nous créons des sites vitrines, des sites de réservation pour riads et hôtels, des landing pages, des boutiques en ligne, des dashboards d'administration, et des systèmes CRM sur mesure. Chaque projet est développé selon les besoins spécifiques du client.",
  },
  {
    q: "Combien coûte un site web à Marrakech ?",
    a: "Une landing page démarre à 2 500 MAD (250 $), un site vitrine complet à 7 000 MAD (700 $) et un dashboard sur mesure à 12 000 MAD (1 200 $). Pour un riad, comptez entre 2 500 et 12 000 MAD selon les fonctionnalités : un système de réservation avec paiement en ligne démarre à 7 000 MAD. Le prix est fixé par écrit avant le début du projet.",
  },
  {
    q: "Combien de temps faut-il pour créer un site web ?",
    a: "Une landing page est livrée en 7 jours environ, un site vitrine en 10 à 14 jours, et un projet sur mesure (réservation, dashboard, CRM) en 3 à 8 semaines selon le périmètre.",
  },
  {
    q: "Travaillez-vous avec des clients touristiques (riads, hôtels, guides) ?",
    a: "C'est l'une de nos spécialités. Nous comprenons les besoins du secteur touristique à Marrakech — sites multilingues (français, anglais, arabe), systèmes de réservation directe, galeries photo optimisées, et intégration avec les calendriers de disponibilité.",
  },
  {
    q: "Le nom de domaine et l'hébergement sont-ils à mon nom ?",
    a: "Oui. Le domaine, l'hébergement et le code vous appartiennent. Nous vous remettons tous les accès à la livraison, sans abonnement obligatoire.",
  },
];

const faqSchema = faqNode(
  faqs.map((f) => ({ question: f.q, answer: f.a })),
  PATH
);

// Sections merged from the retired post
// /blog/agence-web-marrakech-top-selection-et-services (seo-fixes-2026-10).
const services = [
  { label: "Site vitrine", desc: "Présenter votre entreprise, votre riad, votre cabinet ou votre restaurant, avec un formulaire de contact et un bouton WhatsApp.", href: "/services/business-websites" },
  { label: "Site e-commerce", desc: "Vendre en ligne au Maroc et à l'international : catalogue, paiement, livraison.", href: "/fr/creation-site-ecommerce-maroc" },
  { label: "Landing page", desc: "Une page unique pour une offre, une campagne Google Ads ou un lancement.", href: "/services/landing-pages" },
  { label: "Refonte de site", desc: "Moderniser un site lent ou daté sans perdre son référencement.", href: "/website-redesign" },
  { label: "Référencement local (SEO)", desc: "Apparaître sur Google quand vos clients cherchent vos services à Marrakech.", href: "/blog/on-page-seo-beginner-morocco" },
  { label: "CRM & dashboards", desc: "Gérer prospects, réservations et clients dans un outil fait pour votre activité.", href: "/services/crm-systems" },
];

const checklist = [
  "Le devis détaille chaque livrable, le prix et le délai.",
  "Le portfolio montre de vrais projets, consultables en ligne.",
  "L'agence explique sa méthode de référencement (SEO).",
  "Le site est pensé d'abord pour le mobile.",
  "Le domaine et l'hébergement restent à votre nom.",
  "La maintenance après le lancement est clairement définie.",
  "Les performances peuvent être suivies (Search Console, statistiques).",
];

const priceFactors = [
  "le nombre de pages",
  "les langues (français, anglais, arabe)",
  "les fonctionnalités : réservation, paiement, espace client",
  "le design : sur mesure ou adapté d'un modèle",
  "les besoins en référencement et en contenu",
  "les intégrations (WhatsApp, Google Maps, CRM, calendrier)",
];

export default function AgenceWebMarrakechPage() {
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
              href="/fr/contact"
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

        {/* Services */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            Nos Services d&apos;Agence Web à Marrakech
          </h2>
          <p className="text-white/50 text-center max-w-2xl mx-auto mb-12">
            Pas besoin d&apos;acheter tous les services. Nous commençons par identifier ce qui sera réellement utile à votre activité.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((sv) => (
              <Link key={sv.label} href={sv.href} className="glass rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300">
                <h3 className="text-lg font-bold mb-2">{sv.label}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{sv.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* How to choose */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Comment Choisir une Agence Web à Marrakech ?</h2>
          <p className="text-white/60 leading-relaxed mb-6">
            La bonne agence ne promet pas simplement « un beau site ». Elle pose des questions sur vos offres, vos
            clients, vos concurrents et vos objectifs, puis relie le site à un résultat concret : des réservations,
            des appels, des demandes de devis ou des ventes. Avant de signer, vérifiez ces points :
          </p>
          <ul className="space-y-3 mb-6">
            {checklist.map((item) => (
              <li key={item} className="flex gap-3 items-start text-white/60 text-sm leading-relaxed">
                <span className="text-primary mt-0.5" aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-white/60 leading-relaxed">
            Préparez un court brief (activité, clientèle, langues, fonctionnalités, budget) et comparez deux ou trois
            propositions. Notre guide détaille{" "}
            <Link href="/blog/meilleure-agence-web-design-2026-choisir-le-bon-partenaire" className="text-primary hover:underline">
              comment choisir une agence web
            </Link>{" "}
            et les erreurs à éviter.
          </p>
        </section>

        {/* Local SEO */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Création de Site à Marrakech et Référencement Local</h2>
          <p className="text-white/60 leading-relaxed mb-4">
            Un site qui n&apos;apparaît pas sur Google ne rapporte rien. C&apos;est pourquoi le référencement est
            prévu dès la conception : une page par service, des titres et descriptions ciblés sur Marrakech, un
            maillage interne clair, un site rapide sur mobile et des données structurées pour votre entreprise.
          </p>
          <p className="text-white/60 leading-relaxed">
            Nous vous aidons aussi à configurer votre fiche Google Business Profile, l&apos;outil le plus important
            pour apparaître dans la carte Google quand un client cherche une agence près de chez lui. Pour aller plus
            loin, lisez notre{" "}
            <Link href="/blog/creation-site-web-marrakech-guide-complet" className="text-primary hover:underline">
              guide complet de la création de site web à Marrakech
            </Link>.
          </p>
        </section>

        {/* Pricing */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 sm:p-10 border border-white/10">
            <h2 className="text-3xl font-black mb-4">Combien Coûte un Site Web à Marrakech ?</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Nos tarifs démarrent à <strong className="text-white">2 500 MAD</strong> pour une landing page,{" "}
              <strong className="text-white">7 000 MAD</strong> pour un site vitrine complet et{" "}
              <strong className="text-white">12 000 MAD</strong> pour un dashboard sur mesure. Le prix final dépend de :
            </p>
            <ul className="list-disc pl-6 space-y-1 text-white/60 text-sm mb-6">
              {priceFactors.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="text-white/60 leading-relaxed">
              Le prix est fixé par écrit avant de commencer. Consultez notre{" "}
              <Link href="/fr/prix-creation-site-web-maroc" className="text-primary hover:underline">
                guide des prix de création de site web au Maroc
              </Link>{" "}
              pour le détail par type de projet.
            </p>
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

        {/* Pages connexes — derniers articles du CRM (fr) + liens de pages */}
        <RelatedArticles
          heading="Pages Connexes"
          lang="fr"
          services={[
            { href: "/fr/creation-site-web-maroc", label: "Création Site Web Maroc" },
            { href: "/fr/prix-creation-site-web-maroc", label: "Prix Création Site Web Maroc 2026" },
            { href: "/web-design-marrakech", label: "Web Design Marrakech (English)" },
            { href: "/booking-websites-for-hotels", label: "Sites de Réservation pour Hôtels" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
