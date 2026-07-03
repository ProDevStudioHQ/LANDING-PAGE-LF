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

  // Locale is path-based (/fr/* → fr) and resolved at the layout level, so the
  // middleware no longer needs to inject an x-locale header. Avoiding it keeps
  // pages statically prerenderable for critical-CSS inlining.
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
