"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Eyebrow, fadeUp, staggerContainer } from "./shared";

export default function AboutHero() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section id="about-intro" className="scroll-mt-24 pt-28 pb-20 lg:pt-36 lg:pb-28 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#EF4444]/8 rounded-full blur-[140px]" />

      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — text (60%) */}
          <motion.div
            className="flex-1 lg:max-w-[58%]"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow>About</Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl lg:text-5xl xl:text-[52px] font-black leading-[1.1] tracking-tight text-white mb-5"
            >
              Digital Studio LF —<br />
              <span className="text-white/90">a web development studio</span>
              <br />
              <span className="text-white/70">that grows businesses.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[#9CA3AF] text-lg leading-relaxed mb-8 max-w-[55ch]"
            >
              Based in Marrakesh, Morocco, we help local businesses, startups, and
              global clients launch high-converting websites, landing pages, admin
              dashboards, and custom CRM systems — built to deliver real results,
              not just look good on a screen.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white font-semibold rounded-full hover:shadow-xl hover:shadow-[#EF4444]/25 hover:scale-[1.02] transition-all duration-300 text-sm"
              >
                View our work
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white font-semibold rounded-full hover:bg-white/5 hover:border-white/25 transition-all duration-300 text-sm"
              >
                Get in touch →
              </Link>
            </motion.div>

            {/* Trust signals — consistent with the figures shown across the site */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-[#9CA3AF]"
            >
              {/* The ★★★★★ glyphs that used to lead this line were removed:
                  there is no review, rating or AggregateRating behind them
                  anywhere on the site or on a Google Business Profile.
                  Displaying a rating you can't substantiate is a trust
                  liability, and it can't earn star treatment in search
                  regardless. Put them back once real reviews exist. */}
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden="true" />
                Trusted by 50+ businesses
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden="true" />
                120+ projects delivered
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden="true" />
                Replies in under 2 hours
              </span>
            </motion.div>
          </motion.div>

          {/* Right — photo placeholder (40%) */}
          <motion.div
            ref={photoRef}
            className="w-full lg:max-w-[38%] lg:flex-shrink-0"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <motion.div
              style={{ y: photoY }}
              className="relative rounded-2xl overflow-hidden border border-white/8 shadow-2xl aspect-[4/5] max-h-[520px] hover:scale-[1.02] transition-transform duration-[600ms]"
            >
              {/* Branded studio mark */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#141417] via-[#1C1C20] to-[#0f0f12] flex flex-col items-center justify-center select-none">
                <div className="w-24 h-24 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/20 flex items-center justify-center mb-5">
                  <svg width="34" height="52" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M5 0H13L13 1L5 28H0L0 27L5 0Z" fill="#EF4444" />
                  </svg>
                </div>
                <p className="text-white/40 text-sm font-bold tracking-tight">Digital <span className="text-[#EF4444]">Studio LF</span></p>
                <p className="text-white/20 text-[11px] uppercase tracking-widest font-medium mt-1">Marrakesh, Morocco</p>
                {/* Subtle accent marks */}
                <div className="absolute top-6 left-6 w-5 h-5 rounded-full border-2 border-[#EF4444]/30" />
                <div className="absolute bottom-8 right-8 w-3 h-3 rounded-full bg-[#EF4444]/15" />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
