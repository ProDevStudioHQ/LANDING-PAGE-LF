"use client";

import { useState } from "react";
import Link from "next/link";

// Newsletter signup band, used on the blog and the homepage. Posts a real lead
// to the existing /api/contact endpoint so it lands in the CRM — no separate
// mailing backend needed. `source` tells the CRM where the signup came from.
export default function NewsletterCTA({
  title = "Get Digital Studio LF blog updates in your inbox",
  description = "Occasional, practical articles on web design, CRM, and growth. No spam.",
  source = "blog",
}: {
  title?: string;
  description?: string;
  source?: string;
} = {}) {
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
          name: "Newsletter subscriber",
          email,
          projectType: "Newsletter",
          message: `Subscribed to the newsletter (${source}).`,
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
        <h2 className="text-2xl sm:text-3xl font-black mb-3">{title}</h2>
        <p className="text-white/50 mb-7">{description}</p>

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
        {status !== "done" && (
          <p className="text-white/40 text-xs mt-4">
            Unsubscribe any time with one reply. See our{" "}
            <Link href="/privacy" className="underline hover:text-white/70">privacy policy</Link>.
          </p>
        )}
      </div>
    </section>
  );
}
