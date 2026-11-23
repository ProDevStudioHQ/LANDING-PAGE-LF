// GA4 helpers shared by the tracker, the lead forms and page-level events.
//
// gtag.js is only injected on the first interaction (or after 4s) — see
// Analytics.tsx. Events fired before that (a case-study view on mount, an
// early click) used to be dropped silently, so they now wait in a small queue
// that Analytics.tsx flushes right after the GA4 config call.
//
// Rule for every caller: no personal data in any parameter — no email, name,
// phone, unsubscribe token or free text typed by the visitor.

type Params = Record<string, unknown>;
type GaWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  __dslfGaQueue?: [string, Params][];
};

const MAX_QUEUE = 50;

export function gaEvent(name: string, params: Params = {}): void {
  if (typeof window === "undefined") return;
  try {
    const w = window as GaWindow;
    if (typeof w.gtag === "function") {
      w.gtag("event", name, params);
      return;
    }
    const q = (w.__dslfGaQueue ||= []);
    if (q.length < MAX_QUEUE) q.push([name, params]);
  } catch {}
}

/** Called once by Analytics.tsx after gtag("config", …). */
export function flushGaQueue(): void {
  try {
    const w = window as GaWindow;
    const q = w.__dslfGaQueue;
    if (!q?.length || typeof w.gtag !== "function") return;
    w.__dslfGaQueue = [];
    for (const [name, params] of q) w.gtag("event", name, params);
  } catch {}
}

/* ── Pages that must stay quiet ──
   The unsubscribe page carries a signed token (?t=) or, from older emails, the
   address itself (?email=). On these paths the query string is removed before
   any analytics loads, and Clarity, Ahrefs and the chat widget do not load. */
const QUIET_PATHS = new Set(["/unsubscribe", "/fr/unsubscribe"]);

export function isQuietPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return QUIET_PATHS.has(pathname.replace(/\/+$/, "") || "/");
}

/* ── UTM persistence ──
   Cold-email visitors land with utm_* on the first URL only. They are kept in
   sessionStorage for the visit so a form submitted three pages later still
   carries the campaign into the CRM lead. */
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;
const UTM_STORE = "dslf_utm";

function readUtmFromUrl(): Utm {
  const out: Utm = {};
  try {
    const p = new URLSearchParams(window.location.search);
    for (const k of UTM_KEYS) {
      const v = p.get(k)?.trim();
      if (v) out[k] = v.slice(0, 100);
    }
  } catch {}
  return out;
}

/** Store the landing URL's UTMs for this visit (a new campaign replaces the old). */
export function captureUtm(): void {
  if (typeof window === "undefined") return;
  const utm = readUtmFromUrl();
  if (!Object.keys(utm).length) return;
  try {
    sessionStorage.setItem(UTM_STORE, JSON.stringify(utm));
  } catch {}
}

/** UTMs of the current URL, or the ones stored when this visit landed. */
export function getUtm(): Utm {
  if (typeof window === "undefined") return {};
  const fromUrl = readUtmFromUrl();
  if (Object.keys(fromUrl).length) return fromUrl;
  try {
    const raw = sessionStorage.getItem(UTM_STORE);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: Utm = {};
    for (const k of UTM_KEYS) {
      const v = parsed[k];
      if (typeof v === "string" && v) out[k] = v.slice(0, 100);
    }
    return out;
  } catch {
    return {};
  }
}
