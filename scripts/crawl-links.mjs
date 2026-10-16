#!/usr/bin/env node
// Internal link crawler.
//
//   node scripts/crawl-links.mjs                       # against production
//   node scripts/crawl-links.mjs http://localhost:3000  # against `next start`
//
// Crawls every page reachable from the homepage through <a href> links and
// reports:
//   - broken internal links (target answers 4xx/5xx)          -> fails
//   - internal links that point at a redirect (wasted hop)    -> warning
//   - orphan pages: in sitemap.xml but linked from no page    -> warning
// For each problem it names the pages that contain the link, so it can be
// fixed at the source.

const BASE = (process.argv[2] || "https://digitalstudiolf.online").replace(/\/$/, "");
const SITE = "https://digitalstudiolf.online";
const MAX_PAGES = 1000;

const status = new Map(); // path -> { code, location }
const linkedFrom = new Map(); // path -> Set(source paths)
const queue = ["/"];
const crawled = new Set();

function normalize(href, from) {
  if (!href || /^(mailto:|tel:|javascript:|#|data:)/i.test(href)) return null;
  let url;
  try {
    url = new URL(href.replace(SITE, BASE), BASE + from);
  } catch {
    return null;
  }
  if (url.origin !== new URL(BASE).origin) return null;
  if (/^\/(_next|api)\//.test(url.pathname) || /\.(png|jpe?g|webp|svg|ico|xml|txt|json|pdf|woff2?)$/i.test(url.pathname)) return null;
  return url.pathname.replace(/\/$/, "") || "/";
}

async function fetchStatus(path) {
  if (status.has(path)) return status.get(path);
  const res = await fetch(BASE + path, { redirect: "manual" });
  const entry = { code: res.status, location: res.headers.get("location"), res };
  status.set(path, entry);
  return entry;
}

while (queue.length && crawled.size < MAX_PAGES) {
  const batch = queue.splice(0, 10).filter((p) => !crawled.has(p));
  await Promise.all(
    batch.map(async (path) => {
      crawled.add(path);
      const { code, res } = await fetchStatus(path);
      if (code !== 200) return;
      const html = await res.text();
      // Visible links only: skip the RSC flight payload inside <script>.
      const body = html.replace(/<script[\s\S]*?<\/script>/g, "");
      for (const m of body.matchAll(/<a\s[^>]*href="([^"]+)"/gi)) {
        const target = normalize(m[1].replace(/&amp;/g, "&"), path);
        if (!target) continue;
        if (!linkedFrom.has(target)) linkedFrom.set(target, new Set());
        linkedFrom.get(target).add(path);
        if (!crawled.has(target) && !queue.includes(target)) queue.push(target);
      }
    })
  );
}

// Make sure every linked target has a status, even past MAX_PAGES.
await Promise.all([...linkedFrom.keys()].map(fetchStatus));

let broken = 0;
const sources = (p) => [...linkedFrom.get(p)].slice(0, 5).join(", ") + (linkedFrom.get(p).size > 5 ? ", …" : "");
for (const [path, { code, location }] of [...status].sort()) {
  if (!linkedFrom.has(path)) continue;
  if (code >= 400) {
    broken++;
    console.log(`BROKEN   ${code} ${path}  ← ${sources(path)}`);
  } else if (code >= 300) {
    console.log(`REDIRECT ${code} ${path} → ${location}  ← ${sources(path)}`);
  }
}

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, "") || "/");
const orphans = listed.filter((p) => p !== "/" && !linkedFrom.has(p));
for (const p of orphans) console.log(`ORPHAN   ${p}  (in sitemap, linked from no crawled page)`);

console.log(`\n${crawled.size} pages crawled, ${broken} broken link target(s), ${orphans.length} orphan(s).`);
process.exit(broken ? 1 : 0);
