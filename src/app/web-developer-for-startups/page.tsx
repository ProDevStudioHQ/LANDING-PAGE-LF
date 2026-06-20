import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Remote Web Developer for Startups | MVP & Dashboard — Digital Studio LF",
  description:
    "Hire a remote web developer for your startup. MVPs, landing pages, admin dashboards, and SaaS interfaces delivered fast. Trusted by founders in the USA, Europe, and Morocco.",
  alternates: { canonical: "/web-developer-for-startups" },
  keywords: [
    "remote web developer for startups",
    "web developer for startups",
    "MVP developer",
    "startup web development",
    "hire web developer remotely",
    "SaaS frontend developer",
    "startup landing page",
    "startup dashboard developer",
  ],
  openGraph: {
    title: "Remote Web Developer for Startups | Digital Studio LF",
    description:
      "Hire a remote web developer for your startup. MVPs, dashboards, and SaaS interfaces delivered fast. Trusted by founders worldwide.",
    url: "https://digitalstudiolf.online/web-developer-for-startups",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Remote Web Development for Startups",
  provider: {
    "@type": "LocalBusiness",
    name: "Digital Studio LF",
    url: "https://digitalstudiolf.online",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marrakesh",
      addressCountry: "MA",
    },
  },
  description:
    "Remote web development services for startups — MVP builds, SaaS landing pages, admin dashboards, and CRM systems. Fast delivery and transparent communication for founders worldwide.",
  areaServed: { "@type": "AdministrativeArea", name: "Worldwide" },
  serviceType: "Web Development",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Web Developer for Startups", item: "https://digitalstudiolf.online/web-developer-for-startups" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I hire a remote web developer for my startup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The fastest path is a direct conversation — share your idea, your timeline, and your budget. We respond within 24 hours, scope the project together, and start as soon as you approve the proposal. No lengthy onboarding, no agency overhead.",
      },
    },
    {
      "@type": "Question",
      name: "Can you build an MVP for my startup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We build MVPs for startups that need to move fast — landing pages to validate demand, SaaS sign-up flows with authentication, admin dashboards to manage early users, and CRM systems for handling leads. We focus on what you actually need to launch, not over-engineered abstractions.",
      },
    },
    {
      "@type": "Question",
      name: "What tech stack do you use for startups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most startups we use Next.js (React) with Tailwind CSS on the front end — fast, SEO-friendly, and easy to hand off. Backend APIs are built in Node.js. We can also work within an existing stack if you have one.",
      },
    },
    {
      "@type": "Question",
      name: "How much does startup web development cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A landing page + sign-up flow starts around $800–$1,500. A full MVP with dashboard and user authentication typically falls in the $2,000–$6,000 range depending on complexity. We quote based on scope, not hourly guesswork.",
      },
    },
  ],
};

const deliverables = [
  { icon: "🚀", title: "MVP Builds", desc: "Ship your first version fast. We scope only what you need to validate — not what you might need later." },
  { icon: "🌐", title: "Landing Pages", desc: "High-converting pages to test your offer before you build the full product. Copy, design, and analytics-ready." },
  { icon: "📊", title: "Admin Dashboards", desc: "Custom dashboards for managing users, orders, leads, or any data your startup runs on." },
  { icon: "🔐", title: "Auth & User Systems", desc: "Login, registration, role-based access, and session management. Built secure from the start." },
  { icon: "🔌", title: "API Integrations", desc: "Connect your product to Stripe, Mailchimp, HubSpot, Twilio, or any third-party service you need." },
  { icon: "📈", title: "SaaS Interfaces", desc: "Clean, modern interfaces for SaaS products. Onboarding flows, settings pages, billing UI — all of it." },
];

