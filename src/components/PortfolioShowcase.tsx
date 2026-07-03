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
    title: "Cyber Ninja",
    category: "Gaming Landing Page",
    tagline: "Immersive Gaming Experience",
    description:
      "High-octane landing page for gaming brand with cyberpunk aesthetic. Features hero character showcase, animated effects, social proof elements, and prominent CTAs for maximum engagement and conversions.",
    image: "https://crm.digitalstudiolf.online/i/90406460b32f659e0299b35a364ad5341bfe9af7.webp",
    href: "/portfolio",
  },
  {
    id: "2",
    title: "Energy Drink Launch",
    category: "Product Landing Page",
    tagline: "Explosive Brand Presence",
    description:
      "Dynamic product launch page with vibrant orange branding, product showcase, and energetic animations. Combines lifestyle imagery with product positioning for maximum impact and lead generation.",
    image: "https://crm.digitalstudiolf.online/i/90406460b32f659e0299b35a364ad5341bfe9af7.webp",
    href: "/portfolio",
  },
  {
    id: "3",
    title: "Gaming Controller Launch",
    category: "Product Landing Page",
    tagline: "Next Generation Gaming",
    description:
      "Modern product showcase for gaming hardware with gradient backgrounds, 3D product rendering, and compelling copy. Optimized for tech enthusiasts and gamers with clear value propositions.",
    image: "https://crm.digitalstudiolf.online/i/90406460b32f659e0299b35a364ad5341bfe9af7.webp",
    href: "/portfolio",
  },
  {
    id: "4",
    title: "Premium Audio Equipment",
    category: "E-Commerce Landing Page",
    tagline: "Premium Sound Quality",
    description:
      "Sophisticated e-commerce landing page for headphone accessories with product showcase, carousel galleries, and trust signals. Features multiple product variants and seamless checkout flow.",
    image: "https://crm.digitalstudiolf.online/i/90406460b32f659e0299b35a364ad5341bfe9af7.webp",
    href: "/portfolio",
  },
  {
    id: "5",
    title: "Sports Brand Landing",
    category: "Sports Landing Page",
    tagline: "Athletic Innovation",
    description:
      "Clean and modern sports brand landing page with blue color scheme, animated product displays, and compelling storytelling. Designed to drive conversions through engaging visuals and clear messaging.",
    image: "https://crm.digitalstudiolf.online/i/90406460b32f659e0299b35a364ad5341bfe9af7.webp",
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
