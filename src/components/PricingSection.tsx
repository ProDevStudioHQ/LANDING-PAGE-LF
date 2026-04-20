"use client";

import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

const pricingPlans = [
  {
    name: "Login Page",
    oldPrice: "$300",
    price: "$150",
    description: "Starting from",
    features: [
      "Modern login page design",
      "Responsive layout",
      "Forgot password page",
      "Signup page",
      "Clean UI",
      "Basic animation",
    ],
    bestFor: "SaaS, dashboards, client portals, admin access pages",
    color: "from-blue-500 to-cyan-500",
    accentColor: "blue",
    highlighted: false,
  },
  {
    name: "Website",
    oldPrice: "$1,000",
    price: "$500",
    description: "Starting from",
    features: [
      "Modern business website",
      "Responsive design",
      "Premium landing page structure",
      "Contact form",
      "Service sections",
      "Mobile optimization",
      "Basic SEO structure",
    ],
    bestFor: "Businesses, agencies, travel agencies, freelancers, startups",
    color: "from-violet-500 to-purple-500",
    accentColor: "violet",
    highlighted: false,
  },
  {
    name: "Dashboard",
    oldPrice: "$2,000",
    price: "$1,000",
    description: "Starting from",
    features: [
      "Admin dashboard UI",
      "Sidebar navigation",
      "Stats cards",
      "Charts and tables",
      "Responsive layout",
      "Modern interface",
      "Multiple sections",
    ],
    bestFor: "Admin panels, analytics systems, booking management, internal tools",
    color: "from-indigo-500 to-violet-500",
    accentColor: "indigo",
    highlighted: true,
  },
  {
    name: "CRM System",
    oldPrice: "$6,000",
    price: "$3,000",
    description: "Starting from",
    features: [
      "Lead management",
      "Client profiles",
      "Dashboard overview",
      "Pipeline or workflow",
      "Notes and communication tracking",
      "Team access",
      "Custom business structure",
    ],
    bestFor: "Agencies, service businesses, travel companies, sales teams",
    color: "from-emerald-500 to-teal-500",
    accentColor: "emerald",
    highlighted: false,
  },
  {
    name: "Enterprise Solutions",
    oldPrice: "Custom",
    price: "$5,000+",
    description: "Starting from",
    features: [
      "Advanced custom system",
      "Multiple user roles",
      "Large business workflow",
      "API integrations",
      "Advanced analytics",
      "Custom modules",
      "Scalable architecture",
      "Premium support",
    ],
    bestFor: "Large businesses, multi-team companies, advanced platforms, custom enterprise systems",
    color: "from-orange-500 to-amber-500",
    accentColor: "orange",
    highlighted: false,
  },
];

/* ─── accent helper map for Tailwind classes ─── */
const accentMap: Record<string, { dot: string; check: string; ring: string; glow: string }> = {
  blue:    { dot: "bg-blue-500",    check: "text-blue-400",    ring: "ring-blue-500/20",    glow: "shadow-blue-500/5"    },
  violet:  { dot: "bg-violet-500",  check: "text-violet-400",  ring: "ring-violet-500/20",  glow: "shadow-violet-500/5"  },
  indigo:  { dot: "bg-indigo-500",  check: "text-indigo-400",  ring: "ring-indigo-500/20",  glow: "shadow-indigo-500/5"  },
  emerald: { dot: "bg-emerald-500", check: "text-emerald-400", ring: "ring-emerald-500/20", glow: "shadow-emerald-500/5" },
  orange:  { dot: "bg-orange-500",  check: "text-orange-400",  ring: "ring-orange-500/20",  glow: "shadow-orange-500/5"  },
};