const faqs = [
  {
    q: "How do I hire a remote web developer for my startup?",
    a: "The fastest path is a direct conversation — share your idea, your timeline, and your budget. We respond within 24 hours, scope the project together, and start as soon as you approve the proposal. No lengthy onboarding, no agency overhead.",
  },
  {
    q: "Can you build an MVP for my startup?",
    a: "Yes. We build MVPs for startups that need to move fast — landing pages to validate demand, SaaS sign-up flows with authentication, admin dashboards to manage early users, and CRM systems for handling leads. We focus on what you actually need to launch, not over-engineered abstractions.",
  },
  {
    q: "What tech stack do you use for startups?",
    a: "For most startups we use Next.js (React) with Tailwind CSS on the front end — fast, SEO-friendly, and easy to hand off. Backend APIs are built in Node.js. We can also work within an existing stack if you have one.",
  },
  {
    q: "How much does startup web development cost?",
    a: "A landing page + sign-up flow starts around $800–$1,500. A full MVP with dashboard and user authentication typically falls in the $2,000–$6,000 range depending on complexity. We quote based on scope, not hourly guesswork.",
  },
];

export default function StartupDeveloperPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
        {/* Hero */}
        <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <nav className="text-sm text-white/40 mb-8 flex justify-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Web Developer for Startups</span>
          </nav>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            Remote Development
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Remote Web Developer{" "}
            <span className="gradient-text">for Startups</span>
          </h1>
          <p className="text-white/55 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Fast, async, and scope-focused. We build what your startup actually needs — not bloated solutions that take six months and miss the market window.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-primary/25"
            >
              Start a Project
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] text-white/90 font-semibold text-base transition-all duration-300"
            >
              See All Services →
            </Link>
          </div>
        </section>

        {/* How we work */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 sm:p-10 border border-white/10">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">How We Work with Startups</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Most agencies make you wait two weeks for a discovery phase before a line of code is written. We don&apos;t work that way. Within 24 hours of your first message, you&apos;ll have a clear proposal with scope, price, and timeline. Work begins as soon as you sign off.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              We work async-first, which means no time-zone friction. You get updates daily, review in your own time, and give feedback whenever it suits you. Progress doesn&apos;t stop because our hours don&apos;t match yours.
            </p>
            <p className="text-white/60 leading-relaxed">
              Founders who&apos;ve worked with large agencies tell us the same thing: they paid for account managers and project coordinators, not code. We cut that overhead. You work directly with the developer building your product.
            </p>
          </div>
        </section>

        {/* Deliverables */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            What We Build for Startups
          </h2>
          <p className="text-white/50 text-center max-w-xl mx-auto mb-12">
            From zero to live product — every piece of web infrastructure your startup needs.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((d) => (
              <div key={d.title} className="glass rounded-xl p-6 border border-white/10 hover:border-primary/20 transition-all duration-300">
                <div className="text-3xl mb-4">{d.icon}</div>
                <h3 className="text-lg font-bold mb-2">{d.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why remote */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">
            Why Remote Works Better for Startups
          </h2>
          <div className="space-y-4">
            {[
              { title: "Lower cost, same quality", desc: "You're not paying for office space, HR, or local market salaries. You get senior-level output at a competitive rate." },
              { title: "No long-term commitment", desc: "Hire for a project, not a salary. When the work is done, you pay nothing more. Scale back up when the next build is ready." },
              { title: "Faster iteration", desc: "Remote developers are used to async feedback loops — they iterate faster because they have to. No waiting for the weekly meeting to fix a bug." },
              { title: "Access to niche skills", desc: "The best developer for your specific stack isn't necessarily in your city. Remote hiring opens your talent pool to the world." },
            ].map((item) => (
              <div key={item.title} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-3">{item.q}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-black mb-6">Related Services & Articles</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { href: "/services/admin-dashboards", label: "Admin Dashboards" },
              { href: "/services/crm-systems", label: "Custom CRM Systems" },
              { href: "/news/how-much-does-a-custom-crm-cost", label: "How Much Does a Custom CRM Cost?" },
              { href: "/news/wix-vs-custom-website", label: "Wix vs Custom Website for Business" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="glass rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-all duration-300 text-sm text-white/70 hover:text-primary">
                {l.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
