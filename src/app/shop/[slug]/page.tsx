import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageGraphJson, ETSY_SHOP_URL, WHATSAPP_NUMBER } from "@/lib/schema";
import { getProduct, type ProductDetail } from "@/lib/crm-content";
import ProductGallery from "@/components/shop/ProductGallery";
import ExpandableDescription from "@/components/shop/ExpandableDescription";
import {
  HiChevronDown,
  HiOutlineArrowDownTray,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineCodeBracket,
  HiOutlineDocument,
  HiOutlineLockClosed,
  HiOutlineSparkles,
} from "react-icons/hi2";

// ISR rather than force-dynamic. The old setting made every article render
// per-request and ship `Cache-Control: private, no-cache, no-store` — public
// marketing content opted out of caching at every layer, and cf-cache-status
// was DYNAMIC on 100% of these pages. It bought nothing in freshness either:
// the underlying CRM fetch is already cached for 300s, so force-dynamic only
// skipped the page cache, not the data cache.
//
// generateStaticParams is exported empty rather than omitted: with no such
// export at all, Next classifies the segment as fully dynamic and skips the
// page cache entirely, so `revalidate` on its own changed nothing. Exporting
// it (dynamicParams defaults to true) marks the route as ISR with zero
// prebuilt paths — slugs created after the last deploy still render on
// demand, but the result is cached and revalidated on the same 300s cycle.
export const revalidate = 300;

export function generateStaticParams() {
  return [];
}

const SITE_URL = "https://digitalstudiolf.online";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProduct(slug);
  if (!data) return { title: "Product not found" };
  const { item } = data;
  // CRM-fed copy can overflow SERP limits — clamp on a word boundary so
  // titles/metas never truncate mid-sentence in results.
  const clamp = (s: string, max: number) => {
    const t = s.trim();
    if (t.length <= max) return t;
    const cut = t.slice(0, max - 1);
    return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max - 21))}…`;
  };
  const description = clamp(
    item.short_description || item.public_description || "Digital product by Digital Studio LF.",
    158,
  );
  const image = item.main_image_url || undefined;
  return {
    title: { absolute: clamp(`${item.title} — Shop`, 60) },
    description,
    alternates: { canonical: `/shop/${slug}` },
    openGraph: {
      type: "website",
      title: { absolute: item.title },
      description,
      url: `${SITE_URL}/shop/${slug}`,
      images: image ? [image] : undefined,
    },
    twitter: { card: "summary_large_image", title: item.title, description, images: image ? [image] : undefined },
  };
}

function priceDisplay(item: ProductDetail) {
  const cur = item.currency || "USD";
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
  if (item.promotion?.discounted_price != null)
    return { main: fmt(item.promotion.discounted_price), strike: item.price != null ? fmt(item.price) : null };
  if (item.is_free) return { main: item.price_label || "Free", strike: null };
  if (item.price_label) return { main: item.price_label, strike: null };
  if (item.price != null) return { main: fmt(item.price), strike: item.compare_at_price != null ? fmt(item.compare_at_price) : null };
  return { main: "—", strike: null };
}

// Paid products are sold through the Etsy shop, so the primary action is
// "Buy on Etsy". The CRM stores the listing URL as copied from the browser
// (French locale path + tracking params); normalise it to the clean listing
// link. External checkout without a listing falls back to the shop front.
function etsyListingUrl(raw: string | null): string | null {
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (!/(^|\.)etsy\.com$/i.test(u.hostname)) return null;
    const m = u.pathname.match(/\/listing\/(\d+)(\/[^/?#]*)?/);
    if (!m) return null;
    return `https://www.etsy.com/listing/${m[1]}${m[2] || ""}`;
  } catch {
    return null;
  }
}

function buyAction(item: ProductDetail): { label: string; href: string; external: boolean; etsy: boolean } {
  const etsy = etsyListingUrl(item.buy_url);
  if (etsy) return { label: "Buy on Etsy", href: etsy, external: true, etsy: true };
  switch (item.delivery_type) {
    case "instant_download":
      return { label: "Download", href: item.download_url || item.buy_url || "/contact", external: !!(item.download_url || item.buy_url), etsy: false };
    case "external_checkout":
      return { label: "Buy on Etsy", href: ETSY_SHOP_URL, external: true, etsy: true };
    case "contact":
    default:
      return { label: "Get in touch", href: "/contact", external: false, etsy: false };
  }
}

