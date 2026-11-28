"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Award, Phone, Mail, ArrowRight, MapPin } from "lucide-react";
import ScrollReveal, { PopCard, FloatingPopBadge, StaggerContainer, PopItem } from "./ScrollReveal";

const CITY_WALLPAPERS = [
  {
    city: "Toronto Skyline",
    image: "/images/royal12/toronto-skyline-hero.jpg",
    alt: "Toronto Downtown & CN Tower Luxury Night Skyline",
  },
  {
    city: "Calgary Downtown",
    image: "/images/royal12/calgary-skyline-luxury.jpg",
    alt: "Calgary Tower & Bow River Luxury Twilight Skyline",
  },
  {
    city: "Mississauga & GTA",
    image: "/images/royal12/mississauga-gta-night.jpg",
    alt: "Mississauga & Greater Toronto Area Luxury Night Skyline",
  },
  {
    city: "Toronto Waterfront",
    image: "/images/royal12/fairmont-royal-york-night.jpg",
    alt: "Toronto Waterfront Executive Dusk Skyline",
  },
];

const FLEET_CARS = [
  {
    name: "Black Chevrolet Suburban Premier",
    brand: "Chevrolet",
    badge: "Executive SUV • 6 Pax",
    image: "/images/royal12/live-suburban-toronto.jpg",
  },
  {
    name: "Black GMC Yukon Denali",
    brand: "GMC",
    badge: "Denali Reserve • 6 Pax",
    image: "/images/royal12/live-yukon-denali-night.jpg",
  },
  {
    name: "Black Cadillac Escalade ESV",
    brand: "Cadillac",
    badge: "Prestige VIP • 6 Pax",
    image: "/images/royal12/live-escalade-esv-vip.jpg",
  },
];

