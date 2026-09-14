"use client";

import { m } from "framer-motion";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  HiOutlineBuildingOffice2,
  HiOutlineRocketLaunch,
  HiOutlineShoppingCart,
  HiOutlineCalendarDays,
  HiOutlineUserGroup,
  HiOutlineSquares2X2,
  HiOutlineCodeBracketSquare,
} from "react-icons/hi2";

type Service = {
  icon: IconType;
  title: string;
  description: string;
  intro?: string;
  features: string[];
  closing?: string;
  cta: string;
  /** ContactForm PROJECT_TYPES value pre-selected by the CTA. */
  plan: string;
  /** Dedicated page for this service — kept as a crawlable internal link. */
  href: string;
  linkLabel: string;
};

const services: Service[] = [
  {
    icon: HiOutlineBuildingOffice2,
    title: "Business Websites",
    description: "Professional websites built around your brand, services and business goals.",
    features: [
      "Company websites",
      "Service websites",
      "Personal & professional websites",
      "Multi-page websites",
      "Responsive design",
      "SEO-ready structure",
      "Content management",
    ],
    cta: "Build My Website",
    plan: "Website",
    href: "/services/business-websites",
    linkLabel: "business websites",
  },
  {
    icon: HiOutlineRocketLaunch,
    title: "Landing Pages",
    description:
      "Focused landing pages designed for a specific product, service, campaign or offer.",
    features: [
      "Lead generation",
      "Advertising landing pages",
      "Product pages",
      "Service pages",
      "Campaign pages",
      "Conversion-focused layouts",
    ],
    cta: "Build My Landing Page",
    plan: "Landing Page",
    href: "/services/landing-pages",
    linkLabel: "landing pages",
  },
  {
    icon: HiOutlineShoppingCart,
    title: "E-commerce",
    description: "Sell your products online with a store built around your business.",
    features: [
      "Product catalog",
      "Categories",
      "Shopping cart",
      "Checkout",
      "Order management",
      "Customer accounts",
      "Admin dashboard",
    ],
    cta: "Build My Online Store",
    plan: "E-commerce",
    href: "/fr/creation-site-ecommerce-maroc",
    linkLabel: "e-commerce in Morocco",
  },
  {
    icon: HiOutlineCalendarDays,
    title: "Booking Systems",
    description: "Make it easier for customers to request or schedule your services.",
    features: [
      "Booking forms",
      "Appointment requests",
      "Service selection",
      "Date & time selection",
      "Customer information",
      "Booking management",
    ],
    cta: "Build My Booking System",
    plan: "Booking System",
    href: "/booking-websites-for-hotels",
    linkLabel: "booking websites for hotels & riads",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Custom CRM",
    description: "A CRM built around the way your business works.",
    intro: "We can build systems for managing:",
    features: [
      "Leads",
      "Customers",
      "Sales",
      "Follow-ups",
      "Bookings",
      "Orders",
      "Staff",
      "Services",
      "Business data",
      "Reports",
    ],
    closing: "Your workflow is different from everyone else's. Your CRM should be too.",
    cta: "Build My CRM",
    plan: "CRM",
    href: "/services/crm-systems",
    linkLabel: "CRM systems",
  },
  {
    icon: HiOutlineSquares2X2,
    title: "Dashboards & Business Tools",
    description:
      "Turn your business data into a system you can actually use. We build custom dashboards and internal tools for businesses that need better ways to manage their information and daily operations.",
    features: [
      "Admin dashboards",
      "Customer management",
      "Data management",
      "Reports",
      "User accounts",
      "Staff management",
      "Internal tools",
    ],
    cta: "Discuss Your Project",
    plan: "Dashboard",
    href: "/services/admin-dashboards",
    linkLabel: "admin dashboards",
  },
  {
    icon: HiOutlineCodeBracketSquare,
    title: "Custom Web Applications",
    description:
      "Have an idea that doesn't fit into a standard website? Tell us what you need. We can design and build custom web applications around your business process, idea or specific requirements.",
    features: [],
    cta: "Start a Custom Project",
    plan: "Web Application",
    href: "/services/enterprise-solutions",
    linkLabel: "enterprise solutions",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding relative overflow-hidden scroll-mt-24">
      {/* Ambient background (desktop only — blur orbs tear on mobile GPUs) */}
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
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Websites, online stores, booking platforms, CRMs and web applications — designed and
            built in Marrakesh for businesses in Morocco and worldwide.
          </p>
        </m.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <m.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group relative glass rounded-2xl p-6 flex flex-col hover:border-primary/30 transition-all duration-500 glass-hover ${
                  // The last card has no feature list; let it span the row's
                  // leftover width on large screens instead of leaving a hole.
                  i === services.length - 1 ? "lg:col-span-3 md:col-span-2" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/55 text-sm mb-4 leading-relaxed">{service.description}</p>

                {service.intro && (
                  <p className="text-white/70 text-sm font-medium mb-3">{service.intro}</p>
                )}
                {service.features.length > 0 && (
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                {service.closing && (
                  <p className="text-white/70 text-sm italic mb-4">{service.closing}</p>
                )}

                <div className="mt-auto pt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <a
                    href={`#contact?plan=${encodeURIComponent(service.plan)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/90 hover:bg-primary text-white text-sm font-semibold transition-colors"
                  >
                    {service.cta} <span aria-hidden="true">→</span>
                  </a>
                  {/* Descriptive anchor text: a crawler sees only this text for
                      the destination, so it names the service, not "learn more". */}
                  <Link
                    href={service.href}
                    className="text-xs font-semibold text-white/50 hover:text-white hover:underline"
                  >
                    More about {service.linkLabel}
                  </Link>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
