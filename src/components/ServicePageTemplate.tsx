import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  type ServiceContent,
  getServiceContent,
  getAccent,
  priceLabel,
  DEFAULT_PROCESS,
  DEFAULT_WHY,
} from "@/config/services-content";
import { getServiceDeepDive } from "@/config/services-deepdive";

// Shared template for every data-driven service page (/services/[slug]).
// Renders entirely server-side (SSR/SSG) — no client JS needed.
export default function ServicePageTemplate({ service }: { service: ServiceContent }) {
  const accent = getAccent(service.category);
  const process = service.process ?? DEFAULT_PROCESS;
  const why = service.differentiator ? [service.differentiator, ...DEFAULT_WHY] : DEFAULT_WHY;
  const showPrice = !service.isContactOnly;
  const related = service.relatedServices
    .map((slug) => getServiceContent(slug))
    .filter((s): s is ServiceContent => Boolean(s));
  const deepDive = getServiceDeepDive(service.slug);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        {/* 1) HERO */}
        <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{service.label}</span>
          </nav>
          <div className="max-w-4xl">
            <span className={`inline-block px-4 py-1.5 rounded-full border ${accent.border} ${accent.bg} ${accent.text} text-xs font-semibold uppercase tracking-widest mb-5`}>
              {service.category}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              {service.headline}
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-6 max-w-2xl">
              {service.heroDescription}
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {showPrice && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full border ${accent.border} ${accent.text} text-sm font-semibold`}>
                  {priceLabel(service)}
                </span>
              )}
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 text-white/60 text-sm">
                Delivered in {service.deliveryTime}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r ${accent.gradient} text-white font-semibold rounded-full shadow-lg hover:scale-[1.03] transition-all duration-300`}
              >
                Start your project →
              </a>
              <a
                href="#examples"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all duration-300"
              >
                View examples →
              </a>
            </div>
          </div>
        </section>

        {/* 1b) DEEP DIVE — long-form, service-specific prose (SEO depth) */}
        {deepDive && deepDive.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-white/5">
            <div className="space-y-12">
              {deepDive.map(({ heading, body }) => (
                <article key={heading}>
                  <h2 className="text-2xl sm:text-3xl font-black mb-4 leading-tight">{heading}</h2>
                  <p className="text-white/60 text-[17px] leading-[1.8]">{body}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* 2) WHAT YOU GET */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${accent.text}`}>What&apos;s included</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-10">Everything you get</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.whatYouGet.map((item) => (
              <li key={item} className="flex items-start gap-3 glass rounded-xl p-5 border border-white/10">
                <span className={`mt-0.5 ${accent.text}`} aria-hidden="true">✓</span>
                <span className="text-white/80 text-[15px] leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 3) WHO THIS IS FOR */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${accent.text}`}>Perfect for</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-8">Who this is for</h2>
          <div className="flex flex-wrap gap-3">
            {service.useCases.map((u) => (
              <span key={u} className={`px-4 py-2 rounded-full border ${accent.border} ${accent.bg} text-white/85 text-sm`}>
                {u}
              </span>
            ))}
          </div>
        </section>

        {/* 4) WHY CHOOSE US */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${accent.text}`}>Why Digital Studio LF</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-10">Why work with us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {why.map((w, i) => (
              <div key={i} className="glass rounded-xl p-6 border border-white/10">
                <span className={`text-3xl font-black ${accent.text} opacity-40 mb-3 block`}>{String(i + 1).padStart(2, "0")}</span>
                <p className="text-white/70 text-sm leading-relaxed">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5) PROCESS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <p className={`text-xs font-bold tracking-widest uppercase mb-3 text-center ${accent.text}`}>How we work</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-10 text-center">Our process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((s) => (
              <div key={s.step} className="glass rounded-xl p-6 border border-white/10">
                <span className={`text-4xl font-black ${accent.text} opacity-30 mb-3 block`}>{s.step}</span>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6) PORTFOLIO EXAMPLES (internal link block) */}
        <section id="examples" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 scroll-mt-24">
          <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${accent.text}`}>Examples</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-6">See our work</h2>
          <p className="text-white/55 text-lg max-w-2xl mb-8">
            Browse real projects we&apos;ve delivered for businesses in Morocco and worldwide — websites,
            dashboards, CRMs, and booking systems.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/portfolio"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${accent.border} ${accent.text} font-semibold hover:scale-[1.02] transition-transform`}
            >
              View our portfolio →
            </Link>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-colors"
            >
              Request relevant examples →
            </a>
          </div>
        </section>

        {/* 7) FAQ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5">
          <p className={`text-xs font-bold tracking-widest uppercase mb-3 text-center ${accent.text}`}>Frequently asked</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-10 text-center">Questions, answered</h2>
          <div className="space-y-4">
            {service.faq.map(({ question, answer }) => (
              <details key={question} className="group glass rounded-xl border border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none text-white font-semibold">
                  {question}
                  <span className={`shrink-0 transition-transform group-open:rotate-45 ${accent.text}`} aria-hidden="true">+</span>
                </summary>
                <p className="px-6 pb-5 text-white/55 text-[15px] leading-relaxed">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 8) RELATED SERVICES */}
        {related.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
            <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${accent.text}`}>You might also need</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-10">Related services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r) => {
                const ra = getAccent(r.category);
                return (
                  <Link
                    key={r.slug}
                    href={r.href}
                    className={`group glass rounded-2xl p-6 border border-white/10 ${ra.hoverBorder} transition-all duration-300`}
                  >
                    <p className={`text-xs font-bold tracking-widest uppercase mb-2 ${ra.text}`}>{r.category}</p>
                    <h3 className="text-lg font-bold mb-2">{r.label}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{r.subheadline}</p>
                    <span className={`text-sm font-semibold ${ra.text}`}>Learn more →</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* 9) CONVERSION CTA BAND */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto glass rounded-3xl p-10 sm:p-14 border border-white/10 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Ready to build your {service.label.toLowerCase()}?
            </h2>
            <p className="text-white/55 text-lg mb-8 max-w-2xl mx-auto">
              Free 30-minute consultation. Delivered in {service.deliveryTime}. Fixed price, no surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r ${accent.gradient} text-white font-semibold rounded-full shadow-lg hover:scale-[1.03] transition-all duration-300`}
              >
                Start your project →
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all duration-300"
              >
                See all services →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
