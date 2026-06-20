"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitLead } from "@/lib/crm";

export default function EmailCaptureSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(false);

    const ok = await submitLead({ email, source: "lead_magnet" });

    setLoading(false);
    if (ok) {
      setSubmitted(true);
    } else {
      setError(true);
    }
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Free Resource
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Free:{" "}
            <span className="gradient-text">Digital Strategy Checklist</span>
          </h2>

          {/* Subheading */}
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            10-point checklist we use to audit websites, CRMs, and dashboards
            before launch. Free instant download.
          </p>

          {/* Form or success state */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-8 border border-primary/20"
            >
              <div className="text-4xl mb-3">✓</div>
              <p className="text-white text-lg font-semibold mb-1">
                Check your inbox — your checklist is on its way!
              </p>
              <p className="text-white/60 text-sm">
                If you don&apos;t see it, check your spam folder.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 w-full px-5 py-3.5 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/45 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-sm"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300 text-sm whitespace-nowrap disabled:opacity-60 disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Me the Checklist"
                )}
              </button>
            </form>
          )}

          {/* Error message */}
          {error && !submitted && (
            <p className="text-red-400 text-sm mt-3">
              Something went wrong. Please try again.
            </p>
          )}

          {/* Disclaimer */}
          {!submitted && (
            <p className="text-white/25 text-xs mt-4">
              No spam. Unsubscribe anytime.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
