"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PanelLeftClose, Menu } from "lucide-react";

const AsideBar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const asideBarItems = [
    { id: 1, slug: "tag&category", name: "Tag & Category" },
    { id: 2, slug: "create-blog", name: "Create Blog" },
    { id: 3, slug: "manage-blogs", name: "Manage Blogs" },
  ];

  const handleClick = (slug: string) => {
    setActiveTab(slug);
    setIsOpen(false); // close on mobile after selecting
  };

  return (
    <>
      {/* Hamburger button — visible only on mobile when sidebar is closed */}
      <button
        className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-[#EBECD8] shadow-md border border-gray-300"
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Backdrop — mobile only */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-20 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
    <aside
  className={`
    fixed top-0 left-0 bottom-0 z-30 h-screen w-64 lg:w-1/5
    bg-[#EBECD8] border-r shadow-2xl shadow-gray-500
    transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:z-auto lg:shadow-none
  `}
>
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <h1
            onClick={() => router.push("/")}
            className="cursor-pointer text-2xl font-bold p-3 pl-5 leading-tight"
          >
            Ekpratishat <br /> Real estate
          </h1>
          {/* Close button — mobile only */}
          <span
            className="lg:hidden p-3 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <PanelLeftClose />
          </span>
        </div>

        {/* Nav */}
        <nav className="w-full py-10">
          <h3 className="text-sm text-gray-500 px-5 uppercase tracking-widest">
            Content
          </h3>
          <ul className="w-full mt-2 flex flex-col gap-1">
            {asideBarItems.map((item) => (
              <li
                key={item.id}
                className={`w-full px-5 py-2 cursor-pointer transition-colors ${
                  activeTab === item.slug
                    ? "bg-[#C7C9AD] border-l-4 border-black font-medium"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleClick(item.slug)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AsideBar;
