"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEtsy } from "react-icons/fa6";
import { SiFiverr } from "react-icons/si";

// Minimal key links — intentionally NOT a full sitemap. Rendered in SSR HTML
// inside a <nav> so they still count as internal links.
const navLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Honeypot: if the hidden field is filled, it's a bot — silently "succeed".
    const company = (e.currentTarget.elements.namedItem("company") as HTMLInputElement | null)?.value;
    if (company) {
      setStatus("done");
      setMessage("Thanks — you're in.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setMessage("Enter a valid email.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter subscriber",
          email,
          projectType: "Newsletter",
          message: "Subscribed via footer newsletter.",
        }),
      });
      if (res.ok) {
        setStatus("done");
        setMessage("Thanks — you're in.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <footer className="relative border-t border-white/[0.08] bg-white/[0.02] mt-8">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Tier 1 — brand (left) + newsletter (right) */}
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {/* Brand */}
          <div>
            <Link
              href="/"
              title="Digital Studio LF — home"
              aria-label="Digital Studio LF — home"
              className="inline-flex items-center gap-3 mb-4"
            >
              <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0" aria-hidden="true">
                <path d="M5 0H13L13 1L5 28H0L0 27L5 0Z" fill="#EF4444" />
              </svg>
              <span className="font-bold text-xl tracking-tight leading-none">
                <span className="text-white">Digital </span>
                <span className="text-primary">Studio LF</span>
              </span>
            </Link>
            <p className="text-white/60 text-[15px] leading-relaxed max-w-sm">
              Custom websites, dashboards &amp; CRM systems. Built in 7–21 days.
            </p>
            <p className="text-white/40 text-sm mt-2">
              Marrakesh, Morocco — working worldwide.
            </p>
          </div>

          {/* Newsletter */}
          <div className="md:max-w-md md:ml-auto w-full">
            <h2 className="text-white font-semibold text-[17px] mb-1.5">Stay in the loop</h2>
            <p className="text-white/45 text-sm mb-4">Tips, new work, and offers. No spam.</p>

            <form onSubmit={onSubmit} noValidate className="flex flex-col sm:flex-row gap-3">
              {/* Honeypot — hidden from users & AT, catches bots */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                name="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setMessage("");
                  }
                }}
                placeholder="you@email.com"
                aria-invalid={status === "error"}
                className="flex-1 min-h-[44px] px-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/15 text-white placeholder-white/30 text-[15px] focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="min-h-[44px] px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-[15px] whitespace-nowrap hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Subscribing…" : "Subscribe →"}
              </button>
            </form>

            {/* Single live region for both success & error */}
            <p
              aria-live="polite"
              className={`text-sm mt-2.5 min-h-[1.25rem] ${
                status === "done" ? "text-primary-light" : status === "error" ? "text-red-400" : "text-transparent"
              }`}
            >
              {message}
            </p>
          </div>
        </div>

        {/* Tier 2 — links + social + copyright */}
        <div className="mt-12 border-t border-white/[0.08] pt-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  title={link.label}
                  className="text-white/55 text-sm hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="https://www.etsy.com/shop/DigitalStudioLF"
                target="_blank"
                rel="noopener noreferrer"
                title="Digital Studio LF on Etsy"
                aria-label="Digital Studio LF on Etsy"
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-white/45 hover:text-primary transition-colors duration-150"
              >
                <FaEtsy size={18} aria-hidden="true" />
              </a>
              <a
                href="https://www.fiverr.com/theknight12?public_mode=true"
                target="_blank"
                rel="noopener noreferrer"
                title="Digital Studio LF on Fiverr"
                aria-label="Digital Studio LF on Fiverr"
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-white/45 hover:text-primary transition-colors duration-150"
              >
                <SiFiverr size={22} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-white/40 text-[13px]">
              © {year} Digital Studio LF. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/privacy" title="Privacy Policy" className="text-white/40 text-[13px] hover:text-white transition-colors duration-150">
                Privacy
              </Link>
              <Link href="/terms" title="Terms of Service" className="text-white/40 text-[13px] hover:text-white transition-colors duration-150">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
