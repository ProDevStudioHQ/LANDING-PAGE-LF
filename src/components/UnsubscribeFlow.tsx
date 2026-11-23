"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gaEvent } from "@/lib/ga";

// Website side of the unsubscribe flow. The CRM owns the suppression list and
// the signed tokens; this page only calls its public API (CORS allows this
// origin — DIGITALSTUDIOLF-CRM app/api/unsubscribe):
//
//   GET  /api/unsubscribe/verify?t=TOKEN → 200 {valid:true, email:"j***@x.com", alreadyUnsubscribed}
//                                          400 {valid:false}
//   POST /api/unsubscribe {"t":TOKEN}    → 200 {ok:true} · 400 bad token
//   POST /api/unsubscribe {"email":…}    → 200 {ok:true} always (no list probing) · 429 rate limit
//
// Nothing is unsubscribed on page load: mail scanners open every link, so only
// the button click calls the POST.

const CRM = "https://crm.digitalstudiolf.online";
const FALLBACK_EMAIL = "hello@digitalstudiolf.online";
const TOKEN_KEY = "dslf_unsub_t";
const TIMEOUT_MS = 10_000;

type Locale = "en" | "fr";
type Phase = "checking" | "confirm" | "form" | "done" | "error";

const COPY = {
  en: {
    checking: "Checking your link…",
    title: "Unsubscribe",
    confirmLead: "Unsubscribe",
    confirmTail: "from Digital Studio LF emails?",
    confirmGeneric: "Unsubscribe from Digital Studio LF emails?",
    button: "Unsubscribe",
    sending: "Unsubscribing…",
    formIntro: "Enter the email address you want to remove from our list.",
    invalidLink: "This link has expired or is not valid. Enter your email address instead.",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    replyHint: "Or reply “unsubscribe” to any of our emails.",
    doneTitle: "Done.",
    doneBody: "You won't receive any more emails from us. Sorry for the interruption.",
    softLink: "Changed your mind about a website? See our work →",
    errorBody:
      "Something went wrong. Email hello@digitalstudiolf.online with the subject “unsubscribe” and we'll remove you within 24 hours.",
    errorButton: "Email us to unsubscribe",
    mailBody: "Please remove my email address from your mailing list.",
    tooMany: "Too many attempts. Please wait a minute and try again.",
    badEmail: "Enter a valid email address.",
  },
  fr: {
    checking: "Vérification du lien…",
    title: "Se désabonner",
    confirmLead: "Désabonner",
    confirmTail: "des e-mails de Digital Studio LF ?",
    confirmGeneric: "Vous désabonner des e-mails de Digital Studio LF ?",
    button: "Me désabonner",
    sending: "Désabonnement…",
    formIntro: "Saisissez l'adresse e-mail à retirer de notre liste.",
    invalidLink: "Ce lien a expiré ou n'est pas valide. Saisissez plutôt votre adresse e-mail.",
    emailLabel: "Adresse e-mail",
    emailPlaceholder: "vous@exemple.com",
    replyHint: "Ou répondez « unsubscribe » à n'importe lequel de nos e-mails.",
    doneTitle: "C'est fait.",
    doneBody: "Vous ne recevrez plus d'e-mails de notre part. Désolés pour le dérangement.",
    softLink: "Finalement, un site web vous intéresse ? Voir nos réalisations →",
    errorBody:
      "Une erreur est survenue. Écrivez à hello@digitalstudiolf.online avec l'objet « unsubscribe » et nous vous retirerons sous 24 heures.",
    errorButton: "Nous écrire pour se désabonner",
    mailBody: "Merci de retirer mon adresse e-mail de votre liste de diffusion.",
    tooMany: "Trop de tentatives. Patientez une minute puis réessayez.",
    badEmail: "Saisissez une adresse e-mail valide.",
  },
} as const;

