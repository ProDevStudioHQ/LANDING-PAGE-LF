import type { Metadata } from "next";
import StartLanding from "@/components/start/StartLanding";
import { loadStartData } from "@/lib/start-page";

export const metadata: Metadata = {
  title: { absolute: "Sites web et CRM pour entreprises marocaines | Digital Studio LF" },
  description:
    "Sites web, systèmes de réservation et CRM qui apportent plus de clients aux entreprises marocaines. Livrés en 7 à 21 jours, à prix fixe. Devis gratuit.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/fr/start",
    languages: { en: "/start", fr: "/fr/start", "x-default": "/start" },
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { items, tiers } = await loadStartData(searchParams);
  return <StartLanding locale="fr" items={items} tiers={tiers} />;
}
