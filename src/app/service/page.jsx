import { ServiceCard } from "@/components/ServiceCard";
import { serviceData } from "@/lib/data";

//SEO
export const metadata = {
  title: "Professional Services",
  description:
    "Discover a range of professional services designed to help your business grow. Tailored solutions to meet your unique needs.",
  openGraph: {
    title: "Professional Services",
    description:
      "Explore our professional solutions to drive success for your business. Connect with us today!",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/service`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Professional Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Services",
    description:
      "Explore our professional solutions to drive success for your business. Connect with us today!",
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/images/opengraph-image.png`,
  },
};

const ServicePage = () => {
  return (
    <section className="container mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">My Services</h1>
        <p className="text-md text-muted-foreground max-w-2xl mx-auto">
          Professional solutions designed to meet your business requirements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
        {serviceData.map((service) => (
          <ServiceCard
            key={service.slug}
            service={service}
            className="hover:scale-[1.02] transition-transform"
          />
        ))}
      </div>
    </section>
  );
};

export default ServicePage;
