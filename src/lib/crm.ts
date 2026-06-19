import { identifyVisitor } from "./tracker";

const CRM_URL = process.env.NEXT_PUBLIC_CRM_API_URL;
const CRM_KEY = process.env.NEXT_PUBLIC_CRM_API_KEY || "";

export type LeadSource =
  | "lead_magnet"
  | "contact_form"
  | "pricing_cta"
  | "whatsapp_click"
  | "footer_form";

export interface LeadPayload {
  email: string;
  source: LeadSource;
  name?: string;
  phone?: string;
  company?: string;
  message?: string;
  projectType?: string;
  planInterest?: string;
}

export async function submitLead(payload: LeadPayload): Promise<boolean> {
  try {
    if (!CRM_URL) {
      console.error("NEXT_PUBLIC_CRM_API_URL not set");
      return false;
    }
    const params = new URLSearchParams(window.location.search);
    const res = await fetch(CRM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CRM_KEY,
      },
      body: JSON.stringify({
        ...payload,
        pageUrl: window.location.href,
        referrer: document.referrer,
        utmSource: params.get("utm_source") || undefined,
        utmMedium: params.get("utm_medium") || undefined,
        utmCampaign: params.get("utm_campaign") || undefined,
      }),
    });
    if (res.ok && payload.email) {
      try {
        localStorage.setItem("dsf_email", payload.email);
      } catch {}
      identifyVisitor(payload.email).catch(() => {});
    }
    return res.ok;
  } catch (err) {
    console.error("submitLead failed:", err);
    return false;
  }
}

export function getKnownEmail(): string | null {
  try {
    return localStorage.getItem("dsf_email");
  } catch {
    return null;
  }
}
