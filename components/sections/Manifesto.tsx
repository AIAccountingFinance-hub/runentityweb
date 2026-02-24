"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import StarField from "@/components/ui/StarField";

export default function Manifesto() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 cosmos-bg overflow-hidden"
      ref={sectionRef}
    >
      <StarField starCount={80} />

      <div className="container-narrow px-6 lg:px-8 relative z-10">
        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="divider-green mb-12 origin-center"
        />

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-white text-center leading-[1.15] tracking-[-0.02em] mb-10"
        >
          We didn&apos;t improve
          <br />
          accounting software.
          <br />
          <span className="text-gradient">We replaced it.</span>
        </motion.h2>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="space-y-6 text-[16px] text-white/50 leading-relaxed text-center font-body"
        >
          <p>
            For two decades, accounting software in India has been the same story.
            Clunky interfaces designed in the early 2000s. Month-end processes
            that haven&apos;t changed since dial-up internet.
          </p>
          <p>
            We looked at all of it — the legacy giants, the cloud re-skins, the
            half-hearted AI add-ons — and started over. From scratch.
          </p>
        </motion.div>

        {/* Closing statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-display text-xl md:text-2xl text-center mt-10 italic"
        >
          This is what accounting <span className="text-gradient-light">was always meant to be.</span>
        </motion.p>
      </div>
    </section>
  );
}
