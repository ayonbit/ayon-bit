"use client";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";

// Safe extraction and sanitization of the first <p> or <h*> tag
const extractFirstParagraphOrHeading = (html) => {
  if (!html) return "<p>No content available</p>";

  try {
    // Configure DOMPurify with strict rules
    const cleanHtml = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "a",
        "strong",
        "em",
        "br",
      ],
      ALLOWED_ATTR: ["href", "target", "rel", "class"],
      FORBID_ATTR: ["style", "onclick", "onerror"],
      RETURN_DOM: false,
      RETURN_DOM_FRAGMENT: false,
      RETURN_DOM_IMPORT: false,
    });

    // Extract first paragraph or heading
    const match = cleanHtml.match(/<(p|h[1-6])[^>]*>(.*?)<\/\1>/i);
    const extractedContent = match ? match[0] : "<p>Read more...</p>";

    // Truncate if too long (optional)
    return extractedContent.length > 200
      ? extractedContent.substring(0, 200) + "..."
      : extractedContent;
  } catch (error) {
    console.error("Content sanitization failed:", error);
    return "<p>Content preview unavailable</p>";
  }
};

const BlogCard = ({
  id,
  img,
  tags,
  title,
  desc,
  user,
  createdAt,
  updatedAt,
  className,
  slug,
  index,
}) => {
  const firstDescElement = extractFirstParagraphOrHeading(desc);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className={`flex flex-col justify-between gap-6 group overflow-hidden shadow-lg rounded-xl bg-neutral-100/5 hover:bg-neutral-100/10 transition-all duration-300 border border-white/5 dark:bg-gray-800/50 dark:border-gray-700 dark:hover:bg-gray-700/50 ${className}`}
    >
      <Link
        href={`/blog/${slug}`}
        prefetch={false}
        aria-label={`Read ${title}`}
        className="flex flex-col h-full"
      >
        {/* Image Container */}
        <div className="relative w-full h-48 sm:h-60">
          {img?.[0] ? (
            <Image
              src={img[0]}
              alt={`Featured image for ${title}`}
              fill
              className="object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,..."
            />
          ) : (
            <div className="w-full h-full bg-gray-700/50 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}

          {tags?.[0] && (
            <span className="absolute top-3 right-3 font-medium bg-accent text-black dark:text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full z-10 backdrop-blur-sm">
              {tags[0]}
            </span>
          )}
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-grow p-4 sm:p-5">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {title}
          </h3>

          {/* Safe Content Preview */}
          <div
            className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-3 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: firstDescElement }}
            aria-label="Blog post preview"
          />

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 border-t border-accent pt-3 sm:pt-4 mt-auto">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <Image
                  src={user?.image || "/default-user.png"}
                  alt={user?.name || "Author"}
                  fill
                  className="rounded-full object-cover"
                  sizes="(max-width: 640px) 40px, 50px"
                />
              </div>
              <div>
                <p className="font-medium sm:font-semibold text-sm">
                  By {user?.name || "Anonymous"}
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  {user?.title || "Blogger"}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-400">
                {format(new Date(createdAt), "MMM dd yyyy")}
              </span>
              <BsArrowDownRight
                className="text-gray-400 group-hover:text-accent transition-colors"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
