"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

/* ─── Service tiles data ─────────────────────────────────────────────────── */
const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    name: "Login Pages",
    desc: "Secure, branded authentication flows that convert.",
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
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    name: "Custom Automation",
    desc: "Workflows and integrations that save you hours every week.",
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

/* ─── Why me cards ──────────────────────────────────────────────────────── */
const whyCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Direct communication",
    desc: "No agency middlemen. You talk to the person actually building your project — every call, every message, every decision.",
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
                  Hi, I&apos;m Anouar —<br />
                  <span className="text-white/90">I build websites &amp; systems</span>
                  <br />
                  <span className="text-white/70">that grow businesses.</span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-[#9CA3AF] text-lg leading-relaxed mb-8 max-w-[55ch]"
                >
                  Self-taught full-stack developer based in Marrakesh, helping local
                  businesses, startups, and global clients launch landing pages,
                  dashboards, and CRM systems that actually deliver results — not
                  just look good on a screen.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                  <Link
                    href="https://crm.digitalstudiolf.online/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white font-semibold rounded-full hover:shadow-xl hover:shadow-[#EF4444]/25 hover:scale-[1.02] transition-all duration-300 text-sm"
                  >
                    View my work
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <a
                    href="#contact-cta"
                    className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white font-semibold rounded-full hover:bg-white/5 hover:border-white/25 transition-all duration-300 text-sm"
                  >
                    Get in touch →
                  </a>
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
                  {/* Branded placeholder — replace src with real photo when available */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#141417] via-[#1C1C20] to-[#0f0f12] flex flex-col items-center justify-center select-none">
                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                      <span className="text-3xl font-black text-white/20 tracking-tight">AL</span>
                    </div>
                    <p className="text-white/15 text-xs uppercase tracking-widest font-medium">Photo coming soon</p>
                    {/* Subtle accent mark */}
                    <div className="absolute top-6 left-6 w-5 h-5 rounded-full border-2 border-[#EF4444]/30" />
                    <div className="absolute bottom-8 right-8 w-3 h-3 rounded-full bg-[#EF4444]/15" />
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── 2. STORY ─────────────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28 border-t border-white/5">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

              {/* Left — editorial prose (60%) */}
              <FadeSection className="lg:max-w-[60%]">
                <Eyebrow>My Story</Eyebrow>
                <h2 className="text-3xl lg:text-4xl font-black text-white mb-8 leading-tight">
                  From self-taught to studio
                </h2>

                <div className="space-y-6 text-[#9CA3AF] text-[17px] leading-[1.75] max-w-[65ch]">
                  <p>
                    I didn&apos;t study computer science. I learned to code the hard way — tutorials,
                    failed projects, late nights, and eventually the moment when something finally
                    worked and I thought: <em className="text-white/70 not-italic font-medium">this is real.</em> That
                    feeling of turning an idea into something people can actually use never got old.
                  </p>
                  <p>
                    Today I run Digital Studio LF — a solo development studio based in Marrakesh.
                    I build websites, admin dashboards, CRM systems, and automation workflows for
                    businesses that are serious about their digital presence. My clients range from
                    local Moroccan businesses making their first move online to startups and
                    agencies across Europe and North America.
                  </p>
                  <p>
                    I work direct — no project managers, no account executives, no one between you
                    and the person writing your code. You get transparent pricing, a clear timeline,
                    and delivery in 7–21 days depending on scope. I built this studio to be the
                    thing I always wished existed when I was on the other side of the table.
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

        {/* ── 3. WHAT I DO ─────────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28 border-t border-white/5">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <FadeSection className="mb-12">
              <Eyebrow>What I Do</Eyebrow>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                Services I deliver
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
              {services.map((s, i) => (
                <motion.div
                  key={s.name}
                  variants={fadeUp}
                  className={`group relative bg-[#141417] border rounded-[14px] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1C1C20] ${
                    s.featured
                      ? "border-white/15 hover:border-white/25 hover:shadow-lg hover:shadow-[#EF4444]/8"
                      : "border-white/8 hover:border-white/15"
                  }`}
                >
                  <div className={`mb-4 ${i === 1 ? "text-white/90" : "text-white/70"}`}>
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
              <Eyebrow>How I Work</Eyebrow>
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
                    desc: "We talk for 30 minutes. I understand your business, goals, and what you actually need — no sales pitch.",
                  },
                  {
                    num: "02",
                    title: "Proposal & quote",
                    desc: "You get a clear written proposal, fixed price, fixed timeline. No agencies, no hidden fees, no surprises.",
                  },
                  {
                    num: "03",
                    title: "Build phase",
                    desc: "I build in 7–21 days depending on scope. Direct WhatsApp/email access — no project managers, no delays.",
                  },
                  {
                    num: "04",
                    title: "Launch & support",
                    desc: "I deliver, launch, and support you for 30 days. Optional ongoing maintenance plans available.",
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
              <Eyebrow>My Stack</Eyebrow>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                Tools and technologies I work with
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
                    {group.chips.map((chip, ci) => (
                      <span
                        key={chip}
                        className={`text-[13px] font-medium px-3 py-1.5 rounded-full border transition-colors ${
                          ci === 0
                            ? "bg-[#141417] border-white/15 text-white"
                            : "bg-[#141417] border-white/8 text-white/75 hover:text-white hover:border-white/15"
                        }`}
                      >
                        {chip}
                      </span>
                    ))}
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
              <Eyebrow>Why Work With Me</Eyebrow>
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
                  <div className="text-white/70 mb-4">{card.icon}</div>
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
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#EF4444]/30 hover:scale-[1.02] transition-all duration-300"
                >
                  Book a call →
                </a>
                <a
                  href="https://wa.me/212600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white font-semibold rounded-full hover:bg-white/5 hover:border-white/25 transition-all duration-300"
                >
                  Send a message →
                </a>
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
