import Link from "next/link";

export type ServiceCardProps = {
  href: string;
  title: string;
  description?: string;
  price: string; // already resolved label, e.g. "From $250" / "Contact"
  /** stagger index within a row — drives the fade-in delay */
  index?: number;
};

/**
 * Shared service card for the /services hub.
 *
 * Deliberately monochrome: one dark surface, one subtle border, ONE accent
 * effect on hover (border brightens + arrow nudges). No per-category colors —
 * attention comes from size + contrast, not saturation. Red is reserved for the
 * hero eyebrow, the active quick-nav pill, and the bottom CTA.
 */
export default function ServiceCard({ href, title, description, price, index = 0 }: ServiceCardProps) {
  return (
    <Link
      href={href}
      style={{ ["--delay" as string]: `${Math.min(index, 6) * 60}ms` }}
      className="svc-card group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#141417] p-6 sm:p-7 transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#1C1C20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold leading-snug text-[#F5F5F5]">{title}</h3>
        <span className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[13px] font-medium text-[#9CA3AF]">
          {price}
        </span>
      </div>

      {description && (
        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-[#B0B0B8]">{description}</p>
      )}

      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#F5F5F5]">
        Learn more
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
