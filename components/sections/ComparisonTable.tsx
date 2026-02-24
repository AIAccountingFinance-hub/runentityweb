"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";

const comparisonData = [
  {
    feature: "AI-Powered Automation",
    entity: { type: "text", value: "Extraction, cat., matching", check: true },
    tally: { type: "icon", value: false },
    zoho: { type: "text", value: "Basic rules" },
  },
  {
    feature: "Speed",
    entity: { type: "highlight", value: "< 200ms query" },
    tally: { type: "text", value: "5-15s" },
    zoho: { type: "text", value: "3-8s" },
  },
  {
    feature: "Keyboard-First Navigation",
    entity: { type: "icon", value: true },
    tally: { type: "text", value: "Partial" },
    zoho: { type: "icon", value: false },
  },
  {
    feature: "Multi-Entity",
    entity: { type: "text", value: "Unlimited" },
    tally: { type: "text", value: "Separate licenses" },
    zoho: { type: "text", value: "Limited" },
  },
  {
    feature: "GST & TDS Compliance",
    entity: { type: "text", value: "AI-computed, auto-drafted", check: true },
    tally: { type: "text", value: "Rule-based" },
    zoho: { type: "text", value: "Rule-based" },
  },
  {
    feature: "Bank Reconciliation",
    entity: { type: "text", value: "AI matching + fuzzy logic", check: true },
    tally: { type: "text", value: "Manual" },
    zoho: { type: "text", value: "Basic auto-match" },
  },
  {
    feature: "Cloud-Native",
    entity: { type: "icon", value: true },
    tally: { type: "icon", value: false },
    zoho: { type: "icon", value: true },
  },
  {
    feature: "Immutable Audit Trail",
    entity: { type: "text", value: "Append-only ledger", check: true },
    tally: { type: "text", value: "Editable entries" },
    zoho: { type: "text", value: "Partial" },
  },
  {
    feature: "Unlimited Users",
    entity: { type: "text", value: "Every plan", check: true },
    tally: { type: "text", value: "Per-license" },
    zoho: { type: "text", value: "Per-user" },
  },
  {
    feature: "Free Migration",
    entity: { type: "text", value: "From any platform", check: true },
    tally: { type: "text", value: "N/A" },
    zoho: { type: "text", value: "Paid" },
  },
];

function CellContent({
  data,
  index,
  isInView,
}: {
  data: { type: string; value: string | boolean; check?: boolean };
  index: number;
  isInView: boolean;
}) {
  if (data.type === "icon") {
    return data.value ? (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15,
          delay: 0.3 + index * 0.05,
        }}
        className="inline-flex"
      >
        <Check className="w-6 h-6 text-[#10B981]" strokeWidth={3} />
      </motion.div>
    ) : (
      <X className="w-5 h-5 text-[#CCCCCC] mx-auto" />
    );
  }

  if (data.type === "highlight") {
    return (
      <span className="font-mono text-sm text-[#10B981] font-bold">
        {data.value as string}
      </span>
    );
  }

  return (
    <span
      className={`text-sm ${
        data.check ? "text-[#1A1A1A] font-medium" : "text-[#6B6B6B]"
      }`}
    >
      {data.check && (
        <Check className="w-4 h-4 text-[#10B981] inline mr-1.5" strokeWidth={2.5} />
      )}
      {data.value as string}
    </span>
  );
}

export default function ComparisonTable() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="comparison"
      className="bg-[#FAFAF8] py-32 lg:py-40 border-t border-[#E5E5E0]"
      ref={sectionRef}
    >
      <div className="container-content px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] text-[#1A1A1A] mb-6">
            See how we <span className="text-gradient-blue">compare.</span>
          </h2>
          <p className="text-lg text-[#6B6B6B]">
            A side-by-side look at what matters.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-[#F2F2ED]">
                  <th className="text-left py-5 px-6 font-body text-xs uppercase tracking-[0.2em] text-[#999999] font-semibold w-1/4">
                    Feature
                  </th>
                  <th className="py-5 px-6 w-1/4 relative">
                    {/* Green top border for Entity column */}
                    <div className="absolute top-0 left-4 right-4 h-1 bg-[#10B981] rounded-full" />
                    <span className="text-[#10B981] font-body font-bold text-lg">
                      Entity
                    </span>
                  </th>
                  <th className="py-5 px-6 text-[#6B6B6B] font-body font-medium w-1/4">
                    Tally
                  </th>
                  <th className="py-5 px-6 text-[#6B6B6B] font-body font-medium w-1/4">
                    Zoho Books
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 + index * 0.06,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className={`border-t border-[#E5E5E0] ${
                      index % 2 === 0 ? "bg-white" : "bg-[#FAFAF8]"
                    } hover:bg-[#10B981]/[0.03] transition-colors duration-200`}
                  >
                    <td className="py-5 px-6 text-[#1A1A1A] font-medium">
                      {row.feature}
                    </td>
                    <td className="py-5 px-6 text-center bg-[#10B981]/[0.02]">
                      <CellContent data={row.entity} index={index} isInView={isInView} />
                    </td>
                    <td className="py-5 px-6 text-center">
                      <CellContent data={row.tally} index={index} isInView={isInView} />
                    </td>
                    <td className="py-5 px-6 text-center">
                      <CellContent data={row.zoho} index={index} isInView={isInView} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center text-[#999999] text-sm mt-8 max-w-2xl mx-auto"
        >
          Based on publicly available information as of 2026. We respect every
          product in this space — we believe accountants deserve better tools.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-center mt-10"
        >
          <a
            href="#waitlist"
            className="link-accent inline-flex items-center gap-2 text-lg"
          >
            Ready to see the difference? Join the Waitlist
            <span className="text-xl">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
