// English service page  <->  French sector page covering the same offer.
//
// The French /fr/solutions/* pages were built without English twins, and the
// English /services/* pages already covered two of the same offers. Pairing
// them lets Google show the right language to each searcher instead of
// treating them as two unrelated pages. Both routes read this one map, so a
// pair can never be declared on one side only.
//
// The two static pairs (web-design-morocco, web-design-marrakech, and the
// price guide) declare their alternates in their own page files.
const EN_TO_FR: Record<string, string> = {
  "/services/real-estate-websites": "/fr/solutions/site-web-agence-immobiliere-maroc",
  "/services/hotel-riad-websites": "/fr/solutions/site-web-riad-marrakech",
};

const FR_TO_EN = Object.fromEntries(Object.entries(EN_TO_FR).map(([en, fr]) => [fr, en]));

/** `alternates.languages` for a paired path, or undefined when it has no twin. */
export function hreflangFor(path: string): Record<string, string> | undefined {
  const en = EN_TO_FR[path] ? path : FR_TO_EN[path];
  if (!en) return undefined;
  return { en, fr: EN_TO_FR[en], "x-default": en };
}
