"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiZap,
  FiLock,
  FiSmartphone,
  FiPenTool,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";

const trustBadges = [
  { icon: FiZap, label: "Fast Delivery" },
  { icon: FiLock, label: "Secure Code" },
  { icon: FiSmartphone, label: "Fully Responsive" },
  { icon: FiPenTool, label: "Premium Design" },
  { icon: FiTrendingUp, label: "SEO Optimized" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Headline word-by-word reveal
const headline = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const word = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const line1 = "Custom Landing Pages, Business Websites, Dashboards & CRM Platforms".split(" ");
const line2 = "Built from scratch in 7–21 days.".split(" ");

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-48 sm:pt-56">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Spotlight glow behind the headline */}
        <div className="hidden md:block absolute top-[18%] left-1/2 -translate-x-1/2 w-[700px] h-[420px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="hidden md:block absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        {/* Grid pattern with radial fade */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 100%)",
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Headline — word-by-word reveal */}
        <motion.h1
          variants={headline}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight mb-5"
        >
          {line1.map((w, i) => (
            <motion.span
              key={`a-${i}`}
              variants={word}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
          <br />
          <span className="block mt-3" />
          {line2.map((w, i) => (
            <motion.span
              key={`b-${i}`}
              variants={word}
              className="gradient-text-shimmer inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="text-base sm:text-lg text-white/55 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Delivered in 7–21 days with{" "}
          <span className="text-white/80 font-medium">elegant design, immersive project showcases, secure client access</span>
          , and a{" "}
          <span className="text-white/80 font-medium">premium user experience built to impress and convert</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#pricing"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.04] transition-all duration-300 text-base"
          >
            See pricing
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://crm.digitalstudiolf.online/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/[0.03] text-white/80 font-semibold hover:bg-white/[0.07] hover:border-white/30 hover:text-white transition-all duration-300 text-base backdrop-blur-sm"
          >
            View our work
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-2"
        >
          {trustBadges.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs sm:text-sm font-semibold text-white/60 hover:text-white hover:border-primary/40 hover:bg-primary/[0.06] transition-all duration-200 cursor-default select-none"
            >
              <Icon className="w-4 h-4 text-primary flex-shrink-0" />
              {label}
            </span>
          ))}
        </motion.div>

        {/* Floating mockup card — desktop only; mobile Chrome corrupts
            this entire image area on certain devices. */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block mt-16 relative max-w-4xl mx-auto"
        >
          <div className="relative group">
            {/* Main mockup image */}
            <div className="glass rounded-2xl p-2 glow-red relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.3)] hover:border-red-500/30">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none rounded-2xl" />

              <div className="relative rounded-xl overflow-hidden bg-black/50 border border-white/10">
                {/* Browser-like top bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>

                <Image
                  src="/images/idea-digital.png"
                  alt="Digital Studio LF — premium dashboard and CRM product preview"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
                  quality={85}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
