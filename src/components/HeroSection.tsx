"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Clock,
  MapPin,
  ArrowRight,
  Navigation,
  Calendar,
  Car,
  Phone,
  ArrowDownUp,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { BookingData } from "./BookingWidget";

interface HeroSectionProps {
  onFindRide?: (data: BookingData) => void;
}

export default function HeroSection({ onFindRide }: HeroSectionProps) {
  // Rotating service highlights
  const services = [
    "Airport Transfers (YYZ / YTZ)",
    "Corporate & Executive Travel",
    "VIP Private Jet Chauffeur",
    "Prestige Events & Galas",
    "Executive Roadshows",
  ];
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % services.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [services.length]);

  // Quick Booking Bar State
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [vehicle, setVehicle] = useState("Black Chevrolet Suburban Premier");
  const [isLocating, setIsLocating] = useState(false);
  const [activeInput, setActiveInput] = useState<"pickup" | "dropoff" | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split("T")[0]);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Live 1-second vehicle rotation badge in Hero Showcase
  const heroFleetVehicles = [
    "Black Chevrolet Suburban Premier",
    "Black GMC Yukon Denali",
    "Black Cadillac Escalade ESV",
  ];
  const [heroFleetIdx, setHeroFleetIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroFleetIdx((prev) => (prev + 1) % heroFleetVehicles.length);
    }, 1000);
    return () => clearInterval(timer);
  }, [heroFleetVehicles.length]);

  // Popular GTA shortcuts
  const popularLocations = [
    "Toronto Pearson International Airport (YYZ), Terminal 1",
    "Toronto Pearson International Airport (YYZ), Terminal 3",
    "Billy Bishop Toronto City Airport (YTZ)",
    "Downtown Toronto Financial District (Bay St)",
    "The Ritz-Carlton, Wellington St W, Toronto, ON",
    "Fairmont Royal York, Front St W, Toronto, ON",
    "Square One Shopping Centre, Mississauga, ON",
  ];

  const handleSwap = () => {
    const temp = pickup;
    setPickup(dropoff);
    setDropoff(temp);
  };

  const handleGetLocation = (type: "pickup" | "dropoff") => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `/api/places/reverse-geocode?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`
          );
          const data = await res.json();
          if (data.address) {
            if (type === "pickup") setPickup(data.address);
            else setDropoff(data.address);
          } else {
            const fallback = `GPS (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`;
            if (type === "pickup") setPickup(fallback);
            else setDropoff(fallback);
          }
        } catch {
          const fallback = `GPS (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`;
          if (type === "pickup") setPickup(fallback);
          else setDropoff(fallback);
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        console.warn("Geolocation error:", err.message);
        setIsLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) {
      alert("Please enter both pickup and drop-off locations.");
      return;
    }

    const bookingPayload: BookingData = {
      pickup,
      dropoff,
      date,
      time,
      vehicle,
      passengers: 3,
      luggage: 3,
      serviceType: "One-Way Transfer",
    };

    if (onFindRide) {
      onFindRide(bookingPayload);
    } else {
      const el = document.getElementById("booking-quote-engine");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero-section" className="relative min-h-[90vh] lg:min-h-screen pt-20 pb-8 lg:pt-28 lg:pb-8 overflow-hidden flex flex-col justify-between">
      {/* 4K Background Master: Suburban (Right) & Private Jet (Left) on Airport Runway */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/royal12/hero-suburban-jet.jpg"
          alt="Royal 12 Limo Black Chevrolet Suburban and Private Jet on Airport Runway at Twilight"
          fill
          priority
          sizes="100vw"
          quality={100}
          unoptimized
          className="object-cover object-bottom"
        />
        {/* Subtle top sky vignette for crisp text contrast */}
        <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-[#030712]/85 via-[#051124]/40 to-transparent pointer-events-none" />
        {/* Subtle bottom tarmac vignette for the horizontal booking console */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#02050C]/90 via-[#040A18]/50 to-transparent pointer-events-none" />
      </div>

      {/* TOP SKY AREA: Open Headline, Value Proposition & Direct Contact (Above Jet & Suburban) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-1 sm:pt-3">
        {/* Ultra-Transparent Sheer Floating Canopy: 100% unobstructed view of private jet airplane and suburban */}
        <div className="max-w-4xl lg:max-w-5xl rounded-3xl p-2 sm:p-5 space-y-3 sm:space-y-3.5 text-left bg-transparent backdrop-blur-none border-none shadow-none">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06101E]/95 border border-[#F5A623]/60 text-xs font-bold text-[#F5A623] tracking-widest uppercase shadow-xl shadow-black/80 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
            <span className="text-[11px] tracking-[0.2em] text-[#F5A623] font-bold">
              Mississauga • GTA • Pearson Airport (YYZ)
            </span>
          </motion.div>

          {/* Grand Headline with Primary SEO Keyword & Brand */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
          >
            Limo Service Mississauga &amp; Toronto –{" "}
            <span className="gold-gradient-text drop-shadow-[0_2px_24px_rgba(245,166,35,0.6)]">
              Royal Twelve Limo
            </span>
          </motion.h1>

          {/* Dynamic Rotating Service Line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-2.5 text-base sm:text-xl lg:text-2xl font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
          >
            <span className="text-[#CBD5E1] font-normal">for</span>
            <span className="inline-flex items-center px-3.5 py-1 rounded-xl bg-[#F5A623]/20 border border-[#F5A623]/60 text-[#F5A623] font-extrabold tracking-wide shadow-inner backdrop-blur-md transition-all duration-300">
              {services[currentServiceIndex]}
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
            className="text-xs sm:text-sm lg:text-base text-[#E2E8F0] max-w-2xl leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
          >
            Toronto and GTA&apos;s premier black car chauffeur service. 24/7 Round-the-Clock Dispatch
            featuring all-black Chevrolet Suburban, GMC Yukon Denali &amp; Cadillac Escalade SUVs plus private FBO aviation transfers.
          </motion.p>

          {/* Quick Action CTAs - Day & Night High-Contrast Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap lg:flex-nowrap items-center gap-3 pt-1.5"
          >
            {/* 1. Book a Ride CTA Button */}
            <a
              href="#booking-bar"
              className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest bg-gradient-to-r from-[#F5A623] via-[#FFB733] to-[#E5982A] text-black inline-flex items-center gap-2 shadow-xl shadow-[#F5A623]/40 hover:shadow-[#F5A623]/60 hover:brightness-110 active:scale-95 transition-all cursor-pointer ring-2 ring-[#FFD27D]/50 whitespace-nowrap"
            >
              <span className="text-black font-black">Book a Ride</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </a>

            {/* 2. Direct 24/7 Dispatch Phone Call Button */}
            <a
              href="tel:+14372149283"
              className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-black/90 hover:bg-black border-2 border-[#F5A623] text-white hover:text-[#F5A623] inline-flex items-center gap-2.5 backdrop-blur-md shadow-lg shadow-black/80 hover:shadow-[#F5A623]/30 active:scale-95 transition-all ring-1 ring-white/10 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#F5A623] flex-shrink-0 animate-pulse" />
              <span className="text-white font-bold tracking-wide">
                24/7 Dispatch: <span className="text-[#F5A623] font-black">(437) 214-9283</span>
              </span>
            </a>

            {/* 3. Explore 3-SUV Black Fleet Badge Button */}
            <Link
              href="/#fleet"
              className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-white/15 hover:bg-white/25 border border-white/35 hover:border-[#F5A623] text-white hover:text-[#F5A623] inline-flex items-center gap-2 backdrop-blur-md shadow-md active:scale-95 transition-all group ring-1 ring-white/10 whitespace-nowrap"
            >
              <Car className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
              <span className="text-white group-hover:text-[#F5A623] transition-colors font-medium">
                Explore 3-SUV Black Fleet
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:text-[#F5A623] transition-colors" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* MOBILE SHOWCASE WINDOW: On mobile devices, show full uncropped panoramic view of Jet + Suburban */}
      <div className="relative z-10 w-full px-4 my-4 block lg:hidden">
        <div className="relative aspect-[2.33/1] w-full rounded-2xl overflow-hidden border border-[#F5A623]/30 shadow-2xl shadow-black/80 ring-1 ring-white/10">
          <Image
            src="/images/royal12/hero-suburban-jet.jpg"
            alt="Royal 12 Limo - Suburban and Jet Runway Showcase"
            fill
            sizes="100vw"
            quality={100}
            unoptimized
            className="object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/70 border border-[#38BDF8]/30 text-[9px] font-bold text-[#38BDF8] uppercase tracking-wider">
            <Sparkles className="w-2.5 h-2.5 text-[#38BDF8]" />
            <span>Private Jet</span>
          </div>
          <div className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/70 border border-[#F5A623]/40 text-[9px] font-bold text-[#F5A623] uppercase tracking-wider">
            <Car className="w-2.5 h-2.5 text-[#F5A623]" />
            <span>{heroFleetVehicles[heroFleetIdx]}</span>
          </div>
        </div>
      </div>

      {/* DESKTOP CENTER STAGE: Visual Labels for Airplane (Left) & Live 1s SUV Fleet (Right) */}
      <div className="relative z-10 w-full min-h-[60px] lg:min-h-[100px] pointer-events-none hidden lg:flex items-center justify-between px-8 lg:px-14">
        {/* Subtle Airplane Showcase Pill (Left) */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#030712]/60 border border-[#38BDF8]/20 backdrop-blur-md text-[11px] font-semibold text-[#38BDF8] tracking-wider uppercase shadow-lg opacity-85 hover:opacity-100 transition-opacity">
          <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>FBO Private Aviation Transfers</span>
        </div>

        {/* Live 1s Fleet Showcase Pill (Right) */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#030712]/70 border border-[#F5A623]/35 backdrop-blur-md text-[11px] font-semibold text-[#F5A623] tracking-wider uppercase shadow-lg opacity-90 hover:opacity-100 transition-opacity">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Car className="w-3.5 h-3.5 text-[#F5A623]" />
          <span>LIVE 1s: {heroFleetVehicles[heroFleetIdx]}</span>
        </div>
      </div>

      {/* BOTTOM TARMAC: Sleek Horizontal Crystal Glass Quick-Booking Bar & Trust Strip */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" id="booking-bar">
        {/* Horizontal Crystal Booking Console */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl sm:rounded-3xl bg-[#06101E]/95 border border-[#F5A623]/30 backdrop-blur-xl p-3.5 sm:p-4 lg:p-5 shadow-2xl shadow-black/95 ring-1 ring-white/10"
        >
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2.5 items-end">
              {/* 1. Pickup Location (lg:col-span-4) */}
              <div className="relative lg:col-span-4">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#F5A623] mb-1">
                  Pickup Location
                </label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3 w-4 h-4 text-[#F5A623] pointer-events-none" />
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    onFocus={() => setActiveInput("pickup")}
                    placeholder="Airport, Hotel, or Address"
                    required
                    className="w-full bg-[#0A1628] border border-[#F5A623]/25 focus:border-[#F5A623] rounded-xl pl-9 pr-20 py-2 text-xs sm:text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:ring-1 focus:ring-[#F5A623] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => handleGetLocation("pickup")}
                    disabled={isLocating}
                    className="absolute right-2 text-[10px] text-[#F5A623] hover:text-[#FFC04D] flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#06101E]/70 border border-[#F5A623]/20 cursor-pointer"
                    title="Use GPS"
                  >
                    <Navigation className="w-2.5 h-2.5" />
                    <span className="hidden sm:inline">GPS</span>
                  </button>
                </div>

                {/* Popular Dropdown for Pickup */}
                {activeInput === "pickup" && !pickup && (
                  <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-[#06101E] border border-[#F5A623]/30 rounded-xl shadow-2xl p-2 max-h-48 overflow-y-auto">
                    <div className="text-[10px] uppercase tracking-wider text-[#94A3B8] px-2 py-1 font-semibold">
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
                        className="w-full text-left text-xs px-2.5 py-1.5 rounded-lg text-[#F8FAFC] hover:bg-[#0A1628] hover:text-[#F5A623] transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <MapPin className="w-3 h-3 text-[#F5A623] flex-shrink-0" />
                        <span className="truncate">{loc}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Swap Button (between pickup and dropoff on desktop) */}
              <div className="hidden lg:flex items-center justify-center lg:col-span-1 pb-1">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="w-7 h-7 rounded-full bg-[#0A1628] border border-[#F5A623]/30 text-[#F5A623] hover:bg-[#F5A623] hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-md"
                  title="Swap Pickup & Dropoff"
                >
                  <ArrowDownUp className="w-3 h-3" />
                </button>
              </div>

              {/* 2. Drop Location (lg:col-span-4) */}
              <div className="relative lg:col-span-4">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#F5A623] mb-1">
                  Drop Location
                </label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3 w-4 h-4 text-[#F5A623] pointer-events-none" />
                  <input
                    type="text"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    onFocus={() => setActiveInput("dropoff")}
                    placeholder="Airport, Hotel, or Destination"
                    required
                    className="w-full bg-[#0A1628] border border-[#F5A623]/25 focus:border-[#F5A623] rounded-xl pl-9 pr-20 py-2 text-xs sm:text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:ring-1 focus:ring-[#F5A623] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => handleGetLocation("dropoff")}
                    disabled={isLocating}
                    className="absolute right-2 text-[10px] text-[#F5A623] hover:text-[#FFC04D] flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#06101E]/70 border border-[#F5A623]/20 cursor-pointer"
                    title="Use GPS"
                  >
                    <Navigation className="w-2.5 h-2.5" />
                    <span className="hidden sm:inline">GPS</span>
                  </button>
                </div>

                {/* Popular Dropdown for Dropoff */}
                {activeInput === "dropoff" && !dropoff && (
                  <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-[#06101E] border border-[#F5A623]/30 rounded-xl shadow-2xl p-2 max-h-48 overflow-y-auto">
                    <div className="text-[10px] uppercase tracking-wider text-[#94A3B8] px-2 py-1 font-semibold">
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
                        className="w-full text-left text-xs px-2.5 py-1.5 rounded-lg text-[#F8FAFC] hover:bg-[#0A1628] hover:text-[#F5A623] transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <MapPin className="w-3 h-3 text-[#F5A623] flex-shrink-0" />
                        <span className="truncate">{loc}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Action Submit Button (lg:col-span-3) */}
              <div className="lg:col-span-3">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-widest gold-button inline-flex items-center justify-center gap-2 shadow-xl shadow-[#F5A623]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Calculate Fare & Reserve</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick date, time & fleet sub-strip */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-[#F5A623]/15 text-xs text-[#94A3B8]">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#F5A623]" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent text-[#F8FAFC] focus:outline-none cursor-pointer text-xs"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#F5A623]" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="bg-transparent text-[#F8FAFC] focus:outline-none cursor-pointer text-xs"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <Car className="w-3 h-3 text-[#F5A623]" />
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="bg-[#0A1628] border border-[#F5A623]/40 rounded-lg px-2 py-0.5 text-[#F8FAFC] font-medium text-xs focus:outline-none focus:ring-1 focus:ring-[#F5A623] cursor-pointer"
                  >
                    <option value="Black Chevrolet Suburban Premier">Black Chevrolet Suburban Premier</option>
                    <option value="Black GMC Yukon Denali">Black GMC Yukon Denali</option>
                    <option value="Black Cadillac Escalade ESV">Black Cadillac Escalade ESV</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-[#F5A623]">
                <Shield className="w-3 h-3" />
                <span>Verified Account Gate • Free 24hr Cancellation (30% within 24h)</span>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Trust Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-3 max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#CBD5E1]">
            <Shield className="w-3 h-3 text-[#F5A623]" />
            <span>100% Commercial Policy</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#CBD5E1]">
            <Clock className="w-3 h-3 text-[#F5A623]" />
            <span>24/7 Round-the-Clock Dispatch</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#CBD5E1]">
            <MapPin className="w-3 h-3 text-[#F5A623]" />
            <span>Pearson Airport (YYZ) & GTA Hub</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#CBD5E1]">
            <Phone className="w-3 h-3 text-[#F5A623]" />
            <span>Direct Chauffeur: (437) 214-9283</span>
          </div>
        </div>
      </div>
    </section>
  );
}
