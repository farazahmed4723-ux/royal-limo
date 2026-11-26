"use client";

import { MapPin, Calendar, Receipt, CreditCard, ShieldCheck } from "lucide-react";
import ScrollReveal, { StaggerContainer, PopItem } from "./ScrollReveal";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Enter Locations",
      description: "Specify your pickup and destination addresses anywhere in the GTA or use verified GPS.",
      icon: MapPin,
    },
    {
      number: "02",
      title: "Select Schedule",
      description: "Choose your date, pickup time, and confirm your passenger (up to 6) and luggage count.",
      icon: Calendar,
    },
    {
      number: "03",
      title: "Get Real-Time Quote",
      description: "Receive an upfront, transparent fare with Ontario HST and optional gratuity calculated dynamically.",
      icon: Receipt,
    },
    {
      number: "04",
      title: "Select Payment Preference",
      description: "Pay securely via Stripe (Credit/Debit/Apple Pay), PayPal, or Interac e-Transfer.",
      icon: CreditCard,
    },
    {
      number: "05",
      title: "Manual Dispatch Confirmation",
      description: "Our dispatch team reviews your itinerary, assigns your Suburban, and sends full staging details.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[var(--bg-primary)] relative border-t border-[var(--border-subtle)] scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={35} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
            Effortless Chauffeur Reservation
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mt-2">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-3">
            Five streamlined steps to securing your executive Chevrolet Suburban in Toronto and the Greater Toronto Area.
          </p>
        </ScrollReveal>

        {/* 5 Step Process Grid with Staggered Spring Pop-Up */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <PopItem
                key={idx}
                yDistance={45}
                hoverElevation={-10}
                className="relative rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 flex flex-col justify-between hover:border-[var(--accent-gold)] transition-all duration-300 group cursor-default shadow-[var(--shadow-luxury)]"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-2xl font-bold text-[var(--accent-gold)]/60 group-hover:text-[var(--accent-gold)] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-gold)] group-hover:bg-[var(--accent-gold)] group-hover:text-black transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-base font-bold text-[var(--text-primary)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">
                  Step {idx + 1} of 5
                </div>
              </PopItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
