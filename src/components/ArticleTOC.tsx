"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string };

// Quiet, sticky table of contents shown only on wide desktops. Scans the
// article body for top-level H2 headings, assigns stable ids, and highlights
// the section currently in view. Aids dwell time on long reads without clutter.
export default function ArticleTOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  // The TOC is position:fixed, so without this it would overlap the site
  // footer once the reader scrolls to the bottom. Hide it while the footer
  // is in view.
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(".article-prose h2")
    ).filter((n) => !n.closest(".glass") && !n.closest(".not-prose"));
    const items: Heading[] = nodes.map((node, i) => {
      if (!node.id) {
        node.id =
          node.textContent
            ?.toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .slice(0, 60) || `section-${i}`;
      }
      return { id: node.id, text: node.textContent || "" };
    });
    // Headings only exist in the DOM after mount — scanning them here and
    // syncing to state once is the intended use of an effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(items);

    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    nodes.forEach((n) => observer.observe(n));

    // Hide the fixed TOC while the footer is on screen so the two never overlap.
    const footer = document.querySelector("footer");
    let footerObserver: IntersectionObserver | undefined;
    if (footer) {
      footerObserver = new IntersectionObserver(
        ([entry]) => setFooterVisible(entry.isIntersecting),
      );
      footerObserver.observe(footer);
    }

    return () => {
      observer.disconnect();
      footerObserver?.disconnect();
    };
  }, []);

  if (headings.length < 3) return null;

  return (
    <aside
      aria-hidden={footerVisible}
      className={`article-toc hidden xl:block fixed left-[max(1.5rem,calc((100vw-44rem)/2-15rem))] top-40 w-52 transition-opacity duration-300 ${
        footerVisible ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <p className="text-xs uppercase tracking-wider text-white/30 mb-3 pl-[0.85rem]">
        Contents
      </p>
      <nav aria-label="Table of contents">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={h.id === activeId ? "is-active" : ""}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
              history.replaceState(null, "", `#${h.id}`);
            }}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
