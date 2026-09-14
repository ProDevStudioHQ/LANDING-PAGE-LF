"use client";

import { m } from "framer-motion";

const prompts = [
  "What does your business do?",
  "What problem are you trying to solve?",
  "What do you want your customers or employees to be able to do?",
  "What would make your business easier to manage?",
];

export default function NotSureSection() {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="glass rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Not Sure What <span className="gradient-text">You Need?</span>
          </h2>
          <p className="text-white/60 text-lg mb-2">That&apos;s exactly what we&apos;re here for.</p>
          <p className="text-white/50 max-w-2xl mx-auto mb-8 leading-relaxed">
            You don&apos;t need to know whether you need a website, CRM, dashboard or custom
            application.
          </p>

          <p className="text-white font-semibold mb-4">Just tell us:</p>
          <ul className="grid sm:grid-cols-2 gap-3 text-left max-w-3xl mx-auto mb-8">
            {prompts.map((q) => (
              <li
                key={q}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-white/70 text-[15px] leading-relaxed"
              >
                <span className="text-primary flex-shrink-0" aria-hidden="true">?</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>

          <p className="text-white/60 mb-8">We&apos;ll help you determine what should be built.</p>

          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.04] transition-all duration-300"
          >
            Tell Us About Your Project
            <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </m.div>
    </section>
  );
}
