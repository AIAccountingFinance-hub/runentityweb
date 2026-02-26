"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";

export default function VideoTeaser() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="bg-[#F2F2ED] py-24 lg:py-32"
      ref={sectionRef}
    >
      <div className="container-content px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-4">
            See it <span className="text-gradient">in action.</span>
          </h2>
          <p className="text-[#6B6B6B] text-lg">
            2 minutes. No fluff. Just the product.
          </p>
        </motion.div>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          whileHover={{ y: -4 }}
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden cursor-pointer shadow-2xl shadow-black/10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="aspect-video relative bg-[#0A0A0A]">
            {/* Thumbnail placeholder - Abstract UI mockup */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A]" />

              {/* Faint UI elements */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-full max-w-2xl px-8">
                  {/* Sidebar mockup */}
                  <div className="flex gap-6">
                    <div className="w-40 space-y-2">
                      <div className="h-8 bg-white/10 rounded-lg" />
                      <div className="h-6 bg-white/5 rounded" />
                      <div className="h-6 bg-white/5 rounded" />
                      <div className="h-6 bg-white/20 rounded" />
                      <div className="h-6 bg-white/5 rounded" />
                    </div>
                    {/* Main content mockup */}
                    <div className="flex-1 space-y-3">
                      <div className="flex gap-2">
                        <div className="w-32 h-8 bg-white/10 rounded-lg" />
                        <div className="flex-1 h-8 bg-white/5 rounded-lg" />
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="h-6 rounded bg-white/5" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle cosmos gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 30% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(59, 130, 246, 0.03) 0%, transparent 50%)"
                }}
              />
            </div>

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isHovered
                    ? "bg-[#1A1A1A] shadow-lg shadow-[#1A1A1A]/30"
                    : "bg-white shadow-2xl"
                }`}
              >
                <Play
                  className={`w-8 h-8 ml-1 ${
                    isHovered ? "text-white" : "text-[#1A1A1A]"
                  }`}
                  fill="currentColor"
                />
              </motion.button>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-white/80 text-sm font-mono">
              2:14
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
