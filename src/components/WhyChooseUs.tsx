"use client";

import { m } from "framer-motion";

const benefits = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    description:
      "Optimized performance with sub-second load times. Every millisecond counts for conversions.",
  },
  {
    icon: "🎯",
    title: "Conversion Focused",
    description:
      "Every element is strategically placed to guide visitors toward taking action.",
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    description:
      "Bank-grade security with SSL, encrypted data, and regular security audits.",
  },
  {
    icon: "📱",
    title: "Fully Responsive",
    description:
      "Pixel-perfect on every device — desktop, tablet, and mobile experiences.",
  },
  {
    icon: "🛠️",
    title: "Easy to Manage",
    description:
      "Intuitive admin panels that let you update content without any technical knowledge.",
  },
  {
    icon: "🚀",
    title: "Scalable Architecture",
    description:
      "Built to grow with your business. Handle thousands of users without breaking a sweat.",
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
            Built Different.{" "}
            <span className="gradient-text">Built Better.</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            We don&apos;t just build products — we engineer experiences that set you
            apart from the competition.
          </p>
        </m.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <m.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass rounded-2xl p-6 hover:border-primary/20 transition-all duration-500 glass-hover"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
