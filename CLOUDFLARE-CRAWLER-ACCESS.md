# Semrush 403 — diagnosis and fix

**Symptom:** Semrush Site Audit reports
*"We couldn't crawl this page using the SEMrushBot-Desktop user agent due to an HTTP error 403."*

**Cause: Cloudflare bot protection. Nothing in this repository.**
**Fix location: Cloudflare dashboard. There is no code change that resolves this.**

---

## What was tested

Everything below was run against the live site. All of it passed, which is what rules out the origin and this codebase.

| Test | Result |
|---|---|
| `GET /` as `SEMrushBot-Desktop` | **200** |
| `GET /` as `SemrushBot/7~bl` (backlink crawler UA) | **200** |
| `GET /` as `SemrushBot-SI` (site-audit UA) | **200** |
| `GET /` as `Googlebot` | **200** |
| **All 113 sitemap URLs** as `SEMrushBot-Desktop` | **113 / 113 = 200, zero non-200** |
| 40 rapid sequential requests (rate-limit probe) | **40 / 40 = 200** |
| `HEAD /` as SEMrushBot | **200** |
| Empty user-agent | **200** |
| HTTP/1.1, no `Accept` header | **200** |
| `GET /robots.txt` as SEMrushBot | **200** |

Also confirmed in the codebase:

- **No `middleware.ts` exists.** The `ƒ Proxy (Middleware)` line in `next build` output is Next.js's internal handler for the `redirects()` and `headers()` config, not a user middleware.
- **No user-agent gating anywhere in `src/`.**
- **`public/robots.txt` does not block Semrush.** SEMrushBot is not in the disallow list and is covered by `User-agent: * / Allow: /`. A robots block would also produce a *skipped* page in Semrush, not an HTTP 403.

## Why it still 403s for Semrush

Response headers show **Cloudflare** in front of the origin:

```
Server: cloudflare
CF-RAY: a3145369b94fe3d0-LIS
NEL / Report-To: cf-nel
```

Cloudflare's bot protection scores requests on **source IP reputation, ASN, and TLS fingerprint** — not just user-agent. Requests from this machine (a consumer IP) score as human and pass, even with a bot UA and no browser headers. Semrush crawls from its own datacenter ranges, which score as automated and get blocked.

That is why the 403 is not reproducible from here and why no header or UA combination triggers it.

---

## How to fix it

### Step 1 — Find the exact rule (do this first, don't guess)

Cloudflare dashboard → your domain → **Security → Events**.

Filter to the time of the Semrush crawl and look for `Action: Block` with `403`. The log names the **exact service and rule** that fired — Bot Fight Mode, a WAF managed rule, a custom rule, or rate limiting. Fix that one rather than turning things off blindly.

### Step 2 — Apply the fix for whatever Events named

**If it was Bot Fight Mode** (Security → Bots) — the most common cause. It blocks "definitely automated" traffic and Cloudflare documents that it can block legitimate SEO crawlers. Either turn it off, or on Pro+ use Super Bot Fight Mode and set *Definitely automated* to **Allow**, with *Verified Bots* allowed.

**If it was the "Block AI Scrapers and Crawlers" toggle** (Security → Bots) — this catches far more than AI trainers. Note this site already expresses its AI-training stance in `robots.txt` via `Content-Signal: search=yes,ai-train=no`, so the Cloudflare toggle is partly redundant with a policy you already publish.

**If it was a WAF managed or custom rule** — add a skip rule (below).

**If it was rate limiting** — raise the threshold, or exempt the Semrush ranges.

### Step 3 — Add an explicit allow (recommended regardless)

Security → **WAF → Custom rules → Create rule**:

- **Expression:** match Semrush's **published crawler IP ranges** — get the current list from Semrush's own bot documentation (`semrush.com/bot`). Matching on IP is the robust option; matching on `http.user_agent contains "SEMrushBot"` is simpler but trivially spoofable by anyone wanting to bypass your protection.
- **Action: Skip** → tick *Bot Fight Mode*, *All remaining custom rules*, *Managed rules*, and *Browser Integrity Check*.

Deploy the rule, then re-run the Semrush Site Audit.

### Step 4 — Verify

Re-run Site Audit. If it still 403s, Security → Events will again name the rule that fired — repeat step 2 for that one. Cloudflare evaluates several products in sequence, so it is normal to have to clear more than one.

---

## Scope note

I could not apply this fix. It requires Cloudflare dashboard access, which this environment does not have, and it lives outside the repository. Everything that *is* in the repository was checked and is not the cause — the site serves 200 to Semrush's user agents on all 113 sitemap URLs.

While you are in there: whatever is blocking Semrush is very likely blocking **Ahrefs, Moz, and other third-party SEO crawlers** the same way. `analytics.ahrefs.com` is already loaded on the site, so Ahrefs is worth checking in the same pass.
