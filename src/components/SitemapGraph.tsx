"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { siteTree, type SiteNode } from "@/lib/sitemap-tree";

// ---- Layout constants ---------------------------------------------------
const COL_GAP = 250; // horizontal distance between depth levels
const ROW_GAP = 46; // vertical distance between sibling leaves
const NODE_W = 200;
const NODE_H = 34;
const PAD = 60; // canvas padding around the laid-out tree

const MIN_SCALE = 0.25;
const MAX_SCALE = 2.5;

type Positioned = {
  node: SiteNode;
  x: number;
  y: number;
  depth: number;
};

type Edge = { x1: number; y1: number; x2: number; y2: number };

// Tidy left-to-right tree layout: leaves stack vertically, parents centre on
// their children. Computed once (the tree is static).
function layoutTree(root: SiteNode) {
  const nodes: Positioned[] = [];
  const edges: Edge[] = [];
  let leafCursor = 0;

  function walk(node: SiteNode, depth: number): number {
    const x = depth * COL_GAP;
    let y: number;
    if (node.children && node.children.length) {
      const childY = node.children.map((c) => walk(c, depth + 1));
      y = (childY[0] + childY[childY.length - 1]) / 2;
      // edges from this node to each child
      const childPos = nodes.filter((p) => node.children!.includes(p.node));
      for (const cp of childPos) {
        edges.push({ x1: x + NODE_W, y1: y, x2: cp.x, y2: cp.y });
      }
    } else {
      y = leafCursor * ROW_GAP;
      leafCursor++;
    }
    nodes.push({ node, x, y, depth });
    return y;
  }

  walk(root, 0);

  const maxX = Math.max(...nodes.map((n) => n.x)) + NODE_W;
  const maxY = Math.max(...nodes.map((n) => n.y)) + NODE_H;
  return { nodes, edges, width: maxX + PAD * 2, height: maxY + PAD * 2 };
}

// Group → colour. Kept in sync with SiteNode["group"].
const GROUP_STYLES: Record<SiteNode["group"], { fill: string; stroke: string; text: string }> = {
  root: { fill: "#f59e0b", stroke: "#fbbf24", text: "#1a1205" },
  services: { fill: "#1e3a8a", stroke: "#3b82f6", text: "#dbeafe" },
  service: { fill: "#0c1f3f", stroke: "#2563eb", text: "#bfdbfe" },
  core: { fill: "#134e4a", stroke: "#14b8a6", text: "#ccfbf1" },
  content: { fill: "#14532d", stroke: "#22c55e", text: "#dcfce7" },
  local: { fill: "#581c87", stroke: "#a855f7", text: "#f3e8ff" },
  french: { fill: "#7c2d12", stroke: "#fb923c", text: "#ffedd5" },
  legal: { fill: "#27272a", stroke: "#71717a", text: "#e4e4e7" },
};

const LEGEND: { label: string; group: SiteNode["group"] }[] = [
  { label: "Home", group: "root" },
  { label: "Services", group: "services" },
  { label: "Company", group: "core" },
  { label: "Content", group: "content" },
  { label: "Local & Niche", group: "local" },
  { label: "Français", group: "french" },
  { label: "Legal", group: "legal" },
];

