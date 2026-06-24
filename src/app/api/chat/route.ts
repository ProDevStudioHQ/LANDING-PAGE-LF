import { NextRequest, NextResponse } from "next/server";

// Same-origin proxy for the CRM chatbot message endpoint (avoids client-side
// CORS and forwards the visitor IP so the CRM's rate limiting still applies).
export const dynamic = "force-dynamic";

function crmBase(): string {
  try {
    const api = process.env.NEXT_PUBLIC_CRM_API_URL;
    if (api) return new URL(api).origin;
  } catch {}
  return "https://crm.digitalstudiolf.online";
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const ip = req.headers.get("x-forwarded-for") || "";
  try {
    const res = await fetch(`${crmBase()}/api/public/chatbot/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(ip ? { "x-forwarded-for": ip } : {}) },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ reply: "Sorry, the assistant is unavailable right now.", source: "fallback" }, { status: 200 });
  }
}
