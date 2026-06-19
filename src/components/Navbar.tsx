"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaEtsy } from "react-icons/fa6";
import { SiFiverr } from "react-icons/si";

const navLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Services", href: "#services" },
  { label: "Shop", href: "https://crm.digitalstudiolf.online/shop" },
  { label: "Our Projects", href: "https://crm.digitalstudiolf.online/portfolio" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when resizing up to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  return (
    <>
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
        scrolled
          ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-[#0a0a0f]/60 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <path d="M6 0H16L16 0L6 30H0L0 30L6 0Z" fill="#EF4444" transform="skewX(-6)"/>
            </svg>
            <span className="font-bold text-xl tracking-tight leading-none">
              <span className="text-white">Digital </span>
              <span className="text-primary">Studio LF</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2">

            <a
              href="https://www.etsy.com/shop/DigitalStudioLF"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-4 py-2.5 rounded-full border border-yellow-600/30 text-yellow-600 text-sm font-semibold hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all duration-300 flex items-center gap-2"
            >
              <FaEtsy size={16} />
              Shop
            </a>
            <a
              href="https://www.fiverr.com/theknight12?public_mode=true"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-4 py-2.5 rounded-full border border-green-600/30 text-green-500 text-sm font-semibold hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300 flex items-center gap-2"
            >
              <SiFiverr size={22} />
              Fiverr
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden relative z-50 p-3 -mr-2 text-white/80 hover:text-white active:text-primary cursor-pointer touch-manipulation"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg
              className="w-6 h-6 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

    </motion.nav>

    {/* Mobile Menu — rendered as sibling so it isn't affected by the nav's transform animation */}
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden fixed top-16 left-0 right-0 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto bg-black border-t border-white/5"
        >
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-white hover:text-primary hover:bg-white/5 rounded-xl transition-colors text-base font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block mt-4 px-4 py-3 bg-gradient-to-r from-primary to-primary-dark text-white text-center rounded-full font-semibold"
            >
              Get Started
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
