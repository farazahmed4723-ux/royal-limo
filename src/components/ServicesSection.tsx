"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Plane,
  Sparkles,
  Briefcase,
  GlassWater,
  UserCheck,
  Clock,
  ArrowRight,
} from "lucide-react";
import ScrollReveal, { StaggerContainer, PopItem } from "./ScrollReveal";

export default function ServicesSection() {
  const services = [
    {
      id: "airport-transfers",
      title: "Airport Transfer",
      badge: "FLIGHT TRACKING",
      image: "/images/royal12/toronto-pearson-t1.jpg",
      icon: Plane,
      description:
        "Punctual executive transfers to Pearson International (YYZ) & Billy Bishop (YTZ) with real-time flight tracking, terminal curbside pickup & meet and greet.",
    },
    {
      id: "limousine-service",
      title: "Limousine Service",
      badge: "VIP PRESTIGE",
      image: "/images/royal12/fairmont-royal-york-night.jpg",
      icon: Sparkles,
      description:
        "Unrivaled luxury and executive comfort with our flagship Chevrolet Suburban fleet. Handcrafted leather interior, climate control, and whisper-quiet privacy.",
    },
    {
      id: "corporate-travel",
      title: "Corporate Travel",
      badge: "LICENSED CHAUFFEUR",
      image: "/images/royal12/toronto-bay-street-night.jpg",
      icon: Briefcase,
      description:
        "Reliable executive transport for Bay Street meetings, financial district roadshows, executive delegations, and high-profile corporate clients across the GTA.",
    },
    {
      id: "special-events",
      title: "Special Events & Galas",
      badge: "RED CARPET",
      image: "/images/royal12/sankofa-square-night.jpg",
      icon: GlassWater,
      description:
        "Arrive in timeless grandeur at Toronto galas, TIFF premieres, weddings, concerts, and milestone celebrations with dedicated red-carpet staging.",
    },
    {
      id: "private-chauffeur",
      title: "Private Chauffeur Service",
      badge: "DEDICATED DRIVER",
      image: "/images/royal12/toronto-skyline-hero.jpg",
      icon: UserCheck,
      description:
        "An elite personal chauffeur dedicated solely to your schedule. Discreet, courteous, and thoroughly versed in rapid GTA navigation.",
    },
    {
      id: "hourly-service",
      title: "Hourly As-Directed Service",
      badge: "FLEXIBLE DISPOSAL",
      image: "/images/royal12/toronto-bay-street-night.jpg",
      icon: Clock,
      description:
        "Total freedom with hourly chauffeured disposal. Make multiple stops, keep your Suburban staged on standby, and adjust your itinerary on the fly.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-[var(--bg-primary)] relative scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with spring pop reveal */}
        <ScrollReveal direction="up" distance={35} className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[var(--border-subtle)] pb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
              Bespoke Fleet Services
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mt-2">
              Our Premium Services
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mt-4 md:mt-0">
            Every journey with Royal 12 is executed with our flagship Black
            Chevrolet Suburban, accommodating up to 6 passengers with supreme comfort.
          </p>
        </ScrollReveal>

        {/* Service Cards Grid matching layout in Screenshot 3 with Staggered Pop-Up */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <PopItem
                key={service.id}
                yDistance={50}
                hoverElevation={-10}
                className="group relative rounded-3xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-all duration-300 flex flex-col justify-between shadow-[var(--shadow-luxury)] cursor-default"
              >
                {/* Image & Badges */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center filter brightness-[0.75] group-hover:scale-105 group-hover:brightness-[0.85] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-black/30" />

                  {/* Top Right Tag */}
                  {service.badge && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[var(--accent-gold)] text-black shadow-lg">
                      {service.badge}
                    </div>
                  )}

                  {/* Gold Floating Icon */}
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-[var(--bg-card)]/90 border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-gold)] backdrop-blur-md shadow-lg group-hover:bg-[var(--accent-gold)] group-hover:text-black transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Action Links matching Screenshot 3 */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)] text-xs font-semibold">
                    <Link
                      href={`/services/${service.id}`}
                      className="inline-flex items-center gap-1.5 text-[var(--accent-gold)] hover:text-[var(--accent-gold-hover)] transition-colors"
                    >
                      <span>View Page</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                      href="/#booking-quote-engine"
                      className="text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </PopItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
