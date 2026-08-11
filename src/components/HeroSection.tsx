import Link from "next/link";
import {
  FiZap,
  FiLock,
  FiSmartphone,
  FiPenTool,
  FiTrendingUp,
  FiArrowRight,
  FiGrid,
  FiUsers,
  FiLayers,
  FiMonitor,
  FiBarChart2,
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

// ── Hero banner (coded, not an image) ────────────────────────────────────────
// The mockup below used to be a 62 KB <Image> of a rendered dashboard, and it
// was the measured desktop LCP element. Rebuilt as markup it costs zero bytes,
// stays crisp at any DPR, and removes the LCP image from the critical path
// entirely — the largest paint is now text the HTML already carries.
const mockNav = [
  { icon: FiGrid, label: "Dashboard", active: true },
  { icon: FiUsers, label: "Leads" },
  { icon: FiLayers, label: "CRM" },
  { icon: FiMonitor, label: "Websites" },
  { icon: FiBarChart2, label: "Analytics" },
];

const mockStats = [
  { label: "Active leads", value: "48" },
  { label: "Projects live", value: "12" },
  { label: "Avg. delivery", value: "7d" },
];

// Relative bar heights (%) — hand-picked to read as a plausible upward trend.
const mockBars = [38, 52, 44, 67, 58, 81, 72, 94];

const mockRows = [
  { name: "Riad Almeria", type: "Booking CRM", tone: "text-emerald-400", state: "Live" },
  { name: "Atlas Travel Co.", type: "Landing page", tone: "text-amber-400", state: "In build" },
  { name: "Medina Bistro", type: "Business site", tone: "text-emerald-400", state: "Live" },
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
          // Was text-white/40 — white at 40% on black resolves to ~#666, about
          // 3.7:1, under the WCAG AA 4.5:1 floor for body text. It is also the
          // measured LCP element on mobile and the largest above-fold text block,
          // so it was simultaneously the most prominent and least readable copy
          // on the page. /70 lands near 7:1.
          className="hero-fade-in text-sm sm:text-base text-white/70 max-w-xl mx-auto mb-10 leading-relaxed"
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
                  <div className="flex-1 flex justify-center">
                    <span className="rounded-md bg-black/40 px-3 py-1 text-[11px] text-white/35 font-medium">
                      digitalstudiolf.online
                    </span>
                  </div>
                </div>
                {/* Fake product UI. `role="img"` + aria-label makes assistive
                    tech announce one description and skip the decorative
                    innards — the equivalent of the alt text this replaced,
                    without reading out invented metrics as if they were data. */}
                <div
                  role="img"
                  aria-label="Digital Studio LF — custom dashboard and CRM system preview"
                  className="flex text-left transition-transform duration-700 group-hover:scale-[1.02]"
                >
                  {/* Sidebar */}
                  <div className="w-40 shrink-0 border-r border-white/5 bg-white/[0.02] py-4">
                    {mockNav.map(({ icon: Icon, label, active }) => (
                      <div
                        key={label}
                        className={`flex items-center gap-2.5 px-4 py-2 text-xs font-medium ${
                          active
                            ? "text-white border-l-2 border-primary bg-primary/[0.07]"
                            : "text-white/40 border-l-2 border-transparent"
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${active ? "text-primary" : ""}`} />
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* Main panel */}
                  <div className="flex-1 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-white/90">Overview</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                        <FiArrowUpRight className="w-3 h-3" />
                        +24%
                      </span>
                    </div>

                    {/* Stat tiles */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {mockStats.map(({ label, value }) => (
                        <div
                          key={label}
                          className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2.5"
                        >
                          <div className="text-lg font-bold text-white leading-none mb-1">{value}</div>
                          <div className="text-[10px] text-white/40">{label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Bar chart */}
                    <div className="flex items-end gap-1.5 h-20 mb-5">
                      {mockBars.map((h, i) => (
                        <div
                          key={i}
                          className="hero-bar flex-1 rounded-t bg-gradient-to-t from-primary/70 to-primary-light/80"
                          style={
                            { height: `${h}%`, "--delay": `${0.9 + i * 0.06}s` } as React.CSSProperties
                          }
                        />
                      ))}
                    </div>

                    {/* Recent projects */}
                    <div className="space-y-1.5">
                      {mockRows.map(({ name, type, tone, state }) => (
                        <div
                          key={name}
                          className="flex items-center justify-between rounded-md border border-white/[0.05] bg-white/[0.02] px-3 py-2"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-5 h-5 shrink-0 rounded bg-primary/15 text-primary text-[10px] font-bold grid place-items-center">
                              {name.charAt(0)}
                            </span>
                            <span className="text-[11px] font-medium text-white/80 truncate">{name}</span>
                            <span className="text-[10px] text-white/30 truncate">{type}</span>
                          </div>
                          <span className={`text-[10px] font-semibold shrink-0 ${tone}`}>{state}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
