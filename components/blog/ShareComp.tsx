import { Copy, Share2 } from 'lucide-react';
import React from 'react'
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaReddit, FaWhatsapp } from 'react-icons/fa';
import { LiaLinkedinIn } from 'react-icons/lia';
import { notify } from "@/libs/notify";

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
  const shareReddit = () => {
  share(
    `https://reddit.com/submit?url=${encodeURIComponent(
      currentUrl
    )}&title=${encodeURIComponent(blogTitle)}`
  );
};

 const shareWA = () => {
  share(
    `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${blogTitle}\n\n${currentUrl}`
    )}`
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
    try {
      await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogSlug}`);
      notify.success("Link copied", "The blog link has been copied to your clipboard.");
    } catch {
      notify.error("Copy failed", "We could not copy the link right now.");
    }
  };
  return (
     <div className=" pt-6 px-5">
  <div className="mb-4 flex items-center gap-2">
    <Share2 className="text-[#79570E]" size={20} />
    <h3 className="font-semibold text-lg">Share this post</h3>
  </div>

  <div className="flex flex-wrap gap-3">
    <button
      onClick={shareFacebook}
      className="flex items-center gap-2 rounded-md border px-4 py-2 transition hover:bg-blue-600 hover:text-white"
    >
      <FaFacebook size={18} />
    </button>

    <button
      onClick={shareX}
      className="flex items-center gap-2 rounded-md border px-4 py-2 transition hover:bg-black hover:text-white"
    >
      <BsTwitterX size={18} />
    </button>

    <button
      onClick={shareLinkedIn}
      className="flex items-center gap-2 rounded-md border px-4 py-2 transition hover:bg-blue-700 hover:text-white"
    >
      <LiaLinkedinIn size={18} />
    </button>

     <button
      onClick={shareWA}
      className="flex items-center gap-2 rounded-md border px-4 py-2 transition hover:bg-green-500 hover:text-white"
    >
      <FaWhatsapp size={18} />
    </button>
     <button
      onClick={shareReddit}
      className="flex items-center gap-2 rounded-md border px-4 py-2 transition hover:bg-green-500 hover:text-white"
    >
      <FaReddit size={18} />
    </button>

    <button
      onClick={copyLink}
      className="flex items-center gap-2 rounded-md border px-4 py-2 transition hover:bg-gray-200"
    >
      <Copy  size={18} />
    </button>
  </div>
</div>
  )
}

export default ShareComp