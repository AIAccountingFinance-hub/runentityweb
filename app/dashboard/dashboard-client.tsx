"use client";

import { motion } from "framer-motion";
import { EntityMark } from "@/components/entity-mark";
import StippleBackground from "@/components/ui/StippleBackground";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  email: string;
  fullName: string;
}

export default function DashboardClient({ email, fullName }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [signingOut, setSigningOut] = useState(false);

  const initial = (fullName || email)[0].toUpperCase();

  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="relative min-h-dvh bg-[#FAFAF8] flex items-center justify-center overflow-hidden">
      {/* Stipple background */}
      <div className="absolute inset-0 pointer-events-none">
        <StippleBackground />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FAFAF8] via-[#FAFAF8]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAF8] via-[#FAFAF8]/80 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(250,250,248,0.9) 0%, rgba(250,250,248,0) 100%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center px-5 w-full max-w-[400px]"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <EntityMark size={42} state="idle" theme="light" />
          <span className="font-body font-bold text-[22px] text-[#1A1A1A] tracking-tight">
            Entity
          </span>
        </div>

        {/* Card */}
        <div className="w-full bg-white border border-[#E5E5E0] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 sm:p-8 flex flex-col items-center">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-[#F2F2ED] border-2 border-[#E5E5E0] flex items-center justify-center">
            <span className="font-display text-2xl font-bold text-[#1A1A1A]">
              {initial}
            </span>
          </div>

          <h1 className="mt-4 font-display text-[22px] font-bold text-[#1A1A1A] text-center">
            Welcome back, {fullName}
          </h1>
          <p className="mt-1 font-body text-[14px] text-[#6B6B6B]">{email}</p>

          <p className="mt-6 font-body text-[14px] text-[#999] text-center leading-relaxed">
            Your workspace is being prepared.
            <br />
            More features coming soon.
          </p>

          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="mt-6 flex items-center gap-2 px-5 py-2.5 font-body text-[14px] font-medium text-[#6B6B6B] border border-[#E5E5E0] rounded-xl hover:bg-[#F2F2ED] hover:text-[#1A1A1A] transition-all duration-200 disabled:opacity-50"
          >
            <LogOut size={14} />
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
