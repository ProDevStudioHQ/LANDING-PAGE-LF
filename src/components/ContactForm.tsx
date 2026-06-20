"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { identifyVisitor } from "@/lib/tracker";

const PROJECT_TYPES = ["Landing Page", "Website", "Dashboard", "CRM", "Other"];
const BUDGETS = ["Under $500", "$500–$1500", "$1500–$5000", "$5000+"];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[1]);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-fill projectType from URL hash, e.g. #contact?plan=Dashboard
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash;
      const m = hash.match(/plan=([^&]+)/);
      if (m) {
        const decoded = decodeURIComponent(m[1]);
        const match = PROJECT_TYPES.find(
          (p) => p.toLowerCase() === decoded.toLowerCase(),
        );
        if (match) setProjectType(match);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, projectType, budget, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      void identifyVisitor(email);
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="section-padding relative scroll-mt-24"
    >
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Let&apos;s <span className="gradient-text">build it</span>
          </h2>
          <p className="text-white/50 text-lg">
            Tell me about your project — I&apos;ll reply within 24 hours.
          </p>
        </motion.div>

        {status === "success" ? (
          <div className="glass rounded-2xl p-10 text-center border border-emerald-500/20">
            <div className="text-5xl mb-4">✓</div>
            <p className="text-white text-xl font-semibold mb-2">
              Thanks — I&apos;ll reply within 24 hours.
            </p>
            <p className="text-white/60 text-sm">
              In the meantime, check your inbox for a confirmation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-sm text-white/70 mb-2" htmlFor="cf-name">
                Name
              </label>
              <input
                id="cf-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/45 focus:outline-none focus:border-primary/50"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2" htmlFor="cf-email">
                Email
              </label>
              <input
                id="cf-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/45 focus:outline-none focus:border-primary/50"
                placeholder="you@email.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-white/70 mb-2" htmlFor="cf-type">
                  Project type
                </label>
                <select
                  id="cf-type"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50"
                >
                  {PROJECT_TYPES.map((p) => (
                    <option key={p} value={p} className="bg-black">
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2" htmlFor="cf-budget">
                  Budget
                </label>
                <select
                  id="cf-budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50"
                >
                  {BUDGETS.map((b) => (
                    <option key={b} value={b} className="bg-black">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2" htmlFor="cf-msg">
                Message
              </label>
              <textarea
                id="cf-msg"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/45 focus:outline-none focus:border-primary/50 resize-none"
                placeholder="Tell me about your project, timeline, and what success looks like."
              />
            </div>

            {errorMsg && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100"
            >
              {status === "loading" ? "Sending..." : "Send message"}
            </button>

            <p className="text-white/55 text-xs text-center">
              By submitting, you agree to be contacted about your project. No spam.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
