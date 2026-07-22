"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, type Variants } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsStrip from "@/components/StatsStrip";

/* ─── Animation helpers ─────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function FadeSection({
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
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20 px-3 py-1 rounded-full mb-4">
      {children}
    </span>
  );
}

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

/* ─── Service tiles data ─────────────────────────────────────────────────── */
const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    name: "Websites",
    desc: "Full business sites designed to impress and perform.",
    featured: false,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    name: "Landing Pages",
    desc: "High-converting pages built for traffic and leads.",
    featured: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M6 8h4M6 11h3" />
        <rect x="14" y="7" width="4" height="5" rx="1" />
      </svg>
    ),
    name: "Dashboards",
    desc: "Admin panels and analytics interfaces your team will love.",
    featured: false,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    name: "CRM Systems",
    desc: "Custom CRMs built around how your business actually works.",
    featured: false,
  },
];

/* ─── Tech stack data ───────────────────────────────────────────────────── */
const stack = [
  {
    group: "Frontend",
    chips: ["Next.js", "React", "Vue", "Tailwind", "Framer Motion", "TypeScript"],
  },
  {
    group: "Backend",
    chips: ["Node.js", "NestJS", "Laravel", "Python", "PHP"],
  },
  {
    group: "Databases",
    chips: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Supabase"],
  },
  {
    group: "AI & Automation",
    chips: ["Claude", "OpenAI", "n8n", "Zapier", "Make"],
  },
  {
    group: "Tools",
    chips: ["Figma", "Git", "Vercel", "Cloudflare", "Docker"],
  },
];

/* ─── Tech color mapping ──────────────────────────────────────────────── */
const techColors: Record<string, { bg: string; border: string; text: string }> = {
  "Next.js": { bg: "bg-gray-900", border: "border-gray-700", text: "text-gray-200" },
  "React": { bg: "bg-blue-950", border: "border-blue-700", text: "text-blue-200" },
  "Vue": { bg: "bg-emerald-950", border: "border-emerald-700", text: "text-emerald-200" },
  "Tailwind": { bg: "bg-cyan-950", border: "border-cyan-700", text: "text-cyan-200" },
  "Framer Motion": { bg: "bg-purple-950", border: "border-purple-700", text: "text-purple-200" },
  "TypeScript": { bg: "bg-blue-900", border: "border-blue-700", text: "text-blue-100" },
  "Node.js": { bg: "bg-green-950", border: "border-green-700", text: "text-green-200" },
  "NestJS": { bg: "bg-red-950", border: "border-red-700", text: "text-red-200" },
  "Laravel": { bg: "bg-red-900", border: "border-red-700", text: "text-red-100" },
  "Python": { bg: "bg-yellow-950", border: "border-yellow-700", text: "text-yellow-200" },
  "PHP": { bg: "bg-indigo-950", border: "border-indigo-700", text: "text-indigo-200" },
  "PostgreSQL": { bg: "bg-slate-900", border: "border-slate-700", text: "text-slate-200" },
  "MySQL": { bg: "bg-orange-950", border: "border-orange-700", text: "text-orange-200" },
  "MongoDB": { bg: "bg-green-900", border: "border-green-700", text: "text-green-100" },
  "Prisma": { bg: "bg-lime-950", border: "border-lime-700", text: "text-lime-200" },
  "Supabase": { bg: "bg-emerald-900", border: "border-emerald-700", text: "text-emerald-100" },
  "Claude": { bg: "bg-orange-900", border: "border-orange-700", text: "text-orange-100" },
  "OpenAI": { bg: "bg-teal-950", border: "border-teal-700", text: "text-teal-200" },
  "n8n": { bg: "bg-amber-950", border: "border-amber-700", text: "text-amber-200" },
  "Zapier": { bg: "bg-orange-900", border: "border-orange-600", text: "text-orange-100" },
  "Make": { bg: "bg-purple-900", border: "border-purple-700", text: "text-purple-100" },
  "Figma": { bg: "bg-pink-950", border: "border-pink-700", text: "text-pink-200" },
  "Git": { bg: "bg-orange-950", border: "border-orange-700", text: "text-orange-200" },
  "Vercel": { bg: "bg-gray-950", border: "border-gray-700", text: "text-gray-100" },
  "Cloudflare": { bg: "bg-orange-900", border: "border-orange-700", text: "text-orange-100" },
  "Docker": { bg: "bg-blue-950", border: "border-blue-700", text: "text-blue-200" },
};

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

