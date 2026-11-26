"use client";

import Link from "next/link";
import { MapPin, Plane, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import ScrollReveal, { StaggerContainer, PopItem, PopCard } from "./ScrollReveal";

export default function ServiceAreasSection() {
  const hubs = [
    {
      name: "Toronto Downtown",
      subtext: "Financial District, Yorkville, Harbourfront & Entertainment District",
      type: "Executive & Leisure",
      icon: Building2,
    },
    {
      name: "Mississauga & Peel",
      subtext: "Square One, Meadowvale, Port Credit & Corporate Parks",
      type: "Licensing & Dispatch Hub",
      icon: MapPin,
    },
    {
      name: "Toronto Pearson Airport (YYZ)",
      subtext: "Terminals 1 & 3 Pre-Arranged Livery Curbside Pickup",
      type: "24/7 Flight Tracking",
      icon: Plane,
    },
    {
      name: "Billy Bishop Airport (YTZ)",
      subtext: "Downtown Island Airport Ferry & Tunnel Chauffeur Staging",
      type: "Bespoke Island Transfer",
      icon: Plane,
    },
    {
      name: "Oakville & Halton",
      subtext: "Lakeshore, Downtown Oakville, Burlington & Milton",
      type: "Residential & Corporate",
      icon: MapPin,
    },
    {
      name: "Brampton & Vaughan",
      subtext: "Vaughan Metropolitan Centre, Kleinburg & Bramalea",
      type: "Cross-GTA Livery",
      icon: MapPin,
    },
    {
      name: "Markham & Richmond Hill",
      subtext: "York Region Tech Corridor, Unionville & Executive Centres",
      type: "Corporate Transfers",
      icon: MapPin,
    },
    {
      name: "Extended Southern Ontario",
      subtext: "Niagara-on-the-Lake, Muskoka, Collingwood (By Advance Booking)",
      type: "City-to-City Long Distance",
      icon: MapPin,
    },
  ];

  return (
    <section id="service-areas" className="py-24 bg-[var(--bg-primary)] relative border-t border-[var(--border-subtle)] scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={35} className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[var(--border-subtle)] pb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
              Operating Territory
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mt-2">
              GTA Service Coverage
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mt-4 md:mt-0">
            Headquartered in Mississauga, Royal 12 proudly delivers punctual chauffeured
            black car services across the entire Greater Toronto Area.
          </p>
        </ScrollReveal>

        {/* 8 Hubs Grid with Staggered Spring Pop-Up */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hubs.map((hub, idx) => {
            const Icon = hub.icon;
            return (
              <PopItem
                key={idx}
                yDistance={45}
                hoverElevation={-10}
                className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-all duration-300 flex flex-col justify-between group cursor-default shadow-[var(--shadow-luxury)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-gold)] bg-[var(--accent-soft)] px-2.5 py-1 rounded-full border border-[var(--border-subtle)]">
                      {hub.type}
                    </span>
                    <Icon className="w-4 h-4 text-[var(--accent-gold)] group-hover:text-[var(--accent-gold)] transition-colors" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                    {hub.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                    {hub.subtext}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">Verified Coverage</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              </PopItem>
            );
          })}
        </StaggerContainer>

        {/* Airport Tariff & Out-of-Area Notice */}
        <PopCard delay={0.2} yDistance={30} hoverY={-4} className="mt-12 p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-[var(--shadow-luxury)]">
          <div className="space-y-1 text-left">
            <h4 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
              Planning Long-Distance or Custom Itineraries?
            </h4>
            <p className="text-xs text-[var(--text-secondary)]">
              We accommodate long-distance transfers to Niagara Falls, Muskoka, Collingwood, and London with advance dispatch confirmation.
            </p>
          </div>
          <Link
            href="/#contact"
            className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider gold-button-outline whitespace-nowrap inline-flex items-center gap-1.5 hover:scale-105 transition-transform"
          >
            <span>Request Custom Route</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </PopCard>
      </div>
    </section>
  );
}
