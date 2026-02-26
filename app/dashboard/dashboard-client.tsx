"use client";

import { motion } from "framer-motion";
import { EntityMark } from "@/components/entity-mark";
import StarField from "@/components/ui/StarField";
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
    <div className="relative min-h-dvh bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
      <StarField starCount={60} className="opacity-40" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(150,106,248,0.06) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center px-6 w-full max-w-sm"
      >
        <EntityMark size={48} state="idle" theme="dark" />

        {/* Avatar */}
        <div className="mt-8 w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
          <span
            className="text-2xl font-semibold text-white"
            style={{ fontFamily: "var(--font-manrope), sans-serif" }}
          >
            {initial}
          </span>
        </div>

        <h1
          className="mt-4 text-xl font-semibold text-white text-center"
          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
        >
          Welcome back, {fullName}
        </h1>
        <p className="mt-1 text-sm text-[#666666]">{email}</p>

        <p className="mt-8 text-sm text-[#999999] text-center leading-relaxed">
          Your workspace is being prepared.
          <br />
          More features coming soon.
        </p>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="mt-8 flex items-center gap-2 py-2.5 px-5 rounded-xl text-sm text-[#999999] border border-white/10 bg-white/[0.03] transition-all duration-200 hover:bg-white/[0.06] hover:border-white/20 hover:text-white disabled:opacity-50"
        >
          <LogOut size={14} />
          {signingOut ? "Signing out..." : "Sign out"}
        </button>
      </motion.div>
    </div>
  );
}
