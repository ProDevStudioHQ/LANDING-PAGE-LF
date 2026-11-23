"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { isQuietPath } from "@/lib/ga";

// Ahrefs Web Analytics. Moved out of the root layout's <head> so it can skip
// the unsubscribe page, whose URL may carry a token or an email address.
export function AhrefsAnalytics() {
  if (isQuietPath(usePathname())) return null;
  return (
    <Script
      src="https://analytics.ahrefs.com/analytics.js"
      data-key="zH5yLEYCHHy5Gj94bKUl0A"
      strategy="lazyOnload"
    />
  );
}
