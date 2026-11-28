"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Sparkles,
  Phone,
} from "lucide-react";

interface Message {
  sender: "user" | "assistant";
  text: string;
  time: string;
  action?: {
    type: "call" | "book" | "owner";
    label: string;
    target: string;
  };
}

function GmailLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top Red Envelope Flap */}
      <path
        d="M20 4H4C2.89543 4 2 4.89543 2 6V7.25L12 14.25L22 7.25V6C22 4.89543 21.1046 4 20 4Z"
        fill="#EA4335"
      />
      {/* Left Blue Pillar */}
      <path
        d="M2 7.25V18C2 19.1046 2.89543 20 4 20H6.5V11.1L2 7.25Z"
        fill="#4285F4"
      />
      {/* Right Green Pillar */}
      <path
        d="M22 7.25V18C22 19.1046 21.1046 20 20 20H17.5V11.1L22 7.25Z"
        fill="#34A853"
      />
      {/* Center Amber/Yellow Bottom */}
      <path
        d="M6.5 20H17.5V11.1L12 14.95L6.5 11.1V20Z"
        fill="#FBBC04"
      />
      {/* Center Crimson Fold Accent */}
      <path
        d="M6.5 11.1L12 14.95L17.5 11.1V7.5L12 11.35L6.5 7.5V11.1Z"
        fill="#C5221F"
      />
    </svg>
  );
}

function WhatsAppLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Official WhatsApp Emerald Green Badge */}
      <circle cx="16" cy="16" r="15" fill="#25D366" />
      {/* Crisp White Handset & Speech Bubble */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 6.5C10.753 6.5 6.5 10.753 6.5 16C6.5 17.822 7.012 19.526 7.897 20.978L7 25L11.233 23.89C12.632 24.717 14.264 25.197 16 25.197C21.247 25.197 25.5 20.944 25.5 15.697C25.5 10.45 21.247 6.5 16 6.5ZM13.435 11.469C13.226 10.983 13.026 10.964 12.817 10.954C12.645 10.945 12.445 10.945 12.255 10.945C12.055 10.945 11.731 11.021 11.465 11.307C11.198 11.602 10.437 12.326 10.437 13.802C10.437 15.278 11.512 16.706 11.664 16.906C11.816 17.106 13.748 20.239 16.794 21.43C19.336 22.42 19.85 22.22 20.402 22.172C20.954 22.125 22.182 21.448 22.439 20.744C22.696 20.039 22.696 19.439 22.62 19.315C22.544 19.191 22.344 19.115 22.049 18.972C21.754 18.829 20.278 18.096 20.002 17.991C19.726 17.886 19.526 17.839 19.326 18.134C19.126 18.439 18.555 19.115 18.384 19.315C18.212 19.515 18.041 19.534 17.746 19.391C17.451 19.248 16.498 18.934 15.345 17.905C14.45 17.105 13.84 16.115 13.669 15.82C13.488 15.515 13.65 15.353 13.8 15.201C13.933 15.068 14.105 14.849 14.248 14.677C14.4 14.496 14.448 14.373 14.543 14.173C14.648 13.963 14.6 13.792 14.524 13.64C14.448 13.497 13.877 12.078 13.435 11.469Z"
        fill="white"
      />
    </svg>
  );
}

function AiBotLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aiBotGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE082" />
          <stop offset="50%" stopColor="#F5A623" />
          <stop offset="100%" stopColor="#D48B1A" />
        </linearGradient>
      </defs>
      {/* Bot Crown / Antenna */}
      <path d="M12 2V5" stroke="url(#aiBotGold)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="2" r="1.5" fill="#38BDF8" />
      {/* Bot Head */}
      <rect x="3.5" y="5.5" width="17" height="13.5" rx="4.5" stroke="url(#aiBotGold)" strokeWidth="1.8" />
      {/* Ears */}
      <path d="M1.5 12H3.5M20.5 12H22.5" stroke="url(#aiBotGold)" strokeWidth="1.8" strokeLinecap="round" />
      {/* AI Glowing Eyes */}
      <circle cx="8.5" cy="11.5" r="1.5" fill="#38BDF8" />
      <circle cx="15.5" cy="11.5" r="1.5" fill="#38BDF8" />
      {/* AI Smile */}
      <path d="M9.5 15C10.3 15.8 11.1 16 12 16C12.9 16 13.7 15.8 14.5 15" stroke="url(#aiBotGold)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function AskRoyal12Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "assistant",
      text: "Hello, welcome to Royal 12 Limo! I am your 24/7 AI Chauffeur Concierge. How can I assist you with executive travel across Toronto and the GTA today?",
      time: "Just now",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Scroll-triggered prompt guard (Task 4)
  // Only triggers once per session (sessionStorage) & never interrupts active form input
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem("royal12_scroll_prompt_shown") === "true") {
      return;
    }

    const isInputActive = () => {
      const active = document.activeElement;
      if (!active) return false;
      const tag = active.tagName.toUpperCase();
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        (active as HTMLElement).isContentEditable
      );
    };

    const handleScroll = () => {
      if (sessionStorage.getItem("royal12_scroll_prompt_shown") === "true") {
        window.removeEventListener("scroll", handleScroll);
        return;
      }

      if (window.scrollY > 450) {
        if (!isInputActive() && !isOpen) {
          setShowScrollPrompt(true);
          sessionStorage.setItem("royal12_scroll_prompt_shown", "true");
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const quickPrompts = [
    "Car & Fleet Details",
    "Owner & Founder Info",
    "Toronto Pearson (YYZ) Airport",
    "Interac e-Transfer Payment",
    "24-Hour Cancellation Policy",
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputValue.trim();
    if (!q) return;

    const userMsg: Message = {
      sender: "user",
      text: q,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");

    const lower = q.toLowerCase();
    let reply = "";
    let action: Message["action"] | undefined = undefined;

    if (
      lower.includes("owner") ||
      lower.includes("founder") ||
      lower.includes("who owns") ||
      lower.includes("who is the owner") ||
      lower.includes("kamran") ||
      lower.includes("sayed") ||
      lower.includes("experience") ||
      lower.includes("management")
    ) {
      reply =
        "Royal 12 Limo is owned and founded by Sayed Kamran Ali, bringing 2+ years of dedicated luxury chauffeured livery experience in Mississauga and the Greater Toronto Area. Every reservation receives personal administrative oversight to ensure flawless chauffeur dispatch, punctuality, and executive VIP safety.";
      action = {
        type: "call",
        label: "Contact Sayed Kamran Ali (+1 437 214-9283)",
        target: "tel:+14372149283",
      };
    } else if (
      lower.includes("vehicle") ||
      lower.includes("car") ||
      lower.includes("suburban") ||
      lower.includes("fleet") ||
      lower.includes("color") ||
      lower.includes("colour") ||
      lower.includes("black") ||
      lower.includes("passenger") ||
      lower.includes("capacity")
    ) {
      reply =
        "Royal 12 operates exclusively with our premier all-black luxury SUV fleet: Black Chevrolet Suburban Premier, Black GMC Yukon Denali, and Black Cadillac Escalade ESV. Each vehicle accommodates up to 6 passengers with 6 large check-in bags, executive handcrafted leather seating, privacy glass, and tri-zone climate controls.";
      action = {
        type: "book",
        label: "Reserve Luxury SUV",
        target: "/#booking-quote-engine",
      };
    } else if (
      lower.includes("airport") ||
      lower.includes("pearson") ||
      lower.includes("yyz") ||
      lower.includes("billy bishop") ||
      lower.includes("flight")
    ) {
      reply =
        "We specialize in Toronto Pearson (YYZ, Terminal 1 & Terminal 3) and Billy Bishop (YTZ) airport livery. We track your flight in real-time, handle luggage curbside, and stage at official pre-arranged livery posts.";
      action = {
        type: "book",
        label: "Book Airport Transfer",
        target: "/#booking-quote-engine",
      };
    } else if (
      lower.includes("cancel") ||
      lower.includes("refund") ||
      lower.includes("policy")
    ) {
      reply =
        "24/7 Round-the-Clock Dispatch & Chauffeur Service: Free cancellation up to 24 hours prior to scheduled pickup. If a ride is cancelled after the 24-hour window (within 24 hours of pickup), a 30% cancellation fee will be deducted and the remaining 70% of the fare will be refunded.";
    } else if (
      lower.includes("pay") ||
      lower.includes("interac") ||
      lower.includes("stripe") ||
      lower.includes("paypal") ||
      lower.includes("rate") ||
      lower.includes("fare") ||
      lower.includes("price") ||
      lower.includes("cost")
    ) {
      reply =
        "We support Stripe (Visa/Mastercard/Amex/Apple Pay), PayPal, and direct Interac e-Transfer to royaltwelve.ca@gmail.com. Fares start at a transparent flat rate with Ontario HST (13%) included and optional gratuity.";
      action = {
        type: "book",
        label: "Calculate Live Route & Fare",
        target: "/#booking-quote-engine",
      };
    } else if (
      lower.includes("contact") ||
      lower.includes("phone") ||
      lower.includes("call") ||
      lower.includes("email") ||
      lower.includes("dispatch")
    ) {
      reply =
        "Our 24/7 direct telephone dispatch is +1 (437) 214-9283 and our business email is royaltwelve.ca@gmail.com. We are licensed in Mississauga, Ontario, serving the entire Greater Toronto Area.";
      action = {
        type: "call",
        label: "Call +1 (437) 214-9283",
        target: "tel:+14372149283",
      };
    } else {
      reply =
        "Thank you for contacting Royal 12. We are Mississauga and Toronto's premier black Chevrolet Suburban chauffeured service. How can I help you book or plan your itinerary today?";
      action = {
        type: "book",
        label: "Instant Online Booking",
        target: "/#booking-quote-engine",
      };
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          action,
        },
      ]);
    }, 350);
  };

  return (
    <>
      {/* Scroll-Triggered Proactive Concierge Popover */}
      {/* Positioned cleanly ABOVE the floating dock so it never collides or overlaps */}
      {showScrollPrompt && !isOpen && (
        <aside
          role="complementary"
          aria-label="Concierge Assistance"
          className="fixed bottom-[86px] right-3 sm:bottom-[92px] sm:right-6 z-40 max-w-[320px] sm:max-w-sm rounded-2xl bg-[var(--bg-modal)]/95 border border-[var(--accent-gold)]/40 p-4 shadow-[var(--shadow-luxury)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-gold)]/30 flex items-center justify-center flex-shrink-0">
                <AiBotLogo className="w-5 h-5 text-[var(--accent-gold)]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[var(--text-primary)]">Royal 12 AI Concierge</span>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
                    LIVE
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mt-1">
                  Planning executive travel or Pearson Airport livery? Sayed Kamran Ali & our dispatch team are ready to assist.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowScrollPrompt(false)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Dismiss assistance prompt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                setShowScrollPrompt(false);
                setIsOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider gold-button shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <AiBotLogo className="w-3.5 h-3.5 text-black" />
              <span>Ask AI Bot</span>
            </button>

            <a
              href="https://wa.me/14372149283?text=Hello%20Royal%20Twelve%20Limo%2C%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20chauffeur%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#25D366] hover:underline inline-flex items-center gap-1"
            >
              <WhatsAppLogo className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </aside>
      )}

      {/* Floating Side Dock (Visible when Chat is Closed) */}
      {!isOpen && (
        <>
          {/* 1. Mobile View: Unified, sleek bottom action dock */}
          <div className="sm:hidden fixed bottom-3 left-3 right-3 z-50 p-2 rounded-2xl bg-[var(--bg-modal)]/95 backdrop-blur-2xl border border-[var(--border-subtle)] shadow-[var(--shadow-luxury)] flex items-center justify-between gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* 1. AI Bot */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-card)] border border-[var(--accent-gold)]/50 active:scale-95 transition-transform cursor-pointer"
            >
              <div className="relative">
                <AiBotLogo className="w-5 h-5 text-[var(--accent-gold)]" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <span className="text-[10px] font-black uppercase text-[var(--accent-gold)] mt-0.5 tracking-tight">AI Bot</span>
            </button>

            {/* 2. WhatsApp */}
            <a
              href="https://wa.me/14372149283?text=Hello%20Royal%20Twelve%20Limo%2C%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20chauffeur%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#0E1F18] border border-[#25D366]/40 text-[#25D366] active:scale-95 transition-transform"
              title="Chat on WhatsApp"
            >
              <WhatsAppLogo className="w-5 h-5 text-[#25D366]" />
              <span className="text-[10px] font-bold text-[#25D366] mt-0.5 tracking-tight">WhatsApp</span>
            </a>

            {/* 3. Gmail */}
            <a
              href="mailto:royaltwelve.ca@gmail.com"
              className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] active:scale-95 transition-transform"
              title="Email Dispatch"
            >
              <GmailLogo className="w-5 h-5" />
              <span className="text-[10px] font-semibold text-[var(--text-secondary)] mt-0.5 tracking-tight">Gmail</span>
            </a>

            {/* 4. Direct Call */}
            <a
              href="tel:+14372149283"
              className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-emerald-400 active:scale-95 transition-transform"
              title="Call 24/7 Dispatch"
            >
              <div className="relative">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span className="text-[10px] font-bold text-[var(--text-primary)] mt-0.5 tracking-tight">Call 24/7</span>
            </a>
          </div>

          {/* 2. Desktop View: Sleek Floating Command Dock on Bottom-Right */}
          <div className="hidden sm:flex items-center gap-2 fixed bottom-6 right-6 z-50 p-2 rounded-full bg-[var(--bg-modal)]/95 backdrop-blur-2xl border border-[var(--border-subtle)] shadow-[var(--shadow-luxury)] ring-1 ring-white/10 transition-all duration-300">
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/14372149283?text=Hello%20Royal%20Twelve%20Limo%2C%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20chauffeur%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-[#0E1F18] border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366]/20 text-[#25D366] shadow-md hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] transition-all hover:scale-105"
              title="WhatsApp (+1 437 214-9283)"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppLogo className="w-6 h-6 transition-transform group-hover:scale-110 drop-shadow-sm" />
              <span className="dock-tooltip pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                WhatsApp Chat
              </span>
            </a>

            {/* Official Gmail Button */}
            <a
              href="mailto:royaltwelve.ca@gmail.com"
              className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[#EA4335] hover:bg-[var(--bg-card)] shadow-md hover:shadow-[0_0_15px_rgba(234,67,53,0.3)] transition-all hover:scale-105"
              title="Email: royaltwelve.ca@gmail.com"
              aria-label="Email Dispatch"
            >
              <GmailLogo className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="dock-tooltip pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                Email Dispatch
              </span>
            </a>

            {/* 24/7 Direct Call Button */}
            <a
              href="tel:+14372149283"
              className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-emerald-500 hover:bg-[var(--bg-card)] text-emerald-400 shadow-md hover:shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all hover:scale-105"
              title="Call Direct Chauffeur: +1 (437) 214-9283"
              aria-label="Call Dispatch"
            >
              <div className="relative">
                <Phone className="w-4 h-4 transition-transform group-hover:rotate-12" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <span className="dock-tooltip pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                Call (437) 214-9283
              </span>
            </a>

            {/* Divider */}
            <div className="w-[1px] h-6 bg-[var(--border-subtle)] mx-0.5" />

            {/* Stylish AI Concierge Bot Pill */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="group relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--bg-secondary)] via-[var(--bg-card)] to-[var(--bg-secondary)] border border-[var(--accent-gold)]/60 hover:border-[var(--accent-gold)] shadow-md hover:shadow-[0_0_20px_rgba(245,166,35,0.35)] transition-all hover:scale-105 cursor-pointer"
              aria-label="Open Royal 12 AI Concierge Bot"
            >
              <div className="relative flex items-center justify-center">
                <AiBotLogo className="w-5 h-5 text-[var(--accent-gold)] transition-transform group-hover:scale-110" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-cyan-400 font-extrabold">AI Bot</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                  Ask Concierge
                </span>
              </div>
            </button>
          </div>
        </>
      )}

      {/* Responsive Chat Window (Full Screen on Mobile, Popover on Desktop) */}
      {isOpen && (
        <div className="fixed inset-x-2 bottom-2 top-16 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 sm:h-[540px] max-w-sm rounded-3xl bg-[var(--bg-modal)] border border-[var(--border-subtle)] shadow-[var(--shadow-luxury)] flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50 transition-colors">
          {/* Header */}
          <div className="p-4 bg-[var(--bg-card)] border-b border-[var(--border-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-gold)]/40 flex items-center justify-center text-[var(--accent-gold)] shadow-sm">
                <AiBotLogo className="w-6 h-6 text-[var(--accent-gold)]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-display text-sm font-extrabold text-[var(--text-primary)] tracking-wide">
                    Royal 12 AI Concierge
                  </h4>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-cyan-400/15 text-cyan-400 border border-cyan-400/30 px-1.5 rounded-full">
                    AI
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Sayed Kamran Ali & Dispatch Connected</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div className={`flex items-end gap-2 max-w-[92%] ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {m.sender === "assistant" && (
                    <div className="w-6 h-6 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent-gold)]/40 flex items-center justify-center flex-shrink-0 mb-1">
                      <AiBotLogo className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                    </div>
                  )}
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed ${
                      m.sender === "user"
                        ? "bg-[var(--accent-gold)] text-black font-semibold rounded-br-none shadow-md"
                        : "bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-bl-none shadow-md"
                    }`}
                  >
                    <p>{m.text}</p>

                    {/* Optional Action Button inside Message */}
                    {m.action && (
                      <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)]">
                        <a
                          href={m.action.target}
                          onClick={() => {
                            if (m.action?.target.startsWith("/#")) {
                              setIsOpen(false);
                            }
                          }}
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[var(--accent-gold)] hover:underline transition-colors"
                        >
                          <span>{m.action.label}</span>
                          <span>→</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-[var(--text-secondary)] mt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-[var(--bg-card)] border-t border-[var(--border-subtle)] flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(p)}
                className="whitespace-nowrap text-[10px] px-2.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-black transition-colors flex-shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-[var(--bg-card)] border-t border-[var(--border-subtle)] flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about rates, owner, Jet Black Suburban..."
              className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              className="w-9 h-9 rounded-xl gold-button flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0"
            >
              <Send className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
