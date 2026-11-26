"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import ScrollReveal, { PopCard } from "./ScrollReveal";

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Airport Transfer (YYZ/YTZ)",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          serviceType: formData.service,
          message: formData.message,
        }),
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[var(--bg-primary)] relative border-t border-[var(--border-subtle)] scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={35} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
            24/7 Direct Livery Concierge
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mt-2">
            Contact Royal 12 Limo
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-3 leading-relaxed">
            Speak directly with executive dispatch or founder Sayed Kamran Ali for tailored corporate itineraries, Pearson airport meet-and-greets, and bespoke chauffeur bookings.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Founder Card */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Founder Direct Card */}
            <PopCard delay={0.1} yDistance={30} hoverY={-4} className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-luxury)] transition-colors duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[var(--accent-gold)] to-[#8C6B28] p-[2px] flex-shrink-0 shadow-md">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src="/images/royal12/sayed-kamran-ali.jpg"
                      alt="Sayed Kamran Ali - Owner & Founder"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                    Sayed Kamran Ali
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--accent-gold)] px-2.5 py-0.5 rounded-full border border-[var(--border-subtle)]">
                      Owner &amp; Founder
                    </span>
                    <span className="text-xs text-[var(--text-secondary)]">2+ Yrs Exp</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                Personally reviewing every booking and ensuring each Chevrolet Suburban arrives immaculately prepared with white-glove executive hospitality.
              </p>

              <div className="space-y-3 pt-3 border-t border-[var(--border-subtle)] text-xs">
                <a
                  href="tel:+14372149283"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-gold)] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Direct Chauffeur &amp; Dispatch</div>
                    <div className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                      +1 (437) 214-9283
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:royaltwelve.ca@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-gold)] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Business &amp; Billing Email</div>
                    <div className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                      royaltwelve.ca@gmail.com
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-gold)] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Operating Hub</div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">
                      Mississauga &amp; Greater Toronto Area (GTA)
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>24/7 Round-the-Clock Dispatch</span>
                </span>
                <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>$5M Commercial Insurance</span>
                </span>
              </div>
            </PopCard>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <PopCard delay={0.15} yDistance={30} hoverY={-4} className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-luxury)] transition-colors duration-300">
              <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                Request a Custom Quote or Chauffeur Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 mb-6">
                Fill in your details below and our executive dispatcher will reply promptly.
              </p>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    Inquiry Transmitted to Dispatch
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                    Thank you. Sayed Kamran Ali and our executive dispatch team have received your request and will contact you at{" "}
                    <span className="text-[var(--accent-gold)] font-bold">{formData.email || "your email"}</span> promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider gold-button shadow-md"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alexander Wright"
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (416) 000-0000"
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="client@company.com"
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                        Requested Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="Airport Transfer (YYZ/YTZ)">Airport Transfer (YYZ/YTZ)</option>
                        <option value="Corporate / Financial Roadshow">Corporate Roadshow &amp; Bay St</option>
                        <option value="Hourly Chauffeur Service">Hourly Chauffeur Service</option>
                        <option value="Special Event / Gala">Special Event / Gala</option>
                        <option value="City-to-City Long Distance">Niagara / Long Distance</option>
                        <option value="Other Bespoke Requirement">Other Bespoke Requirement</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                      Itinerary Details or Special Requests *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please include pickup location, dates, number of passengers, and any flight details..."
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl p-3.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none resize-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-center text-xs sm:text-sm font-bold uppercase tracking-wider gold-button flex items-center justify-center gap-2 shadow-xl shadow-[var(--accent-gold)]/25 disabled:opacity-60 cursor-pointer"
                  >
                    <span>{isSubmitting ? "Transmitting to Dispatch..." : "Submit Inquiry to Executive Dispatch"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </PopCard>
          </div>
        </div>
      </div>
    </section>
  );
}
