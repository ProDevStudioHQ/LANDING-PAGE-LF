import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SitemapGraph from "@/components/SitemapGraph";
import { siteTree, type SiteNode } from "@/lib/sitemap-tree";

export const metadata = {
  title: "Sitemap",
  description:
    "Interactive visual sitemap of Digital Studio LF — explore every page: services, portfolio, blog, shop and more.",
  alternates: { canonical: "/sitemap" },
};

// Flatten the tree into grouped link lists for the SEO/no-JS fallback below the
// interactive graph.
function topGroups(): SiteNode[] {
  return siteTree.children ?? [];
}

export default function SitemapPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black">
        <section className="relative overflow-hidden pt-24 pb-6">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h1 className="mb-3 text-4xl font-black text-white sm:text-5xl">Sitemap</h1>
            <p className="max-w-2xl text-lg text-white/60">
              Explore the whole site at a glance. Drag to move around, scroll or use the{" "}
              <span className="text-white/80">+ / −</span> buttons to zoom, and click any node to
              open that page.
            </p>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <SitemapGraph />
        </section>

        {/* Plain HTML index — crawlable and works without JavaScript. */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-white">All pages</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {topGroups().map((group) => (
              <div key={group.id}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                  {group.href ? (
                    <Link href={group.href} className="hover:underline">
                      {group.label}
                    </Link>
                  ) : (
                    group.label
                  )}
                </h3>
                <ul className="space-y-1.5">
                  {(group.children ?? []).flatMap((child) =>
                    child.children
                      ? child.children.map((leaf) => (
                          <li key={leaf.id}>
                            <Link
                              href={leaf.href ?? "#"}
                              className="text-sm text-white/60 transition hover:text-white"
                            >
                              {leaf.label}
                            </Link>
                          </li>
                        ))
                      : [
                          <li key={child.id}>
                            <Link
                              href={child.href ?? "#"}
                              className="text-sm text-white/60 transition hover:text-white"
                            >
                              {child.label}
                            </Link>
                          </li>,
                        ]
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
