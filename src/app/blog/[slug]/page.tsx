import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import ReadingProgress from "@/components/ReadingProgress";
import ArticleTOC from "@/components/ArticleTOC";
import ArticleCTA from "@/components/ArticleCTA";
import { solutionsForPost } from "@/config/content-links";
import ArticleCover from "@/components/ArticleCover";
import { getNewsPost } from "@/lib/crm-content";
import { BLOG_HREFLANG_FR, BLOG_LINK_TARGETS, crmBlogSlug, publicBlogSlug } from "@/config/blog-slugs";
import { BLOG_SEO, blogHeading, blogLanguage } from "@/config/blog-seo";
import { isRetiredBlogSlug } from "@/config/retired-content";
import WebsitePriceSummary from "@/components/WebsitePriceSummary";
import { isRealPersonName, pageGraphJson } from "@/lib/schema";

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

// `slug` is the public slug. Renamed posts are still stored under their old
// CRM slug (src/config/blog-slugs.ts); fall back to the public slug in case
// the CRM has since been renamed to match.
async function getPost(slug: string) {
  const crmSlug = crmBlogSlug(slug);
  return (await getNewsPost(crmSlug)) ?? (crmSlug !== slug ? getNewsPost(slug) : null);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPost(slug);
  if (!data) return { title: "Article not found" };
  const { post } = data;

  // seo_title is the SERP title the CRM stores; post.title is the article
  // heading. Several values still arrive cut mid-word by the CRM's old
  // 60-char save cap, so src/config/blog-seo.ts overrides win when present.
  const override = BLOG_SEO[slug];
  const title = override?.title || post.seo_title || blogHeading(slug, post.title);
  const description = override?.description || post.seo_description || post.excerpt || "";
  const image = post.og_image_url || post.cover_image_url || undefined;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: post.canonical_url || `/blog/${slug}`,
      // Reciprocal with the French page's own alternates.
      ...(BLOG_HREFLANG_FR[slug]
        ? {
            languages: {
              en: `/blog/${slug}`,
              fr: BLOG_HREFLANG_FR[slug],
              "x-default": `/blog/${slug}`,
            },
          }
        : {}),
    },
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

// The blog lived at /news before the rename, and the content pipeline baked a
// "read the latest industry news" link pointing at /news into the body of every
// article it generated. next.config.ts 308s /news → /blog, so the links work —
// they just cost every reader and every crawler a round trip, and a redirected
// internal link passes less than a direct one. Every published post carries at
// least one; two also deep-link to /news/<slug>.
//
// Rewriting on render rather than in the CRM because the href sits inside
// author content: fixing it at source means editing every post by hand and
// hoping nobody pastes the old boilerplate back. This repairs the ones that
// exist and any that return.
//
// Rewriting /news/<slug> is safe even for the four posts that were re-slugged
// during the rename: next.config.ts redirects /blog/<old-slug> as well as
// /news/<old-slug>, so a stale slug still lands on the right article. The
// lookahead keeps /newsletter and /news-roundup out of it.
//
// After that, links to a post that now redirects elsewhere (a renamed slug or
// a retired post, see BLOG_LINK_TARGETS) are pointed at the final URL, with or
// without the site origin, so no article links into a redirect.
const REDIRECTED_POST_LINK = new RegExp(
  `(href=")(?:https://digitalstudiolf\\.online)?/blog/(${Object.keys(BLOG_LINK_TARGETS).join("|")})(?=["?#])`,
  "g"
);

