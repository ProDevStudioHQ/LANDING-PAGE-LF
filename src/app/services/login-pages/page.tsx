import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceContent } from "@/config/services-content";

const svc = getServiceContent("login-pages")!;

export const metadata: Metadata = {
  title: "Secure Login Page Development Service",
  description:
    "Custom branded login pages with social login, 2FA, magic links, and passwordless authentication. Delivered in 7 days from $150. Morocco & worldwide.",
  keywords: [svc.focusKeyword, ...(svc.secondaryKeywords ?? [])],
  alternates: { canonical: "/services/login-pages" },
  openGraph: {
    title: "Secure Login Page Development | Digital Studio LF",
    description: "Branded authentication UIs with social login, 2FA, magic links, and secure session management. From $150, delivered in 7 days.",
    url: "https://digitalstudiolf.online/services/login-pages",
    images: [{ url: "https://digitalstudiolf.online/images/idea-digital.png", width: 1200, height: 630, alt: "Digital Studio LF" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Secure Login Page Development",
  description: "Custom branded authentication pages with social login, two-factor authentication, magic links, and secure session management.",
  provider: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
  areaServed: [{ "@type": "Country", name: "Morocco" }, { "@type": "AdministrativeArea", name: "Worldwide" }],
  serviceType: "Login Page Development",
  offers: { "@type": "Offer", price: "150", priceCurrency: "USD", description: "Starter login page — 7-day delivery" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://digitalstudiolf.online/services" },
    { "@type": "ListItem", position: 3, name: "Login Pages", item: "https://digitalstudiolf.online/services/login-pages" },
  ],
};

export default function LoginPagesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <nav className="text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Login Pages</span>
          </nav>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium mb-5">
              Secure Login Page Development
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Secure Login Page<br />
              <span className="text-purple-400">Development for Any Platform</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl">
              Branded authentication UIs for SaaS products, dashboards, admin panels, and client portals.
              Social login, 2FA, magic links, and passwordless — delivered in 7 days from $150.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/30 hover:scale-[1.03] transition-all duration-300">
                Start my login page — $150
              </a>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all duration-300">
                See all services
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">What&apos;s Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Beautiful Branded UI", desc: "Fully custom authentication screens matched to your brand — login, signup, forgot password, reset password, and email verification." },
              { title: "Social Login", desc: "Google, GitHub, Facebook, Apple — we integrate the providers your users expect, with proper OAuth flows and secure token handling." },
              { title: "Two-Factor Authentication (2FA)", desc: "TOTP-based 2FA (Google Authenticator, Authy) and SMS verification to protect high-security accounts." },
              { title: "Magic Links & Passwordless", desc: "One-click sign-in via email magic links — frictionless for users, secure on the backend with expiring tokens." },
              { title: "Session Management", desc: "Secure, HTTP-only cookie sessions with configurable expiry, device tracking, and force-logout capability." },
              { title: "Custom Onboarding Flows", desc: "Post-signup onboarding steps — role selection, profile setup, team invitation — built into the auth flow." },
            ].map((item) => (
              <div key={item.title} className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-purple-400 font-bold mb-2">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-center">Login Page Pricing</h2>
          <p className="text-white/50 text-center mb-12">Fixed price, delivered in 7 days.</p>
          <div className="max-w-sm mx-auto glass rounded-2xl p-8 border border-purple-500/30">
            <p className="text-purple-400 font-bold text-sm uppercase tracking-wider mb-2">Starter</p>
            <p className="text-5xl font-black mb-1">$150</p>
            <p className="text-white/40 text-sm mb-6 line-through">was $300</p>
            <ul className="space-y-3 mb-8">
              {["Modern branded design", "Responsive on all devices", "Forgot password flow", "Signup page", "Clean UI & animations", "Delivered in 7 days", "30 days free support"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="text-purple-400 mt-0.5">✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="/#contact" className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:scale-[1.02] transition-transform">
              Get started
            </a>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <p className="text-white/40 text-sm text-center mb-6">Explore related services</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/services/admin-dashboards" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-blue-500/30 hover:text-blue-400 transition-colors">Admin Dashboards</Link>
            <Link href="/services/crm-systems" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-colors">CRM Systems</Link>
            <Link href="/services/business-websites" className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-primary/30 hover:text-primary transition-colors">Business Websites</Link>
            <Link href="/#contact" className="px-4 py-2 rounded-full border border-purple-500/30 text-purple-400 text-sm hover:bg-purple-500/10 transition-colors">Free Consultation</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
