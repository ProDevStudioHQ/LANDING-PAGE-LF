"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import {
  HiOutlineSparkles,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiOutlineChartBarSquare,
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
  HiOutlineSquares2X2,
  HiOutlineArrowRight,
  HiOutlineBolt,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

type Category = "all" | "starter" | "growth" | "enterprise";

type Plan = {
  name: string;
  oldPrice: string;
  price: string;
  priceValue: number;
  description: string;
  icon: IconType;
  category: "starter" | "growth" | "enterprise";
  features: string[];
  bestFor: string;
  color: string;
  accentColor: string;
  highlighted: boolean;
};

const pricingPlans: Plan[] = [
  {
    name: "Login Page",
    oldPrice: "$300",
    price: "$150",
    priceValue: 150,
    description: "Starting from",
    icon: HiOutlineShieldCheck,
    category: "starter",
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
    priceValue: 500,
    description: "Starting from",
    icon: HiOutlineGlobeAlt,
    category: "starter",
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
    priceValue: 1000,
    description: "Starting from",
    icon: HiOutlineChartBarSquare,
    category: "growth",
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
    priceValue: 3000,
    description: "Starting from",
    icon: HiOutlineUserGroup,
    category: "growth",
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
    priceValue: 5000,
    description: "Starting from",
    icon: HiOutlineBuildingOffice2,
    category: "enterprise",
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

const accentMap: Record<
  string,
  { check: string; ring: string; border: string; text: string; bg: string }
> = {
  blue: {
    check: "text-blue-400",
    ring: "ring-blue-500/20",
    border: "border-blue-500/30",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  violet: {
    check: "text-violet-400",
    ring: "ring-violet-500/20",
    border: "border-violet-500/30",
    text: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  indigo: {
    check: "text-indigo-400",
    ring: "ring-indigo-500/20",
    border: "border-indigo-500/30",
    text: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  emerald: {
    check: "text-emerald-400",
    ring: "ring-emerald-500/20",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  orange: {
    check: "text-orange-400",
    ring: "ring-orange-500/20",
    border: "border-orange-500/30",
    text: "text-orange-400",
    bg: "bg-orange-500/10",
  },
};

const categories: { id: Category; label: string; icon: IconType; count: number }[] = [
  {
    id: "all",
    label: "All Plans",
    icon: HiOutlineSquares2X2,
    count: pricingPlans.length,
  },
  {
    id: "starter",
    label: "Starter",
    icon: HiOutlineBolt,
    count: pricingPlans.filter((p) => p.category === "starter").length,
  },
  {
    id: "growth",
    label: "Growth",
    icon: HiOutlineChartBarSquare,
    count: pricingPlans.filter((p) => p.category === "growth").length,
  },
  {
    id: "enterprise",
    label: "Enterprise",
    icon: HiOutlineBuildingOffice2,
    count: pricingPlans.filter((p) => p.category === "enterprise").length,
  },
];

export default function PricingSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredPlans =
    activeCategory === "all"
      ? pricingPlans
      : pricingPlans.filter((p) => p.category === activeCategory);

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-primary/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-violet-500/[0.02] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pink-500/[0.015] rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-green-500/15 to-emerald-500/15 text-green-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-5 border border-green-500/30 shadow-lg shadow-green-500/10"
          >
            <HiOutlineSparkles className="w-4 h-4" />
            50% OFF — Limited Time Promo
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Simple Pricing for Every{" "}
            <span className="gradient-text">Digital Project</span>
          </h2>
          <p className="text-white/50 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
            Choose the right solution for your business — from modern login pages
            to full CRM and enterprise platforms. All plans now{" "}
            <span className="text-green-400 font-semibold">50% off</span>.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white/[0.04] text-white/70 border border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
                <span
                  className={`ml-1 inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-6 mb-20 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredPlans.map((plan, i) => {
              const accent = accentMap[plan.accentColor] || accentMap.blue;
              const Icon = plan.icon;
              const showSavings =
                plan.oldPrice && plan.oldPrice !== plan.price && plan.oldPrice !== "Custom";
              return (
                <motion.div
                  layout
                  key={plan.name}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group relative flex"
                >
                  {/* Highlighted outer glow */}
                  {plan.highlighted && (
                    <div className="absolute -inset-[1.5px] rounded-[20px] bg-gradient-to-b from-indigo-500 via-violet-400/50 to-indigo-500/80 opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
                  )}

                  {/* Featured badge */}
                  {plan.highlighted && (
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.07 + 0.2 }}
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[10px] font-bold tracking-[0.15em] uppercase shadow-xl shadow-indigo-500/40"
                    >
                      <HiOutlineSparkles className="w-3 h-3" />
                      MOST POPULAR
                    </motion.div>
                  )}

                  {/* Card */}
                  <div
                    className={`relative w-full rounded-[20px] flex flex-col transition-all duration-400 ease-out overflow-hidden ${
                      plan.highlighted
                        ? "bg-gradient-to-b from-white/[0.08] to-white/[0.03] border border-indigo-500/30 shadow-2xl shadow-indigo-500/[0.08]"
                        : "bg-gradient-to-b from-white/[0.04] to-white/[0.015] border border-white/[0.07] hover:border-white/[0.15] hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-white/[0.04]"
                    }`}
                  >
                    {/* Top accent line */}
                    <div
                      className={`h-[2px] w-full bg-gradient-to-r ${plan.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                    />

                    {/* Card body */}
                    <div className="p-6 sm:p-7 lg:p-7 xl:p-6 2xl:p-7 flex flex-col flex-1">
                      {/* Icon + Label */}
                      <div className="flex items-center justify-between mb-5">
                        <div
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${accent.bg} ${accent.border}`}
                        >
                          <Icon className={`w-5 h-5 ${accent.text}`} />
                        </div>
                        {showSavings && (
                          <span className="text-[10px] font-bold text-green-400 bg-green-500/15 px-2 py-1 rounded-md border border-green-500/30">
                            50% OFF
                          </span>
                        )}
                      </div>

                      {/* Plan Name */}
                      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-3">
                        {plan.name}
                      </p>

                      {/* PRICE BLOCK */}
                      <div className="mb-6">
                        {showSavings && (
                          <span className="block text-sm sm:text-base text-white/35 line-through font-semibold mb-1">
                            {plan.oldPrice}
                          </span>
                        )}
                        <div className="flex items-end gap-2">
                          <span
                            className={`text-[2.75rem] sm:text-[3rem] md:text-[2.75rem] lg:text-[3rem] xl:text-[2.5rem] 2xl:text-[3rem] font-black leading-[0.9] tracking-tight ${
                              plan.highlighted
                                ? "bg-gradient-to-br from-white via-white to-violet-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(129,140,248,0.3)]"
                                : "text-white"
                            }`}
                          >
                            {plan.price}
                          </span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-white/30 font-medium mt-2 tracking-wider uppercase">
                          {plan.description}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                      {/* Best For badge */}
                      <div
                        className={`mb-5 p-3 rounded-xl bg-white/[0.03] ring-1 ${accent.ring}`}
                      >
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

                      {/* CTA Button */}
                      <motion.a
                        href="#contact"
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ y: 0, scale: 0.98 }}
                        className={`mt-auto w-full py-3 sm:py-3.5 rounded-xl font-semibold text-center text-sm tracking-wide transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2 ${
                          plan.highlighted
                            ? `bg-gradient-to-r ${plan.color} text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30`
                            : "bg-white/[0.05] text-white/80 border border-white/[0.08] hover:bg-white/[0.1] hover:text-white hover:border-white/20"
                        }`}
                      >
                        <span>Choose Plan</span>
                        <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Closing CTA Section */}
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
