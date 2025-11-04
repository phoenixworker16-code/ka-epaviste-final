import type React from "react"
import type { Metadata } from "next"
// import { GeistSans } from "geist/font/sans"
// import { GeistMono } from "geist/font/mono"
// import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "KA Auto Épaves - Enlèvement gratuit d'épaves automobiles dans le Loir-et-Cher",
    template: "%s | KA Auto Épaves",
  },
  description:
    "Service professionnel d'enlèvement d'épaves automobiles dans le Loir-et-Cher. Intervention rapide et gratuite. Démarches administratives incluses.",
  keywords: [
    "épaves automobiles",
    "enlèvement gratuit",
    "Loir-et-Cher",
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
  metadataBase: new URL("https://ka-epaviste-final.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ka-epaviste-final.vercel.app",
    siteName: "KA Auto Épaves",
    title: "KA Auto Épaves - Enlèvement gratuit d'épaves automobiles",
    description:
      "Service professionnel d'enlèvement d'épaves automobiles dans le Loir-et-Cher. Intervention rapide et gratuite.",
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
    description: "Service professionnel d'enlèvement d'épaves automobiles dans le Loir-et-Cher.",
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
  description: "Service professionnel d'enlèvement d'épaves automobiles dans le Loir-et-Cher",
  url: "https://ka-epaviste-final.vercel.app",
  telephone: "+33 6 63 83 03 03",
  email: "contact@ka-autoepaves.fr",
  areaServed: {
    "@type": "State",
    name: "Loir-et-Cher",
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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');`,
          }}
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body className="font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
