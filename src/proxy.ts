import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PREVIEW_HOST =
  /\.(vercel\.app|netlify\.app|pages\.dev|ngrok-free\.app|ngrok\.io|trycloudflare\.com)$|^(staging|preview|dev)\./i;

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

  // Preview / staging deploys must never be indexed: a copy of the site on a
  // second host competes with production for every query. Matched on hosts that
  // are unambiguously not production (platform preview domains and staging./
  // preview./dev. subdomains) or an explicit SITE_NOINDEX=1 — deliberately NOT
  // "any host other than digitalstudiolf.online", because the Host header the
  // origin sees behind Cloudflare is not guaranteed, and a false match there
  // would noindex the live site.
  const hostname = host.split(":")[0];
  if (process.env.SITE_NOINDEX === "1" || PREVIEW_HOST.test(hostname)) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  // Locale is path-based (/fr/* → fr) and resolved at the layout level, so the
  // middleware no longer needs to inject an x-locale header. Avoiding it keeps
  // pages statically prerenderable for critical-CSS inlining.
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
