import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartForm from "@/components/start/StartForm";
import { ProofCards, TestimonialSlot } from "@/components/ProofCards";
import type { PortfolioItem } from "@/lib/crm-content";
import type { TierOverride } from "@/components/PricingPlansSection";
import { offerPrice } from "@/lib/pricing-tiers";
import { WHATSAPP_NUMBER as DEFAULT_WHATSAPP_NUMBER } from "@/lib/schema";

// Cold-email landing page (/start, /fr/start). Visitors from a cold email do
// not know the studio yet, so the order is: outcome → proof → offer → ask.
// noindex: it is for email traffic and would compete with the service pages.

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;

type Locale = "en" | "fr";

// Built-in plans, base USD price and CRM tier key — same as PricingPlansSection.
const OFFERS = [
  { key: "landing_page", baseUsd: 250 },
  { key: "website", baseUsd: 700 },
  { key: "crm_system", baseUsd: 2500 },
] as const;

const COPY = {
  en: {
    eyebrow: "Web studio in Marrakech",
    h1a: "Websites and CRMs that bring Moroccan businesses",
    h1b: "more clients",
    lead: "We design and build websites, booking systems and CRMs for businesses in Morocco. Most projects are delivered in 7–21 days, at a fixed price agreed in writing.",
    seeWork: "See our work",
    whatsapp: "Chat on WhatsApp",
    waText: "Hi Digital Studio LF, I saw your email and I'd like to talk about a project.",
    trust: ["Fixed price, in writing", "Reply within 24 hours", "EN · FR · AR"],
    workTitle: "Recent work",
    workNote:
      "Studio concept projects, built to show what we can do. The same team and the same craft go into every client build.",
    allWork: "See the full portfolio →",
    offersTitle: "What you get",
    offersLead: "Clear starting prices. Your exact price is fixed in writing before any work starts.",
    from: "From",
    was: "was",
    quote: "Get a quote",
    offers: {
      landing_page: {
        name: "Landing page",
        desc: "One focused page that turns visitors into enquiries.",
        points: ["Custom design for your brand", "Mobile-first, fast loading", "WhatsApp & contact form built in"],
      },
      website: {
        name: "Business website",
        desc: "A complete site that presents your business and brings in clients.",
        points: ["5–7 pages", "Multilingual: EN / FR / AR", "Contact form, WhatsApp, Google Maps"],
      },
      crm_system: {
        name: "CRM system",
        desc: "One place for your leads, clients and follow-ups.",
        points: ["Lead and client management", "Pipeline and team access", "Built around how you work"],
      },
    } as Record<string, { name: string; desc: string; points: string[] }>,
    shopEyebrow: "Want to start today?",
    shopTitle: "Ready-made templates",
    shopText: "CRMs, planners and dashboards built by our studio. Download today, no monthly fees.",
    shopCta: "Browse the shop →",
    formTitle: "Get your free quote",
    formLead: "Tell us a little about your business. We reply within 24 hours with next steps and a fixed price.",
    steps: [
      "We reply within 24 hours (Mon–Fri).",
      "A free 30-minute call to understand what you need.",
      "A written proposal: fixed price, timeline and scope.",
    ],
    orWhatsapp: "Prefer WhatsApp?",
    orWhatsappCta: "Message us directly",
    faqTitle: "Questions",
    faq: (p: Record<string, ReturnType<typeof offerPrice>>) => [
      {
        q: "How much does it cost?",
        a: `Landing pages start from ${p.landing_page.price} (${p.landing_page.priceMad}), business websites from ${p.website.price} (${p.website.priceMad}) and CRMs from ${p.crm_system.price} (${p.crm_system.priceMad}). You get a fixed price in writing before any work starts — no hourly billing, no surprises.`,
      },
      {
        q: "How long does it take?",
        a: "Most projects are delivered in 7–21 days. A landing page takes about a week; larger builds such as a CRM take longer, and the timeline is fixed in your proposal.",
      },
      {
        q: "Which languages do you work in?",
        a: "English, French and Arabic, including Darija. We build sites in any of them, or all three.",
      },
      {
        q: "What happens after I contact you?",
        a: "We reply within 24 hours on working days and book a free 30-minute call. Within 24 hours of the call you receive a written proposal with a fixed price, timeline and scope. Nothing starts until you approve it.",
      },
    ],
    stickyQuote: "Get a quote",
  },
  fr: {
    eyebrow: "Studio web à Marrakech",
    h1a: "Des sites web et des CRM qui apportent aux entreprises marocaines",
    h1b: "plus de clients",
    lead: "Nous concevons et développons des sites web, des systèmes de réservation et des CRM pour les entreprises au Maroc. La plupart des projets sont livrés en 7 à 21 jours, à un prix fixe convenu par écrit.",
    seeWork: "Voir nos réalisations",
    whatsapp: "Discuter sur WhatsApp",
    waText: "Bonjour Digital Studio LF, j'ai reçu votre e-mail et je souhaite parler d'un projet.",
    trust: ["Prix fixe, par écrit", "Réponse sous 24 heures", "FR · EN · AR"],
    workTitle: "Réalisations récentes",
    workNote:
      "Projets concepts du studio, créés pour montrer notre savoir-faire. La même équipe et le même soin pour chaque projet client.",
    allWork: "Voir tout le portfolio →",
    offersTitle: "Ce que vous obtenez",
    offersLead: "Des prix de départ clairs. Votre prix exact est fixé par écrit avant le début du travail.",
    from: "À partir de",
    was: "au lieu de",
    quote: "Demander un devis",
    offers: {
      landing_page: {
        name: "Landing page",
        desc: "Une page ciblée qui transforme les visiteurs en demandes.",
        points: ["Design sur mesure pour votre marque", "Mobile d'abord, chargement rapide", "WhatsApp et formulaire de contact intégrés"],
      },
      website: {
        name: "Site vitrine",
        desc: "Un site complet qui présente votre activité et vous apporte des clients.",
        points: ["5 à 7 pages", "Multilingue : FR / EN / AR", "Formulaire, WhatsApp, Google Maps"],
      },
      crm_system: {
        name: "CRM sur mesure",
        desc: "Un seul outil pour vos prospects, clients et relances.",
        points: ["Gestion des prospects et clients", "Pipeline et accès équipe", "Adapté à votre façon de travailler"],
      },
    } as Record<string, { name: string; desc: string; points: string[] }>,
    shopEyebrow: "Envie de démarrer aujourd'hui ?",
    shopTitle: "Modèles prêts à l'emploi",
    shopText: "CRM, planners et tableaux de bord conçus par notre studio. Téléchargement immédiat, sans abonnement.",
    shopCta: "Voir la boutique →",
    formTitle: "Recevez votre devis gratuit",
    formLead: "Parlez-nous un peu de votre activité. Nous répondons sous 24 heures avec les prochaines étapes et un prix fixe.",
    steps: [
      "Réponse sous 24 heures (du lundi au vendredi).",
      "Un appel gratuit de 30 minutes pour comprendre votre besoin.",
      "Une proposition écrite : prix fixe, délai et périmètre.",
    ],
    orWhatsapp: "Vous préférez WhatsApp ?",
    orWhatsappCta: "Écrivez-nous directement",
    faqTitle: "Questions fréquentes",
    faq: (p: Record<string, ReturnType<typeof offerPrice>>) => [
      {
        q: "Combien ça coûte ?",
        a: `Une landing page démarre à ${p.landing_page.priceMad} (${p.landing_page.price}), un site vitrine à ${p.website.priceMad} (${p.website.price}) et un CRM à ${p.crm_system.priceMad} (${p.crm_system.price}). Vous recevez un prix fixe par écrit avant le début du travail — pas de facturation à l'heure, pas de surprise.`,
      },
      {
        q: "Combien de temps faut-il ?",
        a: "La plupart des projets sont livrés en 7 à 21 jours. Une landing page prend environ une semaine ; les projets plus importants comme un CRM prennent plus de temps, et le délai est fixé dans votre proposition.",
      },
      {
        q: "Dans quelles langues travaillez-vous ?",
        a: "Français, anglais et arabe, y compris la darija. Nous créons des sites dans l'une de ces langues, ou les trois.",
      },
      {
        q: "Que se passe-t-il après ma demande ?",
        a: "Nous répondons sous 24 heures les jours ouvrables et fixons un appel gratuit de 30 minutes. Dans les 24 heures qui suivent, vous recevez une proposition écrite avec un prix fixe, un délai et un périmètre. Rien ne commence sans votre accord.",
      },
    ],
    stickyQuote: "Demander un devis",
  },
};

