import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import AuthProvider from "@/utils/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
//fonts config
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Ayon Bit - FullStack Developer",
    template: "%s | Ayon Bit",
  },
  description:
    "Ayon Bit is a Full-Stack Developer specializing in React, Next.js, Node.js, and MongoDB. Building fast, scalable, and user-friendly web applications.",
  keywords: [
    "Ayon Bit",
    "Bangladeshi Developer",
    "Web Developer in Bangladesh",
    "Web Developer",
    "Web Designer",
    "Bangladeshi Full-Stack Developer",
    "FullStack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Freelance Web Developer",
    "Modern Web Developer",
    "Frontend Developer",
    "MERN Stack Developer",
    "Responsive Web Designer",
    "SEO Friendly Web Developer",
    "Portfolio Website Developer",
  ],
  authors: [{ name: "Ayon Bit", url: "https://ayonbit.me" }],
  creator: "Ayon Bit",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/favicon.ico"],
  },

  openGraph: {
    title: "Ayon Bit - FullStack Developer",
    description:
      "Ayon Bit builds fast, scalable, and modern web applications with React, Next.js, and Node.js. Delivering results you can trust.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://ayonbit.me",
    siteName: "Ayon Bit",
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_SITE_URL || "https://ayonbit.me"
        }/images/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Ayon Bit - FullStack Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayon Bit - FullStack Developer",
    description:
      "Building responsive and modern web applications using the latest technologies like React, Next.js, and Node.js.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/opengraph-image.png`],
    creator: "@AyonBit",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://ayonbit.me",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
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
        {/* Vercel Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
