"use client";

import { m } from "framer-motion";

/* Direct founder communication — the core differentiator vs. agencies that put
 * account managers and project managers between the client and the builders.
 * A side-by-side comparison makes the contrast obvious at a glance, backed by
 * concrete trust/responsiveness points. */

const withUs = [
  "You talk directly to the founder building your project",
  "Every call, message, and decision — no middlemen",
  "Replies usually within 2 hours, in EN / FR / AR",
  "Quick decisions: no layers of approval to wait on",
  "The person who scopes it is the person who builds it",
];

const withAgencies = [
  "You speak to an account manager, not a developer",
  "Your brief is relayed second-hand to the team",
  "Days of back-and-forth through a ticket queue",
  "Every change routed through project managers",
  "Nobody fully owns the outcome end to end",
];

export default function DirectFounderSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            No Middlemen
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Talk straight to the{" "}
            <span className="gradient-text">founder.</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            No account managers, no project managers, no being passed between
            departments. You work directly with the person actually building your
            project — from the first message to launch and beyond.
          </p>
        </m.div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* With us */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-7 border border-primary/25 relative"
          >
            <div className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
              Digital Studio LF
            </div>
            <h3 className="text-lg font-bold text-white mb-5 mt-2">
              Working direct with us
            </h3>
            <ul className="space-y-3">
              {withUs.map((point) => (
                <li key={point} className="flex gap-3 text-white/70 text-[15px] leading-relaxed">
                  <span className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Traditional agencies */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl p-7 border border-white/8"
          >
            <h3 className="text-lg font-bold text-white/60 mb-5 mt-2">
              Traditional agencies
            </h3>
            <ul className="space-y-3">
              {withAgencies.map((point) => (
                <li key={point} className="flex gap-3 text-white/40 text-[15px] leading-relaxed">
                  <span className="flex-shrink-0 mt-0.5" aria-hidden="true">✕</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </m.div>
        </div>

        {/* Reassurance line */}
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-white/40 text-sm mt-10"
        >
          Direct WhatsApp and email access throughout your project — usually
          replies within 2 hours during working hours.
        </m.p>
      </div>
    </section>
  );
}
