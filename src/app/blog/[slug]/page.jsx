import BlogSingleContent from "@/components/Blog/BlogSingleContent";

const getData = async (slug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/blog/${slug}`
  );
  if (!res.ok) {
    throw new Error("Failed to Fetch Blog");
  }
  return res.json();
};

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const post = await getData(slug);

  // Ensure valid image URL
  const imageUrl =
    post.image &&
    (post.image.startsWith("http://") || post.image.startsWith("https://"))
      ? post.image
      : `${process.env.NEXT_PUBLIC_SITE_URL}/images/opengraph-image.png`;

  const description =
    post.desc?.length > 150
      ? post.desc.substring(0, 150) + "..."
      : post.desc || "Default description";

  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      image: imageUrl,
    },
  };
};

const BlogSinglePage = async ({ params }) => {
  const { slug } = params;
  const post = await getData(slug);

  return <BlogSingleContent post={post} />;
};

export default BlogSinglePage;
