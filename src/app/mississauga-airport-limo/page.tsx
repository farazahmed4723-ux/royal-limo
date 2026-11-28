import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Plane, ShieldCheck, Clock, Luggage, MapPin, Phone, CheckCircle2, ChevronRight } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion, { FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Mississauga Airport Limo | Pearson YYZ Chauffeur – Royal Twelve Limo",
  description:
    "Reliable Mississauga airport limo to Pearson YYZ & Billy Bishop YTZ. Flight tracking, 24/7 dispatch & flat rates in luxury SUVs. Get your free quote now.",
  alternates: {
    canonical: "https://royaltwelve.ca/mississauga-airport-limo/",
  },
  openGraph: {
    title: "Mississauga Airport Limo | Pearson YYZ Chauffeur – Royal Twelve Limo",
    description:
      "Reliable Mississauga airport limo to Pearson YYZ & Billy Bishop YTZ. Flight tracking, 24/7 dispatch & flat rates in luxury SUVs. Get your free quote now.",
    url: "https://royaltwelve.ca/mississauga-airport-limo/",
    siteName: "Royal Twelve Limo",
    locale: "en_CA",
    type: "website",
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What happens if my arrival flight at Toronto Pearson (YYZ) is delayed?",
    answer:
      "All airport transfers with Royal Twelve Limo include real-time flight tracking. Your chauffeur monitors your flight status from takeoff to touchdown. Whether your flight lands early or gets delayed by hours, your pickup schedule automatically adjusts with complimentary wait time on all arrivals.",
  },
  {
    question: "How many passengers and pieces of luggage can your airport SUVs accommodate?",
    answer:
      "Our confirmed executive fleet consists exclusively of full-size black SUVs—the Chevrolet Suburban Premier, GMC Yukon Denali, and Cadillac Escalade ESV. Each vehicle comfortably seats up to 7 passengers with dedicated cargo capacity for up to 7 full-sized luggage bags.",
  },
  {
    question: "Where do I meet my chauffeur at Pearson Airport Terminal 1 and Terminal 3?",
    answer:
      "Upon landing and collecting your luggage, you will receive an SMS and call from your personal chauffeur. For standard curbside pickup, follow airport signs to prearranged limousine posts (Door A at Terminal 1, Door D at Terminal 3). Inside meet-and-greet service with a personalized name sign is also available upon request.",
  },
  {
    question: "Is the price confirmed before I book my Mississauga airport limo?",
    answer:
      "Yes. In accordance with Royal Twelve Limo's strict pricing transparency policy, your flat-rate quote is fully confirmed before you book. We never charge surge pricing or surprise fees for traffic delays.",
  },
  {
    question: "What is the cancellation policy for airport transfers?",
    answer:
      "Cancellations made 24 hours or more in advance are 100% fully refundable. For cancellations made under 24 hours prior to scheduled pickup, 30% is non-refundable to cover chauffeur dispatch allocation, and 70% is promptly refunded.",
  },
];

export default function MississaugaAirportLimoPage() {
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
        name: "Mississauga Airport Limo",
        item: "https://royaltwelve.ca/mississauga-airport-limo/",
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
      { "@type": "City", name: "Mississauga" },
      { "@type": "Airport", name: "Toronto Pearson International Airport (YYZ)" },
      { "@type": "Airport", name: "Billy Bishop Toronto City Airport (YTZ)" },
    ],
    description:
      "Premier Mississauga airport limousine and executive black SUV transfer service to Toronto Pearson Airport (YYZ) and Billy Bishop (YTZ) with flight tracking.",
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
            alt="Black executive SUV for Pearson airport transfers in Mississauga"
            fill
            priority
            quality={90}
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/80 via-[var(--bg-primary)]/95 to-[var(--bg-primary)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
          {/* Breadcrumb Nav */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <Link href="/" className="hover:text-[var(--accent-gold)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[var(--accent-gold)] font-medium">Mississauga Airport Limo</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
            <Plane className="w-3.5 h-3.5" />
            <span>Serving Mississauga &amp; Pearson (YYZ) / YTZ</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight max-w-4xl leading-[1.1]">
            Mississauga Airport Limo Service to Pearson YYZ &amp; YTZ
          </h1>

          <p className="text-sm sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Experience punctual, executive airport transportation from your Mississauga home, office, or hotel. Real-time flight tracking, professional chauffeurs, and spacious 7-passenger black SUVs.
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

      {/* Value Pillars */}
      <section className="py-16 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-10 text-left">
            Why Choose Our Mississauga Airport Chauffeur Service
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Automated Flight Tracking
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                We track every commercial and private flight into Toronto Pearson and Billy Bishop. Your pickup time adjusts automatically with zero stress.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <Luggage className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Massive Luggage Capacity
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Traveling with family or oversized bags? Our Chevrolet Suburban, Yukon Denali, and Escalade ESV fleet accommodates up to 7 suitcases with ease.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                24/7 Guaranteed Flat Rate
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Price confirmed by quote before you book. No meter anxiety, no surge multiples, and direct chauffeur dispatch round the clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteForm
          isAirport={true}
          defaultService="Mississauga Airport Limo"
          title="Get a Mississauga Airport Limo Quote"
          subtitle="Enter your pickup location in Mississauga, travel dates, and flight number for a confirmed flat-rate estimate."
        />
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            items={FAQ_ITEMS}
            title="Mississauga Airport Limo FAQ"
            subtitle="Clear, verified answers regarding Pearson YYZ pickups, wait times, and fleet specifications."
          />
        </div>
      </section>
    </div>
  );
}
