import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import ReadingProgress from "@/components/ReadingProgress";
import ArticleTOC from "@/components/ArticleTOC";
import AuthorCard from "@/components/AuthorCard";
import ArticleCTA from "@/components/ArticleCTA";

export const metadata: Metadata = {
  title: { absolute: "Get Direct Hotel Bookings Without Booking.com" },
  description:
    "Guide for hotel and riad owners on reducing OTA dependency: how a direct booking website works, what it costs, and how to get guests to book direct.",
  alternates: { canonical: "/blog/direct-booking-website-without-booking-com" },
  keywords: [
    "direct booking website without booking.com",
    "how to get direct hotel bookings",
    "reduce OTA dependency",
    "hotel direct booking system",
    "stop paying booking.com commission",
    "riad direct bookings",
    "boutique hotel website bookings",
  ],
  openGraph: {
    title: "How to Get Direct Hotel Bookings Without Booking.com",
    description:
      "A practical guide for independent hotels and riads on building a direct booking channel — what it takes, what it costs, and how to make it work.",
    url: "https://digitalstudiolf.online/blog/direct-booking-website-without-booking-com",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Get Direct Hotel Bookings Without Booking.com (2026 Guide)",
  description:
    "How independent hotels and riads can build a direct booking channel, reduce OTA commissions, and own their guest relationships.",
  author: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
  publisher: { "@type": "Organization", name: "Digital Studio LF", url: "https://digitalstudiolf.online" },
  datePublished: "2026-06-01",
  dateModified: "2026-06-01",
  url: "https://digitalstudiolf.online/blog/direct-booking-website-without-booking-com",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalstudiolf.online" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://digitalstudiolf.online/blog" },
    { "@type": "ListItem", position: 3, name: "Direct Booking Website Without Booking.com", item: "https://digitalstudiolf.online/blog/direct-booking-website-without-booking-com" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can a small hotel or riad compete with Booking.com?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You don't need to compete with Booking.com directly — you need to convert guests who already found your property on OTAs into direct bookers. A direct booking website with a best-rate guarantee and a frictionless checkout is often enough to shift a meaningful share of reservations to your own channel.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a direct booking website cost for a hotel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A custom direct booking website for a hotel or riad typically costs $1,200–$4,500 depending on features. That includes an availability calendar, online payment, automated email confirmations, and a reservation management panel. The system pays for itself after just a few saved commissions for most properties.",
      },
    },
    {
      "@type": "Question",
      name: "What should a hotel direct booking website include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At minimum: a real-time availability calendar, secure online payment (Stripe or PayPal), automated booking confirmation emails, a best-rate guarantee message, and a mobile-optimised design. For properties with multiple room types, room-specific pricing and availability is also essential.",
      },
    },
  ],
};

