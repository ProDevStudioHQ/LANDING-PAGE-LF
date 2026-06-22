import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import {
  SITE_URL,
  getServiceContent,
  getTemplatedSlugs,
} from "@/config/services-content";
import { pageGraphJson, serviceNode, breadcrumbNode, faqNode } from "@/lib/schema";

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

  const priceNum =
    !service.isContactOnly && service.price
      ? service.price.replace(/[^0-9]/g, "") || null
      : null;

  // One connected @graph: Service (provider → #business, offers) + breadcrumb + FAQ.
  const graph = pageGraphJson(
    serviceNode({
      name: service.label,
      serviceType: service.jsonLdServiceType,
      description: service.seoDescription,
      path: service.href,
      price: priceNum,
    }),
    breadcrumbNode([
      { name: "Home", path: "" },
      { name: "Services", path: "/services" },
      { name: service.label, path: service.href },
    ]),
    faqNode(service.faq),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
      <ServicePageTemplate service={service} />
    </>
  );
}
