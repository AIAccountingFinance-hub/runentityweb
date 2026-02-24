"use client";

import { useEffect, useRef } from "react";

interface StippleShape {
  // center position as fraction of canvas (0-1)
  cx: number;
  cy: number;
  // size as fraction of canvas width
  size: number;
  rotation: number;
  draw: (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    size: number,
    dotSize: number,
    placeDot: (x: number, y: number, density: number) => void
  ) => void;
}

// Seeded random for deterministic output
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Draw an abacus shape using stipple dots
function drawAbacus(
  _ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  dotSize: number,
  placeDot: (x: number, y: number, density: number) => void
) {
  const w = size * 0.8;
  const h = size;
  const left = cx - w / 2;
  const top = cy - h / 2;

  // Frame outline - stippled rectangle
  for (let i = 0; i <= 1; i += 0.008) {
    // top
    placeDot(left + w * i, top, 0.85);
    // bottom
    placeDot(left + w * i, top + h, 0.85);
    // left
    placeDot(left, top + h * i, 0.85);
    // right
    placeDot(left + w, top + h * i, 0.85);
  }

  // Horizontal rods
  const rods = [0.25, 0.45, 0.65, 0.85];
  for (const ry of rods) {
    for (let i = 0; i <= 1; i += 0.012) {
      placeDot(left + w * i, top + h * ry, 0.5);
    }
  }

  // Beads - filled circles of dots
  const beadPositions = [
    // rod 0
    [0.2, 0.35, 0.7],
    // rod 1
    [0.3, 0.5, 0.65, 0.8],
    // rod 2
    [0.15, 0.4],
    // rod 3
    [0.25, 0.55, 0.75],
  ];

  beadPositions.forEach((beads, rodIdx) => {
    const rodY = top + h * rods[rodIdx];
    beads.forEach((bx) => {
      const beadCx = left + w * bx;
      const beadR = size * 0.055;
      // Fill bead with dots
      for (let angle = 0; angle < Math.PI * 2; angle += 0.15) {
        for (let r = 0; r < beadR; r += dotSize * 1.8) {
          placeDot(
            beadCx + Math.cos(angle) * r,
            rodY + Math.sin(angle) * r,
            0.7
          );
        }
      }
    });
  });
}

// Draw a pen/nib shape
function drawPen(
  _ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  dotSize: number,
  placeDot: (x: number, y: number, density: number) => void
) {
  const len = size * 1.2;

  // Pen body - tapered shape, angled
  for (let t = 0; t <= 1; t += 0.003) {
    const x = cx - len / 2 + len * t;
    // Taper: wide in middle, narrow at ends
    const bodyWidth = size * 0.06 * Math.sin(t * Math.PI) * (t < 0.15 ? t / 0.15 : 1);

    // Body edges
    for (let w = -bodyWidth; w <= bodyWidth; w += dotSize * 1.5) {
      const density = 0.4 + 0.5 * (1 - Math.abs(w) / (bodyWidth + 0.01));
      placeDot(x, cy + w, density);
    }
  }

  // Nib at left end - denser, sharper
  for (let t = 0; t <= 0.12; t += 0.002) {
    const x = cx - len / 2 + len * t;
    const nibWidth = size * 0.02 * (t / 0.12);
    for (let w = -nibWidth; w <= nibWidth; w += dotSize * 1.2) {
      placeDot(x, cy + w, 0.9);
    }
  }

  // Ink splash near nib
  const rand = mulberry32(42);
  const splashCx = cx - len / 2 - size * 0.02;
  for (let i = 0; i < 60; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = rand() * size * 0.08;
    placeDot(
      splashCx + Math.cos(angle) * dist,
      cy + Math.sin(angle) * dist,
      0.3 + rand() * 0.5
    );
  }
}

