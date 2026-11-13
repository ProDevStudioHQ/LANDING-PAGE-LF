// Digital Studio LF — Visitor Tracker
// Sends anonymous session data to the CRM. Identifies on form submit.

const CRM_LEADS_URL = process.env.NEXT_PUBLIC_CRM_API_URL || "";
// Derive base from the leads URL (".../api/public/leads" -> ".../api/public/track")
const TRACK_BASE = CRM_LEADS_URL.replace(/\/leads\/?$/, "/track");

// Run non-critical work off the interaction path so taps/clicks stay snappy.
function scheduleIdle(cb: () => void): void {
    const ric = (window as unknown as {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void;
    }).requestIdleCallback;
    if (ric) ric(cb, { timeout: 2000 });
    else setTimeout(cb, 0);
}

interface TrackerState {
    visitorId: string | null;
    sessionId: string | null;
    clickToken: string | null;
    sessionStart: number;
    lastScrollMilestone: number;
    started: boolean;
}

const state: TrackerState = {
    visitorId: null,
    sessionId: null,
    clickToken: null,
    sessionStart: Date.now(),
    lastScrollMilestone: 0,
    started: false,
};

function safeLocalGet(key: string): string | null {
    try { return localStorage.getItem(key); } catch { return null; }
}
function safeLocalSet(key: string, value: string): void {
    try { localStorage.setItem(key, value); } catch {}
}

/* ── Fingerprint ── */
function getFingerprint(): string {
    const existing = safeLocalGet("dsf_fp");
    if (existing) return existing;
    const raw = [
        navigator.userAgent,
        navigator.language,
        `${screen.width}x${screen.height}`,
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        new Date().getTimezoneOffset(),
    ].join("|");
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
        hash = (hash << 5) - hash + raw.charCodeAt(i);
        hash |= 0;
    }
    const fp = "fp_" + Math.abs(hash).toString(36);
    safeLocalSet("dsf_fp", fp);
    return fp;
}

/* ── Device parsing ── */
function getDeviceInfo() {
    const ua = navigator.userAgent;
    const isTablet = /iPad|Tablet/i.test(ua);
    const isMobile = !isTablet && /iPhone|Android|Mobile/i.test(ua);

    let browser = "Unknown";
    let browserVersion = "";
    let os = "Unknown";

    const chromeMatch = ua.match(/Chrome\/([\d.]+)/);
    const firefoxMatch = ua.match(/Firefox\/([\d.]+)/);
    const safariMatch = ua.match(/Version\/([\d.]+).*Safari/);
    const edgeMatch = ua.match(/Edg\/([\d.]+)/);

    if (edgeMatch) { browser = "Edge"; browserVersion = edgeMatch[1]; }
    else if (chromeMatch) { browser = "Chrome"; browserVersion = chromeMatch[1]; }
    else if (firefoxMatch) { browser = "Firefox"; browserVersion = firefoxMatch[1]; }
    else if (safariMatch) { browser = "Safari"; browserVersion = safariMatch[1]; }

    if (/Windows/.test(ua)) os = "Windows";
    else if (/Mac OS/.test(ua)) os = "macOS";
    else if (/iPhone|iPad/.test(ua)) os = "iOS";
    else if (/Android/.test(ua)) os = "Android";
    else if (/Linux/.test(ua)) os = "Linux";

    return {
        deviceType: isTablet ? "tablet" : isMobile ? "mobile" : "desktop",
        browser,
        browserVersion: browserVersion.split(".")[0],
        os,
        screenWidth: screen.width,
        screenHeight: screen.height,
        language: navigator.language,
    };
}

/* ── IP-based location ──
   Resolved server-side by the CRM /track/session endpoint from the request IP.
   We no longer call ipapi.co from the browser: it added a blocking third-party
   request and an extra external domain on every session. Timezone still comes
   from the browser (no network needed). */
function getLocation() {
    try {
        return { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone };
    } catch {
        return {};
    }
}

/* ── Email click token ──
   The CRM adds dslf_c (a random token, no personal data) to links in its
   emails. Read once, sent only to the CRM with the session, and removed from
   the address bar at once so it never reaches Google Analytics, a shared link
   or a bookmark. */
