"use client";

import { useState } from "react";

// Blog newsletter signup band (the footer "email updates" block in the
// reference). Posts a real lead to the existing /api/contact endpoint so it
// lands in the CRM — no separate mailing backend needed.
export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Blog newsletter subscriber",
          email,
          projectType: "Newsletter",
          message: "Subscribed to the blog newsletter.",
        }),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-white/[0.03] border-t border-white/10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        <h2 className="text-2xl sm:text-3xl font-black mb-3">
          Get Digital Studio LF blog updates in your inbox
        </h2>
        <p className="text-white/50 mb-7">
          Occasional, practical articles on web design, CRM, and growth. No spam.
        </p>

        {status === "done" ? (
          <p className="text-primary font-semibold">Thanks — you&apos;re on the list. 🎉</p>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="you@example.com"
              aria-label="Email address"
              className="flex-1 px-5 py-3 rounded-full bg-black/40 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-primary/60 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-7 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Subscribing…" : "Subscribe Now"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm mt-3">Please enter a valid email and try again.</p>
        )}
      </div>
    </section>
  );
}
