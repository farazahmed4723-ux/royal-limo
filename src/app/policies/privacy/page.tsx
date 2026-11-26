import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Royal 12 Limo",
  description: "Privacy policy and client confidentiality practices of Royal 12 Limo.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mb-8">
          Royal 12 Limo • Executive Confidentiality & Data Protection
        </p>

        <div className="space-y-8 text-sm text-[var(--text-secondary)] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">1. Information We Collect</h2>
            <p>
              To execute your reservation, we collect personal contact details including your full name, email address, mobile telephone number, pickup/drop-off locations, date and time of travel, and voluntary flight identification for airport tracking.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">2. Payment Security</h2>
            <p>
              We do not store complete credit card or financial banking details on our servers. All digital credit card transactions are processed securely via Stripe with PCI-DSS compliance. PayPal transactions are processed through PayPal&apos;s encrypted checkout. Interac e-Transfers are transferred directly between banking institutions to our registered business address: <code className="text-[var(--accent-gold)]">royaltwelve.ca@gmail.com</code>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">3. Executive Non-Disclosure & Confidentiality</h2>
            <p>
              Royal 12 strictly protects client confidentiality. We do not sell, rent, or disclose client travel itineraries, passenger identities, or corporate travel records to third parties or marketing brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">4. Contact Data Inquiries</h2>
            <p>
              For data access or privacy inquiries, contact our administrative team at <a href="mailto:royaltwelve.ca@gmail.com" className="text-[var(--accent-gold)] underline">royaltwelve.ca@gmail.com</a> or call <strong className="text-[var(--text-primary)]">+1 (437) 214-9283</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
