"use client";

import Link from "next/link";
import { m } from "framer-motion";

// Industries with a dedicated page link to it, so this list doubles as internal
// links into the niche clusters (riads/hotels, travel agencies, startups).
const industries: { label: string; href?: string }[] = [
  { label: "Real Estate" },
  { label: "Restaurants & Food" },
  { label: "Tourism & Hospitality", href: "/booking-websites-for-hotels" },
  { label: "Car Rental" },
  { label: "Fitness & Wellness" },
  { label: "Beauty" },
  { label: "Professional Services" },
  { label: "Healthcare" },
  { label: "Education" },
  { label: "Local Businesses", href: "/web-design-morocco" },
  { label: "E-commerce", href: "/fr/creation-site-ecommerce-maroc" },
  { label: "Startups", href: "/web-developer-for-startups" },
  { label: "And more" },
];

export default function TargetAudienceSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Built Around Your Business */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5">
            Built Around <span className="gradient-text">Your Business</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
            We don&apos;t believe every business needs the same website or the same software.
            That&apos;s why we don&apos;t force businesses into one-size-fits-all solutions.
          </p>
          <p className="mt-6 text-xl sm:text-2xl font-bold text-white">
            Your business. Your workflow. Your solution.
          </p>
        </m.div>

        {/* Who We Work With */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Industries
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Who We <span className="gradient-text">Work With</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
            We work with businesses, entrepreneurs and organizations across different
            industries — in Marrakesh, across Morocco and worldwide.
          </p>

          <ul className="flex flex-wrap justify-center gap-3 mb-12">
            {industries.map(({ label, href }) => {
              const cls =
                "inline-flex items-center px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.04] text-sm sm:text-base font-medium text-white/75";
              return (
                <li key={label}>
                  {href ? (
                    <Link
                      href={href}
                      className={`${cls} hover:border-primary/40 hover:text-white hover:bg-primary/[0.08] transition-colors`}
                    >
                      {label}
                    </Link>
                  ) : (
                    <span className={cls}>{label}</span>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="glass rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <p className="text-white font-semibold text-lg mb-2">
              Have a different type of business? No problem.
            </p>
            <p className="text-white/55 leading-relaxed">
              If you have a business problem that can be solved digitally, let&apos;s talk about it.
            </p>
          </div>
        </m.div>
      </div>
    </section>
  );
}
