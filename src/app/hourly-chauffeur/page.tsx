import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, ShieldCheck, MapPin, Phone, ChevronRight, Compass, Sparkles } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion, { FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Hourly Chauffeur Service Toronto & GTA | As-Directed Limo – Royal Twelve Limo",
  description:
    "Flexible hourly chauffeur service in Toronto & Mississauga. As-directed black SUV service for meetings, events & evenings out. Request your flat hourly quote.",
  alternates: {
    canonical: "https://royaltwelve.ca/hourly-chauffeur/",
  },
  openGraph: {
    title: "Hourly Chauffeur Service Toronto & GTA | As-Directed Limo – Royal Twelve Limo",
    description:
      "Flexible hourly chauffeur service in Toronto & Mississauga. As-directed black SUV service for meetings, events & evenings out. Request your flat hourly quote.",
    url: "https://royaltwelve.ca/hourly-chauffeur/",
    siteName: "Royal Twelve Limo",
    locale: "en_CA",
    type: "website",
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does hourly as-directed chauffeur service work?",
    answer:
      "With hourly as-directed service, you have a private luxury black SUV and dedicated chauffeur at your complete disposal for your reserved duration. You direct the itinerary, make as many stops as needed, and your driver remains on standby right outside your location.",
  },
  {
    question: "Is there a minimum hourly booking requirement?",
    answer:
      "Yes, hourly service generally requires a 2-hour or 3-hour minimum depending on the date, travel distance, and vehicle selected. Price is confirmed by quote before you book.",
  },
  {
    question: "Can I adjust my schedule or add extra hours during the trip?",
    answer:
      "Yes. If your meeting runs late or you choose to visit additional destinations, inform your chauffeur or 24/7 dispatch. Additional time is calculated on pre-agreed hourly flat increments with full transparency.",
  },
  {
    question: "What vehicles are used for hourly chauffeur bookings?",
    answer:
      "All hourly charters operate with our confirmed executive SUV fleet: the Chevrolet Suburban Premier, GMC Yukon Denali, and Cadillac Escalade ESV. Each vehicle accommodates up to 7 passengers with generous space and privacy.",
  },
  {
    question: "What is the cancellation policy on hourly charters?",
    answer:
      "Cancellations submitted 24 hours or more before scheduled service are 100% fully refundable. For cancellations under 24 hours, 30% is retained for reserved vehicle allocation, and 70% is refunded.",
  },
];

export default function HourlyChauffeurPage() {
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
        name: "Hourly Chauffeur",
        item: "https://royaltwelve.ca/hourly-chauffeur/",
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Hourly Chauffeur Service",
    provider: {
      "@type": "LocalBusiness",
      name: "Royal Twelve Limo",
      telephone: "+14372149283",
      email: "royaltwelve.ca@gmail.com",
      url: "https://royaltwelve.ca",
    },
    areaServed: [
      { "@type": "City", name: "Toronto" },
      { "@type": "City", name: "Mississauga" },
      { "@type": "City", name: "Oakville" },
      { "@type": "City", name: "Brampton" },
      { "@type": "City", name: "Vaughan" },
      { "@type": "City", name: "Markham" },
      { "@type": "City", name: "Burlington" },
    ],
    description:
      "Flexible hourly as-directed limousine and executive black SUV chauffeur service in Toronto, Mississauga, and the GTA with unlimited stops.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-[var(--border-subtle)]">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/royal12/fleet-suburban-black.jpg"
            alt="Black Chevrolet Suburban Premier for hourly as-directed chauffeur service in GTA"
            fill
            priority
            quality={90}
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/80 via-[var(--bg-primary)]/95 to-[var(--bg-primary)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <Link href="/" className="hover:text-[var(--accent-gold)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[var(--accent-gold)] font-medium">Hourly Chauffeur</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
            <Clock className="w-3.5 h-3.5" />
            <span>As-Directed Hourly Chauffeur</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight max-w-4xl leading-[1.1]">
            Hourly Chauffeur &amp; As-Directed Limo Service in GTA
          </h1>

          <p className="text-sm sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Total flexibility for multi-stop days, corporate appointments, dining, and city tours. Your private chauffeur and luxury black SUV stay with you for as long as you require.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#quote-form"
              className="px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider gold-button shadow-lg"
            >
              Request Hourly Quote
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

      {/* Hourly Highlights */}
      <section className="py-16 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-10 text-left">
            Unlimited Flexibility &amp; On-Demand Convenience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Unlimited Stops
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Travel from meeting to meeting, attend events, or make spontaneous shopping detours. Your driver follows your instructions at every turn.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Always on Standby
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                No waiting around for rideshare cars. Your heated or air-conditioned vehicle is stationed curbside, ready to depart the moment you step outside.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Confirmed Flat Hourly Rate
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Price confirmed by quote before you book. No surge multipliers or unexpected meter tick-ups during traffic delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteForm
          isAirport={false}
          defaultService="Hourly Chauffeur"
          title="Request an Hourly Chauffeur Quote"
          subtitle="Provide your starting location, estimated number of hours, and approximate itinerary for a confirmed flat-rate quote."
        />
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            items={FAQ_ITEMS}
            title="Hourly Chauffeur FAQ"
            subtitle="Frequently asked questions about minimum hours, standby policies, and GTA travel radius."
          />
        </div>
      </section>
    </div>
  );
}
