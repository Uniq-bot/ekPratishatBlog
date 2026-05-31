"use client";

import { useAdmin } from "@/context/AdminContext";
import type { AdminTab } from "@/types/blog";

const navItems: { id: AdminTab; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "create-post", label: "Create Post" },
  { id: "manage-posts", label: "Manage Posts" },
  { id: "categories", label: "Categories" },
  { id: "tags", label: "Tags" },
];

const AsideBar = () => {
  const { activeTab, setActiveTab } = useAdmin();

  return (
    <aside className="w-64 bg-black text-white h-screen flex flex-col border-r border-neutral-800">
      <div className="p-6 border-b border-neutral-800">
        <h3 className="text-lg font-bold">Ekpratishat</h3>
        <p className="text-xs text-neutral-400 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 px-0 py-4 space-y-0">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left px-6 py-3 transition-colors border-l-2 ${
              activeTab === item.id
                ? "border-amber-400 bg-neutral-900 text-white"
                : "border-l-2 border-transparent text-neutral-300 hover:bg-neutral-900"
            }`}
          >
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors"
          >
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
};

export default AsideBar;
