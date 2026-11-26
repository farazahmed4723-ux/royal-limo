"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Shield, Users, Clock, Award, Phone, Mail } from "lucide-react";
import ScrollReveal, { StaggerContainer, PopItem, PopCard, FloatingPopBadge } from "./ScrollReveal";

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

export default function StatsSection() {
  const [carIndex, setCarIndex] = useState(0);

  // Live 1-second vehicle rotation as requested
  useEffect(() => {
    const interval = setInterval(() => {
      setCarIndex((prev) => (prev + 1) % FLEET_CARS.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      value: "2+ Years",
      label: "Luxury Livery Experience",
      subtext: "Sayed Kamran Ali, Founder",
      icon: Award,
    },
    {
      value: "100%",
      label: "Commercial Insurance",
      subtext: "Fully Licensed & Insured",
      icon: Shield,
    },
    {
      value: "3 SUVs",
      label: "Confirmed Executive Fleet",
      subtext: "Suburban • Yukon • Escalade",
      icon: Users,
    },
    {
      value: "24/7",
      label: "Always Available",
      subtext: "Direct Chauffeur Dispatch",
      icon: Clock,
    },
  ];

  const currentCar = FLEET_CARS[carIndex];

  return (
    <section id="about" className="relative py-20 bg-[var(--bg-primary)] overflow-hidden scroll-mt-20">
      {/* Subtle arched golden glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-72 bg-[radial-gradient(ellipse_at_top,_var(--accent-soft),_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading with Pop-up reveal */}
        <ScrollReveal direction="up" distance={30} className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)] px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Executive Leadership & Proven Excellence</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mt-3">
            About Royal 12 Limo
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2">
            Founded and led by <strong>Sayed Kamran Ali</strong>, providing 2+ years of personalized, ultra-premium chauffeured black SUV service across Mississauga and the Greater Toronto Area.
          </p>
        </ScrollReveal>

        {/* Top 4 Stats Counters with Staggered Spring Pop-Up */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 pb-16 border-b border-[var(--border-subtle)] text-center"
        >
          {stats.map((stat, idx) => (
            <PopItem key={idx}>
              <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/50 transition-all duration-300 group shadow-[var(--shadow-luxury)] hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto mb-4 text-[var(--accent-gold)] group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-[var(--accent-gold)] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] mt-1.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            </PopItem>
          ))}
        </StaggerContainer>

        {/* Chauffeur & Vehicle Staging Card matching screenshot 1 with Pop Reveal */}
        <ScrollReveal direction="up" distance={45} className="mt-16 relative rounded-3xl overflow-hidden border border-[var(--border-subtle)] shadow-2xl">
          <div className="relative h-[440px] sm:h-[500px] w-full">
            <Image
              src="/images/royal12/fairmont-royal-york-night.jpg"
              alt="Royal 12 Chauffeur staging at luxury Toronto hotel with CN Tower skyline"
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-center filter brightness-[0.88] contrast-[1.08] saturate-[1.15]"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)]/80 via-transparent to-transparent" />

            {/* 1-SECOND LIVE ROTATING JET BLACK SUV SHOWCASE (Chevrolet Suburban • GMC Yukon Denali • Cadillac Escalade) */}
            <FloatingPopBadge duration={4.2} className="absolute bottom-6 left-6 hidden md:block w-96 h-52 rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[#050507] shadow-2xl backdrop-blur-xl">
              <div className="relative w-full h-full">
                {FLEET_CARS.map((car, idx) => (
                  <Image
                    key={car.name}
                    src={car.image}
                    alt={car.name}
                    fill
                    priority
                    unoptimized
                    sizes="384px"
                    className={`object-cover object-center filter brightness-[1.04] contrast-[1.08] transition-opacity duration-300 ${
                      idx === carIndex ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  />
                ))}

                {/* Top Badge with pulsing live indicator */}
                <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-primary)]/95 backdrop-blur-md border border-[var(--border-subtle)] text-[10px] font-bold text-[var(--accent-gold)] shadow-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{currentCar.badge}</span>
                </div>

                {/* Bottom 1s Live Ticker bar */}
                <div className="absolute bottom-2 inset-x-2 flex items-center justify-between px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md text-[10px] text-white border border-white/10">
                  <span className="font-semibold text-[var(--accent-gold)] truncate max-w-[200px]">
                    {currentCar.name}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {FLEET_CARS.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === carIndex ? "bg-[var(--accent-gold)] w-3.5" : "bg-white/40 w-1.5"
                        }`}
                      />
                    ))}
                    <span className="text-[9px] text-emerald-400 font-bold ml-1">LIVE 1s</span>
                  </div>
                </div>
              </div>
            </FloatingPopBadge>

            {/* Floating Owner & Founder Spotlight Card with Spring Pop */}
            <PopCard
              delay={0.2}
              yDistance={35}
              hoverY={-6}
              className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 max-w-md w-[calc(100%-3rem)] sm:w-auto p-5 sm:p-6 rounded-2xl bg-[var(--bg-modal)]/95 backdrop-blur-xl border border-[var(--accent-gold)]/60 shadow-2xl text-left"
            >
              <div className="flex items-center gap-3.5 mb-3">
                {/* Owner Avatar with Gold Radial Glow */}
                <div className="relative w-14 h-14 rounded-full p-[2px] bg-gradient-to-br from-[#F3E5AB] via-[var(--accent-gold)] to-[#8C6B28] flex-shrink-0 shadow-lg shadow-[var(--accent-gold)]/40">
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
                  <div className="flex items-center gap-2">
                    <h4 className="font-display text-base font-bold text-[var(--text-primary)] tracking-wide">
                      Sayed Kamran Ali
                    </h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[var(--accent-soft)] text-[var(--accent-gold)] px-2 py-0.5 rounded-full border border-[var(--border-subtle)]">
                      Owner & Founder
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[var(--accent-gold)]">
                    2+ Years Experience • Royal 12 Limo
                  </p>
                  <p className="text-[10px] text-[var(--text-secondary)]">
                    Licensed Operator • Mississauga, Ontario
                  </p>
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm text-[var(--text-primary)]/90 italic leading-relaxed border-t border-[var(--border-subtle)] pt-3">
                &ldquo;Our mission is to deliver ultra-premium executive transportation with unmatched
                professionalism, utmost passenger discretion, and guaranteed comfort across Mississauga and the Greater Toronto Area.
                Your comfort, our priority.&rdquo;
              </blockquote>

              <div className="mt-3.5 pt-3 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <a href="tel:+14372149283" className="text-[var(--text-primary)] hover:text-[var(--accent-gold)] font-semibold transition-colors">
                    +1 (437) 214-9283
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <a href="mailto:royaltwelve.ca@gmail.com" className="text-[var(--accent-gold)] hover:underline">
                    royaltwelve.ca@gmail.com
                  </a>
                </div>
              </div>
            </PopCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
