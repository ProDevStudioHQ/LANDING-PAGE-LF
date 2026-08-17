import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AboutSubHero, AboutCta } from "@/components/about/shared";
import GlobalClientsSection from "@/components/about/GlobalClientsSection";
import { aboutPages } from "@/config/about-menu";
import { aboutSubPageSchema } from "@/lib/about-schema";

const page = aboutPages.find((p) => p.slug === "global-clients")!;

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  alternates: { canonical: `/about/${page.slug}` },
  openGraph: {
    type: "website",
    title: page.seoTitle,
    description: page.seoDescription,
    url: `https://digitalstudiolf.online/about/${page.slug}`,
    images: ["https://digitalstudiolf.online/images/og-home.jpg"],
  },
};

export default function GlobalClientsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSubPageSchema(page)) }}
      />
      <Navbar />
      <main className="bg-black text-white overflow-x-hidden">
        <AboutSubHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
        <GlobalClientsSection />
        <AboutCta />
      </main>
      <Footer />
    </>
  );
}
