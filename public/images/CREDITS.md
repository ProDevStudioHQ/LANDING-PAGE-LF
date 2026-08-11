# Image credits

Hero photography is from [Unsplash](https://unsplash.com), used under the
[Unsplash License](https://unsplash.com/license): free for commercial and
non-commercial use, no permission or attribution required. Attribution is
recorded here anyway so the provenance of every shipped asset is traceable.

The license does **not** permit selling unmodified copies or using the photos to
build a competing stock-image service. Neither applies to using them as site
photography.

| File | Unsplash photo ID | Delivered as |
|---|---|---|
| `hero-dashboard.webp` | `photo-1460925895917-afdab827c52f` | 1320×880, q72, WebP |
| `hero-team.webp` | `photo-1551434678-e076c223a692` | 640×480, q72, WebP |
| `hero-design.webp` | `photo-1531403009284-440f080d1e12` | 640×480, q72, WebP |

Each was fetched from `images.unsplash.com` with `fit=crop&crop=entropy` at the
size above, so the committed file is already close to its largest rendered size
and `next/image` only ever downscales.

## Replacing these

These are stock placeholders. Screenshots of real shipped work — the CRM, a
client riad or travel site — convert better on an agency page than stock
photography. To swap one, drop a file at the same path with the same aspect
ratio (3:2 for `hero-dashboard`, 4:3 for the other two) and update the `alt`
text in `src/components/HeroSection.tsx`. No layout changes needed.

## Not hero images

- `idea-digital.png` / `.webp` — OG/social preview image, referenced from
  `src/lib/schema.ts` and the `/services/*` and `/fr/*` routes. Not rendered
  on-page anywhere; do not delete.
- `og-home.png` — OG image for the homepage.
