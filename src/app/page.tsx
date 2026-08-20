import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ContactModalProvider from "@/components/ContactModalProvider";
import BackgroundEffects from "@/components/BackgroundEffects";

// SEO-critical sections: SSR on (content in initial HTML for crawlers).
const ServicesSection = dynamic(() => import("@/components/ServicesSection"));
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const BilingualSection = dynamic(() => import("@/components/BilingualSection"));
const TargetAudienceSection = dynamic(() => import("@/components/TargetAudienceSection"));
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"));
const IntegrationsSection = dynamic(() => import("@/components/IntegrationsSection"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const DirectFounderSection = dynamic(() => import("@/components/DirectFounderSection"));
const PricingSection = dynamic(() => import("@/components/PricingSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const Footer = dynamic(() => import("@/components/Footer"));

// Conversion sections. These are SSR like everything above: ContactForm owns the
// id="contact" that PricingSection, IntegrationsSection and CTASection all link
// to, so it has to exist in the server HTML or those CTAs are dead clicks before
// hydration. See the note in ClientOnlySections.tsx.
const EmailCaptureSection = dynamic(() => import("@/components/EmailCaptureSection"));
const ContactForm = dynamic(() => import("@/components/ContactForm"));
const CTASection = dynamic(() => import("@/components/CTASection"));

// Floating WhatsApp button only — genuinely client-only, deferred via client wrapper.
import ClientOnlySections from "@/components/ClientOnlySections";

import type { TierOverride } from "@/components/PricingSection";
import { faqs as homepageFaqs } from "@/data/home-faqs";
import type { Metadata } from "next";
import { getLandingContent, getLandingFaq, getLandingSeo } from "@/lib/crm-content";
import { pageGraphJson, webPageNode } from "@/lib/schema";

// Static fallbacks, kept identical to the layout defaults so the WebPage node
// never disagrees with the rendered <title>/<meta description> when the CRM has
// no record for "home".
const DEFAULT_HOME_TITLE = "Digital Studio LF | Custom Websites, Landing Pages & CRM Systems";
const DEFAULT_HOME_DESCRIPTION =
  "Premium web design & CRM development agency in Marrakesh, Morocco. Custom landing pages, business websites & dashboards built in 7–21 days. Free consultation.";

// Refresh CRM-controlled copy/SEO every 5 min (revalidation webhook is instant).
export const revalidate = 300;

// Home SEO from the CRM Landing Page Brain, overriding layout defaults when set.
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLandingSeo("home");
  if (!seo) return {};
  const meta: Metadata = {};
  if (seo.seo_title) meta.title = { absolute: seo.seo_title };
  if (seo.seo_description) meta.description = seo.seo_description;
  // Mirror the CRM title/description into OG + Twitter so social shares and
  // SERP features show the same optimized wording as the <title> tag. Next.js
  // replaces (not deep-merges) these objects, so restate the layout's image/url
  // fields to keep the OG image on shares.
  // Social previews truncate around 125 chars — trim the CRM description at a
  // word boundary so the OG description never gets cut mid-sentence.
  const ogDesc = seo.seo_description
    ? seo.seo_description.length <= 125
      ? seo.seo_description
      : seo.seo_description.slice(0, 122).replace(/\s+\S*$/, "") + "…"
    : undefined;
  if (seo.seo_title || ogDesc) {
    const OG_IMAGE = "https://digitalstudiolf.online/images/og-home.jpg";
    meta.openGraph = {
      type: "website",
      locale: "en_US",
      url: "https://digitalstudiolf.online",
      siteName: "Digital Studio LF",
      ...(seo.seo_title && { title: seo.seo_title }),
      ...(ogDesc && { description: ogDesc }),
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Digital Studio LF — Web Design Agency in Morocco",
        },
      ],
    };
    meta.twitter = {
      card: "summary_large_image",
      ...(seo.seo_title && { title: seo.seo_title }),
      ...(ogDesc && { description: ogDesc }),
      images: [OG_IMAGE],
    };
  }
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
  const [tierOverrides, content, crmFaq, seo] = await Promise.all([
    getTierOverrides(),
    getLandingContent(),
    getLandingFaq(),
    // Same call generateMetadata makes; Next dedupes it within the render pass.
    getLandingSeo("home"),
  ]);
  const faqItems = crmFaq.length ? crmFaq.map((f) => ({ question: f.question, answer: f.answer })) : homepageFaqs;

  // WebPage node for "/", mirroring whatever title/description actually shipped.
  const graph = pageGraphJson(
    webPageNode({
      path: "",
      name: seo?.seo_title || DEFAULT_HOME_TITLE,
      description: seo?.seo_description || DEFAULT_HOME_DESCRIPTION,
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
        <ServicesSection />
        <WhyChooseUs />
        <BilingualSection />
        <TargetAudienceSection />
        <FeaturesSection />
        <IntegrationsSection />
        <HowItWorks />
        <DirectFounderSection />
        <PricingSection overrides={tierOverrides} />
        <FAQSection items={faqItems} />
        <EmailCaptureSection />
        <ContactForm />
        <CTASection />
      </main>
      <ClientOnlySections />
      <Footer />
    </ContactModalProvider>
  );
}
