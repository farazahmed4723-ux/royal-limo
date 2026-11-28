import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert, ChevronRight, FileCheck, Clock, Ban, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | Passenger & Booking Agreement – Royal Twelve Limo",
  description:
    "Review the Royal Twelve Limo terms and conditions: flat rates, cancellation guidelines, flight tracking, passenger safety & chauffeur policies.",
  alternates: {
    canonical: "https://royaltwelve.ca/terms/",
  },
  openGraph: {
    title: "Terms and Conditions | Passenger & Booking Agreement – Royal Twelve Limo",
    description:
      "Review the Royal Twelve Limo terms and conditions: flat rates, cancellation guidelines, flight tracking, passenger safety & chauffeur policies.",
    url: "https://royaltwelve.ca/terms/",
    siteName: "Royal Twelve Limo",
    locale: "en_CA",
    type: "website",
  },
};

export default function TermsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://royaltwelve.ca/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Terms and Conditions",
        item: "https://royaltwelve.ca/terms/",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-[var(--border-subtle)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <Link href="/" className="hover:text-[var(--accent-gold)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[var(--accent-gold)] font-medium">Terms and Conditions</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Passenger Service Agreement</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-[1.1]">
            Terms and Conditions of Service – Royal Twelve Limo
          </h1>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Last Updated: January 2026 • Royal Twelve Limo (Mississauga, ON)
          </p>
        </div>
      </section>

      {/* Terms Body */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="space-y-10 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
              1. Flat-Rate Pricing Agreement
            </h2>
            <p>
              In accordance with Royal Twelve Limo policy: <strong>Price is confirmed by quote before you book</strong>. What you are quoted is the exact price you pay for your scheduled itinerary. There are no surprise fuel surcharges or traffic congestion meters. Any unscheduled extra stops or significant route deviations requested en route will be confirmed with dispatch at pre-agreed flat rates.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border-2 border-[var(--accent-gold)]/40 space-y-3">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>2. 24-Hour Cancellation &amp; Refund Policy</span>
            </h2>
            <p className="text-[var(--text-primary)]">
              • <strong>Cancellations 24 Hours or More in Advance:</strong> 100% fully refundable with zero processing penalties.
            </p>
            <p className="text-[var(--text-primary)]">
              • <strong>Cancellations Under 24 Hours:</strong> 30% is non-refundable to cover scheduled chauffeur allocation and vehicle staging, and 70% is promptly refunded.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
              3. Airport Pickups &amp; Flight Tracking
            </h2>
            <p>
              Royal Twelve Limo monitors commercial and private flight arrival statuses in real-time. Complimentary wait time is included on all arrivals from the actual touchdown time of your aircraft (typically 45 minutes for domestic flights, 60 minutes for international flights clearing CBSA customs).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Ban className="w-4 h-4 text-red-400" />
              <span>4. Vehicle Cleanliness &amp; Prohibited Conduct</span>
            </h2>
            <p>
              To maintain the highest luxury standard for all passengers, smoking, vaping, and the consumption of illegal substances are strictly prohibited inside all Royal Twelve Limo vehicles. A cleaning/sanitization fee may apply for excessive interior spills or biohazard damage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
            <h2 className="font-display text-base font-bold text-[var(--text-primary)]">
              5. Governing Law &amp; Contact
            </h2>
            <p>
              These terms are governed by the laws of the Province of Ontario, Canada. For questions regarding your booking agreement:
            </p>
            <div className="pt-2 space-y-1 text-xs">
              <div><strong className="text-[var(--text-primary)]">Legal Entity:</strong> Royal Twelve Limo</div>
              <div><strong className="text-[var(--text-primary)]">Direct Dispatch:</strong> <a href="tel:+14372149283" className="text-[var(--accent-gold)] hover:underline">+1 (437) 214-9283</a></div>
              <div><strong className="text-[var(--text-primary)]">Email:</strong> <a href="mailto:royaltwelve.ca@gmail.com" className="text-[var(--accent-gold)] hover:underline">royaltwelve.ca@gmail.com</a></div>
              <div><strong className="text-[var(--text-primary)]">Base Location:</strong> Serving Mississauga and the GTA</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
