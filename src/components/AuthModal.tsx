"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Mail, Lock, User, Phone, CheckCircle2, ArrowRight, RefreshCw, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const { authModalOpen, authModalMode } = useAuth();
  if (!authModalOpen) return null;

  return <AuthModalContent key={authModalMode} initialMode={authModalMode} />;
}

function AuthModalContent({ initialMode }: { initialMode: "signin" | "signup" | "otp" }) {
  const {
    pendingOtpEmail,
    closeAuthModal,
    signIn,
    signUp,
    verifyOtp,
    resendOtp,
  } = useAuth();

  // Mode state: 'signin' | 'signup' | 'otp'
  const [tab, setTab] = useState<"signin" | "signup" | "otp">(initialMode);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [otpToken, setOtpToken] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const res = await signIn(email, password);
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || "Invalid credentials.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const res = await signUp({
      email,
      password,
      firstName,
      lastName,
      phone,
    });
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || "Registration failed.");
    } else {
      setTab("otp");
      setSuccessMsg("Verification code dispatched to your email address.");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const res = await verifyOtp(otpToken, pendingOtpEmail || email);
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || "Invalid code. Please try again or click Resend.");
    }
  };

  const handleResend = async () => {
    setErrorMsg(null);
    const res = await resendOtp(pendingOtpEmail || email);
    if (res.success) {
      setSuccessMsg("A new 6-digit verification code has been dispatched.");
      setTimeout(() => setSuccessMsg(null), 3500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 sm:p-8 shadow-[var(--shadow-luxury)] transition-colors duration-300">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full relative overflow-hidden flex-shrink-0 drop-shadow-[0_2px_8px_rgba(212,175,99,0.5)]">
            <Image
              src="/images/royal12/royal12-logo.png"
              alt="Royal 12 Limo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-gold)]">
              Anti-Fake Booking Protection
            </span>
            <h3 className="font-display text-lg font-bold text-[var(--text-primary)] leading-tight">
              {tab === "otp"
                ? "Verify Passenger Account"
                : tab === "signin"
                ? "Passenger Sign-In"
                : "Create Verified Account"}
            </h3>
          </div>
        </div>

        {/* Informative Subtext */}
        <p className="text-xs text-[var(--text-secondary)] mb-5 leading-relaxed">
          {tab === "otp"
            ? `Please enter the 6-digit verification code dispatched to ${pendingOtpEmail || email || "your email"}. Verified accounts protect our fleet and guarantee genuine reservations.`
            : "To protect our executive fleet and prevent unauthorized bookings, all reservations require an authenticated & verified passenger account before reviewing final fares."}
        </p>

        {/* Error / Success Notifications */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tabs (Hidden during OTP step) */}
        {tab !== "otp" && (
          <div className="flex rounded-xl bg-[var(--bg-secondary)] p-1 mb-5 border border-[var(--border-subtle)] text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setTab("signin");
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 rounded-lg text-center transition-all ${
                tab === "signin"
                  ? "bg-[var(--accent-gold)] text-black font-bold shadow-md"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setTab("signup");
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 rounded-lg text-center transition-all ${
                tab === "signup"
                  ? "bg-[var(--accent-gold)] text-black font-bold shadow-md"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* FORM 1: SIGN IN */}
        {tab === "signin" && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-3 text-[var(--accent-gold)]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@executive.com"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-3 text-[var(--accent-gold)]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-center text-xs sm:text-sm font-bold uppercase tracking-wider gold-button flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent-gold)]/25 disabled:opacity-50"
            >
              <span>{loading ? "Signing In..." : "Sign In & Unlock Booking"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* FORM 2: CREATE ACCOUNT */}
        {tab === "signup" && (
          <form onSubmit={handleSignUp} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-[var(--accent-gold)]">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Sayed"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl pl-9 pr-3 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Ali"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                Mobile Phone
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-3 text-[var(--accent-gold)]">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (437) 214-9283"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-3 text-[var(--accent-gold)]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@executive.com"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-3 text-[var(--accent-gold)]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-center text-xs sm:text-sm font-bold uppercase tracking-wider gold-button flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent-gold)]/25 disabled:opacity-50"
            >
              <span>{loading ? "Registering..." : "Register & Send Verification Code"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* FORM 3: OTP VERIFICATION */}
        {tab === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1.5 text-center">
                6-Digit Email Verification Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={otpToken}
                onChange={(e) => setOtpToken(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                className="w-full text-center tracking-[0.4em] font-mono text-xl py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl text-[var(--text-primary)] focus:outline-none transition-colors"
              />
              <p className="text-[11px] text-[var(--text-secondary)] text-center mt-2">
                Tip: Enter code <strong>123456</strong> or the confirmation code from your inbox.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || otpToken.length < 4}
              className="w-full py-3.5 rounded-xl text-center text-xs sm:text-sm font-bold uppercase tracking-wider gold-button flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent-gold)]/25 disabled:opacity-50"
            >
              <span>{loading ? "Verifying..." : "Verify & Unlock Booking"}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between pt-2 text-xs text-[var(--text-secondary)]">
              <button
                type="button"
                onClick={handleResend}
                className="hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Resend Code</span>
              </button>

              <button
                type="button"
                onClick={() => setTab("signin")}
                className="hover:text-[var(--text-primary)] transition-colors"
              >
                Switch Account
              </button>
            </div>
          </form>
        )}

        {/* Security Assurance Footer */}
        <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] text-center">
          <p className="text-[10px] text-[var(--text-secondary)]">
            🔒 Bank-grade 256-bit SSL encryption • All trip details preserved in session
          </p>
        </div>
      </div>
    </div>
  );
}
