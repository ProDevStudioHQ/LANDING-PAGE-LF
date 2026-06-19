"use client";

import Link from "next/link";
import { FaEtsy } from "react-icons/fa6";
import { SiFiverr } from "react-icons/si";

const footerLinks = {
  Services: [
    { label: "Business Websites", href: "https://www.etsy.com/shop/DigitalStudioLF", external: true },
    { label: "Admin Dashboards", href: "https://www.etsy.com/shop/DigitalStudioLF", external: true },
    { label: "CRM Systems", href: "https://www.etsy.com/shop/DigitalStudioLF", external: true },
    { label: "Login Pages", href: "https://www.etsy.com/shop/DigitalStudioLF", external: true },
  ],
  Resources: [
    { label: "Our Projects", href: "https://crm.digitalstudiolf.online/portfolio", external: true },
    { label: "Pricing", href: "#pricing", external: false },
    { label: "FAQ", href: "#faq", external: false },
    { label: "Contact Us", href: "#contact", external: false },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy", external: false },
    { label: "Terms of Service", href: "/terms", external: false },
    { label: "Cookie Policy", href: "/cookies", external: false },
    { label: "GDPR", href: "/gdpr", external: false },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path d="M5 0H13L13 1L5 28H0L0 27L5 0Z" fill="#EF4444"/>
              </svg>
              <span className="font-bold text-xl tracking-tight leading-none">
                <span className="text-white">Digital </span>
                <span className="text-primary">Studio LF</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              We build premium digital products that help businesses grow.
              Websites, dashboards, CRM systems, and more.
            </p>
            <div className="flex items-center gap-3 text-white/40 text-sm">
              <span>📧 digitalstudiolf@gmail.com</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-white/70 text-sm hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Digital Studio LF. All rights reserved.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            <a
              href="https://crm.digitalstudiolf.online/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-primary/50 hover:from-primary/10 hover:to-primary/5 transition-all duration-300 shadow-lg hover:shadow-primary/20"
            >
              <span className="text-white/60 text-sm group-hover:text-white transition-colors font-semibold">
                View Our Work
              </span>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary-dark rounded-full blur opacity-0 group-hover:opacity-20 transition duration-300 -z-10" />
            </a>
            <a
              href="https://www.etsy.com/shop/DigitalStudioLF"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-yellow/[0.05] to-amber/[0.02] border border-yellow-600/20 hover:border-yellow-500/50 hover:from-yellow-500/10 hover:to-yellow-600/5 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20"
            >
              <FaEtsy size={18} className="text-yellow-600/70 group-hover:text-yellow-500 transition-colors" />
              <span className="text-yellow-700/60 text-sm group-hover:text-yellow-400 transition-colors font-semibold">
                Shop
              </span>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur opacity-0 group-hover:opacity-15 transition duration-300 -z-10" />
            </a>
            <a
              href="https://www.fiverr.com/theknight12?public_mode=true"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-green-500/[0.05] to-emerald-500/[0.02] border border-green-600/20 hover:border-green-500/50 hover:from-green-500/10 hover:to-emerald-500/5 transition-all duration-300 shadow-lg hover:shadow-green-500/20"
            >
              <SiFiverr size={22} className="text-green-500/80 group-hover:text-green-400 transition-colors" />
              <span className="text-green-500/70 text-sm group-hover:text-green-300 transition-colors font-semibold">
                Fiverr
              </span>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full blur opacity-0 group-hover:opacity-15 transition duration-300 -z-10" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
