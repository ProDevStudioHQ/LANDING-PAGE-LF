import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Tracker } from "@/components/Tracker";
import MobileMotionGate from "@/components/MobileMotionGate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const SITE_URL = "https://digitalstudiolf.online";
const OG_IMAGE = `${SITE_URL}/images/idea-digital.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Digital Studio LF — Premium Websites, Dashboards, CRM & Login Systems",
    template: "%s | Digital Studio LF",
  },
  description:
    "Digital Studio LF builds premium websites, admin dashboards, CRM systems, and login pages that help businesses grow. Modern design, powerful integrations, and conversion-focused solutions.",
  applicationName: "Digital Studio LF",
  keywords: [
    "website development",
    "landing page developer",
    "admin dashboard development",
    "custom CRM development",
    "login page design",
    "Next.js developer",
    "React developer",
    "Tailwind CSS developer",
    "SaaS web development",
    "Fiverr web developer",
    "Digital Studio LF",
  ],
  authors: [{ name: "Digital Studio LF", url: SITE_URL }],
  creator: "Digital Studio LF",
  publisher: "Digital Studio LF",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Digital Studio LF",
    title:
      "Digital Studio LF — Premium Websites, Dashboards, CRM & Login Systems",
    description:
      "Premium websites, admin dashboards, CRM systems, and login pages — designed to grow your business and impress your users.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Digital Studio LF — Premium Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Studio LF — Web, Dashboards, CRM & Login Systems",
    description:
      "Premium websites, dashboards, CRM systems, and login pages built to convert.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Digital Studio LF",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  email: "digitalstudiolf@gmail.com",
  description:
    "Digital Studio LF builds premium websites, admin dashboards, CRM systems, and login pages for businesses worldwide.",
  sameAs: [
    "https://www.etsy.com/shop/DigitalStudioLF",
    "https://www.fiverr.com/theknight12?public_mode=true",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "digitalstudiolf@gmail.com",
    availableLanguage: ["English"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Digital Studio LF",
  url: SITE_URL,
  publisher: { "@type": "Organization", name: "Digital Studio LF" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Digital Studio LF — Web Development Services",
  url: SITE_URL,
  areaServed: "Worldwide",
  provider: { "@type": "Organization", name: "Digital Studio LF" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business Website Development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Landing Page Development" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Admin Dashboard Development" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Custom CRM Development" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Login Page & Authentication" },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white font-sans">
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="ld-service"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <Tracker />
        <MobileMotionGate>{children}</MobileMotionGate>
      </body>
    </html>
  );
}
