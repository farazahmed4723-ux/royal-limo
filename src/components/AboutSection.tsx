"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Award, Phone, Mail, ArrowRight } from "lucide-react";
import ScrollReveal, { PopCard, FloatingPopBadge, StaggerContainer, PopItem } from "./ScrollReveal";

const FLEET_CARS = [
  {
    name: "Black Chevrolet Suburban Premier",
    brand: "Chevrolet",
    badge: "100% Jet Black Suburban",
    image: "/images/royal12/fleet-suburban-black.jpg",
  },
  {
    name: "Black GMC Yukon Denali",
    brand: "GMC",
    badge: "100% Jet Black Yukon Denali",
    image: "/images/royal12/fleet-gmc-yukon-denali.jpg",
  },
  {
    name: "Black Cadillac Escalade ESV",
    brand: "Cadillac",
    badge: "100% Jet Black Escalade ESV",
    image: "/images/royal12/fleet-cadillac-escalade.jpg",
  },
];

export default function AboutSection() {
  const [carIndex, setCarIndex] = useState(0);

  // Live 1-second vehicle rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCarIndex((prev) => (prev + 1) % FLEET_CARS.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentCar = FLEET_CARS[carIndex];
  return (
    <section id="about-details" className="py-24 bg-[var(--bg-primary)] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Column with Pop Reveal */}
          <ScrollReveal direction="left" distance={45} className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[var(--border-subtle)] shadow-2xl h-[460px]">
              <Image
                src="/images/royal12/fairmont-royal-york-night.jpg"
                alt="Royal 12 Limo Toronto Operations"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover filter brightness-[0.88] contrast-[1.08] saturate-[1.15]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-90" />

              {/* 100% Jet Black 3-SUV Live 1-Second Rotating Showcase */}
              <FloatingPopBadge duration={4} className="absolute bottom-4 left-4 right-4 h-48 rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)]/95 backdrop-blur-xl shadow-2xl">
                <div className="relative w-full h-full">
                  <Image
                    key={currentCar.name}
                    src={currentCar.image}
                    alt={currentCar.name}
                    fill
                    sizes="400px"
                    className="object-contain p-2 filter brightness-[0.98] contrast-[1.08] transition-opacity duration-300"
                  />
                  {/* Top Badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[var(--bg-primary)]/90 border border-[var(--border-subtle)] text-[10px] font-bold text-[var(--accent-gold)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>{currentCar.badge}</span>
                  </div>

                  {/* Bottom live ticker */}
                  <div className="absolute bottom-1.5 inset-x-2 flex items-center justify-between px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md text-[10px] text-white">
                    <span className="font-semibold text-[var(--accent-gold)] truncate max-w-[190px]">
                      {currentCar.name}
                    </span>
                    <div className="flex items-center gap-1">
                      {FLEET_CARS.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === carIndex ? "bg-[var(--accent-gold)] w-3" : "bg-white/40 w-1.5"
                          }`}
                        />
                      ))}
                      <span className="text-[8px] text-emerald-400 font-bold ml-1">1s</span>
                    </div>
                  </div>
                </div>
              </FloatingPopBadge>

              {/* Gold Badge */}
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)]/95 border border-[var(--border-subtle)] text-xs font-semibold text-[var(--accent-gold)] flex items-center gap-2 backdrop-blur-md shadow-md">
                <Award className="w-4 h-4" />
                <span>Licensed in Mississauga, Ontario</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Content Column */}
          <ScrollReveal direction="right" distance={45} className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                About Royal 12 Limo
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
              Royal 12 Limo is a premier executive transportation and chauffeured black SUV service
              headquartered in Mississauga, Ontario, proudly serving the Greater Toronto Area. Built
              around the foundational pillars of <strong>safety, discretion, and unwavering punctuality</strong>,
              we cater to discerning corporate executives, travelers, and VIP guests.
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Unlike generic car services that dispatch unpredictable third-party vehicles, Royal 12
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
