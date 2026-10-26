import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineArrowRight, HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { ETSY_SHOP_URL } from "@/lib/schema";

// "Ready-made CRM templates" block. The Etsy shop moved out of the main nav
// (it made the agency look less focused there) and now lives here, framed as
// the low-budget entry point to the custom CRM service rather than a separate
// business. Copy describes what a template gives you, not individual listings:
// the Etsy catalogue changes independently of this site.
const templatePoints = [
  "Instant download, ready to use the same day",
  "Leads, clients, pipeline and follow-ups already laid out",
  "Fits a solo business or a small team",
  "A fraction of the cost of a custom build",
];

const customPoints = [
  "Built around how your business actually works",
  "Your data imported, your team trained",
  "User roles, automations and integrations",
  "Can start from a template you already use",
];

export default function CrmTemplatesSection() {
  return (
    <section id="crm-templates" className="section-padding relative scroll-mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Ready-made CRM templates
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Not ready for a custom CRM?{" "}
            <span className="gradient-text">Start with a template.</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Our ready-made CRM templates let you organise leads and clients today. When
            you outgrow them, we build the custom version on top of what you already use.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {/* Template */}
          <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col border border-emerald-500/20">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300 mb-2">
              Ready-made template
            </p>
            <h3 className="text-2xl font-bold text-white mb-2">Start today, on a small budget</h3>
            <p className="text-white/50 text-sm mb-6">
              Digital downloads, sold through our Etsy shop.
            </p>
            <ul className="space-y-2.5 mb-8 flex-1">
              {templatePoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-white/70">
                  <FaCheck className="w-3 h-3 mt-1 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href={ETSY_SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Browse CRM templates on Etsy
              <HiOutlineArrowTopRightOnSquare className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* Custom */}
          <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-2">
              Custom CRM
            </p>
            <h3 className="text-2xl font-bold text-white mb-2">Built for your workflow</h3>
            <p className="text-white/50 text-sm mb-6">
              From 25,000 MAD (≈ $2,500), price fixed in writing before we start.
            </p>
            <ul className="space-y-2.5 mb-8 flex-1">
              {customPoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-white/70">
                  <FaCheck className="w-3 h-3 mt-1 text-primary flex-shrink-0" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact?plan=CRM"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Get a CRM quote
                <HiOutlineArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link
                href="/services/crm-systems"
                className="flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-white/15 text-white/80 font-semibold hover:bg-white/5 hover:text-white transition-colors"
              >
                How custom CRMs work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
