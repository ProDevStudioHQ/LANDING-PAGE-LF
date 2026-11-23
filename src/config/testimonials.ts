// ─────────────────────────────────────────────────────────────────────────
// TESTIMONIAL PLACEHOLDER — no real testimonial exists yet (confirmed with the
// owner, 23 Nov 2026).
//
// Add ONLY real, verifiable client quotes, with the client's permission. Never
// invent quotes, names, ratings or results. While this list is empty, the
// testimonial slot on /start and /contact renders nothing at all, so no
// placeholder text ever reaches visitors.
//
// Example shape:
//   { quote: "Real words from the client.", name: "First Last",
//     role: "Owner", business: "Business name", city: "Marrakech",
//     projectSlug: "atlas-mountains-adventures" }  // optional link to the case study
// ─────────────────────────────────────────────────────────────────────────

export type RealTestimonial = {
  quote: string;
  name: string;
  role?: string;
  business?: string;
  city?: string;
  projectSlug?: string;
};

export const TESTIMONIALS: RealTestimonial[] = [];
