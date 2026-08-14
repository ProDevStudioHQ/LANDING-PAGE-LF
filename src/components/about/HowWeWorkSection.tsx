"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeSection, Eyebrow, fadeUp, staggerContainer } from "./shared";

/* ─── Method / process data ──────────────────────────────────────────────── */
const methodPhases = [
  {
    step: "01",
    title: "Discovery & Diagnosis",
    body: "Before writing a single line of code, we understand your business. Audit of the existing system, analysis of needs, definition of KPIs and mapping of processes to be optimized.",
    deliverables: ["Digital Audit Report", "Functional brief", "Costed proposal"],
  },
  {
    step: "02",
    title: "Architecture & Design",
    body: "Each solution is architected for long-term performance. Desired UX, validated prototypes, technical stack chosen for scalability and maintainability.",
    deliverables: ["UX/UI Mockups", "Technical Architecture", "Development roadmap"],
  },
  {
    step: "03",
    title: "Development & Testing",
    body: "Agile development with weekly check-ins, continuous testing and intermediate deliverables. You see the project take shape with each sprint.",
    deliverables: ["Bi-weekly sprints", "Automated tests", "Regular demos"],
  },
  {
    step: "04",
    title: "Deployment & Support",
    body: "Seamless deployment, training for your teams, and post-launch support. We don't disappear after delivery.",
    deliverables: ["Zero-downtime deployment", "Team training", "Continuous support"],
  },
];

/* ─── Method accordion (client, expandable phases) ───────────────────────── */
function MethodAccordion() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="flex flex-col gap-3">
      {methodPhases.map((phase, i) => {
        const isOpen = open === i;
        const panelId = `method-panel-${i}`;
        const btnId = `method-btn-${i}`;
        return (
          <motion.div
            key={phase.step}
            variants={fadeUp}
            className={`rounded-[14px] border transition-colors duration-200 ${
              isOpen
                ? "bg-[#1C1C20] border-[#EF4444]/30"
                : "bg-[#141417] border-white/8 hover:border-white/15"
            }`}
          >
            <button
              type="button"
              id={btnId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center gap-4 text-left px-5 sm:px-6 py-5"
            >
              <span
                className={`text-[15px] font-black tabular-nums transition-colors ${
                  isOpen ? "text-[#EF4444]" : "text-white/30"
                }`}
              >
                {phase.step}
              </span>
              <span className="flex-1 text-[17px] sm:text-lg font-bold text-white leading-tight">
                {phase.title}
              </span>
              <svg
                className={`w-5 h-5 flex-shrink-0 text-white/50 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-[#EF4444]" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-6 pl-[52px] sm:pl-[60px]">
                    <p className="text-[#9CA3AF] text-[15px] leading-relaxed max-w-[60ch] mb-5">
                      {phase.body}
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B7280] mb-3">
                      Deliverables
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {phase.deliverables.map((d) => (
                        <li
                          key={d}
                          className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/8 rounded-full px-3.5 py-1.5 text-[13px] text-white/80"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" aria-hidden="true" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function HowWeWorkSection() {
  return (
    <>
      {/* The four-phase method, in detail */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
          <FadeSection className="mb-12">
            <Eyebrow>Our Method</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
              The four phases
            </h2>
            <p className="text-[#9CA3AF] text-lg max-w-[58ch]">
              A rigorous 4-phase approach, tested on 120+ projects to guarantee
              the success of each collaboration.
            </p>
          </FadeSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="max-w-[860px]"
          >
            <MethodAccordion />
          </motion.div>
        </div>
      </section>

      {/* The same process as a timeline — what it looks like from your side */}
      <section className="py-20 lg:py-28 border-t border-white/5">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
          <FadeSection className="mb-14">
            <Eyebrow>Working Together</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
              Simple, fast, no surprises
            </h2>
          </FadeSection>

          {/* Desktop: horizontal / Mobile: vertical */}
          <div className="relative">
            {/* Connector line — the ONE accent element of this section */}
            <div className="hidden lg:block absolute top-[22px] left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-px bg-gradient-to-r from-transparent via-[#EF4444]/40 to-transparent" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6"
            >
              {[
                {
                  num: "01",
                  title: "Discovery call (free)",
                  desc: "We talk for 30 minutes to understand your business, goals, and what you actually need — no sales pitch.",
                },
                {
                  num: "02",
                  title: "Proposal & quote",
                  desc: "You get a clear written proposal, fixed price, fixed timeline. No agencies, no hidden fees, no surprises.",
                },
                {
                  num: "03",
                  title: "Build phase",
                  desc: "We build in 7–21 days depending on scope. Direct WhatsApp/email access — no project managers, no delays.",
                },
                {
                  num: "04",
                  title: "Launch & support",
                  desc: "We deliver, launch, and support you for 30 days. Optional ongoing maintenance plans available.",
                },
              ].map((step) => (
                <motion.div key={step.num} variants={fadeUp} className="flex flex-col">
                  <div className="relative flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3 mb-4">
                    <span className="text-[28px] font-semibold text-white w-10 flex-shrink-0 lg:w-auto">
                      {step.num}
                    </span>
                    {/* Mobile connector */}
                    <div className="lg:hidden flex-1 h-px bg-white/8" />
                  </div>
                  <h3 className="text-[17px] font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-[#9CA3AF] text-[14px] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
