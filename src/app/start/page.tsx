import type { Metadata } from "next";
import StartLanding from "@/components/start/StartLanding";
import { loadStartData } from "@/lib/start-page";

// Landing page for cold-email traffic. noindex and not in the sitemap: it is
// for email visitors, and in search it would compete with the service pages.
// Rendered per request because utm_term decides which case study comes first.
export const metadata: Metadata = {
  title: { absolute: "Websites & CRMs for Moroccan Businesses | Digital Studio LF" },
  description:
    "Websites, booking systems and CRMs that bring Moroccan businesses more clients. Delivered in 7–21 days at a fixed price. See our work and get a free quote.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/start",
    languages: { en: "/start", fr: "/fr/start", "x-default": "/start" },
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { items, tiers } = await loadStartData(searchParams);
  return <StartLanding locale="en" items={items} tiers={tiers} />;
}
