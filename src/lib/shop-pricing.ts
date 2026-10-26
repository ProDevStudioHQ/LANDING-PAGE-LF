import type { Product } from "@/lib/crm-content";

// One pricing view for the shop grid and the product page, so a discount is
// always shown the same way: current price, struck-through old price, % off
// and the amount saved. The CRM sends money as strings ("24.00"), hence
// Number() everywhere.

export type PriceInfo = {
  current: string; // formatted, or "Free" / custom label
  original: string | null; // formatted old price, only when higher than current
  percentOff: number | null;
  save: string | null;
  promoLabel: string | null;
  endsInDays: number | null;
  currentValue: number | null;
  onSale: boolean;
};

const num = (v: unknown): number | null => {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

export function formatMoney(n: number, currency = "USD"): string {
  const whole = Math.abs(n - Math.round(n)) < 0.005;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);
}

type PricedProduct = Pick<
  Product,
  "price" | "currency" | "compare_at_price" | "is_free" | "price_label" | "promotion"
>;

export function priceInfo(p: PricedProduct): PriceInfo {
  const cur = p.currency || "USD";
  const base = num(p.price);
  const compare = num(p.compare_at_price);
  const promo = num(p.promotion?.discounted_price);

  let endsInDays: number | null = null;
  if (p.promotion?.ends_at) {
    const ms = new Date(p.promotion.ends_at).getTime() - Date.now();
    if (Number.isFinite(ms) && ms > 0) endsInDays = Math.ceil(ms / 86_400_000);
  }

  if (p.is_free) {
    return {
      current: p.price_label || "Free",
      original: null,
      percentOff: null,
      save: null,
      promoLabel: null,
      endsInDays: null,
      currentValue: 0,
      onSale: false,
    };
  }

  // A live promotion beats the regular price; its "was" is the regular price
  // (or the compare-at price if that is higher).
  const currentValue = promo ?? base;
  const wasCandidates = promo != null ? [base, compare] : [compare];
  const was = Math.max(...wasCandidates.map((v) => v ?? -Infinity));
  const hasWas = currentValue != null && Number.isFinite(was) && was > currentValue;

  if (currentValue == null) {
    return {
      current: p.price_label || "—",
      original: null,
      percentOff: null,
      save: null,
      promoLabel: null,
      endsInDays: null,
      currentValue: null,
      onSale: false,
    };
  }

  return {
    current: p.price_label && promo == null ? p.price_label : formatMoney(currentValue, cur),
    original: hasWas ? formatMoney(was, cur) : null,
    percentOff: hasWas ? Math.round(((was - currentValue) / was) * 100) : null,
    save: hasWas ? formatMoney(was - currentValue, cur) : null,
    promoLabel: p.promotion?.label || null,
    endsInDays: promo != null ? endsInDays : null,
    currentValue,
    onSale: hasWas,
  };
}

// "dashboard_template" → "Dashboard template"
export function categoryLabel(category: string | null | undefined): string | null {
  if (!category) return null;
  const t = category.replace(/[_-]+/g, " ").trim().toLowerCase();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : null;
}
