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

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ayonbit.me"
  ),
  title: {
    default: "Ayon Bit - FullStack Developer | React & Next.js Specialist",
    template: "%s | Ayon Bit - FullStack Developer",
  },
  description:
    "Professional Full-Stack Developer specializing in React, Next.js, Node.js, and MongoDB. Building fast, scalable, and SEO-optimized web applications with modern technologies.",
  keywords: [
    "Ayon Bit",
    "FullStack Developer Bangladesh",
    "React Developer",
    "Next.js Expert",
    "MERN Stack Developer",
    "Web Application Development",
    "SEO Friendly Websites",
    "Frontend Developer Bangladesh",
    "Backend Developer",
    "JavaScript Specialist",
    "TypeScript Developer",
    "Responsive Web Design",
    "Performance Optimization",
    "Web Development Services",
  ],
  authors: [{ name: "Ayon Bit", url: "https://ayonbit.me" }],
  creator: "Ayon Bit",
  publisher: "Ayon Bit",
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
    title: "Ayon Bit - FullStack Developer | React & Next.js Specialist",
    description:
      "Professional Full-Stack Developer building fast, scalable, and SEO-optimized web applications with React, Next.js, and Node.js.",
    url: "/",
    siteName: "Ayon Bit - Portfolio",
    images: [
      {
        url: "/images/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Ayon Bit - FullStack Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayon Bit - FullStack Developer",
    description:
      "Building responsive and modern web applications using React, Next.js, and Node.js with focus on performance and SEO.",
    creator: "@AyonBit",
    images: ["/images/opengraph-image.png"],
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.GOOGLE_SEARCH_CONSOLE_ID,
    yandex: process.env.YANDEX_VERIFICATION_ID,
  },
  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/rss.xml"
          title="Ayon Bit's Blog RSS Feed"
        />
      </head>
      <body className={`${jetbrainsMono.variable} font-sans antialiased`}>
        <AuthProvider>
          <Toaster
            reverseOrder={true}
            position="top-right"
            toastOptions={{ duration: 4000 }}
          />
          <StairTransition />
          <Header />
          <PageTransition>{children}</PageTransition>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ayon Bit",
              jobTitle: "FullStack Developer",
              url: "https://ayonbit.me",
              sameAs: [
                "https://github.com/ayonbit",
                "https://facebook.com/ayonbit",
                "https://twitter.com/ayonbit",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
