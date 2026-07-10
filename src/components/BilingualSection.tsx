"use client";

import { m } from "framer-motion";

/* Trilingual team showcase — built to attract Moroccan and North African
 * clients who want to work in Darija/Arabic or French, not just English.
 * Each card carries a real greeting in-language so the capability is shown,
 * not merely claimed. The Arabic card renders RTL. */
const languages = [
  {
    code: "EN",
    name: "English",
    native: "English",
    greeting: "Let's build something great.",
    blurb:
      "Full project delivery in English for startups and agencies across Europe and North America.",
    dir: "ltr" as const,
    flag: "🇬🇧",
  },
  {
    code: "FR",
    name: "French",
    native: "Français",
    greeting: "Construisons quelque chose de grand.",
    blurb:
      "Devis, réunions et support entièrement en français — pour les entreprises du Maroc et d'Afrique du Nord.",
    dir: "ltr" as const,
    flag: "🇫🇷",
  },
  {
    code: "AR",
    name: "Arabic",
    native: "العربية",
    greeting: "نبنيو معاك شي حاجة زوينة.",
    blurb:
      "نتواصلو معاك بالعربية والدارجة المغربية، من أول مكالمة حتى إطلاق المشروع.",
    dir: "rtl" as const,
    flag: "🇲🇦",
  },
];

export default function BilingualSection() {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Bilingual Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            We speak{" "}
            <span className="gradient-text">your language.</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Work with us in English, French, or Arabic (including Moroccan
            Darija) — from the first call to launch. No translation friction, no
            lost meaning. Just clear communication throughout your project.
          </p>
        </m.div>

        {/* Language cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((lang, i) => (
            <m.div
              key={lang.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              dir={lang.dir}
              className="group glass rounded-2xl p-7 hover:border-primary/20 transition-all duration-500 glass-hover"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl" aria-hidden="true">
                  {lang.flag}
                </span>
                <div>
                  <span className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                    {lang.native}
                  </span>
                  <span className="block text-white/40 text-xs uppercase tracking-widest">
                    {lang.name}
                  </span>
                </div>
              </div>
              <p
                className="text-xl font-semibold text-white/90 mb-3 leading-snug"
                lang={lang.code.toLowerCase()}
              >
                {lang.greeting}
              </p>
              <p className="text-white/40 text-sm leading-relaxed">
                {lang.blurb}
              </p>
            </m.div>
          ))}
        </div>

        {/* Reassurance line */}
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-white/40 text-sm mt-10"
        >
          Basés à Marrakech, nous travaillons avec des clients partout au Maroc,
          au Maghreb et dans le monde entier.
        </m.p>
      </div>
    </section>
  );
}
