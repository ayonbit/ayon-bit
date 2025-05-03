"use client";
import RichTextEditor from "@/components/TextEditor/RichTextEditor.client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resizeImage } from "@/utils/imageResizer";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function WritePage() {
  const { status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/sign-in");
  }, [status, router]);

  const handleChange = async (html) => {
    setPost(html);

    // Extract ALL image sources from HTML content
    const matches = [...html.matchAll(/<img[^>]+src="([^">]+)"/g)];
    const imageUrls = matches.map((match) => match[1]);

    // Resize images to 500x500
    const resizedImages = await Promise.all(
      imageUrls.map(async (imgSrc) => {
        if (imgSrc.startsWith("data:image")) {
          return resizeImage(imgSrc, 500, 500);
        }
        return imgSrc; // For external URLs (if you allow them)
      })
    );

    setImage(resizedImages);
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const handleSubmit = async () => {
    if (!title || !post) {
      toast.error("Title and post content are required!");
      return;
    }

    if (image && image.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    const body = {
      title,
      tags,
      img: image || [],
      desc: post,
    };

    try {
      const res = await fetch("/api/blog/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Post created successfully!");
        router.push("/blog");
      } else {
        toast.error(data.message || "Failed to create post");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred during submission.");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="min-h-screen bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <motion.div
            whileHover={{ y: -8 }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.3, duration: 0.4, ease: "easeIn" },
            }}
          >
            <h1 className="text-4xl font-bold mb-6 text-center">
              Write a New Blog Post
            </h1>

            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write your title"
              className="mb-4 border border-gray-600 bg-[#2a2a35] rounded px-3 py-1 text-white w-full" // Added w-full
            />

            {/* TipTap Editor as main post content */}
            <div className="mb-4">
              <RichTextEditor content={post} onChange={handleChange} />
            </div>

            {/* Tags */}
            <div className="mb-4 mt-4">
              <label className="block mb-2 text-sm font-medium">Tags:</label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInput}
                  className="border border-gray-600 bg-[#2a2a35] rounded px-3 py-1 text-white"
                  placeholder="Press enter to add tag"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/10 px-3 py-1 text-sm rounded flex items-center gap-2"
                  >
                    {tag}
                    <button
                      onClick={() => setTags(tags.filter((t) => t !== tag))}
                      className="text-red-400 hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <Button
                onClick={handleSubmit}
                className="rounded-md hover:text-white"
              >
                Submit Post
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
