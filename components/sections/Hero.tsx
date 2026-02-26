"use client";

import { motion } from "framer-motion";
import StippleBackground from "@/components/ui/StippleBackground";
import { useDemoModal } from "@/components/ui/DemoModalProvider";

export default function Hero() {
  const { openModal } = useDemoModal();
  return (
    <section className="relative bg-[#FAFAF8] overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Stippled vintage accounting art */}
        <StippleBackground />

        {/* Top fade to blend with nav */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FAFAF8] via-[#FAFAF8]/80 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAF8] via-[#FAFAF8]/80 to-transparent" />
        {/* Center fade so text is readable */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 35%, rgba(250,250,248,0.85) 0%, rgba(250,250,248,0) 100%)",
          }}
        />
      </div>

      <div className="container-content px-5 sm:px-6 lg:px-8 pt-8 sm:pt-10 lg:pt-14 pb-10 sm:pb-14 relative z-10">
        <div className="text-center max-w-[800px] mx-auto">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-bold text-[#1A1A1A] leading-[1.12] tracking-[-0.02em] mb-6"
          >
            The accounting platform{" "}
            <br />
            where <span className="text-gradient">AI does the work.</span>
            <br />
            You stay in control.
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="font-body text-[16px] text-[#6B6B6B] leading-[1.7] max-w-[560px] mx-auto mb-6"
          >
            <span className="text-gradient">Entity</span>, your personal accounting AI. It knows your transactions.
            Records them. Categorizes them. Reconciles them. It matches your
            bank statements. Handles your compliances. Flags what doesn&apos;t
            add up. All of this happens before you even log in. When
            you&apos;re ready, your books are ready.
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="font-display text-[18px] md:text-[20px] font-semibold text-[#1A1A1A] tracking-[-0.01em] mb-6"
          >
            Review. Approve. Close. <span className="text-[#6B6B6B] font-normal">That&apos;s it.</span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mb-6"
          >
            <motion.button
              onClick={() => openModal("demo")}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#1A1A1A] text-white font-body font-medium text-[15px] rounded-xl tracking-[-0.01em] shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
              whileHover={{ scale: 1.02, backgroundColor: "#2A2A2A" }}
              whileTap={{ scale: 0.98 }}
            >
              Book a demo
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
