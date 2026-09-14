"use client";

import { m } from "framer-motion";

const questions = [
  "Have an idea?",
  "Need a new website?",
  "Want to replace an outdated system?",
  "Need a CRM?",
  "Want to take bookings online?",
  "Or simply don't know what solution you need yet?",
];

export default function CTASection() {
  return (
    // No id="contact" here: ContactForm owns that id, and a duplicate would make
    // #contact resolve to whichever element came first.
    <section className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-8 leading-tight">
            Let&apos;s Build Something That{" "}
            <span className="gradient-text">Works for Your Business.</span>
          </h2>

          <ul className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {questions.map((q) => (
              <li
                key={q}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-white/70 text-sm sm:text-base"
              >
                {q}
              </li>
            ))}
          </ul>

          <p className="text-white text-xl font-semibold mb-2">
            Tell us what you&apos;re trying to achieve.
          </p>
          <p className="text-white/55 text-lg mb-10">
            We&apos;ll figure out the right digital solution together.
          </p>

          <a
            href="#contact"
            className="group inline-flex items-center px-10 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-full hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300 text-lg pulse-red"
          >
            Start Your Project
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true">
              →
            </span>
          </a>
        </m.div>
      </div>
    </section>
  );
}
