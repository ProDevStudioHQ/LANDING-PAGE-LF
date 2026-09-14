"use client";

import { m } from "framer-motion";
import type { IconType } from "react-icons";
import {
  HiOutlineBriefcase,
  HiOutlinePuzzlePiece,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCpuChip,
  HiOutlineDevicePhoneMobile,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";

const benefits: { icon: IconType; title: string; description: string }[] = [
  {
    icon: HiOutlineBriefcase,
    title: "Business First",
    description: "We focus on what your business needs, not just what technology can do.",
  },
  {
    icon: HiOutlinePuzzlePiece,
    title: "Custom Solutions",
    description: "Your project is built around your requirements and workflow.",
  },
  {
    // Carries the "no middlemen" point the standalone founder section used to make.
    icon: HiOutlineChatBubbleLeftRight,
    title: "Direct Communication",
    description:
      "You work directly with the person building your project — in English, French or Arabic.",
  },
  {
    icon: HiOutlineCpuChip,
    title: "Modern Technology",
    description: "We use modern development tools and AI-assisted workflows to build efficiently.",
  },
  {
    icon: HiOutlineDevicePhoneMobile,
    title: "Responsive by Default",
    description: "Your website or application works across desktop, tablet and mobile devices.",
  },
  {
    icon: HiOutlineClipboardDocumentCheck,
    title: "Clear Process",
    description: "You know what we're building, what is included and what happens next.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Why <span className="gradient-text">Digital Studio LF?</span>
          </h2>
        </m.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map(({ icon: Icon, title, description }, i) => (
            <m.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass rounded-2xl p-6 hover:border-primary/20 transition-all duration-500 glass-hover"
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
