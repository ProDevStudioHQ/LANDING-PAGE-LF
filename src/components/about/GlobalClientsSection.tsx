"use client";

import { motion } from "framer-motion";
import { FadeSection, Eyebrow, fadeUp, staggerContainer } from "./shared";

export default function GlobalClientsSection() {
  return (
    <section className="py-16 lg:py-20">
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
  );
}
