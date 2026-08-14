"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

/* ─── Animation helpers ─────────────────────────────────────────────────── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export function FadeSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Eyebrow chip ───────────────────────────────────────────────────────── */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20 px-3 py-1 rounded-full mb-4">
      {children}
    </span>
  );
}

/* ─── Sub-page header ────────────────────────────────────────────────────
   Every /about/* page opens with the same band: a breadcrumb back to the hub,
   then the page's own eyebrow, title and standfirst. The sections themselves
   were written as mid-page bands with their own headings, so each sub-page
   needs one element that makes it read as a page rather than a fragment. */
export function AboutSubHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="pt-28 pb-4 lg:pt-36 lg:pb-8 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#EF4444]/8 rounded-full blur-[140px]" />
      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-12">
        <FadeSection>
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link
              href="/about"
              className="text-[13px] text-[#6B7280] hover:text-white transition-colors"
            >
              ← About Digital Studio LF
            </Link>
          </nav>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
            {title}
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-[62ch] leading-relaxed">{intro}</p>
        </FadeSection>
      </div>
    </section>
  );
}

/* ─── Shared closing CTA ─────────────────────────────────────────────────
   Lifted verbatim from the About page's contact band so every sub-page ends
   on the same call to action rather than dead-ending. */
export function AboutCta() {
  return (
    <section id="contact-cta" className="py-20 lg:py-28 border-t border-white/5 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#EF4444]/6 via-transparent to-transparent" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#EF4444]/12 rounded-full blur-[100px]" />

      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-12 text-center">
        <FadeSection>
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 leading-tight">
            Have a project in mind?
          </h2>
          <p className="text-[#9CA3AF] text-lg mb-10 max-w-[40ch] mx-auto">
            Let&apos;s talk. Free 30-minute consultation, no obligation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#EF4444]/30 hover:scale-[1.02] transition-all duration-300"
            >
              Book a call →
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white font-semibold rounded-full hover:bg-white/5 hover:border-white/25 transition-all duration-300"
            >
              See our work →
            </Link>
          </div>

          <p className="text-[#6B7280] text-sm">
            Usually replies within 2 hours · Based in Marrakesh, working worldwide
          </p>
        </FadeSection>
      </div>
    </section>
  );
}
