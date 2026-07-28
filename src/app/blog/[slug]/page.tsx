import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import ReadingProgress from "@/components/ReadingProgress";
import ArticleTOC from "@/components/ArticleTOC";
import ArticleCTA from "@/components/ArticleCTA";
import ArticleCover from "@/components/ArticleCover";
import { getNewsPost } from "@/lib/crm-content";
import { isRealPersonName } from "@/lib/schema";

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
  const data = await getNewsPost(slug);
  if (!data) return { title: "Article not found" };
  const { post } = data;
  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt || "";
  const image = post.og_image_url || post.cover_image_url || undefined;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: post.canonical_url || `/blog/${slug}` },
    robots: post.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: { absolute: title },
      description,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at || undefined,
      images: image ? [image] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
  };
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getNewsPost(slug);
  if (!data) notFound();
  const { post, related } = data;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo_description || post.excerpt || undefined,
    image: post.og_image_url || post.cover_image_url || undefined,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at || post.published_at || undefined,
    // A brand fallback must not be typed Person; the business node (rendered
    // sitewide from the root layout) is referenced by @id instead.
    //
    // The guard also has to cover the CRM *supplying* the brand as the author —
    // every post currently comes back with author_display_name "Digital Studio
    // LF", which was being emitted as {"@type":"Person","name":"Digital Studio
    // LF"}: a company declared as a human. Only treat the value as a Person when
    // it is actually a different name from the business.
    author: isRealPersonName(post.author_display_name)
      ? { "@type": "Person", name: post.author_display_name }
      : { "@id": `${SITE_URL}/#business` },
    // @id alone is enough — the sitewide business node already carries name,
    // url and logo. Restating them here just risks them drifting apart.
    publisher: { "@id": `${SITE_URL}/#business` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <ReadingProgress />
      <ArticleTOC />
      <main className="relative min-h-screen blog-surface text-white">
        <article className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <nav className="text-sm text-white/40 mb-8 flex gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/70 line-clamp-1">{post.title}</span>
          </nav>

          {post.category_name && (
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
              {post.category_name}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-white/40 text-sm mb-10">
            {post.author_display_name && <span>{post.author_display_name}</span>}
            {post.published_at && (
              <>
                <span>·</span>
                <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
              </>
            )}
            {post.reading_time_minutes && (
              <>
                <span>·</span>
                <span>{post.reading_time_minutes} min read</span>
              </>
            )}
          </div>

          {post.cover_image_url && (
            <ArticleCover
              src={post.cover_image_url}
              alt={post.cover_image_alt || post.title}
            />
          )}

          {/* content_html is sanitized at source (CRM). Rendered as the prose
              element itself so the .article-prose child selectors style it. */}
          <div className="article-prose" dangerouslySetInnerHTML={{ __html: post.content_html }} />

          {post.tags?.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t.slug} className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300">#{t.name}</span>
              ))}
            </div>
          )}

          <ShareButtons title={post.title} />
          <ArticleCTA />

          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-white/10">
              <h2 className="text-xl font-black mb-6">Keep reading</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="glass rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-all text-sm text-white/70 hover:text-primary">
                    {r.title} →
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
