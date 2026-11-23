import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const TO_EMAIL = "digitalstudiolf@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const SITE_URL = "https://digitalstudiolf.online";

// Lowest budget the forms accept. Matches the cheapest price the site shows:
// the Landing Page plan, $150 (1,500 MAD) while the CRM promotion runs, $250
// (2,500 MAD) otherwise. The floor stays at the promotional price so a buyer
// who saw "$150" can always submit.
const MIN_BUDGET_MAD = 1500;

// The one lead pipeline for every website form (/contact, /fr/contact, the
// homepage form, /start). formId tells them apart in the CRM note and email.
type Payload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  business: string;
  projectType: string;
  budget: string;
  message: string;
  formId: string;
  pageUrl: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
};

function escape(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function str(v: unknown, max = 200): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

const CRM_LEADS_URL =
  process.env.CRM_LEADS_URL || "https://crm.digitalstudiolf.online/api/public/leads";

// The CRM lead stores name/email/phone/company/utmSource/utmMedium/utmCampaign
// as fields. Everything else it has no column for (what the business does, the
// form, utm_term/utm_content) is prefixed onto the message so nothing is lost.
function crmMessage(p: Payload): string {
  const lines = [
    p.formId && `Form: ${p.formId}`,
    p.company && `Business / Company: ${p.company}`,
    p.business && `What the business does: ${p.business}`,
    p.phone && `WhatsApp / phone: ${p.phone}`,
    p.utmTerm && `utm_term: ${p.utmTerm}`,
    p.utmContent && `utm_content: ${p.utmContent}`,
  ].filter(Boolean);
  const body = p.message || "(no message)";
  return lines.length ? `${lines.join("\n")}\n\n${body}` : body;
}

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
        phone: p.phone || undefined,
        company: p.company || undefined,
        source: "contact_form",
        projectType: p.projectType || "",
        planInterest: p.budget || "", // shows as "Plan Interest" in the CRM
        message: crmMessage(p),
        pageUrl: p.pageUrl || `${SITE_URL}/#contact`,
        referrer: p.referrer || `${SITE_URL}/`,
        utmSource: p.utmSource || undefined,
        utmMedium: p.utmMedium || undefined,
        utmCampaign: p.utmCampaign || undefined,
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
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = str(body.name, 120);
  const email = str(body.email, 254);
  // Message is required by the /contact form itself, but /start asks for
  // "what you need" (projectType) instead of free text.
  if (!name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  const budget = str(body.budget, 40);
  // The contact form sends a buyer-typed budget like "12,000 MAD". The footer
  // newsletter and /start post without one, so an empty budget is allowed.
  if (budget) {
    const amount = Number(budget.replace(/[^\d]/g, ""));
    if (!amount || amount < MIN_BUDGET_MAD) {
      return NextResponse.json({ error: "Minimum budget is 1,500 MAD" }, { status: 400 });
    }
  }

  // Only our own pages are accepted as pageUrl; anything else falls back.
  const rawPageUrl = str(body.pageUrl, 300);
  const pageUrl = rawPageUrl.startsWith(`${SITE_URL}/`) ? rawPageUrl : "";

  const payload: Payload = {
    name,
    email,
    phone: str(body.phone, 40).replace(/[^\d+()\s.-]/g, ""),
    company: str(body.company, 160),
    business: str(body.business, 300),
    projectType: str(body.projectType, 60),
    budget,
    message: str(body.message, 5000),
    formId: str(body.formId, 40).replace(/[^\w-]/g, ""),
    pageUrl,
    referrer: str(body.referrer, 500),
    utmSource: str(body.utmSource, 100),
    utmMedium: str(body.utmMedium, 100),
    utmCampaign: str(body.utmCampaign, 100),
    utmTerm: str(body.utmTerm, 100),
    utmContent: str(body.utmContent, 100),
  };

  // Always push the lead into the CRM (independent of email delivery).
  await forwardToCrm(payload);

  if (!RESEND_API_KEY) {
    console.warn("[contact] RESEND_API_KEY not set — CRM forwarded, email skipped");
    return NextResponse.json({ ok: true, dev: true });
  }

  const p = payload;
  const subject = `New inquiry — ${p.projectType || "Project"}${p.company ? ` · ${p.company}` : ""} (${p.budget || "no budget"})${p.formId ? ` [${p.formId}]` : ""}`;
  const utm = [p.utmSource, p.utmMedium, p.utmCampaign, p.utmTerm, p.utmContent].some(Boolean)
    ? `source=${p.utmSource || "—"} · medium=${p.utmMedium || "—"} · campaign=${p.utmCampaign || "—"} · term=${p.utmTerm || "—"} · content=${p.utmContent || "—"}`
    : "—";
  const html = `
    <h2>New project inquiry</h2>
    <p><strong>Name:</strong> ${escape(p.name)}</p>
    <p><strong>Email:</strong> ${escape(p.email)}</p>
    <p><strong>WhatsApp / phone:</strong> ${escape(p.phone || "—")}</p>
    <p><strong>Business / Company:</strong> ${escape(p.company || "—")}</p>
    <p><strong>What the business does:</strong> ${escape(p.business || "—")}</p>
    <p><strong>What they need:</strong> ${escape(p.projectType || "—")}</p>
    <p><strong>Budget:</strong> ${escape(p.budget || "—")}</p>
    <p><strong>Form:</strong> ${escape(p.formId || "—")} · ${escape(p.pageUrl || "—")}</p>
    <p><strong>Campaign:</strong> ${escape(utm)}</p>
    <p><strong>Project details:</strong></p>
    <p>${escape(p.message || "—").replace(/\n/g, "<br>")}</p>
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
        reply_to: p.email,
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
