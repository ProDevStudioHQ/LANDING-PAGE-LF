import Image from "next/image";
import {
  FiZap,
  FiLock,
  FiSmartphone,
  FiPenTool,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";

const trustBadges = [
  { icon: FiZap, label: "Fast Delivery" },
  { icon: FiLock, label: "Secure Code" },
  { icon: FiSmartphone, label: "Fully Responsive" },
  { icon: FiPenTool, label: "Premium Design" },
  { icon: FiTrendingUp, label: "SEO Optimized" },
];

const DEFAULT_HEADLINE = "Web Design & Development Agency in Marrakesh Morocco";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-48 sm:pt-56">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden md:block absolute top-[18%] left-1/2 -translate-x-1/2 w-[700px] h-[420px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="hidden md:block absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 opacity-[0.04] bg-grid-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline — word-by-word CSS reveal (no JS needed) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight mb-5">
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

        {/* Subtitle — LCP candidate; shown immediately on mobile via CSS */}
        <p
          className="hero-fade-in text-base sm:text-lg text-white/55 max-w-2xl mx-auto mb-4 leading-relaxed"
          style={{ "--delay": "0.5s" } as React.CSSProperties}
        >
          {content?.subheadline ? (
            content.subheadline
          ) : (
            <>
              A <span className="text-white/80 font-medium">web design &amp; development agency</span>{" "}
              building custom websites, landing pages, admin dashboards &amp; CRM systems —{" "}
              <span className="text-white/80 font-medium">from scratch in 7–21 days</span>.
            </>
          )}
        </p>
        <p
          className="hero-fade-in text-sm sm:text-base text-white/40 max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ "--delay": "0.58s" } as React.CSSProperties}
        >
          Your <span className="text-white/60 font-medium">web design agency in Marrakesh, Morocco</span> —
          building websites &amp; CRM systems for riads, hotels, travel agencies, restaurants,
          and businesses <span className="text-white/60 font-medium">worldwide</span>. French &amp; Arabic
          support available.
        </p>

        {/* CTAs */}
        <div
          className="hero-fade-in flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          style={{ "--delay": "0.65s" } as React.CSSProperties}
        >
          <a
            href={ctaHref}
            title={ctaLabel}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.04] transition-all duration-300 text-base"
          >
            {ctaLabel}
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={secondaryHref}
            title={secondaryLabel}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/[0.03] text-white/80 font-semibold hover:bg-white/[0.07] hover:border-white/30 hover:text-white transition-all duration-300 text-base backdrop-blur-sm"
          >
            {secondaryLabel}
          </a>
        </div>

        {/* Trust Badges */}
        <div
          className="hero-fade-in flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-2"
          style={{ "--delay": "0.75s" } as React.CSSProperties}
        >
          {trustBadges.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs sm:text-sm font-semibold text-white/60 hover:text-white hover:border-primary/40 hover:bg-primary/[0.06] transition-all duration-200 cursor-default select-none"
            >
              <Icon className="w-4 h-4 text-primary flex-shrink-0" />
              {label}
            </span>
          ))}
        </div>

        {/* Floating mockup card — desktop only */}
        <div className="hero-slide-up hidden md:block mt-16 relative max-w-4xl mx-auto">
          <div className="relative group">
            <div className="glass rounded-2xl p-2 glow-red relative overflow-hidden transition-[opacity,border-color] duration-500 hover:border-red-500/30">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none rounded-2xl" />
              <div className="relative rounded-xl overflow-hidden bg-black/50 border border-white/10">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <Image
                  src="/images/idea-digital.webp"
                  alt="Digital Studio LF — premium dashboard and CRM product preview"
                  title="Digital Studio LF — custom dashboard & CRM system preview"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 896px) 880px, 90vw"
                  quality={80}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
