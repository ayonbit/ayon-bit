import PortfolioCard from "@/components/PortfolioCard";

//SEO
export async function generateMetadata() {
  return {
    title: "Portfolio - My Creative Projects",
    description:
      "Explore my portfolio showcasing projects in web development, design, and creative work.",
    openGraph: {
      title: "Portfolio | My Creative Projects",
      description:
        "Explore my portfolio showcasing projects in web development, design, and creative work.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: "Portfolio Projects",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Portfolio | My Creative Projects",
      description:
        "Explore my portfolio showcasing projects in web development, design, and creative work.",
      image: `${process.env.NEXT_PUBLIC_SITE_URL}/images/opengraph-image.png`,
    },
  };
}

const PortfolioPage = () => {
  return (
    <section className="container mx-auto">
      <PortfolioCard />
    </section>
  );
};

export default PortfolioPage;
