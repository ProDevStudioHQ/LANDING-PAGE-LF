import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  pageGraphJson,
  webPageNode,
  serviceNode,
  serviceId,
  breadcrumbNode,
  faqNode,
  SITE_URL,
} from "@/lib/schema";

// Built for two Search Console queries the site already gets impressions for but
// had no page to answer: "arabic french website design agency" and "multilingual
// website design morocco". The capability is claimed all over the site (16
// mentions of Arabic on /web-design-morocco alone) but no URL owned the intent.
const PATH = "/multilingual-website-design";
const NAME = "Multilingual Website Design";
const DESCRIPTION =
  "Arabic, French and English website design from a Marrakesh studio. One site, three languages, correct hreflang and RTL. Delivered in 14–28 days.";

export const metadata: Metadata = {
  // absolute: the layout's " | Digital Studio LF" suffix would push this past 60.
  // Carries both target queries at once: "multilingual website design morocco"
  // and "arabic french website design agency".
  title: { absolute: "Multilingual Website Design Morocco — Arabic & French" },
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    // No hreflang pair. /fr/creation-site-web-maroc is a French page about
    // building sites in Morocco — it is not a translation of this page, which is
    // about the multilingual capability itself. Claiming a pair here would tell
    // Google two different pages are the same content.
  },
  openGraph: {
    type: "website",
    title: "Arabic, French & English Website Design — Digital Studio LF",
    description:
      "One website, three languages. Arabic RTL, French and English — with correct hreflang, lang attributes and per-language SEO.",
    url: `${SITE_URL}${PATH}`,
    images: [`${SITE_URL}/images/og-home.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/images/og-home.jpg`],
  },
};

const faqs = [
  {
    question: "Do you build websites in Arabic?",
    answer:
      "Yes. We build in Arabic, French and English, including Moroccan Darija for copy that needs to sound local rather than translated. Arabic pages are laid out right-to-left, not just re-typed into a left-to-right template — the navigation, forms, icons and spacing all mirror.",
  },
  {
    question: "Is a multilingual site the same as an automatic translation plugin?",
    answer:
      "No, and the difference matters for search. A translation widget swaps text in the browser after the page loads, so search engines usually index only the original language. We build each language as its own set of indexable URLs with their own titles, descriptions and hreflang tags, so each language can rank on its own.",
  },
  {
    question: "How many languages can one site have?",
    answer:
      "There is no hard limit. Most Moroccan businesses we build for use two or three — typically French and English, with Arabic added when the audience is domestic. Each additional language adds content and translation work rather than technical complexity.",
  },
  {
    question: "Do I need to supply the translations?",
    answer:
      "You can, and it is usually the better result when the copy is technical or brand-specific. If you would rather not, we can handle French, English and Arabic in-house. Either way you approve the final wording before launch.",
  },
  {
    question: "What does a multilingual website cost?",
    answer:
      "A multilingual build starts from the same base as a standard business website — from $700 — with the additional cost driven by how much content is duplicated per language. We give a fixed quote within 24 hours of seeing your page list.",
  },
  {
    question: "Will the wrong language show up in Google?",
    answer:
      "Not if hreflang is set up correctly, which is the single most common failure we see on multilingual sites. Each page declares its own language and points at its equivalents in the others, so a French searcher gets the French URL and an Arabic searcher gets the Arabic one.",
  },
];

const jsonLd = pageGraphJson(
  webPageNode({
    path: PATH,
    name: NAME,
    description: DESCRIPTION,
    breadcrumb: true,
    mainEntity: serviceId(PATH),
  }),
  serviceNode({
    name: NAME,
    serviceType: "Multilingual Web Design",
    description: DESCRIPTION,
    path: PATH,
    price: "700",
    keywords: [
      "multilingual website design morocco",
      "arabic french website design agency",
      "arabic website design",
      "french website design morocco",
      "rtl website design",
      "hreflang",
    ],
  }),
  breadcrumbNode([
    { name: "Home", path: "" },
    { name: "Multilingual Website Design", path: PATH },
  ]),
  faqNode(faqs, PATH),
);

const languages = [
  {
    label: "العربية — Arabic",
    body: "Full right-to-left layout: mirrored navigation, forms, icons and spacing, with a typeface chosen for Arabic rather than a Latin font pressed into service. Moroccan Darija where the copy should read as local.",
  },
  {
    label: "Français — French",
    body: "The working language of most Moroccan business, and the one your clients in France, Belgium and Canada search in. Written as French, not translated word-for-word from English.",
  },
  {
    label: "English",
    body: "For international clients, tourists booking ahead, and the buyers and partners who search in English regardless of where they are.",
  },
];

const included = [
  {
    title: "Separate indexable URLs per language",
    body: "Each language gets its own real URLs — not a browser-side widget that leaves search engines seeing a single language.",
  },
  {
    title: "Correct hreflang",
    body: "Every page declares its language and points at its equivalents. This is where most multilingual sites break, and it is why the wrong language ends up in search results.",
  },
  {
    title: "Accurate lang attributes",
    body: "Set per page in the served HTML, so screen readers announce the right language and search engines classify it correctly without executing JavaScript.",
  },
  {
    title: "True RTL for Arabic",
    body: "Layout mirroring, not a text swap. Menus, forms, sliders and icons all flip.",
  },
  {
    title: "Per-language SEO",
    body: "Titles, meta descriptions and headings written for each language — because the keyword your French visitors use is rarely a direct translation of the English one.",
  },
  {
    title: "A language switcher that keeps context",
    body: "Switching language keeps the visitor on the page they were reading instead of dumping them back on the homepage.",
  },
];

export default function MultilingualWebsiteDesignPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        {/* HERO */}
        <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Multilingual Website Design</span>
          </nav>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
              Arabic · French · English
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Multilingual website design in Arabic, French and English
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl">
              We are a multilingual website design agency in Marrakesh building sites that work
              properly in Arabic, French and English — one site, three languages, each one indexed
              and ranking on its own rather than hidden behind a translation widget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg hover:scale-[1.03] transition-all duration-300"
              >
                Get a free quote →
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all duration-300"
              >
                See all services →
              </Link>
            </div>
          </div>
        </section>

        {/* WHAT IT IS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-6">
            What a multilingual website actually is
          </h2>
          <div className="space-y-5 text-white/60 text-[17px] leading-[1.8]">
            <p>
              A multilingual website is one where every language is a real, separately addressable
              version of your site — its own URLs, its own page titles, its own descriptions, its own
              entry in Google&apos;s index. That is a different thing from a translate button, which
              rewrites text in the visitor&apos;s browser after the page has already loaded.
            </p>
            <p>
              The distinction is invisible to a visitor and decisive for search. When translation
              happens in the browser, search engines generally index only the language the server
              sent. Your French pages never enter the French results; your Arabic pages never enter
              the Arabic ones. You have done the translation work and collected none of the traffic.
            </p>
            <p>
              Building it properly means each language is served as HTML from the start, declares
              itself with a correct <code className="text-white/80">lang</code> attribute, and points
              at its counterparts through hreflang tags so search engines know the pages are
              equivalents rather than duplicates competing with each other.
            </p>
          </div>
        </section>

        {/* LANGUAGES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-10">The three languages we work in</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {languages.map((l) => (
              <div key={l.label} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-primary font-bold text-lg mb-3">{l.label}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{l.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHO IT IS FOR */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-6">Who this is for</h2>
          <div className="space-y-5 text-white/60 text-[17px] leading-[1.8]">
            <p>
              Any Moroccan business whose customers do not all read the same language — which, in
              Marrakesh, is most of them. A riad takes bookings from French and English speakers
              while dealing with Moroccan suppliers in Arabic. A restaurant serves tourists and
              locals in the same evening. A real estate agency lists property for buyers in France
              and the Gulf simultaneously.
            </p>
            <p>
              It also applies to businesses outside Morocco selling into it, where Arabic and French
              are the difference between being understood and being skipped, and to any small
              business that has outgrown a single-language site and is losing enquiries it never
              sees.
            </p>
            <p>
              If you are starting from an existing single-language site, a{" "}
              <Link href="/website-redesign" className="text-primary hover:underline">
                website redesign
              </Link>{" "}
              is usually the cleaner path — rebuilding multilingual from the ground up rather than
              bolting a second language onto a structure that was never designed for it.
            </p>
          </div>
        </section>

        {/* WHAT'S INCLUDED */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-10">What every build includes</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {included.map((i) => (
              <li key={i.title} className="glass rounded-xl p-5 border border-white/10">
                <h3 className="text-white font-bold mb-1.5">{i.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{i.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* PROCESS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-10">How the process works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Language plan", desc: "We agree which languages go live, which pages exist in each, and which audience each one is written for." },
              { step: "02", title: "Structure & URLs", desc: "URL scheme, hreflang map and language switcher are designed before a line of content is written." },
              { step: "03", title: "Build & translate", desc: "Pages are built per language. You supply translations or we handle French, English and Arabic in-house." },
              { step: "04", title: "Launch & verify", desc: "We verify every hreflang pair and lang attribute resolves correctly before launch, then hand over." },
            ].map((s) => (
              <div key={s.step} className="glass rounded-xl p-6 border border-white/10">
                <span className="text-4xl font-black text-primary opacity-30 mb-3 block">{s.step}</span>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-6">What it costs</h2>
          <div className="space-y-5 text-white/60 text-[17px] leading-[1.8]">
            <p>
              A multilingual build starts from the same base as a standard{" "}
              <Link href="/services/business-websites" className="text-primary hover:underline">
                business website
              </Link>{" "}
              — from $700 — and rises with the amount of content that has to exist in each language.
              Two languages across a small page set is a modest addition; three languages across
              thirty pages is a larger project.
            </p>
            <p>
              Pricing is fixed before work starts, quoted in USD or MAD, and agreed against a page
              list rather than an hourly estimate. Typical delivery is 14–28 days depending on scope.
              Send us the pages you need and we will come back within 24 hours with a fixed number.
            </p>
            {/* TODO: confirm with owner — is there a specific per-language uplift
                (flat fee or percentage) you want published here? Left as a range
                deliberately rather than inventing a figure. */}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-10 text-center">Questions, answered</h2>
          <div className="space-y-4">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="group glass rounded-xl border border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none text-white font-semibold">
                  {question}
                  <span className="shrink-0 transition-transform group-open:rotate-45 text-primary" aria-hidden="true">+</span>
                </summary>
                <p className="px-6 pb-5 text-white/55 text-[15px] leading-relaxed">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto glass rounded-3xl p-10 sm:p-14 border border-white/10 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Reach every customer in their own language
            </h2>
            <p className="text-white/55 text-lg mb-8 max-w-2xl mx-auto">
              Free consultation, fixed price agreed upfront, and a quote within 24 hours. Based in
              Marrakesh, working in Arabic, French and English.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg hover:scale-[1.03] transition-all duration-300"
              >
                Start your project →
              </Link>
              <Link
                href="/web-design-morocco"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all duration-300"
              >
                Web design in Morocco →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
