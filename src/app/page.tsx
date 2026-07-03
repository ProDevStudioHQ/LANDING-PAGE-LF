import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ContactModalProvider from "@/components/ContactModalProvider";
import BackgroundEffects from "@/components/BackgroundEffects";
import PortfolioShowcase from "@/components/PortfolioShowcase";

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
import { faqs as homepageFaqs } from "@/data/home-faqs";
import { pageGraphJson, faqNode } from "@/lib/schema";
import type { Metadata } from "next";
import { getLandingContent, getLandingFaq, getLandingSeo } from "@/lib/crm-content";

// Refresh CRM-controlled copy/SEO every 5 min (revalidation webhook is instant).
export const revalidate = 300;

// Home SEO from the CRM Landing Page Brain, overriding layout defaults when set.
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLandingSeo("home");
  if (!seo) return {};
  const meta: Metadata = {};
  if (seo.seo_title) meta.title = { absolute: seo.seo_title };
  if (seo.seo_description) meta.description = seo.seo_description;
  if (seo.canonical_url) meta.alternates = { canonical: seo.canonical_url };
  if (seo.noindex) meta.robots = { index: false, follow: false };
  return meta;
}

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
  // CRM-controlled content (Landing Page Brain) + pricing overrides, all SSR.
  const [tierOverrides, content, crmFaq] = await Promise.all([
    getTierOverrides(),
    getLandingContent(),
    getLandingFaq(),
  ]);
  const faqItems = crmFaq.length ? crmFaq.map((f) => ({ question: f.question, answer: f.answer })) : homepageFaqs;
  return (
    <ContactModalProvider>
      {/* Page-specific JSON-LD (homepage FAQ), linked to the base graph by @id */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: pageGraphJson(faqNode(faqItems)) }} />
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10">
        <HeroSection content={content.hero} />
        <PortfolioShowcase />
        <ServicesSection />
        <WhyChooseUs />
        <TargetAudienceSection />
        <FeaturesSection />
        <IntegrationsSection />
        <HowItWorks />
        <PricingSection overrides={tierOverrides} />
        <FAQSection items={faqItems} />
      </main>
      <ClientOnlySections />
      <Footer />
    </ContactModalProvider>
  );
}
