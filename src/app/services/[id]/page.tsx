import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, Clock, MapPin, ArrowRight, Check } from "lucide-react";

interface ServiceData {
  title: string;
  tagline: string;
  description: string;
  detailedText: string[];
  heroImage: string;
  features: string[];
}

const serviceDatabase: Record<string, ServiceData> = {
  "airport-transfers": {
    title: "Airport Transfers (YYZ & YTZ)",
    tagline: "Punctual, Flight-Tracked Executive Chauffeur Service",
    description:
      "Reliable, private transportation to and from Toronto Pearson International Airport (YYZ) and Billy Bishop Toronto City Airport (YTZ) in our flagship black Chevrolet Suburban.",
    detailedText: [
      "Royal 12 monitors all inbound and outbound commercial flights in real time. Regardless of early landings or air traffic delays, your chauffeur is staged curbside at the designated pre-arranged livery posts before you step out of the terminal.",
      "Enjoy baggage assistance, curbside meeting protocols, and a relaxed, whisper-quiet ride into downtown Toronto, Mississauga, or anywhere in the Greater Toronto Area.",
    ],
    heroImage: "/images/royal12/toronto-pearson-t1.jpg",
    features: [
      "Real-time Pearson & Billy Bishop flight tracking",
      "Terminal 1 and Terminal 3 designated livery post staging",
      "Spacious cargo space for up to 6 full-size check-in bags",
      "Curbside meet-and-greet with luggage assistance",
      "Guaranteed flat airport rates with no hidden fees",
    ],
  },
  "limousine-service": {
    title: "Limousine & Black Car Service",
    tagline: "Uncompromising Luxury Across Toronto & The GTA",
    description:
      "First-class black car transportation with our meticulously maintained Chevrolet Suburban Premier. Executive elegance for meetings, hotel transfers, and dinner reservations.",
    detailedText: [
      "Experience the pinnacle of chauffeured luxury. Every Royal 12 vehicle is an immaculate, all-black Chevrolet Suburban featuring premium leather upholstery, tri-zone climate comfort, and privacy tinted glass.",
      "Whether traveling across Bay Street or heading to an exclusive event at the Ritz-Carlton, your comfort and discretion remain our highest priority.",
    ],
    heroImage: "/images/royal12/fairmont-royal-york-night.jpg",
    features: [
      "Flagship Chevrolet Suburban Premier SUV exclusively",
      "Up to 6 adult passenger capacity with executive legroom",
      "Acoustic privacy glass and quiet ride engineering",
      "Complimentary chilled spring water and device charging",
      "Discreet, licensed executive chauffeurs",
    ],
  },
  "corporate-travel": {
    title: "Corporate & Executive Travel",
    tagline: "Reliable Business Mobility for Leaders & Roadshows",
    description:
      "Bespoke transportation for executive delegations, board meetings, shareholder summits, and multi-stop financial roadshows across the Toronto Financial District.",
    detailedText: [
      "In the corporate arena, timing is non-negotiable. Royal 12 provides dedicated corporate accounts with seamless direct billing, punctual staging, and seasoned chauffeurs who understand executive confidentiality.",
      "Turn travel time into productive working hours with onboard high-speed device charging and a mobile executive environment.",
    ],
    heroImage: "/images/royal12/toronto-bay-street-night.jpg",
    features: [
      "Corporate roadshow management with dedicated vehicle staging",
      "Bay Street, King & University financial district expertise",
      "Itemized corporate invoicing and verified receipts",
      "Full non-disclosure and passenger privacy protection",
      "Flexible as-directed hourly options for busy executive days",
    ],
  },
  "special-events": {
    title: "Special Events & Red Carpet",
    tagline: "Make an Unforgettable Entrance",
    description:
      "Arrive in refined elegance at Toronto galas, TIFF film premieres, concerts at Scotiabank Arena, charity balls, and high-profile private celebrations.",
    detailedText: [
      "Every milestone deserves grand transportation. Royal 12 provides VIP staging, ensuring you arrive on time, in absolute comfort, and in striking style.",
      "Your chauffeur remains on call throughout the event, ready to provide seamless departure whenever you are ready.",
    ],
    heroImage: "/images/royal12/sankofa-square-night.jpg",
    features: [
      "Red carpet staging and prompt pickup at premier venues",
      "Immaculately detailed, high-gloss black Suburban exterior",
      "Chauffeur on standby throughout the duration of your evening",
      "Convenient group transportation for up to 6 guests",
    ],
  },
  "private-chauffeur": {
    title: "Private Chauffeur Service",
    tagline: "Your Personal Chauffeur On-Demand",
    description:
      "A dedicated, background-screened personal driver dedicated exclusively to your personal or executive schedule throughout Southern Ontario.",
    detailedText: [
      "When your itinerary demands complete flexibility, Royal 12 delivers a private chauffeur at your disposal. Move effortlessly between meetings, social appointments, shopping, and dining.",
      "Our chauffeurs possess extensive knowledge of GTA roadways, optimal bypass routes, and premier hospitality destinations.",
    ],
    heroImage: "/images/royal12/toronto-skyline-hero.jpg",
    features: [
      "Dedicated chauffeur assigned exclusively to your reservation",
      "Unlimited stops and real-time itinerary modifications",
      "Thoroughly vetted with background and clean driving records",
      "Strict professional etiquette and passenger confidentiality",
    ],
  },
  "hourly-service": {
    title: "Hourly As-Directed Service",
    tagline: "Complete Freedom, Flexibility & On-Demand Standby",
    description:
      "Book your Chevrolet Suburban by the hour with guaranteed vehicle availability, unlimited stops, and personalized standby dispatch.",
    detailedText: [
      "Ideal for multi-destination business days, client entertainment, shopping excursions, or complex schedules. Your chauffeur stays parked on-site, ready whenever you return.",
      "Enjoy transparent hourly pricing with no surprise surcharges.",
    ],
    heroImage: "/images/royal12/toronto-bay-street-night.jpg",
    features: [
      "Minimum hourly bookings with transparent flat rates",
      "Unlimited stops within the Greater Toronto Area",
      "Vehicle remains exclusively reserved and waiting for you",
      "Seamless billing and instant adjustments",
    ],
  },
  "city-to-city": {
    title: "City to City Executive Transfers",
    tagline: "Long-Distance Luxury SUV Travel Across Ontario",
    description:
      "Private, nonstop chauffeured SUV transfers connecting Toronto & Mississauga with Niagara Falls, Muskoka, Ottawa, Montreal, Waterloo, and London.",
    detailedText: [
      "Skip crowded regional airports and train schedules. Royal 12 provides effortless door-to-door city-to-city executive transfers in a whisper-quiet, spacious black luxury SUV.",
      "Relax, work productively with onboard USB-C & 110V power, and enjoy guaranteed flat-rate long-distance pricing across Ontario and surrounding corridors.",
    ],
    heroImage: "/images/royal12/toronto-bay-street-night.jpg",
    features: [
      "Direct door-to-door intercity travel across Ontario",
      "Guaranteed transparent flat rates with no surge pricing",
      "Choice of Suburban Premier, GMC Yukon Denali, or Cadillac Escalade",
      "Flexible departure times & complimentary route stops",
    ],
  },
  "point-to-point": {
    title: "Point to Point Black Car Service",
    tagline: "Direct Executive Transfers Anywhere in the GTA",
    description:
      "Fast, reliable, pre-scheduled point-to-point transfers between offices, hotels, residences, and private FBO jet terminals across Toronto and the GTA.",
    detailedText: [
      "Designed for executives and VIP travelers who value punctuality and discretion. Your chauffeur arrives 15 minutes prior to pickup for a seamless departure.",
      "Transparent distance-based pricing ensures total predictability for every trip across Mississauga, Downtown Toronto, Oakville, and York Region.",
    ],
    heroImage: "/images/royal12/fairmont-royal-york-night.jpg",
    features: [
      "Guaranteed 15-minute early chauffeur staging",
      "Fixed upfront pricing calculated via Google Routes API",
      "Up to 6 adult passengers and 6 full-size suitcases",
      "24/7 direct dispatch confirmation and trip updates",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(serviceDatabase).map((id) => ({ id }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = serviceDatabase[id];

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Hero Banner */}
      <section className="relative h-[380px] sm:h-[440px] flex items-center justify-center overflow-hidden">
        <Image
          src={service.heroImage}
          alt={service.title}
          fill
          priority
          className="object-cover filter brightness-[0.45] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--bg-card)]/90 border border-[var(--border-subtle)] text-xs font-semibold text-[var(--accent-gold)] mb-4 shadow-sm">
            <span>Royal 12 Limo • Services</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
            {service.title}
          </h1>
          <p className="text-sm sm:text-base text-[var(--accent-gold)] font-medium mt-2 max-w-2xl mx-auto">
            {service.tagline}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Details */}
          <div className="lg:col-span-8 space-y-8 text-left">
            <div>
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-4">
                Service Overview
              </h2>
              <p className="text-base text-[var(--text-primary)]/90 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="space-y-4">
              {service.detailedText.map((p, idx) => (
                <p key={idx} className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Features Checklist */}
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4 shadow-[var(--shadow-luxury)]">
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                What Sets Royal 12 Apart
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--text-primary)]">
                    <div className="w-4 h-4 rounded-full bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent-gold)] flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Card */}
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center gap-6 shadow-[var(--shadow-luxury)]">
              <div className="relative w-44 h-24 flex-shrink-0">
                <Image
                  src="/images/royal12/suburban-black-1.jpg"
                  alt="Jet Black Chevrolet Suburban High Country"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <div className="space-y-1 text-left">
                <div className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider">
                  Dispatched Vehicle
                </div>
                <h4 className="font-display text-base font-bold text-[var(--text-primary)]">
                  Black Chevrolet Suburban Premier
                </h4>
                <p className="text-xs text-[var(--text-secondary)]">
                  Up to 6 Passengers • 6 Large Luggage • Tri-Zone Climate • Privacy Glass
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-5 text-left sticky top-28 shadow-[var(--shadow-luxury)]">
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Reserve This Service
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Book your trip online with instant transparent quote calculation and manual dispatch confirmation.
              </p>

              <Link
                href="/#booking-bar"
                className="w-full inline-flex items-center justify-center py-3.5 rounded-xl text-center text-xs font-bold uppercase tracking-wider gold-button shadow-lg shadow-[var(--accent-gold)]/25"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>

              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3 text-xs">
                <div className="flex items-center gap-2 text-[var(--text-primary)]">
                  <Clock className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>24/7 Round-the-Clock Dispatch</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-primary)]">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Full Commercial Livery Insurance</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-primary)]">
                  <MapPin className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Mississauga & Greater Toronto Area</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]">
                Direct Dispatch: <strong className="text-[var(--text-primary)]">+1 (437) 214-9283</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
