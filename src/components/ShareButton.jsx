"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  FaFacebookF,
  FaLink,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

export default function ShareButtons({ title }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  // Build the full current URL safely on the client
  const currentUrl = useMemo(() => {
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== "undefined" ? window.location.origin : "");
    const qs = searchParams?.toString();
    return `${origin}${pathname}${qs ? `?${qs}` : ""}`;
  }, [pathname, searchParams]);

  const shareUrl = encodeURIComponent(currentUrl);
  const shareText = encodeURIComponent(title || "Check this out!");

  // Circle button style
  const circleBtn =
    "flex items-center justify-center w-10 h-10 rounded-full shadow hover:opacity-80 transition text-white";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // hide after 2s
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {/* Facebook */}
        <a
          aria-label="Share on Facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${circleBtn} bg-blue-600`}
        >
          <FaFacebookF size={16} />
        </a>

        {/* X / Twitter */}
        <a
          aria-label="Share on X (Twitter)"
          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${circleBtn} bg-sky-500`}
        >
          <FaXTwitter size={16} />
        </a>

        {/* LinkedIn */}
        <a
          aria-label="Share on LinkedIn"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${circleBtn} bg-blue-800`}
        >
          <FaLinkedinIn size={16} />
        </a>

        {/* WhatsApp (optional) */}

        <a
          aria-label="Share on WhatsApp"
          href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${circleBtn} bg-green-500`}
        >
          <FaWhatsapp size={16} />
        </a>

        {/* Copy link */}
        <button
          type="button"
          onClick={handleCopy}
          className={`${circleBtn} bg-gray-400`}
        >
          <FaLink size={16} />
        </button>
      </div>

      {/* Copy message */}
      {copied && (
        <span className="text-sm text-green-600 animate-fadeIn">
          Link copied!
        </span>
      )}
    </div>
  );
}
