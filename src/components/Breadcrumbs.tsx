import Link from "next/link";
import { breadcrumbNode, pageGraphJson } from "@/lib/schema";

export type Crumb = { name: string; path: string };

// Visible breadcrumb trail, optionally with its BreadcrumbList JSON-LD.
//
// Google only honours breadcrumb markup that matches a trail the visitor can
// see. Pages whose graph already carries a BreadcrumbList pass schema={false}
// and get the visible half only, so the node is never emitted twice.
// `items` starts at the homepage (path "") and ends at the current page.
export default function Breadcrumbs({
  items,
  schema = true,
  className = "text-sm text-white/60 mb-8 flex flex-wrap gap-2",
}: {
  items: Crumb[];
  schema?: boolean;
  className?: string;
}) {
  const last = items.length - 1;
  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: pageGraphJson(breadcrumbNode(items)) }}
        />
      )}
      <nav aria-label="Breadcrumb" className={className}>
        {items.map((c, i) => (
          <span key={c.path} className="flex gap-2">
            {i < last ? (
              <>
                <Link href={c.path || "/"} className="hover:text-white transition-colors">
                  {c.name}
                </Link>
                <span aria-hidden="true">/</span>
              </>
            ) : (
              <span className="text-white/70" aria-current="page">
                {c.name}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
