import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "About Digital Studio LF | Web Agency in Marrakech" },
  description:
    "Meet Digital Studio LF, a web design and development agency in Marrakech building custom websites, dashboards and CRMs for clients in Morocco and abroad.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    images: ["https://digitalstudiolf.online/images/og-home.jpg"],
    title: "About Digital Studio LF | Web Agency in Marrakech",
    description:
      "A Marrakesh-based web development studio building custom websites, dashboards, CRM systems & automation for businesses in Morocco and worldwide.",
    url: "https://digitalstudiolf.online/about",
  },
  // Mirrors openGraph. Without its own block the page inherited the root
  // layout's generic homepage Twitter title and description.
  twitter: {
    card: "summary_large_image",
    title: "About Digital Studio LF | Web Agency in Marrakech",
    description:
      "A Marrakesh-based web development studio building custom websites, dashboards, CRM systems & automation for businesses in Morocco and worldwide.",
    images: ["https://digitalstudiolf.online/images/og-home.jpg"],
  },
};

// The JSON-LD that used to live here (BreadcrumbList + an AboutPage node with a
// hard-coded `/about#webpage` @id) has moved onto the pages themselves.
//
// This layout wraps every /about/* route. Once the sub-pages existed, emitting
// that schema here would have stamped one entity id and one breadcrumb trail
// onto all seven URLs. The hub declares its own in app/about/page.tsx; the
// sub-pages build theirs from lib/about-schema.ts.
//
// The metadata above still applies as a DEFAULT — each sub-page overrides
// title, description and canonical with its own.
export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
