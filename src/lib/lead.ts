// Client side of the one website lead pipeline: every form posts to
// /api/contact, which forwards to the CRM and emails the studio. This adds the
// visit's UTMs (kept in sessionStorage, src/lib/ga.ts) and fires generate_lead
// only after the server has answered ok.

import { gaEvent, getUtm } from "./ga";
import { identifyVisitor } from "./tracker";

export type LeadFields = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  business?: string;
  projectType?: string;
  budget?: string;
  message?: string;
};

export async function submitWebsiteLead(
  fields: LeadFields,
  formId: string,
): Promise<{ ok: true } | { ok: false; error: string; network?: boolean }> {
  const utm = getUtm();
  let res: Response;
  try {
    res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...fields,
        formId,
        pageUrl: window.location.origin + window.location.pathname,
        referrer: document.referrer || "",
        utmSource: utm.utm_source,
        utmMedium: utm.utm_medium,
        utmCampaign: utm.utm_campaign,
        utmTerm: utm.utm_term,
        utmContent: utm.utm_content,
      }),
    });
  } catch {
    return { ok: false, error: "", network: true };
  }
  const data = (await res.json().catch(() => ({}))) as { error?: string };
  if (!res.ok) return { ok: false, error: data.error || "" };

  gaEvent("generate_lead", {
    form_id: formId,
    page: window.location.pathname,
    utm_campaign: utm.utm_campaign || "(none)",
  });
  void identifyVisitor(fields.email);
  return { ok: true };
}
