"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type Post = {
  slug: string;
  title: string;
  desc: string;
  date: string;
  category: string;
  read: string;
  featured?: boolean;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Clean, Medium/Ghost-style index: minimal category filter + a scannable
// vertical list separated by dividers (not boxed cards). Client component so
// the category filter is instant; the server page supplies the data + SEO.
export default function BlogList({ posts }: { posts: Post[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );
  const [active, setActive] = useState("All");

  const featured = posts.find((p) => p.featured);
  const visible = posts.filter(
    (p) => (active === "All" || p.category === active) && !(p.featured && active === "All")
  );

  return (
    <>
      {/* Category filter — subtle text tabs, accent underline on active */}
      <nav
        className="flex flex-wrap gap-x-6 gap-y-2 border-b border-white/10 pb-4 mb-10"
        aria-label="Filter by category"
      >
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={`text-sm pb-1 -mb-[17px] border-b-2 transition-colors ${
              active === c
                ? "text-white border-primary"
                : "text-white/45 border-transparent hover:text-white/80"
            }`}
          >
            {c}
          </button>
        ))}
      </nav>

      {/* Featured post — calm horizontal layout, shown only on "All" */}
      {featured && active === "All" && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group block pb-10 mb-10 border-b border-white/10"
        >
          <p className="text-primary text-xs font-medium uppercase tracking-wider mb-3">
            Featured · {featured.category}
          </p>
          <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-3 group-hover:text-primary transition-colors">
            {featured.title}
          </h2>
          <p className="text-white/55 leading-relaxed max-w-2xl mb-3">{featured.desc}</p>
          <p className="text-white/35 text-sm">
            <time dateTime={featured.date}>{formatDate(featured.date)}</time> · {featured.read} read
          </p>
        </Link>
      )}

      {/* Post list — dividers, not boxes */}
      {visible.length > 0 ? (
        <div className="divide-y divide-white/10">
          {visible.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block py-7 first:pt-0"
            >
              <p className="text-primary/90 text-xs font-medium uppercase tracking-wider mb-2">
                {p.category}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold leading-snug mb-2 group-hover:text-primary transition-colors">
                {p.title}
              </h2>
              <p className="text-white/50 leading-relaxed line-clamp-2 mb-2">{p.desc}</p>
              <p className="text-white/35 text-sm">
                <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.read} read
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-white/40 text-center py-16">More articles coming soon.</p>
      )}
    </>
  );
}
