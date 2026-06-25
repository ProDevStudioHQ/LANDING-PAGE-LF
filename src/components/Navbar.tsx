"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { serviceGroups, resolveHref, SERVICES_INDEX } from "@/config/services";

// Premium touch: slide the bar up when scrolling down, reveal on scroll up.
// Flip to false to keep the bar always visible.
const HIDE_ON_SCROLL_DOWN = true;
// Scroll distance (px) before the transparent bar turns solid.
const SOLID_THRESHOLD = 64;

const navLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

// Pages that open with a full-bleed dark hero → the bar starts transparent and
// turns solid on scroll. Everything else (content/list/legal pages) starts
// solid so the bar never floats over text. Resolved from the pathname so the
// SSR render is already correct (no flash, no layout shift).
function isHeroRoute(pathname: string): boolean {
  if (
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/web-design-morocco" ||
    pathname === "/web-developer-for-startups" ||
    pathname === "/booking-websites-for-hotels" ||
    pathname === "/fr/creation-site-web-maroc" ||
    pathname === "/fr/agence-web-marrakech"
  ) {
    return true;
  }
  // Service detail pages use the template hero — but NOT the /services index.
  if (pathname.startsWith("/services/")) return true;
  return false;
}

export default function Navbar() {
  const pathname = usePathname();
  const heroRoute = isHeroRoute(pathname);

  const [pastThreshold, setPastThreshold] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The bar is solid whenever it's not a hero page, or once scrolled past the
  // threshold. Transparent only at the very top of a hero page.
  const solid = !heroRoute || pastThreshold;

  // --- prefers-reduced-motion (kills the overlay stagger) ---
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // --- Cheap scroll detection: rAF-throttled, reads scrollY only (no layout) ---
  useEffect(() => {
    let raf = 0;
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setPastThreshold(y > SOLID_THRESHOLD);
      if (HIDE_ON_SCROLL_DOWN) {
        if (y > lastY && y > 200) setHidden(true);
        else if (y < lastY) setHidden(false);
      }
      lastY = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Never keep the bar hidden while the mobile overlay is open.
  useEffect(() => {
    if (mobileOpen) setHidden(false);
  }, [mobileOpen]);

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
    setActiveGroup(0);
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

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, []);

  // --- Mobile overlay: scroll lock + focus trap + Escape ---
  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusable = () =>
      Array.from(
        overlayRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((el) => el.offsetParent !== null);

    getFocusable()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMobile();
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key === "Tab") {
        const items = getFocusable();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, closeMobile]);

  // Keyboard nav — left column (group list): up/down between groups, right enters items.
  const onGroupKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const groups = Array.from(
      servicesRef.current?.querySelectorAll<HTMLButtonElement>("[data-group-index]") ?? []
    );
    if (groups.length === 0) return;
    const idx = groups.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next =
        e.key === "ArrowDown"
          ? groups[(idx + 1) % groups.length]
          : groups[(idx - 1 + groups.length) % groups.length];
      next?.focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      servicesRef.current
        ?.querySelector<HTMLAnchorElement>('[aria-label="' + serviceGroups[activeGroup].title + '"] [role="menuitem"]')
        ?.focus();
    }
  };

  // Keyboard nav — right column (active group items): up/down between items, left back to group.
  const onItemsKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      servicesRef.current
        ?.querySelector<HTMLButtonElement>(`[data-group-index="${activeGroup}"]`)
        ?.focus();
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = Array.from(
      (e.currentTarget as HTMLDivElement).querySelectorAll<HTMLAnchorElement>('[role="menuitem"]')
    );
    if (items.length === 0) return;
    const idx = items.indexOf(document.activeElement as HTMLAnchorElement);
    const next =
      e.key === "ArrowDown"
        ? items[(idx + 1) % items.length]
        : items[(idx - 1 + items.length) % items.length];
    next?.focus();
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  // Stagger delay for overlay items (0 when reduced-motion or closed).
  const staggerDelay = (i: number) =>
    reduceMotion || !mobileOpen ? "0ms" : `${80 + i * 45}ms`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          solid
            ? "bg-[#0a0a0f]/85 supports-[backdrop-filter]:bg-[#0a0a0f]/70 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Legibility scrim while transparent over a hero (subtle, dark→clear). */}
        {!solid && (
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/40 to-transparent"
            aria-hidden="true"
          />
        )}

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" title="Digital Studio LF — home" className="flex items-center gap-3 group">
              <svg
                width="18"
                height="28"
                viewBox="0 0 18 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                aria-hidden="true"
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
                      className={`relative px-4 py-2 text-sm rounded-full transition-colors duration-200 flex items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                        isActive("/services") ? "text-white" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {link.label}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown panel — always solid elevated surface so it reads over the hero. Kept in DOM for SSR/crawlers. */}
                    <div
                      role="menu"
                      aria-label="Services"
                      className={`absolute left-0 top-full mt-2 w-[min(720px,calc(100vw-2rem))] origin-top rounded-2xl border border-white/[0.08] bg-[#141417] shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-[opacity,transform] duration-200 ease-out ${
                        servicesOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="flex">
                        {/* Left: group list */}
                        <div
                          role="menu"
                          aria-label="Service categories"
                          onKeyDown={onGroupKeyDown}
                          className="w-[230px] shrink-0 border-r border-white/[0.08] p-2"
                        >
                          {serviceGroups.map((group, i) => (
                            <button
                              key={group.title}
                              type="button"
                              role="menuitem"
                              tabIndex={servicesOpen ? 0 : -1}
                              data-group-index={i}
                              aria-haspopup="true"
                              aria-expanded={activeGroup === i}
                              onMouseEnter={() => setActiveGroup(i)}
                              onFocus={() => setActiveGroup(i)}
                              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer ${
                                activeGroup === i
                                  ? "bg-white/[0.06] text-white"
                                  : "text-white/80 hover:bg-white/[0.04] hover:text-white"
                              }`}
                            >
                              {group.title}
                              <svg
                                className={`w-3.5 h-3.5 transition-colors ${activeGroup === i ? "text-primary" : "text-white/30"}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          ))}
                        </div>

                        {/* Right: fly-out items for the active group */}
                        <div
                          role="menu"
                          aria-label={serviceGroups[activeGroup].title}
                          onKeyDown={onItemsKeyDown}
                          className="min-w-0 flex-1 p-3"
                        >
                          <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                            {serviceGroups[activeGroup].title}
                          </p>
                          <div className="grid grid-cols-2 gap-x-1 gap-y-0.5">
                            {serviceGroups[activeGroup].items.map((item) => (
                              <a
                                key={item.label}
                                role="menuitem"
                                href={resolveHref(item)}
                                title={item.label}
                                tabIndex={servicesOpen ? 0 : -1}
                                onClick={() => setServicesOpen(false)}
                                className="block rounded-lg px-3 py-2 text-[14px] text-white/85 hover:bg-white/[0.06] focus:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-colors duration-150"
                              >
                                {item.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/[0.08] p-2">
                        <a
                          role="menuitem"
                          href={SERVICES_INDEX}
                          title="View all services"
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
                  <Link
                    key={link.label}
                    href={link.href}
                    title={link.label}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`group relative px-4 py-2 text-sm rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                      isActive(link.href) ? "text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {/* Accent underline — drawn in on hover / for the active page. */}
                    <span
                      className={`pointer-events-none absolute left-4 right-4 -bottom-0.5 h-px bg-primary origin-left transition-transform duration-200 ${
                        isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                      aria-hidden="true"
                    />
                  </Link>
                )
              )}
            </div>

            {/* Contact CTA — the one accent element */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/contact"
                title="Contact Digital Studio LF"
                aria-current={pathname === "/contact" ? "page" : undefined}
                className={`px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] ${
                  pathname === "/contact" ? "ring-2 ring-primary/60 ring-offset-2 ring-offset-[#0a0a0f]" : ""
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              ref={hamburgerRef}
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden relative z-[60] p-3 -mr-2 text-white/80 hover:text-white active:text-primary cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-overlay"
            >
              {/* Morphing hamburger → X */}
              <span className="relative block w-6 h-6 pointer-events-none" aria-hidden="true">
                <span
                  className={`absolute left-0 top-1/2 h-0.5 w-6 bg-current transition-transform duration-300 ${
                    mobileOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-0.5 w-6 bg-current transition-opacity duration-200 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-0.5 w-6 bg-current transition-transform duration-300 ${
                    mobileOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      <div
        id="mobile-overlay"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`lg:hidden fixed inset-0 z-[55] bg-[#0a0a0f]/95 supports-[backdrop-filter]:bg-[#0a0a0f]/85 backdrop-blur-xl transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="h-full overflow-y-auto px-6 pt-24 pb-10 flex flex-col">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {navLinks.map((link, i) =>
              link.label === "Services" ? (
                <div
                  key={link.label}
                  className="transition-all duration-300 motion-reduce:transition-none"
                  style={{ transitionDelay: staggerDelay(i), opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(8px)" }}
                >
                  <button
                    type="button"
                    aria-expanded={mobileServicesOpen}
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="flex w-full items-center justify-between py-3 min-h-[44px] text-2xl font-semibold text-white hover:text-primary transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg"
                  >
                    {link.label}
                    <svg
                      className={`w-6 h-6 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div
                    className={`overflow-hidden transition-[max-height] duration-300 ease-in-out motion-reduce:transition-none ${
                      mobileServicesOpen ? "max-h-[3000px]" : "max-h-0"
                    }`}
                  >
                    <div className="pt-1 pb-3 space-y-4">
                      {serviceGroups.map((group) => (
                        <div key={group.title}>
                          <p className="pb-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                            {group.title}
                          </p>
                          {group.items.map((item) => (
                            <a
                              key={item.label}
                              href={resolveHref(item)}
                              title={item.label}
                              onClick={closeMobile}
                              className="block py-2.5 min-h-[44px] text-white/80 hover:text-primary transition-colors text-[17px]"
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                      ))}
                      <a
                        href={SERVICES_INDEX}
                        title="View all services"
                        onClick={closeMobile}
                        className="block py-2.5 min-h-[44px] text-primary font-semibold text-[17px]"
                      >
                        View all services &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  title={link.label}
                  onClick={closeMobile}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="py-3 min-h-[44px] flex items-center text-2xl font-semibold text-white hover:text-primary transition-all duration-300 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg"
                  style={{ transitionDelay: staggerDelay(i), opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(8px)" }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Contact CTA + small contact footer */}
          <div
            className="mt-auto pt-10 transition-all duration-300 motion-reduce:transition-none"
            style={{ transitionDelay: staggerDelay(navLinks.length), opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(8px)" }}
          >
            <Link
              href="/contact"
              title="Contact Digital Studio LF"
              onClick={closeMobile}
              className="block w-full py-4 min-h-[44px] bg-gradient-to-r from-primary to-primary-dark text-white text-center rounded-full font-semibold text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
            >
              Contact
            </Link>
            <a
              href="mailto:hello@digitalstudiolf.online"
              title="Email Digital Studio LF"
              className="mt-5 block text-center text-white/50 text-sm hover:text-white transition-colors"
            >
              hello@digitalstudiolf.online
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
