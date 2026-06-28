"use client";

import { useEffect, useState } from "react";

export type QuickNavItem = { id: string; label: string };

/**
 * Sticky category quick-nav for the /services hub.
 *
 * Anchor links jump to each category section; the pill for the section currently
 * in view is highlighted in the brand accent (the one place red appears in this
 * strip). Scroll-spy is progressive enhancement — the links work without JS, and
 * the active state simply doesn't update if JS is off.
 */
export default function ServicesQuickNav({ items }: { items: QuickNavItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost section that is intersecting the active band.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Active band sits just below the sticky navbar + this nav.
      { rootMargin: "-160px 0px -65% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Service categories"
      className="sticky top-[4.5rem] z-30 -mx-4 border-b border-white/[0.06] bg-black/80 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:top-[4.75rem]"
    >
      <ul className="no-scrollbar mx-auto flex max-w-[1240px] gap-2 overflow-x-auto">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={
                  "block rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 " +
                  (isActive
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-white/[0.08] bg-white/[0.02] text-[#9CA3AF] hover:border-white/20 hover:text-white")
                }
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
