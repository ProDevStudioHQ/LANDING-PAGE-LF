"use client";

import { useState } from "react";
import Image from "next/image";

// Renders the article hero cover, but gracefully hides itself if the CRM cover
// image 404s (some media files are missing) instead of showing a broken image.
export default function ArticleCover({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 mb-10 bg-white/5">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 768px"
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
