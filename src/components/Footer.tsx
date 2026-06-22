import Link from "next/link";
import { FaEtsy } from "react-icons/fa6";
import { SiFiverr } from "react-icons/si";

const footerLinks: Record<string, { label: string; href: string; external?: boolean }[]> = {
  Services: [
    { label: "Landing Pages", href: "/services/landing-pages" },
    { label: "Business Websites", href: "/services/business-websites" },
    { label: "CRM Systems", href: "/services/crm-systems" },
    { label: "Admin Dashboards", href: "/services/admin-dashboards" },
    { label: "AI Chatbots", href: "/services/ai-chatbots" },
    { label: "Hotel & Riad Websites", href: "/services/hotel-riad-websites" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Our Projects", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Web Design Morocco", href: "/web-design-morocco" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "GDPR", href: "/gdpr" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 mt-8">
      {/* subtle top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand + NAP */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-4" aria-label="Digital Studio LF — home">
              <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path d="M5 0H13L13 1L5 28H0L0 27L5 0Z" fill="#EF4444" />
              </svg>
              <span className="font-bold text-xl tracking-tight leading-none">
                <span className="text-white">Digital </span>
                <span className="text-primary">Studio LF</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-xs">
              A web design &amp; development studio building custom websites, landing pages,
              dashboards &amp; CRM systems in 7–21 days. Based in Marrakesh, Morocco — working worldwide.
            </p>
            <address className="not-italic flex flex-col gap-2 text-white/60 text-sm">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true">📍</span> Marrakesh, Morocco
              </span>
              <a href="mailto:hello@digitalstudiolf.online" className="inline-flex items-center gap-2 hover:text-primary transition-colors w-fit">
                <span aria-hidden="true">✉</span> hello@digitalstudiolf.online
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 hover:text-primary transition-colors w-fit">
                <span aria-hidden="true">💬</span> Contact us
              </Link>
            </address>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <nav key={title} aria-label={title} className="md:col-span-2">
              <h3 className="text-white font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/65 text-sm hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-white/65 text-sm hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
                {title === "Services" && (
                  <li>
                    <Link href="/services" className="text-primary text-sm font-semibold hover:underline">
                      View all services →
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/55 text-sm order-2 sm:order-1">
            © {year} Digital Studio LF. All rights reserved.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center order-1 sm:order-2">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-white/70 text-sm font-semibold hover:border-primary/40 hover:text-white transition-colors"
            >
              Our Projects
            </Link>
            <a
              href="https://www.etsy.com/shop/DigitalStudioLF"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Digital Studio LF on Etsy"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#B84718]/50 transition-colors"
            >
              <FaEtsy size={16} className="text-[#E07B53]" aria-hidden="true" role="presentation" />
              <span className="text-white/70 text-sm font-semibold">Shop</span>
            </a>
            <a
              href="https://www.fiverr.com/theknight12?public_mode=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Digital Studio LF on Fiverr"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#1DBF73]/50 transition-colors"
            >
              <SiFiverr size={20} className="text-[#1DBF73]" aria-hidden="true" role="presentation" />
              <span className="text-white/70 text-sm font-semibold">Fiverr</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
