import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Cancellation & Refund Policy | Royal 12 Limo",
  description: "Official cancellation terms and refund schedule for Royal 12 Limo reservations in Toronto and the GTA.",
};

export default function CancellationPolicyPage() {
  return (
    <div className="pt-32 pb-24 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-gold)] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--accent-gold)] mb-3">
          <span>Official Company Policy</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
          Cancellation & Refund Policy
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mb-8">
          Last Updated: November 2026 • Governing Timezone: America/Toronto (Eastern Time)
        </p>

        {/* Primary Confirmed Rule Card */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-amber-500/40 mb-10 space-y-3 shadow-[var(--shadow-luxury)]">
          <div className="flex items-center gap-3 text-amber-500">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
              24/7 Service Terms & Standardized Cancellation Policy
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">
            &ldquo;<strong>Free cancellation up to 24 hours prior to scheduled pickup.</strong> If a ride is cancelled after the 24-hour window (within 24 hours of pickup), a <strong className="text-amber-500">30% cancellation fee</strong> will be deducted and the remaining <strong className="text-emerald-500">70% of the fare will be refunded</strong>.&rdquo;
          </p>
        </div>

        <div className="space-y-8 text-sm text-[var(--text-secondary)] leading-relaxed">
          <section className="space-y-3">
            <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
              1. Advance Cancellation (24 Hours or More Prior to Pickup)
            </h3>
            <p>
              Cancellations submitted twenty-four (24) hours or more prior to the scheduled pickup time are eligible for company review and processing. To request a cancellation, customers must notify dispatch via email at{" "}
              <a href="mailto:royaltwelve.ca@gmail.com" className="text-[var(--accent-gold)] underline">
                royaltwelve.ca@gmail.com
              </a>{" "}
              or by phone at <strong className="text-[var(--text-primary)]">+1 (437) 214-9283</strong> quoting their unique reservation reference number (e.g., R12-XXXXXX).
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
              2. Cancellations Under 24 Hours
            </h3>
            <p>
              Under our 24/7 Round-the-Clock Dispatch service, your designated executive luxury SUV (Black Chevrolet Suburban, Black GMC Yukon Denali, or Black Cadillac Escalade) and professional chauffeur are specifically reserved, detailed, and staged for your itinerary. For cancellations made within the 24-hour window prior to pickup, a 30% cancellation fee will be deducted and the remaining 70% of the fare will be refunded to your original payment method.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
              3. Flight Delays & Airline Rescheduling
            </h3>
            <p>
              For airport arrivals at Toronto Pearson International Airport (YYZ) and Billy Bishop Toronto City Airport (YTZ), Royal 12 tracks your commercial flight number in real time. Delays caused by commercial airlines or air traffic control do not constitute a cancellation. Your chauffeur will automatically adjust their staging time to your actual flight arrival at no additional cancellation penalty.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
              4. Payment Method Refund Processing
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Credit & Debit Cards (Stripe):</strong> Refunds are processed back to the original card within 5 to 10 business days according to standard banking processing schedules.
              </li>
              <li>
                <strong>PayPal:</strong> Refunds are processed directly to the customer&apos;s PayPal account within 24 to 48 business hours.
              </li>
              <li>
                <strong>Interac e-Transfer:</strong> Eligible refund amounts will be sent via direct Interac e-Transfer from <code className="text-[var(--accent-gold)]">royaltwelve.ca@gmail.com</code> following manual administrative verification against the company&apos;s business account.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
              5. Contact Us Regarding Your Booking
            </h3>
            <p>
              If you have any questions or require modifications to your existing itinerary, please contact our 24/7 executive dispatch team directly:
            </p>
            <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-1 text-xs">
              <div>Phone: <strong className="text-[var(--text-primary)]">+1 (437) 214-9283</strong></div>
              <div>Email: <strong className="text-[var(--text-primary)]">royaltwelve.ca@gmail.com</strong></div>
              <div>Licensing: <strong className="text-[var(--text-primary)]">Mississauga, Ontario, Canada</strong></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
