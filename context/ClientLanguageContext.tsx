import React, { createContext } from "react";

type LanguageCode = "en" | "ne";

type LanguageOption = {
  code: LanguageCode;
  label: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "ne", label: "नेपाली" },
];

type LanguageContextType = {
  currentLanguage: LanguageCode;
  languageOptions: LanguageOption[];
  handleLanguageChange: () => void;
  idx:number;
};

const ClientLanguageContext = createContext<LanguageContextType | null>(null);

const getInitialLanguage = (): LanguageCode => {
  if (typeof window === "undefined") return "en";
  const storedLanguage = window.localStorage.getItem("language");
  return storedLanguage === "ne" ? "ne" : "en";
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = React.useState<LanguageCode>(getInitialLanguage);

  React.useEffect(() => {
    window.localStorage.setItem("language", currentLanguage);
  }, [currentLanguage]);



  const handleLanguageChange = () => {
    setCurrentLanguage((prev) => (prev === "en" ? "ne" : "en"));
  };
  let idx=0;
  if(currentLanguage==="en"){
    idx=0;
  }else{
    idx=1;
  }

  return (
    <ClientLanguageContext.Provider
      value={{
        currentLanguage,
        languageOptions: LANGUAGE_OPTIONS,
        handleLanguageChange,
        idx
      }}
    >
      {children}
    </ClientLanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = React.useContext(ClientLanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};