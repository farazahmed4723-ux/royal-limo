import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, Briefcase, ShieldCheck, Sparkles, ChevronRight, Phone, CheckCircle2 } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion, { FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Our Executive Fleet | Chevrolet Suburban, Yukon & Escalade – Royal Twelve Limo",
  description:
    "Explore Royal Twelve Limo's real executive fleet: Chevrolet Suburban, GMC Yukon Denali & Cadillac Escalade ESV. 7 passengers, 7 bags. Request a quote.",
  alternates: {
    canonical: "https://royaltwelve.ca/fleet/",
  },
  openGraph: {
    title: "Our Executive Fleet | Chevrolet Suburban, Yukon & Escalade – Royal Twelve Limo",
    description:
      "Explore Royal Twelve Limo's real executive fleet: Chevrolet Suburban, GMC Yukon Denali & Cadillac Escalade ESV. 7 passengers, 7 bags. Request a quote.",
    url: "https://royaltwelve.ca/fleet/",
    siteName: "Royal Twelve Limo",
    locale: "en_CA",
    type: "website",
  },
};

const FLEET_VEHICLES = [
  {
    name: "Chevrolet Suburban Premier",
    category: "Full-Size Luxury SUV",
    passengers: "Up to 7 Passengers",
    luggage: "Up to 7 Full-Size Luggage Bags",
    image: "/images/royal12/fleet-suburban-black.jpg",
    alt: "All-Black Chevrolet Suburban Premier executive limousine in Mississauga and Toronto",
    features: [
      "All-Black Jet Metallic Exterior",
      "Perforated Jet Black Leather Seating",
      "Tri-Zone Automatic Climate Control",
      "Acoustic Laminated Privacy Glass",
      "High-Speed Mobile Device USB Ports",
      "Magnetic Ride Control Suspension",
    ],
  },
  {
    name: "GMC Yukon Denali",
    category: "Executive Prestige SUV",
    passengers: "Up to 7 Passengers",
    luggage: "Up to 7 Full-Size Luggage Bags",
    image: "/images/royal12/fleet-gmc-yukon-denali.jpg",
    alt: "All-Black GMC Yukon Denali luxury chauffeur SUV serving Toronto Pearson and GTA",
    features: [
      "All-Black Gloss Executive Finish",
      "Handcrafted Denali Leather Interior",
      "Bose 14-Speaker Audio Experience",
      "Deep-Tinted Rear Privacy Windows",
      "Spacious Second-Row Captain Chairs",
      "Four-Corner Air Ride Adaptive Suspension",
    ],
  },
  {
    name: "Cadillac Escalade ESV",
    category: "Ultra-Luxury Flagship SUV",
    passengers: "Up to 7 Passengers",
    luggage: "Up to 7 Full-Size Luggage Bags",
    image: "/images/royal12/fleet-cadillac-escalade.jpg",
    alt: "All-Black Cadillac Escalade ESV flagship limousine in Mississauga and Toronto",
    features: [
      "Extended Wheelbase Flagship Model",
      "Semi-Aniline Full Leather Seating",
      "AKG Studio 36-Speaker Audio",
      "Panoramic Sunroof with Electric Shade",
      "Curved OLED Instrument Displays",
      "Maximum Cargo Capacity Behind 3rd Row",
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do you own and operate these exact vehicles?",
    answer:
      "Yes. Royal Twelve Limo operates exclusively with our confirmed real fleet: the Chevrolet Suburban Premier, GMC Yukon Denali, and Cadillac Escalade ESV. We never dispatch third-party economy cars or vehicles we do not own and maintain.",
  },
  {
    question: "How much luggage can fit in each vehicle?",
    answer:
      "Each of our extended full-size SUVs provides dedicated cargo space for up to 7 full-sized checked suitcases plus multiple carry-on bags and personal items without compromising legroom.",
  },
  {
    question: "How are the vehicles cleaned and inspected?",
    answer:
      "Every vehicle undergoes rigorous mechanical safety inspections and is fully hand-detailed, sanitized, and restocked with complimentary bottled water and phone chargers before every dispatch assignment.",
  },
  {
    question: "Can I request child safety seats?",
    answer:
      "Yes. Forward-facing, rear-facing, and booster child safety seats are available upon advance request when booking your reservation.",
  },
  {
    question: "Is vehicle preference guaranteed?",
    answer:
      "When you request a quote, you can specify your vehicle preference among the Suburban, Yukon Denali, or Escalade ESV. We confirm exact vehicle allocation as part of your booking confirmation.",
  },
];

export default function FleetPage() {
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
        name: "Fleet",
        item: "https://royaltwelve.ca/fleet/",
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
            <span className="text-[var(--accent-gold)] font-medium">Executive Fleet</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Confirmed Fleet • 100% Real Photos</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight max-w-4xl leading-[1.1]">
            Real Executive Black SUV Fleet – Royal Twelve Limo
          </h1>

          <p className="text-sm sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            We operate exclusively with our confirmed luxury black SUV fleet. Every vehicle provides spacious 7-passenger capability, dedicated room for 7 bags, and executive amenities.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#quote-form"
              className="px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider gold-button shadow-lg"
            >
              Request Fleet Quote
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

      {/* Fleet Cards */}
      <section className="py-20 bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {FLEET_VEHICLES.map((vehicle, index) => (
            <div
              key={vehicle.name}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-xl ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Vehicle Image */}
              <div className="lg:col-span-6 relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[var(--border-subtle)]">
                <Image
                  src={vehicle.image}
                  alt={vehicle.alt}
                  fill
                  quality={90}
                  className="object-cover"
                />
              </div>

              {/* Vehicle Specs */}
              <div className="lg:col-span-6 text-left space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
                    {vehicle.category}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                    {vehicle.name}
                  </h2>
                </div>

                {/* Capacity Badges */}
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)]">
                    <Users className="w-4 h-4 text-[var(--accent-gold)]" />
                    <span>{vehicle.passengers}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)]">
                    <Briefcase className="w-4 h-4 text-[var(--accent-gold)]" />
                    <span>{vehicle.luggage}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Key Amenities &amp; Specifications:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--text-secondary)]">
                    {vehicle.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-gold)] flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3">
                  <a
                    href="#quote-form"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)] hover:underline"
                  >
                    <span>Request Quote for {vehicle.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteForm
          isAirport={false}
          defaultService="Executive Fleet Booking"
          title="Reserve a Vehicle from Our Executive Fleet"
          subtitle="Select your preferred luxury black SUV, route details, and date for an instant flat-rate quote response."
        />
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            items={FAQ_ITEMS}
            title="Executive Fleet FAQ"
            subtitle="Frequently asked questions regarding our real vehicle inventory, luggage limits, and cleanliness standards."
          />
        </div>
      </section>
    </div>
  );
}
