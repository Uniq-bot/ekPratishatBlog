import { Copy, Share2 } from 'lucide-react';
import React from 'react'
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { LiaLinkedinIn } from 'react-icons/lia';

const ShareComp = ({ blogTitle, blogSlug }: { blogTitle: string; blogSlug: string }) => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

     const share = (url: string) => {
    window.open(url, "_blank", "width=600,height=600");
  };

  const shareFacebook = () => {
    share(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl,
      )}`,
    );
  };

  const shareX = () => {
    share(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl,
      )}&text=${encodeURIComponent(blogTitle)}`,
    );
  };

  const shareLinkedIn = () => {
    share(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl,
      )}`,
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(currentUrl);
    alert("Link copied!");
  };
  return (
     <div className="mt-12 border-t pt-6">
  <div className="mb-4 flex items-center gap-2">
    <Share2 className="text-[#79570E]" size={20} />
    <h3 className="font-semibold text-lg">Share this article</h3>
  </div>

  <div className="flex flex-wrap gap-3">
    <button
      onClick={shareFacebook}
      className="flex items-center gap-2 rounded-md border px-4 py-2 transition hover:bg-blue-600 hover:text-white"
    >
      <FaFacebook size={18} />
      Facebook
    </button>

    <button
      onClick={shareX}
      className="flex items-center gap-2 rounded-md border px-4 py-2 transition hover:bg-black hover:text-white"
    >
      <BsTwitterX size={18} />
      X
    </button>

    <button
      onClick={shareLinkedIn}
      className="flex items-center gap-2 rounded-md border px-4 py-2 transition hover:bg-blue-700 hover:text-white"
    >
      <LiaLinkedinIn size={18} />
      LinkedIn
    </button>

    <button
      onClick={copyLink}
      className="flex items-center gap-2 rounded-md border px-4 py-2 transition hover:bg-gray-200"
    >
      <Copy  size={18} />
      Copy Link
    </button>
  </div>
</div>
  )
}

export default ShareComp