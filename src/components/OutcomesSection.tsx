"use client";

import { m } from "framer-motion";
import type { IconType } from "react-icons";
import {
  HiOutlineMegaphone,
  HiOutlineShoppingCart,
  HiOutlineCalendarDays,
  HiOutlineChartBarSquare,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

/* Outcome-first framing: visitors arrive knowing what they want to achieve,
 * not which product category that maps to. Each card names the outcome; the
 * Services section below names the product. */
const outcomes: { icon: IconType; title: string; description: string }[] = [
  {
    icon: HiOutlineMegaphone,
    title: "Get More Customers",
    description: "Professional websites and landing pages designed to turn visitors into enquiries.",
  },
  {
    icon: HiOutlineShoppingCart,
    title: "Sell Online",
    description: "E-commerce websites that make it easy to showcase and sell your products.",
  },
  {
    icon: HiOutlineCalendarDays,
    title: "Take Bookings",
    description: "Booking and appointment systems built around your services.",
  },
  {
    icon: HiOutlineChartBarSquare,
    title: "Manage Your Business",
    description: "Custom dashboards, CRM systems and internal tools to organize your operations.",
  },
  {
    icon: HiOutlineWrenchScrewdriver,
    title: "Build Something Custom",
    description: "Have a specific idea or business problem? We'll design and build a solution around it.",
  },
];

export default function OutcomesSection() {
  return (
    <section className="section-padding relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            We Build What Your <span className="gradient-text">Business Needs</span>
          </h2>
          <p className="text-white/50 max-w-3xl mx-auto text-lg leading-relaxed">
            Every business is different. You may need a website to present your services, a
            system to manage customers, an online store to sell products, a booking platform to
            receive reservations, or a completely custom web application.
          </p>
          <p className="text-white/80 font-medium max-w-2xl mx-auto text-lg mt-4">
            Tell us what you want to achieve. We&apos;ll help you turn it into a working digital
            solution.
          </p>
        </m.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {outcomes.map(({ icon: Icon, title, description }, i) => (
            <m.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 glass-hover"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{description}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
