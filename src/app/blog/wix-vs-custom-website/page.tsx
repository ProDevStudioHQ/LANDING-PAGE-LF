import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: { absolute: "Wix vs Custom Website: The Real Comparison" },
  description:
    "Wix vs custom website: an honest 2026 comparison of performance, SEO, flexibility & cost. When Wix is enough and when to go custom.",
  alternates: { canonical: "/blog/wix-vs-custom-website" },
  keywords: [
    "Wix vs custom website",
    "Wix vs custom website for business",
    "should I use Wix",
    "Wix alternatives",
    "custom website vs website builder",
    "Wix SEO limitations",
  ],
  openGraph: {
    title: { absolute: "Wix vs Custom Website: The Real Comparison" },
    description:
      "An honest comparison of Wix and custom websites. When Wix is the right choice and when you need custom — explained for business owners.",
    url: "https://digitalstudiolf.online/blog/wix-vs-custom-website",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Wix vs Custom Website for Business: The Real Comparison (2026)",
  description:
    "Performance, SEO, flexibility, and total cost compared. When Wix works and when a custom website is the better investment.",
  author: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
  publisher: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
  datePublished: "2026-05-15",
  dateModified: "2026-06-01",
  url: "https://digitalstudiolf.online/blog/wix-vs-custom-website",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://digitalstudiolf.online/blog" },
    { "@type": "ListItem", position: 3, name: "Wix vs Custom Website", item: "https://digitalstudiolf.online/blog/wix-vs-custom-website" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Wix good enough for a business website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wix is good enough for small businesses that need a simple online presence quickly and cheaply. If you need a brochure site, a portfolio, or a basic service page, Wix works fine. The limitations show when you need strong SEO, fast loading speeds, custom functionality, or a site that integrates with your internal systems.",
      },
    },
    {
      "@type": "Question",
      name: "Does Wix hurt your SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wix has improved significantly in SEO features, but structural limitations remain. Pages often load slower than hand-coded sites, and Wix adds its own scripts and styles that inflate page weight. Google's Core Web Vitals scores on Wix sites tend to be lower than optimised custom sites, which can affect ranking in competitive niches.",
      },
    },
    {
      "@type": "Question",
      name: "When should I choose a custom website over Wix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose a custom website when: (1) you compete in a high-traffic, SEO-driven market where page speed is a ranking factor; (2) you need functionality that Wix's app market can't provide; (3) your branding requires pixel-perfect design control; (4) you need to integrate the site with internal systems like a CRM, booking platform, or ERP.",
      },
    },
  ],
};

const comparison = [
  { category: "Design flexibility", wix: "Limited to drag-and-drop blocks", custom: "Pixel-perfect control over every element" },
  { category: "Performance", wix: "Variable — often slow due to Wix scripts", custom: "Optimised — achieves 90+ PageSpeed scores" },
  { category: "SEO control", wix: "Basic meta/alt tools, no technical depth", custom: "Full control over schema, canonicals, hreflang, and Core Web Vitals" },
  { category: "Custom features", wix: "Limited to Wix App Market", custom: "Any feature you can design can be built" },
  { category: "Upfront cost", wix: "Low ($0–$300 setup)", custom: "Higher ($800–$5,000+)" },
  { category: "Monthly cost", wix: "$17–$159/month ongoing", custom: "$10–$30/month (hosting only)" },
  { category: "Portability", wix: "Locked in — can't export your site", custom: "You own the code — move hosts freely" },
  { category: "Scalability", wix: "Limited — breaks at heavy traffic or complex features", custom: "Built to scale with your business" },
];