export default function SitemapGraph() {
  const { nodes, edges, width, height } = useMemo(() => layoutTree(siteTree), []);

  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ scale: 0.7, tx: 0, ty: 0 });
  const drag = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  // Fit the whole tree into the viewport on mount and on resize.
  const fitToView = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { clientWidth: cw, clientHeight: ch } = el;
    const scale = Math.min(cw / width, ch / height, MAX_SCALE);
    setView({
      scale,
      tx: (cw - width * scale) / 2,
      ty: (ch - height * scale) / 2,
    });
  }, [width, height]);

  useEffect(() => {
    fitToView();
    window.addEventListener("resize", fitToView);
    return () => window.removeEventListener("resize", fitToView);
  }, [fitToView]);

  const clamp = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));

  // Zoom around a focal point (keeps the point under the cursor/centre fixed).
  const zoomAround = useCallback((factor: number, fx?: number, fy?: number) => {
    setView((v) => {
      const el = containerRef.current;
      const px = fx ?? (el ? el.clientWidth / 2 : 0);
      const py = fy ?? (el ? el.clientHeight / 2 : 0);
      const next = clamp(v.scale * factor);
      const k = next / v.scale;
      return {
        scale: next,
        tx: px - (px - v.tx) * k,
        ty: py - (py - v.ty) * k,
      };
    });
  }, []);

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      zoomAround(e.deltaY < 0 ? 1.12 : 1 / 1.12, e.clientX - rect.left, e.clientY - rect.top);
    },
    [zoomAround]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setView((v) => ({
      ...v,
      tx: drag.current!.tx + (e.clientX - drag.current!.x),
      ty: drag.current!.ty + (e.clientY - drag.current!.y),
    }));
  };
  const onPointerUp = () => {
    drag.current = null;
    setDragging(false);
  };

  const btn =
    "flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-black/60 text-lg font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10 active:scale-95";

  return (
    <div className="relative h-[78vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,#0c1424,transparent_60%),radial-gradient(circle_at_80%_80%,#150c24,transparent_55%),#05070d]">
      {/* Zoom controls */}
      <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
        <button type="button" aria-label="Zoom in" className={btn} onClick={() => zoomAround(1.25)}>
          +
        </button>
        <button type="button" aria-label="Zoom out" className={btn} onClick={() => zoomAround(1 / 1.25)}>
          −
        </button>
        <button
          type="button"
          aria-label="Reset view"
          className={btn + " text-sm"}
          onClick={fitToView}
          title="Fit to screen"
        >
          ⤢
        </button>
      </div>

      {/* Legend */}
      <div className="absolute left-4 top-4 z-10 flex max-w-[60%] flex-wrap gap-x-3 gap-y-1.5 rounded-xl border border-white/10 bg-black/50 px-3 py-2 backdrop-blur">
        {LEGEND.map((l) => (
          <span key={l.group} className="flex items-center gap-1.5 text-[11px] text-white/70">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: GROUP_STYLES[l.group].stroke }}
            />
            {l.label}
          </span>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 text-[11px] text-white/35">
        Drag to pan · scroll to zoom · click a node to open the page
      </div>

      <div
        ref={containerRef}
        className="h-full w-full"
        style={{ cursor: dragging ? "grabbing" : "grab", touchAction: "none" }}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <svg width="100%" height="100%">
          <g transform={`translate(${view.tx},${view.ty}) scale(${view.scale})`}>
            <g transform={`translate(${PAD},${PAD})`}>
              {/* Edges */}
              {edges.map((e, i) => {
                const mx = (e.x1 + e.x2) / 2;
                return (
                  <path
                    key={i}
                    d={`M${e.x1},${e.y1 + NODE_H / 2} C${mx},${e.y1 + NODE_H / 2} ${mx},${e.y2 + NODE_H / 2} ${e.x2},${e.y2 + NODE_H / 2}`}
                    fill="none"
                    stroke="#ffffff"
                    strokeOpacity={0.14}
                    strokeWidth={1.5}
                  />
                );
              })}

              {/* Nodes */}
              {nodes.map((p) => {
                const s = GROUP_STYLES[p.node.group];
                const content = (
                  <g>
                    <rect
                      width={NODE_W}
                      height={NODE_H}
                      rx={9}
                      fill={s.fill}
                      stroke={s.stroke}
                      strokeWidth={1.5}
                    />
                    <text
                      x={NODE_W / 2}
                      y={NODE_H / 2}
                      dominantBaseline="central"
                      textAnchor="middle"
                      fontSize={13}
                      fontWeight={p.depth === 0 ? 700 : 500}
                      fill={s.text}
                    >
                      {p.node.label.length > 24 ? p.node.label.slice(0, 23) + "…" : p.node.label}
                    </text>
                  </g>
                );
                return (
                  <g
                    key={p.node.id}
                    transform={`translate(${p.x},${p.y})`}
                    className="sitemap-node"
                    style={{ cursor: p.node.href ? "pointer" : "default" }}
                  >
                    {p.node.href ? (
                      <Link href={p.node.href} aria-label={p.node.label}>
                        {content}
                      </Link>
                    ) : (
                      content
                    )}
                  </g>
                );
              })}
            </g>
          </g>
        </svg>
      </div>

      <style>{`
        .sitemap-node rect { transition: filter .15s ease, transform .15s ease; }
        .sitemap-node:hover rect { filter: brightness(1.25) drop-shadow(0 0 6px rgba(255,255,255,.25)); }
      `}</style>
    </div>
  );
}
