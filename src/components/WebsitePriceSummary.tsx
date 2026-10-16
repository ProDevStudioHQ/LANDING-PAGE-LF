import Link from "next/link";

// The site's published starting prices (PricingPlansSection and the FR price
// guide), shown on the English price guide. Keep in step with those two.
const rows = [
  { type: "Landing page", price: "from 2 500 MAD ($250)", time: "about 7 days", href: "/services/landing-pages" },
  { type: "Business website (5–7 pages)", price: "from 7 000 MAD ($700)", time: "10–14 days", href: "/services/business-websites" },
  { type: "Online store", price: "from 7 000 MAD ($700)", time: "2–4 weeks", href: "/services/online-stores" },
  { type: "Admin dashboard", price: "from 12 000 MAD ($1,200)", time: "3–5 weeks", href: "/services/admin-dashboards" },
  { type: "Custom CRM", price: "from 25 000 MAD ($2,500)", time: "4–8 weeks", href: "/services/crm-systems" },
];

export default function WebsitePriceSummary() {
  return (
    <aside className="mb-12 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-7 sm:px-8">
      <h2 className="text-xl font-black text-white mb-2">Our website prices in Morocco</h2>
      <p className="text-white/60 text-sm mb-5">
        Fixed starting prices, agreed in writing before work starts. The factors below explain what
        moves a project above them.
      </p>
      <ul className="divide-y divide-white/5 text-sm">
        {rows.map((r) => (
          <li key={r.type} className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3">
            <Link href={r.href} className="text-white hover:text-primary transition-colors">
              {r.type}
            </Link>
            <span className="text-white/70">
              {r.price} <span className="text-white/40">· {r.time}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="text-white/50 text-sm mt-5">
        See every service on our{" "}
        <Link href="/web-design-morocco" className="text-primary hover:underline">
          web design in Morocco
        </Link>{" "}
        page, or read the{" "}
        <Link href="/fr/prix-creation-site-web-maroc" className="text-primary hover:underline">
          guide des prix en français
        </Link>
        .
      </p>
    </aside>
  );
}
