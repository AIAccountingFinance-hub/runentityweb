"use client";

import { motion, AnimatePresence } from "framer-motion";
import { EntityMark } from "@/components/entity-mark";
import StippleBackground from "@/components/ui/StippleBackground";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

// ── Remembered Users (localStorage) ──

interface RememberedUser {
  email: string;
  fullName: string;
  avatarInitial: string;
  lastLoginAt: string;
}

const STORAGE_KEY = "entity_remembered_users";

function getRememberedUsers(): RememberedUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function rememberUser(email: string, fullName: string) {
  const existing = getRememberedUsers();
  const filtered = existing.filter((u) => u.email !== email);
  const name = fullName || email.split("@")[0];
  filtered.unshift({
    email,
    fullName: name,
    avatarInitial: name[0].toUpperCase(),
    lastLoginAt: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, 5)));
}

// ── Animation variants ──

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

// ── Input component ──

function Input({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="font-body text-[13px] font-medium text-[#1A1A1A] block mb-1.5">
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-3 bg-[#FAFAF8] border rounded-xl font-body text-[15px] text-[#1A1A1A] placeholder:text-[#999] focus:outline-none focus:ring-1 transition-all ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
            : "border-[#E5E5E0] focus:border-[#1A1A1A] focus:ring-[#1A1A1A]/20"
        }`}
      />
      {error && <p className="text-red-500 text-[12px] mt-1">{error}</p>}
    </div>
  );
}

// ── Password input with toggle ──

function PasswordInput({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="font-body text-[13px] font-medium text-[#1A1A1A] block mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className={`w-full px-4 py-3 pr-11 bg-[#FAFAF8] border rounded-xl font-body text-[15px] text-[#1A1A1A] placeholder:text-[#999] focus:outline-none focus:ring-1 transition-all ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
              : "border-[#E5E5E0] focus:border-[#1A1A1A] focus:ring-[#1A1A1A]/20"
          }`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#1A1A1A] transition-colors"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-[12px] mt-1">{error}</p>}
    </div>
  );
}

// ── Spinner ──

function Spinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-5 h-5 border-2 border-[#1A1A1A]/20 border-t-[#1A1A1A] rounded-full"
    />
  );
}

// ── Main Login Page ──

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  type View = "selector" | "signin" | "signup" | "check-email";
  const [view, setView] = useState<View>("signin");
  const [rememberedUsers, setRememberedUsers] = useState<RememberedUser[]>([]);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load remembered users on mount
  useEffect(() => {
    const users = getRememberedUsers();
    if (users.length > 0) {
      setRememberedUsers(users);
      setView("selector");
    }
  }, []);

  // Show auth error from callback
  useEffect(() => {
    if (searchParams.get("error") === "auth_failed") {
      setError("Authentication failed. Please try again.");
    }
  }, [searchParams]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(
        authError.message === "Invalid login credentials"
          ? "Invalid email or password"
          : authError.message
      );
      setLoading(false);
      return;
    }

    if (data.user) {
      rememberUser(
        data.user.email ?? email,
        data.user.user_metadata?.full_name ?? ""
      );
    }

    router.push("/dashboard");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setView("check-email");
  };

  const selectUser = (user: RememberedUser) => {
    setEmail(user.email);
    setPassword("");
    setError("");
    setView("signin");
  };

  const switchToSignIn = () => {
    setEmail("");
    setPassword("");
    setError("");
    setView("signin");
  };

  const switchToSignUp = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
    setView("signup");
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

      <div className="relative z-10 flex flex-col items-center px-5 w-full max-w-[400px]">
        {/* Logo */}
        <motion.a
          href="https://www.runentity.com"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 mb-10"
        >
          <EntityMark size={42} state="idle" theme="light" />
          <span className="font-body font-bold text-[22px] text-[#1A1A1A] tracking-tight">
            Entity
          </span>
        </motion.a>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full bg-white border border-[#E5E5E0] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {/* ── User Selector (macOS-style) ── */}
            {view === "selector" && (
              <motion.div
                key="selector"
                {...fadeUp}
                className="flex flex-col items-center"
              >
                <h1 className="font-display text-[22px] font-bold text-[#1A1A1A] mb-1">
                  Welcome back
                </h1>
                <p className="font-body text-[14px] text-[#6B6B6B] mb-8">
                  Choose an account to sign in
                </p>

                <div className="flex gap-6 justify-center flex-wrap">
                  {rememberedUsers.map((user) => (
                    <button
                      key={user.email}
                      onClick={() => selectUser(user)}
                      className="group flex flex-col items-center gap-2 transition-all duration-200"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#F2F2ED] border-2 border-[#E5E5E0] flex items-center justify-center transition-all duration-200 group-hover:border-[#1A1A1A] group-hover:scale-105 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                        <span className="font-display text-lg font-bold text-[#1A1A1A]">
                          {user.avatarInitial}
                        </span>
                      </div>
                      <span className="font-body text-xs text-[#6B6B6B] group-hover:text-[#1A1A1A] transition-colors max-w-[80px] truncate">
                        {user.fullName}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={switchToSignIn}
                  className="mt-8 font-body text-[14px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                >
                  Use a different account
                </button>

                <div className="mt-4 w-full flex flex-col items-center gap-3">
                  <div className="divider-line" />
                  <button
                    onClick={switchToSignUp}
                    className="font-body text-[14px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                  >
                    Create an account
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Sign In Form ── */}
            {view === "signin" && (
              <motion.div key="signin" {...fadeUp}>
                <h1 className="font-display text-[22px] font-bold text-[#1A1A1A] mb-1">
                  Sign in to <span className="text-gradient">Entity</span>
                </h1>
                <p className="font-body text-[14px] text-[#6B6B6B] mb-6">
                  AI-native accounting platform
                </p>

                <form onSubmit={handleSignIn} className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="you@company.com"
                    required
                    autoFocus={!email}
                  />

                  <PasswordInput
                    label="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    required
                    autoFocus={!!email}
                  />

                  {error && (
                    <p className="text-red-500 text-[13px] text-center">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1A1A1A] text-white font-body font-medium text-[15px] rounded-xl hover:bg-[#000] transition-all duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 mt-2"
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 flex flex-col items-center gap-3">
                  {rememberedUsers.length > 0 && (
                    <button
                      onClick={() => {
                        setEmail("");
                        setPassword("");
                        setError("");
                        setView("selector");
                      }}
                      className="font-body text-[14px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                    >
                      Back to accounts
                    </button>
                  )}
                  <div className="divider-line" />
                  <button
                    onClick={switchToSignUp}
                    className="font-body text-[14px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                  >
                    Create an account
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Sign Up Form ── */}
            {view === "signup" && (
              <motion.div key="signup" {...fadeUp}>
                <button
                  onClick={switchToSignIn}
                  className="flex items-center gap-1.5 font-body text-[13px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors mb-4"
                >
                  <ArrowLeft size={14} />
                  Back
                </button>

                <h1 className="font-display text-[22px] font-bold text-[#1A1A1A] mb-1">
                  Create your account
                </h1>
                <p className="font-body text-[14px] text-[#6B6B6B] mb-6">
                  Get started with Entity
                </p>

                <form onSubmit={handleSignUp} className="space-y-4">
                  <Input
                    label="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    placeholder="Your full name"
                    required
                    autoFocus
                  />

                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="you@company.com"
                    required
                  />

                  <PasswordInput
                    label="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Minimum 8 characters"
                    required
                  />

                  {error && (
                    <p className="text-red-500 text-[13px] text-center">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1A1A1A] text-white font-body font-medium text-[15px] rounded-xl hover:bg-[#000] transition-all duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 mt-2"
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 flex flex-col items-center gap-3">
                  <div className="divider-line" />
                  <button
                    onClick={switchToSignIn}
                    className="font-body text-[14px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                  >
                    Already have an account? Sign in
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Check Email Confirmation ── */}
            {view === "check-email" && (
              <motion.div
                key="check-email"
                {...fadeUp}
                className="flex flex-col items-center text-center py-4"
              >
                <div className="w-14 h-14 bg-[#F2F2ED] rounded-full flex items-center justify-center mb-5">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>

                <h1 className="font-display text-[22px] font-bold text-[#1A1A1A] mb-2">
                  Check your email
                </h1>
                <p className="font-body text-[14px] text-[#6B6B6B] leading-relaxed max-w-[280px]">
                  We sent a confirmation link to{" "}
                  <span className="font-medium text-[#1A1A1A]">{email}</span>.
                  Click the link to activate your account.
                </p>

                <button
                  onClick={switchToSignIn}
                  className="mt-6 font-body text-[14px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                >
                  Back to sign in
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 font-body text-[12px] text-[#999]"
        >
          Trusted by 500+ firms across India
        </motion.p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
