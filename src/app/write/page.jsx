"use client";
import RichTextEditor from "@/components/TextEditor/RichTextEditor.client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resizeImage } from "@/utils/imageResizer";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const MAX_IMAGES = 5;
const IMAGE_SIZE = 500;

export default function WritePage() {
  const { status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [form, setForm] = useState({
    title: "",
    post: "",
    tags: [],
    images: null,
  });
  const [tagInput, setTagInput] = useState("");

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in?callbackUrl=/write");
    }
  }, [status, router]);

  // Handle editor content changes with debouncing
  const handleEditorChange = useCallback(async (html) => {
    setForm((prev) => ({ ...prev, post: html }));

    // Extract and resize images only if content changed significantly
    const matches = [...html.matchAll(/<img[^>]+src="([^">]+)"/g)];
    const imageUrls = matches.map((match) => match[1]);

    if (imageUrls.length > MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const resizedImages = await Promise.all(
      imageUrls.map(async (imgSrc) => {
        return imgSrc.startsWith("data:image")
          ? await resizeImage(imgSrc, IMAGE_SIZE, IMAGE_SIZE)
          : imgSrc;
      })
    );

    setForm((prev) => ({ ...prev, images: resizedImages }));
  }, []);

  // Tag management
  const handleTagInput = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!form.tags.includes(tagInput.trim())) {
        setForm((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
        setTagInput("");
      }
    }
  };

  const removeTag = useCallback((tagToRemove) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  }, []);

  // Form submission
  const handleSubmit = async () => {
    if (!form.title.trim() || !form.post.trim()) {
      toast.error("Title and content are required!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/blog/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          tags: form.tags,
          img: form.images || [],
          desc: form.post,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Submission failed");

      toast.success("Post published successfully!");
      router.push(`/blog/${data.slug || ""}`);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.message || "Failed to publish post");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  // Main editor UI
  if (status === "authenticated") {
    return (
      <div className="min-h-screen bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <header className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Write a New Post</h1>
              <p className="text-gray-400">
                Share your knowledge with the community
              </p>
            </header>

            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block mb-2 font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Catchy title here..."
                  className="w-full bg-gray-800 border-gray-700 focus:border-accent"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Content</label>
                <RichTextEditor
                  content={form.post}
                  onChange={handleEditorChange}
                  className="min-h-[300px]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Tags</label>
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInput}
                  placeholder="Type and press Enter to add tags"
                  className="w-full bg-gray-800 border-gray-700"
                />
                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {form.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-red-400 hover:text-red-300"
                          aria-label={`Remove tag ${tag}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-700">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !form.title || !form.post}
                  className="w-full sm:w-auto px-8 py-2 bg-accent hover:bg-accent/90"
                >
                  {isSubmitting ? "Publishing..." : "Publish Post"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
