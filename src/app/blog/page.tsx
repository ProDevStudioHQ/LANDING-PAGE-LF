import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList, { type Post } from "@/components/BlogList";
import NewsletterCTA from "@/components/NewsletterCTA";
import { getNewsList } from "@/lib/crm-content";

// ISR — refresh from the CRM every 5 minutes (matches the CRM cache TTL).
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog — Web Design & Morocco Insights",
  description:
    "Practical web design, CRM development, and digital strategy guides for businesses in Marrakesh, Morocco, and worldwide. Read the latest from Digital Studio LF.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Digital Studio LF",
    description: "Web design, CRM, and digital strategy articles for Moroccan businesses and global clients.",
    url: "https://digitalstudiolf.online/blog",
  },
};

const SITE_URL = "https://digitalstudiolf.online";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
  ],
};

export default async function BlogIndexPage() {
  // Read live articles from the CRM (one source of truth). If the CRM is
  // unreachable/empty, posts is empty and BlogList shows a graceful empty state.
  const { items: news } = await getNewsList("limit=100");
  const posts: Post[] = news.map((p) => ({
    slug: p.slug,
    title: p.title,
    desc: p.excerpt || "",
    date: p.published_at || "",
    category: p.category_name || "",
    read: p.reading_time_minutes ? `${p.reading_time_minutes} min` : "",
    featured: p.is_featured,
    image: p.cover_image_url,
    imageAlt: p.cover_image_alt,
  }));

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog`,
    name: "Digital Studio LF Blog",
    description:
      "Practical web design, CRM development, and digital strategy guides for businesses in Morocco and worldwide.",
    url: `${SITE_URL}/blog`,
    publisher: { "@type": "Organization", name: "Digital Studio LF", url: SITE_URL },
    blogPost: posts.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: `${SITE_URL}/blog/${a.slug}`,
      datePublished: a.date,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Navbar />
      <main className="relative min-h-screen blog-surface text-white">
        <section className="pt-40 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <nav className="text-sm text-white/40 mb-8 flex gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Blog</span>
          </nav>
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">Insights</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-5">
            Web design &amp; CRM insights, guides &amp; case studies
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-2xl">
            Practical guides on web design, CRM development, and digital strategy for businesses in Morocco and worldwide.
          </p>
        </section>

        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <BlogList posts={posts} />
        </section>

        <NewsletterCTA />
      </main>
      <Footer />
    </>
  );
}
