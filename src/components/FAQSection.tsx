"use client";

import { useId, useState } from "react";
import { m } from "framer-motion";
import { faqs as staticFaqs } from "@/data/home-faqs";

type FaqEntry = { question: string; answer: string };


function FAQItem({
  faq,
  isOpen,
  toggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  toggle: () => void;
}) {
  const panelId = useId();
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`glass rounded-2xl overflow-hidden transition-all duration-500 ${
        isOpen ? "border-primary/30" : "hover:border-white/10"
      } glass-hover`}
    >
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
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
      {/* Every answer is always in the DOM (and so in the server HTML) and
          collapsed with CSS. Mounting only the open answer meant crawlers saw
          the first answer and nine empty questions. */}
      <div
        id={panelId}
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">
            {faq.answer}
          </div>
        </div>
      </div>
    </m.div>
  );
}

export default function FAQSection({ items }: { items?: FaqEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  // CRM-managed FAQ (from the Landing Page Brain) with the static set as fallback.
  const faqs = items && items.length ? items : staticFaqs;

  return (
    <section id="faq" className="section-padding relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <m.div
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
        </m.div>

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
