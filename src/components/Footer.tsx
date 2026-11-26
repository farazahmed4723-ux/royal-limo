import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import Royal12Logo from "./Royal12Logo";

export default function Footer() {
  const serviceLinks = [
    { label: "Airport Transfer", href: "/services/airport-transfers" },
    { label: "Limousine Service", href: "/services/limousine-service" },
    { label: "Chauffeur Service", href: "/services/private-chauffeur" },
    { label: "Hourly Service", href: "/services/hourly-service" },
    { label: "City to City", href: "/services/city-to-city" },
    { label: "Corporate Travel", href: "/services/corporate-travel" },
    { label: "Special Event", href: "/services/special-events" },
    { label: "Point to Point", href: "/services/point-to-point" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/#about" },
    { label: "Fleet (Chevrolet Suburban)", href: "/#fleet" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Why Choose Us", href: "/#why-us" },
    { label: "Service Areas", href: "/#service-areas" },
    { label: "Contact Us", href: "/#contact" },
  ];

  const supportLinks = [
    { label: "Frequently Asked Questions", href: "/#faq" },
    { label: "Booking Portal", href: "/#booking-quote-engine" },
    { label: "Cancellation & Refund Policy", href: "/policies/cancellation" },
    { label: "Terms and Conditions", href: "/policies/terms" },
    { label: "Privacy Policy", href: "/policies/privacy" },
    { label: "Admin Portal", href: "/admin" },
  ];

  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] pt-16 pb-12 text-[var(--text-secondary)] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[var(--border-subtle)]">
          {/* Brand Info Left */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <Royal12Logo />

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-2">
              First-class executive limousine & black SUV transportation across Toronto and the GTA.
              Operating exclusively with our flagship Chevrolet Suburban fleet. Available 24/7 with
              guaranteed flat pricing.
            </p>

            {/* 24/7 Round-the-clock service badge matching screenshot 6 */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-emerald-500/30 text-xs font-medium text-emerald-500 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>24/7 Round-the-Clock Service</span>
            </div>

            {/* Direct Contact */}
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[var(--text-primary)]">
                <Phone className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <a href="tel:+14372149283" className="hover:text-[var(--accent-gold)] transition-colors">
                  +1 (437) 214-9283
                </a>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-primary)]">
                <Mail className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <a href="mailto:royaltwelve.ca@gmail.com" className="hover:text-[var(--accent-gold)] transition-colors">
                  royaltwelve.ca@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>Mississauga, Ontario, Canada (Servicing the GTA)</span>
              </div>
            </div>
          </div>

          {/* Column 1: Services */}
          <div className="lg:col-span-3 text-left">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[var(--accent-gold)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="lg:col-span-2 text-left">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[var(--accent-gold)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Support & Policies */}
          <div className="lg:col-span-3 text-left">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[var(--accent-gold)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
              <span className="text-[var(--accent-gold)] font-semibold">Cancellation Policy:</span> Under 24h = 30% non-refundable, 70% refundable.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
          <p>© 2026 Royal 12 Limo. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Premium • Safe • Reliable</span>
            <span>•</span>
            <span>Your Comfort, Our Priority</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
