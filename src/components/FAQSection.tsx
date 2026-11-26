"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ScrollReveal, { StaggerContainer, PopItem } from "./ScrollReveal";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Which vehicle models are dispatched for my reservation?",
      answer:
        "Royal 12 operates exclusively with our premium all-black luxury SUV fleet: Black Chevrolet Suburban Premier, Black GMC Yukon Denali, and Black Cadillac Escalade ESV. We do not substitute with sedans, standard minivans, or older models. Your booking guarantees a pristine, fully detailed jet-black executive SUV accommodating up to 6 passengers with generous luggage space.",
    },
    {
      question: "What is the official cancellation and refund policy?",
      answer:
        "Royal 12 provides 24/7 Round-the-Clock Dispatch & Chauffeur Service with transparent policies. Free cancellation up to 24 hours prior to scheduled pickup. If a ride is cancelled after the 24-hour window (within 24 hours of pickup), a 30% cancellation fee will be deducted and the remaining 70% of the fare will be refunded. Timezone calculations are strictly based on America/Toronto local time.",
    },
    {
      question: "How do airport pickups work at Toronto Pearson (YYZ)?",
      answer:
        "We track your inbound flight in real time using official aviation data. Once your aircraft touches down and you collect your baggage, simply proceed to the designated Pre-Arranged Livery Post at Terminal 1 (Door A/B) or Terminal 3 (Door 5) and notify our dispatch or check in with the commissionaire. Your chauffeur is already staged and will pull curbside within minutes.",
    },
    {
      question: "Which payment methods are accepted?",
      answer:
        "We accept all major credit and debit cards (Visa, Mastercard, American Express, Apple Pay, Google Pay) securely processed via Stripe; official PayPal Business Checkout; and Interac e-Transfer sent to royaltwelve.ca@gmail.com. For Interac payments, reservations remain 'Pending Verification' until verified against the company bank account.",
    },
    {
      question: "Is gratuity (tip) mandatory?",
      answer:
        "No, gratuity is 100% optional. During checkout, you may choose 'No Tip' (default), 10% Tip, or 20% Tip based entirely on your satisfaction with our chauffeur service.",
    },
    {
      question: "How does booking confirmation work?",
      answer:
        "To guarantee 100% reliability, every reservation submitted through our platform undergoes manual review and confirmation by our executive dispatch team. Once approved, you receive a confirmation email with complete reservation details, chauffeur contact, and staging instructions.",
    },
    {
      question: "What service areas do you cover?",
      answer:
        "Royal 12 is licensed in Mississauga, Ontario, and provides comprehensive transportation throughout the Greater Toronto Area (Toronto Downtown, Mississauga, Brampton, Oakville, Vaughan, Markham, Richmond Hill, Burlington) and Pearson International Airport (YYZ). Extended long-distance routes (such as Niagara Falls and Muskoka) are available by advance reservation.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[var(--bg-primary)] relative scroll-mt-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={35} className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
            Common Inquiries
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-3">
            Transparent answers regarding our Chevrolet Suburban fleet, Pearson airport transfers,
            and booking policies.
          </p>
        </ScrollReveal>

        {/* Accordion with Staggered Pop */}
        <StaggerContainer staggerDelay={0.07} className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <PopItem
                key={idx}
                yDistance={35}
                hoverElevation={-4}
                className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-all duration-200 overflow-hidden shadow-[var(--shadow-luxury)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--accent-gold)] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[var(--accent-gold)] text-black" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]">
                    {faq.answer}
                  </div>
                )}
              </PopItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
