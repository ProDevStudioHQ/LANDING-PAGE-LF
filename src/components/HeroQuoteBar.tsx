"use client";

import { useState } from "react";
import { FiLayers, FiDollarSign, FiSearch } from "react-icons/fi";

// Must stay in sync with ContactForm's own lists — the values are matched
// case-insensitively against them when the form reads them back off the hash,
// and anything unrecognised is silently ignored there rather than mis-filling.
const PROJECT_TYPES = ["Landing Page", "Website", "Dashboard", "CRM", "Other"];
const BUDGETS = ["Under $500", "$500–$1500", "$1500–$5000", "$5000+"];

const fieldClass =
  "w-full bg-transparent text-white font-medium text-sm focus:outline-none cursor-pointer " +
  // Native option lists render with the OS palette, which is light on most
  // systems — without this the dropdown is white-on-white once it opens.
  "[&>option]:bg-neutral-900 [&>option]:text-white";

/**
 * The booking-bar pattern from travel sites, retargeted at a web agency: pick a
 * project type and a budget, land on the contact form with both already filled.
 *
 * It navigates to a hash rather than posting anything — ContactForm listens for
 * `plan=` and `budget=` on the hash and pre-selects them, so this stays a link
 * and keeps working without JS for the default selection.
 */
export default function HeroQuoteBar() {
  const [projectType, setProjectType] = useState(PROJECT_TYPES[1]);
  const [budget, setBudget] = useState(BUDGETS[1]);

  const href = `#contact?plan=${encodeURIComponent(projectType)}&budget=${encodeURIComponent(budget)}`;

  return (
    <div className="glass rounded-2xl border border-white/10 p-2 shadow-2xl shadow-black/50 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        <label className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer">
          <FiLayers className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/45 mb-0.5">
              Project
            </span>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className={fieldClass}
              aria-label="Project type"
            >
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </span>
        </label>

        <span className="hidden sm:block w-px bg-white/10 my-2" aria-hidden="true" />

        <label className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer">
          <FiDollarSign className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/45 mb-0.5">
              Budget
            </span>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={fieldClass}
              aria-label="Budget range"
            >
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </span>
        </label>

        <a
          href={href}
          className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 whitespace-nowrap"
        >
          <FiSearch className="w-4 h-4" aria-hidden="true" />
          Get a quote
        </a>
      </div>
    </div>
  );
}
