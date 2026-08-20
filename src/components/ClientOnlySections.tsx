"use client";

import dynamic from "next/dynamic";

// The floating WhatsApp button is the only genuinely client-only thing left here:
// it is a fixed-position affordance with no anchor target, no crawlable content,
// and no place in the document outline, so keeping its chunk out of the initial
// load is a free win.
//
// EmailCaptureSection, ContactForm and CTASection used to live here behind
// `ssr: false` on the theory that they had "no SEO value". They do:
//   - ContactForm owns id="contact", and PricingSection/IntegrationsSection/
//     CTASection all link to #contact. With the form absent from the SSR HTML
//     the anchor resolved to nothing, so every one of those CTAs was a dead
//     click until hydration finished — the primary conversion path off the
//     pricing table.
//   - Injecting three full sections between </main> and the footer after
//     hydration shifted the footer down, which counts as CLS for anyone who
//     had already scrolled near the bottom.
//   - robots.txt deliberately admits GPTBot/OAI-SearchBot/PerplexityBot, which
//     largely do not execute JS. The contact path was invisible to exactly the
//     crawlers the site opts into.
// They are now rendered server-side from src/app/page.tsx like every other
// section. They sit below the fold, so this does not affect the LCP element.
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });

export default function ClientOnlySections() {
  return <WhatsAppButton />;
}
