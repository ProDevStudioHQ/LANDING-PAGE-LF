import { NextResponse } from "next/server";

// CSP violation collector.
//
// The site ships Content-Security-Policy-Report-Only (see next.config.ts) with
// the stated plan of "watch the reports, then promote to enforcing". That plan
// was unrunnable: the header carried no reporting destination, so violations
// only ever reached the visitor's own devtools console and nothing was ever
// collected. This route is that destination.
//
// Browsers send violations in two incompatible shapes and we accept both:
//   - legacy `report-uri`  → Content-Type: application/csp-report, one report
//   - Reporting API `report-to` → Content-Type: application/reports+json, a batch
export const dynamic = "force-dynamic";

// Reports arrive unauthenticated from any browser, so the body is untrusted and
// unbounded. Anything larger than this is not a real violation report.
const MAX_BODY_BYTES = 64 * 1024;

type Normalized = {
  directive: string;
  blockedURL: string;
  documentURL: string;
  sample: string;
};

type LegacyReport = {
  "csp-report"?: {
    "effective-directive"?: string;
    "violated-directive"?: string;
    "blocked-uri"?: string;
    "document-uri"?: string;
    "script-sample"?: string;
  };
};

type ReportingApiEntry = {
  type?: string;
  url?: string;
  body?: {
    effectiveDirective?: string;
    violatedDirective?: string;
    blockedURL?: string;
    documentURL?: string;
    sample?: string;
  };
};

// Browser extensions inject scripts and styles into every page they touch and
// the resulting violations are attributed to us. They are noise: no change to
// this site can fix them, and they would drown the real signal we need in order
// to decide whether the policy is safe to enforce.
const EXTENSION_SCHEMES = [
  "chrome-extension:",
  "moz-extension:",
  "safari-extension:",
  "safari-web-extension:",
  "webkit-masked-url:",
];

function isExtensionNoise(blockedURL: string): boolean {
  return EXTENSION_SCHEMES.some((scheme) => blockedURL.startsWith(scheme));
}

function normalize(payload: unknown): Normalized[] {
  const out: Normalized[] = [];

  const push = (
    directive?: string,
    blockedURL?: string,
    documentURL?: string,
    sample?: string
  ) => {
    out.push({
      directive: directive || "unknown",
      blockedURL: blockedURL || "",
      documentURL: documentURL || "",
      // Inline-script samples can be long; the first 120 chars are enough to
      // recognize which script it was.
      sample: (sample || "").slice(0, 120),
    });
  };

  if (Array.isArray(payload)) {
    for (const entry of payload as ReportingApiEntry[]) {
      if (entry?.type && entry.type !== "csp-violation") continue;
      const b = entry?.body;
      if (!b) continue;
      push(b.effectiveDirective || b.violatedDirective, b.blockedURL, b.documentURL || entry.url, b.sample);
    }
    return out;
  }

  const legacy = (payload as LegacyReport)?.["csp-report"];
  if (legacy) {
    push(
      legacy["effective-directive"] || legacy["violated-directive"],
      legacy["blocked-uri"],
      legacy["document-uri"],
      legacy["script-sample"]
    );
  }
  return out;
}

// A single misbehaving page can fire the same violation on every load, so log
// each distinct directive+resource pair at most once an hour and carry a count.
// In-memory and per-instance: this is a sampling aid, not an audit log.
const LOG_WINDOW_MS = 60 * 60 * 1000;
const seen = new Map<string, { count: number; firstLoggedAt: number }>();

function shouldLog(key: string): { log: boolean; count: number } {
  const now = Date.now();
  const hit = seen.get(key);
  if (!hit || now - hit.firstLoggedAt > LOG_WINDOW_MS) {
    seen.set(key, { count: 1, firstLoggedAt: now });
    return { log: true, count: 1 };
  }
  hit.count += 1;
  return { log: false, count: hit.count };
}

export async function POST(req: Request) {
  const declaredLength = Number(req.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return new NextResponse(null, { status: 413 });
  }

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return new NextResponse(null, { status: 204 });
  }
  if (!raw || raw.length > MAX_BODY_BYTES) {
    return new NextResponse(null, { status: 204 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  for (const v of normalize(payload)) {
    if (isExtensionNoise(v.blockedURL)) continue;
    const key = `${v.directive}|${v.blockedURL}`;
    const { log, count } = shouldLog(key);
    if (log) {
      console.warn(
        `[csp] ${v.directive} blocked ${v.blockedURL || "(inline)"} on ${v.documentURL}` +
          (v.sample ? ` sample="${v.sample}"` : "")
      );
    } else if (count % 100 === 0) {
      console.warn(`[csp] ${key} — ${count} more occurrences this hour`);
    }
  }

  // Browsers ignore the response body; 204 keeps the reporting path cheap.
  return new NextResponse(null, { status: 204 });
}

// Reports are POST-only. Anything else gets a plain 405 rather than a Next 404
// page, so a stray GET does not render HTML for a machine endpoint.
export async function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}
