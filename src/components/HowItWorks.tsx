"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description:
      "We learn about your business, goals, and audience to craft a tailored digital strategy.",
  },
  {
    step: "02",
    title: "Design & Prototype",
    description:
      "Our team creates stunning visual designs and interactive prototypes for your approval.",
  },
  {
    step: "03",
    title: "Development & Testing",
    description:
      "We build your product using modern technologies, with rigorous testing at every stage.",
  },
  {
    step: "04",
    title: "Launch & Support",
    description:
      "We deploy your project and provide ongoing maintenance, updates, and dedicated support.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            How It{" "}
            <span className="gradient-text">Works</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            From initial consultation to final delivery — a streamlined process
            built for speed and quality.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center"
              >
                {/* Step number */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl glass border border-primary/20 mb-6 mx-auto">
                  <span className="text-2xl font-black text-primary">
                    {item.step}
                  </span>
                  <div className="absolute -inset-1 bg-primary/5 rounded-2xl blur-xl" />
                </div>

                <h3 className="text-lg font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
