import BlogSingleContent from "@/components/Blog/BlogSingleContent";
import BlogSingleLoading from "@/components/Blog/BlogSingleLoading"; // Create a loading skeleton
import { Suspense } from "react";

const getData = async (slug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/blog/${slug}`,
    {
      next: { revalidate: 3600 }, // Revalidate every 60 seconds
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch blog post: ${res.status}`);
  }

  return res.json();
};

export const generateMetadata = async ({ params }) => {
  const { slug } = params;

  try {
    const post = await getData(slug);

    const imageUrl = post.image?.match(/^https?:\/\//)
      ? post.image
      : `${process.env.NEXT_PUBLIC_SITE_URL}/images/opengraph-image.png`;

    const description =
      post.desc?.length > 160
        ? `${post.desc.substring(0, 160)}...`
        : post.desc ||
          "Read this insightful article on technology, design, and business.";

    return {
      title: `${post.title} | My Blog`,
      description,
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
      },
      openGraph: {
        title: post.title,
        description,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
        type: "article",
        publishedTime: post.createdAt,
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
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    return {
      title: "Blog Post",
      description: "Read this insightful article",
    };
  }
};

const BlogSinglePage = async ({ params }) => {
  const { slug } = params;

  return (
    <Suspense fallback={<BlogSingleLoading />}>
      <BlogSinglePageContent slug={slug} />
    </Suspense>
  );
};

async function BlogSinglePageContent({ slug }) {
  try {
    const post = await getData(slug);
    return <BlogSingleContent post={post} />;
  } catch (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Failed to load blog post
        </h2>
        <p className="text-gray-600">
          We couldn't load the requested blog post. Please try again later.
        </p>
      </div>
    );
  }
}

export default BlogSinglePage;
