"use client";

import { useEffect, useState } from "react";

// Microsoft Clarity (heatmaps, recordings, rage clicks) — loaded ONLY after the
// visitor accepts. Nothing renders and nothing loads unless
// NEXT_PUBLIC_CLARITY_ID is set. The choice is kept in localStorage; "Decline"
// is remembered too and Clarity never loads. Form fields are masked by
// Clarity by default and the contact section carries data-clarity-mask.
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "";
const KEY = "dslf_behaviour_consent";

function readChoice(): string | null {
  try { return localStorage.getItem(KEY); } catch { return null; }
}
function saveChoice(v: "granted" | "denied"): void {
  try { localStorage.setItem(KEY, v); } catch {}
}

function loadClarity(id: string): void {
  const w = window as unknown as { clarity?: ((...a: unknown[]) => void) & { q?: unknown[] } };
  if (w.clarity) return;
  const q: unknown[] = [];
  const fn = function (...args: unknown[]) { q.push(args); } as ((...a: unknown[]) => void) & { q?: unknown[] };
  fn.q = q;
  w.clarity = fn;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  w.clarity("consent");
}

export function ClarityConsent() {
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    if (!CLARITY_ID) return;
    const c = readChoice();
    if (c === "granted") { loadClarity(CLARITY_ID); return; }
    if (c) return;
    // Shown a moment after load, off the first paint.
    const t = setTimeout(() => setAsk(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!CLARITY_ID || !ask) return null;
  return (
    <div role="dialog" aria-live="polite" aria-label="Analytics cookies"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-2xl border border-white/10 bg-neutral-950/95 p-4 text-sm text-white/80 shadow-2xl backdrop-blur sm:inset-x-auto sm:right-4">
      <p>
        We would like to use Microsoft Clarity to see how visitors use this site (clicks, scrolling) so we can improve it.
        Form fields are hidden from it. <a href="/cookies" className="underline text-white">Cookie policy</a>
      </p>
      <div className="mt-3 flex justify-end gap-2">
        <button type="button" className="rounded-lg border border-white/20 px-3 py-1.5 hover:bg-white/10"
          onClick={() => { saveChoice("denied"); setAsk(false); }}>Decline</button>
        <button type="button" className="rounded-lg bg-white px-3 py-1.5 font-semibold text-black hover:bg-white/90"
          onClick={() => { saveChoice("granted"); setAsk(false); loadClarity(CLARITY_ID); }}>Accept</button>
      </div>
    </div>
  );
}
