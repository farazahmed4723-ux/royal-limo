import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Award, Phone, Mail, ArrowRight, Clock, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Leadership | Royal 12 Limo - Sayed Kamran Ali",
  description:
    "Learn about Royal 12 Limo, founded by Sayed Kamran Ali with 2+ years of luxury livery experience in Mississauga and the Greater Toronto Area. Operating exclusively black Chevrolet Suburbans.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Header Banner */}
      <div className="relative py-16 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)] px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] inline-flex items-center gap-1.5 shadow-sm">
            <Award className="w-3.5 h-3.5" />
            <span>Meet The Leadership</span>
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mt-4">
            About Royal 12 Limo
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto mt-3">
            Ultra-premium executive transportation across Mississauga, Toronto, and the GTA, founded by Sayed Kamran Ali.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Founder Spotlight Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-luxury)] relative overflow-hidden transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border-2 border-[var(--accent-gold)] shadow-2xl bg-black">
                <Image
                  src="/images/royal12/sayed-kamran-ali.jpg"
                  alt="Sayed Kamran Ali - Royal 12 Limo Owner & Founder"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-[var(--accent-gold)]/60 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-2 border-[var(--accent-gold)] overflow-hidden relative flex-shrink-0">
                      <Image
                        src="/images/royal12/sayed-kamran-ali.jpg"
                        alt="Sayed Kamran Ali"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white">Sayed Kamran Ali</h3>
                      <p className="text-xs text-[var(--accent-gold)] font-semibold">Owner &amp; Founder</p>
                      <p className="text-[11px] text-slate-300">2+ Years Luxury Livery Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio & Details */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--accent-gold)]">
                <span>2+ Years Experience in Mississauga & GTA</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Personalized Chauffeur Excellence by Sayed Kamran Ali
              </h2>

              <p className="text-sm sm:text-base text-[var(--text-primary)]/90 leading-relaxed">
                With <strong>over 2 years of dedicated luxury chauffeured livery experience</strong> in Mississauga and the Greater Toronto Area,
                Sayed Kamran Ali established Royal 12 Limo with a singular standard: providing executives, diplomats, and international travelers
                with an uncompromised level of punctuality, privacy, and vehicle excellence.
              </p>

              <blockquote className="p-4 rounded-xl bg-[var(--bg-secondary)] border-l-4 border-[var(--accent-gold)] text-sm italic text-[var(--text-primary)]">
                &ldquo;Our mission is to deliver ultra-premium executive transportation with unmatched professionalism, utmost passenger discretion, and guaranteed comfort across Mississauga and the Greater Toronto Area. Your comfort, our priority.&rdquo;
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                  <Phone className="w-4 h-4 text-[var(--accent-gold)] flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-[var(--text-secondary)]">Direct Chauffeur Line</div>
                    <a href="tel:+14372149283" className="font-bold text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors">
                      +1 (437) 214-9283
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                  <Mail className="w-4 h-4 text-[var(--accent-gold)] flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-[var(--text-secondary)]">Direct Email</div>
                    <a href="mailto:royaltwelve.ca@gmail.com" className="font-bold text-[var(--accent-gold)] hover:underline">
                      royaltwelve.ca@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Standards & Fleet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3 text-left shadow-[var(--shadow-luxury)] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-gold)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-[var(--text-primary)]">Commercial Livery Insurance</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              100% commercially insured and licensed in Mississauga, Ontario, strictly compliant with provincial transportation authorities.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3 text-left shadow-[var(--shadow-luxury)] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-gold)]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-[var(--text-primary)]">100% Jet Black Suburban</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              We operate exclusively Chevrolet Suburbans accommodating up to 6 passengers with 6 large luggage bags. No substitute models.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3 text-left shadow-[var(--shadow-luxury)] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-gold)]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-[var(--text-primary)]">24/7 Manual Dispatch</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Every trip is manually reviewed and confirmed by our executive team. Live flight tracking for Toronto Pearson (YYZ) and Billy Bishop (YTZ).
            </p>
          </div>
        </div>

        {/* Booking CTA */}
        <div className="text-center pt-8">
          <Link
            href="/#booking-quote-engine"
            className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider gold-button shadow-xl shadow-[var(--accent-gold)]/25 inline-flex items-center gap-2"
          >
            <span>Reserve Your Chauffeur With Sayed Kamran Ali</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
