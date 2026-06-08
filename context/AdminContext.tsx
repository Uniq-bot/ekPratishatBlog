"use client";

import { createContext, useContext, useState } from "react";

interface AdminContextType {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  blocks: any[];
  setBlocks: React.Dispatch<React.SetStateAction<any[]>>;
  user:any;
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
  const [blocks, setBlocks] = useState<any[]>([]);

  return (
    <AdminContext.Provider
      value={{
        activeTab,
        setActiveTab,
        blocks,
        setBlocks,
        user
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
