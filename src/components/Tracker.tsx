"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initTracker, onRouteChange } from "@/lib/tracker";

export function Tracker() {
    const pathname = usePathname();
    useEffect(() => {
        initTracker();
    }, []);
    useEffect(() => {
        onRouteChange(pathname || "/");
    }, [pathname]);
    return null;
}
