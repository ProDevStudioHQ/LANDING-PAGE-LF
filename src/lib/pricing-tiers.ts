import type { TierOverride } from "@/components/PricingPlansSection";

/* Live sale pricing/badges from the CRM Promotions module. Fetched
 * server-side (no CORS) with a 60s revalidate window, so activating a
 * promotion in the CRM shows within a minute. Falls back to the static prices
 * if the CRM is unreachable. Shared by the homepage pricing and /start, so the
 * two can never show different numbers. */
export async function getTierOverrides(): Promise<Record<string, TierOverride>> {
  let base = "https://crm.digitalstudiolf.online";
  try {
    const api = process.env.NEXT_PUBLIC_CRM_API_URL;
    if (api) base = new URL(api).origin;
  } catch {}
  try {
    const res = await fetch(`${base}/api/public/pricing/tiers`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};
    const data = await res.json();
    const map: Record<string, TierOverride> = {};
    for (const t of (data.tiers || []) as TierOverride[]) map[t.tier_key] = t;
    return map;
  } catch {
    return {};
  }
}

// Same USD→MAD ratio every built-in plan uses ($250 → 2,500 MAD).
const MAD_PER_USD = 10;

export type OfferPrice = {
  /** "$150" */
  price: string;
  /** "1,500 MAD" */
  priceMad: string;
  /** "$250" when on sale, else null */
  was: string | null;
  badge: string | null;
};

/** The "from" price of a built-in plan, with any live CRM promotion applied —
 *  the same rules PricingPlansSection uses for the homepage cards. */
export function offerPrice(baseUsd: number, ov: TierOverride | undefined): OfferPrice {
  const fmt = (label: string, n: number) =>
    `${label}${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  const mad = (usd: number) => `${Math.round(usd * MAD_PER_USD).toLocaleString("en-US")} MAD`;
  if (ov && !ov.is_contact_only) {
    const cl = ov.currency_label || "$";
    if (ov.on_sale && ov.sale_price != null) {
      const original = ov.original_price ?? baseUsd;
      return {
        price: fmt(cl, ov.sale_price),
        priceMad: mad(ov.sale_price),
        was: original > ov.sale_price ? fmt(cl, original) : null,
        badge: ov.badge_text || null,
      };
    }
    if (ov.original_price != null) {
      return { price: fmt(cl, ov.original_price), priceMad: mad(ov.original_price), was: null, badge: ov.badge_text || null };
    }
  }
  return { price: fmt("$", baseUsd), priceMad: mad(baseUsd), was: null, badge: null };
}
