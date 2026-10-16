#!/usr/bin/env node
// On-page SEO head audit for every URL in the sitemap.
//
//   node scripts/check-meta.mjs                       # against production
//   node scripts/check-meta.mjs http://localhost:3000  # against `next start`
//   node scripts/check-meta.mjs <base> --list          # also print every title/description
//
// Fails (exit 1) on: duplicate titles, duplicate descriptions, missing title or
// description, not exactly one H1, missing og:title/og:description/og:image/og:url.
// Warns on: title outside 30–60 chars, description outside 120–160 chars.

const args = process.argv.slice(2);
const BASE = (args.find((a) => !a.startsWith("--")) || "https://digitalstudiolf.online").replace(/\/$/, "");
const LIST = args.includes("--list");
const SITE = "https://digitalstudiolf.online";

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const meta = (head, attr, key) =>
  decode(head.match(new RegExp(`<meta[^>]+${attr}="${key}"[^>]+content="([^"]*)"`, "i"))?.[1] ?? "");

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, BASE));

const pages = await Promise.all(
  urls.map(async (url) => {
    const html = await (await fetch(url)).text();
    const head = html.split("</head>")[0];
    return {
      path: url.replace(BASE, "") || "/",
      title: decode(head.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? ""),
      description: meta(head, "name", "description"),
      h1: (html.match(/<h1[\s>]/gi) || []).length,
      og: ["og:title", "og:description", "og:image", "og:url"].filter((k) => !meta(head, "property", k)),
    };
  })
);

let errors = 0;
const err = (m) => (errors++, console.log(`ERROR ${m}`));
const warn = (m) => console.log(`warn  ${m}`);

for (const field of ["title", "description"]) {
  const seen = new Map();
  for (const p of pages) {
    if (!p[field]) err(`${p.path}: missing ${field}`);
    else seen.set(p[field], [...(seen.get(p[field]) || []), p.path]);
  }
  for (const [value, paths] of seen) if (paths.length > 1) err(`duplicate ${field} "${value}" on ${paths.join(", ")}`);
}

for (const p of pages) {
  if (p.h1 !== 1) err(`${p.path}: ${p.h1} H1 tags`);
  if (p.og.length) err(`${p.path}: missing ${p.og.join(", ")}`);
  if (p.title && (p.title.length < 30 || p.title.length > 60)) warn(`${p.path}: title ${p.title.length} chars`);
  if (p.description && (p.description.length < 120 || p.description.length > 160))
    warn(`${p.path}: description ${p.description.length} chars`);
  if (LIST) console.log(`\n${p.path}\n  T(${p.title.length}) ${p.title}\n  D(${p.description.length}) ${p.description}`);
}

console.log(`\n${pages.length} pages checked, ${errors} error(s).`);
process.exit(errors ? 1 : 0);
