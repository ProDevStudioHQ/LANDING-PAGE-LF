"use client";

import { m } from "framer-motion";
import { useEffect, useRef } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  // Renders the FINAL value. React state is not involved at all.
  //
  // This used to hold `useState(0)` and count up in an effect, which meant the
  // server-rendered HTML read "0 + Projects Delivered", "0 % Client
  // Satisfaction" — the real numbers only ever existed after hydration. Every
  // non-JS consumer (most crawlers, link-preview generators, plain-text
  // extractors) saw a studio advertising zero projects and zero clients.
  //
  // The count-up is a pure visual flourish on an element React never re-renders,
  // so it belongs in the DOM, not in state: the effect writes textContent
  // directly. That keeps the correct number in the SSR markup, and also avoids
  // the cascading re-render per animation frame that setState caused.
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;

    const finalText = `${target}${suffix}`;
    let frame = 0;
    let done = false;

    const runCountUp = () => {
      if (done) return;
      done = true;
      let start: number | null = null;
      const duration = 2000;
      const step = (timestamp: number) => {
        if (start === null) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        el.textContent = `${Math.floor(progress * target)}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(step);
        else el.textContent = finalText;
      };
      frame = requestAnimationFrame(step);
    };

    // Already on screen at mount → leave the number alone. Snapping to 0 and
    // counting back up in front of a reader who can already see the value is
    // worse than not animating at all.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    el.textContent = `0${suffix}`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCountUp();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);

    // Fallback: animate anyway after 1.5s (in case IO doesn't fire)
    const fallback = setTimeout(runCountUp, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
      cancelAnimationFrame(frame);
      el.textContent = finalText;
    };
  }, [target, suffix]);

  return <div ref={ref}>{target}{suffix}</div>;
}

// "5+ Years Experience" was removed: it contradicted `foundingDate: "2025"` in
// the sitewide business schema, and a claim a search engine can cross-check
// against your own structured data is worse than no claim.
const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 50, suffix: "+", label: "Happy Clients" },
];

export default function StatsStrip() {
  return (
    <section className="relative py-12 border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
