import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { type Solution, getSolution, solutionHref, SOLUTIONS_BASE } from "@/config/solutions";
import { WHATSAPP_NUMBER as DEFAULT_WHATSAPP_NUMBER } from "@/lib/schema";

// Same env override the rest of the site uses, so the number stays in one place.
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;

// Part 4 of the SOP: the eight-section sector template.
//
// Section 4 (case study) renders only when real project data exists. It
// requires a client name, a problem and an outcome, and the SOP forbids
// inventing a number — so with nothing to cite the section is omitted rather
// than filled with placeholder copy. A visitor never sees an empty promise,
// and the gap stays visible to whoever fills the config in.
export default function SolutionPage({ solution }: { solution: Solution }) {
  const s = solution;
  const related = s.related
    .map(getSolution)
    .filter((r): r is Solution => Boolean(r));

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        {/* ── 1. HERO ─────────────────────────────────────────────── */}
        <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <nav aria-label="Fil d'Ariane" className="text-sm text-white/40 mb-8 flex justify-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link href={SOLUTIONS_BASE} className="hover:text-white transition-colors">Solutions</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/70">{s.breadcrumbLabel}</span>
          </nav>

          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            {s.eyebrow}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight max-w-4xl mx-auto">
            {s.h1}
          </h1>
          <p className="text-white/55 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {s.promise}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-primary/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              Demander un devis gratuit
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] text-white/90 font-semibold text-base transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              Voir nos réalisations →
            </Link>
          </div>
        </section>

        {/* ── 2. THE PROBLEM, IN THEIR WORDS ──────────────────────── */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            {s.problemsHeading}
          </h2>
          <p className="text-white/50 text-center max-w-2xl mx-auto mb-12">
            {s.problemsIntro}
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {s.problems.map((p) => (
              <div
                key={p.title}
                className="glass rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-bold mb-2 text-white">{p.title}</h3>
                <p className="text-white/55 text-[15px] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. WHAT YOU DELIVER ─────────────────────────────────── */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            {s.deliverablesHeading}
          </h2>
          <p className="text-white/50 text-center max-w-xl mx-auto mb-12">
            {s.deliverablesIntro}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {s.deliverables.map((d) => (
              <div
                key={d.label}
                className="glass rounded-xl p-6 border border-white/10 hover:border-primary/20 transition-all duration-300"
              >
                <div className="text-3xl mb-4" aria-hidden="true">{d.icon}</div>
                <h3 className="text-lg font-bold mb-2">{d.label}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4a. REAL DELIVERED PROJECT ──────────────────────────
            A genuine portfolio entry, linked so the visitor can see the work
            rather than read a claim about it. When the project comes from a
            neighbouring sector the page says so, instead of implying a match
            that isn't there. */}
        {s.featuredProject && (
          <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8 sm:p-10 border border-white/10">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-[11px] font-bold uppercase tracking-wider mb-5">
                Réalisation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mb-4">
                {s.featuredProject.title}
              </h2>
              {s.featuredProject.adjacent && (
                <p className="text-white/45 text-[15px] leading-relaxed mb-6">
                  {s.featuredProject.adjacent}
                </p>
              )}
              <Link
                href={`/portfolio/${s.featuredProject.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] text-white font-semibold text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                Voir la réalisation
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        )}

        {/* ── 4b. CASE STUDY (only with real project data) ─────────── */}
        {s.caseStudy && (
          <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8 sm:p-10 border border-white/10">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-[11px] font-bold uppercase tracking-wider mb-5">
                Étude de cas
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mb-6">
                {s.caseStudy.client}
              </h2>
              {s.caseStudy.adjacentNote && (
                <p className="text-white/40 text-sm italic mb-6">
                  {s.caseStudy.adjacentNote}
                </p>
              )}
              <dl className="space-y-5">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B7280] mb-1.5">
                    Le problème
                  </dt>
                  <dd className="text-white/60 leading-relaxed">{s.caseStudy.problem}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B7280] mb-1.5">
                    Ce que nous avons construit
                  </dt>
                  <dd className="text-white/60 leading-relaxed">{s.caseStudy.built}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B7280] mb-1.5">
                    Le résultat
                  </dt>
                  <dd className="text-white/60 leading-relaxed">{s.caseStudy.result}</dd>
                </div>
              </dl>
            </div>
          </section>
        )}

        {/* ── 5. PROCESS ──────────────────────────────────────────── */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            Comment ça se passe
          </h2>
          <p className="text-white/50 text-center max-w-xl mx-auto mb-12">
            {s.processIntro}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {s.process.map((p) => (
              <div key={p.step} className="flex flex-col">
                <span className="text-[28px] font-semibold text-primary mb-3">{p.step}</span>
                <h3 className="text-[17px] font-bold mb-2">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. PRICING ──────────────────────────────────────────── */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            Tarifs
          </h2>
          <p className="text-white/50 text-center max-w-xl mx-auto mb-12">
            {s.pricingIntro}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {s.packages.map((p) => (
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
                  <span className="text-3xl font-black">{p.priceMad}</span>
                  <span className="text-white/35 text-sm mb-1">/ {p.priceUsd}</span>
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

        {/* ── 7. FAQ ──────────────────────────────────────────────── */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {s.faqs.map((f) => (
              <details key={f.q} className="glass rounded-xl border border-white/10 p-6 group">
                <summary className="font-bold text-lg cursor-pointer list-none flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded">
                  <h3 className="text-lg font-bold">{f.q}</h3>
                  <span
                    className="text-primary flex-shrink-0 transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="text-white/55 leading-relaxed mt-4">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Related sectors — the internal-linking requirement ───── */}
        {related.length > 0 && (
          <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-center mb-8">
              Autres secteurs
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={solutionHref(r.slug)}
                  className="group glass rounded-xl p-6 border border-white/10 hover:border-primary/25 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <div className="text-2xl mb-3" aria-hidden="true">{r.navEmoji}</div>
                  <h3 className="text-[16px] font-bold mb-1.5">{r.navLabel}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{r.navNote}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-primary text-[13px] font-semibold">
                    Voir la page
                    <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── 8. FINAL CTA — three channels ───────────────────────── */}
        <section className="pb-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <div className="glass rounded-2xl p-10 border border-primary/20 bg-primary/[0.03]">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">{s.ctaHeading}</h2>
            <p className="text-white/55 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              {s.ctaBody}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold transition-all duration-300 shadow-lg shadow-primary/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                Demander un devis gratuit
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Bonjour, je souhaite un devis — ${s.navLabel}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] text-white/90 font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                WhatsApp
              </a>
            </div>
            <p className="text-white/35 text-sm mt-6">
              Réponse sous 2 heures en général · Basés à Marrakech
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
