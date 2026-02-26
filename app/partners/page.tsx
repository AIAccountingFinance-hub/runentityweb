"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import AnnouncementBanner from "@/components/sections/AnnouncementBanner";
import Navigation from "@/components/sections/Navigation";
import { EntityMark } from "@/components/entity-mark";
import { useDemoModal } from "@/components/ui/DemoModalProvider";

/* ── Seeded random ── */
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── Large hero stipple art: Two hands shaking (partnership) ── */
function HeroStippleArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dims, setDims] = useState({ w: 500, h: 320 });

  useEffect(() => {
    const update = () => {
      setDims({
        w: window.innerWidth < 640 ? Math.min(window.innerWidth * 0.85, 360) : Math.min(window.innerWidth * 0.5, 500),
        h: window.innerWidth < 640 ? Math.min(window.innerHeight * 0.3, 240) : Math.min(window.innerHeight * 0.4, 320),
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dims.w * dpr;
    canvas.height = dims.h * dpr;
    c.scale(dpr, dpr);
    c.clearRect(0, 0, dims.w, dims.h);

    const rand = mulberry32(42);
    const s = dims.h / 320;
    c.save();
    c.scale(s, s);
    const cx = (dims.w / s) * 0.5;
    const cy = (dims.h / s) * 0.5;

    function stippleLine(x1: number, y1: number, x2: number, y2: number, count: number, opacity: number) {
      for (let i = 0; i < count; i++) {
        const t = rand();
        const px = x1 + (x2 - x1) * t + (rand() - 0.5) * 2;
        const py = y1 + (y2 - y1) * t + (rand() - 0.5) * 2;
        c.beginPath();
        c.arc(px, py, 0.4 + rand() * 0.8, 0, Math.PI * 2);
        c.fillStyle = `rgba(255,255,255,${opacity})`;
        c.fill();
      }
    }

    function stippleEllipse(x: number, y: number, rx: number, ry: number, density: number, opacity: number) {
      const count = Math.floor(rx * ry * density * 0.025);
      for (let i = 0; i < count; i++) {
        const angle = rand() * Math.PI * 2;
        const r = Math.sqrt(rand());
        const px = x + Math.cos(angle) * r * rx + (rand() - 0.5) * 2;
        const py = y + Math.sin(angle) * r * ry + (rand() - 0.5) * 2;
        const size = 0.4 + rand() * 0.9;
        const a = opacity * (0.3 + 0.7 * (1 - r));
        c.beginPath();
        c.arc(px, py, size, 0, Math.PI * 2);
        c.fillStyle = `rgba(255,255,255,${a})`;
        c.fill();
      }
    }

    function stippleRectOutline(x: number, y: number, w: number, h: number, density: number, opacity: number) {
      const perimeter = 2 * (w + h);
      const count = Math.floor(perimeter * density * 0.3);
      for (let i = 0; i < count; i++) {
        let px: number, py: number;
        const pos = rand() * perimeter;
        if (pos < w) { px = x + pos; py = y; }
        else if (pos < w + h) { px = x + w; py = y + (pos - w); }
        else if (pos < 2 * w + h) { px = x + w - (pos - w - h); py = y + h; }
        else { px = x; py = y + h - (pos - 2 * w - h); }
        px += (rand() - 0.5) * 2;
        py += (rand() - 0.5) * 2;
        c.beginPath();
        c.arc(px, py, 0.4 + rand() * 0.7, 0, Math.PI * 2);
        c.fillStyle = `rgba(255,255,255,${opacity * (0.4 + rand() * 0.6)})`;
        c.fill();
      }
    }

    function stippleRect(x: number, y: number, w: number, h: number, density: number, opacity: number) {
      const count = Math.floor(w * h * density * 0.003);
      for (let i = 0; i < count; i++) {
        const px = x + rand() * w;
        const py = y + rand() * h;
        c.beginPath();
        c.arc(px, py, 0.3 + rand() * 0.6, 0, Math.PI * 2);
        c.fillStyle = `rgba(255,255,255,${opacity * (0.4 + rand() * 0.6)})`;
        c.fill();
      }
    }

    /* ── Left hand (reaching right) ── */
    // Forearm
    stippleRectOutline(cx - 160, cy - 15, 80, 30, 3, 0.45);
    stippleRect(cx - 160, cy - 15, 80, 30, 1.5, 0.1);
    // Palm
    stippleEllipse(cx - 70, cy, 25, 20, 4, 0.5);
    // Fingers (reaching right)
    stippleLine(cx - 50, cy - 10, cx - 20, cy - 8, 25, 0.5);
    stippleLine(cx - 48, cy - 3, cx - 18, cy - 2, 25, 0.5);
    stippleLine(cx - 48, cy + 4, cx - 20, cy + 4, 22, 0.5);
    stippleLine(cx - 50, cy + 11, cx - 28, cy + 10, 18, 0.45);
    // Cuff
    stippleRectOutline(cx - 165, cy - 18, 10, 36, 3, 0.5);

    /* ── Right hand (reaching left) ── */
    // Forearm
    stippleRectOutline(cx + 80, cy - 15, 80, 30, 3, 0.45);
    stippleRect(cx + 80, cy - 15, 80, 30, 1.5, 0.1);
    // Palm
    stippleEllipse(cx + 70, cy, 25, 20, 4, 0.5);
    // Fingers (reaching left, interlocking)
    stippleLine(cx + 50, cy - 10, cx + 20, cy - 6, 25, 0.5);
    stippleLine(cx + 48, cy - 3, cx + 18, cy, 25, 0.5);
    stippleLine(cx + 48, cy + 4, cx + 20, cy + 6, 22, 0.5);
    stippleLine(cx + 50, cy + 11, cx + 28, cy + 12, 18, 0.45);
    // Cuff
    stippleRectOutline(cx + 155, cy - 18, 10, 36, 3, 0.5);

    /* ── Handshake overlap area (interlocked fingers) ── */
    stippleEllipse(cx, cy, 18, 16, 5, 0.35);

    /* ── Radiating connection lines (partnership energy) ── */
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const r1 = 45 + rand() * 10;
      const r2 = 65 + rand() * 20;
      stippleLine(
        cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1,
        cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2,
        8, 0.25
      );
    }

    /* ── Small floating elements ── */
    // Document/contract (top left)
    stippleRectOutline(cx - 130, cy - 90, 30, 40, 2, 0.3);
    stippleLine(cx - 125, cy - 80, cx - 105, cy - 80, 8, 0.2);
    stippleLine(cx - 125, cy - 72, cx - 108, cy - 72, 7, 0.2);
    stippleLine(cx - 125, cy - 64, cx - 110, cy - 64, 6, 0.2);

    // Chart (top right)
    stippleLine(cx + 100, cy - 50, cx + 100, cy - 90, 15, 0.3);
    stippleLine(cx + 100, cy - 50, cx + 140, cy - 50, 15, 0.3);
    stippleLine(cx + 108, cy - 50, cx + 108, cy - 62, 8, 0.3);
    stippleLine(cx + 116, cy - 50, cx + 116, cy - 75, 10, 0.3);
    stippleLine(cx + 124, cy - 50, cx + 124, cy - 68, 9, 0.3);
    stippleLine(cx + 132, cy - 50, cx + 132, cy - 82, 12, 0.3);

    // Coins (bottom)
    stippleEllipse(cx - 30, cy + 60, 12, 8, 3, 0.3);
    stippleEllipse(cx - 20, cy + 55, 12, 8, 3, 0.3);
    stippleEllipse(cx - 10, cy + 50, 12, 8, 3, 0.3);

    // Ambient particles
    const scaledW = dims.w / s;
    const scaledH = dims.h / s;
    for (let i = 0; i < 120; i++) {
      const x = rand() * scaledW;
      const y = rand() * scaledH;
      c.beginPath();
      c.arc(x, y, 0.3 + rand() * 0.5, 0, Math.PI * 2);
      c.fillStyle = `rgba(255,255,255,${0.02 + rand() * 0.06})`;
      c.fill();
    }

    c.restore();
  }, [dims]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: dims.w, height: dims.h }}
      className="pointer-events-none"
    />
  );
}

