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

const headlineWords =
  "Web Design & Custom Software Development Agency in Morocco".split(" ");

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-48 sm:pt-56">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden md:block absolute top-[18%] left-1/2 -translate-x-1/2 w-[700px] h-[420px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="hidden md:block absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline — word-by-word CSS reveal (no JS needed) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight mb-5">
          {headlineWords.map((w, i) => (
            <span
              key={i}
              className="hero-word inline-block mr-[0.25em]"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              {w}
            </span>
          ))}
        </h1>

        {/* Subtitle — LCP candidate; shown immediately on mobile via CSS */}
        <p
          className="hero-fade-in text-base sm:text-lg text-white/55 max-w-2xl mx-auto mb-4 leading-relaxed"
          style={{ animationDelay: "0.5s" }}
        >
          Landing pages, business websites, admin dashboards &amp; CRM systems —{" "}
          <span className="text-white/80 font-medium">built from scratch in 7–21 days</span>.
        </p>
        <p
          className="hero-fade-in text-sm sm:text-base text-white/40 max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ animationDelay: "0.58s" }}
        >
          Based in{" "}
          <span className="text-white/60 font-medium">Marrakesh, Morocco</span> — serving
          riads, hotels, travel agencies, restaurants, and businesses{" "}
          <span className="text-white/60 font-medium">worldwide</span>. French &amp; Arabic
          support available.
        </p>

        {/* CTAs */}
        <div
          className="hero-fade-in flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          style={{ animationDelay: "0.65s" }}
        >
          <a
            href="#pricing"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.04] transition-all duration-300 text-base"
          >
            See pricing
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/portfolio"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/[0.03] text-white/80 font-semibold hover:bg-white/[0.07] hover:border-white/30 hover:text-white transition-all duration-300 text-base backdrop-blur-sm"
          >
            View our work
          </a>
        </div>

        {/* Trust Badges */}
        <div
          className="hero-fade-in flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-2"
          style={{ animationDelay: "0.75s" }}
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
                  src="/images/idea-digital.png"
                  alt="Digital Studio LF — premium dashboard and CRM product preview"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1280px) 80vw, 1024px"
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