export default function AboutSection() {
  const [carIndex, setCarIndex] = useState(0);
  const [cityIndex, setCityIndex] = useState(0);

  // Smooth live vehicle rotation (every 2.5s)
  useEffect(() => {
    const carTimer = setInterval(() => {
      setCarIndex((prev) => (prev + 1) % FLEET_CARS.length);
    }, 2500);
    return () => clearInterval(carTimer);
  }, []);

  // Smooth rotating Toronto / Calgary / Mississauga luxury city wallpapers (every 4.5s)
  useEffect(() => {
    const cityTimer = setInterval(() => {
      setCityIndex((prev) => (prev + 1) % CITY_WALLPAPERS.length);
    }, 4500);
    return () => clearInterval(cityTimer);
  }, []);

  const currentCar = FLEET_CARS[carIndex];
  const currentCity = CITY_WALLPAPERS[cityIndex];

  return (
    <section id="about-details" className="py-24 bg-[var(--bg-primary)] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Column with Pop Reveal */}
          <ScrollReveal direction="left" distance={45} className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#F5A623]/30 shadow-2xl h-[470px] bg-[#060B14] group">
              {/* Rotating High-Class City Wallpapers (Toronto, Calgary, Mississauga) */}
              {CITY_WALLPAPERS.map((bg, idx) => (
                <Image
                  key={bg.city}
                  src={bg.image}
                  alt={bg.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  priority={idx === 0}
                  className={`object-cover transition-all duration-1000 ease-in-out filter brightness-[0.92] contrast-[1.06] saturate-[1.12] ${
                    idx === cityIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                />
              ))}

              {/* Cinematic Luxury Vignette (Preserves rich skyline clarity in both Day & Night modes) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A14]/95 via-[#050A14]/20 to-[#050A14]/45 pointer-events-none" />

              {/* Top Badges Bar */}
              <div className="absolute top-4 inset-x-4 flex flex-wrap items-center justify-between gap-2 z-10">
                {/* Licensed Badge */}
                <div className="px-3 py-1.5 rounded-full bg-black/75 border border-[#F5A623]/40 text-[11px] font-semibold text-[#F5A623] flex items-center gap-1.5 backdrop-blur-md shadow-lg">
                  <Award className="w-3.5 h-3.5 text-[#F5A623] flex-shrink-0" />
                  <span>Licensed in Mississauga, ON</span>
                </div>

                {/* Live City Wallpaper Pill (Clickable to cycle Toronto / Calgary / Mississauga) */}
                <button
                  type="button"
                  onClick={() => setCityIndex((prev) => (prev + 1) % CITY_WALLPAPERS.length)}
                  title="Switch City Skyline Wallpaper"
                  className="px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 border border-white/20 hover:border-[#F5A623]/60 text-[11px] font-semibold text-white flex items-center gap-1.5 backdrop-blur-md shadow-lg transition-all cursor-pointer"
                >
                  <MapPin className="w-3 h-3 text-[#F5A623]" />
                  <span>{currentCity.city}</span>
                </button>
              </div>

              {/* 100% Jet Black 3-SUV High-Class Live Showcase Card */}
              <FloatingPopBadge duration={4} className="absolute bottom-4 left-4 right-4 h-56 rounded-2xl overflow-hidden border border-[#F5A623]/45 bg-[#080E1A] shadow-[0_20px_50px_rgba(0,0,0,0.75)]">
                <div className="relative w-full h-full">
                  {FLEET_CARS.map((car, idx) => (
                    <Image
                      key={car.name}
                      src={car.image}
                      alt={car.name}
                      fill
                      sizes="450px"
                      priority={idx === 0}
                      className={`object-cover object-center transition-all duration-700 ease-in-out filter contrast-[1.04] saturate-[1.08] ${
                        idx === carIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                      }`}
                    />
                  ))}

                  {/* Subtle bottom gradient inside car card for crisp ticker legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30 pointer-events-none" />

                  {/* Top Live Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 border border-[#F5A623]/40 text-[10px] font-bold text-[#F5A623] backdrop-blur-md shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-white">{currentCar.badge}</span>
                  </div>

                  {/* Bottom live vehicle ticker & interactive switcher */}
                  <div className="absolute bottom-2 inset-x-2 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/80 border border-white/15 backdrop-blur-md text-[11px] text-white shadow-lg">
                    <span className="font-bold text-[#F5A623] truncate max-w-[215px]">
                      {currentCar.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {FLEET_CARS.map((car, i) => (
                        <button
                          key={car.name}
                          type="button"
                          onClick={() => setCarIndex(i)}
                          aria-label={`Preview ${car.name}`}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            i === carIndex ? "bg-[#F5A623] w-4" : "bg-white/40 hover:bg-white/70 w-1.5"
                          }`}
                        />
                      ))}
                      <span className="text-[9px] text-emerald-400 font-extrabold uppercase tracking-wider ml-1">
                        LIVE
                      </span>
                    </div>
                  </div>
                </div>
              </FloatingPopBadge>
            </div>
          </ScrollReveal>

          {/* Right Content Column */}
          <ScrollReveal direction="right" distance={45} className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                About Royal Twelve Limo
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mt-2">
                Your Comfort, Our Priority.
              </h2>
            </div>

            {/* Sayed Kamran Ali - Founder Profile Card with PopCard */}
            <PopCard
              delay={0.15}
              yDistance={35}
              hoverY={-6}
              className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-luxury)] flex flex-col sm:flex-row items-start sm:items-center gap-4 cursor-default transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[var(--accent-gold)] to-[#8C6B28] p-[2px] flex-shrink-0 shadow-lg shadow-[var(--accent-gold)]/20">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/royal12/sayed-kamran-ali.jpg"
                    alt="Sayed Kamran Ali - Owner & Founder"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-bold text-[var(--text-primary)] tracking-wide">Sayed Kamran Ali</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--accent-gold)] px-2.5 py-0.5 rounded-full border border-[var(--border-subtle)]">
                    Owner & Founder
                  </span>
                </div>
                <p className="text-xs font-semibold text-[var(--accent-gold)]">
                  2+ Years Luxury Livery Experience • Mississauga, ON
                </p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Personally overseeing each reservation to ensure utmost privacy, flawless executive etiquette, and immaculate vehicle presentation.
                </p>
              </div>
            </PopCard>

            <p className="text-sm sm:text-base text-[var(--text-primary)]/85 leading-relaxed">
              Royal Twelve Limo is a premier executive transportation and chauffeured black SUV service
              headquartered in Mississauga, Ontario, proudly serving the Greater Toronto Area. Built
              around the foundational pillars of <strong>safety, discretion, and unwavering punctuality</strong>,
              we cater to discerning corporate executives, travelers, and VIP guests.
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Unlike generic car services that dispatch unpredictable third-party vehicles, Royal Twelve Limo
              maintains a dedicated, pristine fleet of <strong>all-black Chevrolet Suburbans</strong>,
              providing spacious comfort for up to 6 passengers with generous luggage capacity.
              Every reservation is personally reviewed and confirmed by our manual dispatch team to guarantee flawless execution.
            </p>

            {/* Core Commitments with Staggered Pop */}
            <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <PopItem yDistance={30} hoverElevation={-6} className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-start gap-3 cursor-default transition-colors duration-300">
                <ShieldCheck className="w-5 h-5 text-[var(--accent-gold)] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                    Commercial Liability
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Fully insured with commercial livery coverage and rigorous vehicle inspections.
                  </p>
                </div>
              </PopItem>

              <PopItem yDistance={30} hoverElevation={-6} className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-start gap-3 cursor-default transition-colors duration-300">
                <Award className="w-5 h-5 text-[var(--accent-gold)] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                    Executive Protocol
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Professional, background-screened chauffeurs adhering to discreet executive etiquette.
                  </p>
                </div>
              </PopItem>
            </StaggerContainer>

            {/* Direct Contact Info & Booking */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/#booking-quote-engine"
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider gold-button shadow-lg shadow-[var(--accent-gold)]/20 inline-flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <span>Reserve Your Chauffeur</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="tel:+14372149283"
                className="px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider gold-button-outline inline-flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+1 (437) 214-9283</span>
              </a>

              <a
                href="mailto:royaltwelve.ca@gmail.com"
                className="px-5 py-3 rounded-full text-xs font-semibold tracking-wider bg-[var(--bg-card)] text-[var(--accent-gold)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] hover:scale-105 inline-flex items-center gap-2 transition-all shadow-md"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>royaltwelve.ca@gmail.com</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
