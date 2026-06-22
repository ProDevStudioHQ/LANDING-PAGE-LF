"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

const SITE_URL = "https://digitalstudiolf.online";

// Lightweight social share row for articles. Encourages off-page shares/links.
// Uses the native share sheet on mobile when available, with explicit network
// links as the desktop fallback.
export default function ShareButtons({ title, label = "Share this article" }: { title?: string; label?: string }) {
  const pathname = usePathname();
  const url = `${SITE_URL}${pathname}`;
  const text = title || "Digital Studio LF";
  const [copied, setCopied] = useState(false);

  const enc = encodeURIComponent;
  const links = [
    { label: "X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(text)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${enc(`${text} ${url}`)}` },
  ];

  const canNativeShare = () =>
    typeof navigator !== "undefined" && "share" in navigator && typeof navigator.share === "function";

  const nativeShare = async () => {
    if (canNativeShare()) {
      try {
        await navigator.share({ title: text, url });
      } catch {
        /* user cancelled */
      }
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <p className="text-sm font-semibold text-white/70 mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            title={`Share on ${l.label}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              // Prefer the native share sheet where available (mobile).
              if (canNativeShare()) {
                e.preventDefault();
                nativeShare();
              }
            }}
            className="px-4 py-2 rounded-full border border-white/10 text-sm text-white/70 hover:border-primary/30 hover:text-primary transition-colors"
          >
            {l.label}
          </a>
        ))}
        <button
          type="button"
          onClick={copy}
          className="px-4 py-2 rounded-full border border-white/10 text-sm text-white/70 hover:border-primary/30 hover:text-primary transition-colors"
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
