"use client";

import { m } from "framer-motion";
import { FaEtsy } from "react-icons/fa6";
import { SiFiverr } from "react-icons/si";

export default function CTASection() {

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
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
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-6 leading-tight">
            Ready to Build Something{" "}
            <span className="gradient-text">Incredible?</span>
          </h2>
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

          {/* Etsy & Fiverr Showcase */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="pt-12 border-t border-white/10"
          >
            <p className="text-white/50 text-sm font-medium mb-6">Want to buy something?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

              <a
                href="https://www.etsy.com/shop/DigitalStudioLF"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500/5 to-amber-500/[0.02] border border-yellow-600/20 hover:border-yellow-500/50 hover:from-yellow-500/20 hover:to-amber-500/5 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20"
              >
                <FaEtsy size={20} className="text-yellow-600/70 group-hover:text-yellow-400 transition-colors" aria-hidden="true" role="presentation" />
                <div className="flex flex-col items-start">
                  <span className="text-yellow-600 font-semibold group-hover:text-yellow-400 transition-colors">
                    Visit Our Shop
                  </span>
                  <span className="text-yellow-600/40 text-xs">Explore Digital Products</span>
                </div>
                <span className="ml-2 text-yellow-600/50 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </a>

              <a
                href="https://www.fiverr.com/theknight12?public_mode=true"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-green-500/5 to-emerald-500/[0.02] border border-green-600/20 hover:border-green-500/50 hover:from-green-500/20 hover:to-emerald-500/5 transition-all duration-300 shadow-lg hover:shadow-green-500/20"
              >
                <SiFiverr size={26} className="text-green-500/80 group-hover:text-green-400 transition-colors" aria-hidden="true" role="presentation" />
                <div className="flex flex-col items-start">
                  <span className="text-green-500 font-semibold group-hover:text-green-400 transition-colors">
                    Hire Us on Fiverr
                  </span>
                  <span className="text-green-500/40 text-xs">See Services & Reviews</span>
                </div>
                <span className="ml-2 text-green-500/50 group-hover:text-green-400 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </a>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
