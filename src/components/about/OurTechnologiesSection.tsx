"use client";

import { motion } from "framer-motion";
import { FadeSection, Eyebrow, fadeUp, staggerContainer } from "./shared";

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

export default function OurTechnologiesSection() {
  return (
    <section className="py-16 lg:py-20">
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
  );
}
