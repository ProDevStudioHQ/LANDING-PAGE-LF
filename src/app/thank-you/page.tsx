import type { Metadata } from "next";
import ThankYou from "@/components/ThankYou";

export const metadata: Metadata = {
  title: { absolute: "Thank You | Digital Studio LF" },
  description: "Your request reached Digital Studio LF. We reply within 24 hours.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/thank-you",
    languages: { en: "/thank-you", fr: "/fr/thank-you", "x-default": "/thank-you" },
  },
};

export default function Page() {
  return <ThankYou locale="en" />;
}