/* ─── Page component ─────────────────────────────────────────────────────── */
export default function AboutPage() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <>
      <Navbar />

      <main className="bg-black text-white overflow-x-hidden">

        {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
        <section className="pt-28 pb-20 lg:pt-36 lg:pb-28 relative overflow-hidden">
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
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-[#EF4444]" aria-hidden="true">★★★★★</span>
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

        {/* ── 1b. CREDIBILITY STATS ────────────────────────────────────────── */}
        <StatsStrip />

        {/* ── 1c. OUR METHOD ───────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28 border-t border-white/5">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <FadeSection className="mb-12">
              <Eyebrow>Our Method</Eyebrow>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                How we work
              </h2>
              <p className="text-[#9CA3AF] text-lg max-w-[58ch]">
                A rigorous 4-phase approach, tested on 30+ projects to guarantee
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

        {/* ── 2. STORY ─────────────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28 border-t border-white/5">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

              {/* Left — editorial prose (60%) */}
              <FadeSection className="lg:max-w-[60%]">
                <Eyebrow>Our Story</Eyebrow>
                <h2 className="text-3xl lg:text-4xl font-black text-white mb-8 leading-tight">
                  A studio built on craft and results
                </h2>

                <div className="space-y-6 text-[#9CA3AF] text-[17px] leading-[1.75] max-w-[65ch]">
                  <p>
                    Digital Studio LF is a web development studio based in Marrakesh, Morocco.
                    We design and build custom websites, landing pages, admin dashboards, CRM
                    systems, and automation workflows for businesses that are serious about their
                    digital presence — work that&apos;s engineered to <em className="text-white/70 not-italic font-medium">perform</em>, not just to look good.
                  </p>
                  <p>
                    Our clients range from local Moroccan businesses making their first move online
                    to startups and agencies across Europe and North America. Whether it&apos;s a
                    high-converting landing page, a direct-booking website for a riad, or a custom
                    CRM, every project is built with modern, scalable technology and a relentless
                    focus on speed, SEO, and conversion.
                  </p>
                  <p>
                    We work direct — no project managers, no account executives, no one between you
                    and the people building your product. You get transparent fixed pricing, a clear
                    timeline, and delivery in 7–21 days depending on scope. That&apos;s the studio we
                    set out to build: senior-level work, delivered fast, without the agency overhead.
                  </p>
                </div>
              </FadeSection>

              {/* Right — at a glance card (40%) */}
              <FadeSection className="lg:max-w-[36%] w-full" delay={0.15}>
                <div className="lg:sticky lg:top-28">
                  <div className="bg-[#141417] border border-white/8 rounded-[14px] p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B7280] mb-5">
                      At a glance
                    </p>
                    <dl className="space-y-4">
                      {[
                        { label: "Location", value: "Marrakesh, Morocco" },
                        { label: "Founded", value: "2025" },
                        { label: "Languages", value: "English · French · Arabic" },
                        { label: "Availability", value: "2–3 projects / month" },
                        { label: "Response time", value: "Under 2 hours" },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex flex-col gap-0.5">
                          <dt className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium">
                            {label}
                          </dt>
                          <dd className="text-[15px] text-white font-medium">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </FadeSection>

            </div>
          </div>
        </section>

        {/* ── 2a. DIRECT FOUNDER COMMUNICATION ─────────────────────────────── */}
        <section className="py-20 lg:py-28 border-t border-white/5 relative overflow-hidden">
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

        {/* ── 2b. LANGUAGES ────────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28 border-t border-white/5">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <FadeSection className="mb-12">
              <Eyebrow>Bilingual Team</Eyebrow>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                We speak your language
              </h2>
              <p className="text-[#9CA3AF] text-lg max-w-[52ch]">
                English, French, or Arabic — including Moroccan Darija. From the
                first call to launch, you work with a team that understands your
                market and communicates without friction.
              </p>
            </FadeSection>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {[
                {
                  flag: "🇬🇧",
                  native: "English",
                  name: "English",
                  greeting: "Let's build something great.",
                  dir: "ltr" as const,
                },
                {
                  flag: "🇫🇷",
                  native: "Français",
                  name: "French",
                  greeting: "Construisons quelque chose de grand.",
                  dir: "ltr" as const,
                },
                {
                  flag: "🇲🇦",
                  native: "العربية",
                  name: "Arabic / Darija",
                  greeting: "نبنيو معاك شي حاجة زوينة.",
                  dir: "rtl" as const,
                },
              ].map((lang) => (
                <motion.div
                  key={lang.name}
                  variants={fadeUp}
                  dir={lang.dir}
                  className="group bg-[#141417] border border-white/8 rounded-[14px] p-6 hover:bg-[#1C1C20] hover:border-white/15 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl" aria-hidden="true">{lang.flag}</span>
                    <div>
                      <span className="block text-[16px] font-bold text-white leading-tight">{lang.native}</span>
                      <span className="block text-[11px] uppercase tracking-[0.08em] text-[#6B7280]">{lang.name}</span>
                    </div>
                  </div>
                  <p className="text-[17px] font-semibold text-white/90 leading-snug">{lang.greeting}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 3. WHAT I DO ─────────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28 border-t border-white/5">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <FadeSection className="mb-12">
              <Eyebrow>What We Do</Eyebrow>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                Services we deliver
              </h2>
              <p className="text-[#9CA3AF] text-lg max-w-[50ch]">
                Modern websites and custom systems built to grow your business —
                not just look good.
              </p>
            </FadeSection>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {services.map((s) => (
                <motion.div
                  key={s.name}
                  variants={fadeUp}
                  className={`group relative bg-[#141417] border rounded-[14px] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1C1C20] ${
                    s.featured
                      ? "border-white/15 hover:border-white/25 hover:shadow-lg hover:shadow-[#EF4444]/8"
                      : "border-white/8 hover:border-white/15"
                  }`}
                >
                  <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/15 text-[#EF4444]">
                    {s.icon}
                  </div>
                  <h3 className="text-[17px] font-bold text-white mb-1.5">{s.name}</h3>
                  <p className="text-[#9CA3AF] text-[13px] leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 4. HOW I WORK ────────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28 border-t border-white/5">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <FadeSection className="mb-14">
              <Eyebrow>How We Work</Eyebrow>
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

        {/* ── 5. TECH STACK ────────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28 border-t border-white/5">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <FadeSection className="mb-12">
              <Eyebrow>Our Stack</Eyebrow>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                Tools and technologies we work with
              </h2>
              <p className="text-[#9CA3AF] text-lg">Modern, fast, and built to last.</p>
            </FadeSection>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="space-y-6"
            >
              {stack.map((group) => (
                <motion.div key={group.group} variants={fadeUp} className="flex flex-wrap items-center gap-3">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6B7280] w-28 flex-shrink-0">
                    {group.group}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.chips.map((chip) => {
                      const colors = techColors[chip] || {
                        bg: "bg-[#141417]",
                        border: "border-white/8",
                        text: "text-white/75",
                      };
                      return (
                        <span
                          key={chip}
                          className={`text-[13px] font-medium px-3 py-1.5 rounded-full border transition-colors ${colors.bg} ${colors.border} ${colors.text} hover:opacity-80`}
                        >
                          {chip}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 6. WHY ME ────────────────────────────────────────────────────── */}
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

        {/* ── 7. CONTACT CTA BAND ──────────────────────────────────────────── */}
        <section id="contact-cta" className="py-20 lg:py-28 border-t border-white/5 relative overflow-hidden">
          {/* Subtle accent background */}
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

      </main>

      <Footer />
    </>
  );
}
