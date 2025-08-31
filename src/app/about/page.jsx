import { AboutCard } from "@/components/AboutCard";

export const metadata = {
  title: "About Me",
  description:
    "Learn more about Ayon Bit's experience, skills, education, and journey as a Full-Stack Developer.",
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
  openGraph: {
    title: "About | Ayon Bit",
    description:
      "Discover Ayon Bit's professional background, skills, and experience.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
    siteName: "Ayon Bit",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Ayon Bit About Page",
      },
    ],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Ayon Bit",
    description:
      "Discover Ayon Bit's professional background, skills, and experience.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/opengraph-image.png`],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
  },

  robots: {
    index: true,
    follow: true,
  },
};
const AboutPage = () => {
  return (
    <main className="py-10 md:py-10">
      <section className="container mx-auto px-4">
        <AboutCard />
      </section>
    </main>
  );
};

export default AboutPage;
