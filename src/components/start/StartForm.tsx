"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitWebsiteLead } from "@/lib/lead";

// The short ask on /start: four fields plus an optional WhatsApp number. The
// CRM keys every lead on its email address (it rejects a lead without one), so
// email is required and WhatsApp is the optional fast channel.
//
// projectType values match ContactForm's PROJECT_TYPES so the CRM groups them
// the same way; only the visible captions are translated.
const NEEDS = ["Website", "Landing Page", "Booking System", "E-commerce", "CRM", "Dashboard", "Other"] as const;

const COPY = {
  en: {
    name: "Your name",
    business: "Business name",
    email: "Email",
    phone: "WhatsApp (optional)",
    need: "What do you need?",
    needs: {
      Website: "A business website",
      "Landing Page": "A landing page",
      "Booking System": "A booking website",
      "E-commerce": "An online store",
      CRM: "A CRM for my team",
      Dashboard: "A dashboard",
      Other: "Not sure yet",
    } as Record<string, string>,
    submit: "Get my free quote",
    sending: "Sending…",
    privacy: "We reply within 24 hours. No spam, no newsletter.",
    error: "Something went wrong. Please try again, or message us on WhatsApp.",
    network: "Network error. Please try again, or message us on WhatsApp.",
    thankYou: "/thank-you",
  },
  fr: {
    name: "Votre nom",
    business: "Nom de l'entreprise",
    email: "E-mail",
    phone: "WhatsApp (facultatif)",
    need: "De quoi avez-vous besoin ?",
    needs: {
      Website: "Un site vitrine",
      "Landing Page": "Une landing page",
      "Booking System": "Un site de réservation",
      "E-commerce": "Une boutique en ligne",
      CRM: "Un CRM pour mon équipe",
      Dashboard: "Un tableau de bord",
      Other: "Je ne sais pas encore",
    } as Record<string, string>,
    submit: "Recevoir mon devis gratuit",
    sending: "Envoi…",
    privacy: "Réponse sous 24 heures. Pas de spam, pas de newsletter.",
    error: "Une erreur est survenue. Réessayez ou écrivez-nous sur WhatsApp.",
    network: "Erreur réseau. Réessayez ou écrivez-nous sur WhatsApp.",
    thankYou: "/fr/thank-you",
  },
};

const input =
  "w-full min-h-12 px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/60";

export default function StartForm({ locale = "en", defaultNeed }: { locale?: "en" | "fr"; defaultNeed?: string }) {
  const t = COPY[locale];
  const router = useRouter();
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [need, setNeed] = useState<string>(
    defaultNeed && (NEEDS as readonly string[]).includes(defaultNeed) ? defaultNeed : "Website",
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const r = await submitWebsiteLead(
      { name, email, phone, company: business, projectType: need, message: `Request from the /start page: ${need}` },
      "start",
    );
    if (r.ok) {
      router.push(t.thankYou);
      return; // keep the button disabled while the next page loads
    }
    setError(r.network ? t.network : t.error);
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} data-form-id="start" data-clarity-mask="true" className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="st-name" className="block text-sm text-white/70 mb-1.5">{t.name}</label>
          <input id="st-name" name="name" type="text" required autoComplete="name" maxLength={120}
            value={name} onChange={(e) => setName(e.target.value)} className={input} />
        </div>
        <div>
          <label htmlFor="st-business" className="block text-sm text-white/70 mb-1.5">{t.business}</label>
          <input id="st-business" name="company" type="text" required autoComplete="organization" maxLength={160}
            value={business} onChange={(e) => setBusiness(e.target.value)} className={input} />
        </div>
        <div>
          <label htmlFor="st-email" className="block text-sm text-white/70 mb-1.5">{t.email}</label>
          <input id="st-email" name="email" type="email" inputMode="email" required autoComplete="email" maxLength={254}
            value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
        </div>
        <div>
          <label htmlFor="st-phone" className="block text-sm text-white/70 mb-1.5">{t.phone}</label>
          <input id="st-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40}
            placeholder="+212 6 12 34 56 78"
            value={phone} onChange={(e) => setPhone(e.target.value)} className={input} />
        </div>
      </div>
      <div>
        <label htmlFor="st-need" className="block text-sm text-white/70 mb-1.5">{t.need}</label>
        <select id="st-need" name="projectType" value={need} onChange={(e) => setNeed(e.target.value)} className={input}>
          {NEEDS.map((n) => (
            <option key={n} value={n} className="bg-black">{t.needs[n]}</option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        aria-busy={busy}
        className="w-full min-h-12 px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {busy ? t.sending : t.submit}
      </button>
      <p className="text-white/55 text-xs text-center">{t.privacy}</p>
    </form>
  );
}
