"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";

export default function MobileMotionGate({
  children,
}: {
  children: React.ReactNode;
}) {
  // Default to true so the first SSR + hydration render starts with
  // reducedMotion="always" — Framer Motion never initialises animation
  // listeners until useEffect confirms we're on a wide screen.
  // This is the main fix for the 16,000ms TBT: without this, Framer
  // Motion hydrates all motion.divs in animation mode and sets up rAF
  // loops before the matchMedia check runs.
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <MotionConfig reducedMotion={isMobile ? "always" : "user"}>
      {children}
    </MotionConfig>
  );
}
