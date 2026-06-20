"use client";

import { m } from "framer-motion";
import {
  SiGmail,
  SiMailchimp,
  SiWhatsapp,
  SiStripe,
  SiPaypal,
  SiGoogledrive,
  SiSlack,
  SiNotion,
  SiTrello,
  SiHubspot,
  SiDropbox,
  SiDiscord,
  SiZapier,
  SiCalendly,
  SiMeta,
} from "react-icons/si";

const integrations = [
  { name: "Gmail", description: "Send and manage emails easily", Icon: SiGmail, color: "#EA4335"},
  { name: "Mailchimp", description: "Run smarter email campaigns", Icon: SiMailchimp, color: "#FFE01B"},
  { name: "WhatsApp", description: "Communicate faster with clients", Icon: SiWhatsapp, color: "#25D366"},
  { name: "Stripe", description: "Accept secure online payments", Icon: SiStripe, color: "#635BFF"},
  { name: "PayPal", description: "Process global payments easily", Icon: SiPaypal, color: "#003087"},
  { name: "Google Drive", description: "Store and manage files", Icon: SiGoogledrive, color: "#4285F4"},
  { name: "Slack", description: "Improve team communication", Icon: SiSlack, color: "#E01E5A"},
  { name: "Notion", description: "Organize notes and workflows", Icon: SiNotion, color: "#000000"},
  { name: "Trello", description: "Track projects visually", Icon: SiTrello, color: "#0079BF"},
  { name: "HubSpot", description: "Sync leads and customer data", Icon: SiHubspot, color: "#FF7A59"},
  { name: "Dropbox", description: "Share and sync files securely", Icon: SiDropbox, color: "#0061FF"},
  { name: "Discord", description: "Build community engagement", Icon: SiDiscord, color: "#5865F2"},
  { name: "Zapier", description: "Automate tasks across apps", Icon: SiZapier, color: "#FF4F00"},
  { name: "Calendly", description: "Schedule meetings effortlessly", Icon: SiCalendly, color: "#006B7D"},
  { name: "Meta", description: "Manage social media and ads", Icon: SiMeta, color: "#0A66C2"},
];

export default function IntegrationsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[120px]" />
        {/* Animated connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="rgba(239,68,68,0.5)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Integrations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="gradient-text">Tools We Integrate With</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg mb-4">
            We connect your website, dashboard, or CRM with the tools your
            business already uses.
          </p>
          <p className="text-white/30 max-w-3xl mx-auto text-sm leading-relaxed">
            Our integrations help you automate workflows, centralize communication,
            improve productivity, and simplify management — so you can focus on
            growing your business while your digital tools work together seamlessly.
          </p>
        </m.div>

        {/* Integration grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12">
          {integrations.map((integration, i) => (
            <m.div
              key={integration.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative glass rounded-2xl p-5 text-center hover:border-primary/30 transition-all duration-500 glass-hover glow-red-hover cursor-pointer"
            >
              {/* Gradient glow behind icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-16 h-16 bg-primary/10 rounded-full blur-xl" />
              </div>

              {/* Icon */}
              <div className="relative text-4xl mb-3 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 flex justify-center">
                <integration.Icon style={{ color: integration.color }} aria-hidden="true" role="presentation" />
              </div>

              {/* Name */}
              <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                {integration.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-white/55 leading-relaxed">
                {integration.description}
              </p>

            </m.div>
          ))}
        </div>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 transition-all duration-300"
          >
            Explore Integrations
            <span>→</span>
          </a>
          <p className="text-white/30 text-sm mt-4">
            Build a connected digital system for your business
          </p>
        </m.div>
      </div>
    </section>
  );
}