export default function DirectBookingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
      <ReadingProgress />
      <ArticleTOC />
      <main className="relative min-h-screen blog-surface text-white">
        <article className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-white/40 mb-8 flex gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/70">Direct Booking Without Booking.com</span>
          </nav>

          {/* Header */}
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-5">
            Hospitality
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight">
            How to Get Direct Hotel Bookings Without Booking.com (2026 Guide)
          </h1>
          <div className="flex items-center gap-4 text-white/30 text-sm mb-10">
            <span>June 1, 2026</span>
            <span>·</span>
            <span>8 min read</span>
            <span>·</span>
            <span>Digital Studio LF</span>
          </div>

          {/* Body */}
          <div className="article-prose">
            <p>
              If you own or manage a hotel, riad, or boutique property, you already know the mathematics of OTA dependency. Booking.com takes 15–25% of every reservation. Expedia takes 15–30%. Airbnb takes up to 14% from guests and 3% from hosts. For a property generating $8,000/month in bookings, that&apos;s $1,200–$2,400 leaving your business every single month — paid to platforms that also own the guest relationship.
            </p>
            <p>
              The question isn&apos;t whether you should have a direct booking channel. The question is what it takes to make one that actually works.
            </p>

            <h2 className="text-2xl font-black text-white mt-10">Why Most Hotel Websites Don&apos;t Get Direct Bookings</h2>
            <p>
              The most common mistake is building a beautiful website that makes it hard to actually book. Guests land on the site, see photos, read about the property — and then hit a contact form instead of a booking button. Or they find a form that requires an email exchange before they get a price. Friction kills conversions.
            </p>
            <p>
              The second mistake is not giving guests a reason to book directly. If your website shows the same price as Booking.com, guests will book through the OTA — because they trust it, they have their payment details saved, and they get the OTA&apos;s cancellation protection. You need to offer something the OTA can&apos;t match.
            </p>

            <h2 className="text-2xl font-black text-white mt-10">What a Direct Booking System Actually Needs</h2>

            <h3 className="text-xl font-bold text-white mt-8">1. A Real-time Availability Calendar</h3>
            <p>
              Guests won&apos;t wait 12 hours for you to reply to a &quot;are you available for these dates?&quot; email. They&apos;ll open Booking.com and find a property with instant availability. Your site needs to show live availability — updated automatically when bookings come in from any channel.
            </p>

            <h3 className="text-xl font-bold text-white mt-8">2. Secure Online Payment</h3>
            <p>
              Guests need to pay to confirm. A booking isn&apos;t a reservation until there&apos;s a transaction. Integrate Stripe, PayPal, or a local payment gateway. Send an automated receipt immediately. This is the single biggest conversion driver on a direct booking site.
            </p>

            <h3 className="text-xl font-bold text-white mt-8">3. Best-Rate Guarantee</h3>
            <p>
              Put this prominently on your site: &quot;Book directly with us — guaranteed lowest price. No OTA markups, no hidden fees.&quot; If you discount your direct price by even 5%, you give guests the financial reason to book with you instead of the OTA. Over a year, the math is overwhelmingly in your favour.
            </p>

            <h3 className="text-xl font-bold text-white mt-8">4. Mobile-optimised Experience</h3>
            <p>
              More than 60% of hotel searches happen on mobile devices. If your booking flow is awkward on a phone — tiny buttons, hard-to-read calendars, payment forms that break on small screens — you lose those bookings. Test every step of your checkout on a real phone before going live.
            </p>

            <h3 className="text-xl font-bold text-white mt-8">5. Automated Confirmation Emails</h3>
            <p>
              When someone books, send an immediate confirmation with reservation details, check-in instructions, and your WhatsApp or phone number. This sets the guest experience tone and reduces inbound queries. Add a pre-arrival email three days before check-in as a reminder and upsell opportunity.
            </p>

            <h2 className="text-2xl font-black text-white mt-10">How to Drive Guests to Your Direct Channel</h2>
            <p>
              Getting guests who already know your property to book directly is easier than it sounds. Here&apos;s what works:
            </p>
            <div className="space-y-4 not-prose">
              {[
                { title: "Google Business Profile", desc: "Your GBP listing should link directly to your booking page — not your homepage. Guests who find you on Google Maps can book in two clicks." },
                { title: "Direct booking incentive", desc: "Offer a small discount, a free welcome drink, a late checkout, or a complimentary airport transfer for direct bookings. Guests respond to tangible perks." },
                { title: "Instagram and Facebook links", desc: "Every social media post and bio link should go to your booking page, not a generic contact page." },
                { title: "OTA profile bio", desc: "Many OTAs allow you to mention your property website. Include a line like 'Book directly at [your site] for the best rate.'" },
                { title: "Email list", desc: "After each stay, collect the guest's email (with permission). A simple annual email — 'Planning another visit? Book directly for 10% off' — can recover a significant number of returning guests." },
              ].map((item) => (
                <div key={item.title} className="glass rounded-xl p-5 border border-white/10">
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-white/55 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-black text-white mt-10">The Cost of a Direct Booking Website</h2>
            <p>
              A custom direct booking website for an independent property typically costs $1,200–$4,500 depending on features. The higher end includes multiple room types, seasonal pricing, a channel manager integration, and a full reservation management dashboard.
            </p>
            <p>
              The calculation is simple: if your property does $5,000/month in OTA bookings and you shift 20% to direct ($1,000/month), you save $150–$250/month in commission. The website pays for itself in 6–18 months. Every month after that is profit recovered.
            </p>

            <h2 className="text-2xl font-black text-white mt-10">Frequently Asked Questions</h2>
            <div className="not-prose space-y-4">
              {[
                {
                  q: "Can a small hotel or riad compete with Booking.com?",
                  a: "You don't need to compete with Booking.com directly — you need to convert guests who already found your property on OTAs into direct bookers. A direct booking website with a best-rate guarantee and frictionless checkout is often enough to shift a meaningful share of reservations.",
                },
                {
                  q: "How much does a direct booking website cost for a hotel?",
                  a: "A custom direct booking website typically costs $1,200–$4,500 depending on features. That includes an availability calendar, online payment, automated email confirmations, and a reservation management panel.",
                },
                {
                  q: "What should a hotel direct booking website include?",
                  a: "At minimum: a real-time availability calendar, secure online payment, automated booking confirmations, a best-rate guarantee message, and mobile-optimised design.",
                },
              ].map((item) => (
                <div key={item.q} className="glass rounded-xl p-6 border border-white/10">
                  <h3 className="font-bold text-white mb-2">{item.q}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related */}
          <div className="mt-16 pt-10 border-t border-white/10">
            <h2 className="text-xl font-black mb-6">Related Articles & Services</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { href: "/booking-websites-for-hotels", label: "Booking Websites for Hotels & Riads" },
                { href: "/blog/websites-for-riads-and-hotels-marrakesh", label: "Websites for Riads and Hotels in Marrakesh" },
                { href: "/web-design-morocco", label: "Web Design Agency in Morocco" },
                { href: "/services/business-websites", label: "Business Website Service" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="glass rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-all duration-300 text-sm text-white/70 hover:text-primary">
                  {l.label} →
                </Link>
              ))}
            </div>
          </div>
          <AuthorCard />
          <ShareButtons />
          <ArticleCTA />
        </article>
      </main>
      <Footer />
    </>
  );
}
