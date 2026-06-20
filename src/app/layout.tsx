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
    default: "Web Design & CRM Development Agency in Morocco | Digital Studio LF",
    template: "%s | Digital Studio LF",
  },
  description:
    "Custom landing pages, business websites, admin dashboards & CRM systems built in 7–21 days. Serving businesses in Morocco and globally. Free 30-min consultation.",
  applicationName: "Digital Studio LF",
  keywords: [
    "web design",
    "website development",
    "custom website",
    "landing page design",
    "CRM development",
    "dashboard development",
    "web design Marrakesh",
    "website development Morocco",
    "création site web Maroc",
    "développeur web Maroc",
    "agence web Marrakech",
    "riad booking website",
    "restaurant website Morocco",
    "real estate website Morocco",
    "custom dashboard development",
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
    title: "Web Design & CRM Development Agency in Morocco | Digital Studio LF",
    description:
      "Custom landing pages, business websites, dashboards & CRM systems built in 7–21 days. Based in Marrakesh, serving businesses worldwide.",
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
    title: "Web Design & CRM Development Agency in Morocco | Digital Studio LF",
    description:
      "Custom landing pages, business websites, dashboards & CRM systems built in 7–21 days. Based in Marrakesh, serving businesses worldwide.",
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
    "Custom websites, landing pages, dashboards & CRM systems built in 7–21 days. Based in Marrakesh, Morocco, working with clients worldwide.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marrakesh",
    addressRegion: "Marrakech-Safi",
    addressCountry: "MA",
  },
  areaServed: ["MA", "Worldwide"],
  sameAs: [
    "https://www.etsy.com/shop/DigitalStudioLF",
    "https://www.fiverr.com/theknight12?public_mode=true",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "digitalstudiolf@gmail.com",
    availableLanguage: ["English", "French", "Arabic"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Digital Studio LF",
  image: `${SITE_URL}/images/idea-digital.png`,
  url: SITE_URL,
  email: "digitalstudiolf@gmail.com",
  description:
    "Web design and development studio in Marrakesh building custom websites, dashboards, landing pages, and CRM systems for businesses in Morocco and worldwide.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marrakesh",
    addressRegion: "Marrakech-Safi",
    addressCountry: "MA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.6295,
    longitude: -7.9811,
  },
  areaServed: [
    { "@type": "Country", name: "Morocco" },
    { "@type": "AdministrativeArea", name: "Worldwide" },
  ],
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-18:00",
  sameAs: [
    "https://www.etsy.com/shop/DigitalStudioLF",
    "https://www.fiverr.com/theknight12?public_mode=true",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does it take to build a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our standard timeline is 7–21 days depending on the package. Starter packages are delivered in 7 days, Professional in 14 days, and Enterprise projects in 21 days. Rush delivery is available for an additional fee.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a website cost in Morocco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our packages start from affordable fixed prices with no hidden fees. We offer Starter, Professional, and Enterprise tiers to suit different budgets. Contact us for a free custom quote tailored to your project.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build websites for riads and hotels in Marrakesh?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We build booking websites, showcase sites, and reservation systems for riads, hotels, and hospitality businesses in Marrakesh and across Morocco — with multilingual support (English, French, Arabic).",
      },
    },
    {
      "@type": "Question",
      name: "Can you build websites in French for Moroccan clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We work in English, French, and Arabic and regularly build multilingual websites for Moroccan businesses targeting local and international audiences.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide ongoing support and maintenance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every package includes 30 days of free post-launch support for bug fixes and minor adjustments. After that, we offer monthly maintenance plans starting at $99/month covering updates, security patches, and minor edits.",
      },
    },
    {
      "@type": "Question",
      name: "Will my website be SEO-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every site we build includes on-page SEO basics: optimized meta tags, semantic HTML, mobile responsiveness, fast load times, structured data, and sitemap.xml. Premium packages also include keyword research and content optimization.",
      },
    },
    {
      "@type": "Question",
      name: "Can you build a custom CRM for my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We build custom CRM systems tailored to how your business actually works — contact management, pipelines, reporting, client portals, and integrations with tools like Gmail, Stripe, and Zapier.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer custom packages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If none of our standard packages fit your project, we build custom quotes based on scope, features, integrations, and timeline. Contact us at digitalstudiolf@gmail.com for a free consultation and custom proposal within 24 hours.",
      },
    },
  ],
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
      <head>
        {/* Preconnect to Google Analytics so the script round-trip isn't render-blocking */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Inline JSON-LD — must be in SSR HTML so Googlebot reads them without JS execution */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white font-sans">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HK99HXQ451"
          strategy="afterInteractive"
          async
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HK99HXQ451');`}
        </Script>
        <Tracker />
        <MobileMotionGate>{children}</MobileMotionGate>
      </body>
    </html>
  );
}
