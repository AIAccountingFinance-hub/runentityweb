"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Keyboard, Sparkles, Zap, TrendingDown } from "lucide-react";

function CountUpNumber({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const kpis = [
  {
    icon: Keyboard,
    iconBg: "#F2F2ED",
    iconColor: "#1A1A1A",
    title: "Keyboard-first",
    description: "Navigate your entire books without touching the mouse",
    isNumber: false,
  },
  {
    icon: Sparkles,
    iconBg: "#E3F2FD",
    iconColor: "#3B82F6",
    title: "AI-native",
    description: "Intelligence built into every transaction, not bolted on",
    isNumber: false,
  },
  {
    icon: Zap,
    iconBg: "#FFF3E0",
    iconColor: "#F59E0B",
    title: "100x",
    titleSuffix: " faster",
    description: "Than the legacy platforms you're stuck with today",
    countUp: { end: 100, suffix: "x" },
    isNumber: true,
  },
  {
    icon: TrendingDown,
    iconBg: "#FCE4EC",
    iconColor: "#EC4899",
    title: "90%",
    titleSuffix: " less",
    description: "Reduction in manual data entry from day one",
    countUp: { end: 90, suffix: "%" },
    isNumber: true,
  },
];

export default function CredibilityKPIs() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="bg-white py-24 lg:py-32 border-t border-[#E5E5E0]" ref={containerRef}>
      <div className="container-content px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="card p-8"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: kpi.iconBg }}
              >
                <kpi.icon className="w-6 h-6" style={{ color: kpi.iconColor }} strokeWidth={1.5} />
              </div>

              <h3 className="font-mono text-2xl font-bold mb-2">
                {kpi.isNumber && kpi.countUp ? (
                  <>
                    <span className="text-[#1A1A1A]">
                      <CountUpNumber end={kpi.countUp.end} suffix={kpi.countUp.suffix} />
                    </span>
                    <span className="text-[#1A1A1A] font-display text-xl">
                      {kpi.titleSuffix}
                    </span>
                  </>
                ) : (
                  <span className="text-[#1A1A1A] font-display text-xl">{kpi.title}</span>
                )}
              </h3>

              <p className="font-body text-sm text-[#6B6B6B] leading-relaxed">
                {kpi.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
