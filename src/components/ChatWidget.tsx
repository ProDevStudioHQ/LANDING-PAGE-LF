"use client";

import { useEffect, useRef, useState } from "react";

/* Landing chatbot widget. Loads config from the CRM (via same-origin proxy);
 * if enabled, shows a launcher + chat panel. Answers come from the CRM KB /
 * grounded AI; unknown questions hand off. Messages post to /api/chat. */

interface Config {
  enabled: boolean;
  greeting?: string;
  handoff?: { type?: string; value?: string; label?: string } | null;
  lead_capture?: boolean;
}
interface Msg { role: "user" | "bot"; text: string; handoff?: Config["handoff"] }

function handoffHref(h: Config["handoff"]): string | null {
  if (!h?.value) return null;
  if (h.type === "whatsapp") return `https://wa.me/${h.value.replace(/[^\d]/g, "")}`;
  if (h.type === "email") return `mailto:${h.value}`;
  return h.value;
}

export default function ChatWidget() {
  const [cfg, setCfg] = useState<Config | null>(null);
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const sessionRef = useRef<string>(Math.random().toString(36).slice(2));
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/chat/config").then(r => r.json()).then(d => setCfg(d.config || null)).catch(() => {});
  }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);
  useEffect(() => {
    if (open && cfg?.greeting && msgs.length === 0) setMsgs([{ role: "bot", text: cfg.greeting }]);
  }, [open, cfg, msgs.length]);

  if (!cfg?.enabled) return null;

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput(""); setBusy(true);
    const next = [...msgs, { role: "user" as const, text }];
    setMsgs(next);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, session: sessionRef.current, transcript: next.slice(-10) }),
      });
      const data = await res.json();
      setMsgs(m => [...m, { role: "bot", text: data.reply || "…", handoff: data.handoff }]);
    } catch {
      setMsgs(m => [...m, { role: "bot", text: "Sorry, something went wrong." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform"
      >
        <span className="text-2xl">{open ? "✕" : "💬"}</span>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[92vw] max-w-sm rounded-2xl border border-white/10 bg-[#0e0608] shadow-2xl flex flex-col overflow-hidden" style={{ height: "70vh", maxHeight: 560 }}>
          <div className="px-4 py-3 border-b border-white/10 bg-white/5">
            <p className="font-bold text-white text-sm">Chat with us</p>
            <p className="text-[11px] text-white/40">Typically replies instantly</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-sm ${m.role === "user" ? "bg-primary text-white" : "bg-white/10 text-white/90"}`}>
                  {m.text}
                  {m.handoff && handoffHref(m.handoff) && (
                    <a href={handoffHref(m.handoff)!} target="_blank" rel="noopener noreferrer"
                      className="mt-2 block text-xs font-semibold underline text-white">
                      {m.handoff.label || "Contact the team"}
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              aria-label="Type your message"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Type a message…"
              className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
            />
            <button onClick={send} disabled={busy} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold disabled:opacity-60">
              {busy ? "…" : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
