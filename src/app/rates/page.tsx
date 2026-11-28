import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Clock, CheckCircle2, Phone, ChevronRight, Calculator, FileCheck } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion, { FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Limo Rates & Flat Pricing | Mississauga & Toronto – Royal Twelve Limo",
  description:
    "Transparent flat-rate limo pricing for Mississauga, Toronto & GTA. Price confirmed by quote before you book with no surprise fees. Request your free quote.",
  alternates: {
    canonical: "https://royaltwelve.ca/rates/",
  },
  openGraph: {
    title: "Limo Rates & Flat Pricing | Mississauga & Toronto – Royal Twelve Limo",
    description:
      "Transparent flat-rate limo pricing for Mississauga, Toronto & GTA. Price confirmed by quote before you book with no surprise fees. Request your free quote.",
    url: "https://royaltwelve.ca/rates/",
    siteName: "Royal Twelve Limo",
    locale: "en_CA",
    type: "website",
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Why do you not publish fixed dollar prices online?",
    answer:
      "Every luxury itinerary is unique. Factors such as pickup location, destination, vehicle preference (Chevrolet Suburban, Yukon Denali, Escalade ESV), flight timing, and stops vary. In accordance with our honesty policy, price is confirmed by quote before you book, guaranteeing you pay only for your exact route with zero hidden surcharges.",
  },
  {
    question: "What is included in every confirmed flat-rate quote?",
    answer:
      "Every flat-rate quote includes your dedicated professional chauffeur, real-time commercial flight monitoring, complimentary wait time on airport arrivals, full commercial passenger liability insurance, fuel, standard 407/highway tolls if requested, and complete luggage assistance.",
  },
  {
    question: "Will my price change if we encounter traffic delays on Highway 401 or the QEW?",
    answer:
      "No. One of the greatest advantages of our confirmed flat rate is predictability. If your journey takes longer due to highway construction, rush-hour traffic, or winter weather, your agreed fare remains unchanged.",
  },
  {
    question: "How quickly will I receive my confirmed rate quote?",
    answer:
      "Our dispatch team replies with a guaranteed flat-rate quote within 2 business hours. If you have an urgent immediate departure, you can call our 24/7 dispatch phone line directly at +1 (437) 214-9283.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept major credit cards (Visa, MasterCard, American Express), debit cards, and Interac e-Transfers. Detailed digital receipts are automatically emailed upon trip completion.",
  },
];

export default function RatesPage() {
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
        name: "Rates",
        item: "https://royaltwelve.ca/rates/",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <Link href="/" className="hover:text-[var(--accent-gold)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[var(--accent-gold)] font-medium">Rates &amp; Pricing</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
            <Calculator className="w-3.5 h-3.5" />
            <span>Guaranteed Flat-Rate Policy</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight max-w-4xl leading-[1.1]">
            Transparent Flat-Rate Limo Pricing in Mississauga &amp; GTA
          </h1>

          <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border-2 border-[var(--accent-gold)] max-w-2xl text-left">
            <p className="text-base sm:text-lg font-bold text-[var(--accent-gold)]">
              Price confirmed by quote before you book.
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
              We do not show automated guesstimates or metered rates. Every trip receives a verified flat rate tailored to your schedule and vehicle choice.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#quote-form"
              className="px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider gold-button shadow-lg"
            >
              Get Your Flat Quote
            </a>
            <a
              href="tel:+14372149283"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors"
            >
              <Phone className="w-4 h-4 text-[var(--accent-gold)]" />
              <span>Call 24/7: +1 (437) 214-9283</span>
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Integrity Pillars */}
      <section className="py-16 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-10 text-left">
            Our Pricing Integrity Standard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                All-Inclusive Invoicing
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Your quote includes standard road tolls, airport gate fees, vehicle sanitization, and luggage assistance. What you are quoted is what you pay.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                2-Hour Quote Response
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Submit your trip details online and our live dispatch team will calculate and email your verified flat-rate quote within 2 business hours.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Zero Surge Pricing
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Unlike rideshare applications, our flat rates never fluctuate during rain, snow, rush hour, or sudden airport arrival surges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteForm
          isAirport={false}
          defaultService="Flat-Rate Limo Quote"
          title="Request Your Flat-Rate Limo Quote"
          subtitle="Price confirmed by quote before you book. We reply within 2 business hours with an all-inclusive rate."
        />
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            items={FAQ_ITEMS}
            title="Rates &amp; Invoicing FAQ"
            subtitle="Understand our transparent flat-rate pricing model, cancellation policy, and payment options."
          />
        </div>
      </section>
    </div>
  );
}