// Draw an old CRT computer
function drawComputer(
  _ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  dotSize: number,
  placeDot: (x: number, y: number, density: number) => void
) {
  const monW = size * 0.85;
  const monH = size * 0.6;
  const monLeft = cx - monW / 2;
  const monTop = cy - size * 0.4;

  // Monitor body - thick outline
  for (let i = 0; i <= 1; i += 0.004) {
    for (let th = 0; th < 3; th++) {
      const offset = th * dotSize * 1.2;
      placeDot(monLeft + monW * i + offset, monTop, 0.8);
      placeDot(monLeft + monW * i + offset, monTop + monH, 0.8);
      placeDot(monLeft, monTop + monH * i + offset, 0.8);
      placeDot(monLeft + monW, monTop + monH * i + offset, 0.8);
    }
  }

  // Screen - inner rectangle with content
  const scrPad = size * 0.08;
  const scrLeft = monLeft + scrPad;
  const scrTop = monTop + scrPad;
  const scrW = monW - scrPad * 2;
  const scrH = monH - scrPad * 2;

  // Screen border
  for (let i = 0; i <= 1; i += 0.006) {
    placeDot(scrLeft + scrW * i, scrTop, 0.6);
    placeDot(scrLeft + scrW * i, scrTop + scrH, 0.6);
    placeDot(scrLeft, scrTop + scrH * i, 0.6);
    placeDot(scrLeft + scrW, scrTop + scrH * i, 0.6);
  }

  // Screen "text" lines — rows of varying-density dots
  const lines = [0.2, 0.35, 0.5, 0.65, 0.8];
  const lineWidths = [0.85, 0.7, 0.9, 0.55, 0.75];
  lines.forEach((ly, idx) => {
    for (let i = 0; i < lineWidths[idx]; i += 0.015) {
      placeDot(scrLeft + scrW * 0.08 + scrW * 0.84 * i, scrTop + scrH * ly, 0.45);
    }
  });

  // Stand
  const standTop = monTop + monH;
  const standW = size * 0.15;
  for (let i = 0; i <= 1; i += 0.01) {
    placeDot(cx - standW / 2 + standW * i, standTop + size * 0.08 * i, 0.7);
    placeDot(cx + standW / 2 - standW * i, standTop + size * 0.08 * i, 0.7);
  }

  // Base
  const baseY = standTop + size * 0.1;
  const baseW = size * 0.5;
  for (let i = 0; i <= 1; i += 0.006) {
    for (let th = 0; th < 2; th++) {
      placeDot(cx - baseW / 2 + baseW * i, baseY + th * dotSize * 1.5, 0.75);
    }
  }

  // Keyboard below
  const kbTop = baseY + size * 0.08;
  const kbW = size * 0.7;
  const kbH = size * 0.12;
  const kbLeft = cx - kbW / 2;

  for (let i = 0; i <= 1; i += 0.005) {
    placeDot(kbLeft + kbW * i, kbTop, 0.65);
    placeDot(kbLeft + kbW * i, kbTop + kbH, 0.65);
    placeDot(kbLeft, kbTop + kbH * i, 0.65);
    placeDot(kbLeft + kbW, kbTop + kbH * i, 0.65);
  }

  // Key rows
  for (let row = 0; row < 3; row++) {
    const ky = kbTop + kbH * (0.25 + row * 0.28);
    for (let i = 0; i < 0.9; i += 0.03) {
      placeDot(kbLeft + kbW * (0.05 + i), ky, 0.35);
    }
  }
}

