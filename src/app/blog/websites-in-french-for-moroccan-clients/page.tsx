import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Building French Websites for Moroccan Clients — How We Do It",
  description:
    "Why French matters for Moroccan businesses, what multilingual development involves, and how we build EN/FR/AR websites with proper hreflang.",
  alternates: { canonical: "/blog/websites-in-french-for-moroccan-clients" },
  openGraph: {
    title: "Building Websites in French for Moroccan Clients | Digital Studio LF",
    description: "Why French-language websites matter for Moroccan businesses, and how we build multilingual EN/FR/AR sites with proper hreflang and native content.",
    url: "https://digitalstudiolf.online/blog/websites-in-french-for-moroccan-clients",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Can You Build Websites in French for Moroccan Clients?",
  datePublished: "2026-02-15",
  author: { "@type": "Organization", name: "Digital Studio LF" },
  publisher: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://digitalstudiolf.online/blog" },
    { "@type": "ListItem", position: 3, name: "French Websites for Moroccan Clients", item: "https://digitalstudiolf.online/blog/websites-in-french-for-moroccan-clients" },
  ],
};

export default function FrenchWebsitesMoroccoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        <article className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <nav className="text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">French Websites Morocco</span>
          </nav>

          <p className="text-white/40 text-sm mb-4">Published February 15, 2026</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
            Can You Build Websites in French<br />
            <span className="text-primary">for Moroccan Clients?</span>
          </h1>

          <p className="text-white/60 text-lg leading-relaxed mb-8">
            Oui — absolument. We build websites in English, French, and Arabic, and regularly work with Moroccan
            businesses that need to reach French-speaking clients both locally and internationally.
            Here&apos;s what that actually involves.
          </p>

          <div className="space-y-10 text-white/60 leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-white mb-4">Why French Matters for Moroccan Businesses</h2>
              <p className="mb-4">Morocco has a large French-speaking population, and French remains the dominant language of business, administration, and educated consumers in the country. Beyond that, Morocco receives millions of tourists from France and Belgium each year — and these visitors are far more likely to book a riad, tour, or restaurant if the website speaks to them in French.</p>
              <p>For e-commerce, real estate, and B2B businesses, a French-language site opens access to the entire Francophone Africa market — Senegal, Ivory Coast, Cameroon, and beyond.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">What &quot;French Website&quot; Actually Means</h2>
              <p className="mb-4">There&apos;s a big difference between &quot;we can translate it&quot; and &quot;we build it properly in French.&quot; Here&apos;s what proper multilingual development involves:</p>
              <div className="space-y-3">
                {[
                  { title: "Native French Content", desc: "We write or incorporate native French content — not machine translation. Copy that sounds natural to a Parisian or a Casablancan, not a word-for-word English translation run through Google." },
                  { title: "hreflang Tags", desc: "Proper <link rel='alternate' hreflang='fr'> and hreflang='en' tags in the <head> so Google serves the right language version to the right audience. Without these, multilingual sites often have indexation problems." },
                  { title: "lang Attribute", desc: "The HTML lang attribute set correctly for each page version (lang='fr', lang='en', lang='ar') — important for screen readers, search engines, and browser behaviour." },
                  { title: "French SEO Targeting", desc: "Separate keyword research for French-language queries. 'Création site web Maroc', 'agence web Marrakech', 'riad Marrakech réservation' are very different from their English equivalents in search volume and competition." },
                  { title: "RTL Support for Arabic", desc: "If we also build an Arabic version, the entire layout flips to right-to-left — not just the text. Navigation, buttons, icons, and spacing all reverse. We handle this properly with dir='rtl' and Tailwind RTL utilities." },
                ].map(({ title, desc }) => (
                  <div key={title} className="glass rounded-xl p-5 border border-white/10">
                    <h3 className="text-primary font-bold mb-2">{title}</h3>
                    <p className="text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">How Much Does a Multilingual Website Cost?</h2>
              <p className="mb-4">A single-language website starts at $700 for a 5–7 page business site. A bilingual (EN + FR) version adds approximately $150–$250 depending on content volume. A trilingual (EN + FR + AR) version adds $300–$500.</p>
              <p>We discuss exactly what&apos;s needed during the discovery call and provide a fixed price with no surprises.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">Which Businesses Need a French Website?</h2>
              <ul className="space-y-2">
                {["Riads and hotels targeting French tourists", "Travel agencies selling Morocco tours to French clients", "Real estate agencies with buyers from France and Belgium", "Restaurants and experience businesses in tourist areas", "B2B service companies dealing with Francophone African clients", "Any Moroccan business applying for French-language tenders or partnerships"].map((item) => (
                  <li key={item} className="flex items-start gap-2"><span className="text-primary mt-0.5">→</span> {item}</li>
                ))}
              </ul>
            </section>

            <section className="glass rounded-xl p-6 border border-primary/20">
              <h2 className="text-xl font-black text-white mb-3">Need a French or Multilingual Website?</h2>
              <p className="mb-4">Tell us what languages you need and who your target audience is. We&apos;ll send a proposal within 24 hours.</p>
              <a href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full hover:scale-[1.02] transition-transform text-sm">
                Get a free quote
              </a>
            </section>
          </div>
          <ShareButtons />
        </article>

        <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-white/5 pt-12">
          <div className="flex flex-wrap gap-3">
            <Link href="/web-design-morocco" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Web design Morocco</Link>
            <Link href="/services/business-websites" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Business websites</Link>
            <Link href="/blog/websites-for-riads-and-hotels-marrakesh" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Riad & hotel websites</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
