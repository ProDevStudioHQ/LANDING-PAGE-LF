"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IconType } from "react-icons";
import {
  HiOutlineRocketLaunch,
  HiOutlineBuildingOffice2,
  HiOutlineBriefcase,
  HiOutlineShoppingBag,
  HiOutlineCalendarDays,
  HiOutlineNewspaper,
  HiOutlineLanguage,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlineCube,
  HiOutlineUsers,
  HiOutlineLockClosed,
  HiOutlineClipboardDocumentList,
  HiOutlineGlobeAlt,
  HiOutlineSquares2X2,
} from "react-icons/hi2";

type Category = "all" | "websites" | "systems";

type Service = {
  category: "websites" | "systems";
  icon: IconType;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  iconColor: string;
  iconBg: string;
};

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
  },
  {
    category: "websites",
    icon: HiOutlineBriefcase,
    title: "Portfolio Websites",
    description:
      "Showcase your work with stunning portfolio sites that make creatives stand out.",
    features: ["Gallery Grid", "Case Studies", "Custom Layouts", "Contact Form"],
    gradient: "from-purple-500/20 to-pink-500/5",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    category: "websites",
    icon: HiOutlineShoppingBag,
    title: "E-commerce Stores",
    description:
      "Complete online stores with seamless checkout, inventory, and payment integration.",
    features: ["Stripe Payment", "Inventory", "Order Management", "Reviews"],
    gradient: "from-emerald-500/20 to-green-500/5",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    category: "websites",
    icon: HiOutlineCalendarDays,
    title: "Booking Websites",
    description:
      "Websites for service-based businesses with integrated reservation and calendar systems.",
    features: ["Calendar Sync", "Online Booking", "SMS/Email Alerts", "Admin Panel"],
    gradient: "from-cyan-500/20 to-blue-500/5",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    category: "websites",
    icon: HiOutlineNewspaper,
    title: "Blog & Magazine Sites",
    description:
      "Content-rich platforms for blogs, news sites, and magazines with powerful CMS.",
    features: ["CMS Integration", "Rich Editor", "Comments", "Newsletter"],
    gradient: "from-blue-500/20 to-indigo-500/5",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    category: "websites",
    icon: HiOutlineLanguage,
    title: "Multi-language Websites",
    description:
      "Global-ready websites with full i18n support, RTL layouts, and locale-specific SEO.",
    features: ["i18n Support", "RTL Layout", "Translation", "SEO per Locale"],
    gradient: "from-indigo-500/20 to-violet-500/5",
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
  },
  // Business Systems
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
  },
  {
    category: "systems",
    icon: HiOutlineCalendarDays,
    title: "Booking & Reservation Systems",
    description:
      "Complete reservation management with real-time availability and payment processing.",
    features: ["Calendar Sync", "Availability", "Payments", "Notifications"],
    gradient: "from-cyan-500/20 to-sky-500/5",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    category: "systems",
    icon: HiOutlineDocumentText,
    title: "Invoice & Quote Generators",
    description:
      "Professional invoicing tools with automated quote generation and PDF export.",
    features: ["PDF Export", "Auto-numbering", "Tax Calculation", "Templates"],
    gradient: "from-yellow-500/20 to-amber-500/5",
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    category: "systems",
    icon: HiOutlineCube,
    title: "Inventory Management Tools",
    description:
      "Track stock levels, orders, and warehouse operations in real time with smart alerts.",
    features: ["Stock Tracking", "Low Alerts", "Barcodes", "Multi-warehouse"],
    gradient: "from-rose-500/20 to-pink-500/5",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10 border-rose-500/20",
  },
  {
    category: "systems",
    icon: HiOutlineUsers,
    title: "Employee Management Dashboards",
    description:
      "HR dashboards for managing staff, attendance, performance, and payroll effortlessly.",
    features: ["Attendance", "Payroll", "Performance", "Time Tracking"],
    gradient: "from-pink-500/20 to-rose-500/5",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    category: "systems",
    icon: HiOutlineLockClosed,
    title: "Client Portals",
    description:
      "Secure portals where your clients access services, documents, and support tickets.",
    features: ["Secure Access", "File Sharing", "Messaging", "Custom Branding"],
    gradient: "from-teal-500/20 to-emerald-500/5",
    iconColor: "text-teal-400",
    iconBg: "bg-teal-500/10 border-teal-500/20",
  },
  {
    category: "systems",
    icon: HiOutlineClipboardDocumentList,
    title: "Project Management Tools",
    description:
      "Project tracking with tasks, timelines, Kanban boards, and team collaboration built in.",
    features: ["Kanban Boards", "Gantt Charts", "Team Chat", "Time Tracking"],
    gradient: "from-violet-500/20 to-purple-500/5",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20",
  },
];

const categories: { id: Category; label: string; icon: IconType; count: number }[] = [
  {
    id: "all",
    label: "All Services",
    icon: HiOutlineSquares2X2,
    count: services.length,
  },
  {
    id: "websites",
    label: "Websites",
    icon: HiOutlineGlobeAlt,
    count: services.filter((s) => s.category === "websites").length,
  },
  {
    id: "systems",
    label: "Business Systems",
    icon: HiOutlineUserGroup,
    count: services.filter((s) => s.category === "systems").length,
  },
];

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
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
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white/[0.04] text-white/70 border border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
                <span
                  className={`ml-1 inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  layout
                  key={service.title}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
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
                    <div className="flex flex-wrap gap-1.5">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-white/5 text-white/60 border border-white/5 group-hover:border-white/10 transition-colors"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Results count */}
        <motion.p
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white/40 text-sm mt-8"
        >
          Showing{" "}
          <span className="text-primary font-semibold">
            {filteredServices.length}
          </span>{" "}
          {filteredServices.length === 1 ? "service" : "services"}
        </motion.p>
      </div>
    </section>
  );
}
