import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  pageGraphJson,
  webPageNode,
  serviceNode,
  breadcrumbNode,
  faqNode,
  SITE_URL,
} from "@/lib/schema";

// Built for the Search Console query "website redesign for small business
// morocco". Before this page, the word "redesign" appeared in exactly one source
// file across the whole repo — buried in service config, on no page that a
// searcher with redesign intent would ever land on.
const PATH = "/website-redesign";
const NAME = "Website Redesign";
const DESCRIPTION =
  "Website redesign for small businesses in Morocco. Keep your rankings, fix what is losing you enquiries, and relaunch in 14–28 days. Fixed price, free audit.";

export const metadata: Metadata = {
  title: { absolute: "Website Redesign for Small Business in Morocco — Fixed Price" },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    title: "Website Redesign for Small Business — Digital Studio LF",
    description:
      "Redesign an outdated site without losing the rankings you already have. Fixed price, 14–28 days, based in Marrakesh.",
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
    question: "Will a redesign lose my Google rankings?",
    answer:
      "It will if the redirects are not handled, and that is the most common way redesigns go wrong. Every existing URL that has traffic or links gets a 301 redirect to its new equivalent, page titles and descriptions are carried across deliberately rather than regenerated, and we compare Search Console before and after so any drop is caught in days rather than months.",
  },
  {
    question: "Can you redesign without changing my content?",
    answer:
      "Yes. Plenty of redesigns are purely structural — the copy is fine, the site is simply slow, hard to use on a phone, or looks a decade old. We can carry your existing text across unchanged and rebuild everything around it.",
  },
  {
    question: "What if I do not have the original files or access?",
    answer:
      "That is normal, especially when the original developer is long gone. We rebuild from the live site rather than the source. Domain access is the one thing we genuinely need, and if your domain registrar login is also lost we can walk you through recovering it before we start.",
  },
  {
    question: "How long does a redesign take?",
    answer:
      "Typically 14–28 days from the point the content is settled, depending on how many pages exist and whether new copy is being written. We agree the timeline in writing before starting and give you a weekly check-in against it.",
  },
  {
    question: "What does a website redesign cost?",
    answer:
      "A redesign starts from $700, the same base as a new business website, because the build work is comparable. Migrating a large page count or adding functionality that was not there before raises it. You get a fixed quote within 24 hours — not an hourly rate that drifts.",
  },
  {
    question: "How do I know a redesign is what I need?",
    answer:
      "The honest answer is sometimes you do not need one. If the site is structurally sound and simply needs new copy or faster hosting, we will say so. Send us the URL and we will tell you what is actually wrong with it before quoting anything.",
  },
];

const jsonLd = pageGraphJson(
  webPageNode({ path: PATH, name: NAME, description: DESCRIPTION }),
  serviceNode({
    name: NAME,
    serviceType: "Website Redesign",
    description: DESCRIPTION,
    path: PATH,
    price: "700",
    keywords: [
      "website redesign for small business morocco",
      "website redesign",
      "small business website redesign",
      "website rebuild morocco",
      "redesign outdated website",
    ],
  }),
  breadcrumbNode([
    { name: "Home", path: "" },
    { name: "Website Redesign", path: PATH },
  ]),
  faqNode(faqs),
);

const signs = [
  {
    title: "It is unusable on a phone",
    body: "Most of your visitors are on mobile. If they have to pinch and zoom to read a paragraph or tap a menu, they leave — and Google has been ranking on mobile experience for years.",
  },
  {
    title: "It takes too long to load",
    body: "Slow pages lose people before anything renders. Page speed is a ranking factor and a conversion factor at the same time, so it costs you twice.",
  },
  {
    title: "You cannot edit it yourself",
    body: "If changing a phone number means emailing a developer who may or may not reply, the site is a liability rather than an asset.",
  },
  {
    title: "It does not reflect what you do now",
    body: "Businesses change faster than their websites. If the services listed are two years out of date, the site is actively misinforming buyers.",
  },
  {
    title: "It gets visitors but no enquiries",
    body: "Traffic without contact is usually a structural problem — no clear call to action, a form nobody can find, or a page that never says what happens next.",
  },
  {
    title: "It was built on something abandoned",
    body: "An unmaintained theme or a plugin stack nobody updates is a security problem waiting to happen, not just an aesthetic one.",
  },
];

