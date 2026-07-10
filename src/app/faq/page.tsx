import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { faqCategories, allFaqs } from "@/data/faq-page";
import { pageGraphJson, faqNode, breadcrumbNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "FAQ — Web Design & Development Questions | Digital Studio LF" },
  description:
    "Answers to common questions about our web design and development services: pricing, timelines, technology, support, and building multilingual sites for Morocco.",
  alternates: { canonical: "/faq" },
  keywords: [
    "web design FAQ",
    "website cost Morocco",
    "web development questions",
    "website timeline",
    "Marrakech web agency FAQ",
  ],
  openGraph: {
    title: "Frequently Asked Questions — Digital Studio LF",
    description:
      "Pricing, timelines, technology, support, and multilingual websites for Morocco — answered.",
    url: "https://digitalstudiolf.online/faq",
  },
};

// FAQPage + BreadcrumbList JSON-LD, linked into the site's base @graph by @id.
const jsonLd = pageGraphJson(
  breadcrumbNode([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ]),
  faqNode(allFaqs)
);

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <nav className="text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">FAQ</span>
          </nav>
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-5">
            FAQ
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl">
            Everything you need to know about our web design and development
            services — pricing, timelines, technology, support, and building
            multilingual websites for Morocco and worldwide.
          </p>
        </section>

        {/* Categorized Q&A — rendered server-side so every answer is in the
            initial HTML for crawlers and AI search. */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {faqCategories.map((cat) => (
            <div key={cat.category} className="mb-14 last:mb-0">
              <h2 className="text-2xl sm:text-3xl font-black mb-6">{cat.category}</h2>
              <div className="space-y-4">
                {cat.items.map((faq) => (
                  <div key={faq.question} className="glass rounded-2xl p-6 border border-white/10">
                    <h3 className="text-white font-bold mb-2">{faq.question}</h3>
                    <p className="text-white/55 text-[15px] leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Contact CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Still have questions?</h2>
          <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
            Book a free 30-minute consultation and we&apos;ll answer everything —
            in English, French, or Arabic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg hover:shadow-primary/30 hover:scale-[1.03] transition-all duration-300"
            >
              Get in touch →
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all duration-300"
            >
              See all services
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
