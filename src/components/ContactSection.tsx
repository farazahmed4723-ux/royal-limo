"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import ScrollReveal, { StaggerContainer, PopItem, PopCard } from "./ScrollReveal";

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Airport Transfer (YYZ/YTZ)",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#08090B] relative border-t border-white/5">
      <section id="contact" className="py-24 bg-[#08090B] relative border-t border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 space-y-8 text-left">
              {/* Left Column: Direct Info with Spring Pop */}
              <ScrollReveal direction="left" distance={45} className="lg:col-span-5 space-y-8 text-left">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF63]">
                    Connect With Dispatch
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F3EF] mt-2">
                    We Are At Your Service
                  </h2>
                  <p className="text-sm text-[#A1A1AA] mt-3 leading-relaxed">
                    Whether you need urgent airport dispatch, corporate account inquiries, or customized
                    multi-day itineraries across Ontario, our executive team is available 24/7.
                  </p>
                </div>

                <div className="space-y-4">
                  <StaggerContainer staggerDelay={0.1} className="space-y-4">
                    {/* Phone */}
                    <a
                      href="tel:+14372149283"
                      className="flex items-start gap-4 p-4 rounded-2xl bg-[#0D131F] border border-white/10 hover:border-[#D4AF63]/40 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#141E2F] border border-[#D4AF63]/30 flex items-center justify-center text-[#D4AF63] flex-shrink-0 group-hover:bg-[#D4AF63] group-hover:text-black transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-[#A1A1AA] uppercase tracking-wider">
                          24/7 Telephone & Dispatch
                          <PopItem yDistance={30} hoverElevation={-6}>
                            <a
                              href="tel:+14372149283"
                              className="flex items-start gap-4 p-4 rounded-2xl bg-[#0D131F] border border-white/10 hover:border-[#D4AF63]/40 transition-colors group shadow-lg"
                            >
                              <div className="w-12 h-12 rounded-xl bg-[#141E2F] border border-[#D4AF63]/30 flex items-center justify-center text-[#D4AF63] flex-shrink-0 group-hover:bg-[#D4AF63] group-hover:text-black transition-colors">
                                <Phone className="w-5 h-5" />
                              </div>
                              <div className="text-base font-bold text-white group-hover:text-[#D4AF63] transition-colors mt-0.5">
                                +1 (437) 214-9283
                                <div>
                                  <div className="text-xs text-[#A1A1AA] uppercase tracking-wider">
                                    24/7 Telephone & Dispatch
                                  </div>
                                  <div className="text-base font-bold text-white group-hover:text-[#D4AF63] transition-colors mt-0.5">
                                    +1 (437) 214-9283
                                  </div>
                                  <div className="text-[11px] text-[#D4AF63] mt-0.5">
                                    Click to Call Now
                                  </div>
                                </div>
                                <div className="text-[11px] text-[#D4AF63] mt-0.5">
                                  Click to Call Now
                                </div>
                              </div>
                            </a>
                          </a>
                        </PopItem>

                        {/* Email */}
                        <a
                          href="mailto:royaltwelve.ca@gmail.com"
                          className="flex items-start gap-4 p-4 rounded-2xl bg-[#0D131F] border border-white/10 hover:border-[#D4AF63]/40 transition-colors group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-[#141E2F] border border-[#D4AF63]/30 flex items-center justify-center text-[#D4AF63] flex-shrink-0 group-hover:bg-[#D4AF63] group-hover:text-black transition-colors">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs text-[#A1A1AA] uppercase tracking-wider">
                              Business Inquiries & Quotes
                              <PopItem yDistance={30} hoverElevation={-6}>
                                <a
                                  href="mailto:royaltwelve.ca@gmail.com"
                                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#0D131F] border border-white/10 hover:border-[#D4AF63]/40 transition-colors group shadow-lg"
                                >
                                  <div className="w-12 h-12 rounded-xl bg-[#141E2F] border border-[#D4AF63]/30 flex items-center justify-center text-[#D4AF63] flex-shrink-0 group-hover:bg-[#D4AF63] group-hover:text-black transition-colors">
                                    <Mail className="w-5 h-5" />
                                  </div>
                                  <div className="text-base font-bold text-white group-hover:text-[#D4AF63] transition-colors mt-0.5">
                                    royaltwelve.ca@gmail.com
                                    <div>
                                      <div className="text-xs text-[#A1A1AA] uppercase tracking-wider">
                                        Business Inquiries & Quotes
                                      </div>
                                      <div className="text-base font-bold text-white group-hover:text-[#D4AF63] transition-colors mt-0.5">
                                        royaltwelve.ca@gmail.com
                                      </div>
                                      <div className="text-[11px] text-[#A1A1AA] mt-0.5">
                                        Replies within 15 minutes
                                      </div>
                                    </div>
                                    <div className="text-[11px] text-[#A1A1AA] mt-0.5">
                                      Replies within 15 minutes
                                    </div>
                                  </div>
                                </a>
                              </a>
                            </PopItem>

                            {/* Location */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0D131F] border border-white/10">
                              <div className="w-12 h-12 rounded-xl bg-[#141E2F] border border-[#D4AF63]/30 flex items-center justify-center text-[#D4AF63] flex-shrink-0">
                                <MapPin className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-xs text-[#A1A1AA] uppercase tracking-wider">
                                  Licensing & Primary Operations
                                  <PopItem yDistance={30} hoverElevation={-6}>
                                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0D131F] border border-white/10 shadow-lg">
                                      <div className="w-12 h-12 rounded-xl bg-[#141E2F] border border-[#D4AF63]/30 flex items-center justify-center text-[#D4AF63] flex-shrink-0">
                                        <MapPin className="w-5 h-5" />
                                      </div>
                                      <div className="text-sm font-bold text-white mt-0.5">
                                        Mississauga, Ontario, Canada
                                        <div>
                                          <div className="text-xs text-[#A1A1AA] uppercase tracking-wider">
                                            Licensing & Primary Operations
                                          </div>
                                          <div className="text-sm font-bold text-white mt-0.5">
                                            Mississauga, Ontario, Canada
                                          </div>
                                          <div className="text-xs text-[#A1A1AA] mt-0.5">
                                            Servicing Greater Toronto Area (GTA)
                                          </div>
                                        </div>
                                        <div className="text-xs text-[#A1A1AA] mt-0.5">
                                          Servicing Greater Toronto Area (GTA)
                                        </div>
                                      </div>
                                    </div>
                                </div>
                              </PopItem>
                            </StaggerContainer>

                            <div className="p-4 rounded-2xl bg-[#101826]/70 border border-[#D4AF63]/25 flex items-center gap-3">
                              <ShieldCheck className="w-5 h-5 text-[#D4AF63] flex-shrink-0" />
                              <div className="text-xs text-[#F5F3EF]">
                                All bookings subject to manual administrative review and confirmation.
                              </div>
                            </div>
                          </div>
                        </ScrollReveal>

                        {/* Right Column: Inquiry Form */}
                        <div className="lg:col-span-7">
                          {/* Right Column: Inquiry Form with PopCard */}
                          <PopCard delay={0.15} yDistance={45} hoverY={-4} className="lg:col-span-7">
                            <div className="rounded-3xl bg-[#0C121E] border border-[#D4AF63]/30 p-8 sm:p-10 shadow-2xl">
                              <h3 className="font-display text-2xl font-bold text-white">
                                Request a Custom Quote or Chauffeur Inquiry
                              </h3>
                              <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1.5 mb-6">
                                Fill in your details below and our executive dispatcher will reply promptly.
                              </p>

                              {formSubmitted ? (
                                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                                  <h4 className="font-display text-xl font-bold text-white">
                                    Inquiry Received
                                  </h4>
                                  <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-md mx-auto">
                                    Thank you. Our dispatch team has received your message and will contact you at{" "}
                                    <span className="text-[#D4AF63]">{formData.email || "your email"}</span> shortly.
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => setFormSubmitted(false)}
                                    className="mt-4 px-5 py-2 rounded-full text-xs font-semibold gold-button"
                                  >
                                    Send Another Message
                                  </button>
                                </div>
                              ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1.5">
                                        Full Name
                                      </label>
                                      <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Alexander Wright"
                                        className="w-full bg-[#101826] border border-white/15 focus:border-[#D4AF63] rounded-xl px-4 py-3 text-sm text-white placeholder-[#71717A] focus:outline-none transition-all"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1.5">
                                        Phone Number
                                      </label>
                                      <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+1 (416) 000-0000"
                                        className="w-full bg-[#101826] border border-white/15 focus:border-[#D4AF63] rounded-xl px-4 py-3 text-sm text-white placeholder-[#71717A] focus:outline-none transition-all"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1.5">
                                        Email Address
                                      </label>
                                      <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="client@company.com"
                                        className="w-full bg-[#101826] border border-white/15 focus:border-[#D4AF63] rounded-xl px-4 py-3 text-sm text-white placeholder-[#71717A] focus:outline-none transition-all"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1.5">
                                        Requested Service
                                      </label>
                                      <select
                                        value={formData.service}
                                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                        className="w-full bg-[#101826] border border-white/15 focus:border-[#D4AF63] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all"
                                      >
                                        <option value="Airport Transfer (YYZ/YTZ)" className="bg-[#090D15]">
                                          Airport Transfer (YYZ/YTZ)
                                        </option>
                                        <option value="Corporate / Financial Roadshow" className="bg-[#090D15]">
                                          Corporate / Financial Roadshow
                                        </option>
                                        <option value="Hourly Chauffeur Service" className="bg-[#090D15]">
                                          Hourly Chauffeur Service
                                        </option>
                                        <option value="Special Event / Gala" className="bg-[#090D15]">
                                          Special Event / Gala
                                        </option>
                                        <option value="City-to-City Long Distance" className="bg-[#090D15]">
                                          City-to-City Long Distance
                                        </option>
                                        <option value="Other Bespoke Requirement" className="bg-[#090D15]">
                                          Other Bespoke Requirement
                                        </option>
                                      </select>
                                    </div>
                                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl text-center text-xs sm:text-sm font-bold uppercase tracking-wider gold-button flex items-center justify-center gap-2 shadow-xl shadow-[var(--accent-gold)]/25 disabled:opacity-60"
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
