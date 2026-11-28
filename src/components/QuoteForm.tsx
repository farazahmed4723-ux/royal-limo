"use client";

import { useState } from "react";
import { Phone, Calendar, Clock, MapPin, Users, Briefcase, Car, Plane, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

interface QuoteFormProps {
  isAirport?: boolean;
  defaultService?: string;
  title?: string;
  subtitle?: string;
}

export default function QuoteForm({
  isAirport = false,
  defaultService = "Chauffeur Service",
  title = "Request a Guaranteed Flat-Rate Quote",
  subtitle = "We confirm every flat rate before you book. No hidden fees, no surge pricing.",
}: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    passengers: "2",
    luggage: "2",
    vehicle: "Black Chevrolet Suburban Premier (Up to 7 Pass / 7 Bags)",
    flightNumber: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          serviceName: defaultService,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit quote request.");
      }

      setQuoteId(data.quoteId || "Q-CONFIRMED");
      setSubmitted(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Please call dispatch directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-card)] border-2 border-[var(--accent-gold)] shadow-2xl text-center space-y-5 animate-in fade-in duration-500">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
            Quote Reference: {quoteId}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Quote Request Received
          </h3>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg mx-auto">
            Thank you, <strong className="text-[var(--text-primary)]">{formData.name}</strong>! Your route details have been transmitted directly to dispatch.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto space-y-1.5 text-left">
          <div className="flex justify-between">
            <span className="font-medium text-[var(--text-primary)]">Next Step:</span>
            <span className="text-[var(--accent-gold)] font-bold">Flat-Rate Confirmation</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-[var(--text-primary)]">Reply Time:</span>
            <span>Within 2 business hours</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-[var(--text-primary)]">Destination Email:</span>
            <span className="truncate">{formData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-[var(--text-primary)]">Route:</span>
            <span className="truncate max-w-[200px]">{formData.pickup} → {formData.dropoff}</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="tel:+14372149283"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--bg-secondary)] border border-[var(--accent-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-black transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Need Urgent Ride? Call +1 (437) 214-9283</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                phone: "",
                email: "",
                pickup: "",
                dropoff: "",
                date: "",
                time: "",
                passengers: "2",
                luggage: "2",
                vehicle: "Black Chevrolet Suburban Premier (Up to 7 Pass / 7 Bags)",
                flightNumber: "",
                notes: "",
              });
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            Submit Another Route
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="mb-8 text-left space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[11px] font-bold uppercase tracking-wider text-[var(--accent-gold)]">
          <Car className="w-3.5 h-3.5" />
          <span>{defaultService} • Flat Rate Guaranteed</span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          {subtitle} We reply with a guaranteed flat rate quote within 2 business hours.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        {/* Row 1: Pickup & Dropoff */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)] mb-1.5">
              Pickup Address / Airport <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--accent-gold)]" />
              <input
                type="text"
                required
                placeholder="e.g. Toronto Pearson (YYZ) or Mississauga address"
                value={formData.pickup}
                onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)] mb-1.5">
              Drop-off Destination <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--accent-gold)]" />
              <input
                type="text"
                required
                placeholder="e.g. Downtown Toronto Hotel, Residence, or FBO"
                value={formData.dropoff}
                onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Date, Time & Optional Flight Number */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${isAirport ? "lg:grid-cols-3" : ""} gap-4`}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
              Trip Date <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--accent-gold)]" />
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
              Pickup Time <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--accent-gold)]" />
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none"
              />
            </div>
          </div>

          {isAirport && (
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Flight Number (Tracking Included)
              </label>
              <div className="relative">
                <Plane className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--accent-gold)]" />
                <input
                  type="text"
                  placeholder="e.g. AC 854 / WS 231"
                  value={formData.flightNumber}
                  onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none uppercase"
                />
              </div>
            </div>
          )}
        </div>

        {/* Row 3: Passengers, Luggage, Vehicle Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
              Passengers
            </label>
            <div className="relative">
              <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--accent-gold)]" />
              <select
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Passenger" : "Passengers"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
              Luggage Pieces
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--accent-gold)]" />
              <select
                value={formData.luggage}
                onChange={(e) => setFormData({ ...formData, luggage: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Bag" : "Bags"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
              Vehicle Preference
            </label>
            <div className="relative">
              <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--accent-gold)]" />
              <select
                value={formData.vehicle}
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none"
              >
                <option value="Black Chevrolet Suburban Premier (7 pass / 7 bags)">
                  Black Chevrolet Suburban (7 pass / 7 bags)
                </option>
                <option value="Black GMC Yukon Denali (7 pass / 7 bags)">
                  Black GMC Yukon Denali (7 pass / 7 bags)
                </option>
                <option value="Black Cadillac Escalade ESV (7 pass / 7 bags)">
                  Black Cadillac Escalade ESV (7 pass / 7 bags)
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 4: Contact Details (Name, Phone, Email) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[var(--border-subtle)]">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)] mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)] mb-1.5">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+1 (437) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)] mb-1.5">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Row 5: Notes & Special Requests */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
            Special Requests / Child Seats / Flight Details
          </label>
          <textarea
            rows={3}
            placeholder="Provide any additional stops, child safety seat requests, or specific itinerary notes..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none"
          />
        </div>

        {/* Submit Actions */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest gold-button shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isSubmitting ? "Transmitting..." : "Get Flat Rate Quote"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
            <span>Direct 24/7 Dispatch:</span>
            <a
              href="tel:+14372149283"
              className="text-[var(--accent-gold)] font-bold hover:underline inline-flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+1 (437) 214-9283</span>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
