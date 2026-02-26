"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  BookOpen,
  LayoutGrid,
  Receipt,
  Link,
  Shield,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    iconBg: "#F2F2ED",
    iconColor: "#1A1A1A",
    title: "General Ledger",
    description: "The foundation. Multi-entity, multi-currency, append-only and immutable.",
    accent: true,
  },
  {
    icon: LayoutGrid,
    iconBg: "#E3F2FD",
    iconColor: "#3B82F6",
    title: "Universal Pivot",
    description: "Slice any financial data by any dimension in under 200ms.",
    badge: "< 200ms",
  },
  {
    icon: Receipt,
    iconBg: "#FFF3E0",
    iconColor: "#F59E0B",
    title: "Bills & Invoices",
    description: "AI extracts data from documents and pre-fills entries automatically.",
  },
  {
    icon: Link,
    iconBg: "#FCE4EC",
    iconColor: "#EC4899",
    title: "Bank Reconciliation",
    description: "Connect your bank. AI matches entries. What took days now takes minutes.",
  },
  {
    icon: Shield,
    iconBg: "#E8EAF6",
    iconColor: "#7C3AED",
    title: "GST & TDS",
    description: "Returns computed automatically from posted transactions. Compliance built-in.",
  },
  {
    icon: BarChart3,
    iconBg: "#E0F7FA",
    iconColor: "#06B6D4",
    title: "Reporting",
    description: "Trial Balance in 50ms. P&L by any dimension. Drill down in one click.",
    badge: "50+ reports",
  },
];

export default function Platform() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="platform"
      className="bg-white py-32 lg:py-40 border-t border-b border-[#E5E5E0]"
      ref={sectionRef}
    >
      <div className="container-content px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16"
        >
          <p className="eyebrow text-[#1A1A1A] mb-4">THE PLATFORM</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] text-[#1A1A1A] leading-[1.1] mb-6">
            What accounting software
            <br />
            <span className="text-gradient-purple">should have been.</span>
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-xl">
            A complete platform designed around how accountants actually work.
            Every screen keyboard-driven. Every query instant.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative p-8 rounded-2xl transition-all duration-300 ${
                feature.accent
                  ? "bg-[#0A0A0A] text-white shadow-xl"
                  : "card"
              }`}
            >
              {/* Badge */}
              {feature.badge && (
                <span className={`absolute top-6 right-6 text-xs font-mono px-3 py-1.5 rounded-lg ${
                  feature.accent
                    ? "bg-white/10 text-white/60"
                    : "bg-[#F2F2ED] text-[#6B6B6B]"
                }`}>
                  {feature.badge}
                </span>
              )}

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{
                  backgroundColor: feature.accent ? "rgba(255, 255, 255, 0.1)" : feature.iconBg
                }}
              >
                <feature.icon
                  className="w-7 h-7"
                  style={{ color: feature.accent ? "#FFFFFF" : feature.iconColor }}
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <h3 className={`text-xl font-semibold mb-3 ${
                feature.accent ? "text-white" : "text-[#1A1A1A]"
              }`}>
                {feature.title}
              </h3>

              {/* Description */}
              <p className={`leading-relaxed ${
                feature.accent ? "text-white/60" : "text-[#6B6B6B]"
              }`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
