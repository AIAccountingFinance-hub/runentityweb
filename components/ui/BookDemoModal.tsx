"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { X, ArrowRight, Check } from "lucide-react";

const countryCodes = [
  { code: "+91", country: "IN", flag: "🇮🇳", label: "India" },
  { code: "+1", country: "US", flag: "🇺🇸", label: "US" },
  { code: "+44", country: "GB", flag: "🇬🇧", label: "UK" },
  { code: "+971", country: "AE", flag: "🇦🇪", label: "UAE" },
  { code: "+65", country: "SG", flag: "🇸🇬", label: "SG" },
  { code: "+61", country: "AU", flag: "🇦🇺", label: "AU" },
  { code: "+49", country: "DE", flag: "🇩🇪", label: "DE" },
  { code: "+81", country: "JP", flag: "🇯🇵", label: "JP" },
  { code: "+86", country: "CN", flag: "🇨🇳", label: "CN" },
  { code: "+33", country: "FR", flag: "🇫🇷", label: "FR" },
  { code: "+55", country: "BR", flag: "🇧🇷", label: "BR" },
  { code: "+82", country: "KR", flag: "🇰🇷", label: "KR" },
  { code: "+7", country: "RU", flag: "🇷🇺", label: "RU" },
  { code: "+39", country: "IT", flag: "🇮🇹", label: "IT" },
  { code: "+34", country: "ES", flag: "🇪🇸", label: "ES" },
  { code: "+31", country: "NL", flag: "🇳🇱", label: "NL" },
  { code: "+46", country: "SE", flag: "🇸🇪", label: "SE" },
  { code: "+41", country: "CH", flag: "🇨🇭", label: "CH" },
  { code: "+62", country: "ID", flag: "🇮🇩", label: "ID" },
  { code: "+60", country: "MY", flag: "🇲🇾", label: "MY" },
];

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: "demo" | "partner";
}

export default function BookDemoModal({ isOpen, onClose, variant = "demo" }: BookDemoModalProps) {
  const isPartner = variant === "partner";
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const selectedCountry = countryCodes.find((c) => c.code === countryCode) || countryCodes[0];

  // Detect country from timezone
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.startsWith("America")) setCountryCode("+1");
      else if (tz.startsWith("Europe/London")) setCountryCode("+44");
      else if (tz.startsWith("Asia/Dubai")) setCountryCode("+971");
      else if (tz.startsWith("Asia/Singapore")) setCountryCode("+65");
      else if (tz.startsWith("Australia")) setCountryCode("+61");
      else if (tz.startsWith("Europe/Berlin")) setCountryCode("+49");
      else if (tz.startsWith("Asia/Tokyo")) setCountryCode("+81");
      else if (tz.startsWith("Asia/Shanghai")) setCountryCode("+86");
      else if (tz.startsWith("Europe/Paris")) setCountryCode("+33");
      else if (tz.startsWith("Asia/Kolkata") || tz.startsWith("Asia/Calcutta"))
        setCountryCode("+91");
    } catch {}
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length !== 10) {
      setPhoneError("Enter a valid 10-digit number");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      setEmailError("Enter a valid email address");
      return false;
    }
    // Block disposable/temporary email providers
    const domain = value.split("@")[1].toLowerCase();
    const disposable = ["mailinator.com", "guerrillamail.com", "tempmail.com", "throwaway.email", "yopmail.com", "sharklasers.com", "guerrillamailblock.com", "grr.la", "dispostable.com", "trashmail.com", "10minutemail.com", "temp-mail.org", "fakeinbox.com", "maildrop.cc", "getairmail.com"];
    if (disposable.includes(domain)) {
      setEmailError("Please use a permanent email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    const phoneValid = validatePhone(phone);
    const emailValid = validateEmail(email);
    if (!phoneValid || !emailValid) return;

    setIsSubmitting(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          country_code: countryCode,
          phone,
          email,
          variant: isPartner ? "partner" : "demo",
        }),
      });
    } catch {
      // Still show success to user even if save fails
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = useCallback(() => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setName("");
      setPhone("");
      setEmail("");
      setPhoneError("");
      setEmailError("");
      setIsSubmitted(false);
    }, 300);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.2)] overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 text-[#999] hover:text-[#1A1A1A] transition-colors z-10"
            >
              <X size={18} />
            </button>

            <div className="p-5 sm:p-8">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="thanks"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-8"
                  >
                    <div className="w-14 h-14 bg-[#1A1A1A]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                      <Check className="w-7 h-7 text-[#1A1A1A]" strokeWidth={2.5} />
                    </div>
                    <h3 className="font-display text-[22px] font-bold text-[#1A1A1A] mb-2">
                      Thank you!
                    </h3>
                    <p className="font-body text-[15px] text-[#6B6B6B] leading-relaxed">
                      {isPartner
                        ? "We\u2019ll review your application and get back within 48 hours."
                        : "We\u2019ll reach out within 24 hours to schedule your demo."}
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 font-body text-[14px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="font-display text-[22px] font-bold text-[#1A1A1A] mb-1">
                      {isPartner ? "Become a Partner" : "Book a demo"}
                    </h3>
                    <p className="font-body text-[14px] text-[#6B6B6B] mb-6">
                      {isPartner
                        ? "Join the firms building the future of accounting."
                        : "See Entity in action. We\u2019ll walk you through."}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="font-body text-[13px] font-medium text-[#1A1A1A] block mb-1.5">
                          Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                          required
                          className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E5E5E0] rounded-xl font-body text-[15px] text-[#1A1A1A] placeholder:text-[#999] focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A]/20 transition-all"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="font-body text-[13px] font-medium text-[#1A1A1A] block mb-1.5">
                          Phone
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-[100px] sm:w-[120px] px-2 sm:px-3 py-3 bg-[#FAFAF8] border border-[#E5E5E0] rounded-xl font-body text-[13px] sm:text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-all appearance-none cursor-pointer"
                          >
                            {countryCodes.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.flag} {c.code}
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                              const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                              setPhone(digits);
                              if (phoneError) setPhoneError("");
                            }}
                            placeholder="Mobile number"
                            required
                            className={`flex-1 px-4 py-3 bg-[#FAFAF8] border rounded-xl font-body text-[15px] text-[#1A1A1A] placeholder:text-[#999] focus:outline-none focus:ring-1 transition-all ${phoneError ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : "border-[#E5E5E0] focus:border-[#1A1A1A] focus:ring-[#1A1A1A]/20"}`}
                          />
                        </div>
                        {phoneError && (
                          <p className="text-red-500 text-[12px] font-body mt-1">{phoneError}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="font-body text-[13px] font-medium text-[#1A1A1A] block mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                          }}
                          placeholder="you@company.com"
                          required
                          className={`w-full px-4 py-3 bg-[#FAFAF8] border rounded-xl font-body text-[15px] text-[#1A1A1A] placeholder:text-[#999] focus:outline-none focus:ring-1 transition-all ${emailError ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : "border-[#E5E5E0] focus:border-[#1A1A1A] focus:ring-[#1A1A1A]/20"}`}
                        />
                        {emailError && (
                          <p className="text-red-500 text-[12px] font-body mt-1">{emailError}</p>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1A1A1A] text-white text-[15px] font-body font-medium rounded-xl hover:bg-[#2A2A2A] transition-all duration-200 disabled:opacity-60 mt-2"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                        ) : (
                          <>
                            Submit
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
