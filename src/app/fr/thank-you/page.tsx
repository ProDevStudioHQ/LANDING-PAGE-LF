import type { Metadata } from "next";
import ThankYou from "@/components/ThankYou";

export const metadata: Metadata = {
  title: { absolute: "Merci | Digital Studio LF" },
  description: "Votre demande est bien arrivée chez Digital Studio LF. Réponse sous 24 heures.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/fr/thank-you",
    languages: { en: "/thank-you", fr: "/fr/thank-you", "x-default": "/thank-you" },
  },
};

export default function Page() {
  return <ThankYou locale="fr" />;
}
