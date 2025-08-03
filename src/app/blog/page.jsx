import BlogPageContent from "@/components/Blog/BlogPageContent";

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blog`);
  if (!res.ok) {
    throw new Error("Failed to Fetch Blog");
  }
  return res.json();
};

// SEO
export const metadata = {
  title: "My Latest Blog",
  description:
    "Explore insightful articles on technology, design, and business.",
  openGraph: {
    title: "My Latest Blog | Ayon Bit",
    description:
      "Discover curated content and stay updated with the latest trends.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "My Latest Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Latest Blog | Ayon Bit",
    description:
      "Stay updated with the latest trends and insights in tech, design, and business.",
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/images/opengraph-image.png`,
  },
};

const BlogPage = async () => {
  const allPosts = await getData();
  const initialPosts = allPosts;

  return (
    <>
      <header className="text-center mb-10 lg:mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-4 sm:mb-6">
          My Latest Blog
        </h1>
        <p className="max-w-3xl mx-auto text-white/60 text-sm sm:text-base md:text-lg">
          Discover insightful articles and stay updated with the latest trends
          in technology, design, and business. Explore our collection of curated
          content.
        </p>
      </header>

      <BlogPageContent
        initialPosts={initialPosts}
        totalPosts={allPosts.length}
      />
    </>
  );
};

export default BlogPage;
