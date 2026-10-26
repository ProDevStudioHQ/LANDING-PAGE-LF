"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineArrowDownTray, HiOutlineArrowRight } from "react-icons/hi2";
import PriceTag from "@/components/shop/PriceTag";
import type { PriceInfo } from "@/lib/shop-pricing";

export type ShopCard = {
  slug: string;
  title: string;
  category: string | null;
  image: string | null;
  summary: string | null;
  featured: boolean;
  isFree: boolean;
  price: PriceInfo;
};

type Sort = "featured" | "price-asc" | "price-desc" | "discount";

const SORTS: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "discount", label: "Biggest discount" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];

// Pricing is computed on the server (it depends on the clock for "ends in N
// days") and passed in, so server and client render the same numbers.
export default function ShopGrid({ cards }: { cards: ShopCard[] }) {
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("featured");

  const categories = useMemo(
    () => Array.from(new Set(cards.map((c) => c.category).filter((c): c is string => !!c))),
    [cards],
  );

  const visible = useMemo(() => {
    const list = cards.filter((c) => category === "all" || c.category === category);
    const val = (c: ShopCard) => c.price.currentValue ?? Infinity;
    return [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return val(a) - val(b);
        case "price-desc":
          return val(b) - val(a);
        case "discount":
          return (b.price.percentOff ?? 0) - (a.price.percentOff ?? 0);
        default:
          return Number(b.featured) - Number(a.featured);
      }
    });
  }, [cards, category, sort]);

  const chip = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
      active
        ? "bg-white text-black"
        : "bg-white/[0.05] text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {categories.length > 1 && (
            <>
              <button type="button" onClick={() => setCategory("all")} className={chip(category === "all")}>
                All
              </button>
              {categories.map((c) => (
                <button key={c} type="button" onClick={() => setCategory(c)} className={chip(category === c)}>
                  {c}
                </button>
              ))}
            </>
          )}
          {categories.length <= 1 && (
            <p className="text-white/60 text-sm py-2">
              {cards.length} {cards.length === 1 ? "product" : "products"}
            </p>
          )}
        </div>
        <label className="flex items-center gap-2 text-sm text-white/60">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="bg-white/[0.05] border border-white/10 rounded-full px-4 py-2 text-white focus:outline-none focus:border-white/30"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id} className="bg-[#0B0B0C]">
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {visible.map((p, i) => (
          <Link
            key={p.slug}
            href={`/shop/${p.slug}`}
            className="group flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300"
          >
            <div className="relative aspect-square bg-white/5 overflow-hidden">
              {p.image && (
                <Image
                  src={p.image}
                  alt={`${p.title}${p.category ? ` — ${p.category}` : ""} by Digital Studio LF`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                />
              )}
              <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
                {p.price.percentOff != null && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-black text-xs font-black shadow-lg">
                    -{p.price.percentOff}%
                  </span>
                )}
                {p.isFree && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-black text-xs font-black">FREE</span>
                )}
                {p.featured && (
                  <span className="px-2.5 py-1 rounded-full bg-white text-black text-xs font-bold">Featured</span>
                )}
              </div>
              {p.price.promoLabel && (
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-lg">
                  {p.price.promoLabel}
                </span>
              )}
            </div>

            <div className="p-3 sm:p-4 flex flex-col flex-1">
              {p.category && (
                <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2">{p.category}</p>
              )}
              <h2 className="text-sm sm:text-[15px] font-semibold leading-snug mb-2 line-clamp-2 text-white/95 group-hover:text-white">
                {p.title}
              </h2>
              <p className="inline-flex items-center gap-1.5 text-xs text-white/55 mb-4">
                <HiOutlineArrowDownTray className="w-3.5 h-3.5" aria-hidden="true" />
                Instant download
              </p>
              <div className="mt-auto flex items-end justify-between gap-2">
                <PriceTag info={p.price} />
                <span className="hidden sm:flex flex-shrink-0 w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <HiOutlineArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
