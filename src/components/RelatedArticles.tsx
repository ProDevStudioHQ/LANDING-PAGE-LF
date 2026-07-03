import Link from "next/link";
import { getNewsList } from "@/lib/crm-content";

type ServiceLink = { href: string; label: string };

// Renders a "Related" grid combining the latest CRM articles (fetched live,
// server-side) with optional static service/page links. Async server component
// — safe to drop into any server page. If the CRM is empty/unreachable it just
// renders the service links (graceful).
export default async function RelatedArticles({
  heading = "Related Articles & Services",
  services = [],
  count = 2,
  lang,
}: {
  heading?: string;
  services?: ServiceLink[];
  count?: number;
  lang?: string;
}) {
  const params = new URLSearchParams({ limit: String(count) });
  if (lang) params.set("lang", lang);
  const { items } = await getNewsList(params.toString());

  const articleLinks: ServiceLink[] = items
    .slice(0, count)
    .map((p) => ({ href: `/blog/${p.slug}`, label: p.title }));

  const links = [...articleLinks, ...services];
  if (links.length === 0) return null;

  return (
    <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-black mb-6">{heading}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="glass rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-all duration-300 text-sm text-white/70 hover:text-primary"
          >
            {l.label} →
          </Link>
        ))}
      </div>
    </section>
  );
}
