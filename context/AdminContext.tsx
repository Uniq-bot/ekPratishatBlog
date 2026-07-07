"use client";

import { createContext, useContext, useState } from "react";

interface AdminContextType {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  blocks: any[];
  setBlocks: React.Dispatch<React.SetStateAction<any[]>>;
  user:any;
 editingAdId: string | null;
 activeEditor:string;
 setActiveEditor:React.Dispatch<React.SetStateAction<string>>;
setEditingAdId: React.Dispatch<React.SetStateAction<string | null>>;
onBoardingBlog:any;
setOnBoardingBlog: React.Dispatch<React.SetStateAction<any>>;
}

export const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  const [activeTab, setActiveTab] = useState("tag&category");
  const [activeEditor, setActiveEditor]=useState("en")
  const [blocks, setBlocks] = useState<any[]>([]);
  const [editingAdId, setEditingAdId] = useState<string | null>(null);
  const [onBoardingBlog, setOnBoardingBlog] = useState<any>(null);
  return (
    <AdminContext.Provider
      value={{
        activeTab,
        setActiveTab,
        blocks,
        setBlocks,
        user,
        setEditingAdId,
        editingAdId,
        activeEditor,
        setActiveEditor,
        onBoardingBlog,
        setOnBoardingBlog,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminUI = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return ctx;
};