import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ShareButtons from "@/components/ShareButtons";
import HeroSection from "@/components/HeroSection";
import ContactModalProvider from "@/components/ContactModalProvider";
import BackgroundEffects from "@/components/BackgroundEffects";

// SEO-critical sections: SSR on (content in initial HTML for crawlers).
const ServicesSection = dynamic(() => import("@/components/ServicesSection"));
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const TargetAudienceSection = dynamic(() => import("@/components/TargetAudienceSection"));
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"));
const IntegrationsSection = dynamic(() => import("@/components/IntegrationsSection"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const PricingSection = dynamic(() => import("@/components/PricingSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const Footer = dynamic(() => import("@/components/Footer"));

// Interactive-only (forms, CTA, float button) — deferred via client wrapper.
import ClientOnlySections from "@/components/ClientOnlySections";

import type { TierOverride } from "@/components/PricingSection";

/* Pull live sale pricing/badges from the CRM Promotions module. Fetched
 * server-side (no CORS) with a 60s revalidate window, so activating a
 * promotion in the CRM shows here within a minute. Falls back to the
 * static prices if the CRM is unreachable. */
async function getTierOverrides(): Promise<Record<string, TierOverride>> {
  let base = "https://crm.digitalstudiolf.online";
  try {
    const api = process.env.NEXT_PUBLIC_CRM_API_URL;
    if (api) base = new URL(api).origin;
  } catch {}
  try {
    const res = await fetch(`${base}/api/public/pricing/tiers`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};
    const data = await res.json();
    const map: Record<string, TierOverride> = {};
    for (const t of (data.tiers || []) as TierOverride[]) map[t.tier_key] = t;
    return map;
  } catch {
    return {};
  }
}

export default async function Home() {
  const tierOverrides = await getTierOverrides();
  return (
    <ContactModalProvider>
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <WhyChooseUs />
        <TargetAudienceSection />
        <FeaturesSection />
        <IntegrationsSection />
        <HowItWorks />
        <PricingSection overrides={tierOverrides} />
        <FAQSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <ShareButtons title="Digital Studio LF — Web Design Agency in Morocco" label="Share Digital Studio LF" />
        </div>
      </main>
      <ClientOnlySections />
      <Footer />
    </ContactModalProvider>
  );
}
