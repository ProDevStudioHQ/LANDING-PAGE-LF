"use client";

import dynamic from "next/dynamic";

// These components have no SEO value (forms, CTA, floating button).
// ssr: false means their JS chunks are excluded from the initial load,
// reducing unused JS during LCP measurement.
const EmailCaptureSection = dynamic(() => import("@/components/EmailCaptureSection"), { ssr: false });
const ContactForm = dynamic(() => import("@/components/ContactForm"), { ssr: false });
const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });

export default function ClientOnlySections() {
  return (
    <>
      <EmailCaptureSection />
      <ContactForm />
      <CTASection />
      <WhatsAppButton />
    </>
  );
}
