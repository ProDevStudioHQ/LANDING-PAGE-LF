"use client";

import { m } from "framer-motion";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  HiOutlineRocketLaunch,
  HiOutlineBuildingOffice2,
  HiOutlineUserGroup,
  HiOutlineSquares2X2,
} from "react-icons/hi2";

type Service = {
  category: "websites" | "systems";
  icon: IconType;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  iconColor: string;
  iconBg: string;
  href: string;
};

const alsoAvailable = [
  "Portfolio Websites",
  "E-commerce Stores",
  "Booking Websites",
  "Blog & Magazine Sites",
  "Multi-language Websites",
  "Booking & Reservation Systems",
  "Invoice & Quote Generators",
  "Inventory Management Tools",
  "Employee Management Dashboards",
  "Client Portals",
  "Project Management Tools",
  "Support & Ticketing Systems",
];

const services: Service[] = [
  // Websites
  {
    category: "websites",
    icon: HiOutlineRocketLaunch,
    title: "Landing Pages",
    description:
      "High-converting landing pages designed to capture leads, drive sales, and showcase your offer.",
    features: ["CTA Optimization", "A/B Testing", "Fast Loading", "SEO Ready"],
    gradient: "from-orange-500/20 to-primary/5",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10 border-orange-500/20",
    href: "/services/landing-pages",
  },
  {
    category: "websites",
    icon: HiOutlineBuildingOffice2,
    title: "Business Websites",
    description:
      "Professional websites that represent your brand, establish authority, and convert visitors.",
    features: ["Custom Design", "SEO Optimized", "Fast Loading", "Mobile First"],
    gradient: "from-primary/20 to-orange-500/5",
    iconColor: "text-primary",
    iconBg: "bg-primary/10 border-primary/20",
    href: "/services/business-websites",
  },
  // Systems
  {
    category: "systems",
    icon: HiOutlineSquares2X2,
    title: "Admin Dashboards",
    description:
      "Custom admin dashboards with analytics, KPIs, role-based access, and clean data views.",
    features: ["Analytics", "Role-based Access", "Custom Widgets", "Exports"],
    gradient: "from-blue-500/20 to-cyan-500/5",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    href: "/services/admin-dashboards",
  },
  {
    category: "systems",
    icon: HiOutlineUserGroup,
    title: "CRM Systems",
    description:
      "Custom CRM platforms to manage leads, track interactions, and automate follow-ups.",
    features: ["Lead Tracking", "Pipeline", "Auto Follow-ups", "Reports"],
    gradient: "from-emerald-500/20 to-teal-500/5",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    href: "/services/crm-systems",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Ambient background (desktop only â€” blur orbs tear on mobile GPUs) */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Digital Solutions That{" "}
            <span className="gradient-text">Drive Growth</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            From concept to launch, we craft premium digital products tailored
            to your business needs.
          </p>
        </m.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <m.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 overflow-hidden glass-hover"
                >
                  {/* Gradient accent on hover */}
                  <div
                    className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${service.gradient} blur-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    {/* Category badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${service.iconBg}`}
                      >
                        <Icon className={`w-6 h-6 ${service.iconColor}`} />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30">
                        {service.category === "websites" ? "Website" : "System"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/50 text-sm mb-5 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={service.href}
                      className={`text-xs font-semibold ${service.iconColor} hover:underline`}
                    >
                      Learn more â†’
                    </Link>
                  </div>
                </m.div>
              );
            })}
        </div>

        {/* Also available */}
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/40 text-sm mt-10 max-w-3xl mx-auto leading-relaxed"
        >
          <span className="text-white/60 font-medium">Also available:</span>{" "}
          {alsoAvailable.join(" Â· ")}
        </m.p>
      </div>
    </section>
  );
}
