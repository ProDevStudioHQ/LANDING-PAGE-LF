"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

// Etsy-style "Learn more about this item" description. The full text is always
// in the server HTML; only its visible height is clamped until expanded.
export default function ExpandableDescription({
  text,
  html,
}: {
  text?: string;
  html?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className={`relative overflow-hidden ${open ? "" : "max-h-[15rem]"}`}>
        {html ? (
          <div className="article-prose text-[15px]" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <p className="whitespace-pre-line text-white/75 text-[15px] leading-relaxed">{text}</p>
        )}
        {!open && (
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B0B0C] to-transparent pointer-events-none" />
        )}
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white hover:bg-white/10 transition-colors"
      >
        {open ? "Less" : "Learn more about this item"}
        <HiChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
    </div>
  );
}
