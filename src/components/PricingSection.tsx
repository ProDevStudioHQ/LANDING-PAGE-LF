"use client";

import { m } from "framer-motion";
import type { IconType } from "react-icons";
import {
  HiOutlineGlobeAlt,
  HiOutlineShoppingCart,
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";

/* Fixed starting prices in MAD. These used to be USD tiers overlaid with live
 * CRM promotions; the offer is now "every project is different", so the table
 * shows entry points and routes everything else to a quote. `plan` must match a
 * ContactForm PROJECT_TYPES value so the form pre-selects it. */
type Tier = { icon: IconType; name: string; price: string; note: string; plan: string };

const tiers: Tier[] = [
  {
    icon: HiOutlineGlobeAlt,
    name: "Simple Website Projects",
    price: "2,500 MAD",
    note: "Starting from",
    plan: "Website",
  },
  {
    icon: HiOutlineShoppingCart,
    name: "E-commerce Projects",
    price: "5,000 MAD",
    note: "Starting from",
    plan: "E-commerce",
  },
  {
    icon: HiOutlineUserGroup,
    name: "Custom CRM & Web Applications",
    price: "Custom Quote",
    note: "Based on scope",
    plan: "CRM",
  },
  {
    icon: HiOutlineBuildingOffice2,
    name: "Complex Business Systems",
    price: "Custom Quote",
    note: "Based on scope",
    plan: "Other",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section-padding relative overflow-hidden scroll-mt-24">
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-primary/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5">
            Every Project Is <span className="gradient-text">Different</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
            We don&apos;t believe in forcing every business into the same package. The cost
            depends on the project&apos;s scope, features, design and technical requirements.
          </p>
          <p className="text-white/80 font-medium mt-4">
            Get a custom quote based on what you actually need.
          </p>
        </m.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {tiers.map(({ icon: Icon, name, price, note, plan }, i) => (
            <m.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group glass rounded-2xl p-6 flex flex-col hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-white mb-4 min-h-[3rem]">{name}</h3>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-1">
                {note}
              </p>
              <p className="text-3xl font-black text-white mb-6">{price}</p>
              <a
                href={`#contact?plan=${encodeURIComponent(plan)}`}
                aria-label={`Request a quote — ${name}`}
                className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 bg-white/[0.05] text-white/85 text-sm font-semibold hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
              >
                Request a Quote <span aria-hidden="true">→</span>
              </a>
            </m.div>
          ))}
        </div>

        <p className="text-center italic text-white/45 text-sm mb-8">
          Final pricing is provided after understanding your requirements.
        </p>

        <div className="text-center">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.04] transition-all duration-300"
          >
            Request a Quote
            <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
