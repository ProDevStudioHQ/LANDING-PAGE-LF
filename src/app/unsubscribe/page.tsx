import type { Metadata } from "next";
import UnsubscribePage from "@/components/UnsubscribePage";

// Cold emails link here as /unsubscribe?t=TOKEN (and, before tokens existed,
// /unsubscribe or /unsubscribe?email=…). Not in the sitemap; noindex, nofollow.
export const metadata: Metadata = {
  title: { absolute: "Unsubscribe | Digital Studio LF" },
  description: "Stop receiving emails from Digital Studio LF.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/unsubscribe",
    languages: { en: "/unsubscribe", fr: "/fr/unsubscribe", "x-default": "/unsubscribe" },
  },
};

export default function Page() {
  return <UnsubscribePage locale="en" />;
}
