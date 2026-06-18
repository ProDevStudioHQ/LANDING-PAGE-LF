import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const TO_EMAIL = "digitalstudiolf@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

type Payload = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

function escape(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const CRM_LEADS_URL =
  process.env.CRM_LEADS_URL || "https://crm.digitalstudiolf.online/api/public/leads";

// Forward the inquiry to the CRM so it appears under "Landing Page Leads".
// Server-to-server (no CORS). Non-fatal: a CRM hiccup must not break the form.
async function forwardToCrm(p: Payload): Promise<void> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const apiKey = process.env.CRM_PUBLIC_API_KEY;
  if (apiKey) {
    headers["x-api-key"] = apiKey;
  } else {
    console.warn("[contact] CRM_PUBLIC_API_KEY is NOT set on the landing app — the CRM will reject the lead with 401. Add it in Dokploy env.");
  }
  try {
    const res = await fetch(CRM_LEADS_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: p.name,
        email: p.email,
        source: "contact_form",
        projectType: p.projectType || "",
        planInterest: p.budget || "", // shows as "Plan Interest" in the CRM
        message: p.message || "",
        pageUrl: "https://digitalstudiolf.online/#contact",
        referrer: "https://digitalstudiolf.online/",
      }),
    });
    if (!res.ok) {
      console.error("[contact] CRM forward failed", res.status, await res.text().catch(() => ""));
    }
  } catch (e) {
    console.error("[contact] CRM forward error", e);
  }
}

export async function POST(req: Request) {
  let body: Partial<Payload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, projectType, budget, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Always push the lead into the CRM (independent of email delivery).
  await forwardToCrm({ name, email, projectType: projectType || "", budget: budget || "", message });

  if (!RESEND_API_KEY) {
    console.warn("[contact] RESEND_API_KEY not set — CRM forwarded, email skipped", body);
    return NextResponse.json({ ok: true, dev: true });
  }

  const subject = `New inquiry — ${projectType || "Project"} (${budget || "no budget"})`;
  const html = `
    <h2>New project inquiry</h2>
    <p><strong>Name:</strong> ${escape(name)}</p>
    <p><strong>Email:</strong> ${escape(email)}</p>
    <p><strong>Project type:</strong> ${escape(projectType || "—")}</p>
    <p><strong>Budget:</strong> ${escape(budget || "—")}</p>
    <p><strong>Message:</strong></p>
    <p>${escape(message).replace(/\n/g, "<br>")}</p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Digital Studio LF <${FROM_EMAIL}>`,
        to: TO_EMAIL,
        reply_to: email,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[contact] resend error", res.status, err);
      return NextResponse.json({ error: "Email service failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] send failed", e);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