/* ── Stipple icon for benefits ── */
type StippleShape = "lightning" | "chart" | "shield";

function StippleIcon({ shape, size = 72 }: { shape: StippleShape; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const seeds: Record<StippleShape, number> = { lightning: 23, chart: 37, shield: 67 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    c.scale(dpr, dpr);
    c.clearRect(0, 0, size, size);

    const rand = mulberry32(seeds[shape]);
    const cx = size / 2;
    const cy = size / 2;
    const scale = size / 72;

    function stippleLine(x1: number, y1: number, x2: number, y2: number, count: number, opacity: number) {
      for (let i = 0; i < count; i++) {
        const t = rand();
        const px = x1 + (x2 - x1) * t + (rand() - 0.5) * 1.5 * scale;
        const py = y1 + (y2 - y1) * t + (rand() - 0.5) * 1.5 * scale;
        c.beginPath();
        c.arc(px, py, (0.4 + rand() * 0.7) * scale, 0, Math.PI * 2);
        c.fillStyle = `rgba(26,26,26,${opacity})`;
        c.fill();
      }
    }

    function stippleCircle(x: number, y: number, r: number, density: number, opacity: number) {
      const count = Math.floor(r * r * density * 0.08);
      for (let i = 0; i < count; i++) {
        const angle = rand() * Math.PI * 2;
        const dist = Math.sqrt(rand()) * r;
        const px = x + Math.cos(angle) * dist;
        const py = y + Math.sin(angle) * dist;
        c.beginPath();
        c.arc(px, py, (0.3 + rand() * 0.5) * scale, 0, Math.PI * 2);
        c.fillStyle = `rgba(26,26,26,${opacity * (0.3 + 0.7 * (1 - dist / r))})`;
        c.fill();
      }
    }

    const r = 28 * scale;

    switch (shape) {
      case "lightning": {
        // Bold lightning bolt
        const pts: [number, number][] = [
          [cx - 3 * scale, cy - r],
          [cx - 14 * scale, cy + 4 * scale],
          [cx - 2 * scale, cy + 2 * scale],
          [cx + 3 * scale, cy + r],
          [cx + 14 * scale, cy - 4 * scale],
          [cx + 2 * scale, cy - 2 * scale],
        ];
        for (let i = 0; i < pts.length; i++) {
          const next = pts[(i + 1) % pts.length];
          stippleLine(pts[i][0], pts[i][1], next[0], next[1], 25, 0.6);
        }
        stippleCircle(cx, cy, 8 * scale, 3, 0.15);
        break;
      }
      case "chart": {
        // Bar chart with upward trend
        const barW = 10 * scale;
        const gap = 5 * scale;
        const startX = cx - (barW * 3 + gap * 2) / 2;
        const baseY = cy + 16 * scale;
        const heights = [22 * scale, 32 * scale, 26 * scale];
        heights.forEach((h, i) => {
          const bx = startX + i * (barW + gap);
          const by = baseY - h;
          for (let j = 0; j < Math.floor(h * barW * 0.04); j++) {
            const px = bx + rand() * barW;
            const py = by + rand() * h;
            c.beginPath();
            c.arc(px, py, (0.4 + rand() * 0.6) * scale, 0, Math.PI * 2);
            c.fillStyle = `rgba(26,26,26,${0.15 + rand() * 0.25})`;
            c.fill();
          }
          // Outline
          stippleLine(bx, by, bx + barW, by, 12, 0.5);
          stippleLine(bx + barW, by, bx + barW, baseY, 12, 0.5);
          stippleLine(bx, by, bx, baseY, 12, 0.5);
        });
        stippleLine(startX - 6 * scale, baseY, startX + barW * 3 + gap * 2 + 6 * scale, baseY, 35, 0.45);
        // Trend line
        stippleLine(startX + barW * 0.5, cy - 14 * scale, startX + barW * 2.5 + gap * 2, cy - 22 * scale, 20, 0.35);
        break;
      }
      case "shield": {
        // Shield with checkmark
        const pts: [number, number][] = [
          [cx, cy - r],
          [cx + 22 * scale, cy - 16 * scale],
          [cx + 20 * scale, cy + 8 * scale],
          [cx, cy + r],
          [cx - 20 * scale, cy + 8 * scale],
          [cx - 22 * scale, cy - 16 * scale],
        ];
        for (let i = 0; i < pts.length; i++) {
          const next = pts[(i + 1) % pts.length];
          stippleLine(pts[i][0], pts[i][1], next[0], next[1], 22, 0.55);
        }
        // Fill
        stippleCircle(cx, cy, 16 * scale, 2, 0.08);
        // Checkmark
        stippleLine(cx - 9 * scale, cy + 2 * scale, cx - 3 * scale, cy + 9 * scale, 16, 0.55);
        stippleLine(cx - 3 * scale, cy + 9 * scale, cx + 10 * scale, cy - 6 * scale, 20, 0.55);
        break;
      }
    }
  }, [shape, size, seeds]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="pointer-events-none"
    />
  );
}

