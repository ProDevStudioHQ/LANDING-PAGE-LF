import Link from "next/link";

// Calm, tasteful conversion band for article pages. Reading-first sites still
// convert — one accent button, no loud banner.
export default function ArticleCTA({
  heading = "Need help with this for your business?",
  body = "We design fast, SEO-focused websites and custom systems. Tell us what you're working on — the first consultation is free.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-8 sm:px-10 sm:py-10 text-center">
      <h2 className="text-2xl font-black text-white mb-3">{heading}</h2>
      <p className="text-white/55 max-w-xl mx-auto mb-6 leading-relaxed">{body}</p>
      <Link
        href="/contact"
        className="inline-block px-7 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
      >
        Let&apos;s talk →
      </Link>
    </div>
  );
}
