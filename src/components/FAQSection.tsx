"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Our standard timeline is 7–21 days depending on the package. Starter packages are delivered in 7 days, Professional in 14 days, and Enterprise projects in 21 days. Rush delivery is available for an additional fee.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes. Every package includes 30 days of free post-launch support for bug fixes and minor adjustments. After that, we offer monthly maintenance plans starting at $99/month covering updates, security patches, and minor edits.",
  },
  {
    question: "Can I request changes after the project is delivered?",
    answer:
      "Absolutely. Each package includes 2–3 rounds of revisions during the build, plus 30 days of post-launch tweaks. Larger changes after that are billed hourly or as a new mini-project.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We build with modern, production-ready stacks: Next.js, React, Tailwind CSS, Node.js, and Prisma for backend. For databases we use PostgreSQL or MongoDB depending on the project. All sites are deployed on fast, secure cloud infrastructure.",
  },
  {
    question: "Do you offer custom packages?",
    answer:
      "Yes. If none of our standard packages fit your project, we build custom quotes based on scope, features, integrations, and timeline. Contact us at digitalstudiolf@gmail.com for a free consultation and custom proposal within 24 hours.",
  },
  {
    question: "Will my website be SEO-friendly?",
    answer:
      "Yes. Every site we build includes on-page SEO basics: optimized meta tags, semantic HTML, mobile responsiveness, fast load times, structured data, and sitemap.xml. Premium packages also include keyword research and content optimization.",
  },
  {
    question: "Can you integrate with my existing tools?",
    answer:
      "Yes. We integrate with Gmail, Mailchimp, Stripe, PayPal, Google Drive, Slack, HubSpot, Calendly, Zapier, and more. If you use a tool we haven't worked with before, we can almost always build a custom integration via API.",
  },
];

function FAQItem({
  faq,
  isOpen,
  toggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`glass rounded-2xl overflow-hidden transition-all duration-500 ${
        isOpen ? "border-primary/30" : "hover:border-white/10"
      } glass-hover`}
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="text-white font-semibold pr-4">{faq.question}</span>
        <span
          className={`text-primary transition-transform duration-300 flex-shrink-0 text-xl ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Got{" "}
            <span className="gradient-text">Questions?</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Everything you need to know about our services and process.
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
