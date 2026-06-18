// Digital Studio LF — Visitor Tracker
// Sends anonymous session data to the CRM. Identifies on form submit.

const CRM_LEADS_URL = process.env.NEXT_PUBLIC_CRM_API_URL || "";
// Derive base from the leads URL (".../api/public/leads" -> ".../api/public/track")
const TRACK_BASE = CRM_LEADS_URL.replace(/\/leads\/?$/, "/track");

interface TrackerState {
    visitorId: string | null;
    sessionId: string | null;
    sessionStart: number;
    lastScrollMilestone: number;
    started: boolean;
}

const state: TrackerState = {
    visitorId: null,
    sessionId: null,
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

/* ── IP-based location (best effort) ── */
async function getLocation() {
    try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 3000);
        const res = await fetch("https://ipapi.co/json/", { signal: ctrl.signal });
        clearTimeout(timer);
        if (!res.ok) return {};
        const data = await res.json();
        return {
            country: data.country_name,
            countryCode: data.country_code,
            city: data.city,
            region: data.region,
            timezone: data.timezone,
        };
    } catch {
        return {};
    }
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
    const location = await getLocation();
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
function onScroll() {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total <= 0) return;
    const depth = Math.round((scrolled / total) * 100);
    const milestones = [25, 50, 75, 90, 100];
    for (const m of milestones) {
        if (depth >= m && state.lastScrollMilestone < m) {
            state.lastScrollMilestone = m;
            sendEvent("scroll", { depth: m, page: window.location.pathname });
        }
    }
}

/* ── Section visibility ── */
function trackSections() {
    const seen = new Set<string>();
    const sections = document.querySelectorAll("section[id], div[data-track]");
    if (!sections.length) return;
    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                const el = entry.target as HTMLElement;
                const id = el.id || el.getAttribute("data-track") || "";
                if (!id || seen.has(id)) continue;
                seen.add(id);
                sendEvent("page_view", { section: id, page: window.location.pathname });
            }
        },
        { threshold: 0.5 },
    );
    sections.forEach((s) => observer.observe(s));
}

/* ── Clicks ── */
function onClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target?.closest) return;
    const btn = target.closest("button, a, [role='button']") as HTMLElement | null;
    if (!btn) return;
    sendEvent("click", {
        text: btn.textContent?.trim().slice(0, 100) || "",
        href: (btn as HTMLAnchorElement).href || undefined,
        section: btn.closest("section[id], div[data-track]")?.id || undefined,
        page: window.location.pathname,
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
export async function initTracker(): Promise<void> {
    if (typeof window === "undefined" || state.started) return;
    state.started = true;

    await startSession();

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("beforeunload", onPageHide);

    // Wait a tick so sections are mounted
    setTimeout(() => {
        trackSections();
        trackHover();
    }, 500);

    sendEvent("page_view", { section: "hero", page: window.location.pathname });
}
