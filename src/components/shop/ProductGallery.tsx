"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight, HiXMark, HiMagnifyingGlassPlus } from "react-icons/hi2";

type GalleryImage = { src: string; alt: string };

// Etsy-style listing gallery: a vertical thumbnail rail beside the main image
// on desktop, a horizontal rail under it on mobile, arrows + swipe + keyboard
// to move between images, and a fullscreen viewer on click.
export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const touchX = useRef<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  );

  // Keep the active thumbnail visible in the rail.
  useEffect(() => {
    railRef.current
      ?.querySelector<HTMLElement>(`[data-thumb="${index}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [index]);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoomed, go]);

  if (count === 0) return null;
  const current = images[index];

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white text-black shadow-lg flex items-center justify-center hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 min-w-0">
      {/* Thumbnail rail */}
      {count > 1 && (
        <div
          ref={railRef}
          className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[560px] md:w-[76px] flex-shrink-0 pb-1 md:pb-0 md:pr-1"
          role="tablist"
          aria-label="Product images"
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              data-thumb={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show image ${i + 1} of ${count}`}
              onClick={() => setIndex(i)}
              className={`relative flex-shrink-0 w-16 h-16 md:w-[68px] md:h-[68px] rounded-lg overflow-hidden border-2 transition-all ${
                i === index
                  ? "border-white opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="72px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative flex-1 min-w-0">
        <div
          className="group relative aspect-square md:aspect-[4/3.4] rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 cursor-zoom-in"
          onClick={() => setZoomed(true)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 640px"
            className="object-contain gallery-fade"
          />
          <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 text-white/90 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            <HiMagnifyingGlassPlus className="w-3.5 h-3.5" aria-hidden="true" />
            Click to zoom
          </span>
          {count > 1 && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs tabular-nums">
              {index + 1} / {count}
            </span>
          )}
        </div>
        {count > 1 && (
          <>
            <button type="button" aria-label="Previous image" onClick={() => go(-1)} className={`${arrowClass} left-3`}>
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <button type="button" aria-label="Next image" onClick={() => go(1)} className={`${arrowClass} right-3`}>
              <HiChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Fullscreen viewer */}
      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setZoomed(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative w-[92vw] h-[82vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={current.src} alt={current.alt} fill sizes="92vw" className="object-contain" />
          </div>
          <button
            type="button"
            aria-label="Close image viewer"
            onClick={() => setZoomed(false)}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <HiXMark className="w-6 h-6" />
          </button>
          {count > 1 && (
            <>
              <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); go(-1); }} className={`${arrowClass} left-4`}>
                <HiChevronLeft className="w-5 h-5" />
              </button>
              <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); go(1); }} className={`${arrowClass} right-4`}>
                <HiChevronRight className="w-5 h-5" />
              </button>
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-sm tabular-nums">
                {index + 1} / {count}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
