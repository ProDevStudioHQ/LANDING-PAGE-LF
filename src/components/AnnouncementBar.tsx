"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <m.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="relative bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white text-center py-2.5 px-4 text-sm font-medium z-50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="animate-pulse">🔥</span>
          <span>
            Limited Offer — <strong>20% OFF</strong> all packages this month
          </span>
          <a
            href="#pricing"
            className="ml-2 underline underline-offset-2 hover:text-white/80 transition-colors font-semibold"
          >
            Claim Now →
          </a>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
          aria-label="Close announcement"
        >
          âœ•
        </button>
      </m.div>
    </AnimatePresence>
  );
}