// /free-audit was never built; next.config.ts sends it to /contact with a
// temporary redirect. Several CRM articles still link to it.
function modernizeLegacyLinks(html: string): string {
  return html
    .replace(/(href=")(?:https:\/\/digitalstudiolf\.online)?\/free-audit(?=["?#])/g, "$1/contact")
    .replace(/(href=")\/news(?=["/?#])/g, "$1/blog")
    .replace(/(href=")https:\/\/digitalstudiolf\.online\/news(?=["/?#])/g, "$1/blog")
    .replace(REDIRECTED_POST_LINK, (_m, href: string, slug: string) => href + BLOG_LINK_TARGETS[slug]);
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
  const data = await getPost(slug);
  if (!data) notFound();
  const { post } = data;
  // The CRM keeps suggesting posts that were merged away and now redirect.
  const related = data.related.filter((r) => !isRetiredBlogSlug(r.slug));
  const heading = blogHeading(slug, post.title);
  const description = BLOG_SEO[slug]?.description || post.seo_description || post.excerpt || undefined;
  const lang = blogLanguage(slug, post.language);

  // Every post links to the local money pages with descriptive anchors (in the
  // post's language), then to its matching sector pages. Before this, posts
  // without a sector mapping linked to no commercial page at all.
  const moneyLinks =
    lang === "fr"
      ? [
          { href: "/fr/agence-web-marrakech", label: "Agence web à Marrakech" },
          { href: "/fr/prix-creation-site-web-maroc", label: "Prix d'un site web au Maroc" },
        ]
      : [
          { href: "/web-design-marrakech", label: "Web design agency in Marrakech" },
          { href: "/blog/website-cost-morocco", label: "Website prices in Morocco" },
          { href: "/web-design-morocco", label: "Web design in Morocco" },
        ];
  const solutionLinks = [
    ...moneyLinks.filter((l) => l.href !== `/blog/${slug}`),
    ...solutionsForPost(slug),
  ];

  // One connected graph. Previously the article and the breadcrumb were two
  // standalone blocks and no node typed the URL itself, so `mainEntityOfPage`
  // pointed at a bare string with nothing behind it. The page is now a WebPage
  // at `#webpage`, the article an addressable `#article` — the same @id the
  // blog index lists it under — and the two reference each other.
  const POST_URL = `${SITE_URL}/blog/${slug}`;
  const articleSchema = {
    "@type": "BlogPosting",
    "@id": `${POST_URL}#article`,
    headline: heading,
    description,
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
    url: POST_URL,
    mainEntityOfPage: { "@id": `${POST_URL}#webpage` },
    isPartOf: { "@id": `${SITE_URL}/blog#blog` },
    inLanguage: lang,
  };
  const webPageSchema = {
    "@type": "WebPage",
    "@id": `${POST_URL}#webpage`,
    url: POST_URL,
    name: heading,
    ...(description ? { description } : {}),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    breadcrumb: { "@id": `${POST_URL}#breadcrumb` },
    mainEntity: { "@id": `${POST_URL}#article` },
    inLanguage: lang,
  };
  // The Blog the article `isPartOf`. A page's graph has to resolve on its own —
  // the full Blog node lives on /blog, so referencing it from here without this
  // stub left a dangling @id. Same @id, so Google merges the two into one blog.
  const blogSchema = {
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "Digital Studio LF Blog",
    url: `${SITE_URL}/blog`,
    publisher: { "@id": `${SITE_URL}/#business` },
  };
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${POST_URL}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: heading, item: POST_URL },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: pageGraphJson(webPageSchema, articleSchema, blogSchema, breadcrumbSchema),
        }}
      />
      <Navbar />
      <ReadingProgress />
      <ArticleTOC />
      <main className="relative min-h-screen blog-surface text-white">
        <article lang={lang} className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <nav className="text-sm text-white/60 mb-8 flex gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/70 line-clamp-1">{heading}</span>
          </nav>

          {post.category_name && (
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
              {post.category_name}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight">{heading}</h1>
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
              alt={post.cover_image_alt || heading}
            />
          )}

          {/* content_html is sanitized at source (CRM). Rendered as the prose
              element itself so the .article-prose child selectors style it. */}
          {/* The CRM article explains what drives the price but quotes no
              figures, and it is the site's English price page. */}
          {slug === "website-cost-morocco" && <WebsitePriceSummary />}

          <div className="article-prose" dangerouslySetInnerHTML={{ __html: modernizeLegacyLinks(post.content_html) }} />

          {post.tags?.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t.slug} className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300">#{t.name}</span>
              ))}
            </div>
          )}

          <ShareButtons title={heading} />

          {/* Editorial links from the article to the matching sector pages.
              The other half of the internal-linking fix: without these the
              blog only ever linked deeper into itself, and the sector pages
              received nothing from the content that supports them. */}
          {solutionLinks.length > 0 && (
            <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-7 sm:px-8">
              <h2 className="text-lg font-black text-white mb-4">
                {lang === "fr" ? "Services associés" : "Related services"}
              </h2>
              <ul className="space-y-2.5">
                {solutionLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-start gap-2.5 text-white/75 hover:text-primary transition-colors"
                    >
                      <span className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true">→</span>
                      <span>{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ArticleCTA />

          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-white/10">
              <h2 className="text-xl font-black mb-6">Keep reading</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${publicBlogSlug(r.slug)}`} className="glass rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-all text-sm text-white/70 hover:text-primary">
                    {blogHeading(publicBlogSlug(r.slug), r.title)} →
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
