import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AboutSubHero, AboutCta } from "@/components/about/shared";
import OurApproachSection from "@/components/about/OurApproachSection";
import { aboutPages } from "@/config/about-menu";
import { aboutSubPageSchema } from "@/lib/about-schema";

const page = aboutPages.find((p) => p.slug === "our-approach")!;

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  alternates: { canonical: `/about/${page.slug}` },
  openGraph: {
    type: "website",
    title: page.seoTitle,
    description: page.seoDescription,
    url: `https://digitalstudiolf.online/about/${page.slug}`,
    images: ["https://digitalstudiolf.online/images/og-home.png"],
  },
};

export default function OurApproachPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSubPageSchema(page)) }}
      />
      <Navbar />
      <main className="bg-black text-white overflow-x-hidden">
        <AboutSubHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
        <OurApproachSection />
        <AboutCta />
      </main>
      <Footer />
    </>
  );
}