export default function PricingSection() {
  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      {/* ── Background ambient effects ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-primary/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-violet-500/[0.02] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pink-500/[0.015] rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-lg bg-green-500/15 text-green-400 text-xs sm:text-xs md:text-sm lg:text-sm font-semibold uppercase tracking-wider mb-4 border border-green-500/30">
            🎉 50% OFF — Limited Time Promo
          </span>
          <h2 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Simple Pricing for Every{" "}
            <span className="gradient-text">Digital Project</span>
          </h2>
          <p className="text-white/50 max-w-3xl mx-auto text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed">
            Choose the right solution for your business, from modern login pages
            to full CRM and enterprise platforms.
          </p>
        </motion.div>

        {/* ── Pricing Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-6 mb-20 items-stretch">
          {pricingPlans.map((plan, i) => {
            const accent = accentMap[plan.accentColor] || accentMap.blue;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative flex"
              >
                {/* ── Highlighted card outer glow ring ── */}
                {plan.highlighted && (
                  <div className="absolute -inset-[1.5px] rounded-[20px] bg-gradient-to-b from-indigo-500 via-violet-400/50 to-indigo-500/80 opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
                )}

                {/* ── Featured badge — outside card to avoid overflow clip ── */}
                {plan.highlighted && (
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.07 + 0.2 }}
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[10px] font-bold tracking-[0.15em] uppercase shadow-xl shadow-indigo-500/40"
                  >
                    <HiSparkles className="w-3 h-3" />
                    MOST POPULAR
                  </motion.div>
                )}

                {/* ── Card ── */}
                <div
                  className={`relative w-full rounded-[20px] flex flex-col transition-all duration-400 ease-out overflow-hidden ${
                    plan.highlighted
                      ? "bg-gradient-to-b from-white/[0.08] to-white/[0.03] border border-indigo-500/30 shadow-2xl shadow-indigo-500/[0.08]"
                      : "bg-gradient-to-b from-white/[0.04] to-white/[0.015] border border-white/[0.07] hover:border-white/[0.15] hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-white/[0.04]"
                  }`}
                >
                  {/* ── Top accent line ── */}
                  <div
                    className={`h-[2px] w-full bg-gradient-to-r ${plan.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* ── Card body ── */}
                  <div className="p-6 sm:p-7 lg:p-7 xl:p-6 2xl:p-7 flex flex-col flex-1">
                    {/* Plan Name — small label */}
                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-4">
                      {plan.name}
                    </p>

                    {/* ─────────── PRICE BLOCK — hero element ─────────── */}
                    <div className="mb-6">
                      <div className="flex items-end gap-3 flex-wrap">
                        {plan.oldPrice && plan.oldPrice !== plan.price && (
                          <span className="text-sm sm:text-base text-white/40 line-through font-semibold">
                            {plan.oldPrice}
                          </span>
                        )}
                        <span
                          className={`text-[3rem] sm:text-[3.5rem] md:text-[3rem] lg:text-[3.25rem] xl:text-[2.75rem] 2xl:text-[3.25rem] font-black leading-[0.9] tracking-tight ${
                            plan.highlighted
                              ? "bg-gradient-to-br from-white via-white to-violet-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(129,140,248,0.3)]"
                              : "text-white"
                          }`}
                        >
                          {plan.price}
                        </span>
                        {plan.oldPrice && plan.oldPrice !== plan.price && (
                          <span className="text-[10px] font-bold text-green-400 bg-green-500/15 px-2 py-1 rounded-md border border-green-500/30">
                            50% OFF
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-white/30 font-medium mt-2 tracking-wider uppercase">
                        {plan.description}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                    {/* Best For badge */}
                    <div className={`mb-5 p-3 rounded-xl bg-white/[0.03] ring-1 ${accent.ring}`}>
                      <p className="text-[9px] font-bold text-white/30 tracking-[0.2em] uppercase mb-1">
                        Best for
                      </p>
                      <p className="text-[12px] sm:text-[13px] leading-relaxed text-white/60">
                        {plan.bestFor}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="mb-7 flex-1">
                      <p className="text-[9px] font-bold text-white/30 uppercase mb-3.5 tracking-[0.2em]">
                        Includes
                      </p>
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-[12px] sm:text-[13px] leading-relaxed"
                          >
                            <span className={`mt-[3px] flex-shrink-0 ${accent.check}`}>
                              <FaCheck size={10} />
                            </span>
                            <span className="text-white/55 group-hover:text-white/70 transition-colors duration-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button — pinned to bottom */}
                    <motion.a
                      href="#contact"
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ y: 0, scale: 0.98 }}
                      className={`mt-auto w-full py-3 sm:py-3.5 rounded-xl font-semibold text-center text-sm tracking-wide transition-all duration-300 cursor-pointer ${
                        plan.highlighted
                          ? `bg-gradient-to-r ${plan.color} text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30`
                          : "bg-white/[0.05] text-white/80 border border-white/[0.08] hover:bg-white/[0.1] hover:text-white hover:border-white/20"
                      }`}
                    >
                      Choose Plan
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Closing CTA Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="rounded-[20px] bg-gradient-to-b from-white/[0.04] to-white/[0.015] border border-white/[0.08] p-8 md:p-12 text-center hover:border-white/[0.15] transition-all duration-400"
        >
          <h3 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-6">
            Flexible &amp; Tailored
          </h3>
          <p className="text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed text-base sm:text-base md:text-lg lg:text-lg">
            Every project is tailored to your business goals, required features,
            design level, and workflow complexity. Final pricing depends on scope,
            integrations, pages, modules, and customization level.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-sm sm:text-base md:text-lg lg:text-lg"
            >
              Request a Quote
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="px-8 md:px-10 py-3 md:py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/8 hover:border-white/40 transition-all duration-300 text-sm sm:text-base md:text-lg lg:text-lg"
            >
              Start Your Project
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="px-8 md:px-10 py-3 md:py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/8 hover:border-white/40 transition-all duration-300 text-sm sm:text-base md:text-lg lg:text-lg"
            >
              Free Consultation
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
