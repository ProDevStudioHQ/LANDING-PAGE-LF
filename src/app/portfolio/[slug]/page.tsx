import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPortfolioItem } from "@/lib/crm-content";

// Rendered on-demand: static generation here would 404/throw for any item not
// prebuilt at deploy time. The CRM fetch is still cached for 300s
// (next.revalidate in crm-content), so this stays fast.
export const dynamic = "force-dynamic";

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
  const title = item.meta_title || `${item.title} — Portfolio`;
  const description =
    item.meta_description || item.short_description || item.subtitle || "Project by Digital Studio LF.";
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
    creator: { "@type": "Organization", name: "Digital Studio LF", url: SITE_URL },
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
          <nav className="text-sm text-white/40 mb-8 flex gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-white/70">{item.title}</span>
          </nav>

          {item.category && (
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
              {item.category}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4">{item.title}</h1>
          {item.subtitle && <p className="text-white/55 text-lg max-w-2xl mb-8">{item.subtitle}</p>}

          {item.hero_image_url && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 mb-10 bg-white/5">
              <Image
                src={item.hero_image_url}
                alt={item.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          )}

          {/* Facts + actions */}
          {(facts.length > 0 || item.live_url || item.demo_url) && (
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pb-8 mb-10 border-b border-white/10">
              {facts.map((f) => (
                <div key={f.label}>
                  <p className="text-white/35 text-xs uppercase tracking-wide">{f.label}</p>
                  <p className="text-white font-medium">{f.value}</p>
                </div>
              ))}
              <div className="flex gap-3 ml-auto">
                {item.live_url && (
                  <a href={item.live_url} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors">
                    Visit live site →
                  </a>
                )}
                {item.demo_url && (
                  <a href={item.demo_url} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full border border-white/15 text-white/80 text-sm font-semibold hover:border-primary/40 hover:text-primary transition-colors">
                    Live demo →
                  </a>
                )}
              </div>
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
            <div className="mt-12">
              <h2 className="text-2xl font-black mb-5">Results</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {item.results.map((r, i) => (
                  <div key={`${r.metric}-${i}`} className="flex gap-3 items-start glass rounded-xl p-4 border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-white/70 text-sm">
                      {r.value && <strong className="text-white">{r.value}</strong>}
                      {r.value && r.metric ? " " : ""}
                      {r.metric}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {item.gallery_images?.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-black mb-5">Gallery</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {item.gallery_images.map((url) => (
                  <div key={url} className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-white/5">
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
            </div>
          )}

          {/* Tech / tools / services */}
          {(item.tech_stack?.length > 0 || item.tools_used?.length > 0 || item.services_provided?.length > 0) && (
            <div className="mt-12 grid sm:grid-cols-3 gap-6">
              {item.tech_stack?.length > 0 && (
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-white/40 mb-3">Tech stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tech_stack.map((t) => <span key={t} className="px-2.5 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300">{t}</span>)}
                  </div>
                </div>
              )}
              {item.tools_used?.length > 0 && (
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-white/40 mb-3">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tools_used.map((t) => <span key={t} className="px-2.5 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300">{t}</span>)}
                  </div>
                </div>
              )}
              {item.services_provided?.length > 0 && (
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-white/40 mb-3">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.services_provided.map((t) => <span key={t} className="px-2.5 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300">{t}</span>)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Testimonials */}
          {testimonials.length > 0 && (
            <div className="mt-12 space-y-4">
              {testimonials.map((t) => (
                <blockquote key={t.id} className="glass rounded-2xl p-6 border border-white/10">
                  <p className="text-white/80 italic leading-relaxed mb-3">“{t.testimonial_text}”</p>
                  <footer className="text-sm text-white/50">
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
            <div className="mt-16 pt-10 border-t border-white/10">
              <h2 className="text-xl font-black mb-6">More work</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/portfolio/${r.slug}`} className="glass rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-all text-sm text-white/70 hover:text-primary">
                    {r.title} →
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-10 text-center">
            <h2 className="text-2xl font-black mb-3">Want something like this?</h2>
            <p className="text-white/55 max-w-xl mx-auto mb-6">Tell us about your project — free consultation, proposal within 24 hours.</p>
            <Link href="/contact" className="inline-block px-7 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-colors">
              Start your project →
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
