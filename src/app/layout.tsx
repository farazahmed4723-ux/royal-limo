import type { Metadata, Viewport } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import AskRoyal12Chat from "@/components/AskRoyal12Chat";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";

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
  title: "Royal 12 Limo | Luxury Limousine & Black Suburban Service Toronto & GTA",
  description:
    "Royal 12 Limo provides premier executive limousine and black car transportation across Toronto and the GTA. Exclusively operating black Chevrolet Suburbans with guaranteed flat rates.",
  keywords: [
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://royal12.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Royal 12 Limo | Luxury Chauffeur & Executive SUV Service Toronto",
    description:
      "First-class executive limousine & black Chevrolet Suburban service across Toronto, Mississauga, and the GTA. 24/7 dedicated dispatch.",
    url: "https://royal12.ca",
    siteName: "Royal 12 Limo",
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
    "@type": "LimousineService",
    name: "Royal 12 Limo",
    telephone: "+14372149283",
    email: "royaltwelve.ca@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mississauga",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: [
      { "@type": "City", name: "Toronto" },
      { "@type": "City", name: "Mississauga" },
      { "@type": "City", name: "Oakville" },
      { "@type": "City", name: "Brampton" },
      { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
    ],
    slogan: "Your Comfort, Our Priority",
    priceRange: "$$$",
    currenciesAccepted: "CAD",
    paymentAccepted: "Credit Card, Debit Card, PayPal, Interac e-Transfer",
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${jakarta.variable} scroll-smooth antialiased`}
    >
      <head>
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
      </body>
    </html>
  );
}
