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

function GmailLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z"
        fill="#1A2332"
      />
      <path
        d="M20 4H4C2.89543 4 2 4.89543 2 6V7.5L12 13.5L22 7.5V6C22 4.89543 21.1046 4 20 4Z"
        fill="#EA4335"
      />
      <path
        d="M2 7.5V18C2 19.1046 2.89543 20 4 20H8V11.5L2 7.5Z"
        fill="#4285F4"
      />
      <path
        d="M22 7.5V18C22 19.1046 21.1046 20 20 20H16V11.5L22 7.5Z"
        fill="#34A853"
      />
      <path
        d="M8 20H16V11.5L12 14L8 11.5V20Z"
        fill="#FBBC04"
      />
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
      {/* Scroll-Triggered Proactive Concierge Popover (Task 4) */}
      {/* Triggers once per session, never interrupts active form input, uses luxury variables */}
      {showScrollPrompt && !isOpen && (
        <aside
          role="complementary"
          aria-label="Concierge Assistance"
          className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-50 max-w-xs sm:max-w-sm rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 shadow-[var(--shadow-luxury)] animate-in fade-in slide-in-from-bottom-3 duration-300 transition-colors"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-gold)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[var(--text-primary)]">
                    Royal 12 Concierge
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--accent-gold)] px-1.5 py-0.5 rounded-full border border-[var(--border-subtle)]">
                    Live
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Planning executive travel or Pearson Airport livery? Sayed Kamran Ali & our dispatch team are ready to assist.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowScrollPrompt(false)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 rounded-lg transition-colors"
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
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider gold-button shadow-sm"
            >
              Ask Concierge
            </button>

            <a
              href="tel:+14372149283"
              className="text-xs font-semibold text-[var(--accent-gold)] hover:underline inline-flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>Call Dispatch</span>
            </a>
          </div>
        </aside>
      )}

      {/* Floating Side Dock (Visible when Chat is Closed) */}
      {!isOpen && (
        <>
          {/* 1. Mobile View: Sleek floating bottom action bar */}
          <div className="sm:hidden fixed bottom-3 left-3 right-3 z-50 bg-[var(--bg-modal)]/95 backdrop-blur-xl border border-[var(--border-subtle)] rounded-2xl p-2.5 shadow-[var(--shadow-luxury)] flex flex-col gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Top Row: Direct Call and Ask Royal 12 */}
            <div className="flex items-center gap-2">
              <a
                href="tel:+14372149283"
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] active:scale-95 transition-transform"
              >
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <span className="text-xs font-bold text-[var(--text-primary)] tracking-tight">+1 (437) 214-9283</span>
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl gold-button active:scale-95 transition-transform shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span className="text-xs font-black tracking-wide">Ask Royal 12</span>
              </button>
            </div>

            {/* Bottom Row: Official Gmail with Logo */}
            <a
              href="mailto:royaltwelve.ca@gmail.com"
              className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] active:scale-95 transition-all"
            >
              <GmailLogo className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-semibold text-[var(--accent-gold)] tracking-wide">
                royaltwelve.ca@gmail.com
              </span>
            </a>
          </div>

          {/* 2. Desktop View: Floating side dock on bottom-right */}
          <div className="hidden sm:flex flex-col items-end gap-2 fixed bottom-6 right-6 z-50">
            {/* Gmail Pill */}
            <a
              href="mailto:royaltwelve.ca@gmail.com"
              className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--bg-modal)]/95 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] backdrop-blur-xl shadow-[var(--shadow-luxury)] transition-all duration-300 hover:scale-105"
              title="Official Business Email: royaltwelve.ca@gmail.com"
            >
              <GmailLogo className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                royaltwelve.ca@gmail.com
              </span>
            </a>

            {/* Phone Pill */}
            <a
              href="tel:+14372149283"
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--bg-modal)]/95 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] backdrop-blur-xl shadow-[var(--shadow-luxury)] transition-all duration-300 hover:scale-105"
              title="Direct Chauffeur Line: +1 (437) 214-9283"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-500">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-[var(--text-secondary)] uppercase tracking-wider">24/7 Direct Chauffeur</span>
                <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                  +1 (437) 214-9283
                </span>
              </div>
            </a>

            {/* AI Agent Trigger */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="group relative flex items-center gap-3 px-5 py-3 rounded-full bg-[var(--bg-modal)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] text-[var(--text-primary)] shadow-[var(--shadow-luxury)] transition-all duration-300 hover:scale-105 focus:outline-none"
              aria-label="Open Ask Royal 12 Assistant"
            >
              <div className="relative">
                <Sparkles className="w-5 h-5 text-[var(--accent-gold)] group-hover:rotate-12 transition-transform" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black animate-pulse" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 24/7 AI Concierge
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                  Ask Royal 12
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
              <div className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-gold)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-[var(--text-primary)] tracking-wide">
                  Ask Royal 12 Concierge
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online • Owner & Dispatch Connected</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
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
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"
                  }`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed ${m.sender === "user"
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
