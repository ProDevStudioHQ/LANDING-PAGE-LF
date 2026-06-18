"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Project = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  gradient: string;
  image: string;
};

const projects: Project[] = [
  {
    title: "Business Website",
    category: "Website",
    description:
      "High-converting business website with SEO optimization, blog, and lead capture forms.",
    tech: ["Next.js", "Tailwind", "Prisma"],
    gradient: "from-emerald-500/30 to-green-500/20",
    image: "https://getshared.com/dashboard/api/files/c8237a68-4d33-11f1-8264-ac1f6b763f30/stream?share=ypt8H2foMSlH",
  },
  {
    title: "Landing Page",
    category: "Landing Page",
    description:
      "Stunning landing page designed to convert visitors into leads with fast load times and compelling copy.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    gradient: "from-primary/30 to-orange-500/20",
    image: "https://getshared.com/dashboard/api/files/b1843741-4d36-11f1-8264-ac1f6b763f30/stream?share=2rIdMvxHsVap",
  },
  {
    title: "Analytics Dashboard",
    category: "Dashboard",
    description:
      "Admin dashboard with interactive analytics, KPI tracking, and team collaboration tools.",
    tech: ["React", "D3.js", "Node.js"],
    gradient: "from-blue-500/30 to-cyan-500/20",
    image: "https://getshared.com/dashboard/api/files/c2394594-4d33-11f1-8264-ac1f6b763f30/stream?share=FSgokV3PcvWf",
  },
  {
    title: "CRM System",
    category: "CRM System",
    description:
      "A powerful CRM with real-time client management, automated follow-ups, and pipeline tracking.",
    tech: ["Next.js", "PostgreSQL", "Tailwind"],
    gradient: "from-amber-500/30 to-yellow-500/20",
    image: "https://getshared.com/dashboard/api/files/a84c3b56-4d35-11f1-8264-ac1f6b763f30/stream?share=EVF7qJLCrfE6",
  },
  {
    title: "Login Page",
    category: "Login Page",
    description:
      "Modern SaaS authentication page with social providers, magic links, and 2FA support.",
    tech: ["TypeScript", "NextAuth", "Tailwind"],
    gradient: "from-purple-500/30 to-pink-500/20",
    image: "https://getshared.com/dashboard/api/files/7f432f2f-4d36-11f1-8264-ac1f6b763f30/stream?share=o9MPwxH8NGDV",
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Our Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Our Recent{" "}
            <span className="gradient-text">Work</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            A look at digital products we&apos;ve built for real clients.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-500 glass-hover"
            >
              {/* Preview area with image */}
              <div className={`relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                {project.image && (
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.category} built by Digital Studio LF`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={80}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white/80 border border-white/10">
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/40 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
