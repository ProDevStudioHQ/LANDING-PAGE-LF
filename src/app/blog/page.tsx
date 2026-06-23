import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList, { type Post } from "@/components/BlogList";
import NewsletterCTA from "@/components/NewsletterCTA";

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

const articles: Post[] = [
  { slug: "direct-booking-website-without-booking-com", title: "How to Get Direct Hotel Bookings Without Booking.com", desc: "Practical guide for hotel and riad owners on building a direct booking channel and reducing OTA commissions.", date: "2026-06-01", category: "Local Business", read: "7 min", featured: true },
  { slug: "wix-vs-custom-website", title: "Wix vs Custom Website for Business: The Real Comparison (2026)", desc: "When Wix is enough and when you need a custom website — performance, SEO, flexibility, and total cost compared.", date: "2026-05-15", category: "Web Design", read: "6 min" },
  { slug: "how-much-does-a-custom-crm-cost", title: "How Much Does a Custom CRM Cost? (2026 Pricing Guide)", desc: "Honest breakdown of custom CRM development costs — what drives the price, how it compares to HubSpot and Salesforce.", date: "2026-05-01", category: "CRM", read: "7 min" },
  { slug: "can-you-build-a-custom-crm-for-my-business", title: "Can You Build a Custom CRM for My Business?", desc: "What a custom CRM includes, who it's for, and how it compares to HubSpot or Salesforce.", date: "2026-04-01", category: "CRM", read: "7 min" },
  { slug: "how-long-does-it-take-to-build-a-website", title: "How Long Does It Take to Build a Website?", desc: "Our 7–21 day delivery model explained — what happens in each phase.", date: "2026-03-15", category: "Guides", read: "6 min" },
  { slug: "landing-page-vs-website-difference", title: "What's the Difference Between a Landing Page and a Website?", desc: "When to use a landing page, when to build a full website, and why it matters for your ROI.", date: "2026-03-01", category: "Guides", read: "5 min" },
  { slug: "websites-in-french-for-moroccan-clients", title: "Can You Build Websites in French for Moroccan Clients?", desc: "Why French-language websites matter for Moroccan businesses and how we build them.", date: "2026-02-15", category: "Local Business", read: "5 min" },
  { slug: "websites-for-riads-and-hotels-marrakesh", title: "Do You Build Websites for Riads and Hotels in Marrakesh?", desc: "How we build multilingual, direct-booking websites for Marrakesh's hospitality sector.", date: "2026-02-01", category: "Local Business", read: "6 min" },
  { slug: "how-much-does-a-website-cost-in-morocco", title: "How Much Does a Website Cost in Morocco?", desc: "A complete pricing guide for Moroccan businesses — from landing pages to full CRM systems.", date: "2026-01-15", category: "Web Design", read: "8 min" },
];

const SITE_URL = "https://digitalstudiolf.online";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
  ],
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog`,
  name: "Digital Studio LF Blog",
  description:
    "Practical web design, CRM development, and digital strategy guides for businesses in Morocco and worldwide.",
  url: `${SITE_URL}/blog`,
  publisher: { "@type": "Organization", name: "Digital Studio LF", url: SITE_URL },
  blogPost: articles.map((a) => ({
    "@type": "BlogPosting",
    headline: a.title,
    url: `${SITE_URL}/blog/${a.slug}`,
    datePublished: a.date,
  })),
};

export default function BlogIndexPage() {
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
          <BlogList posts={articles} />
        </section>

        <NewsletterCTA />
      </main>
      <Footer />
    </>
  );
}