// Draw a ledger/book
function drawLedger(
  _ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  dotSize: number,
  placeDot: (x: number, y: number, density: number) => void
) {
  const w = size * 0.7;
  const h = size * 0.9;
  const left = cx - w / 2;
  const top = cy - h / 2;

  // Book cover - filled with sparse stipple
  const rand = mulberry32(99);
  for (let i = 0; i < 800; i++) {
    const x = left + rand() * w;
    const y = top + rand() * h;
    placeDot(x, y, 0.15 + rand() * 0.15);
  }

  // Cover outline
  for (let i = 0; i <= 1; i += 0.004) {
    for (let th = 0; th < 2; th++) {
      const offset = th * dotSize * 1.3;
      placeDot(left + w * i + offset, top, 0.85);
      placeDot(left + w * i + offset, top + h, 0.85);
      placeDot(left, top + h * i + offset, 0.85);
      placeDot(left + w, top + h * i + offset, 0.85);
    }
  }

  // Spine - thick left edge
  for (let i = 0; i <= 1; i += 0.004) {
    for (let th = 0; th < 4; th++) {
      placeDot(left + th * dotSize * 1.2, top + h * i, 0.9);
    }
  }

  // Ruled lines
  const lineCount = 8;
  for (let l = 0; l < lineCount; l++) {
    const ly = top + h * (0.12 + (l / lineCount) * 0.78);
    for (let i = 0.12; i < 0.92; i += 0.01) {
      placeDot(left + w * i, ly, 0.35);
    }
  }

  // Vertical column dividers
  const cols = [0.45, 0.7];
  for (const colX of cols) {
    for (let i = 0.1; i < 0.93; i += 0.008) {
      placeDot(left + w * colX, top + h * i, 0.3);
    }
  }
}

// Draw coin stack
function drawCoins(
  _ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  dotSize: number,
  placeDot: (x: number, y: number, density: number) => void
) {
  const coinR = size * 0.3;
  const coinH = size * 0.06;
  const stackCount = 5;

  for (let s = 0; s < stackCount; s++) {
    const coinCy = cy + size * 0.3 - s * coinH * 1.8;

    // Top ellipse of each coin
    for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
      const x = cx + Math.cos(angle) * coinR;
      const y = coinCy + Math.sin(angle) * coinR * 0.35;
      placeDot(x, y, 0.75);
    }

    // Fill top face with sparse dots
    for (let r = 0; r < coinR; r += dotSize * 2.5) {
      for (let angle = 0; angle < Math.PI * 2; angle += 0.2) {
        const x = cx + Math.cos(angle) * r;
        const y = coinCy + Math.sin(angle) * r * 0.35;
        placeDot(x, y, 0.15 + 0.15 * (1 - r / coinR));
      }
    }

    // Side edge (visible part)
    if (s === 0) {
      for (let angle = 0; angle < Math.PI; angle += 0.02) {
        const x = cx + Math.cos(angle) * coinR;
        for (let h = 0; h < coinH; h += dotSize * 1.5) {
          placeDot(x, coinCy + Math.sin(angle) * coinR * 0.35 + h, 0.6);
        }
      }
    }
  }
}

const shapes: StippleShape[] = [
  { cx: 0.08, cy: 0.2, size: 0.14, rotation: -8, draw: drawAbacus },
  { cx: 0.88, cy: 0.12, size: 0.18, rotation: 15, draw: drawPen },
  { cx: 0.06, cy: 0.6, size: 0.13, rotation: 3, draw: drawComputer },
  { cx: 0.92, cy: 0.55, size: 0.12, rotation: -5, draw: drawLedger },
  { cx: 0.15, cy: 0.88, size: 0.1, rotation: 0, draw: drawCoins },
];

export default function StippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const w = rect.width;
    const h = rect.height;
    const baseDotSize = Math.max(1, w * 0.0012);

    // Random for stochastic dot placement
    const rand = mulberry32(12345);

    shapes.forEach((shape) => {
      const cx = shape.cx * w;
      const cy = shape.cy * h;
      const size = shape.size * w;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((shape.rotation * Math.PI) / 180);
      ctx.translate(-cx, -cy);

      const placeDot = (x: number, y: number, density: number) => {
        if (rand() > density) return;
        const jitterX = (rand() - 0.5) * baseDotSize * 1.5;
        const jitterY = (rand() - 0.5) * baseDotSize * 1.5;
        const r = baseDotSize * (0.4 + rand() * 0.6);

        ctx.beginPath();
        ctx.arc(x + jitterX, y + jitterY, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26, 26, 26, ${0.25 + rand() * 0.45})`;
        ctx.fill();
      };

      shape.draw(ctx, cx, cy, size, baseDotSize, placeDot);

      ctx.restore();
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40 hidden sm:block"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}