export default function StartLanding({
  locale,
  items,
  tiers,
}: {
  locale: Locale;
  items: PortfolioItem[];
  tiers: Record<string, TierOverride>;
}) {
  const t = COPY[locale];
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.waText)}`;
  const prices = Object.fromEntries(OFFERS.map((o) => [o.key, offerPrice(o.baseUsd, tiers[o.key])]));
  const faq = t.faq(prices);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="relative pt-28 sm:pt-36 pb-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div
            className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 w-[min(640px,100vw)] h-[300px] bg-primary/10 rounded-full blur-[130px]"
            aria-hidden="true"
          />
          <div className="relative">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              {t.eyebrow}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6">
              {t.h1a} <span className="gradient-text">{t.h1b}</span>
            </h1>
            <p className="text-white/65 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-8">{t.lead}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#work"
                data-cta="start_hero_work"
                className="inline-flex min-h-12 items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all"
              >
                {t.seeWork}
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                data-cta="start_hero_whatsapp"
                className="inline-flex min-h-12 items-center justify-center px-8 py-3.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-semibold hover:bg-emerald-500/20 transition-all"
              >
                {t.whatsapp}
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/55">
              {t.trust.map((x) => (
                <li key={x} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Proof first */}
        <section id="work" data-section="start_work" className="scroll-mt-24 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black mb-2">{t.workTitle}</h2>
              <p className="text-white/55 max-w-2xl">{t.workNote}</p>
            </div>
            <Link href="/portfolio" className="text-primary font-semibold text-sm hover:underline whitespace-nowrap">
              {t.allWork}
            </Link>
          </div>
          <ProofCards items={items.slice(0, 6)} locale={locale} />
        </section>

        {/* Offers */}
        <section id="offers" data-section="start_offers" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-2">{t.offersTitle}</h2>
          <p className="text-white/55 mb-8 max-w-2xl">{t.offersLead}</p>
          <div className="grid md:grid-cols-3 gap-5">
            {OFFERS.map((o) => {
              const c = t.offers[o.key];
              const p = prices[o.key];
              return (
                <div key={o.key} className="glass rounded-2xl border border-white/10 p-6 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-bold">{c.name}</h3>
                    {p.badge && (
                      <span className="shrink-0 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-300 text-[11px] font-semibold tracking-wide">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-white/60 text-sm mb-5">{c.desc}</p>
                  <p className="text-sm text-white/55">{t.from}</p>
                  <p className="mb-1">
                    <span className="text-4xl font-black">{p.price}</span>
                    {p.was && (
                      <span className="ml-2 text-white/60 text-sm">
                        {t.was} <s>{p.was}</s>
                      </span>
                    )}
                  </p>
                  <p className="text-white/55 text-sm mb-5">≈ {p.priceMad}</p>
                  <ul className="space-y-2 mb-6 text-sm text-white/70">
                    {c.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span className="text-primary" aria-hidden="true">✓</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#form"
                    data-cta={`start_offer_${o.key}`}
                    className="mt-auto inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {t.quote}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Ready-made option */}
          <Link
            href="/shop"
            data-cta="start_shop"
            className="mt-6 group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.01] p-6 hover:border-primary/30 transition-colors"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55 mb-1">{t.shopEyebrow}</p>
              <p className="text-xl font-bold mb-1">{t.shopTitle}</p>
              <p className="text-white/60 text-sm">{t.shopText}</p>
            </div>
            <span className="text-primary font-semibold whitespace-nowrap group-hover:translate-x-0.5 transition-transform">
              {t.shopCta}
            </span>
          </Link>
        </section>

        {/* Real testimonials only — renders nothing until src/config/testimonials.ts has one. */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <TestimonialSlot className="my-6" />
        </div>

        {/* The ask */}
        <section id="form" data-section="start_form" className="scroll-mt-24 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black mb-3">{t.formTitle}</h2>
              <p className="text-white/60 mb-6 leading-relaxed">{t.formLead}</p>
              <ol className="space-y-3 mb-8">
                {t.steps.map((s, i) => (
                  <li key={s} className="flex gap-3 text-white/75">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="text-white/55 text-sm">
                {t.orWhatsapp}{" "}
                <a href={waUrl} target="_blank" rel="noopener noreferrer nofollow" className="text-emerald-300 font-semibold hover:underline">
                  {t.orWhatsappCta}
                </a>
              </p>
            </div>
            <div className="glass rounded-2xl border border-white/10 p-6 sm:p-8">
              <StartForm locale={locale} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-8">{t.faqTitle}</h2>
          <div className="space-y-3">
            {faq.map(({ q, a }) => (
              <details key={q} className="group glass rounded-xl border border-white/10 p-5 open:border-primary/25">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-bold">
                  {q}
                  <span className="text-primary text-xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-white/65 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />

      {/* Sticky mobile bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 md:hidden border-t border-white/10 bg-black/90 backdrop-blur px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-2 gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            data-cta="start_sticky_whatsapp"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-500 text-black font-semibold"
          >
            WhatsApp
          </a>
          <a
            href="#form"
            data-cta="start_sticky_quote"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold"
          >
            {t.stickyQuote}
          </a>
        </div>
      </div>
      {/* Keeps the footer's last line clear of the sticky bar on mobile. */}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  );
}
