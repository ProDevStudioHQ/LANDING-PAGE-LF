"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";

// Load only the domAnimation subset (~14 KB) instead of the full framer-motion
// bundle (~31 KB). Features load asynchronously so they never block first paint.
const loadFeatures = () =>
  import("framer-motion").then((mod) => mod.domAnimation);

export default function MobileMotionGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion={isMobile ? "always" : "user"}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
