"use client";

import { useEffect } from "react";
import { initTracker } from "@/lib/tracker";

export function Tracker() {
    useEffect(() => {
        initTracker();
    }, []);
    return null;
}
