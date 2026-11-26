"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Briefcase, Shield, Sparkles, Check, Car } from "lucide-react";
import ScrollReveal, { StaggerContainer, PopItem, FloatingPopBadge } from "./ScrollReveal";

const FLEET_VEHICLES = [
  {
    id: "suburban",
    name: "Chevrolet Suburban Premier",
    brand: "Chevrolet",
    badge: "100% Jet Black High Country Studio",
    tagline: "The Benchmark in Executive Livery & Highway Comfort",
    desc: "Engineered for executive privacy and effortless highway cruising across Toronto, Pearson Airport (YYZ), and the wider Golden Horseshoe. Unmatched rear passenger legroom and luggage volume.",
    image: "/images/royal12/fleet-suburban-black.jpg",
    specs: [
      { label: "Max Passengers", value: "Up to 6 Guests", icon: Users },
      { label: "Luggage Capacity", value: "6 Large Suitcases", icon: Briefcase },
      { label: "Vehicle Class", value: "Premier Luxury SUV", icon: Shield },
      { label: "Exterior Color", value: "Jet Obsidian Black", icon: Sparkles },
    ],
  },
  {
    id: "yukon",
    name: "GMC Yukon Denali XL",
    brand: "GMC",
    badge: "100% Jet Black Executive Denali",
    tagline: "Executive Presence with Chrome Grille & Denali Luxury",
    desc: "Distinguished by its commanding signature chrome grille, magnetic ride suspension, and whisper-quiet interior. Built for corporate executives and VIP airport transfers who demand absolute poise.",
    image: "/images/royal12/fleet-gmc-yukon-denali.jpg",
    specs: [
      { label: "Max Passengers", value: "Up to 6 Guests", icon: Users },
      { label: "Luggage Capacity", value: "6 Large Suitcases", icon: Briefcase },
      { label: "Vehicle Class", value: "Executive Luxury SUV", icon: Shield },
      { label: "Exterior Color", value: "Onyx Jet Black", icon: Sparkles },
    ],
  },
  {
    id: "escalade",
    name: "Cadillac Escalade ESV",
    brand: "Cadillac",
    badge: "100% Jet Black Prestige VIP Edition",
    tagline: "The Pinnacle of American Prestige & VIP Status",
    desc: "The undisputed gold standard in VIP luxury livery. Featuring hand-tailored leather, curved OLED displays, vertical LED running lights, and studio acoustic serenity for celebrity, VIP, and dignitary travel.",
    image: "/images/royal12/fleet-cadillac-escalade.jpg",
    specs: [
      { label: "Max Passengers", value: "Up to 6 Guests", icon: Users },
      { label: "Luggage Capacity", value: "6 Large Suitcases", icon: Briefcase },
      { label: "Vehicle Class", value: "Prestige VIP Flagship", icon: Shield },
      { label: "Exterior Color", value: "Black Raven Obsidian", icon: Sparkles },
    ],
  },
];

