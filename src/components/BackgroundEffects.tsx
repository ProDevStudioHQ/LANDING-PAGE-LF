// Pure CSS animations — no Framer Motion, no JS rAF loops.
// All @keyframes use only transform + opacity so they run on the
// compositor thread (GPU) and never block the main thread.
export default function BackgroundEffects() {
  return (
    <div className="hidden md:block fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* ── Base gradient ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(120,40,200,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_50%,rgba(239,68,68,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_80%,rgba(59,130,246,0.05),transparent_50%)]" />

      {/* ── Aurora ribbons — CSS-only, transform-only animations ── */}
      <div className="aurora-container absolute inset-0">
        <div className="absolute w-[150vw] h-[60vh] -left-[25vw] top-[-10%] rounded-[50%] opacity-[0.07] aurora-ribbon-1" />
        <div className="absolute w-[120vw] h-[50vh] -left-[10vw] top-[30%] rounded-[50%] opacity-[0.05] aurora-ribbon-2" />
        <div className="absolute w-[130vw] h-[45vh] -left-[15vw] top-[60%] rounded-[50%] opacity-[0.04] aurora-ribbon-3" />
      </div>

      {/* ── Floating orbs — CSS transform-only animations ── */}
      <div className="absolute w-[500px] h-[500px] rounded-full orb-float-1" />
      <div className="absolute w-[400px] h-[400px] rounded-full orb-float-2" />
      <div className="absolute w-[350px] h-[350px] rounded-full orb-float-3" />
      <div className="absolute w-[250px] h-[250px] rounded-full orb-float-4" />

      {/* ── Static grid ── */}
      <div className="absolute inset-0 opacity-[0.025] bg-grid-80" />

      {/* ── Radial spotlight ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(239,68,68,0.06)_0%,transparent_60%)]" />

      {/* ── Vignette ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}
