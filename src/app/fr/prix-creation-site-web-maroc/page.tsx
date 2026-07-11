import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Prix Création Site Web Maroc 2026 — Tarifs & Guide Complet",
  description:
    "Combien coûte un site web au Maroc en 2026 ? Tarifs détaillés : landing page dès 2 500 MAD, site vitrine dès 7 000 MAD, e-commerce, CRM. Guide complet + devis gratuit.",
  alternates: {
    canonical: "/fr/prix-creation-site-web-maroc",
  },
  keywords: [
    "prix création site web Maroc",
    "combien coûte un site web au Maroc",
    "tarif site web Maroc",
    "coût création site internet Maroc",
    "prix site vitrine Maroc",
    "prix site e-commerce Maroc",
    "devis site web Maroc",
    "tarif agence web Marrakech",
  ],
  openGraph: {
    title: "Prix Création Site Web Maroc 2026 — Tarifs & Guide Complet",
    description:
      "Guide des prix de création de site web au Maroc en 2026 : landing pages, sites vitrines, e-commerce, CRM. Tarifs transparents et devis gratuit sous 24h.",
    url: "https://digitalstudiolf.online/fr/prix-creation-site-web-maroc",
    locale: "fr_MA",
    images: [{ url: "https://digitalstudiolf.online/images/idea-digital.png", width: 1200, height: 630, alt: "Digital Studio LF" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Création Site Web Maroc", item: "https://digitalstudiolf.online/fr/creation-site-web-maroc" },
    { "@type": "ListItem", position: 3, name: "Prix Création Site Web Maroc", item: "https://digitalstudiolf.online/fr/prix-creation-site-web-maroc" },
  ],
};

const faqs = [
  {
    q: "Combien coûte un site web au Maroc en 2026 ?",
    a: "En 2026, une landing page professionnelle coûte entre 2 000 et 5 000 MAD, un site vitrine entre 5 000 et 15 000 MAD, un site e-commerce entre 10 000 et 40 000 MAD, et un CRM ou une application sur mesure entre 20 000 et 60 000 MAD. Le prix dépend du nombre de pages, des fonctionnalités et du niveau de personnalisation.",
  },
  {
    q: "Pourquoi les prix varient-ils autant d'une agence à l'autre ?",
    a: "Trois facteurs expliquent les écarts : le niveau de personnalisation (template acheté vs design sur mesure), la technologie utilisée (WordPress avec plugins vs développement moderne type Next.js), et la structure de l'agence (freelance, petite équipe ou grande agence avec commerciaux et chefs de projet dont les salaires se répercutent sur votre facture).",
  },
  {
    q: "Quels sont les coûts cachés à prévoir ?",
    a: "Au-delà de la création, prévoyez : le nom de domaine (100–150 MAD/an), l'hébergement (300–1 500 MAD/an selon la qualité), le certificat SSL (souvent gratuit), et éventuellement la maintenance (à partir de 200 MAD/mois). Méfiez-vous des offres « pas chères » qui facturent ensuite chaque modification.",
  },
  {
    q: "Un site à 1 500 MAD est-il une bonne affaire ?",
    a: "Rarement. À ce prix, il s'agit presque toujours d'un template générique installé en quelques heures, souvent lent, mal référencé sur Google et impossible à faire évoluer. Un site est un investissement commercial : un site vitrine bien conçu à 7 000 MAD qui génère des clients est plus rentable qu'un site à 1 500 MAD que personne ne trouve.",
  },
  {
    q: "Le référencement (SEO) est-il inclus dans le prix ?",
    a: "Chez nous, oui : chaque site est livré avec les fondations SEO (structure sémantique, balises méta, vitesse de chargement, données structurées, sitemap). Le référencement continu (contenu, netlinking) est un service séparé. Vérifiez toujours ce point dans un devis — beaucoup d'agences facturent le SEO de base en supplément.",
  },
  {
    q: "Combien de temps faut-il pour créer un site web ?",
    a: "Une landing page est livrée en 7 jours, un site vitrine en 10 à 14 jours, un e-commerce en 3 à 4 semaines, et un CRM sur mesure en 4 à 8 semaines. Nous fixons le délai dans le devis et nous nous y tenons.",
  },
  {
    q: "Proposez-vous un paiement en plusieurs fois ?",
    a: "Oui — en général 50 % à la commande et 50 % à la livraison. Pour les projets plus importants (CRM, e-commerce), un échéancier en 3 paiements est possible.",
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

// Market price ranges (what businesses actually pay in Morocco in 2026) vs our fixed offers.
const pricingRows = [
  { type: "Landing page", market: "2 000 – 5 000 MAD", our: "dès 2 500 MAD ($250)", delai: "7 jours", href: "/services/landing-pages" },
  { type: "Site vitrine (5–8 pages)", market: "5 000 – 15 000 MAD", our: "dès 7 000 MAD ($700)", delai: "10–14 jours", href: "/services/business-websites" },
  { type: "Site de réservation (riad / hôtel)", market: "8 000 – 25 000 MAD", our: "sur devis", delai: "14–21 jours", href: "/services/hotel-riad-websites" },
  { type: "Site e-commerce", market: "10 000 – 40 000 MAD", our: "sur devis", delai: "2–4 semaines", href: "/services/online-stores" },
  { type: "Dashboard / admin sur mesure", market: "12 000 – 35 000 MAD", our: "dès 12 000 MAD ($1 200)", delai: "3–5 semaines", href: "/services/admin-dashboards" },
  { type: "CRM sur mesure", market: "20 000 – 60 000 MAD", our: "dès 25 000 MAD ($2 500)", delai: "4–8 semaines", href: "/services/crm-systems" },
];

const factors = [
  { title: "Nombre de pages et de contenus", desc: "Un site de 3 pages ne demande pas le même travail qu'un site de 15 pages avec blog. Chaque page ajoute du design, de la rédaction et de l'intégration." },
  { title: "Design sur mesure ou template", desc: "Un template acheté 500 MAD et personnalisé rapidement coûte moins cher — mais votre site ressemble à des centaines d'autres. Le sur-mesure reflète votre marque et convertit mieux." },
  { title: "Fonctionnalités spécifiques", desc: "Réservation en ligne, paiement, espace client, multilingue français/arabe/anglais, connexion à un CRM… chaque fonctionnalité ajoute du développement." },
  { title: "Qualité technique et vitesse", desc: "Un site lent perd des visiteurs et des positions Google. Les technologies modernes (Next.js, optimisation des images) coûtent plus cher à développer mais rapportent plus." },
  { title: "Référencement (SEO) inclus ou non", desc: "Structure sémantique, données structurées, vitesse, balises — les fondations SEO faites dès la création coûtent bien moins cher qu'une refonte SEO un an plus tard." },
  { title: "Structure du prestataire", desc: "Grande agence avec commerciaux et chefs de projet = frais de structure sur votre facture. Freelance seul = prix bas mais disponibilité limitée. Petit studio spécialisé = le meilleur ratio qualité/prix." },
];

const comparison = [
  {
    title: "Plateforme DIY (Wix, Shopify…)",
    price: "300 – 500 MAD/mois",
    pros: "Rapide à lancer, pas de développeur",
    cons: "Abonnement à vie, SEO limité, site générique, vous ne possédez pas votre code",
  },
  {
    title: "Freelance low-cost",
    price: "1 500 – 4 000 MAD",
    pros: "Prix d'entrée très bas",
    cons: "Templates recyclés, pas de garantie, souvent injoignable après livraison",
  },
  {
    title: "Studio spécialisé (nous)",
    price: "2 500 – 25 000 MAD",
    pros: "Sur mesure, SEO inclus, contact direct avec le développeur, prix fixe, support 30 jours",
    cons: "Plus cher qu'un template — c'est un investissement, pas une dépense",
  },
  {
    title: "Grande agence",
    price: "30 000 – 150 000 MAD",
    pros: "Équipe complète, branding global",
    cons: "Frais de structure élevés, délais longs, vous parlez à un commercial, pas au développeur",
  },
];

export default function PrixCreationSiteWebMarocPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <nav className="text-sm text-white/40 mb-8 flex gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/fr/creation-site-web-maroc" className="hover:text-white transition-colors">Création Site Web Maroc</Link>
            <span>/</span>
            <span className="text-white/70">Prix</span>
          </nav>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            Guide des Tarifs 2026
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Prix de la Création d&apos;un Site Web au <span className="gradient-text">Maroc</span> en 2026
          </h1>
          <p className="text-white/60 text-lg sm:text-xl leading-relaxed mb-6">
            Combien coûte un site web au Maroc ? En 2026, comptez <strong className="text-white">2 000 à 5 000 MAD</strong> pour
            une landing page, <strong className="text-white">5 000 à 15 000 MAD</strong> pour un site vitrine professionnel,
            et <strong className="text-white">10 000 à 40 000 MAD</strong> pour un site e-commerce. Ce guide détaille les
            tarifs réels du marché, les facteurs qui font varier les prix, et les pièges à éviter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-primary/25"
            >
              Obtenir un Devis Gratuit sous 24h
            </Link>
            <Link
              href="/fr/creation-site-web-maroc"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] text-white/90 font-semibold text-base transition-all duration-300"
            >
              Nos Services de Création Web
            </Link>
          </div>
        </section>

        {/* Pricing table */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Tarifs de Création de Site Web au Maroc : le Tableau Complet</h2>
          <p className="text-white/50 mb-8 max-w-2xl">
            Fourchettes constatées sur le marché marocain en 2026, comparées à nos tarifs fixes — annoncés
            avant le début du projet, sans frais cachés.
          </p>
          <div className="overflow-x-auto glass rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10 text-white/40 uppercase tracking-wider text-xs">
                  <th className="p-5">Type de site</th>
                  <th className="p-5">Prix du marché</th>
                  <th className="p-5">Notre tarif</th>
                  <th className="p-5">Délai</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row) => (
                  <tr key={row.type} className="border-b border-white/5 last:border-0">
                    <td className="p-5 font-semibold">
                      <Link href={row.href} className="hover:text-primary transition-colors">{row.type}</Link>
                    </td>
                    <td className="p-5 text-white/60">{row.market}</td>
                    <td className="p-5 text-primary font-semibold">{row.our}</td>
                    <td className="p-5 text-white/60">{row.delai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/40 text-sm mt-4">
            Tous nos tarifs incluent : design sur mesure, version mobile, fondations SEO, formulaire de contact,
            mise en ligne, et 30 jours de support gratuit après livraison.
          </p>
        </section>

        {/* Factors */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Qu&apos;est-ce qui Fait Varier le Prix d&apos;un Site Web ?</h2>
          <p className="text-white/50 mb-10 max-w-2xl">
            Deux devis pour « un site vitrine » peuvent aller du simple au quintuple. Voici les six facteurs
            qui expliquent réellement les écarts de prix au Maroc.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {factors.map((f) => (
              <div key={f.title} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Freelance, Agence ou Plateforme : Que Choisir ?</h2>
          <p className="text-white/50 mb-10 max-w-2xl">
            Le bon choix dépend de votre budget et de vos ambitions. Comparaison honnête des quatre options
            disponibles au Maroc.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {comparison.map((c) => (
              <div key={c.title} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="font-bold text-lg mb-1">{c.title}</h3>
                <p className="text-primary font-semibold text-sm mb-4">{c.price}</p>
                <p className="text-white/60 text-sm mb-2"><span className="text-emerald-400">✓</span> {c.pros}</p>
                <p className="text-white/60 text-sm"><span className="text-rose-400">✗</span> {c.cons}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hidden costs */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 sm:p-10 border border-white/10">
            <h2 className="text-2xl sm:text-3xl font-black mb-6">Les Coûts Annexes à Prévoir (et Ceux à Refuser)</h2>
            <ul className="space-y-4 text-white/60 text-sm sm:text-base leading-relaxed">
              <li><strong className="text-white">Nom de domaine :</strong> 100 à 150 MAD/an pour un .ma ou un .com. Il doit être enregistré <em>à votre nom</em>, pas à celui de l&apos;agence.</li>
              <li><strong className="text-white">Hébergement :</strong> 300 à 1 500 MAD/an selon la performance. Un hébergement lent ruine votre référencement — ne prenez pas le moins cher.</li>
              <li><strong className="text-white">Certificat SSL (https) :</strong> gratuit aujourd&apos;hui (Let&apos;s Encrypt). Refusez tout devis qui le facture en supplément.</li>
              <li><strong className="text-white">Maintenance :</strong> optionnelle, à partir de 200 MAD/mois. Utile pour les mises à jour de contenu régulières ; inutile pour un site vitrine statique bien construit.</li>
              <li><strong className="text-white">« Frais de modification » :</strong> le piège classique des offres low-cost. Chez nous, les 30 premiers jours de retouches sont inclus, et vous recevez le code source complet.</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">Questions Fréquentes sur les Prix</h2>
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
            <h2 className="text-3xl font-black mb-4">Recevez Votre Devis Personnalisé Gratuit</h2>
            <p className="text-white/55 mb-8 max-w-lg mx-auto">
              Décrivez votre projet en deux lignes — nous répondons sous 24 heures avec un prix fixe,
              un délai précis, et zéro engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold transition-all duration-300 shadow-lg shadow-primary/25"
              >
                Demander mon Devis Gratuit
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
