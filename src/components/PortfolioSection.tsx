"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Project = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  gradient: string;
  image?: string;
  mockup?: "login" | "ecommerce";
};

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    category: "Website",
    description: "A high-converting online store with seamless checkout flow and inventory management.",
    tech: ["Next.js", "Stripe", "Tailwind"],
    gradient: "from-primary/30 to-orange-500/20",
    image: "/images/ecommerce-platform.png",
  },
  {
    title: "Analytics Dashboard",
    category: "Dashboard",
    description: "Real-time business intelligence dashboard with interactive charts and KPI tracking.",
    tech: ["React", "D3.js", "Node.js"],
    gradient: "from-blue-500/30 to-cyan-500/20",
    image: "/images/analytics-dashboard.png",
  },
  {
    title: "Sales CRM Suite",
    category: "CRM System",
    description: "Full-featured CRM with pipeline management, email automation, and lead scoring.",
    tech: ["TypeScript", "PostgreSQL", "Redis"],
    gradient: "from-emerald-500/30 to-green-500/20",
    image: "/images/sales-crm-suite.png",
  },
  {
    title: "Login Page",
    category: "Authentication",
    description: "Modern sign-in experience with social providers, magic links, and 2FA support.",
    tech: ["Next.js", "NextAuth", "Tailwind"],
    gradient: "from-purple-500/30 to-pink-500/20",
    image: "/images/login-page.png",
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
            Recent{" "}
            <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Every project is a testament to our commitment to quality and innovation.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-500 glass-hover"
            >
              {/* Preview area */}
              <div
                className={`relative h-64 sm:h-80 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : project.mockup === "login" ? (
                  <div className="relative w-[70%] max-w-[280px] bg-gradient-to-br from-black/90 to-black/70 rounded-2xl border border-white/10 backdrop-blur-sm p-6 group-hover:scale-105 transition-transform duration-500 shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex justify-center mb-5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                          <div className="w-5 h-5 rounded-md bg-white/95 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-600 to-pink-600" />
                          </div>
                        </div>
                      </div>
                      <div className="h-2.5 bg-white/25 rounded-full w-2/3 mx-auto mb-1.5" />
                      <div className="h-1.5 bg-white/12 rounded-full w-3/4 mx-auto mb-5" />
                      <div className="space-y-2.5 mb-4">
                        <div className="h-9 bg-white/5 rounded-lg border border-white/15 flex items-center px-3 group/input hover:bg-white/8 transition-colors">
                          <div className="h-1.5 w-5 bg-white/25 rounded-full" />
                        </div>
                        <div className="h-9 bg-white/5 rounded-lg border border-white/15 flex items-center px-3 group/input hover:bg-white/8 transition-colors">
                          <div className="h-1.5 w-6 bg-white/25 rounded-full" />
                        </div>
                      </div>
                      <div className="h-9 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 mb-4 flex items-center justify-center shadow-lg shadow-purple-600/40 hover:shadow-purple-600/60 transition-all">
                        <div className="h-1.5 w-8 bg-white/90 rounded-full" />
                      </div>
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="h-px flex-1 bg-white/15" />
                        <div className="h-1.5 w-5 bg-white/20 rounded-full text-xs text-white/50" />
                        <div className="h-px flex-1 bg-white/15" />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-8 bg-white/5 rounded-lg border border-white/15 hover:bg-white/8 transition-colors" />
                        <div className="h-8 bg-white/5 rounded-lg border border-white/15 hover:bg-white/8 transition-colors" />
                        <div className="h-8 bg-white/5 rounded-lg border border-white/15 hover:bg-white/8 transition-colors" />
                      </div>
                    </div>
                  </div>
                ) : project.mockup === "ecommerce" ? (
                  <div className="relative w-[75%] max-w-xs bg-black/70 rounded-xl border border-white/10 backdrop-blur-sm p-4 group-hover:scale-105 transition-transform duration-500 shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-2 bg-white/20 rounded-full w-1/3" />
                      <div className="w-5 h-5 rounded-md bg-white/10 border border-white/20" />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 mb-4">
                      <div className="aspect-square bg-gradient-to-br from-orange-500/40 to-primary/30 rounded-lg border border-white/10 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-sm bg-white/30" />
                      </div>
                      <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-sm bg-white/20" />
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between">
                        <div className="h-2 bg-white/20 rounded-full w-1/2" />
                        <div className="h-1.5 bg-white/15 rounded-full w-1/4" />
                      </div>
                      <div className="h-2 bg-white/15 rounded-full w-2/3" />
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                      <div className="h-6 rounded-md bg-gradient-to-r from-orange-500 to-primary flex-1 flex items-center justify-center">
                        <div className="h-1 w-4 bg-white/80 rounded-full" />
                      </div>
                      <div className="h-6 w-6 rounded-md border border-white/20 bg-white/5" />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-3/4 h-3/4 bg-black/40 rounded-xl border border-white/10 backdrop-blur-sm p-3 group-hover:scale-105 transition-transform duration-500">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-400/60" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                      <div className="w-2 h-2 rounded-full bg-green-400/60" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="aspect-square bg-gradient-to-br from-primary/40 to-orange-500/30 rounded-md" />
                      <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-md" />
                      <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-md" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 bg-white/15 rounded-full w-3/4" />
                      <div className="h-2 bg-white/10 rounded-full w-1/2" />
                    </div>
                    <div className="mt-2 h-5 rounded-md bg-gradient-to-r from-primary to-orange-500/80 w-2/3 flex items-center px-2">
                      <div className="h-1 w-8 bg-white/80 rounded-full" />
                    </div>
                  </div>
                )}
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
