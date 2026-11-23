import type { Metadata } from "next";
import UnsubscribePage from "@/components/UnsubscribePage";

export const metadata: Metadata = {
  title: { absolute: "Se désabonner | Digital Studio LF" },
  description: "Ne plus recevoir d'e-mails de Digital Studio LF.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/fr/unsubscribe",
    languages: { en: "/unsubscribe", fr: "/fr/unsubscribe", "x-default": "/unsubscribe" },
  },
};

export default function Page() {
  return <UnsubscribePage locale="fr" />;
}
