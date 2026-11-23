import Link from "next/link";

/** The Navbar logo on its own, for minimal pages that carry no navigation. */
export default function BrandMark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} title="Digital Studio LF — home" className="inline-flex items-center gap-3">
      <svg width="18" height="28" viewBox="0 0 18 28" fill="none" aria-hidden="true">
        <path d="M5 0H13L13 1L5 28H0L0 27L5 0Z" fill="#EF4444" />
      </svg>
      <span className="font-bold text-xl tracking-tight leading-none">
        <span className="text-white">Digital </span>
        <span className="text-primary">Studio LF</span>
      </span>
    </Link>
  );
}
