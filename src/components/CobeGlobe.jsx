import { useEffect, useRef } from "react";
import LAND_POINTS from "./landPoints.json";
import { useTheme } from "../context/ThemeContext";

const SIZE = 650;


const CITY_MARKERS = [
  [19.0760, 72.8777], // Mumbai, India
  [28.5355, 77.3910], // Noida, India
  [1.3521, 103.8198], // Singapore
];


export function Globe({ className = "" }) {
  const canvasRef = useRef(null);
  const phiRef    = useRef(0);
  const animRef   = useRef(null);
  const dragRef   = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W  = SIZE;
    const H  = SIZE;
    const R  = W * 0.43;
    const cx = W / 2;
    const cy = H / 2;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // ── Outer atmospheric glow ──────────────────────────────────
      const glow = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.45);
      if (isDark) {
        glow.addColorStop(0,   "rgba(0,170,255,0.22)");
        glow.addColorStop(0.4, "rgba(0,100,255,0.08)");
        glow.addColorStop(1,   "rgba(0,0,0,0)");
      } else {
        glow.addColorStop(0,   "rgba(0,170,255,0.12)");
        glow.addColorStop(0.4, "rgba(0,100,255,0.04)");
        glow.addColorStop(1,   "rgba(0,0,0,0)");
      }
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.45, 0, Math.PI * 2);
      ctx.fill();

      // ── Sphere background ──────────────────────────────────
      const bg = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.25, 0, cx, cy, R);
      if (isDark) {
        bg.addColorStop(0, "#0d1f3c");
        bg.addColorStop(1, "#020612");
      } else {
        bg.addColorStop(0, "#ffffff");
        bg.addColorStop(1, "#e2e8f0");
      }
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // clip subsequent drawing to sphere
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // ── Land dots ───────────────────────────────────────────────
      const phi = phiRef.current;
      for (const [lat, lng] of LAND_POINTS) {
        const adjLng = lng + phi;
        const x3 = Math.cos(lat) * Math.sin(adjLng);
        const y3 = Math.sin(lat);
        const z3 = Math.cos(lat) * Math.cos(adjLng);
        if (z3 < 0) continue;

        const x2 = cx + R * x3;
        const y2 = cy - R * y3;

        const depth = (z3 + 1) / 2;
        const dotR  = 1.5 + depth * 1.2;
        const b     = Math.floor(120 + depth * 135);
        const alpha = 0.4 + depth * 0.6;

        ctx.beginPath();
        ctx.arc(x2, y2, dotR, 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = `rgba(${Math.floor(b * 0.3)},${Math.floor(b * 0.75)},${b},${alpha})`;
        } else {
          // slightly deeper colors for better contrast on white sphere
          ctx.fillStyle = `rgba(${Math.floor(b * 0.1)},${Math.floor(b * 0.55)},${Math.floor(b * 0.9)},${alpha})`;
        }
        ctx.fill();
      }

      ctx.restore();

      // ── Edge glow ring ──────────────────────────────────────────
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? "rgba(0,200,255,0.55)" : "rgba(0,180,255,0.35)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // ── City markers ────────────────────────────────────────────
      for (const [latDeg, lngDeg] of CITY_MARKERS) {
        const lat    = latDeg  * Math.PI / 180;
        const adjLng = lngDeg  * Math.PI / 180 + phi;
        const x3 = Math.cos(lat) * Math.sin(adjLng);
        const y3 = Math.sin(lat);
        const z3 = Math.cos(lat) * Math.cos(adjLng);
        if (z3 < 0.1) continue;

        const x2 = cx + R * x3;
        const y2 = cy - R * y3;

        // outer pulse ring
        ctx.beginPath();
        ctx.arc(x2, y2, 7, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? "rgba(0,220,255,0.7)" : "rgba(0,150,255,0.8)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // bright centre
        ctx.beginPath();
        ctx.arc(x2, y2, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "white" : "#00d2ff";
        ctx.fill();
      }

      // ── Auto-rotate ─────────────────────────────────────────────
      if (!dragRef.current) phiRef.current += 0.007;

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [isDark]);

  return (
    <div className={`relative ${className}`} style={{ width: SIZE, height: SIZE }}>
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        style={{ width: SIZE, height: SIZE, display: "block", cursor: "grab" }}
        onPointerDown={(e) => {
          dragRef.current = e.clientX;
          canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          dragRef.current = null;
          canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => { dragRef.current = null; }}
        onMouseMove={(e) => {
          if (dragRef.current !== null) {
            phiRef.current += (e.clientX - dragRef.current) / 300;
            dragRef.current = e.clientX;
          }
        }}
      />
    </div>
  );
}
