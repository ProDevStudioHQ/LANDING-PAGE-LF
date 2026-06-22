import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import {
  SITE_URL,
  getServiceContent,
  getTemplatedSlugs,
} from "@/config/services-content";

const OG_IMAGE = `${SITE_URL}/images/idea-digital.png`;

// Static generation for every templated service (excludes hand-built custom pages,
// which live in their own folders and take precedence over this dynamic segment).
export function generateStaticParams() {
  return getTemplatedSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceContent(slug);
  if (!service) return {};
  const url = `${SITE_URL}${service.href}`;
  return {
    title: { absolute: service.seoTitle },
    description: service.seoDescription,
    keywords: [service.focusKeyword, ...(service.secondaryKeywords ?? [])],
    alternates: { canonical: service.href },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url,
      type: "website",
      siteName: "Digital Studio LF",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${service.label} — Digital Studio LF` }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.seoDescription,
      images: [OG_IMAGE],
    },
  };
}

export default async function ServiceSlugPage({ params }: Params) {
  const { slug } = await params;
  const service = getServiceContent(slug);
  if (!service || service.hasCustomPage || !service.href.startsWith("/services/")) {
    notFound();
  }

  const url = `${SITE_URL}${service.href}`;
  const showPrice = !service.isContactOnly && Boolean(service.price);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.label,
    serviceType: service.jsonLdServiceType,
    description: service.seoDescription,
    provider: {
      "@type": "Organization",
      name: "Digital Studio LF",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "Country", name: "Morocco" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Belgium" },
      { "@type": "AdministrativeArea", name: "Worldwide" },
    ],
    url,
    ...(showPrice
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: (service.price ?? "").replace(/[^0-9]/g, "") || undefined,
            description: `${service.label} — delivered in ${service.deliveryTime}`,
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.label, item: url },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ServicePageTemplate service={service} />
    </>
  );
}
