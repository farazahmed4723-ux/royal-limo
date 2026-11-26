"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Car,
  Receipt,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Copy,
  ShieldCheck,
  ArrowRight,
  Plane,
  Lock,
  UserCheck,
} from "lucide-react";
import { BookingData } from "./BookingWidget";
import InteractiveRouteMap from "./InteractiveRouteMap";
import ScrollReveal, { PopCard } from "./ScrollReveal";
import { useAuth } from "@/context/AuthContext";

interface BookingQuoteEngineProps {
  initialData?: BookingData | null;
}

export default function BookingQuoteEngine({ initialData }: BookingQuoteEngineProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const { user, isVerified, openAuthModal, saveTripDraft, getTripDraft } = useAuth();

  // Form states
  const [pickup, setPickup] = useState(
    initialData?.pickup || "Toronto Pearson International Airport (YYZ), Terminal 1"
  );
  const [dropoff, setDropoff] = useState(
    initialData?.dropoff || "Fairmont Royal York, 100 Front St W, Toronto, ON"
  );
  const [date, setDate] = useState(initialData?.date || "");
  useEffect(() => {
    if (!date) {
      const t = setTimeout(() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        setDate(d.toISOString().split("T")[0]);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [date]);
  const [time, setTime] = useState(initialData?.time || "14:00");
  const [vehicle, setVehicle] = useState(
    initialData?.vehicle || "Black Chevrolet Suburban Premier"
  );
  const [passengers, setPassengers] = useState(initialData?.passengers || 2);
  const [luggage, setLuggage] = useState(initialData?.luggage || 2);
  const [flightNumber, setFlightNumber] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Customer Contact
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Restore saved trip draft asynchronously on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      const draft = getTripDraft();
      if (draft) {
        if (draft.pickup && !initialData?.pickup) setPickup(draft.pickup);
        if (draft.dropoff && !initialData?.dropoff) setDropoff(draft.dropoff);
        if (draft.date && !initialData?.date) setDate(draft.date);
        if (draft.time && !initialData?.time) setTime(draft.time);
        if (draft.vehicle && !initialData?.vehicle) setVehicle(draft.vehicle);
        if (draft.passengers) setPassengers(draft.passengers);
        if (draft.luggage) setLuggage(draft.luggage);
        if (draft.flightNumber) setFlightNumber(draft.flightNumber);
        if (draft.specialRequests) setSpecialRequests(draft.specialRequests);
        if (draft.customerName) setCustomerName(draft.customerName);
        if (draft.customerEmail) setCustomerEmail(draft.customerEmail);
        if (draft.customerPhone) setCustomerPhone(draft.customerPhone);
      }
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-populate customer fields when authenticated user profile is available
  useEffect(() => {
    if (user) {
      const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
      const t = setTimeout(() => {
        if (fullName && !customerName) setCustomerName(fullName);
        if (user.email && !customerEmail) setCustomerEmail(user.email);
        if (user.phone && !customerPhone) setCustomerPhone(user.phone);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [user, customerName, customerEmail, customerPhone]);

  // Live Google Route Calculation State
  const [tripDistanceKm, setTripDistanceKm] = useState(26.7);
  const [tripDurationMin, setTripDurationMin] = useState(25);
  const [routePolyline, setRoutePolyline] = useState("");
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);

  // Pricing calculations
  const [tipPercent, setTipPercent] = useState<0 | 10 | 20>(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal" | "interac">("stripe");
    const [copiedEmail, setCopiedEmail] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [bookingRef, setBookingRef] = useState("R12-784920");

  // Call real Google Routes API on mount or route changes
  useEffect(() => {
    if (!pickup.trim() || !dropoff.trim()) return;

    let isMounted = true;
    const startTimer = setTimeout(() => {
      if (isMounted) {
        setIsCalculatingRoute(true);
        setRouteError(null);
      }
    }, 0);

    fetch("/api/routes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin: pickup, destination: dropoff }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        setIsCalculatingRoute(false);
        if (data.success) {
          setTripDistanceKm(data.distanceKm);
          setTripDurationMin(data.durationMin);
          setRoutePolyline(data.polyline);
        } else {
          setRouteError(data.error || "Could not calculate direct driving route.");
        }
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        setIsCalculatingRoute(false);
        console.error("Route fetch error:", err);
      });

    return () => {
      isMounted = false;
      clearTimeout(startTimer);
    };
  }, [pickup, dropoff]);

  // Populate default tomorrow date asynchronously on client mount (Next.js 16 + React 19 safe)
  useEffect(() => {
    if (!date) {
      const t = setTimeout(() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        setDate(d.toISOString().split("T")[0]);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [date]);

  // Dynamic Fare Calculation (Server-side model emulation)
  // Distance pricing: Base fare ($110) + $3.25/km after 10 km
  const baseJourneyFare = Math.max(110, 110 + (tripDistanceKm > 10 ? (tripDistanceKm - 10) * 3.25 : 0));
  const discountAmount = couponApplied ? baseJourneyFare * 0.1 : 0;
  const taxableFare = baseJourneyFare - discountAmount;
  const hstTax = taxableFare * 0.13; // Ontario 13% HST
  const subtotalWithTax = taxableFare + hstTax;
  const tipAmount = subtotalWithTax * (tipPercent / 100);
  const finalPayableTotal = subtotalWithTax + tipAmount;
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "ROYAL12VIP" || couponCode.toUpperCase() === "ROYAL10") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code. Try 'ROYAL12VIP'");
    }
  };

  const handleSignInAndReview = () => {
    saveTripDraft({
      pickup,
      dropoff,
      date,
      time,
      vehicle,
      passengers,
      luggage,
      flightNumber,
      specialRequests,
      customerName,
      customerEmail,
      customerPhone,
    });
    openAuthModal("signin");
  };

  const handleCompleteBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("Please accept the 24/7 service terms and 24-hour cancellation policy to proceed.");
      return;
    }
    if (!user || !isVerified) {
      alert("Account verification required. Please sign in or verify your account to confirm this reservation.");
      handleSignInAndReview();
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const generatedRef = "R12-" + Math.floor(100000 + Math.random() * 900000);
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          isVerified: true,
          bookingRef: generatedRef,
          pickup,
          dropoff,
          date,
          time,
          vehicle,
          passengers,
          luggage,
          flightNumber,
          specialRequests,
          customerName,
          customerEmail,
          customerPhone,
          tripDistanceKm,
          tripDurationMin,
          baseFare: baseJourneyFare,
          tax: hstTax,
          tipAmount,
          fareAmount: finalPayableTotal,
          totalFare: finalPayableTotal,
          paymentMethod,
          paymentStatus: "Pending Verification",
          policyAgreed: true,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBookingRef(data.bookingRef || generatedRef);
        setStep(4);
      } else {
        setSubmitError(data.error || "Failed to confirm reservation. Please try again.");
      }
    } catch (err: unknown) {
      console.error("Booking submission error:", err);
      setSubmitError("Network error while confirming booking. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyInteracEmail = () => {
    navigator.clipboard.writeText("royaltwelve.ca@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="booking-quote-engine" className="py-24 bg-[var(--bg-primary)] relative border-t border-[var(--border-subtle)] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Spring Pop */}
        <ScrollReveal direction="up" distance={35} className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
            Verified Route & Transparent Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-2">
            Chauffeur Booking & Quote Engine
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">
            Real driving route estimation, guaranteed flat pricing, and manual administrative confirmation.
          </p>
        </ScrollReveal>

        {/* Stepper Progress */}
        <PopCard delay={0.1} yDistance={25} hoverY={-2} className="flex items-center justify-between max-w-xl mx-auto mb-10 text-xs">
          {[
            { num: 1, label: "Route & Quote" },
            { num: 2, label: "Passenger Info" },
            { num: 3, label: "Payment Preference" },
            { num: 4, label: "Confirmation" },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold transition-colors ${step === s.num
                  ? "bg-[var(--accent-gold)] text-black shadow-lg shadow-[var(--accent-gold)]/30"
                  : step > s.num
                    ? "bg-emerald-500 text-black"
                    : "bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                  }`}
              >
                {step > s.num ? "✓" : s.num}
              </div>
              <span
                className={`text-[11px] mt-1.5 font-medium ${step === s.num ? "text-[var(--accent-gold)]" : "text-[var(--text-secondary)]"
                  }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </PopCard>

        {/* STEP 1: ROUTE & QUOTE BREAKDOWN */}
        {step === 1 && (
          <div className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 sm:p-10 shadow-[var(--shadow-luxury)] transition-colors duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Route Form Left */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[var(--accent-gold)]" />
                  <span>Trip Route & Vehicle Specifications</span>
                </h3>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                      Pickup Address (GTA / Airport)
                    </label>
                    <input
                      type="text"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                      Drop-off Address
                    </label>
                    <input
                      type="text"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                        Pickup Time
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)]"
                      />
                    </div>
                  </div>

                  {/* 3-SUV Luxury Fleet Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1.5 flex items-center justify-between">
                      <span>Select Luxury Vehicle (Confirmed Fleet)</span>
                      <span className="text-[10px] text-[var(--accent-gold)] font-medium">3 Luxury SUVs</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        {
                          name: "Black Chevrolet Suburban Premier",
                          badge: "Standard Fleet",
                          desc: "Max 6 Guests • 6 Luggage",
                        },
                        {
                          name: "Black GMC Yukon Denali",
                          badge: "Executive Luxury",
                          desc: "Max 6 Guests • 6 Luggage",
                        },
                        {
                          name: "Black Cadillac Escalade ESV",
                          badge: "Prestige VIP",
                          desc: "Max 6 Guests • 6 Luggage",
                        },
                      ].map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setVehicle(item.name)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            vehicle === item.name
                              ? "bg-[var(--bg-secondary)] border-[var(--accent-gold)] shadow-md shadow-[var(--accent-gold)]/10 ring-1 ring-[var(--accent-gold)]"
                              : "bg-[var(--bg-secondary)]/60 border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/50 text-[var(--text-secondary)]"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <Car
                                className={`w-4 h-4 ${
                                  vehicle === item.name
                                    ? "text-[var(--accent-gold)]"
                                    : "text-[var(--text-secondary)]"
                                }`}
                              />
                              <span
                                className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                  vehicle === item.name
                                    ? "bg-[var(--accent-soft)] text-[var(--accent-gold)] border border-[var(--accent-gold)]/30"
                                    : "bg-[var(--bg-card)] text-[var(--text-secondary)]"
                                }`}
                              >
                                {item.badge}
                              </span>
                            </div>
                            <div className="text-xs font-bold text-[var(--text-primary)] leading-snug">
                              {item.name}
                            </div>
                          </div>
                          <div className="text-[10px] text-[var(--text-secondary)] mt-1.5">
                            {item.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Google Live Route Map & Distance Banner */}
                  <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[var(--accent-gold)]" />
                      <span className="text-[var(--text-secondary)]">Est. Driving Time:</span>
                      <strong className="text-[var(--text-primary)]">
                        {isCalculatingRoute ? "Calculating..." : `${tripDurationMin} mins`}
                      </strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--text-secondary)]">Real Driving Distance:</span>
                      <strong className="text-[var(--accent-gold)]">
                        {isCalculatingRoute ? "..." : `${tripDistanceKm} km`}
                      </strong>
                    </div>
                  </div>
                  {routeError && (
                    <div className="text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-1.5">
                      {routeError}
                    </div>
                  )}

                  {/* Interactive Live Google Map View */}
                  <div className="pt-1">
                    <InteractiveRouteMap
                      origin={pickup}
                      destination={dropoff}
                      polyline={routePolyline}
                      distanceKm={tripDistanceKm}
                      durationMin={tripDurationMin}
                    />
                  </div>
                </div>
              </div>

              {/* Price Breakdown Right */}
              <div className="lg:col-span-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 flex flex-col justify-between space-y-5">
                <div>
                  <h4 className="font-display text-lg font-bold text-[var(--text-primary)] pb-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
                    <span>Fare Breakdown</span>
                    <span className="text-xs font-sans font-normal text-[var(--text-secondary)]">CAD</span>
                  </h4>

                  <div className="space-y-3 py-4 text-xs">
                    <div className="flex justify-between text-[var(--text-primary)]">
                      <span>Base Journey Rate</span>
                      <span>${baseJourneyFare.toFixed(2)}</span>
                    </div>

                    {couponApplied && (
                      <div className="flex justify-between text-emerald-500 font-semibold">
                        <span>Coupon Discount (10%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-[var(--text-secondary)]">
                      <span>Ontario HST (13%)</span>
                      <span>${hstTax.toFixed(2)}</span>
                    </div>

                    {/* Gratuity Selector (Section 13) */}
                    <div className="pt-2 border-t border-[var(--border-subtle)]">
                      <div className="flex items-center justify-between mb-2 text-xs">
                        <span className="text-[var(--accent-gold)] font-semibold">Optional Gratuity:</span>
                        <span className="text-[var(--text-primary)]">${tipAmount.toFixed(2)}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "No Tip", value: 0 },
                          { label: "10% Tip", value: 10 },
                          { label: "20% Tip", value: 20 },
                        ].map((t) => (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => setTipPercent(t.value as 0 | 10 | 20)}
                            className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${tipPercent === t.value
                              ? "bg-[var(--accent-gold)] text-black font-bold shadow-sm"
                              : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]"
                              }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Total Amount */}
                    <div className="pt-3 border-t border-[var(--border-subtle)] flex items-baseline justify-between">
                      <span className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
                        Payable Fare
                      </span>
                      <div className="text-right">
                        <div className="text-2xl font-extrabold text-[var(--accent-gold)]">
                          ${finalPayableTotal.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-[var(--text-secondary)]">Includes all fees & taxes</div>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Form */}
                  <form onSubmit={handleApplyCoupon} className="pt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. ROYAL12VIP)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl px-3 py-1.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--accent-gold)] text-xs font-semibold hover:bg-[var(--accent-gold)] hover:text-black transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 rounded-xl text-center text-xs sm:text-sm font-bold uppercase tracking-wider gold-button flex items-center justify-center gap-2 shadow-xl shadow-[var(--accent-gold)]/25"
                >
                  <span>Continue to Passenger Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PASSENGER INFORMATION */}
        {step === 2 && (
          <div className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 sm:p-10 shadow-[var(--shadow-luxury)] max-w-2xl mx-auto transition-colors duration-300">
            {/* Top Banner: Mandatory Account Verification Gate */}
            {!isVerified ? (
              <div className="mb-6 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--accent-gold)]/40 shadow-lg shadow-[var(--accent-gold)]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-gold)]/50 flex items-center justify-center text-[var(--accent-gold)] flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <span>Account Sign-In Required</span>
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30">
                        Anti-Fake Booking Gate
                      </span>
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                      All bookings are securely tied to your verified passenger account.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSignInAndReview}
                  className="px-4 py-2 rounded-xl text-xs font-bold gold-button whitespace-nowrap shadow-md cursor-pointer"
                >
                  Sign In / Register
                </button>
              </div>
            ) : (
              <div className="mb-6 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">Verified Passenger Account: </span>
                    <span className="text-[var(--accent-gold)]">{user?.email}</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Verified
                </span>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                Passenger & Contact Details
              </h3>
              <span className="text-xs text-[var(--text-secondary)] hidden sm:inline-block">
                Vehicle: <strong className="text-[var(--accent-gold)]">{vehicle}</strong>
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. James Kensington"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@executive.com"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+1 (416) 555-0192"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                  Inbound Flight Number (Optional for Airport Transfers)
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-3.5 text-[var(--accent-gold)]">
                    <Plane className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. AC870 or WS432"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl pl-10 pr-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 focus:outline-none uppercase transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase mb-1">
                  Special Chauffeur Instructions / Luggage Notes
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Meet inside arrivals hall with name board, child booster seat, quiet ride..."
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl p-3 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 focus:outline-none resize-none transition-colors"
                />
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  ← Back to Quote
                </button>

                {!isVerified ? (
                  <button
                    type="button"
                    onClick={handleSignInAndReview}
                    className="px-7 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider gold-button flex items-center gap-2 shadow-xl shadow-[var(--accent-gold)]/25 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Sign In & Review Fare</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (!customerName || !customerEmail || !customerPhone) {
                        alert("Please provide your name, email, and phone number.");
                        return;
                      }
                      setStep(3);
                    }}
                    className="px-7 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider gold-button flex items-center gap-2 shadow-xl shadow-[var(--accent-gold)]/25 cursor-pointer"
                  >
                    <span>Review Fare & Confirm Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: FARE REVIEW & PAYMENT PREFERENCE */}
        {step === 3 && (
          <div className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 sm:p-10 shadow-[var(--shadow-luxury)] max-w-2xl mx-auto transition-colors duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-6">
              <div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                  Itemized Fare Review & Policy Acceptance
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Secure reservation tied to verified passenger account
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent-gold)] border border-[var(--accent-gold)]/30">
                24/7 Dispatch
              </span>
            </div>

            {/* Trip Summary Card */}
            <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] mb-6 text-xs space-y-2.5">
              <div className="flex justify-between items-start pb-2 border-b border-[var(--border-subtle)]">
                <span className="text-[var(--text-secondary)]">Selected Vehicle:</span>
                <span className="font-bold text-[var(--text-primary)] text-right flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>{vehicle}</span>
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[var(--border-subtle)]">
                <span className="text-[var(--text-secondary)]">Routing:</span>
                <span className="text-right text-[var(--text-primary)] max-w-[65%] truncate font-medium">
                  {pickup} → {dropoff}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[var(--border-subtle)]">
                <span className="text-[var(--text-secondary)]">Schedule:</span>
                <span className="text-[var(--text-primary)] font-medium">
                  {date} at {time} ({tripDurationMin} min • {tripDistanceKm} km)
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[var(--border-subtle)]">
                <span className="text-[var(--text-secondary)]">Passenger:</span>
                <span className="text-[var(--text-primary)] font-medium">
                  {customerName} ({passengers} Pax, {luggage} Bags)
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="pt-1 space-y-1.5">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Base Fare ({tripDistanceKm} km)</span>
                  <span>${baseJourneyFare.toFixed(2)} CAD</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-500">
                    <span>Coupon Discount (10%)</span>
                    <span>-${discountAmount.toFixed(2)} CAD</span>
                  </div>
                )}
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Ontario HST (13%)</span>
                  <span>${hstTax.toFixed(2)} CAD</span>
                </div>
                {tipAmount > 0 && (
                  <div className="flex justify-between text-[var(--accent-gold)]">
                    <span>Optional Gratuity ({tipPercent}%)</span>
                    <span>${tipAmount.toFixed(2)} CAD</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-[var(--border-subtle)] font-bold text-sm">
                  <span className="text-[var(--text-primary)]">Guaranteed Total Quoted Fare:</span>
                  <span className="text-[var(--accent-gold)] text-base">${finalPayableTotal.toFixed(2)} CAD</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                Select Preferred Payment Method
              </label>
              <div className="space-y-3">
                {[
                  {
                    id: "stripe",
                    title: "Credit / Debit Card (Stripe)",
                    desc: "Visa, MasterCard, American Express, Apple Pay, Google Pay",
                    icon: CreditCard,
                  },
                  {
                    id: "paypal",
                    title: "PayPal Business Checkout",
                    desc: "Pay securely with your PayPal account or PayPal Credit",
                    icon: CreditCard,
                  },
                  {
                    id: "interac",
                    title: "Interac e-Transfer (Canada)",
                    desc: "Send transfer directly to royaltwelve.ca@gmail.com",
                    icon: Receipt,
                  },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === m.id
                        ? "bg-[var(--bg-secondary)] border-[var(--accent-gold)] shadow-md shadow-[var(--accent-gold)]/10"
                        : "bg-[var(--bg-secondary)]/50 border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.id}
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id as "stripe" | "paypal" | "interac")}
                      className="mt-1 text-[var(--accent-gold)] focus:ring-[var(--accent-gold)]"
                    />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">{m.title}</div>
                      <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">{m.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Interac Specific Instructions */}
            {paymentMethod === "interac" && (
              <div className="p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-4 mb-6">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <span className="text-xs font-semibold text-[var(--text-primary)]">Interac Recipient:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[var(--accent-gold)]">royaltwelve.ca@gmail.com</span>
                    <button
                      type="button"
                      onClick={copyInteracEmail}
                      className="p-1 rounded bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent-gold)]"
                      title="Copy email"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {copiedEmail && <span className="text-[10px] text-emerald-500 font-semibold">Copied!</span>}
                  </div>
                </div>

                <div className="text-xs text-[var(--text-secondary)] space-y-2">
                  <p>1. Log in to your Canadian online banking or mobile banking app.</p>
                  <p>2. Send Interac e-Transfer of <strong>${finalPayableTotal.toFixed(2)} CAD</strong> to <strong>royaltwelve.ca@gmail.com</strong>.</p>
                  <p>3. Include booking reference <strong>{bookingRef}</strong> in the transfer message memo.</p>
                  <p className="text-[11px] text-[var(--accent-gold)] font-medium">
                    * Note: Payment status will be set to &quot;Pending Verification&quot; and confirmed manually by admin against the company bank account.
                  </p>
                </div>
              </div>
            )}

            {/* Standardized 24/7 Service & 30% Cancellation Fee / 70% Refund Policy */}
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-amber-500/40 mb-6 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-[var(--text-primary)] leading-relaxed">
                  <strong className="text-amber-500 font-bold block mb-1">
                    24/7 Round-the-Clock Dispatch & Chauffeur Service:
                  </strong>
                  Free cancellation up to 24 hours prior to scheduled pickup. If a ride is cancelled after the 24-hour window (within 24 hours of pickup), a 30% cancellation fee will be deducted and the remaining 70% of the fare will be refunded.
                </div>
              </div>

              <label className="flex items-start gap-2.5 pt-2.5 border-t border-[var(--border-subtle)] text-xs text-[var(--text-primary)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="rounded text-[var(--accent-gold)] focus:ring-[var(--accent-gold)] mt-0.5"
                />
                <span className="font-medium">
                  I agree to the 24/7 Service Terms & 24-Hour Cancellation Policy: 30% fee if cancelled within 24 hours of pickup; 70% refunded
                </span>
              </label>
            </div>

            {submitError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-500">
                {submitError}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleCompleteBooking}
                disabled={!termsAccepted || isSubmitting}
                className="px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider gold-button disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-[var(--accent-gold)]/25 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Confirming...</span>
                  </>
                ) : (
                  <span>Confirm & Submit Reservation</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: RESERVATION SUCCESS CONFIRMATION */}
        {step === 4 && (
          <div className="rounded-3xl bg-[var(--bg-card)] border border-emerald-500/40 p-8 sm:p-12 shadow-[var(--shadow-luxury)] max-w-2xl mx-auto text-center space-y-6 transition-colors duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-500 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-soft)] text-[var(--accent-gold)] border border-[var(--border-subtle)] mb-2">
                Booking Reference: {bookingRef}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Reservation Request Confirmed
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 max-w-md mx-auto">
                Thank you, {customerName}. Your reservation request for a {vehicle}
                has been submitted to Royal 12 Executive Dispatch for round-the-clock staging and chauffeur assignment.
              </p>
            </div>

            {/* Summary card */}
            <div className="p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-left text-xs space-y-2.5">
              <div className="flex justify-between pb-2 border-b border-[var(--border-subtle)] font-semibold text-[var(--text-primary)]">
                <span>Pickup:</span>
                <span className="text-right text-[var(--accent-gold)] max-w-[60%] truncate">{pickup}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[var(--border-subtle)] font-semibold text-[var(--text-primary)]">
                <span>Destination:</span>
                <span className="text-right text-[var(--accent-gold)] max-w-[60%] truncate">{dropoff}</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Date & Time:</span>
                <span className="text-[var(--text-primary)]">{date} at {time} (America/Toronto)</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Confirmed Vehicle:</span>
                <span className="text-[var(--text-primary)] font-semibold">{vehicle}</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Verified Passenger:</span>
                <span className="text-[var(--text-primary)]">{customerEmail}</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Payment Method:</span>
                <span className="uppercase text-[var(--text-primary)] font-medium">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Payment Status:</span>
                <span className="text-amber-500 font-semibold">Pending Admin Verification</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--border-subtle)] text-sm font-bold text-[var(--text-primary)]">
                <span>Quoted Total:</span>
                <span className="text-[var(--accent-gold)] text-base">${finalPayableTotal.toFixed(2)} CAD</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              A confirmation email has been dispatched to <strong>{customerEmail}</strong>. Our 24/7 dispatch team will monitor your trip and contact you directly via phone at <strong>{customerPhone}</strong>.
            </div>

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setTermsAccepted(false);
              }}
              className="px-6 py-2.5 rounded-full text-xs font-semibold gold-button"
            >
              Book Another Journey
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
