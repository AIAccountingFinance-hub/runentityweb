"use client";

import { motion } from "framer-motion";
import { EntityMark } from "@/components/entity-mark";
import StarField from "@/components/ui/StarField";
import { ArrowRight } from "lucide-react";

const APP_URL = "https://app.runentity.com";

export default function LoginPage() {
  return (
    <div className="relative min-h-dvh bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
      {/* Star background */}
      <StarField starCount={80} className="opacity-50" />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(150,106,248,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center px-6 w-full max-w-sm"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <EntityMark size={64} state="idle" theme="dark" />
        </motion.div>

        {/* Heading */}
        <h1
          className="mt-8 text-2xl font-semibold text-white text-center"
          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
        >
          Welcome to{" "}
          <span className="text-gradient-purple inline-block">Entity</span>
        </h1>
        <p className="mt-2 text-sm text-[#999999] text-center">
          AI-native accounting platform
        </p>

        {/* Card */}
        <div className="mt-10 w-full flex flex-col gap-3">
          {/* Sign In — primary */}
          <a
            href={`${APP_URL}/login`}
            className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl text-sm font-medium text-[#0A0A0A] bg-white transition-all duration-200 hover:shadow-[0_0_40px_rgba(150,106,248,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>

          {/* Create Account — secondary */}
          <a
            href={`${APP_URL}/signup`}
            className="flex items-center justify-center w-full py-3.5 px-6 rounded-xl text-sm font-medium text-[#CCCCCC] border border-white/10 bg-white/[0.03] transition-all duration-200 hover:bg-white/[0.06] hover:border-white/20 hover:text-white active:scale-[0.98]"
          >
            Create an account
          </a>
        </div>

        {/* Divider + trust line */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="w-12 h-px bg-white/10" />
          <p className="text-xs text-[#666666]">
            Trusted by 500+ firms across India
          </p>
        </div>
      </motion.div>
    </div>
  );
}
