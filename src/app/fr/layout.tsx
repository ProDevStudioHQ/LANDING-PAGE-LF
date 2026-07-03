// French route segment. The root layout renders a static <html lang="en"> so
// that every page can be statically prerendered (which lets beasties inline
// critical CSS). For /fr/* routes we correct the document language to "fr" with
// a tiny inline script that runs before first paint — no layout shift, no FOUC,
// and JS-rendering crawlers (Googlebot) see lang="fr". Language targeting for
// non-JS crawlers is handled by the hreflang tags.
export default function FrLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="fr"`,
        }}
      />
      {children}
    </>
  );
}
