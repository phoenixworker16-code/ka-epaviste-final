import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "KA Auto Épaves - Enlèvement gratuit d'épaves automobiles en Centre-Val de Loire",
    template: "%s | KA Auto Épaves",
  },
  description:
    "Service professionnel d'enlèvement d'épaves automobiles en Centre-Val de Loire. Intervention rapide et gratuite dans tous les départements. Démarches administratives incluses.",
  keywords: [
    "épaves automobiles",
    "enlèvement gratuit",
    "Centre-Val de Loire",
    "dépannage auto",
    "véhicule hors usage",
    "VHU",
    "recyclage automobile",
    "Cher",
    "Eure-et-Loir",
    "Indre",
    "Indre-et-Loire",
    "Loir-et-Cher",
    "Loiret",
    "Bourges",
    "Chartres",
    "Tours",
    "Orléans",
    "Blois",
  ],
  authors: [{ name: "KA Auto Épaves" }],
  creator: "KA Auto Épaves",
  publisher: "KA Auto Épaves",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ka-auto-epaves.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ka-auto-epaves.vercel.app",
    siteName: "KA Auto Épaves",
    title: "KA Auto Épaves - Enlèvement gratuit d'épaves automobiles",
    description:
      "Service professionnel d'enlèvement d'épaves automobiles en Centre-Val de Loire. Intervention rapide et gratuite.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KA Auto Épaves - Service d'enlèvement d'épaves",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KA Auto Épaves - Enlèvement gratuit d'épaves automobiles",
    description: "Service professionnel d'enlèvement d'épaves automobiles en Centre-Val de Loire.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "v0.app",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "KA Auto Épaves",
  description: "Service professionnel d'enlèvement d'épaves automobiles en Centre-Val de Loire",
  url: "https://ka-auto-epaves.vercel.app",
  telephone: "+33 6 63 83 03 03",
  email: "contact@ka-autoepaves.fr",
  areaServed: {
    "@type": "State",
    name: "Centre-Val de Loire",
    containsPlace: [
      { "@type": "City", name: "Bourges" },
      { "@type": "City", name: "Chartres" },
      { "@type": "City", name: "Tours" },
      { "@type": "City", name: "Orléans" },
      { "@type": "City", name: "Blois" },
      { "@type": "City", name: "Châteauroux" },
    ],
  },
  serviceType: "Enlèvement d'épaves automobiles",
  priceRange: "Gratuit",
  openingHours: ["Mo-Fr 08:00-18:00", "Sa 08:00-12:00"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services d'enlèvement",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Enlèvement gratuit d'épaves",
          description: "Service gratuit d'enlèvement de véhicules hors d'usage",
        },
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
