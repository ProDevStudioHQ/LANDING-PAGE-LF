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
    title: "Atlas Bookings",
    category: "CRM",
    description:
      "A travel CRM with real-time booking management, client profiles, and automated follow-ups.",
    tech: ["Next.js", "PostgreSQL", "Tailwind"],
    gradient: "from-primary/30 to-orange-500/20",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop&auto=format",
  },
  {
    title: "Mesa Digital",
    category: "Dashboard",
    description:
      "Admin dashboard with interactive analytics, KPI tracking, and team collaboration tools.",
    tech: ["React", "D3.js", "Node.js"],
    gradient: "from-blue-500/30 to-cyan-500/20",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
  },
  {
    title: "Elevate Studio",
    category: "Website",
    description:
      "High-converting business website with SEO optimization, blog, and lead capture forms.",
    tech: ["Next.js", "Tailwind", "Prisma"],
    gradient: "from-emerald-500/30 to-green-500/20",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&auto=format",
  },
  {
    title: "Nordic Login",
    category: "Login",
    description:
      "Modern SaaS authentication page with social providers, magic links, and 2FA support.",
    tech: ["TypeScript", "NextAuth", "Tailwind"],
    gradient: "from-purple-500/30 to-pink-500/20",
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=600&h=400&fit=crop&auto=format",
  },
  {
    title: "Helia Commerce",
    category: "Website",
    description:
      "E-commerce store with seamless checkout flow, inventory management, and payment integrations.",
    tech: ["Next.js", "Stripe", "MongoDB"],
    gradient: "from-amber-500/30 to-yellow-500/20",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop&auto=format",
  },
  {
    title: "Volta Tickets",
    category: "Dashboard",
    description:
      "Support portal with ticket management, priority queues, SLA tracking, and customer comms.",
    tech: ["React", "Node.js", "Redis"],
    gradient: "from-indigo-500/30 to-violet-500/20",
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&h=400&fit=crop&auto=format",
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
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-60`} />

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
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 text-white/50 border border-white/5"
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
