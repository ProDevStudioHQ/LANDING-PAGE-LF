import type { Metadata } from "next";
import Link from "next/link";
import { ETSY_SHOP_URL } from "@/lib/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageGraphJson } from "@/lib/schema";
import { getProductsList } from "@/lib/crm-content";
import { priceInfo, categoryLabel } from "@/lib/shop-pricing";
import ShopGrid, { type ShopCard } from "@/components/shop/ShopGrid";
import {
  HiOutlineArrowDownTray,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineLockClosed,
  HiOutlineSparkles,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

export const revalidate = 300;

const SITE_URL = "https://digitalstudiolf.online";

// Async so the catalogue can gate indexability: an empty storefront linked from
// every page in the site is a thin-content signal, and this one currently
// renders zero products. Index it only once the CRM actually returns stock.
export async function generateMetadata(): Promise<Metadata> {
  let hasProducts = false;
  try {
    const { items } = await getProductsList("limit=1");
    hasProducts = items.length > 0;
  } catch {
    // CRM unreachable — stay on the safe side and don't invite indexing.
    hasProducts = false;
  }

  return {
    // Kept ≤60 chars incl. the " | Digital Studio LF" template suffix (20) so it
    // doesn't truncate in SERPs. 35 + 20 = 55, leaving a safe buffer.
    title: "Templates, Tools & Digital Products",
    description:
      "Digital products from Digital Studio LF — website templates, tools, and downloadable resources for businesses in Morocco and worldwide. Instant download.",
    alternates: { canonical: "/shop" },
    robots: hasProducts
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      title: "Shop | Digital Studio LF",
      description: "Templates, tools, and downloadable digital products.",
      url: `${SITE_URL}/shop`,
      images: [`${SITE_URL}/images/og-home.jpg`],
    },
  };
}

const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  "@id": `${SITE_URL}/shop#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
  ],
};

export default async function ShopPage() {
  const { items } = await getProductsList("limit=60");

  // CollectionPage + ItemList so Google treats /shop as a product listing
  // (eligible for the right rich result) rather than inheriting the base
  // LocalBusiness graph. The ItemList mirrors the visible product grid.
  const collectionSchema = {
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/shop#webpage`,
    name: "Shop — Templates, Tools & Digital Products",
    description:
      "Website templates, tools, and downloadable digital products built by Digital Studio LF.",
    url: `${SITE_URL}/shop`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    breadcrumb: { "@id": `${SITE_URL}/shop#breadcrumb` },
    inLanguage: "en",
    // Omit the ItemList entirely when the catalogue is empty. Declaring
    // `numberOfItems: 0` with an empty array is a positive assertion that the
    // page lists nothing — worse than saying nothing at all.
    ...(items.length > 0
      ? {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: items.length,
            // The entry is the Product itself, under the same `#product` @id
            // its own page emits, rather than a bare name/url pair that ties
            // back to nothing. The `url` stays the page; the @id is the thing.
            itemListElement: items.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Product",
                "@id": `${SITE_URL}/shop/${p.slug}#product`,
                url: `${SITE_URL}/shop/${p.slug}`,
                name: p.title,
                ...(p.main_image_url ? { image: p.main_image_url } : {}),
                brand: { "@id": `${SITE_URL}/#business` },
              },
            })),
          },
        }
      : {}),
  };

  const cards: ShopCard[] = items.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: categoryLabel(p.category),
    image: p.main_image_url,
    summary: p.short_description,
    featured: !!p.is_featured,
    isFree: !!p.is_free,
    price: priceInfo(p),
  }));
  const bestDeal = Math.max(0, ...cards.map((c) => c.price.percentOff ?? 0));

  const perks = [
    { icon: HiOutlineArrowDownTray, title: "Instant download", text: "Files ready the moment payment clears." },
    { icon: HiOutlineLockClosed, title: "Secure checkout", text: "Paid safely through Etsy, with buyer protection." },
    { icon: HiOutlineSparkles, title: "No subscription", text: "Pay once, keep it. No monthly fees." },
    { icon: HiOutlineWrenchScrewdriver, title: "Made by a real studio", text: "Built and supported by our team in Marrakech." },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: pageGraphJson(collectionSchema, breadcrumbSchema) }}
      />
      <Navbar />
      <main className="relative min-h-screen blog-surface text-white overflow-x-hidden">
        {/* Hero */}
        <section className="relative pt-36 sm:pt-40 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.14),transparent_65%)]" />
          <div className="relative max-w-7xl mx-auto">
            <nav className="text-sm text-white/60 mb-8 flex gap-2" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/25">/</span>
              <span className="text-white/80">Shop</span>
            </nav>

            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs font-semibold uppercase tracking-wider text-white/70 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  Digital Studio LF Shop
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-5">
                  Ready-made apps &amp;{" "}
                  <span className="gradient-text">templates</span> for small businesses
                </h1>
                <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                  CRMs, planners and dashboards built by our studio. Download today, run your
                  business tomorrow, with no monthly fees.
                </p>
              </div>
              <a
                href={ETSY_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F1641E] hover:bg-[#d9561a] text-white font-semibold transition-colors self-start lg:self-end"
              >
                Visit our Etsy shop
                <HiOutlineArrowTopRightOnSquare className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Promo banner — only while something is actually discounted */}
            {bestDeal > 0 && (
              <div className="mt-10 rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-transparent px-5 sm:px-7 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="font-semibold">
                  <span className="text-emerald-300 font-black text-lg mr-2">Sale</span>
                  Save up to <span className="text-emerald-300 font-black">{bestDeal}%</span> on selected
                  products
                </p>
                <p className="text-sm text-white/60">Prices shown include the discount.</p>
              </div>
            )}
          </div>
        </section>

        {/* Products */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
          {cards.length > 0 ? (
            <ShopGrid cards={cards} />
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-20 text-center">
              <p className="text-white/70 text-lg mb-2">New digital products are coming soon.</p>
              <p className="text-white/45 text-sm">Meanwhile, browse what&apos;s live on our Etsy shop.</p>
            </div>
          )}
          </div>
        </section>

        {/* Perks */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {perks.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <Icon className="w-6 h-6 text-white/80 mb-3" aria-hidden="true" />
                <p className="font-semibold mb-1">{title}</p>
                <p className="text-sm text-white/55 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* About the products (kept for search: describes the catalogue in text) */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-3">Need something made for you?</h2>
              <p className="text-white/55 leading-relaxed mb-6">
                Every product here started as a custom build. If a template is close but not quite
                right, we can adapt it or build your own version.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
              >
                Ask for a custom version →
              </Link>
            </div>
            <div className="text-white/50 leading-relaxed space-y-4 text-[15px]">
              <p>
                Our digital products are the same building blocks we use on client projects,
                packaged so you can start faster: order trackers, CRMs, business planners and
                dashboards for home businesses and small teams in Morocco and worldwide.
              </p>
              <p>
                Most come with a quick-start guide and free bug fixes, and none need a
                subscription. New releases land regularly, so it&apos;s worth checking back, or follow
                the shop on Etsy to hear about them first.
              </p>
            </div>
          </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
