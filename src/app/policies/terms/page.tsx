import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | Royal 12 Limo",
  description: "Official terms and conditions of chauffeured transportation services by Royal 12 Limo in Mississauga, Toronto and the GTA.",
};

export default function TermsPage() {
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

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
          Terms & Conditions
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mb-8">
          Operating Jurisdiction: Ontario, Canada • Governing Law: Province of Ontario
        </p>

        <div className="space-y-8 text-sm text-[var(--text-secondary)] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">1. Scope of Service</h2>
            <p>
              Royal 12 Limo provides premium executive black car and limousine transportation within the Greater Toronto Area (GTA) and designated surrounding regions. All journeys are dispatched using our dedicated Chevrolet Suburban fleet (maximum passenger capacity: 6).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">2. Booking Approval & Manual Confirmation</h2>
            <p>
              Online reservations submitted through the Royal 12 website represent reservation requests and are subject to manual administrative review and confirmation. A booking is legally confirmed once an official dispatch approval notice is transmitted to the customer&apos;s email address.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">3. Fares and Payment Terms</h2>
            <p>
              Quoted fares include applicable distance-based fees, Ontario Harmonized Sales Tax (HST 13%), and optional customer gratuities. Royal 12 accepts payments through Stripe, PayPal, and Canadian Interac e-Transfer to royaltwelve.ca@gmail.com.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">4. 24/7 Service Terms & Cancellation Policy</h2>
            <p>
              Royal 12 operates 24/7 Round-the-Clock Dispatch & Chauffeur Service. Free cancellation is granted up to 24 hours prior to scheduled pickup. If a ride is cancelled after the 24-hour window (within 24 hours of pickup), a 30% cancellation fee will be deducted and the remaining 70% of the fare will be refunded.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">5. Passenger Conduct and Safety</h2>
            <p>
              Smoking, vaping, and illegal substances are strictly prohibited inside all Royal 12 vehicles at all times. Passengers must adhere to Ontario seatbelt regulations. Any excessive vehicle damage or soiling requiring professional detailing will incur an authorized cleaning surcharge.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
