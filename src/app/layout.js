import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import AuthProvider from "@/utils/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// Fonts config
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
  display: "swap",
});

// Base URL configuration
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
  description: description,
  keywords: [
    // Primary brand keywords
    "Ayon Bit",
    "Ayon Bit FullStack Developer",
    "Ayon Bit Portfolio",
    "Ayon Bit React Developer",
    "Ayon Bit Next.js Expert",

    // Professional services
    "FullStack Developer Bangladesh",
    "React Developer Bangladesh",
    "Next.js Developer",
    "MERN Stack Developer",
    "JavaScript Specialist Bangladesh",

    // Technical skills
    "Web Application Development",
    "SEO Friendly Websites",
    "Frontend Developer",
    "Backend Developer",
    "TypeScript Developer",
    "Responsive Web Design",
    "Performance Optimization",
    "Web Development Services",
  ],
  authors: [{ name: siteName, url: baseUrl }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
    other: {
      rel: "mask-icon",
      url: "/safari-pinned-tab.svg",
      color: "#5bbad5",
    },
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: siteName,
    title: `${siteName} - ${professionalTitle}`,
    description: description,
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
  alternates: {
    canonical: baseUrl,
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  verification: {
    google: process.env.GOOGLE_SEARCH_CONSOLE_ID,
    yandex: process.env.YANDEX_VERIFICATION_ID,
    me: baseUrl, // Added rel=me for verification
  },
  category: "technology",
  other: {
    "facebook:page": siteName,
    "fb:app_id": process.env.FACEBOOK_APP_ID, // Add if available
  },
};

// Structured Data for better SEO
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: baseUrl,
  description: description,
  publisher: {
    "@type": "Person",
    name: siteName,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${baseUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  description: description,
  jobTitle: "FullStack Developer",
  url: baseUrl,
  image: `${baseUrl}/images/ayon-bit-profile.jpg`,
  sameAs: [
    "https://github.com/ayonbit",
    "https://linkedin.com/in/ayonbit",
    "https://twitter.com/ayonbit",
    "https://facebook.com/ayonbit",
    "https://instagram.com/ayonbit",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "MongoDB",
    "Web Development",
    "SEO Optimization",
    "Responsive Design",
    "Frontend Development",
    "Backend Development",
    "Database Management",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "FullStack Developer",
    qualifications: "Bachelor's Degree in Computer Science",
  },
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  alternateName: "Ayon Bit Development",
  url: baseUrl,
  logo: `${baseUrl}/images/logo.png`,
  description: `Professional web development services by ${siteName}`,
  sameAs: [
    "https://github.com/ayonbit",
    "https://twitter.com/ayonbit",
    "https://linkedin.com/company/ayonbit",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "BD",
    addressRegion: "Bangladesh",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@ayonbit.me",
    contactType: "Customer Service",
  },
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
        {/* Theme + App Colors */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Site Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/rss.xml"
          title={`${siteName}'s Blog RSS Feed`}
        />

        {/* Enhanced Brand Signals */}
        <meta property="og:site_name" content={siteName} />
        <meta name="application-name" content={siteName} />
        <meta name="apple-mobile-web-app-title" content={siteName} />

        {/* Additional Brand Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Preload Critical Resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          key="website-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          key="person-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
          key="organization-schema"
        />

        {/* Additional Verification Methods */}
        <link rel="me" href={baseUrl} />
        <link rel="me" href="mailto:contact@ayonbit.me" />
      </head>

      <body
        className={`${jetbrainsMono.variable} font-sans antialiased`}
        itemScope
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

        {/* Hidden Brand Name for SEO (optional) */}
        <div
          style={{ display: "none" }}
          aria-hidden="true"
          itemProp="name"
          itemScope
          itemType="https://schema.org/Person"
        >
          <span itemProp="name">{siteName}</span>
          <span itemProp="jobTitle">FullStack Developer</span>
          <span itemProp="description">{description}</span>
        </div>
      </body>
    </html>
  );
}
