import { getPortfolioList } from "@/lib/crm-content";
import { getTierOverrides } from "@/lib/pricing-tiers";
import { orderForTerm } from "@/lib/project-match";

/** Data for /start and /fr/start: projects ordered for the campaign's utm_term. */
export async function loadStartData(searchParams: Promise<Record<string, string | string[] | undefined>>) {
  const sp = await searchParams;
  const term = typeof sp.utm_term === "string" ? sp.utm_term.slice(0, 100) : null;
  const [{ items }, tiers] = await Promise.all([getPortfolioList("limit=50"), getTierOverrides()]);
  return { items: orderForTerm(items, term), tiers };
}
