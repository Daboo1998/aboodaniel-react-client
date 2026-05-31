import React, { useEffect, useRef } from "react";

/**
 * Hero atmosphere — interactive dot grid with accent glow.
 * Ported from the design prototype's hero.js. Lightweight canvas;
 * respects reduced-motion.
 */
const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let dots: Array<{ x: number; y: number; ph: number }> = [];
    let rafId = 0;
    let resizeTimer: number | undefined;
    const GAP = 38;
    const mouse = { x: -9999, y: -9999, has: false };

    const accent = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "oklch(0.6 0.2 256)";
    const baseDot = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--border-2")
        .trim() || "#888";

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({ x: i * GAP, y: j * GAP, ph: Math.random() * Math.PI * 2 });
        }
      }
    };

    let t = 0;
    const frame = () => {
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      const ac = accent();
      const base = baseDot();
      const R = 150;
      for (let k = 0; k < dots.length; k++) {
        const d = dots[k];
        let r = 0.9 + Math.sin(t + d.ph) * 0.35;
        let near = 0;
        if (mouse.has) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < R) near = 1 - dist / R;
        }
        if (near > 0.02) {
          ctx.fillStyle = ac;
          ctx.globalAlpha = 0.25 + near * 0.75;
          r = 0.9 + near * 2.6;
        } else {
          ctx.fillStyle = base;
          ctx.globalAlpha = 0.4;
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduce) rafId = requestAnimationFrame(frame);
    };

    const host = canvas.parentElement;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.has = true;
    };
    const onLeave = () => {
      mouse.has = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };

    if (host) {
      host.addEventListener("mousemove", onMove);
      host.addEventListener("mouseleave", onLeave);
    }
    window.addEventListener("resize", onResize);

    resize();
    if (reduce) frame();
    else rafId = requestAnimationFrame(frame);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      if (host) {
        host.removeEventListener("mousemove", onMove);
        host.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  return (
    <div className="hero-canvas-host">
      <canvas id="hero-canvas" ref={canvasRef} />
    </div>
  );
};

export default HeroCanvas;
