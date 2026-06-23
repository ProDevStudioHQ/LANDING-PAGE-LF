import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import ReadingProgress from "@/components/ReadingProgress";
import ArticleTOC from "@/components/ArticleTOC";
import AuthorCard from "@/components/AuthorCard";

export const metadata: Metadata = {
  title: { absolute: "Can You Build a Custom CRM for My Business?" },
  description:
    "What a custom CRM includes, who it's for, how it compares to HubSpot & Salesforce, what it costs, and how long it takes. Full guide.",
  alternates: { canonical: "/blog/can-you-build-a-custom-crm-for-my-business" },
  openGraph: {
    title: "Can You Build a Custom CRM for My Business? | Digital Studio LF",
    description: "What a custom CRM includes, who it's for, how it compares to HubSpot, and what it costs. Starts at $2,500, delivered in 14 days.",
    url: "https://digitalstudiolf.online/blog/can-you-build-a-custom-crm-for-my-business",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Can You Build a Custom CRM for My Business?",
  datePublished: "2026-04-01",
  author: { "@type": "Organization", name: "Digital Studio LF" },
  publisher: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does a custom CRM cost?", acceptedAnswer: { "@type": "Answer", text: "Custom CRM development starts at $2,500 for a Growth CRM delivered in 14 days. This includes lead management, pipeline, client profiles, dashboard, email integration, team access, and 30 days of support." } },
    { "@type": "Question", name: "When should I build a custom CRM instead of using HubSpot?", acceptedAnswer: { "@type": "Answer", text: "Build a custom CRM when: (1) your workflow doesn't fit generic CRM stages, (2) you're paying $200+/month for HubSpot features you only use 30% of, (3) you need industry-specific modules (like itinerary builders for travel agencies), or (4) you have data privacy concerns with third-party SaaS." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://digitalstudiolf.online/blog" },
    { "@type": "ListItem", position: 3, name: "Can You Build a Custom CRM?", item: "https://digitalstudiolf.online/blog/can-you-build-a-custom-crm-for-my-business" },
  ],
};

export default function CustomCRMPage() {
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
            <span className="text-white/70">Custom CRM Guide</span>
          </nav>

          <p className="text-white/40 text-sm mb-4">Published April 1, 2026</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
            Can You Build a Custom CRM<br />
            <span className="text-emerald-400">for My Business?</span>
          </h1>

          <p className="text-white/60 text-lg leading-relaxed mb-8">
            Yes — and it&apos;s one of our most requested services. A custom CRM built around your actual workflow
            outperforms any generic platform for businesses with specific processes. Here&apos;s everything you need to know.
          </p>

          <div className="article-prose space-y-10">
            <section>
              <h2 className="text-2xl font-black text-white mb-4">What Is a Custom CRM?</h2>
              <p className="mb-4">A custom CRM (Customer Relationship Management system) is a web application built specifically for how your business manages clients, leads, and workflows — instead of adapting your process to fit a generic platform like HubSpot or Salesforce.</p>
              <p>Instead of &quot;leads&quot; and &quot;deals&quot;, your CRM tracks whatever your business actually works with — bookings, enquiries, proposals, itineraries, projects, patients, properties, or cases — with the exact stages, fields, and automations your team uses.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">Custom CRM vs HubSpot vs Salesforce</h2>
              <div className="glass rounded-xl overflow-hidden border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-4 text-left text-white/40 font-medium"></th>
                      <th className="p-4 text-left text-emerald-400 font-medium">Custom CRM</th>
                      <th className="p-4 text-left text-white/50 font-medium">HubSpot</th>
                      <th className="p-4 text-left text-white/50 font-medium">Salesforce</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      ["Fits your workflow exactly", "✓", "Partially", "Partially"],
                      ["Monthly fee", "None (you own it)", "$45–$1,600/mo", "$25–$300+/user/mo"],
                      ["Setup cost", "$2,500+", "Free–$3,000", "$5,000–$50,000+"],
                      ["Customisation", "Unlimited", "Limited", "Extensive but complex"],
                      ["Industry-specific modules", "Yes", "No", "No"],
                      ["Data ownership", "100% yours", "HubSpot's servers", "Salesforce's servers"],
                      ["Delivery", "14 days", "Immediate", "Months"],
                    ].map(([f, c, h, s]) => (
                      <tr key={f}>
                        <td className="p-4 text-white/50">{f}</td>
                        <td className="p-4 text-white/80">{c}</td>
                        <td className="p-4 text-white/50">{h}</td>
                        <td className="p-4 text-white/50">{s}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">What&apos;s Included in a Custom CRM</h2>
              <ul className="space-y-2">
                {[
                  "Lead / contact management with custom fields and tags",
                  "Visual pipeline with drag-and-drop stages matching your sales process",
                  "Automated email and WhatsApp follow-up sequences",
                  "Task assignment and team management",
                  "Revenue dashboard: pipeline value, conversion rates, monthly revenue",
                  "Client portal (optional) for client-facing access",
                  "Email integration (Gmail / Outlook two-way sync)",
                  "Export to PDF, Excel, CSV",
                  "Custom modules specific to your industry",
                  "30 days of free post-launch support",
                ].map(i => (<li key={i} className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">✓</span> {i}</li>))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">Who Needs a Custom CRM?</h2>
              <p className="mb-4">You should build a custom CRM if any of these apply:</p>
              <ul className="space-y-2">
                {[
                  "Your workflow doesn't fit generic CRM pipeline stages",
                  "You need industry-specific features (itinerary builders, booking trackers, case management)",
                  "You're paying $200+/month for HubSpot and only using 30% of the features",
                  "You have data privacy requirements that rule out third-party SaaS",
                  "Your team is managing leads across WhatsApp groups, Excel sheets, and email — and losing deals as a result",
                  "You've outgrown spreadsheets but generic CRMs feel like overkill",
                ].map(i => (<li key={i} className="flex items-start gap-2"><span className="text-white/30">→</span> {i}</li>))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">Pricing & Timeline</h2>
              <p className="mb-4">Custom CRM development starts at <strong className="text-white">$2,500 delivered in 14 days</strong> for a Growth CRM covering the core modules above. Enterprise CRMs (multi-branch, supplier management, itinerary builders, advanced automations) are quoted individually after a discovery call.</p>
              <p>We also specialise in <Link href="/services/crm-for-travel-agencies" className="text-emerald-400 hover:underline">CRM systems for travel agencies</Link> — one of the most underserved niches for custom software in Morocco.</p>
            </section>

            <section className="glass rounded-xl p-6 border border-emerald-500/20">
              <h2 className="text-xl font-black text-white mb-3">Let&apos;s Build Your CRM</h2>
              <p className="mb-4">Book a free discovery call. We&apos;ll map your workflow, confirm scope, and send a fixed-price proposal within 24 hours.</p>
              <a href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-semibold rounded-full hover:scale-[1.02] transition-transform text-sm">
                Book a free discovery call
              </a>
            </section>
          </div>
          <AuthorCard />
          <ShareButtons />
        </article>

        <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-white/5 pt-12">
          <div className="flex flex-wrap gap-3">
            <Link href="/services/crm-systems" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-colors">CRM service details</Link>
            <Link href="/services/crm-for-travel-agencies" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-colors">CRM for travel agencies</Link>
            <Link href="/blog/how-much-does-a-website-cost-in-morocco" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Pricing guide</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