export default function FleetSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Live 1-second auto-rotation across Suburban, Yukon Denali, and Cadillac Escalade
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setSelectedIdx((prev) => (prev + 1) % FLEET_VEHICLES.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeVehicle = FLEET_VEHICLES[selectedIdx];

  const features = [
    "Acoustic privacy glass & tinted passenger windows",
    "Executive heated and ventilated handcrafted leather seating",
    "Tri-zone independent rear climate controls",
    "High-speed device charging ports (USB-C & 110V outlets)",
    "Bose Centerpoint surround sound acoustics",
    "Complimentary chilled bottled spring water & mints",
    "Commercial livery permits and $5M passenger liability insurance",
    "Ample rear cargo room designed for airport luggage & golf bags",
  ];

  return (
    <section id="fleet" className="py-24 bg-[var(--bg-primary)] relative scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Spring Pop */}
        <ScrollReveal direction="up" distance={35} className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)] px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] inline-flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5" />
            <span>Exclusively Dedicated Fleet</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mt-3">
            Confirmed Jet Black Luxury SUVs
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2">
            Royal 12 operates exclusively with 3 world-class all-black luxury SUVs — <strong>Black Chevrolet Suburban Premier</strong>, <strong>Black GMC Yukon Denali</strong>, and <strong>Black Cadillac Escalade ESV</strong>.
          </p>

          {/* Interactive 3-Vehicle Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {FLEET_VEHICLES.map((v, i) => (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  setSelectedIdx(i);
                  setIsAutoPlaying(false);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                  i === selectedIdx
                    ? "bg-[var(--accent-gold)] text-black shadow-lg shadow-[var(--accent-gold)]/25 ring-2 ring-[var(--accent-gold)]/60 scale-105"
                    : "bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--accent-gold)]/50"
                }`}
              >
                <Car className="w-4 h-4" />
                <span>{v.name}</span>
                {i === selectedIdx && (
                  <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                )}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              className="px-3.5 py-2 rounded-full text-xs font-bold tracking-wider uppercase border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--accent-gold)] hover:border-[var(--accent-gold)] cursor-pointer flex items-center gap-1.5"
            >
              <span className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-emerald-400 animate-ping" : "bg-amber-400"}`} />
              <span>{isAutoPlaying ? "Live 1s On" : "Resume Live 1s"}</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Vehicle Showcase Container */}
        <div className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 sm:p-10 shadow-[var(--shadow-luxury)] transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Gallery Left with Spring Reveal */}
            <ScrollReveal direction="left" distance={45} className="lg:col-span-7 space-y-4">
              {/* Primary Exterior Shot - All 3 Preloaded for Instant 1s Live Rotation */}
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-[#F5A623]/25 bg-[#050507] shadow-2xl">
                {FLEET_VEHICLES.map((car, idx) => (
                  <Image
                    key={car.id}
                    src={car.image}
                    alt={car.name}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 700px"
                    className={`object-cover object-center filter brightness-[1.05] contrast-[1.06] transition-opacity duration-300 ${
                      idx === selectedIdx ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  />
                ))}
                <FloatingPopBadge duration={3.6} className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)]/90 border border-[var(--border-subtle)] text-xs font-semibold text-[var(--accent-gold)] backdrop-blur-md shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{activeVehicle.badge}</span>
                </FloatingPopBadge>

                {/* Bottom pill */}
                <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-xs text-white border border-white/10">
                  <span className="font-bold text-[var(--accent-gold)]">{activeVehicle.name}</span>
                  <div className="flex items-center gap-1.5">
                    {FLEET_VEHICLES.map((_, idx) => (
                      <span
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === selectedIdx ? "bg-[var(--accent-gold)] w-4" : "bg-white/40 w-1.5"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Secondary Views (Interior & Rear) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-44 rounded-xl overflow-hidden border border-[var(--border-subtle)] group">
                  <Image
                    src="/images/royal12/suburban-interior.jpg"
                    alt="Executive Leather Interior"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded bg-black/80 text-[10px] text-white">
                    Executive Cabin
                  </div>
                </div>

                <div className="relative h-44 rounded-xl overflow-hidden border border-[var(--border-subtle)] group">
                  <Image
                    src="/images/royal12/suburban-black-2.jpg"
                    alt="Jet Black Rear Profile"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded bg-black/80 text-[10px] text-white">
                    Rear Jet Black Profile
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Vehicle Details Right */}
            <ScrollReveal direction="right" distance={45} className="lg:col-span-5 space-y-6 text-left">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                  Vehicle Class: {activeVehicle.brand}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-1">
                  {activeVehicle.name}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">
                  {activeVehicle.desc}
                </p>
              </div>

              {/* 4 Quick Spec Badges with Staggered Pop */}
              <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 gap-3">
                {activeVehicle.specs.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <PopItem
                      key={i}
                      yDistance={30}
                      hoverElevation={-6}
                      className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center gap-3 cursor-default transition-colors duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-gold)] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                          {item.label}
                        </div>
                        <div className="text-xs font-bold text-[var(--text-primary)]">
                          {item.value}
                        </div>
                      </div>
                    </PopItem>
                  );
                })}
              </StaggerContainer>

              {/* Feature Checklist */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-gold)]">
                  Cabin Amenities & Standards
                </div>
                <div className="space-y-2">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
                      <div className="w-4 h-4 rounded-full bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent-gold)] flex-shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="/#booking-bar"
                  className="w-full sm:w-auto px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest gold-button inline-flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF63]/25 cursor-pointer"
                >
                  <span>Reserve {activeVehicle.brand} SUV</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
