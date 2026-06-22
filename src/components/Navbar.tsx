"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { FaEtsy } from "react-icons/fa6";
import { SiFiverr } from "react-icons/si";
import { serviceGroups, resolveHref, SERVICES_INDEX } from "@/config/services";

const navLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Services", href: "/services" },
  { label: "Our Projects", href: "/portfolio" },
  { label: "Shop", href: "https://crm.digitalstudiolf.online/shop", external: true },
  { label: "News", href: "/news" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  // --- Desktop dropdown: open/close helpers with hover-away delay ---
  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openServices = useCallback(() => {
    cancelClose();
    setServicesOpen(true);
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  }, [cancelClose]);

  // Click outside + Escape to dismiss the desktop dropdown
  useEffect(() => {
    if (!servicesOpen) return;

    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  // Arrow-key navigation within the open dropdown
  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = Array.from(
      servicesRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]') ?? []
    );
    if (items.length === 0) return;
    const idx = items.indexOf(document.activeElement as HTMLAnchorElement);
    const next =
      e.key === "ArrowDown"
        ? items[(idx + 1) % items.length]
        : items[(idx - 1 + items.length) % items.length];
    next?.focus();
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <>
      <nav
        className={`navbar-slide fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
          scrolled
            ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-[#0a0a0f]/60 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <svg
                width="18"
                height="28"
                viewBox="0 0 18 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
              >
                <path d="M5 0H13L13 1L5 28H0L0 27L5 0Z" fill="#EF4444" />
              </svg>
              <span className="font-bold text-xl tracking-tight leading-none">
                <span className="text-white">Digital </span>
                <span className="text-primary">Studio LF</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.label === "Services" ? (
                  <div
                    key={link.label}
                    ref={servicesRef}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      ref={triggerRef}
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen((v) => !v)}
                      className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      {link.label}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown panel — kept in DOM for SSR/crawlers, hidden via CSS */}
                    <div
                      role="menu"
                      aria-label="Services"
                      onKeyDown={onMenuKeyDown}
                      className={`absolute left-0 top-full mt-2 w-[min(800px,calc(100vw-2rem))] origin-top rounded-2xl border border-white/[0.08] bg-[#141417] shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-[opacity,transform] duration-200 ease-out ${
                        servicesOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 p-4">
                        {serviceGroups.map((group) => (
                          <div key={group.title} className="border-b border-white/[0.06] last:border-b-0 [&:nth-last-child(2)]:border-b-0 py-2">
                            <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                              {group.title}
                            </p>
                            {group.items.map((item) => (
                              <a
                                key={item.label}
                                role="menuitem"
                                href={resolveHref(item)}
                                tabIndex={servicesOpen ? 0 : -1}
                                onClick={() => setServicesOpen(false)}
                                className="block rounded-lg px-3 py-2 text-[14px] text-white/85 hover:bg-white/[0.06] focus:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-colors duration-150"
                              >
                                {item.label}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-white/[0.08] p-2">
                        <a
                          role="menuitem"
                          href={SERVICES_INDEX}
                          tabIndex={servicesOpen ? 0 : -1}
                          onClick={() => setServicesOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-center text-[14px] font-semibold text-primary hover:bg-primary/10 focus:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-colors duration-150"
                        >
                          View all services &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-all duration-300"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            {/* CTA buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href="https://www.etsy.com/shop/DigitalStudioLF"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-4 py-2.5 rounded-full bg-[#B84718] text-white text-sm font-semibold hover:bg-[#A03F15] transition-all duration-300 flex items-center gap-2"
              >
                <FaEtsy size={16} aria-hidden="true" role="presentation" />
                Shop
              </a>
              <a
                href="https://www.fiverr.com/theknight12?public_mode=true"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-4 py-2.5 rounded-full bg-[#0D7A47] text-white text-sm font-semibold hover:bg-[#0A6A3D] transition-all duration-300 flex items-center gap-2"
              >
                <SiFiverr size={22} aria-hidden="true" role="presentation" />
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
              <svg className="w-6 h-6 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — CSS transition, no Framer Motion */}
      <div
        className={`lg:hidden fixed top-16 left-0 right-0 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto bg-black border-t border-white/5 transition-[opacity,transform] duration-200 origin-top ${
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-4 py-6 space-y-2">
          {navLinks.map((link) =>
            link.label === "Services" ? (
              <div key={link.label}>
                <button
                  type="button"
                  aria-expanded={mobileServicesOpen}
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex w-full items-center justify-between px-4 py-3 min-h-[44px] text-white hover:text-primary hover:bg-white/5 rounded-xl transition-colors text-base font-medium cursor-pointer"
                >
                  {link.label}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Accordion — max-height trick for a smooth height transition */}
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    mobileServicesOpen ? "max-h-[2000px]" : "max-h-0"
                  }`}
                >
                  <div className="pl-2 pt-1 pb-2 space-y-3">
                    {serviceGroups.map((group) => (
                      <div key={group.title}>
                        <p className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                          {group.title}
                        </p>
                        {group.items.map((item) => (
                          <a
                            key={item.label}
                            href={resolveHref(item)}
                            onClick={closeMobile}
                            className="block px-4 py-3 min-h-[44px] text-white/85 hover:text-primary hover:bg-white/5 rounded-xl transition-colors text-[15px]"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    ))}
                    <a
                      href={SERVICES_INDEX}
                      onClick={closeMobile}
                      className="block px-4 py-3 min-h-[44px] text-primary font-semibold hover:bg-primary/10 rounded-xl transition-colors text-[15px]"
                    >
                      View all services &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={closeMobile}
                className="block px-4 py-3 min-h-[44px] text-white hover:text-primary hover:bg-white/5 rounded-xl transition-colors text-base font-medium"
              >
                {link.label}
              </a>
            )
          )}
          <a
            href="#contact"
            onClick={closeMobile}
            className="block mt-4 px-4 py-3 bg-gradient-to-r from-primary to-primary-dark text-white text-center rounded-full font-semibold"
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
}
