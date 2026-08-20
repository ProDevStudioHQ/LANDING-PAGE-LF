"use client";

import { m } from "framer-motion";
import Link from "next/link";

export default function CTASection() {

  return (
    // No id="contact" here. ContactForm already owns that id, and both sections
    // render on the homepage — two elements sharing one id is invalid HTML, and
    // the browser silently resolved #contact to whichever came first (the form).
    // The "Book My Free Consultation" button below still targets #contact, i.e.
    // the actual form, which is what it was always meant to do.
    <section className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-3xl sm:text-4xl lg:text-6xl font-black mb-6 leading-tight">
            Ready to Build Something{" "}
            <span className="gradient-text">Incredible?</span>
          </p>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Get a free 30-minute consultation and a custom proposal within 24
            hours. Limited spots available this month.
          </p>

          {/* Trust micro-points */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-primary font-bold">✓</span> Free
              consultation
            </span>
            <span className="flex items-center gap-2">
              <span className="text-primary font-bold">✓</span> 24-hour
              response time
            </span>
            <span className="flex items-center gap-2">
              <span className="text-primary font-bold">✓</span> No commitment
              required
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="#contact"
              className="group px-10 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-full hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300 text-lg pulse-red"
            >
              Book My Free Consultation
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
            <a
              href="#pricing"
              className="px-10 py-4 glass border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              See Pricing
            </a>
          </div>

          <p className="text-white/40 text-sm mb-12">
            Free 30-min consultation — no commitment.
          </p>

          {/* The Etsy and Fiverr marketplace buttons that sat here were removed:
              a "Hire Us on Fiverr" CTA reprices the studio in a buyer's head
              before they reach the pricing table. The shop lives on /shop. */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="pt-12 border-t border-white/10"
          >
            <p className="text-white/50 text-sm font-medium mb-6">Prefer to browse first?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full glass border border-white/10 hover:border-white/25 transition-all duration-300"
              >
                <span className="text-white font-semibold">See our work</span>
                <span className="text-white/50 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full glass border border-white/10 hover:border-white/25 transition-all duration-300"
              >
                <span className="text-white font-semibold">Browse the shop</span>
                <span className="text-white/50 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
