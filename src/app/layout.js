// src/app/layout.js
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import AuthProvider from "@/utils/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// Load custom font
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
  display: "swap",
});

// Base metadata
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ayonbit.me";
const siteName = "Ayon Bit";
const professionalTitle = "FullStack Developer | React & Next.js Specialist";
const description =
  "Professional Full-Stack Developer specializing in React, Next.js, Node.js, and MongoDB. Building fast, scalable, and SEO-optimized web applications with modern technologies.";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteName} - ${professionalTitle}`,
    template: `%s | ${siteName} - FullStack Developer`,
  },
  description,
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: baseUrl,
    siteName,
    title: `${siteName} - ${professionalTitle}`,
    description,
    images: [
      {
        url: "/images/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${siteName} - FullStack Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - FullStack Developer`,
    description:
      "Building responsive and modern web applications using React, Next.js, and Node.js with focus on performance and SEO.",
    creator: "@AyonBit",
    site: "@AyonBit",
    images: ["/images/opengraph-image.png"],
  },
};

// Structured data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: siteName,
      url: baseUrl,
      description,
    },
    {
      "@type": "Person",
      name: siteName,
      jobTitle: "FullStack Developer",
      url: baseUrl,
      image: `${baseUrl}/assets/updateprofile.png`,
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <head>
        {/*  Manifest & Icon Links for PWA */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={siteName} />
        <meta name="application-name" content={siteName} />
        <meta name="msapplication-TileColor" content="#000000" />

        {/*  Icons for all devices */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/icons/icon-512x512.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/*  Canonical URL */}
        <link rel="canonical" href={baseUrl} />

        {/*  Preload Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

      <body
        className={`${jetbrainsMono.variable} font-sans antialiased`}
        itemScope={true}
        itemType="https://schema.org/WebPage"
        itemID={baseUrl}
      >
        <AuthProvider>
          <Toaster
            reverseOrder={true}
            position="top-right"
            toastOptions={{
              duration: 4000,
              className: "font-mono text-sm",
            }}
          />
          <StairTransition />
          <Header />
          <PageTransition>{children}</PageTransition>
        </AuthProvider>

        <Analytics />
        <SpeedInsights />

        {/*  Structured data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
