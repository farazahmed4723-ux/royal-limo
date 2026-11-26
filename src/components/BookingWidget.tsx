"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  Users,
  Briefcase,
  ArrowDownUp,
  Navigation,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface BookingWidgetProps {
  onFindRide?: (data: BookingData) => void;
}

export interface BookingData {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  vehicle: string;
  passengers: number;
  luggage: number;
  serviceType: string;
}

export default function BookingWidget({ onFindRide }: BookingWidgetProps) {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    const t = setTimeout(() => {
      const today = new Date();
      setMinDate(today.toISOString().split("T")[0]);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split("T")[0]);
    }, 0);
    return () => clearTimeout(t);
  }, []);
  const [time, setTime] = useState("12:00");
  const [vehicle, setVehicle] = useState("Black Chevrolet Suburban Premier");
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const serviceType = "One-Way Transfer";
  const [isLocating, setIsLocating] = useState(false);
  const [activeInput, setActiveInput] = useState<"pickup" | "dropoff" | null>(null);

  // Set default and min date asynchronously to satisfy React hooks & Next.js 16 prerender
  useEffect(() => {
    const timer = setTimeout(() => {
      const today = new Date();
      const todayStr = today.toISOString().split("T")[0];
      setMinDate(todayStr);

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split("T")[0]);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Live Google Places autocomplete suggestions
  const [liveSuggestions, setLiveSuggestions] = useState<
    Array<{ placeId: string; mainText: string; secondaryText: string; fullText: string }>
  >([]);

  // Query live Google Places Autocomplete API
  useEffect(() => {
    const query = activeInput === "pickup" ? pickup : activeInput === "dropoff" ? dropoff : "";
    if (!query || query.length < 2) {
      const clearTimer = setTimeout(() => setLiveSuggestions([]), 0);
      return () => clearTimeout(clearTimer);
    }

    const timer = setTimeout(() => {
      fetch("/api/places/autocomplete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: query }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.suggestions && data.suggestions.length > 0) {
            setLiveSuggestions(data.suggestions);
          }
        })
        .catch((err) => console.error("Autocomplete error:", err));
    }, 250);

    return () => clearTimeout(timer);
  }, [pickup, dropoff, activeInput]);

  // Common quick locations in the GTA
  const popularLocations = [
    "Toronto Pearson International Airport (YYZ), Terminal 1",
    "Toronto Pearson International Airport (YYZ), Terminal 3",
    "Billy Bishop Toronto City Airport (YTZ)",
    "Union Station, Front St W, Toronto, ON",
    "Fairmont Royal York, Front St W, Toronto, ON",
    "The Ritz-Carlton, Wellington St W, Toronto, ON",
    "Downtown Toronto Financial District (Bay St)",
    "Square One Shopping Centre, Mississauga, ON",
  ];

  const handleSwap = () => {
    const temp = pickup;
    setPickup(dropoff);
    setDropoff(temp);
  };

  const handleGetLocation = (target: "pickup" | "dropoff") => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await fetch(
            `/api/places/reverse-geocode?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
          );
          const data = await res.json();
          const addr =
            data.address ||
            `Current Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}) — GTA`;
          if (target === "pickup") setPickup(addr);
          else setDropoff(addr);
        } catch {
          const coords = `Current Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}) — GTA`;
          if (target === "pickup") setPickup(coords);
          else setDropoff(coords);
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
        alert("Unable to retrieve location. Please type your street address.");
      },
      { timeout: 10000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup.trim()) {
      alert("Please enter a pickup location.");
      return;
    }
    if (!dropoff.trim()) {
      alert("Please enter a destination location.");
      return;
    }

    const bookingPayload: BookingData = {
      pickup,
      dropoff,
      date,
      time,
      vehicle,
      passengers,
      luggage,
      serviceType,
    };

    try {
      sessionStorage.setItem("royal12_trip_draft", JSON.stringify(bookingPayload));
    } catch (e) {
      console.warn("Could not save trip draft:", e);
    }

    if (onFindRide) {
      onFindRide(bookingPayload);
    } else {
      // Smooth scroll to booking details section
      const bookingSection = document.getElementById("booking-quote-engine");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-3xl p-[1px] bg-gradient-to-b from-[var(--border-subtle)] via-[var(--border-subtle)]/50 to-[var(--bg-secondary)] shadow-2xl shadow-black/40">
      <div className="relative rounded-[23px] bg-[var(--bg-card)]/95 backdrop-blur-2xl p-6 sm:p-7 text-[var(--text-primary)] border border-[var(--border-subtle)]">
        {/* Top Header Card */}
        <div className="flex items-center justify-between pb-5 border-b border-[var(--border-subtle)]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                Book Your Ride
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available Now
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Fast, easy — guaranteed flat rates & no hidden fees
            </p>
          </div>
          <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--accent-gold)]">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Pickup Location */}
          <div className="relative">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--accent-gold)] mb-1.5">
              Pickup Location
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-emerald-500">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                onFocus={() => setActiveInput("pickup")}
                placeholder="Airport, Hotel, or Street Address"
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl pl-11 pr-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-gold)] transition-all"
                required
              />
            </div>
            <div className="flex items-center justify-between mt-1 px-1">
              <button
                type="button"
                onClick={() => handleGetLocation("pickup")}
                disabled={isLocating}
                className="inline-flex items-center gap-1.5 text-[11px] text-[var(--accent-gold)] hover:text-[var(--accent-gold-hover)] transition-colors focus:outline-none cursor-pointer"
              >
                <Navigation className="w-3 h-3 text-[var(--accent-gold)]" />
                <span>Use My Current Location (Verified GPS)</span>
              </button>
            </div>

            {/* Live Google Places & Quick Suggestions Dropdown */}
            {activeInput === "pickup" && pickup.length >= 2 && liveSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-[var(--bg-modal)] border border-[var(--border-subtle)] rounded-xl shadow-2xl p-2 max-h-48 overflow-y-auto">
                <div className="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] px-2 py-1 font-semibold">
                  Google Places Results
                </div>
                {liveSuggestions.map((sug) => (
                  <button
                    key={sug.placeId || sug.fullText}
                    type="button"
                    onClick={() => {
                      setPickup(sug.fullText || sug.mainText);
                      setActiveInput(null);
                    }}
                    className="w-full text-left text-xs px-2.5 py-1.5 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)]/70 flex-shrink-0" />
                    <span className="truncate">{sug.fullText || sug.mainText}</span>
                  </button>
                ))}
              </div>
            )}
            {activeInput === "pickup" && !pickup && (
              <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-[var(--bg-modal)] border border-[var(--border-subtle)] rounded-xl shadow-2xl p-2 max-h-48 overflow-y-auto">
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] px-2 py-1 font-semibold">
                  Popular GTA Pickup Spots
                </div>
                {popularLocations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setPickup(loc);
                      setActiveInput(null);
                    }}
                    className="w-full text-left text-xs px-2.5 py-1.5 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)]/70 flex-shrink-0" />
                    <span className="truncate">{loc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button Divider */}
          <div className="relative flex justify-center -my-2 z-10">
            <button
              type="button"
              onClick={handleSwap}
              className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-black flex items-center justify-center shadow-lg transition-transform hover:rotate-180 duration-300 cursor-pointer"
              title="Swap Pickup & Dropoff"
            >
              <ArrowDownUp className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Drop Location */}
          <div className="relative">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--accent-gold)] mb-1.5">
              Drop Location
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-[var(--accent-gold)]">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                onFocus={() => setActiveInput("dropoff")}
                placeholder="Airport, Hotel, or Street Address"
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl pl-11 pr-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-gold)] transition-all"
                required
              />
            </div>
            <div className="flex items-center justify-between mt-1 px-1">
              <button
                type="button"
                onClick={() => handleGetLocation("dropoff")}
                disabled={isLocating}
                className="inline-flex items-center gap-1.5 text-[11px] text-[var(--accent-gold)] hover:text-[var(--accent-gold-hover)] transition-colors focus:outline-none cursor-pointer"
              >
                <Navigation className="w-3 h-3 text-[var(--accent-gold)]" />
                <span>Use My Current Location (Verified GPS)</span>
              </button>
            </div>

            {/* Live Google Places & Quick Suggestions Dropdown */}
            {activeInput === "dropoff" && dropoff.length >= 2 && liveSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-[var(--bg-modal)] border border-[var(--border-subtle)] rounded-xl shadow-2xl p-2 max-h-48 overflow-y-auto">
                <div className="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] px-2 py-1 font-semibold">
                  Google Places Results
                </div>
                {liveSuggestions.map((sug) => (
                  <button
                    key={sug.placeId || sug.fullText}
                    type="button"
                    onClick={() => {
                      setDropoff(sug.fullText || sug.mainText);
                      setActiveInput(null);
                    }}
                    className="w-full text-left text-xs px-2.5 py-1.5 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)]/70 flex-shrink-0" />
                    <span className="truncate">{sug.fullText || sug.mainText}</span>
                  </button>
                ))}
              </div>
            )}
            {activeInput === "dropoff" && !dropoff && (
              <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-[var(--bg-modal)] border border-[var(--border-subtle)] rounded-xl shadow-2xl p-2 max-h-48 overflow-y-auto">
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] px-2 py-1 font-semibold">
                  Popular GTA Destinations
                </div>
                {popularLocations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setDropoff(loc);
                      setActiveInput(null);
                    }}
                    className="w-full text-left text-xs px-2.5 py-1.5 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)]/70 flex-shrink-0" />
                    <span className="truncate">{loc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Date
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-[var(--accent-gold)]">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={minDate || undefined}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl pl-9 pr-2.5 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Time
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-[var(--accent-gold)]">
                  <Clock className="w-4 h-4" />
                </div>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl pl-9 pr-2.5 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Vehicle Selector (3-SUV Luxury Fleet) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 flex items-center justify-between">
              <span>Vehicle Class (Confirmed Fleet)</span>
              <span className="text-[10px] text-[var(--accent-gold)] font-medium">3 Luxury SUVs</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-[var(--accent-gold)] pointer-events-none">
                <Car className="w-4 h-4" />
              </div>
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none transition-all cursor-pointer font-semibold"
              >
                <option value="Black Chevrolet Suburban Premier">
                  Black Chevrolet Suburban Premier (Standard Fleet • 6 Pax)
                </option>
                <option value="Black GMC Yukon Denali">
                  Black GMC Yukon Denali (Executive Luxury • 6 Pax)
                </option>
                <option value="Black Cadillac Escalade ESV">
                  Black Cadillac Escalade ESV (Prestige VIP • 6 Pax)
                </option>
              </select>
            </div>
          </div>

          {/* Passengers & Luggage */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Passengers (Max 6)
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-[var(--accent-gold)]">
                  <Users className="w-4 h-4" />
                </div>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none transition-all"
                >
                  <option value={1}>1 Passenger</option>
                  <option value={2}>2 Passengers</option>
                  <option value={3}>3 Passengers</option>
                  <option value={4}>4 Passengers</option>
                  <option value={5}>5 Passengers</option>
                  <option value={6}>6 Passengers (Max)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Luggage
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-[var(--accent-gold)]">
                  <Briefcase className="w-4 h-4" />
                </div>
                <select
                  value={luggage}
                  onChange={(e) => setLuggage(Number(e.target.value))}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none transition-all"
                >
                  <option value={1}>1 Bag</option>
                  <option value={2}>2 Bags</option>
                  <option value={3}>3 Bags</option>
                  <option value={4}>4 Bags</option>
                  <option value={5}>5 Bags</option>
                  <option value={6}>6 Bags</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit CTA Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-center text-sm font-bold tracking-wider uppercase gold-button flex items-center justify-center gap-2 group shadow-xl shadow-[#D4AF63]/30 cursor-pointer"
            >
              <span>Find My Ride</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          {/* Guarantee & Cancellation Policy Footer Note */}
          <div className="pt-2 text-center border-t border-[var(--border-subtle)]">
            <p className="text-[11px] text-[var(--text-secondary)] flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-gold)] flex-shrink-0" />
              <span>
                24/7 Dispatch • Free cancellation up to 24 hours prior to pickup (30% fee within 24h; 70% refunded)
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
