import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, Phone, ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";
import FaqAccordion, { FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Limo & Chauffeur Service – Royal Twelve Limo",
  description:
    "Find answers to common questions about Royal Twelve Limo: bookings, airport pickups, flight tracking, cancellation terms & executive fleet. Request a quote.",
  alternates: {
    canonical: "https://royaltwelve.ca/faq/",
  },
  openGraph: {
    title: "Frequently Asked Questions | Limo & Chauffeur Service – Royal Twelve Limo",
    description:
      "Find answers to common questions about Royal Twelve Limo: bookings, airport pickups, flight tracking, cancellation terms & executive fleet. Request a quote.",
    url: "https://royaltwelve.ca/faq/",
    siteName: "Royal Twelve Limo",
    locale: "en_CA",
    type: "website",
  },
};

const ALL_FAQS: FaqItem[] = [
  {
    question: "What is your pricing policy, and why are rates confirmed by quote?",
    answer:
      "Royal Twelve Limo enforces strict pricing transparency: price is confirmed by quote before you book. We do not use metered taxi fares or fluctuating algorithmic surge pricing. Every quote is custom-calculated for your specific itinerary, vehicle choice, and schedule, guaranteeing an all-inclusive flat rate.",
  },
  {
    question: "How does airport flight tracking work at Toronto Pearson (YYZ)?",
    answer:
      "Every airport arrival reservation includes automated real-time flight tracking. Whether your flight lands 30 minutes early or 3 hours late due to weather or airspace congestion, your pickup time adjusts automatically with complimentary wait time on all arrivals.",
  },
  {
    question: "What vehicles do you own and operate in your fleet?",
    answer:
      "We exclusively operate extended full-size black luxury SUVs: the Chevrolet Suburban Premier, GMC Yukon Denali, and Cadillac Escalade ESV. Each vehicle provides seating for up to 7 passengers and dedicated luggage space for up to 7 full-sized bags.",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "Cancellations requested 24 hours or more prior to the scheduled pickup time are 100% fully refundable. For cancellations made under 24 hours, 30% is retained to cover allocated chauffeur time, and 70% is promptly refunded.",
  },
  {
    question: "How quickly do you reply to online quote requests?",
    answer:
      "Our dispatch team reviews every route submission and replies with a confirmed flat rate quote within 2 business hours via email and SMS.",
  },
  {
    question: "What areas do you service across Ontario?",
    answer:
      "Headquartered in Mississauga, ON, Royal Twelve Limo serves Mississauga, Toronto, Brampton, Oakville, Vaughan, Markham, Burlington, Milton, Hamilton, Toronto Pearson Airport (YYZ), Billy Bishop Airport (YTZ), and Hamilton Airport (YHM).",
  },
  {
    question: "Are child safety seats available?",
    answer:
      "Yes. Rear-facing, forward-facing, and booster child safety seats are available upon request when submitting your quote or booking reservation.",
  },
  {
    question: "Can I book hourly as-directed service with multiple stops?",
    answer:
      "Yes. Hourly as-directed service allows you to keep a private luxury black SUV and dedicated chauffeur on standby for as long as you need with unlimited stops throughout the GTA.",
  },
  {
    question: "How do I reach dispatch for immediate departure?",
    answer:
      "For urgent or same-day travel, call our 24/7 direct chauffeur dispatch line directly at +1 (437) 214-9283.",
  },
];

export default function FaqPage() {
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
        name: "FAQ",
        item: "https://royaltwelve.ca/faq/",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQS.map((item) => ({
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
            <span className="text-[var(--accent-gold)] font-medium">Frequently Asked Questions</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Answers &amp; Policies</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight max-w-4xl leading-[1.1]">
            Frequently Asked Questions – Royal Twelve Limo
          </h1>

          <p className="text-sm sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Find clear, verified information regarding our flat rates, flight monitoring, real executive fleet, service areas, and cancellation policy.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/get-a-quote/"
              className="px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider gold-button shadow-lg inline-flex items-center gap-2"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
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

      {/* Main FAQ Accordion */}
      <section className="py-20 bg-[var(--bg-card)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            items={ALL_FAQS}
            title="All Frequently Asked Questions"
            subtitle="Click on any question below to expand the complete answer."
          />
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            Have a Specific Route in Mind?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
            Submit your trip details online for a guaranteed flat-rate quote within 2 business hours, or contact our 24/7 dispatch phone line.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-a-quote/"
              className="px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider gold-button shadow-lg"
            >
              Get a Flat-Rate Quote
            </Link>
            <Link
              href="/contact/"
              className="px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors"
            >
              Contact Dispatch Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
