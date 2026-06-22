import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "";

  if (host.startsWith("www.")) {
    const nonWwwHost = host.slice(4);
    const path = request.nextUrl.pathname + request.nextUrl.search;
    return NextResponse.redirect(`https://${nonWwwHost}${path}`, { status: 301 });
  }

  // Expose the locale to the root layout so it can set <html lang>. French
  // content lives under /fr/*; everything else is English.
  const locale = request.nextUrl.pathname.startsWith("/fr") ? "fr" : "en";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: "/:path*",
};
