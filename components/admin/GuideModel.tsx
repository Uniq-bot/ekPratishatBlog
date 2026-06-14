"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Type, Pilcrow, List, Image, Quote, Info, Minus } from "lucide-react";

const GuideModel = ({
  showModel,
  setShowModel,
}: {
  showModel: boolean;
  setShowModel: (show: boolean) => void;
}) => {
  return (
    <AnimatePresence>
      {showModel && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white  shadow-xl relative p-6">

            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Info size={18} /> Blog Editor Guide
              </h2>

              <button
                onClick={() => setShowModel(false)}
                className="p-1 hover:bg-gray-100 "
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-5 text-sm text-gray-700">

              {/* Intro */}
              <div>
                <h3 className="font-semibold text-base mb-1">How this editor works</h3>
                <p>
                  Your blog is built using <b>blocks</b>. Each block is a piece of content
                  (paragraph, heading, image, etc). You can add, reorder, or delete blocks.
                </p>
              </div>

              {/* Paragraph */}
              <div className="border  p-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Pilcrow size={16} /> Paragraph
                </h4>
                <p className="text-gray-600 mt-1">
                  Use for normal text content like explanations and descriptions.
                </p>
              </div>

              {/* Heading */}
              <div className="border  p-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Type size={16} /> Heading (H1–H5)
                </h4>
                <p className="text-gray-600 mt-1">
                  Use headings to structure your blog. H1 is largest, H5 is smallest.
                </p>
                <ul className="list-disc ml-5 mt-2 text-gray-600">
                  <li>H1 → Main title (use rarely)</li>
                  <li>H2 → Section title</li>
                  <li>H3–H5 → Subsections</li>
                </ul>
              </div>

              {/* List */}
              <div className="border  p-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <List size={16} /> List
                </h4>
                <p className="text-gray-600 mt-1">
                  Add multiple points. Each line becomes a list item.
                </p>
              </div>

              {/* Image */}
              <div className="border  p-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Image size={16} /> Image
                </h4>
                <p className="text-gray-600 mt-1">
                  Paste an image URL. Make sure it is publicly accessible.
                </p>
              </div>

              {/* Quote */}
              <div className="border  p-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Quote size={16} /> Quote
                </h4>
                <p className="text-gray-600 mt-1">
                  Highlight important statements or testimonials.
                </p>
              </div>

              {/* Callout */}
              <div className="border  p-3 bg-yellow-50">
                <h4 className="font-semibold flex items-center gap-2">
                  <Info size={16} /> Callout
                </h4>
                <p className="text-gray-600 mt-1">
                  Use this for tips, warnings, or important notes.
                </p>
              </div>

              {/* Separator */}
              <div className="border  p-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Minus size={16} /> Divider
                </h4>
                <p className="text-gray-600 mt-1">
                  Adds a visual break between sections.
                </p>
              </div>

              {/* Tips */}
              <div className="bg-gray-100 p-3 ">
                <h4 className="font-semibold mb-1">Pro Tips</h4>
                <ul className="list-disc ml-5 text-gray-600">
                  <li>Use headings to improve SEO</li>
                  <li>Keep paragraphs short (2–4 lines)</li>
                  <li>Use callouts only for important info</li>
                  <li>Drag blocks to reorder content</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GuideModel;