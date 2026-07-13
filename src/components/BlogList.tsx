"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { IconType } from "react-icons";
import { FiLayout, FiDatabase, FiMapPin, FiBookOpen, FiArrowRight } from "react-icons/fi";

export type Post = {
  slug: string;
  title: string;
  desc: string;
  date: string;
  category: string;
  read: string;
  featured?: boolean;
  image?: string | null;
  imageAlt?: string | null;
};

// Per-category cover treatment — a vibrant gradient + icon stands in for a
// cover photo (the posts have no images), giving the grid the colourful
// magazine look while staying on-brand.
const CATEGORY_META: Record<string, { grad: string; Icon: IconType }> = {
  "Web Design": { grad: "from-fuchsia-600 via-purple-600 to-indigo-700", Icon: FiLayout },
  CRM: { grad: "from-sky-500 via-blue-600 to-cyan-600", Icon: FiDatabase },
  "Local Business": { grad: "from-rose-500 via-red-500 to-orange-500", Icon: FiMapPin },
  Guides: { grad: "from-emerald-500 via-teal-600 to-green-700", Icon: FiBookOpen },
};
const FALLBACK = { grad: "from-zinc-600 via-zinc-700 to-zinc-800", Icon: FiBookOpen };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function PostCard({ post }: { post: Post }) {
  const { grad, Icon } = CATEGORY_META[post.category] ?? FALLBACK;
  // Some CRM cover images 404 (deleted/missing media). Track load failures so a
  // broken cover falls back to the category gradient + icon instead of a broken
  // image icon.
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(post.image) && !imgFailed;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-primary/40 hover:bg-white/[0.04] transition-all duration-300"
    >
      {/* Cover — real image when available, otherwise a category gradient */}
      <div className={`relative h-44 overflow-hidden ${showImage ? "bg-white/5" : `bg-gradient-to-br ${grad}`}`}>
        {showImage ? (
          <Image
            src={post.image as string}
            alt={post.imageAlt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <Icon
            className="absolute -right-4 -bottom-4 text-white/20 group-hover:scale-110 transition-transform duration-500"
            size={120}
            aria-hidden="true"
          />
        )}
        {post.category && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wide">
            {post.category}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h2 className="text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">{post.desc}</p>
        <div className="mt-auto flex items-center gap-3 pt-3 border-t border-white/5">
          <span
            className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary text-xs font-black flex-shrink-0"
            aria-hidden="true"
          >
            LF
          </span>
          <div className="text-xs text-white/45 leading-tight">
            <p className="text-white/70 font-medium">Digital Studio LF</p>
            <p>
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.read} read
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Mid-grid promotional band (the "Level Up" panel in the reference), adapted
// to the studio's services.
function PromoBand() {
  const cards = [
    { title: "Free Strategy Call", desc: "Tell us your goals — get a clear plan, no obligation.", href: "/contact", cta: "Book a call" },
    { title: "Custom Websites", desc: "Fast, SEO-focused sites built in 7–21 days.", href: "/services/business-websites", cta: "See the service" },
    { title: "Custom CRM Systems", desc: "Own your data with a system built around your workflow.", href: "/services/crm-systems", cta: "Explore CRM" },
  ];
  return (
    <div className="my-12 rounded-3xl bg-[#0E0E12] border border-white/10 p-7 sm:p-10">
      <h2 className="text-2xl sm:text-3xl font-black text-center mb-2">
        Level up your digital presence
      </h2>
      <p className="text-white/50 text-center max-w-xl mx-auto mb-8">
        Practical help from the team behind the blog — pick where you want to start.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 flex flex-col">
            <h3 className="font-bold mb-1">{c.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">{c.desc}</p>
            <Link href={c.href} className="text-primary text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
              {c.cta} <FiArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlogList({ posts }: { posts: Post[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  const setCategory = (c: string) => {
    setActive(c);
  };

  return (
    <>
      {/* Category filter */}
      <nav className="flex flex-wrap gap-2 mb-10" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={active === c}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              active === c
                ? "bg-primary text-white"
                : "bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </nav>

      {filtered.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>

          <PromoBand />
        </>
      ) : (
        <p className="text-white/40 text-center py-16">More articles coming soon.</p>
      )}
    </>
  );
}
