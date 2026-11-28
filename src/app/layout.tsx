import type { Metadata, Viewport } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import AskRoyal12Chat from "@/components/AskRoyal12Chat";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import { Analytics } from "@vercel/analytics/next";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08090B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Limo Service Mississauga | Airport, Wedding & Corporate Limo – Royal Twelve Limo",
  description:
    "Royal Twelve Limo provides premier executive limousine & black SUV chauffeur services across Mississauga, Toronto & the GTA. 24/7 dispatch. Request a quote.",
  keywords: [
    "Royal Twelve Limo",
    "Toronto limo service",
    "Mississauga limo service",
    "GTA limousine service",
    "Toronto airport limo",
    "Pearson airport limousine",
    "Luxury SUV transportation Toronto",
    "Chevrolet Suburban limo Toronto",
    "Corporate limousine service Toronto",
    "Private chauffeur Toronto",
    "Executive transportation GTA",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://royaltwelve.ca"),
  alternates: {
    canonical: "https://royaltwelve.ca/",
  },
  openGraph: {
    title: "Limo Service Mississauga | Airport, Wedding & Corporate Limo – Royal Twelve Limo",
    description:
      "First-class executive limousine & black SUV chauffeur service across Mississauga, Toronto, and the GTA. 24/7 dedicated dispatch.",
    url: "https://royaltwelve.ca/",
    siteName: "Royal Twelve Limo",
    locale: "en_CA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
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
      { "@type": "Airport", name: "Toronto Pearson International Airport (YYZ)" },
      { "@type": "Airport", name: "Billy Bishop Toronto City Airport (YTZ)" },
      { "@type": "Airport", name: "John C. Munro Hamilton International Airport (YHM)" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    currenciesAccepted: "CAD",
    paymentAccepted: "Credit Card, Debit Card, Interac e-Transfer",
  };

  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

  return (
    <html
      lang="en-CA"
      suppressHydrationWarning
      className={`${montserrat.variable} ${jakarta.variable} scroll-smooth antialiased`}
    >
      <head>
        {/* Google Analytics 4: [OWNER NEW GA4 ID] */}
        {gaMeasurementId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaMeasurementId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var urlTheme = null;
                try {
                  var p = new URLSearchParams(window.location.search);
                  urlTheme = p.get('theme');
                } catch(err) {}
                var saved = (urlTheme === 'day' || urlTheme === 'night') ? urlTheme : localStorage.getItem('luxury-theme-mode');
                if (!saved) {
                  saved = localStorage.getItem('royal12-theme');
                }
                var theme = saved;
                if (theme !== 'day' && theme !== 'night') {
                  var hour = new Date().getHours();
                  theme = (hour >= 6 && hour < 18) ? 'day' : 'night';
                }
                if (urlTheme === 'day' || urlTheme === 'night') {
                  localStorage.setItem('luxury-theme-mode', theme);
                  localStorage.setItem('royal12-theme', theme);
                }
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.classList.remove('day', 'night', 'light-mode');
                document.documentElement.classList.add(theme);
                if (theme === 'day') {
                  document.documentElement.classList.add('light-mode');
                }
              } catch(e) {}
            })()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col selection:bg-[var(--accent-gold)] selection:text-black">
        <AuthProvider>
          <CursorFollower />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <AskRoyal12Chat />
          <AuthModal />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
