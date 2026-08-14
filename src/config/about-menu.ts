// About navigation config — the entries in the navbar's About dropdown.
//
// Every href must resolve to something real: the /about targets are section
// ids set on that page, so adding an entry here means adding (or confirming)
// the matching `id` in src/app/about/page.tsx. A menu item pointing at a
// missing anchor doesn't error — it just scrolls nowhere, which is worse.

export type AboutMenuItem = {
  emoji: string;
  label: string;
  href: string;
};

export const aboutMenu: AboutMenuItem[] = [
  { emoji: "👋", label: "About Digital Studio LF", href: "/about#about-intro" },
  { emoji: "🎯", label: "Our Approach", href: "/about#our-approach" },
  { emoji: "⚙️", label: "How We Work", href: "/about#how-we-work" },
  { emoji: "💡", label: "Our Expertise", href: "/about#our-expertise" },
  { emoji: "🏆", label: "Why Choose Us", href: "/about#why-choose-us" },
  { emoji: "🧩", label: "Our Technologies", href: "/about#our-technologies" },
  { emoji: "🌍", label: "Global Clients", href: "/about#global-clients" },
  { emoji: "📞", label: "Contact Us", href: "/contact" },
];
