import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import ReadingProgress from "@/components/ReadingProgress";
import ArticleTOC from "@/components/ArticleTOC";
import AuthorCard from "@/components/AuthorCard";

export const metadata: Metadata = {
  title: { absolute: "Websites for Riads & Hotels in Marrakesh" },
  description:
    "We build direct-booking websites, multilingual showcase sites, and reservation systems for riads, hotels, and guesthouses in Marrakesh and across Morocco.",
  alternates: { canonical: "/blog/websites-for-riads-and-hotels-marrakesh" },
  openGraph: {
    title: "Websites for Riads and Hotels in Marrakesh | Digital Studio LF",
    description: "Custom websites for riads, hotels, and guesthouses in Marrakesh — multilingual (EN/FR/AR), direct booking, local SEO.",
    url: "https://digitalstudiolf.online/blog/websites-for-riads-and-hotels-marrakesh",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Do You Build Websites for Riads and Hotels in Marrakesh?",
  datePublished: "2026-02-01",
  author: { "@type": "Organization", name: "Digital Studio LF" },
  publisher: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Do you build websites for riads in Marrakesh?", acceptedAnswer: { "@type": "Answer", text: "Yes. We build direct-booking showcase sites and reservation systems for riads in Marrakesh with multilingual support (English, French, Arabic) and local SEO to rank for 'riad Marrakech' searches." } },
    { "@type": "Question", name: "Can a riad website reduce Booking.com dependency?", acceptedAnswer: { "@type": "Answer", text: "Yes. A professional direct-booking website paired with a Google Business Profile and local SEO helps riads attract guests directly, reducing OTA commission fees. Even a small shift from 30% to 25% OTA bookings represents significant savings." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://digitalstudiolf.online/blog" },
    { "@type": "ListItem", position: 3, name: "Websites for Riads and Hotels Marrakesh", item: "https://digitalstudiolf.online/blog/websites-for-riads-and-hotels-marrakesh" },
  ],
};

export default function RiadHotelWebsitesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <ReadingProgress />
      <ArticleTOC />
      <main className="relative min-h-screen blog-surface text-white">
        <article className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <nav className="text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Riad & Hotel Websites</span>
          </nav>

          <p className="text-white/40 text-sm mb-4">Published February 1, 2026</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
            Do You Build Websites for Riads<br />
            <span className="text-primary">and Hotels in Marrakesh?</span>
          </h1>

          <p className="text-white/60 text-lg leading-relaxed mb-8">
            Yes — and it&apos;s one of the areas we care most about. Marrakesh&apos;s hospitality sector is unique:
            extraordinary properties, international guests, multilingual needs, and an over-dependence on
            Booking.com and Airbnb. A well-built website changes that.
          </p>

          <div className="article-prose space-y-10">
            <section>
              <h2 className="text-2xl font-black text-white mb-4">The Problem with OTA Dependency</h2>
              <p className="mb-4">Most riads and guesthouses in Marrakesh send 60–80% of their bookings through OTAs like Booking.com, Expedia, or Airbnb — each charging 15–25% commission. For a riad with 6 rooms at $100/night, that&apos;s $90–$150 per booking going to the platform, not the property.</p>
              <p>A professional direct-booking website doesn&apos;t eliminate OTA dependence overnight, but it opens a direct channel. Even shifting 20% of bookings from OTA to direct saves thousands of dollars per year — and builds a guest list you own.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">What We Build for Riads & Hotels</h2>
              <div className="space-y-4">
                {[
                  { title: "Showcase Websites", desc: "Beautiful, atmospheric sites that do justice to your property's aesthetic — photography-forward layouts, room pages, amenity showcases, local guide sections, and a story about the space." },
                  { title: "Direct Booking Request Forms", desc: "Not a full booking engine (those are expensive and rarely convert better than a simple request form for riads). We build smart enquiry forms: date picker, number of guests, room preference — connected to your inbox and optionally your CRM." },
                  { title: "Multilingual Content", desc: "Most riad guests come from France, the UK, and the Gulf. We build in English, French, and Arabic — proper multilingual sites with separate content and hreflang tags, not just Google Translate." },
                  { title: "Local SEO", desc: "Keyword-targeted content for 'riad Marrakech', 'guesthouse Medina Marrakesh', 'luxury riad Morocco' — with LocalBusiness schema, Marrakesh geo coordinates, and Google Business Profile setup guidance." },
                  { title: "WhatsApp Integration", desc: "A floating WhatsApp button and integrated chat widget so guests can ask questions instantly — the channel most Moroccan hospitality businesses already use to convert enquiries." },
                ].map(({ title, desc }) => (
                  <div key={title} className="glass rounded-xl p-5 border border-white/10">
                    <h3 className="text-primary font-bold mb-2">{title}</h3>
                    <p className="text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">Pricing for Riad & Hotel Websites</h2>
              <p className="mb-4">Riad websites typically fall into our business website tier, starting at <strong className="text-white">$700 for a 5–7 page site</strong> delivered in 14 days. Multilingual versions (EN + FR + AR) are quoted individually based on content volume.</p>
              <p>For riads that want to go further — a booking management dashboard, CRM to track repeat guests, or a full reservation system — we offer those as separate products that integrate with the website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">Do You Work with Hotels Too?</h2>
              <p className="mb-4">Yes. Beyond riads, we build websites for boutique hotels, guesthouses, and resort properties across Morocco. Larger hotel websites with room category pages, amenity listings, local activity guides, events calendars, and full booking request workflows fall into our Enterprise tier and are quoted individually.</p>
            </section>

            <section className="glass rounded-xl p-6 border border-primary/20">
              <h2 className="text-xl font-black text-white mb-3">Start with a Free Consultation</h2>
              <p className="mb-4">Tell us about your property and what you want your website to do. We&apos;ll send a custom proposal within 24 hours.</p>
              <a href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full hover:scale-[1.02] transition-transform text-sm">
                Get a free quote
              </a>
            </section>
          </div>
          <AuthorCard />
          <ShareButtons />
        </article>

        <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-white/5 pt-12">
          <div className="flex flex-wrap gap-3">
            <Link href="/web-design-morocco" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Web design Morocco</Link>
            <Link href="/services/business-websites" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Business websites</Link>
            <Link href="/blog/websites-in-french-for-moroccan-clients" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">French websites Morocco</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
