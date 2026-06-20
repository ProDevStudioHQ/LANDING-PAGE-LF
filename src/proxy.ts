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

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
