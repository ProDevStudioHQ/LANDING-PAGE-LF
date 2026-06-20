import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog & News — Web Design Tips, Morocco Market Insights",
  description:
    "Articles on web design, CRM development, and digital strategy for businesses in Morocco and worldwide. Practical guides from Digital Studio LF.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "Blog & News | Digital Studio LF",
    description: "Web design, CRM, and digital strategy articles for Moroccan businesses and global clients.",
    url: "https://digitalstudiolf.online/news",
  },
};

const articles = [
  { slug: "how-much-does-a-website-cost-in-morocco", title: "How Much Does a Website Cost in Morocco?", desc: "A complete pricing guide for Moroccan businesses — from landing pages to full CRM systems.", date: "2026-01-15" },
  { slug: "websites-for-riads-and-hotels-marrakesh", title: "Do You Build Websites for Riads and Hotels in Marrakesh?", desc: "How we build multilingual, direct-booking websites for Marrakesh's hospitality sector.", date: "2026-02-01" },
  { slug: "websites-in-french-for-moroccan-clients", title: "Can You Build Websites in French for Moroccan Clients?", desc: "Why French-language websites matter for Moroccan businesses and how we build them.", date: "2026-02-15" },
  { slug: "landing-page-vs-website-difference", title: "What's the Difference Between a Landing Page and a Website?", desc: "When to use a landing page, when to build a full website, and why it matters for your ROI.", date: "2026-03-01" },
  { slug: "how-long-does-it-take-to-build-a-website", title: "How Long Does It Take to Build a Website?", desc: "Our 7–21 day delivery model explained — what happens in each phase.", date: "2026-03-15" },
  { slug: "can-you-build-a-custom-crm-for-my-business", title: "Can You Build a Custom CRM for My Business?", desc: "What a custom CRM includes, who it's for, and how it compares to HubSpot or Salesforce.", date: "2026-04-01" },
];

export default function NewsIndexPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <nav className="text-sm text-white/40 mb-8 flex justify-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">News</span>
          </nav>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            Blog & News
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-6">Digital Studio LF Blog</h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Practical guides on web design, CRM development, and digital strategy for businesses in Morocco and worldwide.
          </p>
        </section>

        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            {articles.map((a) => (
              <Link key={a.slug} href={`/news/${a.slug}`} className="block glass rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 group">
                <p className="text-white/30 text-xs mb-2">{a.date}</p>
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{a.title}</h2>
                <p className="text-white/50 text-sm leading-relaxed">{a.desc}</p>
                <span className="text-primary text-sm font-medium mt-3 inline-block">Read article →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
