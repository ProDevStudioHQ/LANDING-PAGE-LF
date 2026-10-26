import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ContactModalProvider from "@/components/ContactModalProvider";
import BackgroundEffects from "@/components/BackgroundEffects";

// SEO-critical sections: SSR on (content in initial HTML for crawlers).
const OutcomesSection = dynamic(() => import("@/components/OutcomesSection"));
const ServicesSection = dynamic(() => import("@/components/ServicesSection"));
const NotSureSection = dynamic(() => import("@/components/NotSureSection"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const TargetAudienceSection = dynamic(() => import("@/components/TargetAudienceSection"));
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const BilingualSection = dynamic(() => import("@/components/BilingualSection"));
// Original homepage sections, kept alongside the new copy. The duplicate
// ServicesOverviewSection and BuiltBetterSection were merged into
// ServicesSection and WhyChooseUs respectively.
const EverySizeSection = dynamic(() => import("@/components/EverySizeSection"));
const ReadyToBuildSection = dynamic(() => import("@/components/ReadyToBuildSection"));
const PricingPlansSection = dynamic(() => import("@/components/PricingPlansSection"));
const CrmTemplatesSection = dynamic(() => import("@/components/CrmTemplatesSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const Footer = dynamic(() => import("@/components/Footer"));

// Conversion sections. These are SSR like everything above: ContactForm owns the
// id="contact" that the hero, services, pricing and CTA buttons all link to, so
// it has to exist in the server HTML or those CTAs are dead clicks before
// hydration. See the note in ClientOnlySections.tsx.
const ContactForm = dynamic(() => import("@/components/ContactForm"));
const CTASection = dynamic(() => import("@/components/CTASection"));
const NewsletterCTA = dynamic(() => import("@/components/NewsletterCTA"));

// Floating WhatsApp button only — genuinely client-only, deferred via client wrapper.
import ClientOnlySections from "@/components/ClientOnlySections";

import type { TierOverride } from "@/components/PricingPlansSection";
import { faqs as homepageFaqs } from "@/data/home-faqs";
import type { Metadata } from "next";
import { getLandingContent, getLandingFaq, getLandingSeo } from "@/lib/crm-content";
import { pageGraphJson, webPageNode } from "@/lib/schema";

// The homepage <title> and description are NOT taken from the CRM. The CRM
// record ("Web Design Morocco | Digital Studio LF Custom Solutions" / "Web
// Design Morocco experts…") led with a generic keyword, and the site sat at
// position 12 for its own domain name with 0 clicks. Brand-first copy is the
// strongest brand signal a homepage has, so it is pinned here — and mirrored
// in the root layout defaults, which supply the OG/Twitter tags — where a CRM
// edit cannot silently undo it. Canonical and noindex still come from the CRM.
const HOME_TITLE = "Digital Studio LF | Web Design Agency in Marrakech, Morocco";
const HOME_DESCRIPTION =
  "Digital Studio LF is a web design agency in Marrakech, Morocco. Multilingual websites (FR/EN/AR), online stores and CRMs from $250. Free quote in 24h.";

// Refresh CRM-controlled copy/SEO every 5 min (revalidation webhook is instant).
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const meta: Metadata = {
    title: { absolute: HOME_TITLE },
    description: HOME_DESCRIPTION,
  };
  const seo = await getLandingSeo("home");
  if (seo?.canonical_url) meta.alternates = { canonical: seo.canonical_url };
  if (seo?.noindex) meta.robots = { index: false, follow: false };
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

  // WebPage node for "/", mirroring whatever title/description actually shipped.
  const graph = pageGraphJson(
    webPageNode({
      path: "",
      name: HOME_TITLE,
      description: HOME_DESCRIPTION,
    }),
  );

  return (
    <ContactModalProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
      {/* FAQPage schema intentionally lives on /faq only, so the two pages don't
          compete for the same FAQ rich result. The homepage keeps the visible
          FAQ section below for users, but emits no FAQPage JSON-LD. */}
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10">
        <HeroSection content={content.hero} />
        <OutcomesSection />
        <ServicesSection />
        <NotSureSection />
        <HowItWorks />
        <EverySizeSection />
        <TargetAudienceSection />
        <WhyChooseUs />
        <ReadyToBuildSection />
        {/* Not in the new copy deck, kept for the EN/FR/AR and multilingual
            queries the site already earns impressions for. */}
        <BilingualSection />
        <PricingPlansSection overrides={tierOverrides} />
        <CrmTemplatesSection />
        <FAQSection items={faqItems} />
        {/* For visitors not ready to buy. Kept mid-page, away from the footer's
            compact "Stay in the loop" form, so the two never sit together. */}
        <NewsletterCTA
          source="homepage"
          title="Not ready to start a project yet?"
          description="Get one short email a month with practical tips on websites, CRMs and getting more clients online. No spam."
        />
        <CTASection />
        <ContactForm />
      </main>
      <ClientOnlySections />
      <Footer />
    </ContactModalProvider>
  );
}
