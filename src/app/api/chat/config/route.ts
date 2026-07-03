import { NextResponse } from "next/server";

// Same-origin proxy for the CRM chatbot config (avoids client-side CORS).
export const dynamic = "force-dynamic";

function crmBase(): string {
  try {
    const api = process.env.NEXT_PUBLIC_CRM_API_URL;
    if (api) return new URL(api).origin;
  } catch {}
  return "https://crm.digitalstudiolf.online";
}

export async function GET() {
  try {
    const res = await fetch(`${crmBase()}/api/public/chatbot/config`, { next: { revalidate: 300 } });
    if (!res.ok) return NextResponse.json({ config: { enabled: false } });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ config: { enabled: false } });
  }
}
