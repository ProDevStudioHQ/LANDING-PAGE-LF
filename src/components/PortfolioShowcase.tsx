"use client";

import Image from "next/image";
import { m } from "framer-motion";
import Link from "next/link";

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  tagline?: string;
  href?: string;
};

const showcaseItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Digital Innovation Studio",
    category: "Portfolio Website",
    tagline: "Transforming Ideas Into Digital Reality",
    description:
      "A premium portfolio website showcasing creative work with stunning animations, modern design, and engaging user experience. Built with Next.js and Framer Motion.",
    image: "https://getshared.com/dashboard/api/files/c8237a68-4d33-11f1-8264-ac1f6b763f30/stream?share=ypt8H2foMSlH",
    href: "/portfolio",
  },
  {
    id: "2",
    title: "Energy Drink Product Launch",
    category: "Landing Page",
    tagline: "Energize Your Brand Presence",
    description:
      "High-impact landing page for beverage product launch with dynamic product showcase, testimonials, and CTA optimization. Designed for maximum conversions.",
    image: "https://getshared.com/dashboard/api/files/b1843741-4d36-11f1-8264-ac1f6b763f30/stream?share=2rIdMvxHsVap",
    href: "/portfolio",
  },
  {
    id: "3",
    title: "Sports Tech Platform",
    category: "Landing Page",
    tagline: "Next-Gen Gaming Experience",
    description:
      "Modern landing page for gaming platform with product showcase, feature highlights, and seamless onboarding. Built for engagement and user retention.",
    image: "https://getshared.com/dashboard/api/files/c2394594-4d33-11f1-8264-ac1f6b763f30/stream?share=FSgokV3PcvWf",
    href: "/portfolio",
  },
  {
    id: "4",
    title: "Music & Audio Equipment",
    category: "E-Commerce Showcase",
    tagline: "Sound Excellence Delivered",
    description:
      "Elegant e-commerce showcase for premium headphones and audio accessories. Features product configurator, comparison tools, and rich media galleries.",
    image: "https://getshared.com/dashboard/api/files/a84c3b56-4d35-11f1-8264-ac1f6b763f30/stream?share=EVF7qJLCrfE6",
    href: "/portfolio",
  },
  {
    id: "5",
    title: "Professional Services Hub",
    category: "Landing Page",
    tagline: "Elevating Your Business Potential",
    description:
      "Sophisticated landing page for consulting services with team showcase, case studies, and client testimonials. Designed to build trust and credibility.",
    image: "https://getshared.com/dashboard/api/files/7f432f2f-4d36-11f1-8264-ac1f6b763f30/stream?share=o9MPwxH8NGDV",
    href: "/portfolio",
  },
];

export default function PortfolioShowcase() {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center lg:text-left"
        >
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20 px-3 py-1 rounded-full mb-4">
            Featured Work
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            Recent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] via-[#DC2626] to-[#991B1B]">
              Portfolio
            </span>
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-[55ch]">
            Explore our latest projects showcasing modern design, cutting-edge technology, and exceptional user experiences.
          </p>
        </m.div>

        {/* Showcase Grid */}
        <div className="grid gap-8 md:gap-12">
          {showcaseItems.map((item, index) => (
            <m.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative rounded-2xl overflow-hidden border border-white/8 hover:border-white/15 transition-all duration-500 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden bg-gradient-to-br from-[#141417] to-[#1C1C20]">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={`${item.title} - ${item.category}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                    quality={85}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EF4444]/20 backdrop-blur-sm border border-[#EF4444]/40 rounded-full text-xs font-medium text-[#EF4444]">
                    {item.category}
                  </span>
                </div>

                {/* View Project Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                  <Link
                    href={item.href || "/portfolio"}
                    className="px-6 py-2.5 bg-[#EF4444] text-white font-semibold rounded-full hover:bg-[#DC2626] transition-colors"
                  >
                    View Project →
                  </Link>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center flex-1 bg-gradient-to-r from-[#141417] to-[#1C1C20]">
                <div className="space-y-3 mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#EF4444] transition-colors">
                    {item.title}
                  </h3>
                  {item.tagline && (
                    <p className="text-lg sm:text-xl font-semibold text-[#EF4444] leading-tight">
                      {item.tagline}
                    </p>
                  )}
                </div>

                <p className="text-[#B0B0B8] text-sm sm:text-base leading-relaxed max-w-[55ch] mb-6">
                  {item.description}
                </p>

                <div className="flex items-center gap-3 pt-4">
                  <Link
                    href={item.href || "/portfolio"}
                    className="inline-flex items-center gap-2 text-[#EF4444] font-semibold hover:gap-3 transition-all group/link"
                  >
                    Explore Project
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* CTA Section */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 lg:mt-24 text-center"
        >
          <p className="text-[#9CA3AF] text-lg mb-6">
            Ready to bring your vision to life?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#EF4444]/30 hover:scale-[1.02] transition-all duration-300"
          >
            Start Your Project →
          </Link>
        </m.div>
      </div>
    </section>
  );
}
