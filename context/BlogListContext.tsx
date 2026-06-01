"use client";
import { createContext, useContext, useState } from "react";

interface BlogContextType {
  blogsData: any[];
 
  filteredBlogs: any[];
  setFilteredBlogs: React.Dispatch<React.SetStateAction<any[]>>;
  
}

export const BlogContext = createContext<BlogContextType | null>(null);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const blogsData = [
    {
      id: 1,
      title: "Modern Living Room Ideas",
      description:
        "Fresh design inspiration for creating a warm, functional living room. Explore color palettes, furniture arrangements, and lighting tips that make a shared space both cozy and practical for everyday living.",
      content: [
        {
          type: "heading",
          value: "Understand the Room's Purpose First",
        },
        {
          type: "paragraph",
          value:
            "Before choosing furniture or colors, define how the room is actually used each day. A living room can be a social zone, family movie corner, reading area, or all three, and clarity at this stage prevents expensive layout mistakes.",
        },
        {
          type: "heading",
          value: "Build Around a Strong Focal Point",
        },
        {
          type: "paragraph",
          value:
            "Choose one visual anchor, such as a statement wall, a large window, or a media unit, then place major seating around it. This creates visual order and makes the space feel intentional instead of randomly assembled.",
        },
        {
          type: "heading",
          value: "Use Layered Lighting for Mood and Function",
        },
        {
          type: "paragraph",
          value:
            "Relying on a single overhead light can flatten the room. Combine ambient lights, task lamps, and accent lighting to support different activities throughout the day while adding warmth and depth.",
        },
        {
          type: "heading",
          value: "Balance Color, Texture, and Contrast",
        },
        {
          type: "paragraph",
          value:
            "A neutral base keeps the room timeless, while textured fabrics, wood finishes, and carefully chosen accent colors make it feel personal. The key is contrast in materials, not visual clutter.",
        },
        {
          type: "heading",
          value: "Finish With Practical Styling",
        },
        {
          type: "paragraph",
          value:
            "Decor should support everyday use, not block it. Include storage-friendly furniture, easy-care textiles, and a few meaningful accessories so the room looks styled yet remains functional for daily life.",
        },
      ],
      slug: "modern-living-room-ideas",
      category: "Interior Design",
      tags: ["home", "design", "lifestyle"],
      author: "Aarav Sharma",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    },
    {
      id: 2,
      title: "Kitchen Upgrades That Matter",
      description:
        "Small kitchen improvements that make everyday cooking easier and more enjoyable. From smart storage to surface upgrades and lighting, these low-effort changes boost functionality and uplift the look of the heart of your home.",
      content: [
        {
          type: "heading",
          value: "Map the Kitchen Workflow",
        },
        {
          type: "paragraph",
          value:
            "A better kitchen starts with movement, not materials. Organize prep, cooking, and cleaning zones so each step feels natural and frequent-use tools are always within easy reach.",
        },
        {
          type: "heading",
          value: "Upgrade Storage Before Decor",
        },
        {
          type: "paragraph",
          value:
            "Smart storage improvements often have the highest daily impact. Drawer organizers, pull-out shelves, and vertical cabinet inserts reduce mess and make meal preparation faster and less stressful.",
        },
        {
          type: "heading",
          value: "Improve Lighting at Work Surfaces",
        },
        {
          type: "paragraph",
          value:
            "Task lighting under cabinets and brighter prep-zone illumination improve safety and comfort. Good lighting also makes finishes appear cleaner and helps smaller kitchens feel more open.",
        },
        {
          type: "heading",
          value: "Choose Durable, Easy-Care Materials",
        },
        {
          type: "paragraph",
          value:
            "Countertops, backsplashes, and flooring should be selected for maintenance as much as style. Durable materials reduce long-term costs and keep the kitchen looking fresh with minimal effort.",
        },
        {
          type: "heading",
          value: "Add Personality in Small Doses",
        },
        {
          type: "paragraph",
          value:
            "Once the functional essentials are done, add warmth through handles, open-shelf styling, and soft accents. A few thoughtful details can transform a purely utilitarian kitchen into an inviting family space.",
        },
      ],
      slug: "kitchen-upgrades-that-matter",
      category: "Home Improvement",
      tags: ["kitchen", "renovation", "tips"],
      author: "Neha Patel",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
      createdAt: "2023-02-10",
      updatedAt: "2023-02-10",
    },
    {
      id: 3,
      title: "Minimal Bedroom Styling",
      description:
        "A calm bedroom setup with clean lines, soft textures, and practical storage. Learn how to combine textiles, minimal furniture, and layered lighting to create a restful retreat that supports better sleep and simpler mornings.",
      content: [
        {
          type: "heading",
          value: "Design Around Better Sleep",
        },
        {
          type: "paragraph",
          value:
            "A minimalist bedroom should prioritize recovery and calm. Start by removing visual distractions and focusing on comfort-led choices that support winding down at the end of the day.",
        },
        {
          type: "heading",
          value: "Use a Soft and Limited Color Palette",
        },
        {
          type: "paragraph",
          value:
            "Muted neutrals, warm whites, and gentle earth tones create a restful atmosphere. Keeping the palette consistent across walls, bedding, and furniture reduces sensory overload.",
        },
        {
          type: "heading",
          value: "Keep Furniture Simple and Intentional",
        },
        {
          type: "paragraph",
          value:
            "Avoid overfilling the room with decorative furniture. Focus on the bed, bedside essentials, and one or two practical storage pieces that preserve movement and visual breathing room.",
        },
        {
          type: "heading",
          value: "Layer Texture for Warmth",
        },
        {
          type: "paragraph",
          value:
            "Minimal does not mean cold. Combine linen, cotton, wood, and soft rugs to add depth and comfort without cluttering the overall design language.",
        },
        {
          type: "heading",
          value: "Hide Everyday Clutter",
        },
        {
          type: "paragraph",
          value:
            "Use under-bed boxes, closed bedside storage, and wardrobe organizers to keep surfaces clear. A tidy visual environment directly supports a calmer and more restorative sleep setting.",
        },
      ],
      slug: "minimal-bedroom-styling",
      category: "Lifestyle",
      tags: ["bedroom", "minimal", "decor"],
      author: "Riya Khan",
      readTime: "3 min read",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      createdAt: "2023-03-05",
      updatedAt: "2023-03-05",
    },
    {
      id: 4,
      title: "Smart Storage for Small Spaces",
      description:
        "Practical storage ideas that help compact homes feel bigger and more organized. This guide covers multi-use furniture, vertical solutions, and clever decluttering methods to maximize every square foot.",
      content: [
        {
          type: "heading",
          value: "Start With an Audit of Daily Clutter",
        },
        {
          type: "paragraph",
          value:
            "Storage solutions work best when they are based on real habits. Identify what gets left out most often, then create fixed homes for those items near where they are used.",
        },
        {
          type: "heading",
          value: "Use Vertical Space Strategically",
        },
        {
          type: "paragraph",
          value:
            "Walls, door backs, and high shelves are underused in smaller homes. Vertical organization increases storage volume without sacrificing usable floor area.",
        },
        {
          type: "heading",
          value: "Choose Multi-Function Furniture",
        },
        {
          type: "paragraph",
          value:
            "Storage beds, bench seating, nested tables, and ottomans with hidden compartments help one room perform multiple roles while maintaining a clean look.",
        },
        {
          type: "heading",
          value: "Create Simple Storage Systems",
        },
        {
          type: "paragraph",
          value:
            "Use bins, labels, and categories that are easy for everyone at home to follow. A storage setup that is too complex usually breaks within a few weeks.",
        },
        {
          type: "heading",
          value: "Review and Adjust Monthly",
        },
        {
          type: "paragraph",
          value:
            "As routines change, storage needs also shift. A quick monthly reset keeps systems relevant and prevents clutter from rebuilding in hidden corners.",
        },
      ],
      slug: "smart-storage-for-small-spaces",
      category: "Organization",
      tags: ["storage", "space-saving", "home"],
      author: "Kabir Ali",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      createdAt: "2023-04-18",
      updatedAt: "2023-04-18",
    },
    {
      id: 5,
      title: "Balcony Setup for Daily Relaxation",
      description:
        "Turn a small balcony into a comfortable corner for reading, tea, or quiet evenings. Find plant-friendly layouts, weather-ready textiles, and lighting options that make even tiny outdoor spaces feel inviting year-round.",
      content: [
        {
          type: "heading",
          value: "Define the Balcony's Main Use",
        },
        {
          type: "paragraph",
          value:
            "A balcony becomes truly useful when it has a clear purpose, such as morning coffee, reading, or light gardening. This helps you pick furniture and accessories that support daily habits.",
        },
        {
          type: "heading",
          value: "Choose Compact, Flexible Furniture",
        },
        {
          type: "paragraph",
          value:
            "Foldable chairs, slim benches, and nesting side tables work well in tight balconies. They provide comfort when needed while keeping movement clear in compact layouts.",
        },
        {
          type: "heading",
          value: "Use Greenery to Add Softness",
        },
        {
          type: "paragraph",
          value:
            "Plants instantly improve atmosphere and privacy. Combine railing planters, hanging pots, and one vertical plant stand to build a layered, garden-like feel.",
        },
        {
          type: "heading",
          value: "Style With Weather-Ready Textiles",
        },
        {
          type: "paragraph",
          value:
            "Outdoor cushions, washable rugs, and quick-dry fabrics keep the balcony inviting while minimizing maintenance. Store soft items in bins during heavy rain.",
        },
        {
          type: "heading",
          value: "Add Soft Lighting for Evening Use",
        },
        {
          type: "paragraph",
          value:
            "Warm string lights or compact wall lights extend usability after sunset and make the area feel cozy without overpowering the small footprint.",
        },
      ],
      slug: "balcony-setup-for-daily-relaxation",
      category: "Outdoor Living",
      tags: ["balcony", "outdoor", "ideas"],
      author: "Ananya Verma",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      createdAt: "2023-05-22",
      updatedAt: "2023-05-22",
    },
    {
      id: 6,
      title: "Dining Area Styling Guide",
      description:
        "Make your dining space feel inviting with lighting, texture, and the right layout. Tips include selecting adaptable furniture, creating focal points, and choosing finishes that balance comfort with stylish durability.",
      content: [
        {
          type: "heading",
          value: "Set the Tone With Layout",
        },
        {
          type: "paragraph",
          value:
            "A dining area should support both quick weekday meals and longer social gatherings. Start with a layout that allows comfortable movement around the table and easy serving access.",
        },
        {
          type: "heading",
          value: "Pick the Right Table and Seating Mix",
        },
        {
          type: "paragraph",
          value:
            "Extendable tables and mixed seating options, like chairs plus a bench, make the room adaptable for guests while preserving space in everyday use.",
        },
        {
          type: "heading",
          value: "Layer Light for Different Moments",
        },
        {
          type: "paragraph",
          value:
            "Use a central pendant for focus and supplementary lights for mood. Layered lighting helps shift the dining space from practical meals to warm evening gatherings.",
        },
        {
          type: "heading",
          value: "Add Texture and Material Contrast",
        },
        {
          type: "paragraph",
          value:
            "Combine wood, fabric, ceramic, and metal accents for visual richness. Even a simple dining room feels elevated when textures are thoughtfully balanced.",
        },
        {
          type: "heading",
          value: "Include Smart Supporting Storage",
        },
        {
          type: "paragraph",
          value:
            "A compact sideboard or shelving unit helps store tableware, linens, and serving pieces, keeping the dining table clear and making hosting significantly easier.",
        },
      ],
      slug: "dining-area-styling-guide",
      category: "Interior Design",
      tags: ["dining", "styling", "interior"],
      author: "Sahil Mehta",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1200&q=80",
      createdAt: "2023-06-14",
      updatedAt: "2023-06-14",
    },
  ];


  const [filteredBlogs, setFilteredBlogs] = useState(blogsData);

  return (
    <BlogContext.Provider
      value={{
        blogsData,
        
        filteredBlogs,
        setFilteredBlogs,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogs = () => {
  const ctx = useContext(BlogContext);
  if (!ctx) {
    throw new Error("useBlogs must be used within a BlogProvider");
  }
  return ctx;
};