async function callCrm(path: string, init?: RequestInit): Promise<{ status: number; data: Record<string, unknown> }> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${CRM}${path}`, {
      ...init,
      signal: ctrl.signal,
      cache: "no-store",
      credentials: "omit",
      referrerPolicy: "no-referrer",
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    return { status: res.status, data };
  } finally {
    clearTimeout(timer);
  }
}

function forgetToken() {
  try { sessionStorage.removeItem(TOKEN_KEY); } catch {}
}

export default function UnsubscribeFlow({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];
  const [phase, setPhase] = useState<Phase>("checking");
  const [masked, setMasked] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [invalidLink, setInvalidLink] = useState(false);
  const tokenRef = useRef("");

  useEffect(() => {
    let token = "";
    let legacyEmail = "";
    // Read the token / address, then take them out of the address bar at once
    // so no analytics script, shared link or bookmark ever sees them.
    try {
      const u = new URL(window.location.href);
      token = (u.searchParams.get("t") || "").trim();
      legacyEmail = (u.searchParams.get("email") || "").trim();
      if (u.search) window.history.replaceState(window.history.state, "", u.pathname + u.hash);
    } catch {}
    // Keep the token for this tab only, so a reload still works.
    try {
      if (token) sessionStorage.setItem(TOKEN_KEY, token);
      else token = sessionStorage.getItem(TOKEN_KEY) || "";
    } catch {}
    if (legacyEmail) setEmail(legacyEmail.slice(0, 254));

    if (!token) {
      setPhase("form");
      return;
    }
    tokenRef.current = token;

    let cancelled = false;
    callCrm(`/api/unsubscribe/verify?t=${encodeURIComponent(token)}`)
      .then(({ status, data }) => {
        if (cancelled) return;
        if (status === 200 && data.valid === true) {
          setMasked(typeof data.email === "string" ? data.email : "");
          if (data.alreadyUnsubscribed === true) {
            forgetToken();
            setPhase("done");
          } else {
            setPhase("confirm");
          }
        } else if (status === 400) {
          tokenRef.current = "";
          forgetToken();
          setInvalidLink(true);
          setPhase("form");
        } else {
          setPhase("error");
        }
      })
      .catch(() => {
        if (!cancelled) setPhase("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function confirmToken() {
    if (busy || !tokenRef.current) return;
    setBusy(true);
    setNotice("");
    try {
      const { status } = await callCrm("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t: tokenRef.current }),
      });
      if (status === 200) {
        forgetToken();
        gaEvent("unsubscribe", { method: "link" });
        setPhase("done");
      } else if (status === 400) {
        tokenRef.current = "";
        forgetToken();
        setInvalidLink(true);
        setPhase("form");
      } else if (status === 429) {
        setNotice(t.tooMany);
      } else {
        setPhase("error");
      }
    } catch {
      setPhase("error");
    } finally {
      setBusy(false);
    }
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    const address = email.trim();
    if (!address) return;
    setBusy(true);
    setNotice("");
    try {
      const { status } = await callCrm("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: address }),
      });
      if (status === 200) {
        gaEvent("unsubscribe", { method: "email" });
        setPhase("done");
      } else if (status === 429) {
        setNotice(t.tooMany);
      } else if (status === 400) {
        setNotice(t.badEmail);
      } else {
        setPhase("error");
      }
    } catch {
      setPhase("error");
    } finally {
      setBusy(false);
    }
  }

  const mailto = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent("unsubscribe")}&body=${encodeURIComponent(t.mailBody)}`;
  const btn =
    "w-full min-h-12 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  return (
    <div className="glass rounded-2xl border border-white/10 p-6 sm:p-8 w-full max-w-md" aria-live="polite">
      {phase === "checking" && <p className="text-white/60 text-center py-6">{t.checking}</p>}

      {phase === "confirm" && (
        <>
          <h1 className="text-2xl font-black mb-4">{t.title}</h1>
          <p className="text-white/75 text-lg leading-relaxed mb-6">
            {masked ? (
              <>
                {t.confirmLead} <strong className="text-white break-all">{masked}</strong> {t.confirmTail}
              </>
            ) : (
              t.confirmGeneric
            )}
          </p>
          <button type="button" onClick={confirmToken} disabled={busy} aria-busy={busy} className={btn}>
            {busy ? t.sending : t.button}
          </button>
          {notice && <p className="text-amber-300 text-sm mt-4" role="alert">{notice}</p>}
        </>
      )}

      {phase === "form" && (
        <form onSubmit={submitEmail}>
          <h1 className="text-2xl font-black mb-3">{t.title}</h1>
          {invalidLink && <p className="text-amber-300 text-sm mb-3">{t.invalidLink}</p>}
          <p className="text-white/65 mb-5">{t.formIntro}</p>
          <label htmlFor="unsub-email" className="block text-sm text-white/70 mb-2">
            {t.emailLabel}
          </label>
          <input
            id="unsub-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="w-full min-h-12 px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/60 mb-4"
          />
          <button type="submit" disabled={busy} aria-busy={busy} className={btn}>
            {busy ? t.sending : t.button}
          </button>
          {notice && <p className="text-amber-300 text-sm mt-4" role="alert">{notice}</p>}
          <p className="text-white/50 text-sm mt-5 text-center">{t.replyHint}</p>
        </form>
      )}

      {phase === "done" && (
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 text-2xl" aria-hidden="true">
            ✓
          </div>
          <h1 className="text-2xl font-black mb-2">{t.doneTitle}</h1>
          <p className="text-white/70 leading-relaxed mb-6">{t.doneBody}</p>
          <Link href="/portfolio" className="text-sm text-white/55 hover:text-primary underline underline-offset-4">
            {t.softLink}
          </Link>
        </div>
      )}

      {phase === "error" && (
        <div>
          <h1 className="text-2xl font-black mb-3">{t.title}</h1>
          <p className="text-white/75 leading-relaxed mb-6" role="alert">{t.errorBody}</p>
          <a href={mailto} className={`${btn} inline-flex items-center justify-center`}>
            {t.errorButton}
          </a>
        </div>
      )}
    </div>
  );
}
