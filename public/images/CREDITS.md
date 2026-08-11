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
| `hero-bg.webp` | `photo-1541746972996-4e0b0f43e02a` | 2000×1125, q45, WebP |

Fetched from `images.unsplash.com` with `fit=crop&crop=entropy`. 2000px wide is
deliberate: `deviceSizes` in `next.config.ts` tops out at 1920, so the committed
file is barely above the largest width anything will ever request and
`next/image` only ever downscales.

q45 is far lower than you would normally ship, and is fine here specifically
because the photo is dark and low-contrast and then sits under two heavy
gradient scrims — there is no smooth gradient or flat colour left for banding to
show up in. Re-check by eye if the image is ever swapped for a brighter one.

Candidates rejected while picking this, so the same ground isn't covered twice:
close-up code and circuit-board shots are too high-detail to put a headline
over, bright open-plan offices can't carry white text, and a large coworking
floor implies a team size the studio may not have.

## Replacing this

It is a stock placeholder. A photo of the actual studio, or a dark screenshot of
real shipped work, is more credible on an agency page than stock. To swap it,
drop a ~2000×1125 file at the same path. The scrims in `HeroSection.tsx` assume
a dark source — a brighter photo needs their opacities raised, or the headline
will drop below the WCAG AA contrast floor.

## Not hero images

- `idea-digital.png` / `.webp` — OG/social preview image, referenced from
  `src/lib/schema.ts` and the `/services/*` and `/fr/*` routes. Not rendered
  on-page anywhere; do not delete.
- `og-home.png` — OG image for the homepage.
