import ContactForm from "@/components/ContactForm";
import { FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";

//SEO
export const metadata = {
  title: "Contact Me - Let's Collaborate",
  description:
    "Get in touch with me for collaboration opportunities, project inquiries, or questions. I'm available and ready to work with you!",
  openGraph: {
    title: "Contact Me - Let's Collaborate",
    description:
      "Reach out to discuss your ideas, projects, or opportunities. I'm ready to collaborate and will respond within 24 hours!",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Contact Me",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Me - Let's Collaborate",
    description:
      "Connect with me for collaboration or project inquiries. I will respond within 24 hours.",
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/images/opengraph-image.png`,
  },
};



const Contact = () => {
  const contactInfo = [
    {
      icon: <FaEnvelope className="text-xl md:text-2xl" />,
      title: "Email",
      description: "ayonbit@gmail.com",
      link: "mailto:ayonbit@gmail.com",
    },
    {
      icon: <FaMapMarkedAlt className="text-xl md:text-2xl" />,
      title: "Location",
      description: "Incognito Solution, Bangladesh",
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          {/* Contact Information - Now 50% width on desktop */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-6 md:space-y-8">
              <div className="bg-gradient-to-r from-accent/10 to-transparent p-6 rounded-xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 md:mb-4">
                  Let&apos;s Collaborate
                </h2>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                  I&apos;m available for new projects and would love to hear
                  your ideas. Reach out and I&apos;ll get back to you within 24
                  hours.
                </p>
              </div>

              <ul className="space-y-4 md:space-y-6">
                {contactInfo.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 p-4 hover:bg-white/5 rounded-lg transition-colors duration-200"
                  >
                    <div className="flex-shrink-0 bg-white/5 p-3 rounded-lg text-accent">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white/60 uppercase tracking-wider mb-1">
                        {item.title}
                      </p>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-base sm:text-lg md:text-xl text-white hover:text-accent transition-colors"
                        >
                          {item.description}
                        </a>
                      ) : (
                        <p className="text-base sm:text-lg md:text-xl text-white">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form - Now 50% width on desktop */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white/5 p-6 sm:p-8 rounded-xl border border-white/10 shadow-lg">
              <div className="mb-6 md:mb-8">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
                  Send me a message
                </h3>
                <p className="text-white/60">Fill out the form</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