export default function WebsiteRedesignPage() {
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
            <span className="text-white/70">Website Redesign</span>
          </nav>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
              Redesign & rebuild
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Website redesign for small businesses in Morocco
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl">
              A website redesign should fix what is losing you enquiries without throwing away the
              search rankings you have spent years earning. We rebuild small business websites in
              Marrakesh and across Morocco — fast, mobile-first, and migrated properly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg hover:scale-[1.03] transition-all duration-300"
              >
                Get a free site review →
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all duration-300"
              >
                See our work →
              </Link>
            </div>
          </div>
        </section>

        {/* WHAT IT IS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-6">What a redesign involves</h2>
          <div className="space-y-5 text-white/60 text-[17px] leading-[1.8]">
            <p>
              A website redesign is a rebuild of an existing site that keeps what is working and
              replaces what is not. That usually means new design and new front-end code, a
              structure organised around what visitors actually came for, and a migration plan that
              protects the URLs already earning you traffic.
            </p>
            <p>
              The part that gets skipped, and the part that causes the horror stories, is the
              migration. A site that relaunches without redirects loses every ranking attached to
              its old URLs overnight. Google finds dead pages where it used to find your content,
              and the traffic you had before the redesign does not come back on its own.
            </p>
            <p>
              So the work splits in two: the visible half — how the site looks, how fast it loads,
              how easy it is to use on a phone — and the invisible half, where old URLs are mapped
              to new ones, redirects are put in place, and performance is measured before and after.
              Both halves ship together or the redesign is not finished.
            </p>
          </div>
        </section>

        {/* SIGNS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Signs you need one</h2>
          <p className="text-white/50 text-lg mb-10 max-w-3xl leading-relaxed">
            You do not need every one of these to justify a rebuild. Two or three is usually enough
            for the site to be costing you more than it returns.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signs.map((s) => (
              <div key={s.title} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-primary font-bold mb-2">{s.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHO IT IS FOR */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-6">Who this is for</h2>
          <div className="space-y-5 text-white/60 text-[17px] leading-[1.8]">
            <p>
              Small businesses in Morocco with a site that already exists and already does something
              — it has visitors, maybe rankings, possibly customers who found you through it — but
              that has fallen behind what those visitors now expect. Riads and restaurants with
              sites built before mobile mattered. Professional practices whose site was a favour
              from someone&apos;s cousin. Agencies whose site is three rebrands out of date.
            </p>
            <p>
              If you have no site at all, this is not the page you want — a{" "}
              <Link href="/services/business-websites" className="text-primary hover:underline">
                new business website
              </Link>{" "}
              is a cleaner and usually cheaper starting point, with no migration to plan around.
            </p>
            <p>
              If the redesign is also the moment you add French or Arabic, say so early. Building{" "}
              <Link href="/multilingual-website-design" className="text-primary hover:underline">
                multilingual from the start
              </Link>{" "}
              is far less work than retrofitting a second language later, and it changes the URL
              structure we design in the first week.
            </p>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-10">How the process works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Review", desc: "We go through the current site — what ranks, what converts, what is broken — and tell you plainly whether a redesign is worth it." },
              { step: "02", title: "Map & plan", desc: "Every existing URL is mapped to its replacement before design starts. This is the step that protects your rankings." },
              { step: "03", title: "Design & build", desc: "New design, mobile-first build, your content carried across or rewritten — your call, agreed in advance." },
              { step: "04", title: "Migrate & measure", desc: "Redirects go live with the site. We watch Search Console and page speed after launch, not just before." },
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
              A redesign starts from $700 — the same base as a new business website, because the
              build effort is comparable once migration is accounted for. What moves the number is
              page count, whether copy is being rewritten, and whether you are adding functionality
              the old site never had, such as booking or a second language.
            </p>
            <p>
              The price is fixed before work starts and quoted in USD or MAD. There is no hourly
              rate to drift and no change-order surprise halfway through. Send us your current URL
              and we will come back within 24 hours with a fixed number and an honest view of
              whether the rebuild is worth doing at all.
            </p>
            {/* TODO: confirm with owner — do you want a published redesign-specific
                price band (e.g. "redesigns from $X for up to N pages")? Anchored to
                the existing $700 business-website figure rather than inventing one. */}
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
              Send us your current site
            </h2>
            <p className="text-white/55 text-lg mb-8 max-w-2xl mx-auto">
              We will tell you what is actually wrong with it and what a rebuild would involve —
              free, and with no obligation to hire us. Fixed price, 14–28 days, based in Marrakesh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg hover:scale-[1.03] transition-all duration-300"
              >
                Get a free site review →
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
