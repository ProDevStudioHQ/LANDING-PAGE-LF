import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: { absolute: "How Long Does It Take to Build a Website?" },
  description:
    "We deliver websites in 7–21 days depending on scope. Here's what happens in each phase — from brief to launch — and what affects the timeline.",
  alternates: { canonical: "/blog/how-long-does-it-take-to-build-a-website" },
  openGraph: {
    title: "How Long Does It Take to Build a Website? | Digital Studio LF",
    description: "Landing pages in 7 days, business websites in 14 days, enterprise systems in 21 days. Here's what happens in each phase.",
    url: "https://digitalstudiolf.online/blog/how-long-does-it-take-to-build-a-website",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Long Does It Take to Build a Website? (Our 7–21 Day Model)",
  datePublished: "2026-03-15",
  author: { "@type": "Organization", name: "Digital Studio LF" },
  publisher: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://digitalstudiolf.online/blog" },
    { "@type": "ListItem", position: 3, name: "How Long Does a Website Take?", item: "https://digitalstudiolf.online/blog/how-long-does-it-take-to-build-a-website" },
  ],
};

export default function HowLongWebsitePage() {
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
            <span className="text-white/70">Website Build Timeline</span>
          </nav>

          <p className="text-white/40 text-sm mb-4">Published March 15, 2026</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
            How Long Does It Take<br />
            <span className="text-primary">to Build a Website?</span>
          </h1>

          <p className="text-white/60 text-lg leading-relaxed mb-8">
            We deliver in 7, 14, or 21 days depending on what we&apos;re building. Here&apos;s exactly what happens
            in each phase — and what you can do to help us move faster.
          </p>

          <div className="space-y-10 text-white/60 leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-white mb-6">Our Three Delivery Windows</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { time: "7 days", what: "Starter tier", examples: "Landing pages, login pages" },
                  { time: "14 days", what: "Growth tier", examples: "Business websites, dashboards, CRM systems" },
                  { time: "21 days", what: "Enterprise tier", examples: "Complex platforms, multi-role systems, large integrations" },
                ].map(({ time, what, examples }) => (
                  <div key={time} className="glass rounded-xl p-5 border border-white/10 text-center">
                    <p className="text-3xl font-black text-primary mb-1">{time}</p>
                    <p className="text-white font-bold text-sm mb-1">{what}</p>
                    <p className="text-white/40 text-xs">{examples}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">Day-by-Day: The 14-Day Website Build</h2>
              <p className="mb-6">Here&apos;s what a typical 14-day business website build looks like:</p>
              <div className="space-y-4">
                {[
                  { days: "Day 1", title: "Discovery & Brief", desc: "We confirm the scope, pages, sitemap, and design direction. You send us your logo, brand colours, fonts, and any existing content." },
                  { days: "Days 2–3", title: "Design Mockup", desc: "We design the homepage mockup and 1–2 key interior pages in Figma or directly in code. You review and send feedback." },
                  { days: "Days 4–9", title: "Build", desc: "We develop all pages — desktop and mobile. We integrate forms, analytics, and any third-party tools. A staging URL is shared so you can review in the browser." },
                  { days: "Days 10–11", title: "Review Rounds", desc: "You review on the staging URL and send revision notes. We complete revisions (up to 2 rounds included). Final approval requested." },
                  { days: "Day 12", title: "SEO & QA", desc: "We add final SEO elements: title tags, meta descriptions, Open Graph, structured data, sitemap.xml. We run a Lighthouse audit and fix any issues." },
                  { days: "Days 13–14", title: "Launch", desc: "We deploy to your domain, set up DNS, configure Google Analytics and Search Console, and hand over all credentials and source code." },
                ].map(({ days, title, desc }) => (
                  <div key={days} className="flex gap-4">
                    <div className="flex-shrink-0 w-20 text-right">
                      <span className="text-primary text-xs font-bold">{days}</span>
                    </div>
                    <div className="glass rounded-xl p-4 border border-white/10 flex-1">
                      <h3 className="text-white font-bold mb-1">{title}</h3>
                      <p className="text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">What Slows Down a Build</h2>
              <p className="mb-4">99% of delays come from the client side, not ours. The most common causes:</p>
              <ul className="space-y-2">
                {["Content not ready — we need text, images, and logo before we start", "Feedback arrives late — every day of delay from your side pushes the launch date", "Scope creep — adding new pages or features after the build has started", "Multiple decision-makers — approval needs to come from one clear voice"].map(i => (<li key={i} className="flex items-start gap-2"><span className="text-white/30">—</span> {i}</li>))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">Rush Delivery Available</h2>
              <p>Need it faster? Rush delivery (3–5 days for a landing page, 7–10 days for a business website) is available for an additional fee. We only take rush projects when our schedule allows — contact us and we&apos;ll confirm availability.</p>
            </section>

            <section className="glass rounded-xl p-6 border border-primary/20">
              <h2 className="text-xl font-black text-white mb-3">Ready to Start?</h2>
              <p className="mb-4">Send us your brief today and we can have you live in 7–21 days.</p>
              <a href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full hover:scale-[1.02] transition-transform text-sm">
                Start my project
              </a>
            </section>
          </div>
          <ShareButtons />
        </article>

        <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-white/5 pt-12">
          <div className="flex flex-wrap gap-3">
            <Link href="/services" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">All services</Link>
            <Link href="/blog/how-much-does-a-website-cost-in-morocco" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Website pricing guide</Link>
            <Link href="/blog/landing-page-vs-website-difference" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Landing page vs website</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
