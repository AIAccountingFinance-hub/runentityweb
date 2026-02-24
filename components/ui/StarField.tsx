"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  vx: number;
  vy: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface StarFieldProps {
  starCount?: number;
  className?: string;
}

export default function StarField({
  starCount = 100,
  className = "",
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(dpr, dpr);
      }
    };

    const initStars = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        const baseOpacity = Math.random() * 0.5 + 0.1;
        starsRef.current.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          size: Math.random() * 2 + 0.5,
          opacity: baseOpacity,
          baseOpacity,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      ctx.clearRect(0, 0, rect.width, rect.height);
      timeRef.current += 1;

      starsRef.current.forEach((star) => {
        // Update position with slow drift
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around edges
        if (star.x < -10) star.x = rect.width + 10;
        if (star.x > rect.width + 10) star.x = -10;
        if (star.y < -10) star.y = rect.height + 10;
        if (star.y > rect.height + 10) star.y = -10;

        // Twinkle effect
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + star.twinklePhase);
        star.opacity = star.baseOpacity * (0.6 + 0.4 * twinkle);

        // Draw star with glow
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size * 3
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${star.opacity * 0.4})`);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 1.5})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initStars();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [starCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
