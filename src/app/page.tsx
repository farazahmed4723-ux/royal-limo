"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import FounderSection from "@/components/FounderSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ServicesSection from "@/components/ServicesSection";
import FleetSection from "@/components/FleetSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BookingQuoteEngine from "@/components/BookingQuoteEngine";
import ServiceAreasSection from "@/components/ServiceAreasSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import { BookingData } from "@/components/BookingWidget";

export default function HomePage() {
  const [activeBookingData, setActiveBookingData] = useState<BookingData | null>(null);
  const [bookingRevision, setBookingRevision] = useState(0);

  const handleFindRide = (data: BookingData) => {
    setActiveBookingData(data);
    setBookingRevision((prev) => prev + 1);
    const engineEl = document.getElementById("booking-quote-engine");
    if (engineEl) {
      engineEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Cinematic Hero Section with Booking Widget */}
      <HeroSection onFindRide={handleFindRide} />

      {/* 2. Numerical & Qualitative Statistics + Sayed Kamran Ali Founder Spotlight (Screenshot 1) */}
      <StatsSection />

      {/* 3. Detailed About Royal 12 */}
      <AboutSection />

      {/* 4. Dedicated Owner & Leadership Spotlight (Sayed Kamran Ali) */}
      <FounderSection />

      {/* 4. Why Choose Royal 12 / Safety Standards (Screenshot 2) */}
      <WhyChooseSection />

      {/* 4. Complete Services Portfolio (Screenshot 3) */}
      <ServicesSection />

      {/* 5. Exclusively Chevrolet Suburban Fleet Showcase */}
      <FleetSection />

      {/* 6. Step-by-Step How It Works */}
      <HowItWorksSection />

      {/* 7. Comprehensive Booking Engine with Live Fare & Route Calculation */}
      <BookingQuoteEngine key={bookingRevision} initialData={activeBookingData} />

      {/* 8. Verified Service Areas Across GTA & Airports */}
      <ServiceAreasSection />

      {/* 9. Verified FAQs & Cancellation Policy */}
      <FAQSection />

      {/* 10. Direct Contact & Quote Request Form */}
      <ContactSection />
    </div>
  );
}
