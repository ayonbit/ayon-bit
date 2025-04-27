"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

const Comments = ({ postSlug, onCommentCountChange }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postSlug) return;
    (async () => {
      const res = await fetch(`/api/comments?slug=${postSlug}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        console.error("Failed to fetch comments:", await res.text());
        toast.error("Failed to load comments");
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setComments(data);
        onCommentCountChange?.(data.length);
      } else {
        console.error("Invalid comments response:", data);
        toast.error("Something went wrong");
      }
    })();
  }, [postSlug, onCommentCountChange]);

  const handleAddComment = async () => {
    if (!input.trim()) return;
    setLoading(true);

    if (!session) {
      toast.error("Please sign in with Google to post a comment.");
      setTimeout(() => signIn("google", { callbackUrl: window.location.href }));
      setLoading(false);
      return;
    }

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ desc: input, postSlug }),
    });

    if (!res.ok) {
      console.error("Failed to post comment:", await res.text());
      toast.error("Failed to post comment");
      setLoading(false);
      return;
    }

    const saved = await res.json();
    setComments((prev) => [
      {
        ...saved,
        user: {
          name: session?.user?.name ?? "Guest User",
          image: session?.user?.image,
        },
      },
      ...prev,
    ]);
    setInput("");
    toast.success("Comment posted!");
    setLoading(false);
  };

  return (
    <div className="mt-12 pt-6 border-t border-white/10 text-white space-y-4">
      <div className="flex flex-col gap-2 ">
        <textarea
          className="bg-[#2a2a35] text-white/90 p-3 rounded-md"
          placeholder="Write a comment..."
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          onClick={handleAddComment}
          className="self-end px-4 py-2 rounded-md transition"
          disabled={loading}
        >
          {loading ? "Posting..." : "Comment"}
        </Button>
      </div>

      <div className="space-y-4 w-1/2">
        {comments.map((c) => (
          <div
            key={c.id}
            className="transition-colors p-4 rounded-2xl shadow-sm space-y-3"
          >
            <div className="flex items-start gap-4">
              {c.user?.image ? (
                <Image
                  src={c.user.image}
                  alt={c.user?.name || "User avatar"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover w-10 h-10"
                />
              ) : (
                <div className="w-10 h-10 bg-white/10 text-white/70 flex items-center justify-center rounded-full text-sm font-semibold">
                  {c.user?.name?.[0] || "G"}
                </div>
              )}

              <div className="flex-1">
                <div className="flex flex-col">
                  <h4 className="font-semibold text-white">
                    {c.user?.name ?? "Guest User"}
                  </h4>
                  <span className="text-xs text-white/40 mt-1">
                    {format(new Date(c.createdAt), "MMM dd yyyy")}
                  </span>
                </div>
                <p className="text-white/80 mt-6 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
