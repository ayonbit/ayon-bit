import PageTransition from "@/components/PageTransition";
import { ServiceHeroSection } from "@/components/ServiceHero";
import ServiceSlug from "@/components/ServiceSlug";
import { serviceData } from "@/lib/data";
import { notFound } from "next/navigation";

//DYNAMIC SEO
export async function generateMetadata({ params }) {
  const { slug } = params;
  const service = serviceData.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found ",
      description: "The service you are looking for does not exist.",
    };
  }

  return {
    title: `${service.category} `,
    description: service.description[0], // first description point
    openGraph: {
      title: `${service.category} | My Services`,
      description: service.description[0],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/service/${slug}`,
      images: [
        {
          url: service.image?.startsWith("http")
            ? service.image
            : `${process.env.NEXT_PUBLIC_SITE_URL}${
                service.image || "/images/opengraph-image.png"
              }`,
          width: 1200,
          height: 630,
          alt: service.category,
        },
      ],
    },
  };
}

const ServiceSlugPage = ({ params }) => {
  const { slug } = params;
  const service = serviceData.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <PageTransition>
      <section className="min-h-screen flex flex-col justify-center py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <ServiceHeroSection />

          <ServiceSlug service={service} key={service.slug} />
        </div>
      </section>
    </PageTransition>
  );
};

export default ServiceSlugPage;
