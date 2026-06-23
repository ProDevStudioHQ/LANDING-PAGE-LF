import Link from "next/link";

// Clean author byline below the article — builds E-E-A-T (a named, linkable
// author is a trust signal). No heavy box: a divider + a calm layout.
export default function AuthorCard() {
  return (
    <div className="mt-16 pt-10 border-t border-white/10 flex items-start gap-4">
      <div
        className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-black text-lg"
        aria-hidden="true"
      >
        LF
      </div>
      <div>
        <p className="text-white font-semibold">Digital Studio LF</p>
        <p className="text-white/55 text-sm leading-relaxed mt-1 max-w-md">
          A web design &amp; CRM development studio in Marrakesh, Morocco. We build fast,
          SEO-focused websites and custom systems for businesses in Morocco and worldwide.
        </p>
        <Link
          href="/about"
          className="text-primary text-sm font-medium mt-2 inline-block hover:text-primary-light transition-colors"
        >
          About the studio →
        </Link>
      </div>
    </div>
  );
}