// CRM descriptions are often plain text with line breaks (pasted from Etsy).
// Injected as HTML those breaks collapsed into one paragraph.
const looksLikeHtml = (s: string) => /<\/?[a-z][\s\S]*?>/i.test(s);

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProduct(slug);
  if (!data) notFound();
  const { item, related } = data;
  const price = priceDisplay(item);
  const buy = buyAction(item);

  // ItemPage → Product, both addressable. The Product had no @id, so the
  // ItemList entry on /shop referred to an entity that did not exist here, and
  // nothing typed the URL as a page.
  const PRODUCT_URL = `${SITE_URL}/shop/${item.slug}`;
  const productSchema = {
    "@type": "Product",
    "@id": `${PRODUCT_URL}#product`,
    url: PRODUCT_URL,
    mainEntityOfPage: { "@id": `${PRODUCT_URL}#webpage` },
    name: item.title,
    description: item.short_description || item.public_description || undefined,
    image: item.main_image_url || undefined,
    category: item.category || undefined,
    brand: { "@id": "https://digitalstudiolf.online/#business" },
    offers: {
      "@type": "Offer",
      price: item.promotion?.discounted_price ?? item.price ?? 0,
      priceCurrency: item.currency || "USD",
      availability: "https://schema.org/InStock",
      url: PRODUCT_URL,
    },
  };
  const webPageSchema = {
    "@type": "ItemPage",
    "@id": `${PRODUCT_URL}#webpage`,
    url: PRODUCT_URL,
    name: item.title,
    ...(item.short_description || item.public_description
      ? { description: item.short_description || item.public_description }
      : {}),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    breadcrumb: { "@id": `${PRODUCT_URL}#breadcrumb` },
    mainEntity: { "@id": `${PRODUCT_URL}#product` },
    inLanguage: "en",
  };
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${PRODUCT_URL}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
      { "@type": "ListItem", position: 3, name: item.title, item: `${SITE_URL}/shop/${item.slug}` },
    ],
  };

  // Etsy-style listing: main image first, then the gallery, de-duplicated.
  const images = [item.main_image_url, ...(item.gallery_images || [])]
    .filter((u): u is string => !!u)
    .filter((u, i, arr) => arr.indexOf(u) === i)
    .map((src, i) => ({
      src,
      alt: item.gallery_meta?.[src] || `${item.title} — image ${i + 1}`,
    }));

  const description = (item.full_description || item.public_description || item.short_description || "").trim();
  const category = item.category?.replace(/_/g, " ").toLowerCase();

  const highlights: { icon: React.ReactNode; text: string }[] = [
    { icon: <HiOutlineArrowDownTray />, text: "Digital download" },
    ...(item.file_format
      ? [{ icon: <HiOutlineDocument />, text: `Digital file type(s): 1 ${item.file_format.toUpperCase()}` }]
      : []),
    { icon: <HiOutlineSparkles />, text: "Designed and built by Digital Studio LF" },
    ...(item.tech_stack?.length
      ? [{ icon: <HiOutlineCodeBracket />, text: `Built with ${item.tech_stack.join(", ")}` }]
      : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: pageGraphJson(webPageSchema, productSchema, breadcrumbSchema),
        }}
      />
      <Navbar />
      <main className="relative min-h-screen blog-surface text-white">
        <div className="pt-32 sm:pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <nav className="text-sm text-white/60 mb-6 flex gap-2 flex-wrap items-center" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/25">/</span>
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            {category && (
              <>
                <span className="text-white/25">/</span>
                <span className="capitalize">{category}</span>
              </>
            )}
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Gallery */}
            <div className="min-w-0 lg:col-span-7 lg:sticky lg:top-28">
              <ProductGallery images={images} />
            </div>

            {/* Listing panel */}
            <div className="min-w-0 lg:col-span-5">
              {item.promotion?.label && (
                <p className="text-emerald-400 text-sm font-semibold mb-2">{item.promotion.label}</p>
              )}
              <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                <span className="text-3xl font-black text-white">{price.main}</span>
                {price.strike && <span className="text-white/45 text-lg line-through">{price.strike}</span>}
              </div>

              <h1 className="text-xl sm:text-2xl font-semibold leading-snug text-white/95 mb-4">{item.title}</h1>

              <p className="flex items-center gap-2 text-sm text-white/70 mb-6">
                <span className="font-semibold text-white">Digital Studio LF</span>
                <span className="text-white/25">·</span>
                Marrakech, Morocco
              </p>

              <div className="flex items-start gap-2.5 text-sm text-white/80 mb-6">
                <HiOutlineArrowDownTray className="w-5 h-5 text-white/70 flex-shrink-0" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-white">Instant Download.</strong>
                  {buy.etsy && " Your files are ready as soon as payment is confirmed on Etsy."}
                </span>
              </div>

              <a
                href={buy.href}
                {...(buy.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`flex w-full items-center justify-center gap-2 py-4 rounded-full font-bold text-base text-white transition-colors ${
                  buy.etsy ? "bg-[#F1641E] hover:bg-[#d9561a]" : "bg-primary hover:bg-primary-dark"
                }`}
              >
                {buy.label}
                {buy.external && <HiOutlineArrowTopRightOnSquare className="w-5 h-5" aria-hidden="true" />}
              </a>
              {buy.etsy && (
                <p className="flex items-center justify-center gap-1.5 text-xs text-white/50 mt-2.5">
                  <HiOutlineLockClosed className="w-3.5 h-3.5" aria-hidden="true" />
                  Secure checkout on Etsy · Etsy Purchase Protection
                </p>
              )}
              {item.demo_url && (
                <a
                  href={item.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex w-full items-center justify-center py-3.5 rounded-full border-2 border-white/80 text-white font-semibold hover:bg-white/5 transition-colors"
                >
                  View live demo
                </a>
              )}

              {/* Item details */}
              <details open className="group mt-8 border-t border-white/10 pt-5">
                <summary className="flex items-center justify-between cursor-pointer list-none text-lg font-semibold">
                  Item details
                  <HiChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-white/90 mb-3">Highlights</p>
                  <ul className="space-y-3 mb-6">
                    {highlights.map((h) => (
                      <li key={h.text} className="flex items-start gap-3 text-[15px] text-white/80">
                        <span className="mt-0.5 text-white/60 flex-shrink-0 [&>svg]:w-5 [&>svg]:h-5" aria-hidden="true">
                          {h.icon}
                        </span>
                        {h.text}
                      </li>
                    ))}
                  </ul>
                  {item.features?.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {item.features.map((f) => (
                        <li key={f} className="flex gap-3 items-start text-white/75 text-[15px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2.5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  {description && (
                    <ExpandableDescription
                      {...(looksLikeHtml(description) ? { html: description } : { text: description })}
                    />
                  )}
                </div>
              </details>

              {/* Delivery */}
              <details className="group mt-6 border-t border-white/10 pt-5">
                <summary className="flex items-center justify-between cursor-pointer list-none text-lg font-semibold">
                  Delivery
                  <HiChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="mt-4 space-y-3 text-[15px] text-white/75 leading-relaxed">
                  <p>
                    <strong className="text-white">Instant Download.</strong> Your files will be available to
                    download once payment is confirmed. You will find them in your Etsy account under Purchases.
                  </p>
                  <p>
                    Digital downloads can&apos;t be returned or exchanged. Something not working? Message us and
                    we will sort it out.
                  </p>
                </div>
              </details>

              {/* Meet your seller */}
              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="text-lg font-semibold mb-4">Meet your seller</p>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="26" viewBox="0 0 18 28" fill="none" aria-hidden="true">
                      <path d="M5 0H13L13 1L5 28H0L0 27L5 0Z" fill="#EF4444" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Digital Studio LF</p>
                    <p className="text-sm text-white/55">Web studio in Marrakech, Morocco</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I have a question about "${item.title}"`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center py-3 rounded-full border border-white/20 text-sm font-semibold hover:bg-white/5 transition-colors"
                  >
                    Message us
                  </a>
                  <a
                    href={ETSY_SHOP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center py-3 rounded-full border border-white/20 text-sm font-semibold hover:bg-white/5 transition-colors"
                  >
                    Visit Etsy shop
                  </a>
                </div>
                <p className="text-sm text-white/55 mt-4">
                  Need it customised for your business?{" "}
                  <Link href="/contact" className="text-white underline underline-offset-2 hover:text-primary">
                    Ask for a custom version
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* More from this shop */}
          {related.length > 0 && (
            <section className="mt-20 pt-10 border-t border-white/10">
              <div className="flex items-end justify-between gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">More from this shop</h2>
                <Link href="/shop" className="text-sm font-semibold text-white/70 hover:text-white">
                  See all →
                </Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {related.slice(0, 8).map((r) => (
                  <Link key={r.slug} href={`/shop/${r.slug}`} className="group">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 mb-3">
                      {r.main_image_url && (
                        <Image
                          src={r.main_image_url}
                          alt={r.title}
                          fill
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        />
                      )}
                    </div>
                    <p className="text-sm text-white/80 line-clamp-2 group-hover:underline">{r.title}</p>
                    {r.price != null && (
                      <p className="text-sm font-bold mt-1">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: r.currency || "USD",
                          maximumFractionDigits: 0,
                        }).format(r.promotion?.discounted_price ?? r.price)}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
