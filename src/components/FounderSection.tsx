"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Award, ShieldCheck, Clock, CheckCircle2, Star, ArrowRight } from "lucide-react";
import ScrollReveal, { PopCard } from "./ScrollReveal";

export default function FounderSection() {
  const pillars = [
    {
      title: "Direct Founder Oversight",
      desc: "Sayed Kamran Ali personally monitors dispatch schedules, flight tracking, and vehicle preparation for every trip.",
      icon: Award,
    },
    {
      title: "Discretion & Executive Privacy",
      desc: "Strict confidentiality protocols, acoustic privacy glass, and discrete chauffeurs for corporate executives and dignitaries.",
      icon: ShieldCheck,
    },
    {
      title: "Guaranteed Punctuality",
      desc: "Early on-site staging 15 minutes before every scheduled pickup. Zero delays for Pearson Airport (YYZ) departures.",
      icon: Clock,
    },
    {
      title: "Showroom Fleet Presentation",
      desc: "Exclusively operating confirmed Jet Black SUVs, sanitized, polished, and provisioned with chilled spring water.",
      icon: Star,
    },
  ];

  return (
    <section id="founder" className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden transition-colors duration-300 border-t border-[var(--border-subtle)]">
      {/* Ambient background gold glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,_var(--accent-soft),_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)] px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] inline-flex items-center gap-1.5 shadow-sm">
            <Award className="w-3.5 h-3.5" />
            <span>Executive Leadership & Proven Accountability</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mt-3">
            Meet Sayed Kamran Ali
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2">
            Owner, Founder &amp; Lead Chauffeur of Royal Twelve Limo — Bringing 2+ years of personalized executive livery excellence across Mississauga and the Greater Toronto Area.
          </p>
        </ScrollReveal>

        {/* Split Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Portrait Showcase */}
          <ScrollReveal direction="left" distance={45} className="lg:col-span-5 relative mx-auto max-w-md lg:max-w-none w-full">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[var(--accent-gold)] shadow-2xl shadow-black/40 bg-[var(--bg-card)] group">
              {/* Founder Portrait Photo */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-b from-[#1C2028] to-[#0A0E17]">
                <Image
                  src="/images/royal12/sayed-kamran-ali.jpg"
                  alt="Sayed Kamran Ali - Owner & Founder of Royal 12 Limo"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-top filter brightness-[1.02] contrast-[1.04] group-hover:scale-[1.02] transition-transform duration-700"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-black/20" />

                {/* Top Founder Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 border border-[var(--accent-gold)]/70 text-xs font-bold text-[var(--accent-gold)] backdrop-blur-md shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Owner &amp; Founder</span>
                </div>

                {/* Top Experience Tag */}
                <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 border border-white/20 text-xs font-semibold text-white backdrop-blur-md shadow-lg">
                  <Star className="w-3.5 h-3.5 text-[var(--accent-gold)] fill-[var(--accent-gold)]" />
                  <span>2+ Yrs Exp</span>
                </div>
              </div>

              {/* Bottom Credential Bar */}
              <div className="p-6 bg-[var(--bg-card)] border-t border-[var(--border-subtle)] text-left space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                      Sayed Kamran Ali
                    </h3>
                    <p className="text-xs font-semibold text-[var(--accent-gold)] mt-0.5">
                      Direct Livery Dispatch • Mississauga, ON
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--border-subtle)] text-[10px] font-bold text-[var(--accent-gold)] uppercase tracking-wider">
                    Verified
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] pt-1 border-t border-[var(--border-subtle)]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Licensed Commercial Chauffeur &amp; $5M Insured Livery</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Founder's Vision, Quote & 4 Pillars */}
          <ScrollReveal direction="right" distance={45} className="lg:col-span-7 space-y-6 text-left">
            {/* Personal Quote Card */}
            <PopCard
              delay={0.15}
              yDistance={25}
              className="p-6 sm:p-7 rounded-2xl bg-[var(--bg-card)] border-l-4 border-l-[var(--accent-gold)] border border-[var(--border-subtle)] shadow-[var(--shadow-luxury)] relative"
            >
              <div className="text-3xl text-[var(--accent-gold)]/40 font-serif leading-none mb-2 select-none">&ldquo;</div>
              <blockquote className="text-sm sm:text-base text-[var(--text-primary)] italic leading-relaxed font-medium">
                When you reserve with Royal 12, you are never treated like an algorithm on a rideshare app.
                I personally oversee every airport arrival, corporate itinerary, and vehicle preparation so you step into a tranquil, spotless SUV and arrive with absolute peace of mind.
              </blockquote>
              <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                  <div className="font-display text-sm font-bold text-[var(--text-primary)]">Sayed Kamran Ali</div>
                  <div className="text-xs text-[var(--text-secondary)]">Founder, Royal 12 Limousine Service</div>
                </div>
                <div className="text-xs font-bold text-[var(--accent-gold)] tracking-wider uppercase">
                  Mississauga • GTA
                </div>
              </div>
            </PopCard>

            {/* 4 Pillars of Excellence Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/50 transition-all duration-300 shadow-sm group hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-gold)] mb-3 group-hover:scale-110 transition-transform">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display text-sm font-bold text-[var(--text-primary)] mb-1">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Connect Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="tel:+14372149283"
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[var(--accent-gold)] text-black inline-flex items-center gap-2 shadow-lg shadow-[var(--accent-gold)]/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-black" />
                <span>Call Sayed Directly: (437) 214-9283</span>
              </a>

              <a
                href="mailto:royaltwelve.ca@gmail.com"
                className="px-5 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] inline-flex items-center gap-2 backdrop-blur-md shadow-sm active:scale-95 transition-all"
              >
                <Mail className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>royaltwelve.ca@gmail.com</span>
              </a>

              <Link
                href="/#booking-bar"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-gold)] hover:underline ml-2"
              >
                <span>Reserve with Founder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
