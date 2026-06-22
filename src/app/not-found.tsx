import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found (404) | Digital Studio LF" },
  description:
    "The page you're looking for couldn't be found. Explore our services, portfolio, or get in touch with Digital Studio LF.",
  robots: { index: false, follow: true },
};

const helpfulLinks = [
  { label: "Home", href: "/", desc: "Back to the homepage" },
  { label: "Services", href: "/services", desc: "Websites, dashboards, CRMs & more" },
  { label: "Our Projects", href: "/portfolio", desc: "See work we've delivered" },
  { label: "Contact", href: "/contact", desc: "Start a project or ask a question" },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-black text-white flex items-center">
        {/* Ambient brand glow */}
        <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#EF4444]/8 rounded-full blur-[140px]" />

        <section className="relative w-full max-w-3xl mx-auto px-6 py-32 text-center">
          <p className="text-[88px] sm:text-[120px] font-black leading-none tracking-tight bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">
            404
          </p>
          <h1 className="text-2xl sm:text-3xl font-black mb-4">
            This page is missing — but the rest of the site is fine.
          </h1>
          <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            The link may be broken or the page may have moved. It&apos;s just this one page —
            everything else is up and running. Try one of these instead:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
            {helpfulLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group glass rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-colors"
              >
                <span className="block font-bold mb-1 group-hover:text-primary transition-colors">
                  {link.label} →
                </span>
                <span className="block text-white/50 text-sm">{link.desc}</span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg hover:scale-[1.03] transition-all duration-300"
            >
              Back to homepage →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all duration-300"
            >
              Report a broken link →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
