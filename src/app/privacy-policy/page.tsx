import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ChevronRight, Lock, Eye, FileText, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Royal Twelve Limo Mississauga & Toronto Chauffeur",
  description:
    "Read the Royal Twelve Limo Privacy Policy. Learn how we handle your personal data, passenger booking information & trip details safely. Updated 2026.",
  alternates: {
    canonical: "https://royaltwelve.ca/privacy-policy/",
  },
  openGraph: {
    title: "Privacy Policy | Royal Twelve Limo Mississauga & Toronto Chauffeur",
    description:
      "Read the Royal Twelve Limo Privacy Policy. Learn how we handle your personal data, passenger booking information & trip details safely. Updated 2026.",
    url: "https://royaltwelve.ca/privacy-policy/",
    siteName: "Royal Twelve Limo",
    locale: "en_CA",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
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
        name: "Privacy Policy",
        item: "https://royaltwelve.ca/privacy-policy/",
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
            <span className="text-[var(--accent-gold)] font-medium">Privacy Policy</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
            <Lock className="w-3.5 h-3.5" />
            <span>Passenger Data Protection &amp; Confidentiality</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-[1.1]">
            Privacy Policy – Royal Twelve Limo
          </h1>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Effective Date: January 1, 2026 • Royal Twelve Limo (Mississauga, ON)
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="space-y-10 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>1. Information We Collect</span>
            </h2>
            <p>
              Royal Twelve Limo collects personal information strictly necessary to fulfill your chauffeur reservation. This includes your full name, mobile telephone number, email address, physical pickup address, destination address, travel dates, passenger counts, and voluntary flight numbers for automated airport tracking.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>2. How Your Information Is Used</span>
            </h2>
            <p>
              Your contact and route details are used exclusively to calculate your confirmed flat rate quote, dispatch your assigned chauffeur, track your arrival flight, send SMS arrival notifications, and issue trip receipts. We do not sell, rent, monetize, or disclose client travel itineraries to third-party marketing brokers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>3. Payment Security &amp; PCI Compliance</span>
            </h2>
            <p>
              We do not store full credit card numbers or sensitive banking credentials on our web servers. All digital credit and debit transactions are processed through encrypted, PCI-DSS compliant payment gateways. Interac e-Transfers are transferred directly through secure Canadian banking networks to our official business address: <code className="text-[var(--accent-gold)] font-bold">royaltwelve.ca@gmail.com</code>.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>4. Executive Discretion &amp; Non-Disclosure</span>
            </h2>
            <p>
              All Royal Twelve Limo chauffeurs operate under strict non-disclosure obligations. Conversations, phone calls, and business conducted inside our vehicles remain confidential.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
            <h2 className="font-display text-base font-bold text-[var(--text-primary)]">
              5. Privacy Questions &amp; Data Rights
            </h2>
            <p>
              Under Canadian privacy law (PIPEDA), you have the right to access, verify, or request the deletion of your personal contact records. Direct your inquiry to:
            </p>
            <div className="pt-2 space-y-1 text-xs">
              <div><strong className="text-[var(--text-primary)]">Business Name:</strong> Royal Twelve Limo</div>
              <div><strong className="text-[var(--text-primary)]">Email:</strong> <a href="mailto:royaltwelve.ca@gmail.com" className="text-[var(--accent-gold)] hover:underline">royaltwelve.ca@gmail.com</a></div>
              <div><strong className="text-[var(--text-primary)]">Phone:</strong> <a href="tel:+14372149283" className="text-[var(--accent-gold)] hover:underline">+1 (437) 214-9283</a></div>
              <div><strong className="text-[var(--text-primary)]">Base City:</strong> Mississauga, ON (Serving Mississauga and the GTA)</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
