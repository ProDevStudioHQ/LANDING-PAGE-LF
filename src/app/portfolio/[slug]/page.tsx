import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPortfolioItem } from "@/lib/crm-content";

// ISR rather than force-dynamic. The old setting made every article render
// per-request and ship `Cache-Control: private, no-cache, no-store` — public
// marketing content opted out of caching at every layer, and cf-cache-status
// was DYNAMIC on 100% of these pages. It bought nothing in freshness either:
// the underlying CRM fetch is already cached for 300s, so force-dynamic only
// skipped the page cache, not the data cache.
//
// generateStaticParams is exported empty rather than omitted: with no such
// export at all, Next classifies the segment as fully dynamic and skips the
// page cache entirely, so `revalidate` on its own changed nothing. Exporting
// it (dynamicParams defaults to true) marks the route as ISR with zero
// prebuilt paths — slugs created after the last deploy still render on
// demand, but the result is cached and revalidated on the same 300s cycle.
export const revalidate = 300;

export function generateStaticParams() {
  return [];
}

const SITE_URL = "https://digitalstudiolf.online";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPortfolioItem(slug);
  if (!data) return { title: "Project not found" };
  const { item } = data;
  // CRM-fed copy can overflow SERP limits — clamp on a word boundary so
  // titles/metas never truncate mid-sentence in results.
  const clamp = (s: string, max: number) => {
    const t = s.trim();
    if (t.length <= max) return t;
    const cut = t.slice(0, max - 1);
    return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max - 21))}…`;
  };
  const title = clamp(item.meta_title || `${item.title} — Portfolio`, 60);
  const description = clamp(
    item.meta_description || item.short_description || item.subtitle || "Project by Digital Studio LF.",
    158,
  );
  const image = item.hero_image_url || item.thumbnail_url || undefined;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      title: { absolute: title },
      description,
      url: `${SITE_URL}/portfolio/${slug}`,
      type: "article",
      images: image ? [image] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPortfolioItem(slug);
  if (!data) notFound();
  const { item, testimonials, related } = data;

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    headline: item.title,
    description: item.short_description || item.subtitle || undefined,
    image: item.hero_image_url || item.thumbnail_url || undefined,
    url: `${SITE_URL}/portfolio/${item.slug}`,
    dateCreated: item.completed_date || item.published_at || undefined,
    creator: { "@id": "https://digitalstudiolf.online/#business" },
    keywords: item.tags?.join(", ") || undefined,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: `${SITE_URL}/portfolio` },
      { "@type": "ListItem", position: 3, name: item.title, item: `${SITE_URL}/portfolio/${item.slug}` },
    ],
  };

  // CRM may store either field, and empty strings / bare domains are common —
  // only render the button for something a browser can actually open.
  const rawLive = (item.live_url || item.demo_url || "").trim();
  const liveUrl = rawLive
    ? /^https?:\/\//i.test(rawLive)
      ? rawLive
      : `https://${rawLive.replace(/^\/+/, "")}`
    : null;

  // Every portfolio demo currently lives on a subdomain of digitalstudiolf.online
  // (gym., aurum., sneaker., …). Semrush counts those as outgoing external links
  // because the hostname differs, and they were carrying rel="nofollow" — which
  // means the site was telling Google not to follow links to its own property.
  // These are the proof of work the portfolio exists to show, so they get
  // followed. A genuine client domain keeps nofollow: it is not ours, ownership
  // can change, and it should be reviewed case by case before vouching for it.
  let liveUrlIsFirstParty = false;
  if (liveUrl) {
    try {
      liveUrlIsFirstParty = /(^|\.)digitalstudiolf\.online$/i.test(new URL(liveUrl).hostname);
    } catch {
      liveUrlIsFirstParty = false;
    }
  }
  const liveUrlRel = liveUrlIsFirstParty
    ? "noopener noreferrer"
    : "noopener noreferrer nofollow";

  const facts: { label: string; value: string }[] = [];
  if (item.category) facts.push({ label: "Type", value: item.category });
  if (item.client_industry) facts.push({ label: "Industry", value: item.client_industry });
  if (item.client_name) facts.push({ label: "Client", value: item.client_name });
  if (item.year) facts.push({ label: "Year", value: String(item.year) });
  if (item.timeline) facts.push({ label: "Timeline", value: item.timeline });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="relative min-h-screen blog-surface text-white">
        <article className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <nav className="text-sm text-white/60 mb-10 flex justify-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/70">{item.title}</span>
          </nav>

          {/* Centered editorial header */}
          <header className="text-center mb-14">
            {item.category && (
              <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.18em] mb-6">
                {item.category}
              </span>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-[-0.03em] mb-5 bg-gradient-to-b from-white to-white/65 bg-clip-text text-transparent">
              {item.title}
            </h1>
            {item.subtitle && (
              <p className="text-white/55 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">{item.subtitle}</p>
            )}
          </header>

          {item.hero_image_url && (
            <figure className="relative mb-14">
              {/* Soft brand glow behind the frame — pure decoration, sits under the image. */}
              <div aria-hidden className="absolute -inset-x-10 -top-6 bottom-6 bg-primary/15 blur-3xl rounded-full opacity-60" />
              <div className="relative aspect-[16/9] rounded-[1.75rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl shadow-black/60 ring-1 ring-white/5">
                <Image
                  src={item.hero_image_url}
                  alt={`${item.title}${item.category ? ` — ${item.category}` : ""} built by Digital Studio LF`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
              </div>
            </figure>
          )}

          {/* Facts — centered, divider-separated */}
          {facts.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-y-6 pb-12 mb-14 border-b border-white/10">
              {facts.map((f, i) => (
                <div
                  key={f.label}
                  className={`px-6 sm:px-9 text-center ${i > 0 ? "sm:border-l sm:border-white/10" : ""}`}
                >
                  <p className="text-white/35 text-[0.7rem] uppercase tracking-[0.18em] mb-1.5">{f.label}</p>
                  <p className="text-white font-semibold text-lg">{f.value}</p>
                </div>
              ))}
            </div>
          )}

          <div className="article-prose">
            {item.public_description && <p>{item.public_description}</p>}
            {item.challenge && (
              <>
                <h2>The Challenge</h2>
                <p>{item.challenge}</p>
              </>
            )}
            {item.solution && (
              <>
                <h2>The Solution</h2>
                <p>{item.solution}</p>
              </>
            )}
          </div>

          {/* Results */}
          {item.results?.length > 0 && (
            <section className="mt-20">
              <h2 className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-white/40 mb-10">Results</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {item.results.map((r, i) => (
                  <div
                    key={`${r.metric}-${i}`}
                    className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-6 text-center hover:border-primary/30 transition-colors"
                  >
                    {r.value && (
                      <p className="text-4xl sm:text-[2.75rem] leading-none font-black tracking-[-0.03em] bg-gradient-to-b from-white to-primary/80 bg-clip-text text-transparent mb-3">
                        {r.value}
                      </p>
                    )}
                    <p className="text-white/55 text-sm leading-relaxed">{r.metric}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Gallery */}
          {item.gallery_images?.length > 0 && (
            <section className="mt-20">
              <h2 className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-white/40 mb-10">Gallery</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {item.gallery_images.map((url) => (
                  <div key={url} className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-xl shadow-black/40">
                    <Image
                      src={url}
                      alt={item.gallery_meta?.[url] || item.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Project meta card — services / technologies / tools */}
          {(item.tech_stack?.length > 0 || item.tools_used?.length > 0 || item.services_provided?.length > 0) && (
            <section className="mt-20 rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-8 sm:p-10 shadow-2xl shadow-black/40">
              <div className="space-y-9">
                {item.services_provided?.length > 0 && (
                  <div className="text-center">
                    <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40 mb-4">Services</h3>
                    <div className="flex flex-wrap justify-center gap-2.5">
                      {item.services_provided.map((t) => (
                        <span key={t} className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
                {item.tech_stack?.length > 0 && (
                  <div className="text-center">
                    <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40 mb-4">Technologies</h3>
                    <div className="flex flex-wrap justify-center gap-2.5">
                      {item.tech_stack.map((t) => (
                        <span key={t} className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.03] text-white/75 text-sm font-medium hover:border-white/30 transition-colors">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
                {item.tools_used?.length > 0 && (
                  <div className="text-center">
                    <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40 mb-4">Tools</h3>
                    <div className="flex flex-wrap justify-center gap-2.5">
                      {item.tools_used.map((t) => (
                        <span key={t} className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.03] text-white/75 text-sm font-medium hover:border-white/30 transition-colors">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Testimonials */}
          {testimonials.length > 0 && (
            <div className="mt-20 space-y-5">
              {testimonials.map((t) => (
                <blockquote key={t.id} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-8 sm:p-10 text-center">
                  <p className="text-white/85 text-lg sm:text-xl italic leading-relaxed mb-5">“{t.testimonial_text}”</p>
                  <footer className="text-sm text-white/45">
                    {t.client_name}
                    {t.client_role ? `, ${t.client_role}` : ""}
                    {t.client_company ? ` · ${t.client_company}` : ""}
                  </footer>
                </blockquote>
              ))}
            </div>
          )}

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-20 pt-14 border-t border-white/10">
              <h2 className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-white/40 mb-10">More work</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/portfolio/${r.slug}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-primary/30 hover:bg-white/[0.06] transition-all text-sm font-medium text-white/70 hover:text-primary"
                  >
                    {r.title} →
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="relative mt-20 overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-6 py-14 text-center">
            <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[28rem] h-48 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.02em] mb-4">Want something like this?</h2>
              <p className="text-white/55 max-w-xl mx-auto mb-9 leading-relaxed">Tell us about your project — free consultation, proposal within 24 hours.</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark hover:-translate-y-0.5 shadow-lg shadow-primary/25 transition-all"
              >
                Démarrer un projet similaire
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel={liveUrlRel}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-primary/50 bg-primary/10 text-white font-semibold hover:bg-primary hover:border-primary hover:-translate-y-0.5 transition-all"
                >
                  Voir le site live
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                    <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </a>
              )}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
