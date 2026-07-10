// Hierarchical view of the site used by the visual sitemap graph (/sitemap).
// Reuses the navbar service config as the single source of truth for service
// pages, so the graph never drifts from the real navigation.
import { serviceGroups, resolveHref } from "@/config/services";

export type SiteNode = {
  id: string;
  label: string;
  href?: string;
  // Visual category — drives the node colour in the graph.
  group:
    | "root"
    | "core"
    | "services"
    | "service"
    | "content"
    | "local"
    | "french"
    | "legal";
  children?: SiteNode[];
};

export const siteTree: SiteNode = {
  id: "home",
  label: "Home",
  href: "/",
  group: "root",
  children: [
    {
      id: "services",
      label: "Services",
      href: "/services",
      group: "services",
      children: serviceGroups.map((g) => ({
        id: `group-${g.title}`,
        label: g.title,
        href: "/services",
        group: "services" as const,
        children: g.items.map((item) => ({
          id: item.href + item.label,
          label: item.label,
          href: resolveHref(item),
          group: "service" as const,
        })),
      })),
    },
    {
      id: "core",
      label: "Company",
      group: "core",
      children: [
        { id: "about", label: "About", href: "/about", group: "core" },
        { id: "contact", label: "Contact", href: "/contact", group: "core" },
        { id: "faq", label: "FAQ", href: "/faq", group: "core" },
        { id: "portfolio", label: "Portfolio", href: "/portfolio", group: "core" },
      ],
    },
    {
      id: "content",
      label: "Content",
      group: "content",
      children: [
        { id: "blog", label: "Blog", href: "/blog", group: "content" },
        { id: "shop", label: "Shop", href: "/shop", group: "content" },
      ],
    },
    {
      id: "local",
      label: "Local & Niche",
      group: "local",
      children: [
        { id: "wdm", label: "Web Design Morocco", href: "/web-design-morocco", group: "local" },
        { id: "hotels", label: "Booking Sites for Hotels", href: "/booking-websites-for-hotels", group: "local" },
        { id: "startups", label: "Web Dev for Startups", href: "/web-developer-for-startups", group: "local" },
      ],
    },
    {
      id: "french",
      label: "Français",
      group: "french",
      children: [
        { id: "fr-maroc", label: "Création Site Web Maroc", href: "/fr/creation-site-web-maroc", group: "french" },
        { id: "fr-marrakech", label: "Agence Web Marrakech", href: "/fr/agence-web-marrakech", group: "french" },
      ],
    },
    {
      id: "legal",
      label: "Legal",
      group: "legal",
      children: [
        { id: "privacy", label: "Privacy", href: "/privacy", group: "legal" },
        { id: "terms", label: "Terms", href: "/terms", group: "legal" },
        { id: "cookies", label: "Cookies", href: "/cookies", group: "legal" },
        { id: "gdpr", label: "GDPR", href: "/gdpr", group: "legal" },
      ],
    },
  ],
};
