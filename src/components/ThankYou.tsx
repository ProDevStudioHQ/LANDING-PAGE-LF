import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP_NUMBER as DEFAULT_WHATSAPP_NUMBER } from "@/lib/schema";

// Where every website lead form lands after the server accepted the lead
// (/thank-you, /fr/thank-you). noindex. generate_lead has already fired on the
// form page, so this page sends no conversion of its own (a reload or a direct
// visit would otherwise count as a lead).

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;

const COPY = {
  en: {
    title: "Thanks — we've got your request.",
    lead: "Here is what happens next:",
    steps: [
      { h: "Within 24 hours", p: "We read your request and reply by email or WhatsApp (Monday–Friday, 9:00–18:00 Morocco time)." },
      { h: "Free 30-minute call", p: "In English, French or Arabic, to understand your business and what you need. No pressure." },
      { h: "Your written proposal", p: "Within 24 hours of the call: a fixed price, a fixed timeline and a clear scope." },
    ],
    portfolio: "See our work",
    whatsapp: "Can't wait? Message us on WhatsApp",
    waText: "Hi Digital Studio LF, I just sent a request on your website.",
  },
  fr: {
    title: "Merci — votre demande est bien reçue.",
    lead: "Voici la suite :",
    steps: [
      { h: "Sous 24 heures", p: "Nous lisons votre demande et répondons par e-mail ou WhatsApp (du lundi au vendredi, 9h–18h heure du Maroc)." },
      { h: "Appel gratuit de 30 minutes", p: "En français, anglais ou arabe, pour comprendre votre activité et votre besoin. Sans engagement." },
      { h: "Votre proposition écrite", p: "Dans les 24 heures qui suivent l'appel : un prix fixe, un délai fixe et un périmètre clair." },
    ],
    portfolio: "Voir nos réalisations",
    whatsapp: "Pressé ? Écrivez-nous sur WhatsApp",
    waText: "Bonjour Digital Studio LF, je viens d'envoyer une demande sur votre site.",
  },
};

export default function ThankYou({ locale }: { locale: "en" | "fr" }) {
  const t = COPY[locale];
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.waText)}`;
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        <section className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div
            className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[min(600px,100vw)] h-[260px] bg-primary/10 rounded-full blur-[130px]"
            aria-hidden="true"
          />
          <div className="relative text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 text-3xl" aria-hidden="true">
              ✓
            </div>
            <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-4">{t.title}</h1>
            <p className="text-white/60 text-lg mb-10">{t.lead}</p>
          </div>
          <ol className="relative space-y-4 mb-12">
            {t.steps.map((s, i) => (
              <li key={s.h} className="glass rounded-2xl border border-white/10 p-5 flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary font-black">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-bold mb-1">{s.h}</h2>
                  <p className="text-white/60 leading-relaxed">{s.p}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/portfolio"
              data-cta="thankyou_portfolio"
              className="inline-flex min-h-12 items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all"
            >
              {t.portfolio}
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex min-h-12 items-center justify-center px-8 py-3.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-semibold hover:bg-emerald-500/20 transition-all"
            >
              {t.whatsapp}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
