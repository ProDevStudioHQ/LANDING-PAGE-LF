// Submit every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam — and
// therefore Microsoft Copilot, which is fed by the Bing index). Google does NOT
// participate in IndexNow; getting pages into Google still goes through Search
// Console. This exists because it is the only *programmatic* submission path
// that needs no API credentials — ownership is proven by hosting the key file.
//
// Usage:
//   node scripts/indexnow.mjs              # submit the whole sitemap
//   node scripts/indexnow.mjs /services    # submit only URLs under a path
//   node scripts/indexnow.mjs --dry-run    # print what would be submitted
//
// In Git Bash on Windows, prefix a path filter with MSYS_NO_PATHCONV=1 — MSYS
// otherwise rewrites "/services" into a C:\ path before node ever sees it.
// PowerShell and CI (Linux) need no such prefix.
//
// The key file must stay reachable at ${SITE_URL}/${KEY}.txt — deleting it makes
// every future submission fail with 403.

const SITE_URL = "https://digitalstudiolf.online";
const KEY = "6aea9438a42c9e87bf44e662445a6a93";
const ENDPOINT = "https://api.indexnow.org/indexnow";

// IndexNow caps a single submission at 10,000 URLs.
const MAX_URLS = 10000;

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const pathFilter = args.find((a) => !a.startsWith("--"));

async function getSitemapUrls() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  let urls = await getSitemapUrls();
  if (!urls.length) throw new Error("no <loc> entries found in sitemap.xml");

  if (pathFilter) {
    urls = urls.filter((u) => new URL(u).pathname.startsWith(pathFilter));
    if (!urls.length) throw new Error(`no sitemap URLs matched "${pathFilter}"`);
  }

  if (urls.length > MAX_URLS) {
    console.warn(`! ${urls.length} URLs exceeds the ${MAX_URLS} cap — truncating.`);
    urls = urls.slice(0, MAX_URLS);
  }

  console.log(`${urls.length} URL(s) to submit${pathFilter ? ` under ${pathFilter}` : ""}:`);
  urls.forEach((u) => console.log("  ", u));

  if (dryRun) {
    console.log("\n--dry-run: nothing submitted.");
    return;
  }

  // Verify our own key file first: a 403 from IndexNow is otherwise opaque.
  const keyUrl = `${SITE_URL}/${KEY}.txt`;
  const keyRes = await fetch(keyUrl);
  const keyBody = keyRes.ok ? (await keyRes.text()).trim() : "";
  if (keyBody !== KEY) {
    throw new Error(
      `key file check failed at ${keyUrl} (status ${keyRes.status}). ` +
        `It must return exactly "${KEY}". Deploy before submitting.`
    );
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: KEY,
      keyLocation: keyUrl,
      urlList: urls,
    }),
  });

  // 200 = accepted, 202 = accepted but key still validating. Both are success.
  if (res.status === 200 || res.status === 202) {
    console.log(`\n✓ Submitted ${urls.length} URL(s) — IndexNow returned ${res.status}.`);
  } else {
    throw new Error(`IndexNow returned ${res.status}: ${await res.text()}`);
  }
}

main().catch((err) => {
  console.error(`\n✗ ${err.message}`);
  process.exit(1);
});
