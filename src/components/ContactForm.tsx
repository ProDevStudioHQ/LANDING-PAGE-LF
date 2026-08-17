"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { identifyVisitor } from "@/lib/tracker";

const PROJECT_TYPES = ["Landing Page", "Website", "Dashboard", "CRM", "Other"];
const BUDGETS = ["Under $500", "$500–$1500", "$1500–$5000", "$5000+"];

// Visible strings are parameterised so the French pages can render this form
// without shipping English labels at the moment of conversion. Defaults are the
// original English copy, so every existing caller is unchanged.
//
// PROJECT_TYPES and BUDGETS values are deliberately NOT translated: they are
// submitted to the CRM and grouped there, so translating them would fragment
// the same category into two labels. Only their visible captions are localised.
export type ContactFormCopy = {
  eyebrow: string;
  headingLead: string;
  headingAccent: string;
  intro: string;
  successTitle: string;
  successBody: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  projectType: string;
  budget: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  consent: string;
  typeLabels?: Record<string, string>;
  budgetLabels?: Record<string, string>;
};

const EN: ContactFormCopy = {
  eyebrow: "Contact",
  headingLead: "Let's",
  headingAccent: "build it",
  intro: "Tell me about your project — I'll reply within 24 hours.",
  successTitle: "Thanks — I'll reply within 24 hours.",
  successBody: "In the meantime, check your inbox for a confirmation.",
  name: "Name",
  namePlaceholder: "Your name",
  email: "Email",
  emailPlaceholder: "you@email.com",
  projectType: "Project type",
  budget: "Budget",
  message: "Message",
  messagePlaceholder: "Tell me about your project, timeline, and what success looks like.",
  submit: "Send message",
  submitting: "Sending...",
  consent: "By submitting, you agree to be contacted about your project. No spam.",
};

export const CONTACT_FORM_FR: ContactFormCopy = {
  eyebrow: "Contact",
  headingLead: "Parlons de",
  headingAccent: "votre projet",
  intro: "Décrivez-nous votre projet — nous répondons sous 24 heures.",
  successTitle: "Merci — nous vous répondons sous 24 heures.",
  successBody: "En attendant, vérifiez votre boîte mail : une confirmation vous a été envoyée.",
  name: "Nom",
  namePlaceholder: "Votre nom",
  email: "E-mail",
  emailPlaceholder: "vous@email.com",
  projectType: "Type de projet",
  budget: "Budget",
  message: "Message",
  messagePlaceholder:
    "Parlez-nous de votre projet, de vos délais et de ce que vous attendez du résultat.",
  submit: "Envoyer le message",
  submitting: "Envoi en cours...",
  consent:
    "En envoyant ce formulaire, vous acceptez d'être recontacté au sujet de votre projet. Pas de spam.",
  typeLabels: {
    "Landing Page": "Landing page",
    Website: "Site web",
    Dashboard: "Tableau de bord",
    CRM: "CRM",
    Other: "Autre",
  },
  budgetLabels: {
    "Under $500": "Moins de 5 000 MAD",
    "$500–$1500": "5 000 – 15 000 MAD",
    "$1500–$5000": "15 000 – 50 000 MAD",
    "$5000+": "Plus de 50 000 MAD",
  },
};

export default function ContactForm({ copy = EN }: { copy?: ContactFormCopy } = {}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[1]);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-fill projectType from URL hash, e.g. #contact?plan=Dashboard
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash;
      const m = hash.match(/plan=([^&]+)/);
      if (m) {
        const decoded = decodeURIComponent(m[1]);
        const match = PROJECT_TYPES.find(
          (p) => p.toLowerCase() === decoded.toLowerCase(),
        );
        if (match) setProjectType(match);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, projectType, budget, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      void identifyVisitor(email);
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="section-padding relative scroll-mt-24"
    >
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            {copy.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            {copy.headingLead} <span className="gradient-text">{copy.headingAccent}</span>
          </h2>
          <p className="text-white/50 text-lg">
            {copy.intro}
          </p>
        </m.div>

        {status === "success" ? (
          <div className="glass rounded-2xl p-10 text-center border border-emerald-500/20">
            <div className="text-5xl mb-4">✓</div>
            <p className="text-white text-xl font-semibold mb-2">
              {copy.successTitle}
            </p>
            <p className="text-white/60 text-sm">
              {copy.successBody}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 sm:p-8 space-y-5"
            data-mcp-tool="contact_inquiry"
            data-mcp-description="Project inquiry form — submit name, email, project type, budget, and message to get a quote from Digital Studio LF within 24 hours."
          >
            <div>
              <label className="block text-sm text-white/70 mb-2" htmlFor="cf-name">
                {copy.name}
              </label>
              <input
                id="cf-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/45 focus:outline-none focus:border-primary/50"
                placeholder={copy.namePlaceholder}
                data-mcp-field="name"
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2" htmlFor="cf-email">
                {copy.email}
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/45 focus:outline-none focus:border-primary/50"
                placeholder={copy.emailPlaceholder}
                data-mcp-field="email"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-white/70 mb-2" htmlFor="cf-type">
                  {copy.projectType}
                </label>
                <select
                  id="cf-type"
                  name="projectType"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50"
                  data-mcp-field="projectType"
                >
                  {PROJECT_TYPES.map((p) => (
                    <option key={p} value={p} className="bg-black">
                      {copy.typeLabels?.[p] ?? p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2" htmlFor="cf-budget">
                  {copy.budget}
                </label>
                <select
                  id="cf-budget"
                  name="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50"
                  data-mcp-field="budget"
                >
                  {BUDGETS.map((b) => (
                    <option key={b} value={b} className="bg-black">
                      {copy.budgetLabels?.[b] ?? b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2" htmlFor="cf-msg">
                {copy.message}
              </label>
              <textarea
                id="cf-msg"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/45 focus:outline-none focus:border-primary/50 resize-none"
                placeholder={copy.messagePlaceholder}
                data-mcp-field="message"
              />
            </div>

            {errorMsg && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100"
            >
              {status === "loading" ? copy.submitting : copy.submit}
            </button>

            <p className="text-white/55 text-xs text-center">
              {copy.consent}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