function takeClickToken(): void {
    try {
        const url = new URL(window.location.href);
        const t = url.searchParams.get("dslf_c");
        if (!t) return;
        if (/^[A-Za-z0-9_-]{16,40}$/.test(t)) state.clickToken = t;
        url.searchParams.delete("dslf_c");
        window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    } catch {}
}

/* ── UTM ── */
function getUTM() {
    const p = new URLSearchParams(window.location.search);
    return {
        utmSource: p.get("utm_source") || undefined,
        utmMedium: p.get("utm_medium") || undefined,
        utmCampaign: p.get("utm_campaign") || undefined,
        utmContent: p.get("utm_content") || undefined,
        utmTerm: p.get("utm_term") || undefined,
    };
}

/* ── Start session ── */
async function startSession() {
    if (!TRACK_BASE) return;
    const fingerprint = getFingerprint();
    const device = getDeviceInfo();
    const location = getLocation();
    const utm = getUTM();

    try {
        const res = await fetch(`${TRACK_BASE}/session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fingerprint,
                ...device,
                ...location,
                ...utm,
                clickToken: state.clickToken || undefined,
                referrer: document.referrer || undefined,
                entryPage: window.location.pathname,
            }),
        });
        if (res.ok) {
            const data = await res.json();
            state.visitorId = data.visitorId;
            state.sessionId = data.sessionId;
            safeLocalSet("dsf_vid", data.visitorId);
        }
    } catch {}
}

/* ── GA4 events (SOP Phase 3) ──
   Only once gtag is ready (Analytics.tsx exposes it). Mark scroll_depth,
   section_view and cta_click as key events / custom dimensions in GA4 Admin,
   and switch OFF Enhanced Measurement "Scrolls" there, or the 90% event is
   counted twice. No personal data in any parameter. */
function ga(name: string, params: Record<string, string | number>): void {
    try {
        const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
        if (typeof g === "function") g("event", name, params);
    } catch {}
}

const CTA_HREF = /wa\.me|whatsapp|^tel:|^mailto:|calendly|cal\.com|\/(contact|book|booking|audit|devis|quote|reserv|rendez)/i;

/* ── Send event ── */
function sendEvent(type: string, data?: Record<string, unknown>) {
    if (!state.visitorId || !state.sessionId || !TRACK_BASE) return;
    try {
        fetch(`${TRACK_BASE}/event`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                visitorId: state.visitorId,
                sessionId: state.sessionId,
                type,
                data,
            }),
            keepalive: true,
        }).catch(() => {});
    } catch {}
}

/* ── Scroll depth ── */
// rAF-throttled so the layout read (scrollHeight) happens at most once per
// frame inside the animation callback — never synchronously in the scroll
// handler, which would force a reflow on every scroll event.
let scrollTicking = false;
function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
        scrollTicking = false;
        const scrolled = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (total <= 0) return;
        const depth = Math.round((scrolled / total) * 100);
        const milestones = [25, 50, 75, 90, 100];
        for (const m of milestones) {
            if (depth >= m && state.lastScrollMilestone < m) {
                state.lastScrollMilestone = m;
                sendEvent("scroll", { depth: m, page: window.location.pathname });
                if (m <= 90) ga("scroll_depth", { percent_scrolled: m });
            }
        }
    });
}

/* ── Section visibility ──
   Name: data-section="pricing" first, then the id, then data-track. Each
   section fires once per page view when half of it is on screen. */
const SECTION_SELECTOR = "[data-section], section[id], div[data-track]";
let sectionObserver: IntersectionObserver | null = null;
function sectionName(el: Element | null): string {
    if (!el) return "";
    return el.getAttribute("data-section") || (el as HTMLElement).id || el.getAttribute("data-track") || "";
}
function trackSections() {
    sectionObserver?.disconnect();
    const seen = new Set<string>();
    const sections = document.querySelectorAll(SECTION_SELECTOR);
    if (!sections.length) return;
    sectionObserver = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                const id = sectionName(entry.target);
                if (!id || seen.has(id)) continue;
                seen.add(id);
                sendEvent("page_view", { section: id, page: window.location.pathname });
                ga("section_view", { section: id });
            }
        },
        { threshold: 0.5 },
    );
    sections.forEach((s) => sectionObserver!.observe(s));
}

/* ── Clicks ── */
function onClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target?.closest) return;
    const btn = target.closest("button, a, [role='button']") as HTMLElement | null;
    if (!btn) return;
    // Capture the cheap refs synchronously (the node may be gone after navigation),
    // but defer the analytics send off the interaction path so the tap feels instant.
    const cta = btn.closest("[data-cta]")?.getAttribute("data-cta") || undefined;
    const payload = {
        text: btn.textContent?.trim().slice(0, 100) || "",
        href: (btn as HTMLAnchorElement).href || undefined,
        section: sectionName(btn.closest(SECTION_SELECTOR)) || undefined,
        cta,
        page: window.location.pathname,
    };
    scheduleIdle(() => {
        sendEvent("click", payload);
        const href = payload.href || "";
        if (cta || CTA_HREF.test(href)) ga("cta_click", { cta: cta || `${payload.section || "page"}:${payload.text.slice(0, 40)}` });
        if (/wa\.me|whatsapp/i.test(href)) ga("whatsapp_click", { section: payload.section || "" });
        else if (/^tel:/i.test(href)) ga("call_click", { section: payload.section || "" });
    });
}

/* ── Hover on key sections ── */
function trackHover() {
    const keyElements = document.querySelectorAll(
        "#pricing, #services, #portfolio, [data-track]",
    );
    keyElements.forEach((el) => {
        let hoverStart = 0;
        el.addEventListener("mouseenter", () => { hoverStart = Date.now(); });
        el.addEventListener("mouseleave", () => {
            if (!hoverStart) return;
            const duration = Math.round((Date.now() - hoverStart) / 1000);
            hoverStart = 0;
            if (duration >= 3) {
                sendEvent("hover", {
                    section: (el as HTMLElement).id || el.getAttribute("data-track"),
                    duration,
                });
            }
        });
    });
}

/* ── Exit ── */
function onPageHide() {
    if (!state.visitorId || !state.sessionId || !TRACK_BASE) return;
    const duration = Math.round((Date.now() - state.sessionStart) / 1000);
    const payload = JSON.stringify({
        visitorId: state.visitorId,
        sessionId: state.sessionId,
        type: "exit",
        data: {
            duration,
            page: window.location.pathname,
            scrollDepth: state.lastScrollMilestone,
        },
    });
    try {
        navigator.sendBeacon?.(
            `${TRACK_BASE}/event`,
            new Blob([payload], { type: "application/json" }),
        );
    } catch {}
}

/* ── Client-side navigation ──
   The App Router changes pages without a reload: start the scroll milestones
   and section tracking again for the new page (Tracker.tsx calls this). */
let lastPath = "";
export function onRouteChange(pathname: string): void {
    if (typeof window === "undefined" || !state.started) return;
    if (!lastPath) { lastPath = pathname; return; }
    if (pathname === lastPath) return;
    lastPath = pathname;
    state.lastScrollMilestone = 0;
    sendEvent("page_view", { page: pathname });
    setTimeout(trackSections, 500);
}

/* ── Public: identify ── */
export async function identifyVisitor(email: string): Promise<void> {
    const visitorId = state.visitorId || safeLocalGet("dsf_vid");
    if (!visitorId || !email || !TRACK_BASE) return;
    try {
        await fetch(`${TRACK_BASE}/identify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ visitorId, email }),
        });
        sendEvent("form_submit", { email });
    } catch {}
}

/* ── Init ── */
export function initTracker(): void {
    if (typeof window === "undefined" || state.started) return;
    state.started = true;
    takeClickToken();

    // Register lightweight listeners immediately (no network calls)
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, { passive: true });
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("beforeunload", onPageHide);

    setTimeout(() => {
        trackSections();
        trackHover();
    }, 500);

    // Defer the session POST until idle so it stays off the critical path
    const schedule = (cb: () => void) => {
        if ("requestIdleCallback" in window) {
            (window as unknown as { requestIdleCallback: (cb: () => void, o: { timeout: number }) => void })
                .requestIdleCallback(cb, { timeout: 4000 });
        } else {
            setTimeout(cb, 200);
        }
    };

    schedule(async () => {
        await startSession();
        sendEvent("page_view", { section: "hero", page: window.location.pathname });
    });
}
