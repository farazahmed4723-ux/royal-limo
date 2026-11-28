import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, ShieldCheck, Clock, Building2, Phone, ChevronRight, FileText } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion, { FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Corporate Limo Toronto & Mississauga | Executive Chauffeur – Royal Twelve Limo",
  description:
    "Executive corporate limo service for Toronto & GTA businesses. Punctual chauffeurs, premium black SUVs, confidential travel & flat rates. Request a quote.",
  alternates: {
    canonical: "https://royaltwelve.ca/corporate-limo/",
  },
  openGraph: {
    title: "Corporate Limo Toronto & Mississauga | Executive Chauffeur – Royal Twelve Limo",
    description:
      "Executive corporate limo service for Toronto & GTA businesses. Punctual chauffeurs, premium black SUVs, confidential travel & flat rates. Request a quote.",
    url: "https://royaltwelve.ca/corporate-limo/",
    siteName: "Royal Twelve Limo",
    locale: "en_CA",
    type: "website",
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do you offer direct billing or corporate accounts for ongoing business travel?",
    answer:
      "Yes. Royal Twelve Limo provides flexible corporate billing arrangements, centralized monthly invoicing, and itemized trip receipts for executive travel, roadshows, and board meetings across Toronto and Mississauga.",
  },
  {
    question: "Can business executives work productively inside your vehicles?",
    answer:
      "Our Chevrolet Suburban Premier, GMC Yukon Denali, and Cadillac Escalade ESV SUVs are mobile executive suites featuring quiet acoustic glass, tinted privacy windows, fast device charging ports, and whisper-quiet suspension for phone calls and laptop work.",
  },
  {
    question: "How is passenger confidentiality maintained?",
    answer:
      "Discretion is paramount. All Royal Twelve Limo chauffeurs operate under strict non-disclosure and privacy protocols. Confidential phone calls, business negotiations, and passenger schedules are always held in absolute privacy.",
  },
  {
    question: "Are your flat rates guaranteed for multi-city business itineraries?",
    answer:
      "Yes. Price is confirmed by quote before you book. Whether your itinerary involves visiting corporate offices across Mississauga, Oakville, Downtown Toronto, and Markham in a single day, your rate is locked in advance.",
  },
  {
    question: "What is the cancellation timeline for corporate bookings?",
    answer:
      "Corporate bookings cancelled 24 hours or more in advance are 100% refundable. Cancellations submitted under 24 hours incur a 30% dispatch fee, with 70% promptly refunded.",
  },
];

export default function CorporateLimoPage() {
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
        name: "Corporate Limo",
        item: "https://royaltwelve.ca/corporate-limo/",
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Corporate Limousine Service",
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
      { "@type": "City", name: "Brampton" },
      { "@type": "City", name: "Oakville" },
      { "@type": "City", name: "Vaughan" },
      { "@type": "City", name: "Markham" },
    ],
    description:
      "First-class executive limousine and corporate chauffeur service in Toronto and Mississauga for executives, roadshows, and corporate clients.",
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
            src="/images/royal12/fleet-gmc-yukon-denali.jpg"
            alt="Black GMC Yukon Denali for corporate executive travel in Toronto and Mississauga"
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
            <span className="text-[var(--accent-gold)] font-medium">Corporate Limo</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Executive Business Transportation</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight max-w-4xl leading-[1.1]">
            Executive Corporate Limo &amp; Chauffeur Service in Toronto &amp; GTA
          </h1>

          <p className="text-sm sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Elevate your executive travel with professional chauffeurs, spotless black SUVs, and guaranteed punctuality. Tailored for corporate roadshows, VIP client transfers, and executive airport service.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#quote-form"
              className="px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider gold-button shadow-lg"
            >
              Request Corporate Quote
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

      {/* Corporate Highlights */}
      <section className="py-16 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-10 text-left">
            Built for Executive Standards &amp; Corporate Efficiency
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Impeccable Punctuality
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Chauffeurs arrive 15 minutes before scheduled departure. We track traffic dynamics and flight status in real-time so your team never misses a meeting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Complete Discretion
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Conduct sensitive business calls and conversations in complete privacy. Our licensed chauffeurs maintain the highest standards of professional protocol.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Transparent Invoicing
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Price confirmed by quote before you book. We provide comprehensive receipts and itemized booking confirmations for expense management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteForm
          isAirport={false}
          defaultService="Corporate Limo"
          title="Request a Corporate Limo Quote"
          subtitle="Provide your corporate itinerary, multi-stop requirements, or meeting schedule for a prompt flat-rate quotation."
        />
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            items={FAQ_ITEMS}
            title="Corporate Limo FAQ"
            subtitle="Frequently asked questions about corporate invoicing, confidentiality, and executive accounts."
          />
        </div>
      </section>
    </div>
  );
}
