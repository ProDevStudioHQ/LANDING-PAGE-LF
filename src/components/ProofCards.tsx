import Image from "next/image";
import Link from "next/link";
import { isConceptProject, portfolioCategoryLabel, type PortfolioItem } from "@/lib/crm-content";
import { industryLabel } from "@/lib/project-match";
import { TESTIMONIALS } from "@/config/testimonials";

// Portfolio proof for the landing pages (/start, /contact). Honest by design:
// every project the CRM has today is a studio concept, so each card says so,
// and the CRM's percentage "results" are not shown as client outcomes.

const COPY = {
  en: { concept: "Concept project", client: "Client", view: "View project" },
  fr: { concept: "Projet concept", client: "Client", view: "Voir le projet" },
};

export function ProofCards({
  items,
  locale = "en",
  firstIsLcp = false,
}: {
  items: PortfolioItem[];
  locale?: "en" | "fr";
  firstIsLcp?: boolean;
}) {
  const t = COPY[locale];
  if (!items.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((p, i) => {
        const img = p.thumbnail_url || p.hero_image_url;
        const category = portfolioCategoryLabel(p.category);
        const inferred = industryLabel(p, locale);
        const industry = inferred && inferred !== category ? inferred : null;
        const line = p.short_description || p.subtitle;
        return (
          <Link
            key={p.slug}
            href={`/portfolio/${p.slug}`}
            data-cta="proof_card"
            className="group glass rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-300 flex flex-col"
          >
            {img && (
              <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                <Image
                  src={img}
                  alt={`${p.title}${category ? ` — ${category}` : ""} by Digital Studio LF`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={firstIsLcp && i === 0}
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {industry && (
                  <span className="px-2.5 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium">
                    {industry}
                  </span>
                )}
                {category && (
                  <span className="px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-medium">
                    {category}
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full border border-white/10 text-white/60 text-xs font-medium">
                  {isConceptProject(p) ? t.concept : `${t.client}: ${p.client_name}`}
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors mb-1.5">{p.title}</h3>
              {line && <p className="text-white/60 text-sm leading-relaxed line-clamp-2">{line}</p>}
              <span className="mt-auto pt-4 text-sm font-semibold text-primary">
                {t.view} <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/** First real testimonial, or nothing while none exists (src/config/testimonials.ts). */
export function TestimonialSlot({ className = "" }: { className?: string }) {
  const q = TESTIMONIALS[0];
  if (!q) return null;
  const who = [q.role, q.business, q.city].filter(Boolean).join(", ");
  return (
    <figure className={`glass rounded-2xl border border-white/10 p-6 sm:p-8 ${className}`}>
      <blockquote className="text-white/80 text-lg leading-relaxed">&ldquo;{q.quote}&rdquo;</blockquote>
      <figcaption className="mt-4 text-sm text-white/55">
        <span className="font-semibold text-white">{q.name}</span>
        {who && ` — ${who}`}
        {q.projectSlug && (
          <>
            {" · "}
            <Link href={`/portfolio/${q.projectSlug}`} className="text-primary hover:underline">
              Case study
            </Link>
          </>
        )}
      </figcaption>
    </figure>
  );
}
