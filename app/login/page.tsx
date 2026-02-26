"use client";

import { motion, AnimatePresence } from "framer-motion";
import { EntityMark } from "@/components/entity-mark";
import StarField from "@/components/ui/StarField";
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

// ── Input component (dark theme) ──

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
      <label className="text-[13px] font-medium text-[#CCCCCC] block mb-1.5">
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-3 bg-white/[0.05] border rounded-xl text-[15px] text-white placeholder:text-[#666] focus:outline-none focus:ring-1 transition-all ${
          error
            ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/20"
            : "border-white/10 focus:border-white/30 focus:ring-white/10"
        }`}
      />
      {error && <p className="text-red-400 text-[12px] mt-1">{error}</p>}
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
      <label className="text-[13px] font-medium text-[#CCCCCC] block mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className={`w-full px-4 py-3 pr-11 bg-white/[0.05] border rounded-xl text-[15px] text-white placeholder:text-[#666] focus:outline-none focus:ring-1 transition-all ${
            error
              ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/20"
              : "border-white/10 focus:border-white/30 focus:ring-white/10"
          }`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition-colors"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="text-red-400 text-[12px] mt-1">{error}</p>}
    </div>
  );
}

// ── Spinner ──

function Spinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
    />
  );
}

// ── Main Login Page (wrapped in Suspense for useSearchParams) ──

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
    <div className="relative min-h-dvh bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
      <StarField starCount={80} className="opacity-50" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(150,106,248,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-sm">
        {/* Logo — always visible */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <EntityMark size={56} state="idle" theme="dark" />
        </motion.div>

        {/* Views */}
        <AnimatePresence mode="wait">
          {/* ── User Selector (macOS-style) ── */}
          {view === "selector" && (
            <motion.div
              key="selector"
              {...fadeUp}
              className="mt-8 flex flex-col items-center w-full"
            >
              <h1
                className="text-xl font-semibold text-white text-center"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                Welcome back
              </h1>

              <div className="mt-8 flex gap-6 justify-center flex-wrap">
                {rememberedUsers.map((user) => (
                  <button
                    key={user.email}
                    onClick={() => selectUser(user)}
                    className="group flex flex-col items-center gap-2 transition-all duration-200"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-200 group-hover:bg-white/15 group-hover:border-white/30 group-hover:scale-105">
                      <span
                        className="text-lg font-semibold text-white"
                        style={{
                          fontFamily: "var(--font-manrope), sans-serif",
                        }}
                      >
                        {user.avatarInitial}
                      </span>
                    </div>
                    <span className="text-xs text-[#999] group-hover:text-white transition-colors max-w-[80px] truncate">
                      {user.fullName}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={switchToSignIn}
                className="mt-8 text-sm text-[#666] hover:text-white transition-colors"
              >
                Use a different account
              </button>

              <div className="mt-6 flex flex-col items-center gap-3">
                <div className="w-12 h-px bg-white/10" />
                <button
                  onClick={switchToSignUp}
                  className="text-sm text-[#666] hover:text-white transition-colors"
                >
                  Create an account
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Sign In Form ── */}
          {view === "signin" && (
            <motion.div
              key="signin"
              {...fadeUp}
              className="mt-8 flex flex-col items-center w-full"
            >
              <h1
                className="text-xl font-semibold text-white text-center"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                Sign in to{" "}
                <span className="text-gradient-purple inline-block">
                  Entity
                </span>
              </h1>
              <p className="mt-2 text-sm text-[#999] text-center">
                AI-native accounting platform
              </p>

              <form
                onSubmit={handleSignIn}
                className="mt-8 w-full space-y-4"
              >
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
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl text-sm font-medium text-[#0A0A0A] bg-white transition-all duration-200 hover:shadow-[0_0_40px_rgba(150,106,248,0.2)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
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
                    className="text-sm text-[#666] hover:text-white transition-colors"
                  >
                    Back to accounts
                  </button>
                )}
                <div className="w-12 h-px bg-white/10" />
                <button
                  onClick={switchToSignUp}
                  className="text-sm text-[#666] hover:text-white transition-colors"
                >
                  Create an account
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Sign Up Form ── */}
          {view === "signup" && (
            <motion.div
              key="signup"
              {...fadeUp}
              className="mt-8 flex flex-col items-center w-full"
            >
              <button
                onClick={switchToSignIn}
                className="self-start flex items-center gap-1.5 text-sm text-[#666] hover:text-white transition-colors mb-4"
              >
                <ArrowLeft size={14} />
                Back
              </button>

              <h1
                className="text-xl font-semibold text-white text-center"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                Create your account
              </h1>
              <p className="mt-2 text-sm text-[#999] text-center">
                Get started with Entity
              </p>

              <form
                onSubmit={handleSignUp}
                className="mt-8 w-full space-y-4"
              >
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
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl text-sm font-medium text-[#0A0A0A] bg-white transition-all duration-200 hover:shadow-[0_0_40px_rgba(150,106,248,0.2)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 flex flex-col items-center gap-3">
                <div className="w-12 h-px bg-white/10" />
                <button
                  onClick={switchToSignIn}
                  className="text-sm text-[#666] hover:text-white transition-colors"
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
              className="mt-8 flex flex-col items-center w-full"
            >
              <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>

              <h1
                className="mt-6 text-xl font-semibold text-white text-center"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                Check your email
              </h1>
              <p className="mt-2 text-sm text-[#999] text-center leading-relaxed max-w-[280px]">
                We sent a confirmation link to{" "}
                <span className="text-white">{email}</span>. Click the link to
                activate your account.
              </p>

              <button
                onClick={switchToSignIn}
                className="mt-8 text-sm text-[#666] hover:text-white transition-colors"
              >
                Back to sign in
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
