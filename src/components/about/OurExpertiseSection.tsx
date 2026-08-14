"use client";

import { motion } from "framer-motion";
import { FadeSection, Eyebrow, fadeUp, staggerContainer } from "./shared";

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

export default function OurExpertiseSection() {
  return (
    <section className="py-16 lg:py-20">
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
  );
}
