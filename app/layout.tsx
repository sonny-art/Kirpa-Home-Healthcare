import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";
import { RevealObserver } from "@/components/RevealObserver";
import { JsonLd, businessJsonLd } from "@/lib/jsonld";

// Refined humanist grotesque for body & UI (variable weights), pairs with the
// Source Serif 4 headings. Not the generic geometric look of the prototype.
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// Elegant editorial serif for headings (Inova-inspired).
const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · Compassionate In-Home Care in ${SITE.address.city}, ${SITE.address.state}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.tagline,
  applicationName: SITE.name,
  keywords: [
    "home health care",
    "non-medical home care",
    "personal care",
    "caregiver",
    "in-home care",
    "respite care",
    "companion care",
    "Ashburn VA home care",
    "senior care",
    "elderly care",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} · Compassionate In-Home Care`,
    description: SITE.tagline,
    images: [{ url: "/images/care-1.jpg", width: 1200, height: 1800, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} · Compassionate In-Home Care`,
    description: SITE.tagline,
    images: ["/images/care-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#0C2C52",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <JsonLd data={businessJsonLd()} />
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCta />
        <RevealObserver />
      </body>
    </html>
  );
}
