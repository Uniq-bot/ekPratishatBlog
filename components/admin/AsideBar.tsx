"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const AsideBar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {

  const router=useRouter()
  const handleClick = (id: number) => {
    setActiveTab(id === 1 ? "tag&category" : id === 2 ? "create-blog" : "manage-blogs");
  };
  const asideBarItems = [
    {
      id: 1,
      slug:"tag&category",
      name: "Tag & Category",
    },
    {
      id: 2,
      slug:"create-blog",
      name: "Create Blog",
    },
    {
      id: 3,
      slug:"manage-blogs",
      name: "Manage Blogs",
    },
  ];
  return (
    <div className="w-1/5 h-screen z-10 border-r shadow-2xl shadow-gray-500 bg-[#EBECD8] fixed top-0 left-0 bottom-0">
      <h1 onClick={()=>router.push("/")} className="w-full cursor-pointer text-2xl font-bold p-3 pl-5 ">
        Ekpratishat <br /> Real estate
      </h1>
      <div className="w-full h-full  py-10">
        <h3 className="text-md text-gray-500 px-5 ">content</h3>
        <ul className="w-full mt-2 flex flex-col gap-2">
          {asideBarItems.map((item) => (
            <li
              className={`w-full px-5 py-2 cursor-pointer ${activeTab === item.slug ? "bg-[#C7C9AD] border-l-10 border-black" : "hover:bg-gray-200"}`}
              key={item.id}
              onClick={() => handleClick(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AsideBar;
