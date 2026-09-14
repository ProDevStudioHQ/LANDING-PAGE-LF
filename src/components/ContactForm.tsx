"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { identifyVisitor } from "@/lib/tracker";

const PROJECT_TYPES = [
  "Website",
  "Landing Page",
  "E-commerce",
  "Booking System",
  "CRM",
  "Dashboard",
  "Web Application",
  "Other",
];
// Budget values stay as the USD bands the CRM already groups by; only their
// visible captions are in MAD (see MAD_BUDGET_LABELS).
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
  company: string;
  companyPlaceholder: string;
  business: string;
  businessPlaceholder: string;
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

const MAD_BUDGET_LABELS: Record<string, string> = {
  "Under $500": "Under 5,000 MAD",
  "$500–$1500": "5,000 – 15,000 MAD",
  "$1500–$5000": "15,000 – 50,000 MAD",
  "$5000+": "50,000 MAD +",
};

const EN: ContactFormCopy = {
  eyebrow: "Contact",
  headingLead: "Tell Us About",
  headingAccent: "Your Project",
  intro:
    "You don't need a technical specification. Just explain what your business does, what you need, or what problem you're trying to solve. We'll review your request and get back to you.",
  successTitle: "Thanks — we'll review your request and get back to you.",
  successBody: "In the meantime, check your inbox for a confirmation.",
  name: "Name",
  namePlaceholder: "Your name",
  email: "Email",
  emailPlaceholder: "you@email.com",
  company: "Business / Company",
  companyPlaceholder: "Your business name",
  business: "What does your business do?",
  businessPlaceholder: "e.g. We run a car rental agency in Marrakesh",
  projectType: "What do you need?",
  budget: "Budget",
  message: "Tell us more about your project",
  messagePlaceholder:
    "What problem are you trying to solve? What should your customers or team be able to do?",
  submit: "Submit Project Request",
  submitting: "Sending...",
  consent: "By submitting, you agree to be contacted about your project. No spam.",
  typeLabels: { "Web Application": "Custom Web Application", Other: "Not sure yet / Other" },
  budgetLabels: MAD_BUDGET_LABELS,
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
  company: "Entreprise",
  companyPlaceholder: "Nom de votre entreprise",
  business: "Que fait votre entreprise ?",
  businessPlaceholder: "ex. Nous gérons une agence de location de voitures à Marrakech",
  projectType: "De quoi avez-vous besoin ?",
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
    "E-commerce": "Site e-commerce",
    "Booking System": "Système de réservation",
    Dashboard: "Tableau de bord",
    CRM: "CRM",
    "Web Application": "Application web sur mesure",
    Other: "Autre / je ne sais pas encore",
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
  const [company, setCompany] = useState("");
  const [business, setBusiness] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-fill projectType from URL hash, e.g. #contact?plan=Dashboard.
  // The browser reads that whole fragment as the id "contact?plan=Dashboard",
  // which matches nothing, so the scroll to the form has to be done here.
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
      if (hash.startsWith("#contact?")) {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        body: JSON.stringify({ name, email, company, business, projectType, budget, message }),
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
            data-mcp-description="Project inquiry form — submit name, email, business name, what the business does, what they need, budget, and project details to get a quote from Digital Studio LF."
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

            <div>
              <label className="block text-sm text-white/70 mb-2" htmlFor="cf-company">
                {copy.company}
              </label>
              <input
                id="cf-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/45 focus:outline-none focus:border-primary/50"
                placeholder={copy.companyPlaceholder}
                data-mcp-field="company"
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2" htmlFor="cf-business">
                {copy.business}
              </label>
              <input
                id="cf-business"
                name="business"
                type="text"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/45 focus:outline-none focus:border-primary/50"
                placeholder={copy.businessPlaceholder}
                data-mcp-field="business"
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
