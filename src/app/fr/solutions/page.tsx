import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { solutionsByGroup, solutionHref } from "@/config/solutions";

const SITE = "https://digitalstudiolf.online";

export const metadata: Metadata = {
  title: { absolute: "Solutions par Secteur | Digital Studio LF" },
  description:
    "Sites web par secteur au Maroc : riad, hôtel, restaurant, agence de voyage, spa. Réservation directe, multilingue, prix en MAD. Devis gratuit sous 24h.",
  alternates: { canonical: "/fr/solutions" },
  openGraph: {
    type: "website",
    title: "Solutions par Secteur | Digital Studio LF",
    description:
      "Sites web conçus pour votre métier : riad, hôtel, restaurant, agence de voyage, spa. Basés à Marrakech.",
    url: `${SITE}/fr/solutions`,
    locale: "fr_MA",
    images: ["https://digitalstudiolf.online/images/og-home.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
    { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE}/fr/solutions` },
  ],
};

export default function SolutionsHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <nav aria-label="Fil d'Ariane" className="text-sm text-white/40 mb-8 flex justify-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/70">Solutions</span>
          </nav>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            Par Secteur
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Un site conçu pour{" "}
            <span className="gradient-text">votre métier</span>
          </h1>
          <p className="text-white/55 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Chaque secteur a ses contraintes. Un riad vit de la réservation directe,
            un restaurant d&apos;un menu lisible sur téléphone, un spa d&apos;un planning
            qui se remplit tout seul. Choisissez le vôtre.
          </p>
        </section>

        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {solutionsByGroup().map((g) => (
            <div key={g.group} className="mb-14 last:mb-0">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35 mb-5">
                {g.group}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {g.items.map((s) => (
                  <Link
                    key={s.slug}
                    href={solutionHref(s.slug)}
                    className="group flex flex-col glass rounded-2xl p-7 border border-white/10 hover:border-primary/25 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    <div className="text-3xl mb-4" aria-hidden="true">{s.navEmoji}</div>
                    <h3 className="text-xl font-bold mb-1.5">{s.navLabel}</h3>
                    <p className="text-primary/80 text-[13px] font-medium mb-3">{s.navNote}</p>
                    <p className="text-white/50 text-sm leading-relaxed flex-1">{s.promise}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-primary text-[13px] font-semibold">
                      À partir de {s.packages[0].priceMad}
                      <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* The escape hatch for the undecided visitor — often the best lead. */}
          <div className="mt-12 text-center">
            <div className="glass rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
              <h2 className="text-2xl font-black mb-3">Votre secteur n&apos;est pas dans la liste ?</h2>
              <p className="text-white/55 mb-6 leading-relaxed">
                Nous construisons aussi des sites e-commerce, des tableaux de bord et des
                CRM sur mesure. Dites-nous votre activité — nous vous dirons franchement
                si nous sommes le bon interlocuteur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold transition-all duration-300 shadow-lg shadow-primary/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  Parlons-en
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] text-white/90 font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  Tous nos services →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
