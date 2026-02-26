"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EntityMark } from "@/components/entity-mark";


const navLinks = [
  { label: "Manifesto", href: "/about" },
  { label: "Partners", href: "/partners" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-white"
      }`}
    >
      <div className="container-content px-6 lg:px-8">
        <nav className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <EntityMark size={42} state="idle" theme="light" />
            <span className="font-body font-bold text-[22px] text-[#1A1A1A] tracking-tight">
              Entity
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-[15px] font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://app.runentity.com"
              className="font-body text-[14px] font-medium text-white bg-[#1A1A1A] px-5 py-2 rounded-lg hover:bg-[#000] transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
            >
              Login
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-[#1A1A1A] block"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-[#1A1A1A] block"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-[#1A1A1A] block"
            />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mx-4 mt-1"
          >
            <div className="bg-white/90 backdrop-blur-xl border border-[#E5E5E0]/60 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-5 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-body text-sm text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F2F2ED]/60 px-3 py-2.5 rounded-xl transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://app.runentity.com"
                className="font-body text-sm font-medium text-white bg-[#1A1A1A] px-3 py-2.5 rounded-xl text-center mt-1"
              >
                Login
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
