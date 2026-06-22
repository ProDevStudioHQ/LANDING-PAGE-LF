"use client";

import { m } from "framer-motion";

// IMPORTANT: only REAL, verifiable client testimonials may go here.
// Fabricated quotes/names risk a Google manual penalty and mislead buyers.
// TODO: user supplies real testimonials (quote, name, business, city, optional
// result metric). The section renders nothing until at least one real entry
// exists, so no placeholder/fake proof ever ships.
type Testimonial = { name: string; role: string; content: string; rating: number };

const testimonials: Testimonial[] = [
  // { name: "Real Client Name", role: "Role, Business — City", content: "Real quote.", rating: 5 },
];

export default function TestimonialsSection() {
  // Render nothing until real testimonials are added.
  if (testimonials.length === 0) return null;

  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Loved by{" "}
            <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Don&apos;t take our word for it — hear what our clients have to say.
          </p>
        </m.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <m.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 sm:p-8 hover:border-primary/20 transition-all duration-500 glass-hover"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-primary text-sm">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/60 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary-dark/30 flex items-center justify-center text-white font-bold text-sm">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {t.name}
                  </div>
                  <div className="text-xs text-white/40">{t.role}</div>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
