import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Landing Page vs Website — What's the Difference and Which Do You Need?",
  description:
    "Landing pages vs full websites: what each is built for, when to choose one over the other, and how to maximise ROI from your web investment.",
  alternates: { canonical: "/blog/landing-page-vs-website-difference" },
  openGraph: {
    title: "Landing Page vs Website — Which Do You Need? | Digital Studio LF",
    description: "Landing page vs website: when to use each, what each costs, and which delivers better ROI for your specific business goal.",
    url: "https://digitalstudiolf.online/blog/landing-page-vs-website-difference",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What's the Difference Between a Landing Page and a Website?",
  datePublished: "2026-03-01",
  author: { "@type": "Organization", name: "Digital Studio LF" },
  publisher: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is the difference between a landing page and a website?", acceptedAnswer: { "@type": "Answer", text: "A landing page is a single page with one goal — capture a lead, make a sale, or drive one specific action. A website is a multi-page presence covering your full business: services, about, portfolio, blog, contact. Landing pages convert campaigns; websites build authority." } },
    { "@type": "Question", name: "Should I start with a landing page or a full website?", acceptedAnswer: { "@type": "Answer", text: "Start with a landing page if you have a specific offer to promote, a product to launch, or a campaign to run. Start with a full website if you need to build long-term brand credibility, rank on Google for multiple keywords, or serve multiple audiences." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://digitalstudiolf.online/blog" },
    { "@type": "ListItem", position: 3, name: "Landing Page vs Website", item: "https://digitalstudiolf.online/blog/landing-page-vs-website-difference" },
  ],
};

export default function LandingPageVsWebsitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        <article className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <nav className="text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Landing Page vs Website</span>
          </nav>

          <p className="text-white/40 text-sm mb-4">Published March 1, 2026</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
            Landing Page vs Website:<br />
            <span className="text-primary">What&apos;s the Difference?</span>
          </h1>

          <p className="text-white/60 text-lg leading-relaxed mb-8">
            This is one of the most common questions we get — and the answer directly affects your marketing ROI.
            The short version: a landing page converts a campaign, a website builds a brand. Here&apos;s the full breakdown.
          </p>

          <div className="space-y-10 text-white/60 leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-white mb-4">What Is a Landing Page?</h2>
              <p className="mb-4">A landing page is a single, focused page with one goal — usually to capture a lead, make a sale, or drive sign-ups. It has no navigation menu. There are no links taking visitors away from the page. Every element — headline, copy, image, button — exists to push the visitor toward one action.</p>
              <p className="mb-4">Landing pages are used for:</p>
              <ul className="space-y-1">
                {["Product launches", "Lead generation campaigns", "Paid ad destinations (Google Ads, Facebook Ads)", "Email capture for a free guide or offer", "Webinar sign-ups", "A/B testing a specific offer or message"].map(i => (<li key={i} className="flex items-start gap-2"><span className="text-orange-400">→</span> {i}</li>))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">What Is a Business Website?</h2>
              <p className="mb-4">A business website is a multi-page digital presence covering your entire business: who you are, what you do, case studies, blog, team, and how to contact you. It has navigation, multiple sections, and serves multiple audiences.</p>
              <p className="mb-4">Business websites are used for:</p>
              <ul className="space-y-1">
                {["Building credibility and authority", "Ranking on Google for service keywords", "Serving multiple audiences (different buyer profiles, industries)", "Showcasing your portfolio and case studies", "Long-term content marketing (blog, news, guides)", "Being the &apos;home&apos; your brand returns to"].map(i => (<li key={i} className="flex items-start gap-2"><span className="text-primary">→</span> {i}</li>))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-6">Landing Page vs Website — At a Glance</h2>
              <div className="glass rounded-xl overflow-hidden border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-4 text-left text-white/40 font-medium">Feature</th>
                      <th className="p-4 text-left text-orange-400 font-medium">Landing Page</th>
                      <th className="p-4 text-left text-primary font-medium">Website</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      ["Pages", "1", "5–20+"],
                      ["Goal", "Single conversion", "Multiple goals"],
                      ["Navigation", "None (intentional)", "Full nav menu"],
                      ["SEO value", "Low (single page)", "High (many pages)"],
                      ["Campaign use", "Ideal", "Less focused"],
                      ["Build time", "7 days", "14 days"],
                      ["Starting price", "$250", "$700"],
                    ].map(([f, lp, ws]) => (
                      <tr key={f}>
                        <td className="p-4 text-white/40">{f}</td>
                        <td className="p-4 text-white/70">{lp}</td>
                        <td className="p-4 text-white/70">{ws}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">Which Should You Start With?</h2>
              <p className="mb-4"><strong className="text-white">Start with a landing page if:</strong> you have a specific offer, product, or campaign to promote right now, and you need to see results quickly. Landing pages are fast to build ($250, 7 days) and easy to iterate.</p>
              <p className="mb-4"><strong className="text-white">Start with a website if:</strong> you&apos;re building a long-term business presence, need to rank on Google for multiple keywords, want to showcase your portfolio and services comprehensively, or need to serve different buyer types with different messages.</p>
              <p><strong className="text-white">The smart answer:</strong> many businesses start with a landing page to validate their offer and generate early leads, then invest in a full website once the business model is proven. We can build both to be visually consistent so they feel like the same brand.</p>
            </section>

            <section className="glass rounded-xl p-6 border border-primary/20">
              <h2 className="text-xl font-black text-white mb-3">Not Sure Which You Need?</h2>
              <p className="mb-4">Tell us your goal and we&apos;ll tell you which is right. Most clients know within a 15-minute conversation.</p>
              <a href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full hover:scale-[1.02] transition-transform text-sm">
                Free consultation
              </a>
            </section>
          </div>
          <ShareButtons />
        </article>

        <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-white/5 pt-12">
          <div className="flex flex-wrap gap-3">
            <Link href="/services/landing-pages" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-orange-500/30 hover:text-orange-400 transition-colors">Landing page service</Link>
            <Link href="/services/business-websites" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Business website service</Link>
            <Link href="/blog/how-much-does-a-website-cost-in-morocco" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Website cost guide</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
