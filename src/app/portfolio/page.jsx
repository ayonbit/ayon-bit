import PortfolioCard from "@/components/PortfolioCard";
import { projectData } from "@/lib/data";

//SEO
export async function generateMetadata() {
  const firstProject = projectData[0];

  return {
    title: `Portfolio | ${firstProject.title}`,
    description: firstProject.description,
    openGraph: {
      title: `Portfolio | ${firstProject.title}`,
      description: firstProject.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio`,
      images: [
        {
          url: firstProject.image?.startsWith("http")
            ? firstProject.image
            : `${process.env.NEXT_PUBLIC_SITE_URL}${
                firstProject.image || "/images/opengraph-image.png"
              }`,
          width: 1200,
          height: 630,
          alt: firstProject.title || "Portfolio Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Portfolio | ${firstProject.title}`,
      description: firstProject.description,
      image: firstProject.image?.startsWith("http")
        ? firstProject.image
        : `${process.env.NEXT_PUBLIC_SITE_URL}${
            firstProject.image || "/images/opengraph-image.png"
          }`,
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
