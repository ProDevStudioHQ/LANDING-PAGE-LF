// About navigation config — the single source of truth for the /about section.
//
// Everything downstream reads this list: the navbar dropdown, the teaser cards
// on the /about hub, and the sitemap. Adding a page here means creating the
// matching route at src/app/about/<slug>/page.tsx; nothing else needs editing.

export type AboutPage = {
  slug: string;
  emoji: string;
  // Navbar / teaser card label.
  label: string;
  // <h1> on the page itself.
  title: string;
  // Small chip above the h1.
  eyebrow: string;
  // Standfirst under the h1, and the teaser card's body copy.
  intro: string;
  seoTitle: string;
  seoDescription: string;
};

export const aboutPages: AboutPage[] = [
  {
    slug: "our-approach",
    emoji: "🎯",
    label: "Our Approach",
    title: "A studio built on craft and results",
    eyebrow: "Our Approach",
    intro:
      "Who we are, where we work, and the standard we hold every project to — senior-level work delivered fast, without the agency overhead.",
    seoTitle: "Our Approach — How Digital Studio LF Works",
    seoDescription:
      "A Marrakesh web development studio built on craft and results. Direct working relationships, fixed pricing, and delivery in 7–21 days.",
  },
  {
    slug: "how-we-work",
    emoji: "⚙️",
    label: "How We Work",
    title: "How we work",
    eyebrow: "Our Method",
    intro:
      "A rigorous four-phase process, tested on 120+ projects — from the first discovery call through to launch and post-delivery support.",
    seoTitle: "How We Work — Our 4-Phase Development Process",
    seoDescription:
      "Discovery, architecture, development, deployment. A four-phase web development process with fixed timelines, weekly check-ins, and no surprises.",
  },
  {
    slug: "our-expertise",
    emoji: "💡",
    label: "Our Expertise",
    title: "Services we deliver",
    eyebrow: "What We Do",
    intro:
      "Modern websites and custom systems built to grow your business — websites, landing pages, dashboards, and CRM platforms.",
    seoTitle: "Our Expertise — Websites, Dashboards & CRM Systems",
    seoDescription:
      "Custom websites, high-converting landing pages, admin dashboards, and CRM systems built with a modern, scalable stack.",
  },
  {
    slug: "why-choose-us",
    emoji: "🏆",
    label: "Why Choose Us",
    title: "You talk to the founder, not an account manager",
    eyebrow: "No Middlemen",
    intro:
      "No agency layers between you and the people building your product. Direct communication, fast delivery, a modern stack, and honest pricing.",
    seoTitle: "Why Choose Us — Direct, Fast and Honest",
    seoDescription:
      "Work directly with the founder building your project. Replies under two hours, fixed pricing agreed upfront, and delivery in 7–21 days.",
  },
  {
    slug: "our-technologies",
    emoji: "🧩",
    label: "Our Technologies",
    title: "Tools and technologies we work with",
    eyebrow: "Our Stack",
    intro:
      "The frontend, backend, database, and automation tools behind every project we ship. Modern, fast, and built to last.",
    seoTitle: "Our Technologies — The Stack We Build On",
    seoDescription:
      "Next.js, React, Node.js, Laravel, PostgreSQL, Supabase and more — the modern stack behind every website and system we deliver.",
  },
  {
    slug: "global-clients",
    emoji: "🌍",
    label: "Global Clients",
    title: "We speak your language",
    eyebrow: "Bilingual Team",
    intro:
      "English, French, or Arabic — including Moroccan Darija. From the first call to launch, you work with a team that understands your market.",
    seoTitle: "Global Clients — English, French & Arabic Support",
    seoDescription:
      "Serving clients in Morocco, Europe and North America in English, French and Arabic, including Moroccan Darija. No communication friction.",
  },
];

export type AboutMenuItem = {
  emoji: string;
  label: string;
  href: string;
};

// The navbar dropdown: the hub, every sub-page, then Contact.
export const aboutMenu: AboutMenuItem[] = [
  { emoji: "👋", label: "About Digital Studio LF", href: "/about" },
  ...aboutPages.map((p) => ({
    emoji: p.emoji,
    label: p.label,
    href: `/about/${p.slug}`,
  })),
  { emoji: "📞", label: "Contact Us", href: "/contact" },
];
