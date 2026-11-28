import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Plane, CheckCircle2, Phone, ChevronRight, Navigation, ShieldCheck } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion, { FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Limo Service Areas | Mississauga, Toronto & GTA Chauffeur – Royal Twelve Limo",
  description:
    "Royal Twelve Limo proudly serves Mississauga, Toronto, Brampton, Oakville, Vaughan, Markham, Burlington & GTA airports. Request your flat-rate quote today.",
  alternates: {
    canonical: "https://royaltwelve.ca/service-areas/",
  },
  openGraph: {
    title: "Limo Service Areas | Mississauga, Toronto & GTA Chauffeur – Royal Twelve Limo",
    description:
      "Royal Twelve Limo proudly serves Mississauga, Toronto, Brampton, Oakville, Vaughan, Markham, Burlington & GTA airports. Request your flat-rate quote today.",
    url: "https://royaltwelve.ca/service-areas/",
    siteName: "Royal Twelve Limo",
    locale: "en_CA",
    type: "website",
  },
};

const SERVICE_REGIONS = [
  {
    name: "Mississauga, ON (Base City)",
    description: "Port Credit, City Centre, Streetsville, Meadowvale, Erin Mills, Lorne Park, Clarkson & Cooksville.",
    status: "Primary Hub • Immediate Dispatch",
  },
  {
    name: "Toronto",
    description: "Financial District, Downtown Core, Yorkville, Midtown, North York, Etobicoke, Scarborough & The Annex.",
    status: "Daily Executive Transfers",
  },
  {
    name: "Oakville",
    description: "Old Oakville, Glen Abbey, Bronte, Joshua Creek, Clearview & River Oaks.",
    status: "Daily Airport & Corporate Transfers",
  },
  {
    name: "Brampton",
    description: "Bramalea, Mount Pleasant, Heart Lake, Springdale & Downtown Brampton.",
    status: "24/7 Chauffeur Dispatch",
  },
  {
    name: "Vaughan & Woodbridge",
    description: "Woodbridge, Maple, Kleinburg, Thornhill, Concord & Vaughan Metropolitan Centre.",
    status: "Executive & Wedding Service",
  },
  {
    name: "Markham & Richmond Hill",
    description: "Unionville, Markham Centre, Bayview Glen, Mill Pond & Jefferson.",
    status: "Corporate Tech Corridor Travel",
  },
  {
    name: "Burlington",
    description: "Downtown Burlington, Aldershot, Millcroft, Roseland & Tyandaga.",
    status: "Airport & Livery Service",
  },
  {
    name: "Milton & Halton Region",
    description: "Dorset Park, Beaty, Clarke, Coates, Bronte Meadows & Milton Core.",
    status: "Executive Chauffeur Service",
  },
  {
    name: "Hamilton & Stoney Creek",
    description: "Ancaster, Dundas, Downtown Hamilton, Hamilton Mountain & Waterdown.",
    status: "Inter-City & Airport Transfers",
  },
];

const AIRPORTS_SERVED = [
  {
    code: "YYZ",
    name: "Toronto Pearson International Airport",
    location: "Mississauga / Toronto border",
    details: "Terminal 1 and Terminal 3 curbside and meet-and-greet service with real-time flight tracking.",
  },
  {
    code: "YTZ",
    name: "Billy Bishop Toronto City Airport",
    location: "Toronto Island / Downtown Mainland Terminal",
    details: "Direct mainland ferry terminal and pedestrian tunnel transfers for Porter and Air Canada flights.",
  },
  {
    code: "YHM",
    name: "John C. Munro Hamilton International Airport",
    location: "Hamilton, Ontario",
    details: "Executive departures and arrivals for domestic and international passenger flights.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do you service areas outside Mississauga and Toronto?",
    answer:
      "Yes. Royal Twelve Limo provides point-to-point and hourly service across all Greater Toronto Area municipalities: Mississauga, Toronto, Brampton, Oakville, Vaughan, Markham, Burlington, Milton, and Hamilton, as well as cross-regional transfers to Niagara Falls and cottage country.",
  },
  {
    question: "What is your physical dispatch location?",
    answer:
      "Royal Twelve Limo is based in Mississauga, Ontario, serving Mississauga and the Greater Toronto Area. As a mobile chauffeur and executive dispatch service, our vehicles are dispatched directly to your requested doorstep or terminal location.",
  },
  {
    question: "Do you pick up from private FBO aviation gates at Pearson?",
    answer:
      "Yes. We regularly service private aviation FBOs at Toronto Pearson Airport, including Skyservice, Signature Aviation, and Chartright Air Group, with seamless ramp-side and terminal lounge pickups.",
  },
  {
    question: "Is the price guaranteed regardless of the destination city?",
    answer:
      "Yes. Price is confirmed by quote before you book. Every municipality and airport route receives an upfront, all-inclusive flat rate with zero meter surprises.",
  },
  {
    question: "Can I book a return trip from the airport back to my city?",
    answer:
      "Yes. Round-trip and return transfers can be reserved simultaneously. Your return flight will be automatically tracked by your assigned chauffeur.",
  },
];

export default function ServiceAreasPage() {
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
        name: "Service Areas",
        item: "https://royaltwelve.ca/service-areas/",
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
            <span className="text-[var(--accent-gold)] font-medium">Service Areas</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Serving Mississauga and the GTA</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight max-w-4xl leading-[1.1]">
            Limo Service Areas Across Mississauga, Toronto &amp; the GTA
          </h1>

          <p className="text-sm sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Headquartered in Mississauga, ON, Royal Twelve Limo provides round-the-clock executive chauffeur service across every major GTA municipality and airport with confirmed flat rates.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#quote-form"
              className="px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider gold-button shadow-lg"
            >
              Request Area Quote
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

      {/* Cities Grid */}
      <section className="py-20 bg-[var(--bg-card)] border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-left space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Municipalities &amp; Communities We Serve
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl">
              Professional door-to-door transportation provided by licensed chauffeurs in full-size luxury black SUVs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {SERVICE_REGIONS.map((region) => (
              <div
                key={region.name}
                className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3 hover:border-[var(--accent-gold)]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[var(--accent-gold)] tracking-wider px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                    {region.status}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  {region.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {region.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Airports Grid */}
      <section className="py-20 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-left space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Airports &amp; Aviation Hubs Served
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl">
              Flight tracking included with complimentary wait time on all arrivals across Southern Ontario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {AIRPORTS_SERVED.map((airport) => (
              <div
                key={airport.code}
                className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3"
              >
                <div className="flex items-center gap-2 text-[var(--accent-gold)] font-bold text-xl font-display">
                  <Plane className="w-5 h-5" />
                  <span>{airport.code}</span>
                </div>
                <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                  {airport.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">Location:</strong> {airport.location}
                </p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {airport.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteForm
          isAirport={false}
          defaultService="GTA Service Area Transfer"
          title="Request a Quote in Your Area"
          subtitle="Serving Mississauga and the GTA. Provide your pickup city and destination for a confirmed flat-rate quote within 2 business hours."
        />
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            items={FAQ_ITEMS}
            title="Service Areas FAQ"
            subtitle="Frequently asked questions about our pickup boundaries, regional flat rates, and airport connections."
          />
        </div>
      </section>
    </div>
  );
}
