"use client";

import { useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import { serviceGroups } from "@/config/services";
import { getServiceContent, priceLabel, getAccent } from "@/config/services-content";

// Anchor id from a category title (stable, presentation-only).
function categoryId(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Short pill label + one-line gray description per category (presentation copy).
const CATEGORY_META: Record<string, { nav: string; description: string; bg: string; border: string; text: string; activeBg: string; activeBorder: string; activeText: string }> = {
  Websites: {
    nav: "Websites",
    description: "Landing pages, business sites, and industry-specific websites that convert.",
    bg: "bg-blue-950/40",
    border: "border-blue-700/40",
    text: "text-blue-200",
    activeBg: "bg-blue-900/60",
    activeBorder: "border-blue-600",
    activeText: "text-blue-100",
  },
  "E-Commerce": {
    nav: "E-Commerce",
    description: "Online stores, marketplaces, and subscription platforms built to sell.",
    bg: "bg-orange-950/40",
    border: "border-orange-700/40",
    text: "text-orange-200",
    activeBg: "bg-orange-900/60",
    activeBorder: "border-orange-600",
    activeText: "text-orange-100",
  },
  "Dashboards & Portals": {
    nav: "Dashboards",
    description: "Real-time admin, analytics, and self-service portals for your team and clients.",
    bg: "bg-cyan-950/40",
    border: "border-cyan-700/40",
    text: "text-cyan-200",
    activeBg: "bg-cyan-900/60",
    activeBorder: "border-cyan-600",
    activeText: "text-cyan-100",
  },
  "CRM & Business Systems": {
    nav: "CRM",
    description: "Custom CRMs and internal tools shaped around how your business actually works.",
    bg: "bg-emerald-950/40",
    border: "border-emerald-700/40",
    text: "text-emerald-200",
    activeBg: "bg-emerald-900/60",
    activeBorder: "border-emerald-600",
    activeText: "text-emerald-100",
  },
  "Booking & Reservations": {
    nav: "Booking",
    description: "Direct booking and reservation systems that fill your calendar — no OTA fees.",
    bg: "bg-purple-950/40",
    border: "border-purple-700/40",
    text: "text-purple-200",
    activeBg: "bg-purple-900/60",
    activeBorder: "border-purple-600",
    activeText: "text-purple-100",
  },
  "AI & Automation": {
    nav: "AI",
    description: "Chatbots, WhatsApp, and workflow automation that save hours every week.",
    bg: "bg-yellow-950/40",
    border: "border-yellow-700/40",
    text: "text-yellow-200",
    activeBg: "bg-yellow-900/60",
    activeBorder: "border-yellow-600",
    activeText: "text-yellow-100",
  },
  Authentication: {
    nav: "Auth",
    description: "Secure login, user portals, and authentication systems done right.",
    bg: "bg-pink-950/40",
    border: "border-pink-700/40",
    text: "text-pink-200",
    activeBg: "bg-pink-900/60",
    activeBorder: "border-pink-600",
    activeText: "text-pink-100",
  },
  "Niche / Special": {
    nav: "Niche",
    description: "Specialised solutions for travel, startups, and the Moroccan market.",
    bg: "bg-indigo-950/40",
    border: "border-indigo-700/40",
    text: "text-indigo-200",
    activeBg: "bg-indigo-900/60",
    activeBorder: "border-indigo-600",
    activeText: "text-indigo-100",
  },
  Enterprise: {
    nav: "Enterprise",
    description: "Large-scale, bespoke platforms built to your exact requirements.",
    bg: "bg-red-950/40",
    border: "border-red-700/40",
    text: "text-red-200",
    activeBg: "bg-red-900/60",
    activeBorder: "border-red-600",
    activeText: "text-red-100",
  },
};

const ALL = "all";

export default function ServicesBrowser() {
  const [active, setActive] = useState<string>(ALL);

  const filters = [{ id: ALL, label: "All" }].concat(
    serviceGroups.map((g) => ({ id: g.title, label: CATEGORY_META[g.title]?.nav ?? g.title }))
  );

  return (
    <>
      {/* Sticky category filter — click a pill to show only that category */}
      <nav
        aria-label="Filter services by category"
        className="sticky top-[4.5rem] z-30 -mx-6 border-b border-white/[0.06] bg-[#0A0A0B]/95 px-6 py-3 backdrop-blur-lg lg:top-[4.75rem]"
      >
        <ul className="no-scrollbar mx-auto flex max-w-[1240px] gap-2 overflow-x-auto">
          {filters.map((f) => {
            const isActive = active === f.id;
            const meta = f.id === ALL ? null : CATEGORY_META[f.id];
            const styles = meta || { bg: "bg-gray-900/40", border: "border-gray-700/40", text: "text-gray-200", activeBg: "bg-gray-800/60", activeBorder: "border-gray-600", activeText: "text-gray-100" };

            return (
              <li key={f.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActive(f.id)}
                  aria-pressed={isActive}
                  className={
                    "block rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 " +
                    (isActive
                      ? `${styles.activeBg} ${styles.activeBorder} ${styles.activeText}`
                      : `${styles.bg} ${styles.border} ${styles.text} hover:opacity-80`)
                  }
                >
                  {f.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Category sections. All are rendered (links stay in the HTML for SEO);
          non-active categories are hidden when a filter is applied. */}
      <div className="space-y-16 pt-12 sm:space-y-20">
        {serviceGroups.map((group) => {
          const id = categoryId(group.title);
          const meta = CATEGORY_META[group.title];
          const accent = getAccent(group.title);
          const visible = active === ALL || active === group.title;
          return (
            <section key={group.title} id={id} hidden={!visible} className="scroll-mt-32">
              <header className="mb-6 border-b border-white/[0.08] pb-4">
                <div className="mb-1.5 flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`inline-block h-4 w-1.5 rounded-full bg-gradient-to-b ${accent.gradient}`}
                  />
                  <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${accent.text}`}>
                    {group.title}
                  </p>
                </div>
                <h2 className="sr-only">{group.title}</h2>
                {meta?.description && (
                  <p className="max-w-2xl text-sm leading-relaxed text-[#B0B0B8] sm:text-[15px]">
                    {meta.description}
                  </p>
                )}
              </header>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {group.items.map((item, i) => {
                  const content = getServiceContent(item.href.split("/").pop() ?? "");
                  const isEnterprise = group.title === "Enterprise" || content?.isContactOnly;
                  const price = isEnterprise ? "Contact" : content ? priceLabel(content) : "Contact us";
                  return (
                    <ServiceCard
                      key={item.href}
                      href={item.href}
                      title={item.label}
                      description={content?.subheadline}
                      price={price}
                      accent={accent}
                      index={i}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
