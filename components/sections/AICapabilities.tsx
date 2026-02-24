"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import StarField from "@/components/ui/StarField";

const capabilities = [
  {
    title: "Document Extraction",
    description: "Drop a bill, invoice, or receipt. AI reads every line and creates the journal entry.",
    visual: "document",
  },
  {
    title: "Smart Categorization",
    description: "Every transaction lands in the right account automatically. AI learns from your corrections.",
    visual: "category",
  },
  {
    title: "Bank Matching",
    description: "Bank statements matched to your books automatically. One click to confirm or override.",
    visual: "bank",
  },
  {
    title: "Anomaly Detection",
    description: "Duplicate invoices. Unusual amounts. AI flags issues before they compound.",
    badge: "Coming Soon",
    visual: "anomaly",
  },
  {
    title: "Auto Compliance",
    description: "GST returns drafted from your transactions. TDS computed at source. E-invoicing ready.",
    badge: "Coming Soon",
    visual: "compliance",
  },
  {
    title: "Rabbit AI",
    description: "Ask your books anything in plain language. Get instant answers.",
    accent: true,
    visual: "rabbit",
  },
];

function CapabilityVisual({ type }: { type: string }) {
  const visuals: Record<string, React.ReactNode> = {
    document: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <motion.rect
          x="15" y="10" width="50" height="60" rx="4"
          fill="none" stroke="currentColor" strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.line x1="25" y1="25" x2="55" y2="25" stroke="currentColor" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
        <motion.line x1="25" y1="35" x2="50" y2="35" stroke="currentColor" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.5 }} />
        <motion.line x1="25" y1="45" x2="55" y2="45" stroke="currentColor" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.5 }} />
        <motion.circle cx="60" cy="55" r="12" fill="#10B981" fillOpacity="0.2"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }} />
        <motion.path d="M55 55 L58 58 L65 51" stroke="#10B981" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.4 }} />
      </svg>
    ),
    category: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <motion.rect x="10" y="15" width="25" height="20" rx="3" fill="currentColor" fillOpacity="0.15"
          initial={{ scale: 0, x: 40 }} animate={{ scale: 1, x: 0 }} transition={{ duration: 0.5 }} />
        <motion.rect x="45" y="15" width="25" height="20" rx="3" fill="#10B981" fillOpacity="0.3"
          initial={{ scale: 0, x: -40 }} animate={{ scale: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} />
        <motion.rect x="10" y="45" width="25" height="20" rx="3" fill="currentColor" fillOpacity="0.1"
          initial={{ scale: 0, x: 40 }} animate={{ scale: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }} />
        <motion.rect x="45" y="45" width="25" height="20" rx="3" fill="currentColor" fillOpacity="0.15"
          initial={{ scale: 0, x: -40 }} animate={{ scale: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }} />
        <motion.path d="M40 10 L40 70" stroke="#10B981" strokeWidth="1" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.5 }} />
        <motion.path d="M5 40 L75 40" stroke="#10B981" strokeWidth="1" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.5 }} />
      </svg>
    ),
    bank: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <motion.rect x="5" y="25" width="30" height="35" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"
          initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }} />
        <motion.rect x="45" y="25" width="30" height="35" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"
          initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }} />
        <motion.path d="M35 42 L45 42" stroke="#10B981" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.3 }} />
        <motion.path d="M42 38 L45 42 L42 46" stroke="#10B981" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.3 }} />
        <motion.line x1="10" y1="35" x2="30" y2="35" stroke="currentColor" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 }} />
        <motion.line x1="10" y1="42" x2="25" y2="42" stroke="currentColor" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4 }} />
        <motion.line x1="50" y1="35" x2="70" y2="35" stroke="#10B981" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1 }} />
        <motion.line x1="50" y1="42" x2="65" y2="42" stroke="#10B981" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1 }} />
      </svg>
    ),
    anomaly: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <motion.path d="M10 60 L25 45 L40 50 L55 25 L70 35" stroke="currentColor" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        <motion.circle cx="55" cy="25" r="8" fill="#F59E0B" fillOpacity="0.2"
          initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ delay: 0.8, duration: 0.5 }} />
        <motion.path d="M55 21 L55 26 M55 29 L55 30" stroke="#F59E0B" strokeWidth="2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} />
        <motion.circle cx="25" cy="45" r="3" fill="currentColor" fillOpacity="0.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
        <motion.circle cx="40" cy="50" r="3" fill="currentColor" fillOpacity="0.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
        <motion.circle cx="70" cy="35" r="3" fill="currentColor" fillOpacity="0.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }} />
      </svg>
    ),
    compliance: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <motion.rect x="15" y="15" width="50" height="50" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        <motion.path d="M25 35 L30 40 L40 30" stroke="#10B981" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.4 }} />
        <motion.path d="M25 50 L30 55 L40 45" stroke="#10B981" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.4 }} />
        <motion.line x1="45" y1="35" x2="58" y2="35" stroke="currentColor" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }} />
        <motion.line x1="45" y1="50" x2="55" y2="50" stroke="currentColor" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9 }} />
      </svg>
    ),
    rabbit: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <motion.circle cx="40" cy="45" r="20" fill="currentColor" fillOpacity="0.1"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} />
        <motion.ellipse cx="30" cy="22" rx="6" ry="15" fill="none" stroke="currentColor" strokeWidth="1.5"
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.3, duration: 0.4 }} style={{ transformOrigin: "30px 37px" }} />
        <motion.ellipse cx="50" cy="22" rx="6" ry="15" fill="none" stroke="currentColor" strokeWidth="1.5"
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.4, duration: 0.4 }} style={{ transformOrigin: "50px 37px" }} />
        <motion.circle cx="35" cy="42" r="2" fill="currentColor"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} />
        <motion.circle cx="45" cy="42" r="2" fill="currentColor"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }} />
        <motion.path d="M38 50 Q40 53 42 50" stroke="currentColor" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8 }} />
        <motion.path d="M55 58 Q60 55 Q65 58 Q70 55" stroke="#10B981" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse" }} />
      </svg>
    ),
  };

  return (
    <div className="w-20 h-20 text-white/60">
      {visuals[type] || null}
    </div>
  );
}

export default function AICapabilities() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="ai-capabilities"
      className="relative py-32 lg:py-40 cosmos-bg overflow-hidden"
      ref={sectionRef}
    >
      <StarField starCount={120} />

      <div className="container-content px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <p className="eyebrow text-[#10B981] mb-4">ACCOUNTING INTELLIGENCE</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] text-white leading-[1.1] mb-6">
            AI that <span className="text-gradient-blue">actually understands</span>
            <br />
            <span className="text-white/40">accounting.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Purpose-built AI trained on real accounting workflows and Indian compliance requirements.
          </p>
        </motion.div>

        {/* Capability cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative p-8 rounded-2xl transition-all duration-300 ${
                capability.accent
                  ? "bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-lg shadow-[#10B981]/20"
                  : "card-dark"
              }`}
            >
              {/* Badge */}
              {capability.badge && (
                <span className="coming-soon-tag absolute top-6 right-6">
                  {capability.badge}
                </span>
              )}

              {/* Visual */}
              <div className="mb-6">
                <CapabilityVisual type={capability.visual} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3 text-white">
                {capability.title}
              </h3>

              {/* Description */}
              <p className={`leading-relaxed ${
                capability.accent ? "text-white/80" : "text-white/50"
              }`}>
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