export default function WixVsCustomPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        <article className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-white/40 mb-8 flex gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/70">Wix vs Custom Website</span>
          </nav>

          {/* Header */}
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            Web Design
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight">
            Wix vs Custom Website for Business: The Real Comparison (2026)
          </h1>
          <div className="flex items-center gap-4 text-white/30 text-sm mb-10">
            <span>May 15, 2026</span>
            <span>·</span>
            <span>6 min read</span>
            <span>·</span>
            <span>Digital Studio LF</span>
          </div>

          {/* Body */}
          <div className="space-y-6 text-white/70 leading-relaxed">
            <p>
              The question business owners ask us most often isn&apos;t &quot;how much does a website cost?&quot; — it&apos;s &quot;do I actually need a custom website, or is Wix fine?&quot; It&apos;s a fair question. Wix has improved dramatically over the past few years, and for some businesses, it genuinely is the right tool. For others, it&apos;s a trap.
            </p>
            <p>
              This article gives you an honest comparison without the agency bias. We&apos;ll tell you when Wix is the right call — because sometimes it is.
            </p>

            <h2 className="text-2xl font-black text-white mt-10">The Honest Summary</h2>
            <p>
              Wix is a website builder. A custom website is a bespoke product. They&apos;re not competing for the same jobs. The problem is that Wix markets itself as suitable for both — which is where businesses get into trouble.
            </p>
            <p>
              Use Wix when you need to get online quickly, have a limited budget, and don&apos;t depend on organic search traffic or complex functionality. Use a custom website when any of those conditions aren&apos;t true.
            </p>

            <h2 className="text-2xl font-black text-white mt-10">Side-by-Side Comparison</h2>
            <div className="not-prose overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 text-white font-semibold min-w-[140px]">Category</th>
                    <th className="py-3 pr-4 text-white/60 font-semibold min-w-[180px]">Wix</th>
                    <th className="py-3 text-primary font-semibold min-w-[180px]">Custom Website</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparison.map((row) => (
                    <tr key={row.category}>
                      <td className="py-3 pr-4 text-white font-medium">{row.category}</td>
                      <td className="py-3 pr-4 text-white/50 text-xs leading-relaxed">{row.wix}</td>
                      <td className="py-3 text-white/70 text-xs leading-relaxed">{row.custom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-black text-white mt-10">Where Wix Falls Short for Serious Businesses</h2>

            <h3 className="text-xl font-bold text-white mt-8">1. Performance and Core Web Vitals</h3>
            <p>
              Google uses Core Web Vitals as a ranking signal. Metrics like Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) measure how fast and stable your page feels. Wix sites carry significant JavaScript overhead — Wix&apos;s own renderer, analytics, and app scripts — that most site owners can&apos;t control. A custom Next.js site routinely scores 90+ on mobile; a comparable Wix site often scores 50–70.
            </p>
            <p>
              In competitive industries, that gap translates to ranking difference. In low-competition niches, it often doesn&apos;t matter. Know your market.
            </p>

            <h3 className="text-xl font-bold text-white mt-8">2. SEO Technical Depth</h3>
            <p>
              Wix provides basic SEO tools: meta titles, descriptions, alt text, and sitemap generation. What it can&apos;t easily do: structured data (JSON-LD schemas), hreflang for multilingual targeting, precise canonical tag management, or full control over how crawlers access your content. If you&apos;re targeting multiple countries or building content in multiple languages — as many Moroccan businesses need to do — Wix becomes a real liability.
            </p>

            <h3 className="text-xl font-bold text-white mt-8">3. You Don&apos;t Own Your Site</h3>
            <p>
              This is the one Wix doesn&apos;t advertise prominently. Your Wix site cannot be exported. If you decide to leave Wix in three years, you start from scratch — design, content, and all. A custom website is yours. Move it to any host, hand it to any developer, fork it, or modify it without anyone&apos;s permission.
            </p>

            <h3 className="text-xl font-bold text-white mt-8">4. Long-term Cost</h3>
            <p>
              Wix Business plans run $23–$159/month. Over three years, that&apos;s $828–$5,724 — and you still don&apos;t own anything. A custom website costs more upfront but typically $10–$30/month in hosting. The crossover point for most businesses is around 18–24 months.
            </p>

            <h2 className="text-2xl font-black text-white mt-10">When Wix Is Actually the Right Choice</h2>
            <p>
              We said this earlier and we mean it: Wix is genuinely good for:
            </p>
            <div className="space-y-3 not-prose">
              {[
                "Solo freelancers or consultants who need a simple portfolio online fast",
                "Side projects where SEO isn't a factor and traffic comes from social media or referrals",
                "Local businesses with no competition in organic search — a café or small shop where customers are found by word of mouth",
                "Short-term event sites or campaign landing pages with a fixed 6-month life",
              ].map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                  <span className="text-white/60 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-black text-white mt-10">Frequently Asked Questions</h2>
            <div className="not-prose space-y-4">
              {[
                {
                  q: "Is Wix good enough for a business website?",
                  a: "Wix is good enough for small businesses that need a simple online presence quickly and cheaply. The limitations show when you need strong SEO, fast loading speeds, custom functionality, or integration with internal systems.",
                },
                {
                  q: "Does Wix hurt your SEO?",
                  a: "Wix has improved in SEO features, but structural limitations remain. Pages load slower due to Wix scripts, and advanced SEO controls (schema, hreflang, canonical management) are limited. In competitive markets, this can hurt rankings.",
                },
                {
                  q: "When should I choose a custom website over Wix?",
                  a: "Choose custom when you compete in an SEO-driven market, need functionality beyond Wix's app market, require branding control, or need to integrate with internal systems like a CRM or booking platform.",
                },
              ].map((item) => (
                <div key={item.q} className="glass rounded-xl p-6 border border-white/10">
                  <h3 className="font-bold text-white mb-2">{item.q}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related */}
          <div className="mt-16 pt-10 border-t border-white/10">
            <h2 className="text-xl font-black mb-6">Related Articles & Services</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { href: "/services/business-websites", label: "Custom Business Websites" },
                { href: "/blog/how-much-does-a-website-cost-in-morocco", label: "How Much Does a Website Cost in Morocco?" },
                { href: "/web-developer-for-startups", label: "Remote Web Developer for Startups" },
                { href: "/blog/landing-page-vs-website-difference", label: "Landing Page vs Website: What's the Difference?" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="glass rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-all duration-300 text-sm text-white/70 hover:text-primary">
                  {l.label} →
                </Link>
              ))}
            </div>
          </div>
          <ShareButtons />
        </article>
      </main>
      <Footer />
    </>
  );
}