const benefits: { shape: StippleShape; title: string; description: string }[] = [
  {
    shape: "lightning",
    title: "10x Faster Close",
    description:
      "AI handles categorization, bank matching, and GST prep. Your team reviews and approves \u2014 that\u2019s it.",
  },
  {
    shape: "chart",
    title: "Scale Without Hiring",
    description:
      "Take on more clients without more staff. Let AI handle the volume while your team focuses on advisory.",
  },
  {
    shape: "shield",
    title: "Always Compliant",
    description:
      "GST returns, TDS, reconciliation \u2014 all run automatically. Audit-ready books, every single day.",
  },
];

export default function PartnersPage() {
  const { openModal } = useDemoModal();
  const heroRef = useRef(null);
  const benefitsRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-80px" });

  return (
    <main className="overflow-x-hidden">
      <AnnouncementBanner />
      <Navigation />

      {/* Hero — dark with stipple art */}
      <section
        className="relative bg-[#0A0A0A] overflow-hidden py-8 lg:py-12"
        ref={heroRef}
      >
        <div className="container-content px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          {/* Stipple handshake art */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-2"
          >
            <HeroStippleArt />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-[12px] font-body font-medium uppercase tracking-[3px] text-white/30 mb-4"
          >
            PARTNER PROGRAM
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-white leading-[1.15] tracking-[-0.02em] mb-4"
          >
            Become{" "}
            <span className="text-gradient">AI Accounting Firms</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-[16px] text-white/40 leading-relaxed max-w-[520px] mb-8"
          >
            Partner with Entity. Get AI-powered tools, priority support,
            and a revenue share &mdash; all while delivering better
            outcomes for your clients.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => openModal("partner")}
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-white/25 rounded-xl text-white text-[15px] font-body font-medium hover:bg-white hover:text-[#0A0A0A] transition-all duration-300"
            >
              Become a Partner
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Benefits — light with stipple icons */}
      <section
        className="bg-[#FAFAF8] py-14 lg:py-20 border-t border-[#E5E5E0]"
        ref={benefitsRef}
      >
        <div className="container-content px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-display text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#1A1A1A] text-center leading-[1.15] tracking-[-0.02em] mb-12"
          >
            Why partner with us
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-10 max-w-4xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <StippleIcon shape={benefit.shape} size={72} />
                </div>
                <h3 className="font-display text-[17px] font-semibold text-[#1A1A1A] mb-2">
                  {benefit.title}
                </h3>
                <p className="font-body text-[15px] text-[#6B6B6B] leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] py-8">
        <div className="container-content px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <EntityMark size={24} state="idle" theme="dark" />
            <span className="font-body font-bold text-[15px] text-white tracking-tight">
              Entity
            </span>
          </div>
          <div className="flex items-center gap-6 text-[13px] text-white/35 font-body">
            <a href="/terms" className="hover:text-white/60 transition-colors underline underline-offset-2">
              Terms of Service
            </a>
            <a href="/privacy" className="hover:text-white/60 transition-colors underline underline-offset-2">
              Privacy Policy
            </a>
            <span>&copy; Entity 2026</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
