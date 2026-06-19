"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FiZap,
  FiLock,
  FiSmartphone,
  FiPenTool,
  FiTrendingUp,
  FiArrowRight,
  FiChevronDown,
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

function useVideoAllowed() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // @ts-expect-error saveData is non-standard
    const saveData = navigator.connection?.saveData === true;
    if (!reducedMotion && !saveData) setAllowed(true);
  }, []);
  return allowed;
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoAllowed = useVideoAllowed();

  useEffect(() => {
    if (videoRef.current && videoAllowed) {
      videoRef.current.play().catch(() => {});
    }
  }, [videoAllowed]);

  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "100svh" }}>

      {/* Video background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Poster — always visible as LCP element */}
        <Image
          src="/images/hero-poster.webp"
          alt=""
          fill
          className={`object-cover object-center transition-opacity duration-700 ${videoAllowed ? "opacity-0" : "opacity-100"}`}
          priority
          fetchPriority="high"
          sizes="100vw"
          aria-hidden="true"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {/* Video — layered on top of poster once loaded */}
        {videoAllowed && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/hero-poster.webp"
            preload="metadata"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src="/videos/hero.webm" type="video/webm" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Subtle spotlight behind headline */}
        <div className="hidden md:block absolute top-[18%] left-1/2 -translate-x-1/2 w-[700px] h-[420px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 sm:pt-40 pb-20"
      >
        {/* Eyebrow label */}
        <motion.div variants={item} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Premium Web Development Studio
          </span>
        </motion.div>

        {/* H1 — server-rendered, word-by-word reveal on client */}
        <motion.h1
          variants={headline}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight mb-5 text-white"
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
          <br className="hidden sm:block" />
          {line2.map((w, i) => (
            <motion.span
              key={`b-${i}`}
              variants={word}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={item}
          className="text-base sm:text-lg text-white/55 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          with{" "}
          <span className="text-white/80 font-medium">modern design, responsive development, secure authentication</span>
          , and a focus on{" "}
          <span className="text-white/80 font-medium">performance and conversions</span>.
        </motion.p>

        {/* CTAs — red used exactly once: primary button */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.04] transition-all duration-300 text-base"
          >
            Start your project
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://crm.digitalstudiolf.online/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/25 bg-white/[0.04] text-white/80 font-semibold hover:bg-white/[0.09] hover:border-white/40 hover:text-white transition-all duration-300 text-base backdrop-blur-sm"
          >
            View our work
            <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {trustBadges.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs sm:text-sm font-semibold text-white/55 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200 cursor-default select-none backdrop-blur-sm"
            >
              <Icon className="w-4 h-4 text-white/40 flex-shrink-0" />
              {label}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors duration-300 group"
        aria-label="Scroll to services"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <FiChevronDown className="w-4 h-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
