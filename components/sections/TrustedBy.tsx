"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const firms = ["Ledger & Co.", "Apex Audit", "Meridian"];

interface TrustedByProps {
  variant?: "top" | "bottom";
}

export default function TrustedBy({ variant = "top" }: TrustedByProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const tagline = variant === "top"
    ? "Built by Chartered Accountants and AI engineers."
    : "Built by Chartered Accountants and AI engineers who've lived the problem.";

  return (
    <section className="bg-[#F2F2ED] py-16 lg:py-20" ref={ref}>
      <div className="container-content px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          {/* Decorative line */}
          <div className="divider-line mb-8" />

          {/* Eyebrow */}
          <p className="eyebrow mb-8">
            TRUSTED BY LEADING AI NATIVE ACCOUNTING FIRMS
          </p>

          {/* Firm names */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 mb-8">
            {firms.map((firm, index) => (
              <motion.span
                key={firm}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                className="text-[#AAAAAA] font-body text-base tracking-wide"
              >
                {firm}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <p className="text-[#999999] font-body text-sm italic">
            {tagline}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
