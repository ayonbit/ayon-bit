"use client";
import BlogCard from "@/components/Blog/BlogCard";
import Pagination from "@/components/Pagination";
import { useCallback, useMemo, useState } from "react";

const BlogPageContent = ({ initialPosts, totalPosts }) => {
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return initialPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, initialPosts]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="mx-auto px-4 sm:px-6 ">
      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {currentPosts.map((item, index) => (
          <BlogCard key={item.id || index} {...item} index={index} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={totalPosts}
        itemsPerPage={postsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        className="mt-12"
      />
    </div>
  );
};

export default BlogPageContent;
