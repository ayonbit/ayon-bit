"use client";
import Comments from "@/components/Blog/Comments";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { FaCalendar, FaComments, FaEye } from "react-icons/fa";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const ShareIcons = () => (
  <div className="flex gap-4 text-white/60 text-xl">
    <span className="hover:text-white cursor-pointer">
      <FaLinkedinIn />
    </span>
    <span className="hover:text-white cursor-pointer">
      <FaXTwitter />
    </span>
    <span className="hover:text-white cursor-pointer">
      <FaFacebookF />
    </span>
  </div>
);

const BlogSingleContent = ({ post }) => {
  const [commentCount, setCommentCount] = useState(0);

  // Sanitize and prepare the HTML content
  const sanitizedContent = useMemo(() => {
    if (!post?.desc) return "";

    // Configure DOMPurify
    const clean = DOMPurify.sanitize(post.desc, {
      ADD_TAGS: ["iframe"], // Allow iframes if needed
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
      FORBID_TAGS: ["style", "script"],
      FORBID_ATTR: ["onerror", "onload"],
    });

    // Additional processing if needed
    return clean;
  }, [post?.desc]);

  const handleCommentCountChange = useCallback((newCount) => {
    setCommentCount(newCount);
  }, []);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
    >
      <section className="container mx-auto px-4 py-12 text-white">
        {/* Title and Meta */}
        <div className="mb-6 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-4xl">
            {post?.title}
          </h1>

          <div className="flex flex-wrap items-center text-sm text-white/60 gap-4">
            <div className="flex items-center gap-2">
              <Image
                src={post?.user.image}
                alt={post.title}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-white font-semibold">{post.user.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaCalendar size={12} />
              <span>{format(new Date(post?.createdAt), "MMM dd yyyy")}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaComments size={12} />
              <span>{commentCount} comments</span>
            </div>
            <div className="flex items-center gap-1">
              <FaEye size={12} />
              <span>{post?.views}</span>
            </div>
            {post?.tags?.[0] && (
              <Button className="ml-auto font-normal">{post?.tags[0]}</Button>
            )}
          </div>
        </div>

        <div
          className="prose prose-invert max-w-none text-white/90 text-lg leading-relaxed mb-6
            prose-h1:text-4xl prose-h1:font-bold prose-h1:my-6
            prose-h2:text-3xl prose-h2:font-semibold prose-h2:my-5
            prose-h3:text-2xl prose-h3:font-semibold prose-h3:my-4
            prose-p:my-4 prose-p:text-base
            prose-img:rounded-lg prose-img:mx-auto prose-img:my-6 prose-img:max-w-full prose-img:h-auto
            prose-table:w-full prose-th:bg-gray-700 prose-td:border-t prose-td:border-gray-600
            prose-code:bg-gray-700 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mt-12 pt-6 border-t border-white/10">
          <div className="w-full sm:w-auto">
            <p className="mb-2 font-medium">Popular Tags:</p>
            <div className="flex flex-wrap gap-2">
              {post?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/10 px-3 py-1 text-sm rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full sm:w-auto mt-4 sm:mt-0">
            <ShareIcons />
          </div>
        </div>

        <Comments
          postSlug={post.slug}
          onCommentCountChange={handleCommentCountChange}
        />
      </section>
    </motion.div>
  );
};

export default BlogSingleContent;
