import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Plane, ShieldCheck, Clock, Luggage, MapPin, Phone, CheckCircle2, ChevronRight, Building2 } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion, { FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Toronto Airport Limo | Pearson & Billy Bishop Chauffeur – Royal Twelve Limo",
  description:
    "First-class Toronto airport limo service to Pearson YYZ & Billy Bishop YTZ. Luxury black SUV fleet, flight tracking & flat rates. Request your quote today.",
  alternates: {
    canonical: "https://royaltwelve.ca/airport-limo-toronto/",
  },
  openGraph: {
    title: "Toronto Airport Limo | Pearson & Billy Bishop Chauffeur – Royal Twelve Limo",
    description:
      "First-class Toronto airport limo service to Pearson YYZ & Billy Bishop YTZ. Luxury black SUV fleet, flight tracking & flat rates. Request your quote today.",
    url: "https://royaltwelve.ca/airport-limo-toronto/",
    siteName: "Royal Twelve Limo",
    locale: "en_CA",
    type: "website",
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do you service both Toronto Pearson (YYZ) and Billy Bishop Toronto City Airport (YTZ)?",
    answer:
      "Yes. Royal Twelve Limo regularly provides executive chauffeur service to both major Toronto airports—Toronto Pearson International Airport (YYZ) in Mississauga and Billy Bishop Toronto City Airport (YTZ) on Toronto Island, including mainland drop-off and pickup at the ferry and pedestrian tunnel terminal.",
  },
  {
    question: "Can your Toronto airport limo accommodate corporate groups with heavy luggage?",
    answer:
      "Absolutely. Our entire fleet consists of extended full-size black SUVs (Chevrolet Suburban Premier, GMC Yukon Denali, and Cadillac Escalade ESV). Each vehicle comfortably accommodates up to 7 passengers and 7 large suitcases plus carry-on bags.",
  },
  {
    question: "How far in advance should I book my Toronto airport limo?",
    answer:
      "While we recommend booking at least 12 to 24 hours in advance to guarantee your preferred vehicle, our 24/7 dedicated dispatch team accommodates same-day and urgent airport bookings across Toronto and the GTA whenever vehicles are open.",
  },
  {
    question: "Is the fare fixed or metered?",
    answer:
      "All Royal Twelve Limo airport transfers operate on confirmed flat-rate pricing. Price is confirmed by quote before you book, protecting you against highway delays, Gardiner Expressway construction, or inclement winter weather.",
  },
  {
    question: "Are private FBO aviation transfers supported?",
    answer:
      "Yes. We frequently serve private aviation terminals across Toronto Pearson (Skyservice, Signature Flight Support, Chartright) with tarmac-side and executive lounge pickup procedures.",
  },
];

export default function TorontoAirportLimoPage() {
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
        name: "Toronto Airport Limo",
        item: "https://royaltwelve.ca/airport-limo-toronto/",
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Airport Limousine Service",
    provider: {
      "@type": "LocalBusiness",
      name: "Royal Twelve Limo",
      telephone: "+14372149283",
      email: "royaltwelve.ca@gmail.com",
      url: "https://royaltwelve.ca",
    },
    areaServed: [
      { "@type": "City", name: "Toronto" },
      { "@type": "Airport", name: "Toronto Pearson International Airport (YYZ)" },
      { "@type": "Airport", name: "Billy Bishop Toronto City Airport (YTZ)" },
    ],
    description:
      "Executive Toronto airport limousine service connecting Downtown Toronto, Financial District, and GTA neighborhoods with Pearson YYZ and Billy Bishop YTZ.",
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
            src="/images/royal12/hero-suburban-jet.jpg"
            alt="Black Chevrolet Suburban on airport runway for Toronto airport transfers"
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
            <span className="text-[var(--accent-gold)] font-medium">Toronto Airport Limo</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
            <Plane className="w-3.5 h-3.5" />
            <span>Serving Toronto &amp; GTA Airports</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight max-w-4xl leading-[1.1]">
            Toronto Airport Limo Service to Pearson YYZ &amp; Billy Bishop YTZ
          </h1>

          <p className="text-sm sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Travel between Downtown Toronto, the Financial District, Midtown, and Toronto airports in quiet comfort. Our black SUV fleet delivers punctuality, complimentary flight monitoring, and flat-rate predictability.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#quote-form"
              className="px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider gold-button shadow-lg"
            >
              Request Flat Quote
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

      {/* Feature Highlights */}
      <section className="py-16 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-10 text-left">
            Toronto Airport Executive Transportation Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Downtown &amp; Hotel Pickups
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Direct service to and from major Toronto hotels (Fairmont Royal York, Ritz-Carlton, Four Seasons, Shangri-La) and corporate headquarters.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Complimentary Flight Buffer
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                We monitor incoming flights into YYZ and YTZ in real time, adjusting for customs delays, baggage claim waits, or early landings automatically.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Guaranteed Flat Fare
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Price confirmed by quote before you book. No surge multipliers or peak-hour highway fees regardless of traffic conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteForm
          isAirport={true}
          defaultService="Toronto Airport Limo"
          title="Get a Toronto Airport Limo Quote"
          subtitle="Provide your pickup address in Toronto, flight number, and destination for a guaranteed flat-rate confirmation."
        />
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            items={FAQ_ITEMS}
            title="Toronto Airport Limo FAQ"
            subtitle="Frequently asked questions about Pearson YYZ, Billy Bishop YTZ, and Toronto airport transfers."
          />
        </div>
      </section>
    </div>
  );
}
