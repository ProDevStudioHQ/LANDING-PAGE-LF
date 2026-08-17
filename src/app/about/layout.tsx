import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Marrakesh Web Development Studio",
  description:
    "Digital Studio LF is a Marrakesh-based web development studio building custom websites, dashboards, CRM systems & automation for businesses worldwide.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    images: ["https://digitalstudiolf.online/images/og-home.jpg"],
    title: "About — Marrakesh Web Development Studio",
    description:
      "A Marrakesh-based web development studio building custom websites, dashboards, CRM systems & automation for businesses in Morocco and worldwide.",
    url: "https://digitalstudiolf.online/about",
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
