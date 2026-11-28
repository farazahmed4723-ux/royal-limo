"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}

export default function FaqAccordion({
  items,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our chauffeur and limousine services.",
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 text-left">
      <div className="space-y-2 text-center sm:text-left">
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          {subtitle}
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer hover:bg-[var(--bg-secondary)]/50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-display text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[var(--accent-gold)] flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]/60 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
