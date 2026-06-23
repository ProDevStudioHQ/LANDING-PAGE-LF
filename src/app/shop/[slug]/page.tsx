import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProduct, getProductsList, type ProductDetail } from "@/lib/crm-content";

export const revalidate = 300;

const SITE_URL = "https://digitalstudiolf.online";

export async function generateStaticParams() {
  try {
    const { items } = await getProductsList("limit=60");
    return items.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProduct(slug);
  if (!data) return { title: "Product not found" };
  const { item } = data;
  const description = item.short_description || item.public_description || "Digital product by Digital Studio LF.";
  const image = item.main_image_url || undefined;
  return {
    title: { absolute: `${item.title} — Shop` },
    description,
    alternates: { canonical: `/shop/${slug}` },
    openGraph: {
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

function buyAction(item: ProductDetail): { label: string; href: string; external: boolean } {
  switch (item.delivery_type) {
    case "instant_download":
      return { label: "Download", href: item.download_url || item.buy_url || "/contact", external: !!(item.download_url || item.buy_url) };
    case "external_checkout":
      return { label: "Buy now", href: item.buy_url || "/contact", external: !!item.buy_url };
    case "contact":
    default:
      return { label: "Get in touch", href: "/contact", external: false };
  }
}

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

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.title,
    description: item.short_description || item.public_description || undefined,
    image: item.main_image_url || undefined,
    category: item.category || undefined,
    brand: { "@type": "Organization", name: "Digital Studio LF" },
    offers: {
      "@type": "Offer",
      price: item.promotion?.discounted_price ?? item.price ?? 0,
      priceCurrency: item.currency || "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/shop/${item.slug}`,
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
      { "@type": "ListItem", position: 3, name: item.title, item: `${SITE_URL}/shop/${item.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="relative min-h-screen blog-surface text-white">
        <div className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <nav className="text-sm text-white/40 mb-8 flex gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-white/70 line-clamp-1">{item.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Gallery */}
            <div className="space-y-4">
              {item.main_image_url && (
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                  <Image src={item.main_image_url} alt={item.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                </div>
              )}
              {item.gallery_images?.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {item.gallery_images.map((url) => (
                    <div key={url} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5">
                      <Image src={url} alt={item.gallery_meta?.[url] || item.title} fill loading="lazy" sizes="33vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buy panel */}
            <div>
              {item.category && <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">{item.category}</p>}
              <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-4">{item.title}</h1>
              {item.short_description && <p className="text-white/55 text-lg leading-relaxed mb-6">{item.short_description}</p>}

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-black text-white">{price.main}</span>
                {price.strike && <span className="text-white/35 text-lg line-through">{price.strike}</span>}
                {item.promotion?.label && <span className="px-2.5 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">{item.promotion.label}</span>}
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href={buy.href}
                  {...(buy.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="px-7 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
                >
                  {buy.label} →
                </a>
                {item.demo_url && (
                  <a href={item.demo_url} target="_blank" rel="noopener noreferrer" className="px-7 py-3 rounded-full border border-white/15 text-white/80 font-semibold hover:border-primary/40 hover:text-primary transition-colors">
                    Live demo →
                  </a>
                )}
              </div>

              {item.features?.length > 0 && (
                <ul className="space-y-2 mb-8">
                  {item.features.map((f) => (
                    <li key={f} className="flex gap-3 items-start text-white/70 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {/* Specs */}
              {(item.tech_stack?.length > 0 || item.file_format) && (
                <table className="w-full text-sm border-collapse">
                  <tbody className="divide-y divide-white/5">
                    {item.file_format && (
                      <tr>
                        <td className="py-2 pr-4 text-white/40">Format</td>
                        <td className="py-2 text-white/80">{item.file_format}</td>
                      </tr>
                    )}
                    {item.tech_stack?.length > 0 && (
                      <tr>
                        <td className="py-2 pr-4 text-white/40 align-top">Tech</td>
                        <td className="py-2 text-white/80">{item.tech_stack.join(", ")}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Full description */}
          {item.full_description && (
            <div
              className="article-prose mt-14"
              dangerouslySetInnerHTML={{ __html: item.full_description }}
            />
          )}

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-white/10">
              <h2 className="text-xl font-black mb-6">Related products</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/shop/${r.slug}`} className="glass rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-all text-sm text-white/70 hover:text-primary">
                    {r.title} →
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
