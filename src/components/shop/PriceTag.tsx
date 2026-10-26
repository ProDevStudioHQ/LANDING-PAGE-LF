import type { PriceInfo } from "@/lib/shop-pricing";

// Current price first and largest, the old price struck through beside it,
// then the saving spelled out — the three numbers a buyer compares.
export default function PriceTag({ info, size = "md" }: { info: PriceInfo; size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <div>
      <div className="flex items-baseline gap-2.5 flex-wrap">
        <span
          className={`font-black tracking-tight ${big ? "text-4xl" : "text-2xl"} ${
            info.onSale ? "text-emerald-400" : "text-white"
          }`}
        >
          {info.current}
        </span>
        {info.original && (
          <span className={`text-white/45 line-through decoration-white/40 ${big ? "text-xl" : "text-base"}`}>
            <span className="sr-only">Was </span>
            {info.original}
          </span>
        )}
        {info.percentOff != null && (
          <span
            className={`rounded-md bg-emerald-500/15 text-emerald-300 font-bold ${
              big ? "px-2.5 py-1 text-sm" : "px-2 py-0.5 text-xs"
            }`}
          >
            {info.percentOff}% off
          </span>
        )}
      </div>
      {info.save && (
        <p className={`mt-1.5 text-emerald-300/90 font-medium ${big ? "text-sm" : "text-xs"}`}>
          You save {info.save}
          {info.promoLabel ? ` · ${info.promoLabel}` : ""}
          {info.endsInDays != null &&
            ` · ends ${info.endsInDays <= 1 ? "today" : `in ${info.endsInDays} days`}`}
        </p>
      )}
    </div>
  );
}
