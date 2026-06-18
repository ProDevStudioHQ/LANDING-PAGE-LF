import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ContactModalProvider from "@/components/ContactModalProvider";
import BackgroundEffects from "@/components/BackgroundEffects";

// Below-the-fold sections: lazy-load to speed up first paint on mobile.
const ServicesSection = dynamic(() => import("@/components/ServicesSection"));
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const TargetAudienceSection = dynamic(() => import("@/components/TargetAudienceSection"));
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"));
const IntegrationsSection = dynamic(() => import("@/components/IntegrationsSection"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const PricingSection = dynamic(() => import("@/components/PricingSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const EmailCaptureSection = dynamic(() => import("@/components/EmailCaptureSection"));
const ContactForm = dynamic(() => import("@/components/ContactForm"));
const CTASection = dynamic(() => import("@/components/CTASection"));
const Footer = dynamic(() => import("@/components/Footer"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"));

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
        <EmailCaptureSection />
        <ContactForm />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </ContactModalProvider>
  );
}
