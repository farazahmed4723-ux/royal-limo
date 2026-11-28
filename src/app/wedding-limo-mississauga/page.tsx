import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, Clock, ShieldCheck, Phone, ChevronRight, CalendarCheck } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion, { FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Wedding Limo Mississauga | Luxury Bridal Chauffeur – Royal Twelve Limo",
  description:
    "Elegant wedding limo service in Mississauga & GTA. Pristine black SUVs, red carpet service, professional chauffeurs & flat rates. Book your quote today.",
  alternates: {
    canonical: "https://royaltwelve.ca/wedding-limo-mississauga/",
  },
  openGraph: {
    title: "Wedding Limo Mississauga | Luxury Bridal Chauffeur – Royal Twelve Limo",
    description:
      "Elegant wedding limo service in Mississauga & GTA. Pristine black SUVs, red carpet service, professional chauffeurs & flat rates. Book your quote today.",
    url: "https://royaltwelve.ca/wedding-limo-mississauga/",
    siteName: "Royal Twelve Limo",
    locale: "en_CA",
    type: "website",
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Which vehicles are available for weddings in Mississauga and the GTA?",
    answer:
      "We operate an all-black executive SUV fleet: the Chevrolet Suburban Premier, GMC Yukon Denali, and Cadillac Escalade ESV. Each vehicle provides spacious seating for bridal gowns, wedding dresses, and bridal parties of up to 7 passengers with climate-controlled luxury interiors.",
  },
  {
    question: "Can we make multiple stops for wedding photography between ceremony and reception?",
    answer:
      "Yes. Our wedding packages are completely customizable. We can schedule multiple stops for photo sessions across Mississauga parks (e.g., Kariya Park, Riverwood Conservancy) and Toronto photo locations before heading to your reception venue.",
  },
  {
    question: "How far in advance should we reserve wedding limousine transportation?",
    answer:
      "Due to high demand during peak wedding season (May through October), we recommend reserving your vehicles 2 to 4 months in advance to guarantee vehicle preference and schedule alignment.",
  },
  {
    question: "Is the wedding rate confirmed before booking?",
    answer:
      "Yes. Price is confirmed by quote before you book. We provide comprehensive flat-rate pricing based on your required hours, stops, and vehicles, with zero hidden charges or post-event fees.",
  },
  {
    question: "What is your wedding cancellation policy?",
    answer:
      "Cancellations requested 24 hours or more before the reservation are 100% fully refundable. For cancellations made under 24 hours, 30% is retained to cover scheduled chauffeur allocation, and 70% is refunded.",
  },
];

export default function WeddingLimoMississaugaPage() {
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
        name: "Wedding Limo Mississauga",
        item: "https://royaltwelve.ca/wedding-limo-mississauga/",
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Wedding Limousine Service",
    provider: {
      "@type": "LocalBusiness",
      name: "Royal Twelve Limo",
      telephone: "+14372149283",
      email: "royaltwelve.ca@gmail.com",
      url: "https://royaltwelve.ca",
    },
    areaServed: [
      { "@type": "City", name: "Mississauga" },
      { "@type": "City", name: "Toronto" },
      { "@type": "City", name: "Oakville" },
      { "@type": "City", name: "Brampton" },
      { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
    ],
    description:
      "Luxury wedding limousine and black SUV chauffeur service in Mississauga and the Greater Toronto Area. Dedicated bridal party travel and venue transfers.",
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
            src="/images/royal12/fleet-cadillac-escalade.jpg"
            alt="Black Cadillac Escalade ESV for wedding limousine service in Mississauga"
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
            <span className="text-[var(--accent-gold)] font-medium">Wedding Limo Mississauga</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
            <Heart className="w-3.5 h-3.5" />
            <span>Mississauga &amp; GTA Wedding Chauffeurs</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight max-w-4xl leading-[1.1]">
            Luxury Wedding Limo &amp; Chauffeur Service in Mississauga
          </h1>

          <p className="text-sm sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Make your special day unforgettable with punctual, red-carpet bridal party transportation. Our spotless black Chevrolet Suburban, Yukon Denali, and Escalade ESV SUVs provide majestic comfort for brides, grooms, and VIP families.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#quote-form"
              className="px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider gold-button shadow-lg"
            >
              Request Wedding Quote
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

      {/* Wedding Pillars */}
      <section className="py-16 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-10 text-left">
            Elegance, Precision &amp; Peace of Mind on Your Wedding Day
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Immaculate Black SUVs
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Every vehicle is detailed to showroom perfection before dispatch, with premium leather, quiet acoustic glass, and spacious room for voluminous wedding attire.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                On-Time Wedding Timelines
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Chauffeurs arrive 15 minutes ahead of schedule to ensure stress-free transitions between bridal dressing, church ceremony, photoshoot, and reception hall.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Multi-Stop Flexibility
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Enjoy seamless coordination across multiple venues, family homes, and photography destinations throughout Mississauga and the GTA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteForm
          isAirport={false}
          defaultService="Wedding Limo Mississauga"
          title="Get a Wedding Limo Quote"
          subtitle="Provide your wedding date, pickup address, ceremony venue, and guest passenger counts for a tailored flat-rate quote."
        />
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            items={FAQ_ITEMS}
            title="Mississauga Wedding Limo FAQ"
            subtitle="Essential answers regarding vehicle decor, booking timelines, and custom wedding itineraries."
          />
        </div>
      </section>
    </div>
  );
}
