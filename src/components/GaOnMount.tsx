"use client";

import { useEffect, useRef } from "react";
import { gaEvent } from "@/lib/ga";

/** Fires one GA4 event when a server-rendered page mounts (case study, product). */
export default function GaOnMount({ name, params }: { name: string; params: Record<string, unknown> }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    gaEvent(name, params);
    // Fire once per mount; params are static for the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
