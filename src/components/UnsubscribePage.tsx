import BrandMark from "@/components/BrandMark";
import UnsubscribeFlow from "@/components/UnsubscribeFlow";

// Minimal layout on purpose: logo, short text, one button. No Navbar, Footer,
// chat widget or consent popup (those two skip this path — see src/lib/ga.ts).
export default function UnsubscribePage({ locale }: { locale: "en" | "fr" }) {
  return (
    <main className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-16">
      <div
        className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 w-[min(600px,100vw)] h-[260px] bg-primary/10 rounded-full blur-[130px]"
        aria-hidden="true"
      />
      <div className="relative mb-10">
        <BrandMark href={locale === "fr" ? "/fr/creation-site-web-maroc" : "/"} />
      </div>
      <div className="relative w-full flex justify-center">
        <UnsubscribeFlow locale={locale} />
      </div>
    </main>
  );
}
