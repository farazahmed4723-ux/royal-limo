"use client";

import {
  UserCheck,
  ShieldCheck,
  Lock,
  Clock,
  DollarSign,
  Headphones,
} from "lucide-react";
import ScrollReveal, { StaggerContainer, PopItem } from "./ScrollReveal";

export default function WhyChooseSection() {
  const features = [
    {
      title: "Background-Checked Chauffeurs",
      description:
        "Every Royal 12 chauffeur undergoes a thorough criminal background check, clean driving abstract review, and professional luxury reference verification before their first ride.",
      icon: UserCheck,
    },
    {
      title: "Inspected Chevrolet Suburban Fleet",
      description:
        "All vehicles are inspected regularly for mechanical integrity, immaculate cleanliness, and passenger safety. We maintain a modern Chevrolet Suburban fleet with full commercial passenger insurance.",
      icon: ShieldCheck,
    },
    {
      title: "Secure & Confidential Booking",
      description:
        "Your personal travel information is encrypted and protected with industry-standard protocols. Payment details are processed through verified gateways and never stored on our servers.",
      icon: Lock,
    },
    {
      title: "Punctual, Every Time",
      description:
        "We monitor GTA highway conditions and Pearson (YYZ) & Billy Bishop (YTZ) flight tracking in real time to ensure your chauffeur arrives curbside 15 minutes ahead of schedule.",
      icon: Clock,
    },
    {
      title: "Transparent Flat Pricing",
      description:
        "You see the complete fare breakdown before you book. Guaranteed flat rates with no surprise surge pricing, no unstated airport fees, and no hidden surcharges.",
      icon: DollarSign,
    },
    {
      title: "24/7 Dedicated Dispatch Support",
      description:
        "Flight delayed or schedule changed? Our dedicated Mississauga & Toronto dispatchers are available around the clock by direct phone or email.",
      icon: Headphones,
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-[var(--bg-primary)] relative scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with spring pop reveal */}
        <ScrollReveal direction="up" distance={35} className="max-w-3xl mb-16 text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)] mb-3">
            Safety, Discretion & Reliability
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-snug">
            Every aspect of Royal 12 Limousine is designed around keeping you safe
            and comfortable. Serving the GTA.
          </h2>
        </ScrollReveal>

        {/* 6 Feature Rows with Staggered Pop-Up */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <PopItem
                key={idx}
                yDistance={45}
                hoverElevation={-10}
                className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-all duration-300 group cursor-default shadow-[var(--shadow-luxury)]"
              >
                {/* Gold rounded square icon container matching reference */}
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-gold)] flex-shrink-0 group-hover:border-[var(--accent-gold)] group-hover:bg-[var(--accent-soft)] transition-all">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </PopItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
