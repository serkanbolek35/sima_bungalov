import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://simabungalov.com"),
  title: {
    default: "Sima Bungalov | Sapanca'da Isıtmalı Özel Havuzlu Bungalov",
    template: "%s | Sima Bungalov",
  },
  description:
    "Sapanca'da modern A-frame mimarisi, ısıtmalı özel havuz ve doğayla iç içe 4 bağımsız bungalov. Rezervasyon için WhatsApp üzerinden bize ulaşın.",
  keywords: [
    "Sapanca bungalov",
    "ısıtmalı havuzlu bungalov",
    "Sapanca özel havuzlu bungalov",
    "Sapanca kaçamak",
    "Sima Bungalov",
  ],
  openGraph: {
    title: "Sima Bungalov | Sapanca'da Isıtmalı Özel Havuzlu Bungalov",
    description:
      "Modern A-frame mimarisi ve ısıtmalı özel havuzuyla Sapanca'da ayrıcalıklı bir kaçamak.",
    url: "https://simabungalov.com",
    siteName: "Sima Bungalov",
    locale: "tr_TR",
    type: "website",
    images: ["/images/hero/hero-01.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sima Bungalov | Sapanca'da Isıtmalı Özel Havuzlu Bungalov",
    description: "Modern A-frame mimarisi ve ısıtmalı özel havuzuyla Sapanca'da ayrıcalıklı bir kaçamak.",
    images: ["/images/hero/hero-01.webp"],
  },
  robots: { index: true, follow: true },
};

const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Sima Bungalov",
  description:
    "Sapanca'da modern A-frame mimarisi ve ısıtmalı özel havuzlu 4 bağımsız bungalovdan oluşan butik konaklama.",
  image: "https://simabungalov.com/images/hero/hero-01.webp",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sapanca",
    addressRegion: "Sakarya",
    addressCountry: "TR",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Isıtmalı Özel Havuz" },
    { "@type": "LocationFeatureSpecification", name: "Özel Bahçe" },
    { "@type": "LocationFeatureSpecification", name: "Ücretsiz Wi-Fi" },
    { "@type": "LocationFeatureSpecification", name: "Ücretsiz Otopark" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
