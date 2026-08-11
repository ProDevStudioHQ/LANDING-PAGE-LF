import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import HeroQuoteBar from "./HeroQuoteBar";

const DEFAULT_HEADLINE = "Custom Websites, Landing Pages & CRM Systems";

// Every figure here is a claim the site already makes elsewhere — the first
// three mirror StatsStrip exactly, and the delivery window is the same one the
// trust badges and the subheadline quote. Nothing in this row is invented for
// the hero. Keep it that way: a stat that contradicts StatsStrip, the pricing
// page, or `foundingDate` in the business schema is worse than no stat, which
// is why "5+ Years Experience" was removed from StatsStrip in the first place.
const heroStats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "7–21", label: "Days To Launch" },
];

export interface HeroContent {
  headline?: string;
  subheadline?: string;
  button_label?: string;
  button_href?: string;
  secondary_label?: string;
  secondary_href?: string;
}

export default function HeroSection({ content }: { content?: HeroContent }) {
  // CRM-managed copy (Landing Page Brain) with the original copy as fallback.
  const headlineWords = (content?.headline || DEFAULT_HEADLINE).split(" ");
  const ctaLabel = content?.button_label || "See pricing";
  const ctaHref = content?.button_href || "#pricing";
  const secondaryLabel = content?.secondary_label || "View our work";
  const secondaryHref = content?.secondary_href || "/portfolio";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Full-bleed background ──────────────────────────────────────────
          `fill` + object-cover rather than a CSS background-image: it keeps the
          photo inside next/image, so it is served as WebP at a width matched to
          the viewport instead of one fixed original at every screen size. */}
      <Image
        src="/images/hero-bg.webp"
        // Decorative: the headline beside it already carries the meaning, and
        // describing the office would only add noise to a screen reader.
        alt=""
        aria-hidden="true"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Scrims. Two gradients rather than one flat overlay: the horizontal one
          buys contrast for the copy on the left while leaving the right side of
          the photo visible, and the vertical one anchors the section to the
          page background so the seam at the fold is invisible. Text sits on
          roughly black/80 at its lightest point, which clears WCAG AA. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
      <div className="absolute inset-0 opacity-[0.05] bg-grid-60" />
      {/* Brand wash — ties the cool photo to the red palette. */}
      <div className="absolute inset-0 bg-primary/[0.06] mix-blend-overlay" />

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 sm:pt-44 pb-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className="hero-fade-in flex items-center gap-3 mb-6"
            style={{ "--delay": "0.1s" } as React.CSSProperties}
          >
            <span className="h-px w-10 bg-primary" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Marrakesh, Morocco · Serving Clients Worldwide
            </span>
          </div>

          {/* Headline — word-by-word CSS reveal (no JS needed) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            {headlineWords.map((w, i) => (
              <span
                key={i}
                className="hero-word inline-block mr-[0.25em]"
                style={{ "--delay": `${i * 0.04}s` } as React.CSSProperties}
              >
                {w}{" "}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            className="hero-fade-in text-base sm:text-lg text-white/75 max-w-2xl mb-3 leading-relaxed"
            style={{ "--delay": "0.5s" } as React.CSSProperties}
          >
            {content?.subheadline ? (
              content.subheadline
            ) : (
              <>
                A <span className="text-white font-medium">web design &amp; development agency</span>{" "}
                building custom websites, landing pages, admin dashboards &amp; CRM systems —{" "}
                <span className="text-white font-medium">from scratch in 7–21 days</span>.
              </>
            )}
          </p>
          <p
            // /70 rather than the /40 this once used: white at 40% on black is
            // ~3.7:1, under the WCAG AA 4.5:1 floor for body text, and this is
            // the largest above-fold text block on mobile.
            className="hero-fade-in text-sm sm:text-base text-white/70 max-w-2xl mb-9 leading-relaxed"
            style={{ "--delay": "0.58s" } as React.CSSProperties}
          >
            Websites &amp; CRM systems for riads, hotels, travel agencies, restaurants and
            businesses worldwide, from your{" "}
            <Link
              href="/web-design-morocco"
              className="text-white/80 font-medium underline decoration-white/25 underline-offset-2 hover:text-white transition-colors"
            >
              web design agency in Marrakesh
            </Link>
            . French &amp; Arabic support available.
          </p>

          {/* Quote bar */}
          <div
            className="hero-fade-in mb-6"
            style={{ "--delay": "0.66s" } as React.CSSProperties}
          >
            <HeroQuoteBar />
          </div>

          {/* CTAs */}
          <div
            className="hero-fade-in flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-12"
            style={{ "--delay": "0.72s" } as React.CSSProperties}
          >
            <a
              href={ctaHref}
              title={ctaLabel}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 bg-white/[0.06] text-white font-semibold hover:bg-white/[0.12] hover:border-white/35 transition-all duration-300 text-sm backdrop-blur-sm"
            >
              {ctaLabel}
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={secondaryHref}
              title={secondaryLabel}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white/70 font-semibold hover:text-white transition-colors text-sm"
            >
              {secondaryLabel}
            </a>
          </div>

          {/* Stats */}
          <div
            className="hero-fade-in grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-white/10"
            style={{ "--delay": "0.8s" } as React.CSSProperties}
          >
            {heroStats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-none mb-1.5">
                  {value}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue. Decorative and duplicated by the CTAs above, so it is
          hidden from assistive tech rather than announced as a stray link. */}
      <a
        href="#services"
        aria-hidden="true"
        tabIndex={-1}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
          Scroll to explore
        </span>
        <FiChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
