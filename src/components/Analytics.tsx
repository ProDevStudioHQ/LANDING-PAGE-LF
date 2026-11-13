"use client";

import { useEffect } from "react";

const GTM_ID = "G-HK99HXQ451";
const GOOGLE_ADS_ID = "AW-861674201";

// Load Google Analytics only after the first user interaction (scroll, click,
// keydown, touch). This keeps the 155 KiB GTM bundle off the critical path
// and out of the initial idle window, reducing TBT and unused-JS warnings.
// Fallback: load after 4 seconds in case the user never interacts (e.g. bots,
// very fast bouncers) so we don't lose all analytics data.
export function Analytics() {
  useEffect(() => {
    let loaded = false;

    function load() {
      if (loaded) return;
      loaded = true;

      // Remove interaction listeners
      EVENTS.forEach((e) => window.removeEventListener(e, onInteraction));
      clearTimeout(timer);

      // Inject GTM script
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`;
      script.async = true;
      document.head.appendChild(script);

      // Init dataLayer. IMPORTANT: gtag.js only processes entries that are the
      // special `arguments` object — pushing a plain array is silently ignored
      // (GA4 receives no data at all). So this must be a classic function
      // pushing `arguments`, not a rest-args arrow/function pushing an array.
      const w = window as unknown as { dataLayer: unknown[] };
      w.dataLayer = w.dataLayer || [];
      function gtag() {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer.push(arguments);
      }
      const track = gtag as (...args: unknown[]) => void;
      // The visitor tracker sends scroll_depth / section_view / cta_click through this.
      (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag = track;
      track("js", new Date());
      // Never send the CRM's email click token (dslf_c) to Google. The tracker
      // already removes it from the address bar; this is the second line of
      // defence. (Not a fixed page_location in config: that would pin every
      // later page view of this visit to the first URL.)
      try {
        const u = new URL(window.location.href);
        if (u.searchParams.has("dslf_c")) {
          u.searchParams.delete("dslf_c");
          window.history.replaceState(window.history.state, "", u.pathname + u.search + u.hash);
        }
      } catch {}
      track("config", GTM_ID, { send_page_view: true });
      track("config", GOOGLE_ADS_ID);
    }

    const EVENTS = ["scroll", "click", "keydown", "touchstart"];
    const onInteraction = () => load();

    EVENTS.forEach((e) =>
      window.addEventListener(e, onInteraction, { passive: true, once: true })
    );

    // Fallback timer — ensures tracking fires even on zero-interaction sessions
    const timer = setTimeout(load, 4000);

    return () => {
      clearTimeout(timer);
      EVENTS.forEach((e) => window.removeEventListener(e, onInteraction));
    };
  }, []);

  return null;
}
