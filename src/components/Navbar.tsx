"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X, ShieldCheck, Calendar, ChevronRight, User, LogOut, Car, Sparkles } from "lucide-react";
import Royal12Logo from "./Royal12Logo";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const FLEET_CARS = [
  { name: "Black Chevrolet Suburban Premier", brand: "Chevrolet", short: "Suburban" },
  { name: "Black GMC Yukon Denali", brand: "GMC", short: "Yukon Denali" },
  { name: "Black Cadillac Escalade ESV", brand: "Cadillac", short: "Escalade ESV" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isVerified, openAuthModal, signOut } = useAuth();

  // Live 1-Second Vehicle Rotation in Header as explicitly requested
  const [activeCarIndex, setActiveCarIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCarIndex((prev) => (prev + 1) % FLEET_CARS.length);
    }, 1000); // 1-second live rotation
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Fleet", href: "/#fleet" },
    { label: "Why Royal 12", href: "/#why-us" },
    { label: "About Us", href: "/#about" },
    { label: "Service Areas", href: "/#service-areas" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ];

  const currentCar = FLEET_CARS[activeCarIndex];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-xl shadow-black/10 py-2.5"
            : "bg-gradient-to-b from-[var(--bg-primary)]/95 via-[var(--bg-primary)]/75 to-transparent py-3 md:py-4"
        }`}
      >
        {/* TOP STATUS TICKER: Prominently Mentions Cars & Live 1-Second Cycle */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
          <div className="flex items-center justify-between text-[11px] py-1 px-3 sm:px-4 rounded-full bg-[var(--bg-secondary)]/80 border border-[var(--border-subtle)]/60 backdrop-blur-md">
            {/* Left: Mention all 3 vehicles */}
            <div className="flex items-center gap-2 text-[var(--text-secondary)] truncate">
              <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-[var(--accent-gold)]">
                <Car className="w-3.5 h-3.5 text-[var(--accent-gold)] flex-shrink-0" />
                <span>Confirmed Fleet:</span>
              </span>
              <span className="hidden md:inline text-[var(--text-primary)]">
                Chevrolet Suburban • GMC Yukon Denali • Cadillac Escalade
              </span>
              <span className="md:hidden text-[var(--text-primary)]">
                Suburban • Yukon • Escalade
              </span>
            </div>

            {/* Right: Live 1-second rotating status */}
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                LIVE 1s:
              </span>
              <span className="font-extrabold text-[var(--accent-gold)] transition-all duration-300 max-w-[140px] sm:max-w-[190px] truncate">
                {currentCar.name}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Royal12Logo />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-[var(--text-primary)]/85 hover:text-[var(--accent-gold)] transition-colors relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent-gold)] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Right Action Area */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Day / Night Mode Toggle (Always visible on mobile & desktop) */}
              <ThemeToggle />

              {/* User Account / Sign In Indicator */}
              {user ? (
                <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs">
                  <div className="w-6 h-6 rounded-full bg-[var(--accent-gold)] text-black font-bold flex items-center justify-center text-[10px]">
                    {user.firstName?.charAt(0) || "U"}
                  </div>
                  <span className="font-semibold text-[var(--text-primary)] max-w-[100px] truncate">
                    {user.firstName}
                  </span>
                  {isVerified ? (
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                      Verified
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openAuthModal("otp")}
                      className="text-[9px] bg-amber-500/20 text-amber-400 font-bold px-1.5 py-0.5 rounded-full border border-amber-500/30 hover:underline"
                    >
                      Verify
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="text-[var(--text-secondary)] hover:text-red-400 ml-1 p-0.5 cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal("signin")}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--accent-gold)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Phone Click-to-Call */}
              <a
                href="tel:+14372149283"
                className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors px-2 py-1.5 rounded-lg border border-transparent hover:border-[var(--border-subtle)]"
                title="Call 24/7 Dispatch"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-gold)] shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">24/7 Dispatch</span>
                  <span className="text-xs font-semibold text-[var(--text-primary)] tracking-tight">+1 (437) 214-9283</span>
                </div>
              </a>

              {/* Book Now Button */}
              <Link
                href="/#booking-bar"
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider gold-button shadow-lg shadow-[#D4AF63]/20"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Now</span>
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--accent-gold)] hover:text-[var(--text-primary)] focus:outline-none cursor-pointer"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-[var(--bg-primary)] border-l border-[var(--border-subtle)] p-6 flex flex-col justify-between shadow-2xl z-50 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                <Royal12Logo />
                <div className="flex items-center gap-2">
                  <ThemeToggle showLabel />
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* 1s Live Fleet Showcase in Drawer */}
              <div className="my-4 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent-gold)]/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[var(--accent-gold)] flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                    <span>Confirmed Luxury Fleet</span>
                  </span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>LIVE 1s</span>
                  </span>
                </div>
                <div className="space-y-1">
                  {FLEET_CARS.map((car, idx) => (
                    <div
                      key={car.name}
                      className={`px-2 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-all duration-300 ${
                        idx === activeCarIndex
                          ? "bg-[var(--accent-gold)] text-black font-bold shadow-md"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <span>{car.name}</span>
                      {idx === activeCarIndex && <Sparkles className="w-3 h-3 text-black" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation list */}
              <div className="py-2 space-y-1">
                {/* Account row in drawer */}
                <div className="mb-3 pb-3 border-b border-[var(--border-subtle)]">
                  {user ? (
                    <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-black font-bold flex items-center justify-center text-xs">
                          {user.firstName?.charAt(0) || "U"}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[var(--text-primary)]">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-[10px] text-[var(--text-secondary)]">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isVerified ? (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                            Verified
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              openAuthModal("otp");
                            }}
                            className="text-[9px] bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/30"
                          >
                            Verify
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => signOut()}
                          className="text-[var(--text-secondary)] hover:text-red-400 p-1 cursor-pointer"
                          title="Sign Out"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAuthModal("signin");
                      }}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider gold-button-outline flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4" />
                      <span>Passenger Sign In / Register</span>
                    </button>
                  )}
                </div>

                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-gold)] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[var(--accent-gold)]/60" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Contact & Action in Drawer */}
            <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
              <a
                href="tel:+14372149283"
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-left"
              >
                <div className="w-9 h-9 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-secondary)]">Direct Chauffeur Line</div>
                  <div className="text-xs font-semibold text-[var(--text-primary)]">+1 (437) 214-9283</div>
                </div>
              </a>

              <Link
                href="/#booking-bar"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center py-3 rounded-xl text-center text-xs font-semibold uppercase tracking-wider gold-button shadow-lg shadow-[#D4AF63]/25 cursor-pointer"
              >
                Book Your Ride
              </Link>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--text-secondary)] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>100% Commercial Insurance • Licensed Chauffeurs</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
