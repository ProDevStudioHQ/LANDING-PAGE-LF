"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="hidden md:block fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* ── Base gradient ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(120,40,200,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_50%,rgba(239,68,68,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_80%,rgba(59,130,246,0.05),transparent_50%)]" />

      {/* ── Aurora ribbons (desktop only — heavy blur breaks mobile GPUs) ── */}
      <div className="aurora-container absolute inset-0 hidden md:block">
        <motion.div
          className="absolute w-[150vw] h-[60vh] -left-[25vw] top-[-10%] rounded-[50%] opacity-[0.07]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(239,68,68,0.4), rgba(168,85,247,0.4), rgba(59,130,246,0.3), transparent)",
            filter: "blur(80px)",
          }}
          animate={{
            x: ["-10%", "10%", "-10%"],
            y: ["0%", "5%", "0%"],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[120vw] h-[50vh] -left-[10vw] top-[30%] rounded-[50%] opacity-[0.05]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(16,185,129,0.3), rgba(239,68,68,0.2), transparent)",
            filter: "blur(100px)",
          }}
          animate={{
            x: ["5%", "-15%", "5%"],
            y: ["-3%", "3%", "-3%"],
            rotate: [0, -2, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        <motion.div
          className="absolute w-[130vw] h-[45vh] -left-[15vw] top-[60%] rounded-[50%] opacity-[0.04]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), rgba(236,72,153,0.3), rgba(239,68,68,0.3), transparent)",
            filter: "blur(90px)",
          }}
          animate={{
            x: ["-5%", "12%", "-5%"],
            y: ["2%", "-4%", "2%"],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10,
          }}
        />
      </div>

      {/* ── Floating orbs (desktop only) ── */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)",
          left: "10%",
          top: "15%",
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          right: "5%",
          top: "40%",
        }}
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 50, -70, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
          left: "40%",
          bottom: "10%",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7,
        }}
      />
      <motion.div
        className="absolute w-[250px] h-[250px] rounded-full hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
          left: "70%",
          top: "20%",
        }}
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 70, -30, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 12,
        }}
      />

      {/* ── Animated grid ── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Radial spotlight that follows scroll ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(239,68,68,0.06)_0%,transparent_60%)]" />

      {/* ── Noise grain overlay ── */}
      <div className="noise-overlay absolute inset-0 opacity-[0.03]" />

      {/* ── Vignette edges ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.5)_100%)]" />

      {/* ── Subtle horizontal scan line effect ── */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />
    </div>
  );
}
