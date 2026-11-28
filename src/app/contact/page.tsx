import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ShieldCheck, ChevronRight, MessageSquare, Send } from "lucide-react";
import FaqAccordion, { FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Contact Royal Twelve Limo | 24/7 Dispatch Mississauga & Toronto",
  description:
    "Contact Royal Twelve Limo in Mississauga, ON. Call +1 (437) 214-9283 for 24/7 dispatch or email royaltwelve.ca@gmail.com. We serve Mississauga and the GTA.",
  alternates: {
    canonical: "https://royaltwelve.ca/contact/",
  },
  openGraph: {
    title: "Contact Royal Twelve Limo | 24/7 Dispatch Mississauga & Toronto",
    description:
      "Contact Royal Twelve Limo in Mississauga, ON. Call +1 (437) 214-9283 for 24/7 dispatch or email royaltwelve.ca@gmail.com. We serve Mississauga and the GTA.",
    url: "https://royaltwelve.ca/contact/",
    siteName: "Royal Twelve Limo",
    locale: "en_CA",
    type: "website",
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How can I contact dispatch for an urgent or last-minute ride?",
    answer:
      "For urgent or same-day departure requests, call our 24/7 direct dispatch line immediately at +1 (437) 214-9283. Our dispatchers will check immediate fleet availability across Mississauga and the GTA.",
  },
  {
    question: "Do you have a physical office open to the public?",
    answer:
      "Royal Twelve Limo operates as a mobile executive chauffeur service based in Mississauga, Ontario, serving Mississauga and the Greater Toronto Area. Vehicles are dispatched directly to client residences, corporate offices, and airport terminals.",
  },
  {
    question: "What is your typical email response time for quote inquiries?",
    answer:
      "All online inquiries and quote requests sent to royaltwelve.ca@gmail.com or via our web form receive a response within 2 business hours with an all-inclusive flat rate.",
  },
  {
    question: "How do I make changes to an existing reservation?",
    answer:
      "To modify an existing booking (such as updating your flight number, pickup time, or destination), call or text our 24/7 dispatch line at +1 (437) 214-9283 or reply to your confirmation email.",
  },
];

export default function ContactPage() {
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
        name: "Contact",
        item: "https://royaltwelve.ca/contact/",
      },
    ],
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Royal Twelve Limo",
    telephone: "+14372149283",
    email: "royaltwelve.ca@gmail.com",
    url: "https://royaltwelve.ca",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mississauga",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: [
      { "@type": "City", name: "Mississauga" },
      { "@type": "City", name: "Toronto" },
      { "@type": "City", name: "Brampton" },
      { "@type": "City", name: "Oakville" },
      { "@type": "City", name: "Vaughan" },
      { "@type": "City", name: "Markham" },
      { "@type": "City", name: "Burlington" },
      { "@type": "City", name: "Milton" },
      { "@type": "City", name: "Hamilton" },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
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
            <span className="text-[var(--accent-gold)] font-medium">Contact Us</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
            <Clock className="w-3.5 h-3.5" />
            <span>24/7 Round-the-Clock Dispatch</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight max-w-4xl leading-[1.1]">
            Contact Royal Twelve Limo – 24/7 Dedicated Dispatch
          </h1>

          <p className="text-sm sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Get in touch with our executive livery team for immediate bookings, route quotes, or corporate inquiries across Mississauga and the Greater Toronto Area.
          </p>
        </div>
      </section>

      {/* Contact Cards & Form */}
      <section className="py-20 bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Contact Details */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="p-8 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-6">
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  Direct Dispatch Information
                </h2>

                <div className="space-y-5 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase font-bold text-[var(--text-secondary)]">24/7 Phone Dispatch</div>
                      <a
                        href="tel:+14372149283"
                        className="text-base font-bold text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors"
                      >
                        +1 (437) 214-9283
                      </a>
                      <div className="text-xs text-[var(--text-secondary)] mt-0.5">Click to call immediately</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase font-bold text-[var(--text-secondary)]">Direct Email Inquiries</div>
                      <a
                        href="mailto:royaltwelve.ca@gmail.com"
                        className="text-base font-bold text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors"
                      >
                        royaltwelve.ca@gmail.com
                      </a>
                      <div className="text-xs text-[var(--text-secondary)] mt-0.5">Replies within 2 business hours</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase font-bold text-[var(--text-secondary)]">Base Location</div>
                      <div className="text-base font-bold text-[var(--text-primary)]">Mississauga, ON</div>
                      <div className="text-xs text-[var(--text-secondary)] mt-0.5">Serving Mississauga and the GTA</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase font-bold text-[var(--text-secondary)]">Operating Hours</div>
                      <div className="text-base font-bold text-emerald-400">24/7 Round-the-Clock</div>
                      <div className="text-xs text-[var(--text-secondary)] mt-0.5">Always available for scheduled &amp; urgent trips</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder Card */}
              <div className="p-6 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center gap-5">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-[var(--accent-gold)]/40">
                  <Image
                    src="/images/royal12/sayed-kamran-ali.jpg"
                    alt="Sayed Kamran Ali - Founder & Executive Chauffeur of Royal Twelve Limo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--accent-gold)] tracking-wider">
                    Executive Leadership
                  </span>
                  <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                    Sayed Kamran Ali
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Founder &amp; Lead Chauffeur, ensuring safety, punctuality, and personalized care for every passenger.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-left space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
                  Fast Inquiries
                </span>
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  Send a Direct Dispatch Message
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  Need a customized quote or have special corporate requests? Fill out the form below.
                </p>
              </div>

              <form action="/api/contact" method="POST" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Smith"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+1 (437) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                    Inquiry Details / Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Describe your travel itinerary, dates, or questions..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-[var(--accent-gold)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider gold-button shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Message to Dispatch</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href="/get-a-quote/"
                    className="text-xs text-[var(--accent-gold)] hover:underline font-semibold"
                  >
                    Looking for a fast rate quote? Click here →
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            items={FAQ_ITEMS}
            title="Contact &amp; Dispatch FAQ"
            subtitle="Frequently asked questions about reaching our dispatch team and booking procedures."
          />
        </div>
      </section>
    </div>
  );
}
