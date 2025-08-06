"use client";
import RichTextEditor from "@/components/TextEditor/RichTextEditor.client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { debounce } from "@/utils/debounce";
import { resizeImage } from "@/utils/imageResizer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

const MAX_IMAGES = 5;
const IMAGE_SIZE = 500;
const AUTO_SAVE_INTERVAL = 10000;
const TITLE_MAX_LENGTH = 150;
const TAG_MAX_LENGTH = 20;
const MAX_TAGS = 5;

export default function WritePage() {
  const { status } = useSession();
  const router = useRouter();
  const autoSaveTimer = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingImages, setIsProcessingImages] = useState(false);

  const [form, setForm] = useState({
    title: "",
    post: "",
    tags: [],
    images: null,
  });
  const [tagInput, setTagInput] = useState("");

  // Load draft from localStorage
  useEffect(() => {
    if (status === "authenticated") {
      const savedDraft = localStorage.getItem("blogDraft");
      if (savedDraft) {
        setForm(JSON.parse(savedDraft));
      }
    }
  }, [status]);

  // Auto-save draft
  useEffect(() => {
    if (status === "authenticated") {
      autoSaveTimer.current = setInterval(() => {
        if (form.title || form.post) {
          localStorage.setItem("blogDraft", JSON.stringify(form));
        }
      }, AUTO_SAVE_INTERVAL);
    }

    return () => clearInterval(autoSaveTimer.current);
  }, [form, status]);

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in?callbackUrl=/write");
    }
  }, [status, router]);

  // Debounced editor change handler
  const handleEditorChange = useCallback(
    debounce(async (html) => {
      if (html === form.post) return;

      setForm((prev) => ({ ...prev, post: html }));

      const matches = [...html.matchAll(/<img[^>]+src="([^">]+)"/g)];
      const imageUrls = matches.map((match) => match[1]);

      if (imageUrls.length > MAX_IMAGES) {
        toast.error(`Maximum ${MAX_IMAGES} images allowed`);
        return;
      }

      setIsProcessingImages(true);
      try {
        const resizedImages = await Promise.all(
          imageUrls.map(async (imgSrc) => {
            return imgSrc.startsWith("data:image")
              ? await resizeImage(imgSrc, IMAGE_SIZE, IMAGE_SIZE)
              : imgSrc;
          })
        );
        setForm((prev) => ({ ...prev, images: resizedImages }));
      } catch (error) {
        toast.error("Failed to process images");
      } finally {
        setIsProcessingImages(false);
      }
    }, 500),
    [form.post]
  );

  // Tag management
  const handleTagInput = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (form.tags.length >= MAX_TAGS) {
        toast.error(`Maximum ${MAX_TAGS} tags allowed`);
        return;
      }
      if (tagInput.length > TAG_MAX_LENGTH) {
        toast.error(`Tags must be less than ${TAG_MAX_LENGTH} characters`);
        return;
      }
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
    if (!form.title.trim()) {
      toast.error("Title is required!");
      return;
    }
    if (form.title.length > TITLE_MAX_LENGTH) {
      toast.error(`Title must be less than ${TITLE_MAX_LENGTH} characters`);
      return;
    }
    if (!form.post.trim()) {
      toast.error("Content is required!");
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

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      // Clear draft on successful submission
      localStorage.removeItem("blogDraft");

      toast.success("Post published successfully!");
      router.push(`/blog/${data.slug || ""}`);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.message || "Failed to publish post");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoized tag components
  const tagComponents = useMemo(
    () =>
      form.tags.map((tag) => (
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
      )),
    [form.tags, removeTag]
  );

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="min-h-screen bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6">
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
                <span className="text-gray-400 ml-2 text-sm">
                  {form.title.length}/{TITLE_MAX_LENGTH}
                </span>
              </label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Catchy title here..."
                className="w-full bg-gray-800 border-gray-700 focus:border-accent"
                maxLength={TITLE_MAX_LENGTH}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Content</label>
              <RichTextEditor
                content={form.post}
                onChange={handleEditorChange}
                className="min-h-[300px]"
              />
              {isProcessingImages && (
                <div className="text-sm text-gray-400 mt-2">
                  Processing images...
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Tags
                <span className="text-gray-400 ml-2 text-sm">
                  {form.tags.length}/{MAX_TAGS}
                </span>
              </label>
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInput}
                placeholder="Type and press Enter to add tags"
                className="w-full bg-gray-800 border-gray-700"
                maxLength={TAG_MAX_LENGTH}
              />
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">{tagComponents}</div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-700 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !form.title || !form.post}
                className="px-8 py-2 bg-accent hover:bg-accent/90"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </Button>
              {(form.title || form.post) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    localStorage.setItem("blogDraft", JSON.stringify(form));
                    toast.success("Draft saved locally");
                  }}
                  className="px-8 py-2"
                >
                  Save Draft
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
