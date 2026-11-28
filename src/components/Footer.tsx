import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import Royal12Logo from "./Royal12Logo";

export default function Footer() {
  const serviceLinks = [
    { label: "Mississauga Airport Limo", href: "/mississauga-airport-limo/" },
    { label: "Toronto Airport Limo", href: "/airport-limo-toronto/" },
    { label: "Wedding Limo Mississauga", href: "/wedding-limo-mississauga/" },
    { label: "Corporate Limo", href: "/corporate-limo/" },
    { label: "Hourly Chauffeur", href: "/hourly-chauffeur/" },
  ];

  const companyLinks = [
    { label: "Executive Fleet", href: "/fleet/" },
    { label: "Rates & Flat Pricing", href: "/rates/" },
    { label: "Service Areas", href: "/service-areas/" },
    { label: "Request a Flat Quote", href: "/get-a-quote/" },
    { label: "Contact Us", href: "/contact/" },
  ];

  const supportLinks = [
    { label: "Frequently Asked Questions", href: "/faq/" },
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms and Conditions", href: "/terms/" },
    { label: "Cancellation & Refund Policy", href: "/policies/cancellation/" },
    { label: "Admin Dispatch Portal", href: "/admin/" },
  ];

  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] pt-16 pb-12 text-[var(--text-secondary)] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[var(--border-subtle)]">
          {/* Brand Info Left */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <Royal12Logo size="lg" />

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-2">
              Royal Twelve Limo is Mississauga, Ontario&apos;s premier luxury limousine and chauffeur service.
              Operating exclusively with our confirmed black SUV fleet: Chevrolet Suburban Premier, GMC Yukon Denali &amp; Cadillac Escalade ESV. Available 24/7 with guaranteed flat rates.
            </p>

            {/* 24/7 Round-the-clock service badge matching screenshot 6 */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-emerald-500/30 text-xs font-medium text-emerald-500 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>24/7 Dedicated Dispatch</span>
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
                <span>Serving Mississauga and the GTA</span>
              </div>
            </div>
          </div>

          {/* Column 1: Services */}
          <div className="lg:col-span-3 text-left">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">
              Limo Services
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
              Fleet &amp; Company
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
              <span className="text-[var(--accent-gold)] font-semibold">Price Policy:</span> Price confirmed by quote before you book.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
          <p>© 2026 Royal Twelve Limo. All rights reserved.</p>
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
