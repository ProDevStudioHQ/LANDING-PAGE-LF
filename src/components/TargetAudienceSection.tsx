"use client";

import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaRocket,
  FaBuilding,
  FaGlobe,
  FaUser,
  FaChartLine,
  FaCartShopping,
  FaSliders,
  FaArrowRight,
} from "react-icons/fa6";
import {
  HiOutlineGlobeAlt,
  HiOutlineChartBarSquare,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineBolt,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

const audiences = [
  {
    title: "Small Businesses",
    description:
      "Build a professional website or system to present your services, attract more clients, and grow your brand online.",
    icon: FaBriefcase,
    color: "#3B82F6",
  },
  {
    title: "Startups",
    description:
      "Launch with a modern landing page, dashboard, CRM, or login system that gives your product a strong and trusted first impression.",
    icon: FaRocket,
    color: "#EC4899",
  },
  {
    title: "Agencies",
    description:
      "Deliver premium websites, dashboards, and CRM solutions for your clients with a modern and scalable design approach.",
    icon: FaBuilding,
    color: "#8B5CF6",
  },
  {
    title: "Travel Agencies",
    description:
      "Manage leads, bookings, clients, and services with a clean CRM and a professional website that reflects your business.",
    icon: FaGlobe,
    color: "#06B6D4",
  },
  {
    title: "Freelancers & Consultants",
    description:
      "Showcase your services, manage your workflow, and build a strong digital identity with a premium website or dashboard.",
    icon: FaUser,
    color: "#10B981",
  },
  {
    title: "SaaS Founders",
    description:
      "Create a modern interface for your product with professional login pages, dashboards, and user-friendly digital experiences.",
    icon: FaChartLine,
    color: "#F59E0B",
  },
  {
    title: "E-commerce Brands",
    description:
      "Improve your online presence with high-converting landing pages, admin dashboards, and custom business tools.",
    icon: FaCartShopping,
    color: "#EF4444",
  },
  {
    title: "Companies Needing Better Workflow",
    description:
      "Organize operations, client communication, internal data, and performance with custom dashboards and CRM systems.",
    icon: FaSliders,
    color: "#06B6D4",
  },
];

export default function TargetAudienceSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[100px]" />
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
            For Everyone
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Who Is This Service{" "}
            <span className="gradient-text">For?</span>
          </h2>
          <p className="text-white/50 max-w-3xl mx-auto text-lg leading-relaxed">
            Our services are designed for businesses, agencies, startups, and
            professionals who want a modern digital presence, better client
            management, and premium user experience.
          </p>
        </motion.div>

        {/* Audience Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {audiences.map((audience, i) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative glass rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-500 cursor-pointer hover:bg-white/[0.08]"
            >
              {/* Gradient glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20"
                  style={{ backgroundColor: audience.color }}
                />
              </div>

              {/* Icon */}
              <div className="relative mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${audience.color}20` }}
                >
                  <audience.icon
                    size={24}
                    style={{ color: audience.color }}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-primary transition-colors">
                {audience.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/60 leading-relaxed">
                {audience.description}
              </p>

              {/* Accent line */}
              <div
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: audience.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative mt-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl"
        >
          {/* Subtle background accents */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.06] rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 left-0 w-80 h-80 bg-primary/[0.03] rounded-full blur-[80px]" />
            <div className="absolute -top-20 right-0 w-80 h-80 bg-primary/[0.04] rounded-full blur-[80px]" />
          </div>

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative px-6 sm:px-12 lg:px-16 py-14 sm:py-20">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <HiOutlineSparkles className="w-4 h-4" />
                All-in-One Solution
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center text-3xl sm:text-4xl lg:text-5xl font-black mb-5 tracking-tight"
            >
              <span className="text-white">Everything You Need,</span>{" "}
              <span className="gradient-text">In One Place</span>
            </motion.h3>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-center text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              From premium websites to powerful CRM systems — every product is
              crafted to help your business stand out and scale.
            </motion.p>

            {/* Product pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {[
                { label: "Premium Websites", icon: HiOutlineGlobeAlt, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
                { label: "Modern Dashboards", icon: HiOutlineChartBarSquare, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                { label: "Custom CRM", icon: HiOutlineUserGroup, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                { label: "Powerful Login Pages", icon: HiOutlineShieldCheck, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
              ].map((pill) => {
                const Icon = pill.icon;
                return (
                  <div
                    key={pill.label}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${pill.bg} border ${pill.border} text-sm font-medium text-white/90 hover:scale-105 transition-transform duration-300 cursor-default`}
                  >
                    <Icon className={`w-4 h-4 ${pill.color}`} />
                    {pill.label}
                  </div>
                );
              })}
            </motion.div>

            {/* Benefits row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10"
            >
              {[
                {
                  title: "Look Professional",
                  description: "Premium design that commands trust",
                  icon: HiOutlineSparkles,
                },
                {
                  title: "Work Smarter",
                  description: "Automate workflows and save hours",
                  icon: HiOutlineBolt,
                },
                {
                  title: "Grow Faster",
                  description: "Scale with tools built for growth",
                  icon: HiOutlineRocketLaunch,
                },
              ].map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="text-white font-semibold text-base mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#pricing"
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
              >
                <span>Get Started Today</span>
                <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/25 text-white/90 font-semibold text-base transition-all duration-300"
              >
                View Our Work
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
