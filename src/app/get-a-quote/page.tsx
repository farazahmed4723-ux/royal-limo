import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ShieldCheck, Clock, Phone, ChevronRight, CheckCircle2 } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion, { FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Get a Limo Quote | Free Flat-Rate Chauffeur Estimate – Royal Twelve Limo",
  description:
    "Request a free flat-rate quote for luxury limousine & black SUV service in Mississauga & Toronto. Fast response within 2 hours. Book your private ride today.",
  alternates: {
    canonical: "https://royaltwelve.ca/get-a-quote/",
  },
  openGraph: {
    title: "Get a Limo Quote | Free Flat-Rate Chauffeur Estimate – Royal Twelve Limo",
    description:
      "Request a free flat-rate quote for luxury limousine & black SUV service in Mississauga & Toronto. Fast response within 2 hours. Book your private ride today.",
    url: "https://royaltwelve.ca/get-a-quote/",
    siteName: "Royal Twelve Limo",
    locale: "en_CA",
    type: "website",
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How quickly will I receive my confirmed flat-rate quote?",
    answer:
      "Our dispatch team reviews every route and replies with a verified, all-inclusive flat rate quote within 2 business hours via email and SMS.",
  },
  {
    question: "Are the quoted rates final and guaranteed?",
    answer:
      "Yes. Price is confirmed by quote before you book. What you are quoted is the exact amount you pay, with no traffic surge fees, fuel surcharges, or hidden baggage costs.",
  },
  {
    question: "Can I modify my pickup time or route after receiving the quote?",
    answer:
      "Yes. If your travel plans change, reply to your quote email or contact our 24/7 dispatch phone line at +1 (437) 214-9283 to update your pickup time, passenger count, or destinations.",
  },
  {
    question: "Do you accommodate airport arrivals with flight delays?",
    answer:
      "Yes. All airport transfers include automated real-time flight tracking with complimentary wait time on arrivals, ensuring your driver is curbside whenever you land.",
  },
  {
    question: "What is the cancellation and refund policy?",
    answer:
      "Cancellations requested 24 hours or more before scheduled service are 100% fully refundable. Cancellations under 24 hours incur a 30% dispatch fee, with 70% refunded.",
  },
];

export default function GetAQuotePage() {
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
        name: "Get a Quote",
        item: "https://royaltwelve.ca/get-a-quote/",
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
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <Link href="/" className="hover:text-[var(--accent-gold)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[var(--accent-gold)] font-medium">Get a Quote</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
            <Calculator className="w-3.5 h-3.5" />
            <span>Fast Response Within 2 Business Hours</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight max-w-4xl leading-[1.1]">
            Request a Guaranteed Flat-Rate Limo Quote
          </h1>

          <p className="text-sm sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Fill in your travel details below to receive a guaranteed, all-inclusive flat rate. Our dispatch team reviews your exact itinerary and replies within 2 business hours.
          </p>

          <div className="flex items-center gap-3 pt-1 text-xs text-[var(--text-secondary)]">
            <span>Need Immediate Dispatch?</span>
            <a
              href="tel:+14372149283"
              className="text-[var(--accent-gold)] font-bold hover:underline inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call +1 (437) 214-9283</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Quote Engine Form Section */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteForm
          isAirport={true}
          defaultService="Flat-Rate Limo Request"
          title="Online Quote Reservation Form"
          subtitle="Price confirmed by quote before you book. No published prices, no meter fluctuations."
        />
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            items={FAQ_ITEMS}
            title="Quote &amp; Booking FAQ"
            subtitle="Everything you need to know about receiving your flat rate and finalizing your chauffeur reservation."
          />
        </div>
      </section>
    </div>
  );
}
