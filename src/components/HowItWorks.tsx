"use client";

import { m } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Understand",
    description:
      "We start by understanding your business, your goals and what you actually need.",
  },
  {
    step: "02",
    title: "Plan",
    description: "We define the features, structure and best approach for your project.",
  },
  {
    step: "03",
    title: "Build",
    description: "We design and develop the solution according to the agreed scope.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "We test everything, prepare the final version and help you get your project live.",
  },
];

export default function HowItWorks() {
  return (
    <section id="process" className="section-padding relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            How We <span className="gradient-text">Work</span>
          </h2>
        </m.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((item, i) => (
              <m.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center"
              >
                {/* Step number */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl glass border border-primary/20 mb-6 mx-auto">
                  <span className="text-2xl font-black text-primary">{item.step}</span>
                  <div className="absolute -inset-1 bg-primary/5 rounded-2xl blur-xl" />
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
