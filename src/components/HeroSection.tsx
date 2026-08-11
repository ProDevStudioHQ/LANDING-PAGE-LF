import Image from "next/image";
import Link from "next/link";
import {
  FiZap,
  FiLock,
  FiSmartphone,
  FiPenTool,
  FiTrendingUp,
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";

const trustBadges = [
  { icon: FiZap, label: "7–21 Day Delivery" },
  { icon: FiLock, label: "Secure Code" },
  { icon: FiSmartphone, label: "Fully Responsive" },
  { icon: FiPenTool, label: "Premium Design" },
  { icon: FiTrendingUp, label: "SEO Optimized" },
];

const DEFAULT_HEADLINE = "Custom Websites, Landing Pages & CRM Systems";

// Relative bar heights (%) for the sparkline in the floating stat card —
// hand-picked to read as a plausible upward trend.
const sparkBars = [38, 52, 44, 67, 58, 94];

// Supporting photography under the main shot. Hidden below `md`: on a phone the
// hero is already tall once the copy stacks above the main image, and two more
// photos push the CTAs far below the fold for no gain.
const supportingShots = [
  {
    src: "/images/hero-team.webp",
    alt: "Two developers building a client web application at their desks",
    label: "Development",
  },
  {
    src: "/images/hero-design.webp",
    alt: "Designer arranging mobile app wireframes and user flows on a wall",
    label: "UX & Design",
  },
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
    <section className="relative min-h-screen flex items-center overflow-hidden pt-48 sm:pt-56 lg:pt-40 pb-16">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden md:block absolute top-[18%] left-1/2 -translate-x-1/2 w-[700px] h-[420px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="hidden md:block absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 opacity-[0.04] bg-grid-60" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split banner: copy left, photography right. Single column until `lg`,
            where there is finally enough width for a 44ch measure beside a
            readable image. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          {/* ── Left: copy ─────────────────────────────────────────────── */}
          <div className="text-center lg:text-left">
            {/* Headline — word-by-word CSS reveal (no JS needed) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black leading-[1.08] tracking-tight mb-5">
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
              className="hero-fade-in text-base sm:text-lg text-white/55 max-w-2xl mx-auto lg:mx-0 mb-4 leading-relaxed"
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
              // Was text-white/40 — white at 40% on black resolves to ~#666, about
              // 3.7:1, under the WCAG AA 4.5:1 floor for body text. It is also the
              // measured LCP element on mobile and the largest above-fold text block,
              // so it was simultaneously the most prominent and least readable copy
              // on the page. /70 lands near 7:1.
              className="hero-fade-in text-sm sm:text-base text-white/70 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              style={{ "--delay": "0.58s" } as React.CSSProperties}
            >
              Your{" "}
              <Link href="/web-design-morocco" className="text-white/60 font-medium underline decoration-white/20 underline-offset-2 hover:text-white transition-colors">
                web design agency in Marrakesh, Morocco
              </Link>{" "}
              —
              building websites &amp; CRM systems for riads, hotels, travel agencies, restaurants,
              and businesses <span className="text-white/60 font-medium">worldwide</span>. French &amp; Arabic
              support available.
            </p>

            {/* CTAs */}
            <div
              className="hero-fade-in flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 mb-10"
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
              className="hero-fade-in flex flex-wrap items-center lg:justify-start justify-center gap-2 sm:gap-3"
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
          </div>

          {/* ── Right: photography ─────────────────────────────────────── */}
          <div className="hero-slide-up relative">
            {/* Main shot, framed as a browser window so the stock photo reads as
                product rather than decoration. */}
            <div className="group relative glass rounded-2xl p-2 glow-red transition-[border-color] duration-500 hover:border-red-500/30">
              <div className="relative rounded-xl overflow-hidden bg-black/50 border border-white/10">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <div className="flex-1 flex justify-center">
                    <span className="rounded-md bg-black/40 px-3 py-1 text-[11px] text-white/35 font-medium">
                      digitalstudiolf.online
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src="/images/hero-dashboard.webp"
                    alt="Analytics dashboard built by Digital Studio LF, open on a laptop"
                    title="Custom analytics dashboard & CRM system by Digital Studio LF"
                    width={1320}
                    height={880}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    // Above the fold in every layout, so it must not lazy-load:
                    // `priority` emits fetchpriority="high" plus a preload whose
                    // imagesrcset matches what the <img> actually requests.
                    //
                    // Unlike the image this replaced, the preload is now correct
                    // for mobile too — the shot renders at every breakpoint
                    // rather than being `hidden md:block`, so there is no
                    // viewport where the preload fetches bytes nothing uses.
                    priority
                    fetchPriority="high"
                    // Half the 1280px container above `lg`, near-full width below.
                    sizes="(min-width: 1024px) 620px, (min-width: 640px) 90vw, 100vw"
                    // No `quality` prop: Next 16 ignores any value not listed in
                    // images.qualities and silently serves q=75.
                  />
                  {/* Scrim. The source photo is bright and cool-toned; without
                      this it floats off a near-black page. Also darkens the
                      lower edge so the stat card keeps its contrast. */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-0 pointer-events-none bg-primary/[0.07] mix-blend-overlay" />
                </div>
              </div>

              {/* Floating stat card — coded, not part of the photo, so the
                  numbers stay editable and stay sharp at any DPR. */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 glass rounded-xl px-4 py-3 border border-white/10 shadow-xl shadow-black/40 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-xl font-bold text-white leading-none mb-1">48</div>
                    <div className="text-[10px] text-white/45 whitespace-nowrap">Active leads</div>
                  </div>
                  <div className="flex items-end gap-1 h-9" aria-hidden="true">
                    {sparkBars.map((h, i) => (
                      <div
                        key={i}
                        className="hero-bar w-1.5 rounded-t bg-gradient-to-t from-primary/70 to-primary-light/80"
                        style={
                          { height: `${h}%`, "--delay": `${1 + i * 0.07}s` } as React.CSSProperties
                        }
                      />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-400">
                    <FiArrowUpRight className="w-3 h-3" />
                    24%
                  </span>
                </div>
              </div>
            </div>

            {/* Supporting shots */}
            <div className="hidden md:grid grid-cols-2 gap-4 mt-10">
              {supportingShots.map(({ src, alt, label }) => (
                <div
                  key={src}
                  className="group relative rounded-xl overflow-hidden border border-white/10"
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={640}
                    height={480}
                    loading="lazy"
                    className="w-full h-32 lg:h-36 object-cover saturate-[0.85] transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 300px, 45vw"
                  />
                  {/* Heavier scrim than the main shot: these two source photos
                      are near-white, and the label sits directly on them. */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                  <span className="absolute bottom-2.5 left-3 text-[11px] font-semibold text-white/90">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
