// French route segment. The <html lang="fr"> is set by the root layout from the
// x-locale header (proxy.ts middleware), so no wrapper lang is needed here.
export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
