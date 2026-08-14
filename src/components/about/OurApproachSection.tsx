"use client";

import { FadeSection, Eyebrow } from "./shared";

export default function OurApproachSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left — editorial prose (60%) */}
          <FadeSection className="lg:max-w-[60%]">
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-8 leading-tight">
              A studio built on craft and results
            </h2>

            <div className="space-y-6 text-[#9CA3AF] text-[17px] leading-[1.75] max-w-[65ch]">
              <p>
                Digital Studio LF is a web development studio based in Marrakesh, Morocco.
                We design and build custom websites, landing pages, admin dashboards, CRM
                systems, and automation workflows for businesses that are serious about their
                digital presence — work that&apos;s engineered to <em className="text-white/70 not-italic font-medium">perform</em>, not just to look good.
              </p>
              <p>
                Our clients range from local Moroccan businesses making their first move online
                to startups and agencies across Europe and North America. Whether it&apos;s a
                high-converting landing page, a direct-booking website for a riad, or a custom
                CRM, every project is built with modern, scalable technology and a relentless
                focus on speed, SEO, and conversion.
              </p>
              <p>
                We work direct — no project managers, no account executives, no one between you
                and the people building your product. You get transparent fixed pricing, a clear
                timeline, and delivery in 7–21 days depending on scope. That&apos;s the studio we
                set out to build: senior-level work, delivered fast, without the agency overhead.
              </p>
            </div>
          </FadeSection>

          {/* Right — at a glance card (40%) */}
          <FadeSection className="lg:max-w-[36%] w-full" delay={0.15}>
            <div className="lg:sticky lg:top-28">
              <div className="bg-[#141417] border border-white/8 rounded-[14px] p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B7280] mb-5">
                  At a glance
                </p>
                <dl className="space-y-4">
                  {[
                    { label: "Location", value: "Marrakesh, Morocco" },
                    { label: "Founded", value: "2025" },
                    { label: "Languages", value: "English · French · Arabic" },
                    { label: "Availability", value: "2–3 projects / month" },
                    { label: "Response time", value: "Under 2 hours" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <dt className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-medium">
                        {label}
                      </dt>
                      <dd className="text-[15px] text-white font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </FadeSection>

        </div>
      </div>
    </section>
  );
}
