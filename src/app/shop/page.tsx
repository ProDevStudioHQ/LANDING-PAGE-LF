import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductsList, type Product } from "@/lib/crm-content";

export const revalidate = 300;

const SITE_URL = "https://digitalstudiolf.online";

export const metadata: Metadata = {
  title: "Shop — Templates, Tools & Digital Products",
  description:
    "Digital products from Digital Studio LF — website templates, tools, and downloadable resources for businesses in Morocco and worldwide.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop | Digital Studio LF",
    description: "Templates, tools, and downloadable digital products.",
    url: `${SITE_URL}/shop`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
  ],
};

export function formatPrice(p: Pick<Product, "price" | "currency" | "is_free" | "price_label" | "promotion" | "compare_at_price">) {
  const cur = p.currency || "USD";
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
  if (p.promotion?.discounted_price != null) {
    return { main: fmt(p.promotion.discounted_price), strike: p.price != null ? fmt(p.price) : null, label: p.promotion.label };
  }
  if (p.is_free) return { main: p.price_label || "Free", strike: null, label: null };
  if (p.price_label) return { main: p.price_label, strike: null, label: null };
  if (p.price != null) return { main: fmt(p.price), strike: p.compare_at_price != null ? fmt(p.compare_at_price) : null, label: null };
  return { main: "—", strike: null, label: null };
}

export default async function ShopPage() {
  const { items } = await getProductsList("limit=60");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="relative min-h-screen blog-surface text-white">
        <section className="pt-40 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <nav className="text-sm text-white/40 mb-8 flex gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Shop</span>
          </nav>
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">Shop</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-5">Templates, tools &amp; digital products</h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-2xl">
            Downloadable resources, website templates, and tools built by Digital Studio LF.
          </p>
        </section>

        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {items.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => {
                const price = formatPrice(p);
                return (
                  <Link
                    key={p.slug}
                    href={`/shop/${p.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-primary/40 transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] bg-white/5 overflow-hidden">
                      {p.main_image_url && (
                        <Image
                          src={p.main_image_url}
                          alt={`${p.title}${p.category ? ` — ${p.category}` : ""} by Digital Studio LF`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      )}
                      {p.is_free && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-bold">FREE</span>
                      )}
                      {p.promotion && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-white text-xs font-bold">{p.promotion.label || "Sale"}</span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      {p.category && <p className="text-primary/90 text-xs font-medium uppercase tracking-wider mb-2">{p.category}</p>}
                      <h2 className="text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors">{p.title}</h2>
                      {p.short_description && <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">{p.short_description}</p>}
                      <div className="mt-auto flex items-baseline gap-2">
                        <span className="text-white font-bold">{price.main}</span>
                        {price.strike && <span className="text-white/35 text-sm line-through">{price.strike}</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-white/40 text-center py-20">New digital products are coming soon.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
