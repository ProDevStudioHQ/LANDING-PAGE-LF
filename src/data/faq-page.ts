// Categorized FAQ content for the dedicated /faq page.
//
// Plain module (no "use client") so it can be imported by the server component
// that renders both the visible Q&A and the FAQPage JSON-LD. Grouping mirrors
// the structure competitors use (pricing / timeline / services / local / support)
// which helps both scannability and rich-result coverage.
//
// The homepage keeps its own shorter, CRM-overridable set in home-faqs.ts; this
// file is the fuller reference list that lives on /faq.

export type FaqCategory = {
  category: string;
  items: { question: string; answer: string }[];
};

export const faqCategories: FaqCategory[] = [
  {
    category: "Pricing & Packages",
    items: [
      {
        question: "How much does a website cost?",
        answer:
          "Our packages start from fixed prices with no hidden fees: from $150 for a login page, $250 for a landing page, $700 for a full business website, and $1,200 for an admin dashboard. We provide quotes in MAD (Moroccan Dirham) on request, plus custom quotes for larger projects.",
      },
      {
        question: "Do you offer custom packages?",
        answer:
          "Yes. If none of our standard packages fit your project, we build custom quotes based on scope, features, integrations, and timeline. Contact us for a free consultation and a custom proposal within 24 hours.",
      },
      {
        question: "Are your prices fixed, or do they change during the project?",
        answer:
          "Prices are fixed and agreed in writing before we start. The quote you approve is what you pay — no surprise invoices after delivery. Additional work beyond the agreed scope is only ever quoted and approved in advance.",
      },
    ],
  },
  {
    category: "Timeline & Process",
    items: [
      {
        question: "How long does it take to build a website?",
        answer:
          "Our standard timeline is 7–21 days depending on the package. Starter packages are delivered in 7 days, Professional in 14 days, and Enterprise projects in 21 days. Rush delivery is available for an additional fee.",
      },
      {
        question: "What does the process look like from start to finish?",
        answer:
          "It starts with a free 30-minute discovery call, followed by a written proposal with a fixed price and timeline. Once approved, we move into the build phase with direct WhatsApp/email access — no project managers in between. We then launch and provide 30 days of free post-launch support.",
      },
      {
        question: "Can I request changes after the project is delivered?",
        answer:
          "Absolutely. Each package includes 2–3 rounds of revisions during the build, plus 30 days of post-launch tweaks for minor adjustments. Larger changes after that are billed hourly or scoped as a new mini-project.",
      },
    ],
  },
  {
    category: "Services & Technology",
    items: [
      {
        question: "What technologies do you use?",
        answer:
          "We build with modern, production-ready stacks: Next.js, React, and Tailwind CSS on the frontend; Node.js and Prisma on the backend; and PostgreSQL or MongoDB for data depending on the project. Everything is deployed on fast, secure cloud infrastructure.",
      },
      {
        question: "Will my website be SEO-friendly?",
        answer:
          "Yes. Every site includes on-page SEO basics: optimized meta tags, semantic HTML, mobile responsiveness, fast load times, structured data, and a sitemap.xml. Premium packages also include keyword research and content optimization.",
      },
      {
        question: "Can you integrate with my existing tools?",
        answer:
          "Yes. We integrate with Gmail, Mailchimp, Stripe, PayPal, Google Drive, Slack, HubSpot, Calendly, Zapier, and more. If you use a tool we haven't worked with before, we can almost always build a custom integration via API.",
      },
    ],
  },
  {
    category: "Languages & Local Market",
    items: [
      {
        question: "Which languages can you build my website in?",
        answer:
          "We build in English, French, and Arabic (including Moroccan Darija for content), and regularly ship multilingual sites that serve local and international audiences from one codebase — with proper hreflang tags and lang attributes so each language version ranks correctly.",
      },
      {
        question: "Can you provide quotes and invoices in Moroccan Dirham (MAD)?",
        answer:
          "Yes. While our packages are listed in USD for consistency, we provide quotes, contracts, and invoices in MAD on request, and can arrange local payment methods for Moroccan clients alongside international options like bank transfer and card.",
      },
      {
        question: "Do you only work with clients in Marrakesh?",
        answer:
          "No — we're based in Marrakesh but work remotely with clients across all of Morocco and internationally. The entire process (discovery call, build, revisions, launch) runs over WhatsApp, email, and video, so your location makes no difference to the result.",
      },
    ],
  },
  {
    category: "Support & Maintenance",
    items: [
      {
        question: "Do you provide ongoing support and maintenance?",
        answer:
          "Yes. Every package includes 30 days of free post-launch support for bug fixes and minor adjustments. After that, we offer monthly maintenance plans starting at $99/month covering updates, security patches, and minor edits.",
      },
      {
        question: "What happens if something breaks after launch?",
        answer:
          "During the first 30 days, any bug or issue is fixed free of charge. Beyond that window, fixes are covered under a monthly maintenance plan, or handled on request. You always have a direct line to the team that built your site.",
      },
    ],
  },
];

// Flat list of every Q&A — used to build the FAQPage JSON-LD in one pass.
export const allFaqs = faqCategories.flatMap((c) => c.items);
