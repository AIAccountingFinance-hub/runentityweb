"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";

export default function DemoVideo() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="bg-white py-20 lg:py-28 border-t border-[#E5E5E0]"
      ref={sectionRef}
    >
      <div className="container-content px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="font-display text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#1A1A1A] leading-[1.15] tracking-[-0.02em] mb-3">
            See Entity in <span className="text-gradient">action.</span>
          </h2>
          <p className="text-[#6B6B6B] text-[16px] font-body leading-relaxed">
            One example of an accounting workflow possible on Entity.
          </p>
        </div>

        {/* Video placeholder */}
        <div
          className="relative rounded-2xl overflow-hidden cursor-pointer bg-[#F2F2ED] border border-[#E5E5E0]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="aspect-video relative">
            {/* Stipple-style background texture */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #999 0.8px, transparent 0.8px)",
                backgroundSize: "12px 12px",
              }}
            />

            {/* Gradient wash */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 40%, rgba(250,250,248,0.6) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(26,26,26,0.04) 0%, transparent 50%)",
              }}
            />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.25 }}
                className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isHovered
                    ? "bg-[#1A1A1A] shadow-2xl"
                    : "bg-[#1A1A1A]/80 shadow-xl"
                }`}
              >
                <Play
                  className="w-5 h-5 sm:w-7 sm:h-7 ml-0.5 sm:ml-1 text-white"
                  fill="currentColor"
                />
              </motion.div>
            </div>

            {/* Bottom bar text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent">
              <p className="font-display text-white text-sm sm:text-lg md:text-xl font-semibold">
                AI that does real accounting work.
              </p>
            </div>

            {/* Duration badge */}
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#1A1A1A]/60 backdrop-blur-sm rounded-lg text-white/80 text-sm font-mono">
              2:14
            </div>
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}
