"use client";

import { motion } from "framer-motion";
import { FaGithub, FaEtsy } from "react-icons/fa6";
import { useContactModal } from "./ContactModalProvider";

export default function CTASection() {
  const { openModal } = useContactModal();

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-6 leading-tight">
            Ready to Build Something{" "}
            <span className="gradient-text">Incredible?</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Let&apos;s turn your vision into a reality. Get a free consultation and
            a custom proposal within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => openModal("Start Your Project")}
              className="group px-10 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-full hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300 text-lg pulse-red"
            >
              Start Your Project
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
            <a
              href="#services"
              className="px-10 py-4 glass border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              Learn More
            </a>
          </div>

          <p className="text-white/30 text-sm">
            No commitment required • Free consultation • 24hr response time
          </p>

          {/* GitHub Portfolio & Etsy Shop Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 pt-12 border-t border-white/10"
          >
            <p className="text-white/50 text-sm font-medium mb-6">Want to buy something?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

              <a
                href="https://www.etsy.com/shop/DigitalStudioLF"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500/5 to-amber-500/[0.02] border border-yellow-600/20 hover:border-yellow-500/50 hover:from-yellow-500/20 hover:to-amber-500/5 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20"
              >
                <FaEtsy size={20} className="text-yellow-600/70 group-hover:text-yellow-400 transition-colors" />
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
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
