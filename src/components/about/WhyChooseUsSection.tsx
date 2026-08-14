"use client";

import { motion } from "framer-motion";
import { FadeSection, Eyebrow, fadeUp, staggerContainer } from "./shared";

/* ─── Why me cards ──────────────────────────────────────────────────────── */
const whyCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Direct communication",
    desc: "No agency middlemen. You talk directly to the team actually building your project — every call, every message, every decision.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Fast delivery",
    desc: "7–21 days, not 7–21 months. Real timelines, agreed upfront, delivered on time. No scope-creep surprises.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Modern stack",
    desc: "Built with the same tools used by top startups. Fast, scalable, and future-proof — not WordPress themes from 2015.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Honest pricing",
    desc: "Fixed prices agreed before we start. No hidden fees, no surprise invoices after delivery. What you see is what you pay.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <>
      {/* Founder-direct statement + proof points */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#EF4444]/8 rounded-full blur-[120px]" />
        <div className="relative max-w-[1240px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left — statement */}
            <FadeSection className="lg:max-w-[52%]">
              <Eyebrow>No Middlemen</Eyebrow>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-6 leading-tight">
                You talk to the founder — <br className="hidden sm:block" />
                not an account manager
              </h2>
              <div className="space-y-5 text-[#9CA3AF] text-[17px] leading-[1.75] max-w-[60ch]">
                <p>
                  Most agencies put layers between you and the people who actually
                  build your project — account executives, project managers, junior
                  coordinators relaying your brief second-hand. Things get lost.
                  Decisions take days. Nobody truly owns the outcome.
                </p>
                <p>
                  We work differently. From your first message to launch and beyond,
                  you deal directly with the founder building your product. Every call,
                  every decision, every line of feedback goes straight to the person
                  writing the code — no telephone game, no waiting on approvals.
                </p>
                <p className="text-white/70">
                  That&apos;s how we keep replies under two hours, ship in 7–21 days,
                  and make sure what you asked for is exactly what gets built.
                </p>
              </div>
            </FadeSection>

            {/* Right — proof points */}
            <FadeSection className="lg:max-w-[44%] w-full" delay={0.15}>
              <div className="grid gap-4">
                {[
                  {
                    title: "One point of contact",
                    desc: "The person who scopes your project is the one who builds it. No hand-offs, no dropped context.",
                  },
                  {
                    title: "Replies under 2 hours",
                    desc: "Direct WhatsApp and email access during working hours — in English, French, or Arabic.",
                  },
                  {
                    title: "Decisions, not tickets",
                    desc: "Need a change? Say it and it happens — no routing through a queue of project managers.",
                  },
                  {
                    title: "Full ownership",
                    desc: "One founder accountable for the result end to end, from first call to post-launch support.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-[#141417] border border-white/8 rounded-[14px] p-5 hover:bg-[#1C1C20] hover:border-white/15 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[#EF4444] mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
                      <div>
                        <h3 className="text-[16px] font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-[#9CA3AF] text-[14px] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* The four reasons, as cards */}
      <section className="py-20 lg:py-28 border-t border-white/5">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
          <FadeSection className="mb-12">
            <Eyebrow>Why Work With Us</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
              Direct, fast, and honest
            </h2>
          </FadeSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {whyCards.map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                className="group bg-[#141417] border border-white/8 rounded-[14px] p-7 hover:bg-[#1C1C20] hover:border-white/15 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/15 text-[#EF4444]">{card.icon}</div>
                <h3 className="text-[18px] font-bold text-white mb-2">{card.title}</h3>
                <p className="text-[#9CA3AF] text-[15px] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
